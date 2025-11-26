import "dotenv/config";
import { Client } from "pg";
import fs from "fs";
import path from "path";

type CsvDebtRow = {
  year: number;
  doubleDebtDrawdown: number | null;
  paymentsDoubleDebtFrancs: number | null;
  doubleDebtIn2021Usd: number | null;
};

type DbRow = {
  year: number;
  phase: string;
  outstanding_francs: number | null;
  payments_francs: number | null;
  payments_2021_usd: number | null;
  notes: string | null;
};

function loadRawRows(): CsvDebtRow[] {
  const jsonPath = path.join(process.cwd(), "data/haiti-double-debt.json");
  const content = fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(content);
}

function buildFullSeries(rawRows: CsvDebtRow[]): DbRow[] {
  const byYear = new Map<number, CsvDebtRow>();
  for (const row of rawRows) {
    byYear.set(row.year, row);
  }

  const result: DbRow[] = [];

  for (let year = 1804; year <= 1947; year++) {
    const row = byYear.get(year);

    if (year < 1825) {
      result.push({
        year,
        phase: "Pre-indemnity",
        outstanding_francs: 0,
        payments_francs: 0,
        payments_2021_usd: null,
        notes: "Independence achieved; indemnity not yet imposed.",
      });
      continue;
    }

    if (row && year <= 1888) {
      result.push({
        year,
        phase: "Indemnity & 1825 loan (double debt)",
        outstanding_francs: row.doubleDebtDrawdown ?? null,
        payments_francs: row.paymentsDoubleDebtFrancs ?? null,
        payments_2021_usd: row.doubleDebtIn2021Usd ?? null,
        notes: "Data derived from NYT 'double debt' dataset.",
      });
      continue;
    }

    result.push({
      year,
      phase: "Post double debt; other foreign borrowing",
      outstanding_francs: 0,
      payments_francs: 0,
      payments_2021_usd: null,
      notes:
        "Double debt considered paid; later external debts existed but are not included.",
    });
  }

  return result;
}

async function main() {
  console.log("DATABASE_URL from env:", process.env.DATABASE_URL);
  
  console.log("Loading JSON data...");
  const rawRows = loadRawRows();

  console.log(`Loaded ${rawRows.length} rows from JSON`);
  const allRows = buildFullSeries(rawRows);
  console.log(`Built ${allRows.length} yearly rows`);

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is missing");
  }

  console.log("Connecting to Postgres...");
  const client = new Client({ connectionString: url });
  await client.connect();
  console.log("Connected!");

  await client.query(`
    CREATE TABLE IF NOT EXISTS haiti_debt (
      year INT PRIMARY KEY,
      phase TEXT NOT NULL,
      outstanding_francs NUMERIC,
      payments_francs NUMERIC,
      payments_2021_usd NUMERIC,
      notes TEXT
    );
  `);

  for (const row of allRows) {
    await client.query(
      `
      INSERT INTO haiti_debt
      (year, phase, outstanding_francs, payments_francs, payments_2021_usd, notes)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (year) DO UPDATE SET
        phase = EXCLUDED.phase,
        outstanding_francs = EXCLUDED.outstanding_francs,
        payments_francs = EXCLUDED.payments_francs,
        payments_2021_usd = EXCLUDED.payments_2021_usd,
        notes = EXCLUDED.notes;
    `,
      [
        row.year,
        row.phase,
        row.outstanding_francs,
        row.payments_francs,
        row.payments_2021_usd,
        row.notes,
      ],
    );
  }

  console.log("Seeding complete.");
  await client.end();
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
