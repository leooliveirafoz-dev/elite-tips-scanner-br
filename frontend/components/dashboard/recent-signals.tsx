"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RecentSignals() {
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStake, setShowStake] = useState(false);

  useEffect(() => {
    // Simula dados para demonstração
    setSignals([
      {
        id: 1,
        league: "Brasileirão",
        match: "Flamengo vs Botafogo",
        category: "A+",
        odds: 1.75,
        stake: 30,
        result: "green",
        profit: 22.5,
      },
      {
        id: 2,
        league: "Bundesliga",
        match: "Bayern vs Dortmund",
        category: "A",
        odds: 1.65,
        stake: 20,
        result: "green",
        profit: 13,
      },
      {
        id: 3,
        league: "La Liga",
        match: "Real Madrid vs Barcelona",
        category: "B",
        odds: 1.58,
        stake: 10,
        result: "red",
        profit: -10,
      },
    ]);
    setLoading(false);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "A+":
        return "bg-green-900 text-green-300";
      case "A":
        return "bg-green-800 text-green-200";
      case "B":
        return "bg-yellow-800 text-yellow-200";
      case "C":
        return "bg-red-800 text-red-200";
      default:
        return "bg-slate-800 text-slate-200";
    }
  };

  const getResultColor = (result: string) => {
    return result === "green"
      ? "text-green-400"
      : result === "red"
      ? "text-red-400"
      : "text-slate-400";
  };

  if (loading) {
    return <div className="text-slate-400">Carregando...</div>;
  }

  return (
    <div className="p-6 rounded-lg bg-slate-900 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Sinais Recentes</h2>
        <button
          onClick={() => setShowStake(!showStake)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {showStake ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Liga
              </th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Jogo
              </th>
              <th className="text-left py-3 px-4 text-slate-400 font-medium">
                Categoria
              </th>
              <th className="text-center py-3 px-4 text-slate-400 font-medium">
                Odd
              </th>
              {showStake && (
                <th className="text-center py-3 px-4 text-slate-400 font-medium">
                  Stake
                </th>
              )}
              <th className="text-center py-3 px-4 text-slate-400 font-medium">
                Resultado
              </th>
              <th className="text-right py-3 px-4 text-slate-400 font-medium">
                Lucro
              </th>
            </tr>
          </thead>
          <tbody>
            {signals.map((signal) => (
              <tr
                key={signal.id}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
              >
                <td className="py-3 px-4 text-white">{signal.league}</td>
                <td className="py-3 px-4 text-slate-300">{signal.match}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      signal.category
                    )}`}
                  >
                    {signal.category}
                  </span>
                </td>
                <td className="text-center py-3 px-4 text-white">
                  {signal.odds.toFixed(2)}
                </td>
                {showStake && (
                  <td className="text-center py-3 px-4 text-slate-300">
                    R$ {signal.stake.toFixed(2)}
                  </td>
                )}
                <td className={`text-center py-3 px-4 font-medium ${getResultColor(signal.result)}`}>
                  {signal.result === "green" ? "✅" : "❌"}
                </td>
                <td
                  className={`text-right py-3 px-4 font-semibold ${
                    signal.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {signal.profit >= 0 ? "+" : ""}
                  {signal.profit.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
