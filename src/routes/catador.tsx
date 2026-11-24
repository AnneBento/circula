import { createFileRoute } from '@tanstack/react-router';
import { CatadorView } from '../components/CatadorView';

export const Route = createFileRoute('/catador')({
  component: CatadorView,
});
