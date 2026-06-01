"use client";

import { AlertTriangle } from "lucide-react";

export function StakeSuggestion() {
  const suggestions = [
    { category: "A+", percentage: 3.0, stake: 37.5, description: "Excelente confiança" },
    { category: "A", percentage: 2.0, stake: 25, description: "Boa confiança" },
    { category: "B", percentage: 1.0, stake: 12.5, description: "Confiança moderada" },
    { category: "C", percentage: 0.5, stake: 6.25, description: "Baixa confiança" },
  ];

  return (
    <div className="p-6 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-bold text-white mb-6">Sugestão de Stake</h3>
      <div className="space-y-3">
        {suggestions.map((s) => (
          <div
            key={s.category}
            className="p-4 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                  s.category === "A+" ? "bg-green-900 text-green-300" :
                  s.category === "A" ? "bg-green-800 text-green-200" :
                  s.category === "B" ? "bg-yellow-800 text-yellow-200" :
                  "bg-red-800 text-red-200"
                }`}>
                  {s.category}
                </span>
              </div>
              <span className="text-sm text-slate-400">{s.percentage}% da banca</span>
            </div>
            <p className="text-xs text-slate-400 mb-2">{s.description}</p>
            <div className="text-lg font-bold text-blue-400">
              R$ {s.stake.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Baseado em banca atual de R$ 1.250,00
      </p>
    </div>
  );
}
