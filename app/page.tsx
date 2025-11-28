"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

type DebtRow = {
  year: number;
  phase: string;
  outstanding_francs: string | number | null;
  payments_francs: string | number | null;
  payments_2021_usd: string | number | null;
  notes: string | null;
};

type NormalizedRow = {
  year: number;
  phase: string;
  outstanding_francs: number;
  payments_francs: number;
  payments_2021_usd: number | null;
  notes: string | null;
};

export default function HomePage() {
  const [data, setData] = useState<NormalizedRow[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/debt");
        if (!res.ok) {
          throw new Error("Failed to load data");
        }
        const raw = (await res.json()) as DebtRow[];

        const normalized: NormalizedRow[] = raw.map((row) => ({
          year: row.year,
          phase: row.phase,
          outstanding_francs: row.outstanding_francs
            ? Number(row.outstanding_francs)
            : 0,
          payments_francs: row.payments_francs
            ? Number(row.payments_francs)
            : 0,
          payments_2021_usd: row.payments_2021_usd
            ? Number(row.payments_2021_usd)
            : null,
          notes: row.notes,
        }));

        normalized.sort((a, b) => a.year - b.year);
        setData(normalized);
        if (normalized.length > 0) {
          setSelectedYear(normalized[0].year);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-lg">Loading data…</p>
      </main>
    );
  }

  if (error || data.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Something went wrong.
          </h1>
          <p className="text-sm text-slate-300 mb-2">{error}</p>
          <p className="text-xs text-slate-500">
            Check that your database is seeded and the /api/debt route works.
          </p>
        </div>
      </main>
    );
  }

  const minYear = data[0].year;
  const maxYear = data[data.length - 1].year;
  const currentYear =
    selectedYear ?? data[0].year;
  const currentRow =
    data.find((row) => row.year === currentYear) ?? data[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-8">
      <motion.div
        className="w-full max-w-5xl space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Haiti&apos;s Independence Debt Over Time
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm md:text-base">
            Explore Haiti&apos;s colonial indemnity and related &quot;double
            debt&quot; from 1804 to 1947. Use the slider to move through time
            and see annual payments and outstanding balances.
          </p>
        </header>

        {/* Slider + selected year card */}
        <section className="grid gap-6 md:grid-cols-[2fr,1fr] items-center">
          <div className="space-y-4">
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Year: <span className="text-slate-100">{currentYear}</span>
            </label>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={currentYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>{minYear}</span>
              <span>{maxYear}</span>
            </div>
          </div>

          <motion.div
            className="border border-slate-800 bg-slate-900/70 rounded-xl p-4 space-y-2"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-lg font-semibold">
              {currentYear} — {currentRow.phase}
            </h2>
            <dl className="text-sm space-y-1">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Payments (francs)</dt>
                <dd className="font-mono">
                  {currentRow.payments_francs.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">Outstanding (francs)</dt>
                <dd className="font-mono">
                  {currentRow.outstanding_francs.toLocaleString("en-US", {
                    maximumFractionDigits: 0,
                  })}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-400">2021 USD (approx.)</dt>
                <dd className="font-mono">
                  {currentRow.payments_2021_usd
                    ? currentRow.payments_2021_usd.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })
                    : "—"}
                </dd>
              </div>
            </dl>
            {currentRow.notes && (
              <p className="text-xs text-slate-400 mt-2">
                {currentRow.notes}
              </p>
            )}
          </motion.div>
        </section>

        {/* Chart */}
        <motion.section
          className="border border-slate-800 bg-slate-900/80 rounded-2xl p-5 md:p-7 shadow-inner"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <h2 className="text-sm md:text-base font-semibold mb-4">
            Payments & Outstanding Balance Over Time
          </h2>
          <div className="h-72 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  stroke="#475569"
                  tickLine={{ stroke: "#475569" }}
                  axisLine={{ stroke: "#475569" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  stroke="#475569"
                  tickLine={{ stroke: "#475569" }}
                  axisLine={{ stroke: "#475569" }}
                  tickFormatter={(v) =>
                    v >= 1_000_000 ? `${Math.round(v / 1_000_000)}M` : v
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0b1224",
                    border: "1px solid #1e293b",
                    borderRadius: "0.5rem",
                    fontSize: "0.9rem",
                    color: "#e2e8f0",
                  }}
                  labelStyle={{ color: "#e2e8f0", fontSize: "0.9rem" }}
                  formatter={(value: any, name: any) => {
                    const label =
                      name === "payments_francs"
                        ? "Payments (francs)"
                        : name === "outstanding_francs"
                        ? "Outstanding (francs)"
                        : name;
                    return [
                      Number(value).toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      }),
                      label,
                    ];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="payments_francs"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="outstanding_francs"
                  stroke="#38bdf8"
                  strokeWidth={2}
                  dot={false}
                />
                <ReferenceLine
                  x={currentYear}
                  stroke="#f97316"
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Green line shows annual payments; blue line shows remaining
            outstanding balance on the &quot;double debt&quot; where data is
            available. Years before 1825 and after the debt is paid use
            placeholders (0), documented in the notes.
          </p>
        </motion.section>
      </motion.div>
    </main>
  );
}
