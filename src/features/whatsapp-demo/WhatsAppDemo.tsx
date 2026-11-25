import { useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Send } from 'lucide-react';
import { useWhatsAppChatFlow } from './chat-flow';
import { MessageBubble, QuickReplyBar, TypingIndicator, WhatsAppHeader } from './chat-kit';

export function WhatsAppDemo() {
  const navigate = useNavigate();
  const { messages, isTyping, currentOptions, handleSelectOption, resetChat } = useWhatsAppChatFlow();
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  return (
    <div className="mx-auto flex h-[calc(100dvh-10.5rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-[#BDD3A7] bg-[#EFEAE2] shadow-sm">
      <WhatsAppHeader
        isTyping={isTyping}
        onBack={() => navigate({ to: '/' })}
        onReset={resetChat}
      />

      <div
        className="flex-1 space-y-3 overflow-y-auto px-3 py-4"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(18,63,27,0.06) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={endRef} />
      </div>

      <div className="border-t border-[#BDD3A7]/70 bg-[#F7F7F7] px-3 py-3">
        <QuickReplyBar options={currentOptions} onSelect={handleSelectOption} disabled={isTyping} />

        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-11 flex-1 items-center rounded-full border border-[#D1D5DB] bg-white px-4 text-sm text-[#667085]">
            Digite uma mensagem
          </div>
          <button
            type="button"
            aria-label="Enviar mensagem"
            disabled
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#123F1B] text-white opacity-60"
          >
            <Send className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={resetChat}
            className="rounded-full border border-[#123F1B] px-3 py-2 text-xs font-semibold text-[#123F1B] transition hover:bg-[#90AD2E]/15"
          >
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
}
