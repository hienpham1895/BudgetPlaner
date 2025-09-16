const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5108";

export type Income = {
  id: number;
  date: string;            // ISO
  amount: number;
  note: string | null;
  category?: string | null;
};

export type IncomeCreate = {
  date: string;
  amount: number;
  note: string | null;
  category?: string | null;
};

export async function createIncome(income: IncomeCreate): Promise<Income> {
  const res = await fetch(`${API_BASE}/api/incomes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(income),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${await res.text()}`);
  return res.json();
}

export async function getIncomes(): Promise<Income[]> {
  const res = await fetch(`${API_BASE}/api/incomes`);
  if (!res.ok) throw new Error(`HTTP ${res.status} – ${await res.text()}`);
  return res.json();
}

export async function updateIncome(id: number, body: IncomeCreate): Promise<Income> {
    const res = await fetch(`${API_BASE}/api/incomes(${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    return res.json();
}

export async function deleteIncome(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/incomes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
}