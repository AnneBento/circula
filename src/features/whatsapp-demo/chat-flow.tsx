import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  BOT_TEXT,
  DECLINED_OPTIONS,
  FINAL_OPTIONS,
  INITIAL_OPTIONS,
  NEIGHBORHOOD_OPTIONS,
  NEIGHBORHOOD_ROUTES,
  type ChatMessage,
  type FlowStep,
  type NeighborhoodRoute,
  type QuickReplyOption,
} from './data';

function nowTime(): string {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function createId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createBotMessage(text: string): ChatMessage {
  return {
    id: createId(),
    sender: 'bot',
    text,
    timestamp: nowTime(),
  };
}

function createUserMessage(text: string): ChatMessage {
  return {
    id: createId(),
    sender: 'user',
    text,
    timestamp: nowTime(),
  };
}

function getInitialMessages(): ChatMessage[] {
  return [createBotMessage(BOT_TEXT.opening)];
}

export function useWhatsAppChatFlow() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [step, setStep] = useState<FlowStep>('awaiting_notification_choice');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<NeighborhoodRoute | null>(null);
  const [currentOptions, setCurrentOptions] = useState<QuickReplyOption[]>(INITIAL_OPTIONS);

  const timeoutRef = useRef<number | null>(null);
  const stepRef = useRef<FlowStep>('awaiting_notification_choice');
  const routeRef = useRef<NeighborhoodRoute | null>(null);

  const clearPending = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearPending();
    };
  }, [clearPending]);

  const queueBotReply = useCallback(
    (replyText: string, nextStep: FlowStep, nextOptions: QuickReplyOption[], route: NeighborhoodRoute | null) => {
      clearPending();
      setIsTyping(true);
      setCurrentOptions([]);
      timeoutRef.current = window.setTimeout(() => {
        setMessages((prev) => [...prev, createBotMessage(replyText)]);
        setIsTyping(false);
        setStep(nextStep);
        stepRef.current = nextStep;
        setSelectedRoute(route);
        routeRef.current = route;
        setCurrentOptions(nextOptions);
        timeoutRef.current = null;
      }, 700);
    },
    [clearPending]
  );

  const resetChat = useCallback(() => {
    clearPending();
    setMessages(getInitialMessages());
    setStep('awaiting_notification_choice');
    stepRef.current = 'awaiting_notification_choice';
    setIsTyping(false);
    setSelectedRoute(null);
    routeRef.current = null;
    setCurrentOptions(INITIAL_OPTIONS);
  }, [clearPending]);

  const handleSelectOption = useCallback(
    (option: QuickReplyOption) => {
      if (isTyping) return;

      if (option.action === 'reset') {
        resetChat();
        return;
      }

      setMessages((prev) => [...prev, createUserMessage(option.label)]);

      if (option.action === 'navigate' && option.to) {
        const destination = option.to;
        clearPending();
        setIsTyping(true);
        setCurrentOptions([]);
        timeoutRef.current = window.setTimeout(() => {
          setIsTyping(false);
          timeoutRef.current = null;
          navigate({ to: destination });
        }, 350);
        return;
      }

      const currentStep = stepRef.current;

      if (currentStep === 'awaiting_notification_choice') {
        if (option.value === 'Nao') {
          queueBotReply(BOT_TEXT.declined, 'declined', DECLINED_OPTIONS, null);
          return;
        }
        if (option.value === 'Sim') {
          queueBotReply(BOT_TEXT.askNeighborhood, 'awaiting_neighborhood', NEIGHBORHOOD_OPTIONS, null);
          return;
        }
      }

      if (currentStep === 'awaiting_neighborhood') {
        const route = NEIGHBORHOOD_ROUTES.find((item) => item.bairro === option.value) ?? null;
        if (route) {
          queueBotReply(BOT_TEXT.routeConfirmed(route), 'route_confirmed', FINAL_OPTIONS, route);
        }
        return;
      }
    },
    [clearPending, isTyping, navigate, queueBotReply, resetChat]
  );

  return {
    messages,
    step,
    isTyping,
    selectedRoute,
    currentOptions,
    handleSelectOption,
    resetChat,
  };
}
