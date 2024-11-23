import { db } from "@vercel/postgres";

const client = await db.connect();

async function listInvoices() {
  return client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666
`;
}

export async function GET() {
  try {
    const { rows } = await listInvoices();
    return Response.json(rows);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
