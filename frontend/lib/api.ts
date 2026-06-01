const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const apiClient = {
  // Signals
  signals: {
    list: async (skip = 0, limit = 10, category?: string, result?: string) => {
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
        ...(category && { category }),
        ...(result && { result }),
      });
      const response = await fetch(`${API_BASE_URL}/signals?${params}`);
      return response.json();
    },
    recent: async (days = 7) => {
      const response = await fetch(`${API_BASE_URL}/signals/recent?days=${days}`);
      return response.json();
    },
    get: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/signals/${id}`);
      return response.json();
    },
    create: async (signal: any) => {
      const response = await fetch(`${API_BASE_URL}/signals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signal),
      });
      return response.json();
    },
    update: async (id: number, signal: any) => {
      const response = await fetch(`${API_BASE_URL}/signals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signal),
      });
      return response.json();
    },
    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/signals/${id}`, {
        method: "DELETE",
      });
      return response.json();
    },
    byCategory: async (category: string, skip = 0, limit = 10) => {
      const response = await fetch(
        `${API_BASE_URL}/signals/category/${category}?skip=${skip}&limit=${limit}`
      );
      return response.json();
    },
    byResult: async (result: string, skip = 0, limit = 10) => {
      const response = await fetch(
        `${API_BASE_URL}/signals/result/${result}?skip=${skip}&limit=${limit}`
      );
      return response.json();
    },
  },

  // Dashboard
  dashboard: {
    metrics: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
      return response.json();
    },
    summary: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/summary`);
      return response.json();
    },
    today: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/today`);
      return response.json();
    },
    performance: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/performance`);
      return response.json();
    },
    signalsStatus: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/signals-status`);
      return response.json();
    },
    categoryBreakdown: async () => {
      const response = await fetch(`${API_BASE_URL}/dashboard/category-breakdown`);
      return response.json();
    },
  },

  // History
  history: {
    today: async () => {
      const response = await fetch(`${API_BASE_URL}/history/today`);
      return response.json();
    },
    sevenDays: async () => {
      const response = await fetch(`${API_BASE_URL}/history/7days`);
      return response.json();
    },
    thirtyDays: async () => {
      const response = await fetch(`${API_BASE_URL}/history/30days`);
      return response.json();
    },
    custom: async (startDate: string, endDate: string) => {
      const response = await fetch(
        `${API_BASE_URL}/history/custom?start_date=${startDate}&end_date=${endDate}`
      );
      return response.json();
    },
    dailyStats: async (startDate: string, endDate: string) => {
      const response = await fetch(
        `${API_BASE_URL}/history/stats/daily?start_date=${startDate}&end_date=${endDate}`
      );
      return response.json();
    },
    leagueStats: async (startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      const response = await fetch(
        `${API_BASE_URL}/history/stats/league?${params}`
      );
      return response.json();
    },
    categoryStats: async (startDate?: string, endDate?: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      const response = await fetch(
        `${API_BASE_URL}/history/stats/category?${params}`
      );
      return response.json();
    },
  },

  // Rankings
  rankings: {
    list: async (skip = 0, limit = 10, sortBy = "roi", order = "desc", activeOnly = true) => {
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
        sort_by: sortBy,
        order: order,
        active_only: activeOnly.toString(),
      });
      const response = await fetch(`${API_BASE_URL}/rankings?${params}`);
      return response.json();
    },
    top: async (limit = 10, metric = "roi") => {
      const response = await fetch(
        `${API_BASE_URL}/rankings/top?limit=${limit}&metric=${metric}`
      );
      return response.json();
    },
    blocked: async () => {
      const response = await fetch(`${API_BASE_URL}/rankings/blocked`);
      return response.json();
    },
    prioritized: async () => {
      const response = await fetch(`${API_BASE_URL}/rankings/prioritized`);
      return response.json();
    },
    get: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}`);
      return response.json();
    },
    create: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}`, {
        method: "POST",
      });
      return response.json();
    },
    update: async (leagueId: number, ranking: any) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ranking),
      });
      return response.json();
    },
    block: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}/block`, {
        method: "POST",
      });
      return response.json();
    },
    unblock: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}/unblock`, {
        method: "POST",
      });
      return response.json();
    },
    prioritize: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}/prioritize`, {
        method: "POST",
      });
      return response.json();
    },
    deprioritize: async (leagueId: number) => {
      const response = await fetch(`${API_BASE_URL}/rankings/${leagueId}/deprioritize`, {
        method: "POST",
      });
      return response.json();
    },
    summary: async () => {
      const response = await fetch(`${API_BASE_URL}/rankings/stats/summary`);
      return response.json();
    },
  },

  // Bank
  bank: {
    get: async () => {
      const response = await fetch(`${API_BASE_URL}/bank`);
      return response.json();
    },
    create: async (bank: any) => {
      const response = await fetch(`${API_BASE_URL}/bank`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bank),
      });
      return response.json();
    },
    update: async (bank: any) => {
      const response = await fetch(`${API_BASE_URL}/bank`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bank),
      });
      return response.json();
    },
    metrics: async () => {
      const response = await fetch(`${API_BASE_URL}/bank/metrics`);
      return response.json();
    },
    updateMetrics: async (metrics: any) => {
      const response = await fetch(`${API_BASE_URL}/bank/update-metrics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metrics),
      });
      return response.json();
    },
    reset: async () => {
      const response = await fetch(`${API_BASE_URL}/bank/reset`, {
        method: "POST",
      });
      return response.json();
    },
  },

  // Health Check
  health: async () => {
    const response = await fetch(`${API_BASE_URL.replace("/api/v1", "")}/health`);
    return response.json();
  },
};
