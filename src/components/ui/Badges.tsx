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
    classes: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    icon: Sprout,
    iconClasses: 'text-emerald-600',
  },
  2: {
    label: 'Nível 2 • Broto',
    classes: 'bg-teal-100 text-teal-900 border-teal-300',
    icon: Leaf,
    iconClasses: 'text-teal-600',
  },
  3: {
    label: 'Nível 3 • Árvore',
    classes: 'bg-sky-100 text-sky-900 border-sky-300',
    icon: TreePine,
    iconClasses: 'text-sky-600',
  },
  4: {
    label: 'Nível 4 • Guardião',
    classes: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    icon: ShieldCheck,
    iconClasses: 'text-indigo-600',
  },
  5: {
    label: 'Nível 5 • Embaixador',
    classes: 'bg-amber-100 text-amber-900 border-amber-300',
    icon: Award,
    iconClasses: 'text-amber-600',
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
