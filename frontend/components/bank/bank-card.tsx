"use client";

import { useState, useEffect } from "react";

export function BankCard() {
  const [bank, setBank] = useState({
    current: 1250,
    initial: 1000,
    profit: 250,
    stakeType: "percentage",
    stakeValue: 2.0,
  });

  const profitPercentage = ((bank.profit / bank.initial) * 100).toFixed(2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Banca Principal */}
      <div className="p-8 rounded-lg bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700">
        <h3 className="text-sm text-blue-200 mb-2">Banca Atual</h3>
        <div className="text-4xl font-bold text-white mb-4">
          R$ {bank.current.toFixed(2)}
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-200">Banca Inicial:</span>
            <span className="text-white">R$ {bank.initial.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-200">Lucro:</span>
            <span className={bank.profit >= 0 ? "text-green-300" : "text-red-300"}>
              {bank.profit >= 0 ? "+" : ""}R$ {bank.profit.toFixed(2)} ({profitPercentage}%)
            </span>
          </div>
        </div>
      </div>

      {/* Configurações de Stake */}
      <div className="p-8 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-6">Configuração de Stake</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Tipo de Stake
            </label>
            <select
              value={bank.stakeType}
              onChange={(e) =>
                setBank({ ...bank, stakeType: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-slate-600"
            >
              <option value="fixed">Fixa</option>
              <option value="percentage">Percentual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Valor {bank.stakeType === "percentage" ? "(%)" : "(R$)"}
            </label>
            <input
              type="number"
              value={bank.stakeValue}
              onChange={(e) =>
                setBank({ ...bank, stakeValue: parseFloat(e.target.value) })
              }
              step={bank.stakeType === "percentage" ? 0.1 : 10}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-slate-600"
            />
          </div>

          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mt-4">
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}
