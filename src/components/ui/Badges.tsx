import React from 'react';
import { Award, ShieldCheck, Sprout } from 'lucide-react';

export const NivelBadge: React.FC<{ nivel: 1 | 2 | 3 }> = ({ nivel }) => {
  if (nivel === 3) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300">
        <Award className="h-3.5 w-3.5 text-amber-600" />
        Nível 3 • Guardião de Quixadá
      </span>
    );
  }
  if (nivel === 2) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-900 border border-teal-300">
        <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
        Nível 2 • Separador Consciente
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900 border border-emerald-300">
      <Sprout className="h-3.5 w-3.5 text-emerald-600" />
      Nível 1 • Iniciante
    </span>
  );
};
