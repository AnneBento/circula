import { createFileRoute } from '@tanstack/react-router';
import { CidadaoView } from '../components/CidadaoView';

export const Route = createFileRoute('/cidadao')({
  component: CidadaoView,
});
