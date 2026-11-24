import { createFileRoute } from '@tanstack/react-router';
import { GestaoView } from '../components/GestaoView';

export const Route = createFileRoute('/gestao')({
  component: GestaoView,
});
