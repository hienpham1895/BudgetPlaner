const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5108";

export type Expense = {
    id: number;
    date: string;
    amount: number;
    note: string | null;
    category?: string | null;
};

export type ExpenseCreate = {
    date: string;
    amount: number;
    note: string | null;
    category?: string | null;
};

export async function createExpense(expense: ExpenseCreate): Promise<Expense> {
    const res = await fetch(`${API_BASE}/api/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(expense),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text}`);
    return res.json();
}

export async function getExpenses(): Promise<Expense[]> {
    const res = await fetch(`${API_BASE}/api/expenses`);
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    return res.json();
}

export async function updateExpense(id: number, body: ExpenseCreate): Promise<Expense> {
    const res = await fetch(`${API_BASE}/api/expenses(${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
    return res.json();
}

export async function deleteExpense(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/expenses/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status} - ${await res.text()}`);
}