import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, RotateCcw } from 'lucide-react';
import type { ChatMessage, QuickReplyOption } from './data';

interface WhatsAppHeaderProps {
  isTyping: boolean;
  onBack: () => void;
  onReset: () => void;
}

export function WhatsAppHeader({ isTyping, onBack, onReset }: WhatsAppHeaderProps) {
  return (
    <header className="flex items-center gap-3 bg-[#123F1B] px-3 py-3 text-white shadow-sm">
      <button
        type="button"
        onClick={onBack}
        aria-label="Voltar"
        className="rounded-full p-1 transition hover:bg-white/10"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5EC]">
        <img src="/logo.png" alt="CIRCULA" className="h-7 w-7 object-contain" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-bold">Bot CIRCULA</span>
          <BadgeCheck className="h-4 w-4 shrink-0 text-[#90AD2E]" aria-label="Conta verificada" />
        </div>
        <p className="text-xs text-[#BDD3A7]">{isTyping ? 'digitando...' : 'online'}</p>
      </div>

      <button
        type="button"
        onClick={onReset}
        aria-label="Reiniciar conversa"
        className="rounded-full p-2 transition hover:bg-white/10"
      >
        <RotateCcw className="h-4 w-4" />
      </button>
    </header>
  );
}

function renderBoldText(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function MessageText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <span className="whitespace-pre-wrap break-words">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {renderBoldText(line)}
          {lineIndex < lines.length - 1 ? '\n' : null}
        </span>
      ))}
    </span>
  );
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 shadow-sm ${
          isBot
            ? 'rounded-tl-md border border-[#BDD3A7] bg-white text-[#162619]'
            : 'rounded-tr-md bg-[#DCF8C6] text-[#162619]'
        }`}
      >
        <p className="text-sm leading-relaxed">
          <MessageText text={message.text} />
        </p>
        <div
          className={`mt-1 flex items-center gap-1 text-[11px] ${
            isBot ? 'justify-start text-[#667085]' : 'justify-end text-[#667085]'
          }`}
        >
          <span>{message.timestamp}</span>
          {!isBot && (
            <svg
              width="16"
              height="11"
              viewBox="0 0 16 11"
              aria-label="Mensagem lida"
              className="shrink-0"
            >
              <path
                d="M11.071.929a.75.75 0 0 1 1.058 1.06l-6.01 6.01a.75.75 0 0 1-1.06 0L1.87 4.81a.75.75 0 1 1 1.06-1.06l2.66 2.658L11.07.929Zm3.3 0a.75.75 0 0 1 1.058 1.06l-6.01 6.01a.75.75 0 0 1-1.06 0l-.354-.353 1.06-1.061.354.353 5.48-5.48-.528-.529Z"
                fill="#53BDEB"
              />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md border border-[#BDD3A7] bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            className="h-2 w-2 rounded-full bg-[#90AD2E]"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface QuickReplyBarProps {
  options: QuickReplyOption[];
  onSelect: (option: QuickReplyOption) => void;
  disabled?: boolean;
}

export function QuickReplyBar({ options, onSelect, disabled = false }: QuickReplyBarProps) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="rounded-full border border-[#123F1B] bg-white px-4 py-2 text-sm font-semibold text-[#123F1B] transition hover:bg-[#90AD2E]/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
