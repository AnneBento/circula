import React from 'react';
import { Award, Leaf, ShieldCheck, Sprout, TreePine } from 'lucide-react';
import { Nivel } from '../../types/database';

const NIVEIS_BADGE: Record<
  Nivel,
  {
    label: string;
    classes: string;
    icon: React.ElementType;
    iconClasses: string;
  }
> = {
  1: {
    label: 'Nível 1 • Semente',
    classes:
      'bg-circula-sage/40 text-circula-dark border-circula-olive/40 dark:bg-circula-lime/15 dark:text-circula-sage dark:border-circula-lime/30',
    icon: Sprout,
    iconClasses: 'text-circula-lime',
  },
  2: {
    label: 'Nível 2 • Broto',
    classes:
      'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-900/40 dark:text-teal-100 dark:border-teal-700',
    icon: Leaf,
    iconClasses: 'text-teal-600 dark:text-teal-300',
  },
  3: {
    label: 'Nível 3 • Árvore',
    classes:
      'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-900/40 dark:text-sky-100 dark:border-sky-700',
    icon: TreePine,
    iconClasses: 'text-sky-600 dark:text-sky-300',
  },
  4: {
    label: 'Nível 4 • Guardião',
    classes:
      'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-900/40 dark:text-indigo-100 dark:border-indigo-700',
    icon: ShieldCheck,
    iconClasses: 'text-indigo-600 dark:text-indigo-300',
  },
  5: {
    label: 'Nível 5 • Embaixador',
    classes:
      'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-900/40 dark:text-amber-100 dark:border-amber-700',
    icon: Award,
    iconClasses: 'text-amber-600 dark:text-amber-300',
  },
};

export const NivelBadge: React.FC<{ nivel: Nivel }> = ({ nivel }) => {
  const info = NIVEIS_BADGE[nivel] ?? NIVEIS_BADGE[1];
  const Icon = info.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border ${info.classes}`}
    >
      <Icon className={`h-3.5 w-3.5 ${info.iconClasses}`} />
      {info.label}
    </span>
  );
};
