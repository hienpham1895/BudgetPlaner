const API = 'http://localhost:5108/api/expenses';

export type Expense = {
    id?: number;
    date: string;
    amount: number;
    category: string;
    note?: string;
};

export async function listExpenses(): Promise<Expense[]> {
    const res = await fetch(API);
    if (!res.ok) throw new Error("Failed to load expenses");
    return res.json();
}

export async function createExpense(e: Expense): Promise<Expense> {
    const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(e),
    });
    if (!res.ok) throw new Error("Failed to create expense");
    return res.json();
}

