import { NextResponse } from "next/server";
import { Client } from "pg";

// API Route for /api/debt
export async function GET() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    console.error("Missing DATABASE_URL");
    return NextResponse.json({ error: "Missing database URL" }, { status: 500 });
  }

  const client = new Client({ connectionString: url });

  try {
    await client.connect();

    const result = await client.query(`
      SELECT 
        year,
        phase,
        outstanding_francs,
        payments_francs,
        payments_2021_usd,
        notes
      FROM haiti_debt
      ORDER BY year;
    `);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  } finally {
    await client.end();
  }
}
