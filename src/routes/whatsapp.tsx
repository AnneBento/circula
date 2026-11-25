import { createFileRoute } from '@tanstack/react-router';
import { WhatsAppDemo } from '../features/whatsapp-demo/WhatsAppDemo';

export const Route = createFileRoute('/whatsapp')({
  component: WhatsAppDemo,
});
