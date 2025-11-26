import fs from "node:fs";
import path from "node:path";

type DebtRow = {
  year: number;
  doubleDebtDrawdown: number | null;
  paymentsDoubleDebtFrancs: number | null;
  paymentsIndemnity: number | null;
  paymentsPrincipalInterest1825Loan: number | null;
  lateFees: number | null;
  consumerPriceIndexUsd: number | null;
  exchangeRateFrancToUsd: number | null;
  haitiHistoricalGdp: number | null;
  doubleDebtIn2021Usd: number | null;
};

const CSV_PATH = path.join(process.cwd(), "data/haiti-double-debt.csv");
const OUTPUT_PATH = path.join(process.cwd(), "data/haiti-double-debt.json");

const headerMap: Record<string, keyof DebtRow> = {
  YEAR: "year",
  "DOUBLE-DEBT-DRAWDOWN": "doubleDebtDrawdown",
  "PAYMENTS-DOUBLE-DEBT-FRANCS": "paymentsDoubleDebtFrancs",
  "PAYMENTS-INDEMNITY": "paymentsIndemnity",
  "PAYMENTS-PRINCIPAL-INTEREST-1825-LOAN": "paymentsPrincipalInterest1825Loan",
  "LATE-FEES": "lateFees",
  "CONSUMER-PRICE-INDEX-USD": "consumerPriceIndexUsd",
  "EXCHANGE-RATE-FRANC-TO-USD": "exchangeRateFrancToUsd",
  "HAITI-HISTORICAL-GDP": "haitiHistoricalGdp",
  "DOUBLE-DEBT-IN-2021-USD": "doubleDebtIn2021Usd",
};

function toNumber(value: string | undefined): number | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(/,/g, "");
  const parsed = Number(normalized);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (char === '"') {
      const next = content[i + 1];
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && content[i + 1] === "\n") {
        i++;
      }
      row.push(cell);
      if (row.some((part) => part.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    if (row.some((part) => part.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

export function loadDebtRows(): DebtRow[] {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`CSV not found at ${CSV_PATH}`);
  }

  const csv = fs.readFileSync(CSV_PATH, "utf8");
  const table = parseCsv(csv);
  const [headerRow, ...dataRows] = table;

  if (!headerRow) {
    throw new Error("CSV file is missing a header row.");
  }

  const normalizedHeaders = headerRow.map((header) =>
    header.replace(/^\uFEFF/, "").trim(),
  );

  normalizedHeaders.forEach((header) => {
    if (!headerMap[header]) {
      console.warn("Unknown CSV header:", header);
    }
  });

  const records: DebtRow[] = dataRows.map((row, rowIndex) => {
    const record: Partial<DebtRow> = {};

    normalizedHeaders.forEach((header, idx) => {
      const key = headerMap[header];
      if (!key) return;
      const value = row[idx];
      if (key === "year") {
        const numericYear = toNumber(value);
        record[key] = numericYear === null ? NaN : Math.trunc(numericYear);
        return;
      }
      record[key] = toNumber(value);
    });

    if (typeof record.year !== "number" || Number.isNaN(record.year)) {
      throw new Error(`Row ${rowIndex + 2} is missing a valid year.`);
    }

    return {
      year: record.year,
      doubleDebtDrawdown: record.doubleDebtDrawdown ?? null,
      paymentsDoubleDebtFrancs: record.paymentsDoubleDebtFrancs ?? null,
      paymentsIndemnity: record.paymentsIndemnity ?? null,
      paymentsPrincipalInterest1825Loan:
        record.paymentsPrincipalInterest1825Loan ?? null,
      lateFees: record.lateFees ?? null,
      consumerPriceIndexUsd: record.consumerPriceIndexUsd ?? null,
      exchangeRateFrancToUsd: record.exchangeRateFrancToUsd ?? null,
      haitiHistoricalGdp: record.haitiHistoricalGdp ?? null,
      doubleDebtIn2021Usd: record.doubleDebtIn2021Usd ?? null,
    };
  });

  return records;
}

function main() {
  const records = loadDebtRows();

  fs.writeFileSync(
    OUTPUT_PATH,
    JSON.stringify(records, null, 2),
    "utf8",
  );

  console.log(`Seed data written to ${OUTPUT_PATH} (${records.length} rows).`);
}

main();
