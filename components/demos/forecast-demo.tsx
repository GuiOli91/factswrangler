"use client";

import { useMemo, useState } from "react";
import { DemoFrame } from "../mdx/blocks";

type Method = "ma" | "linear" | "seasonal";

const METHODS: { id: Method; label: string }[] = [
  { id: "ma", label: "Moving average" },
  { id: "linear", label: "Linear trend" },
  { id: "seasonal", label: "Trend + seasonality" },
];

/** Deterministic fake monthly sales: trend + yearly seasonality + noise. */
function makeSeries(n = 36) {
  let seed = 42;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
  return Array.from({ length: n }, (_, t) => Math.round(120 + 1.8 * t + 22 * Math.sin((2 * Math.PI * (t - 2)) / 12) + 14 * rand()));
}

function linearFit(y: number[]) {
  const n = y.length;
  const mx = (n - 1) / 2;
  const my = y.reduce((a, b) => a + b, 0) / n;
  let num = 0,
    den = 0;
  y.forEach((v, x) => {
    num += (x - mx) * (v - my);
    den += (x - mx) ** 2;
  });
  const slope = num / den;
  return { slope, intercept: my - slope * mx };
}

function forecast(history: number[], horizon: number, method: Method, window: number): number[] {
  const n = history.length;
  if (method === "ma") {
    const w = history.slice(-window);
    const avg = w.reduce((a, b) => a + b, 0) / w.length;
    return Array(horizon).fill(avg);
  }
  const { slope, intercept } = linearFit(history);
  const trend = (x: number) => intercept + slope * x;
  if (method === "linear") return Array.from({ length: horizon }, (_, i) => trend(n + i));

  // seasonal: average residual per month-of-year on top of the trend
  const season = Array(12).fill(0);
  const counts = Array(12).fill(0);
  history.forEach((v, x) => {
    season[x % 12] += v - trend(x);
    counts[x % 12]++;
  });
  return Array.from({ length: horizon }, (_, i) => {
    const x = n + i;
    return trend(x) + season[x % 12] / Math.max(1, counts[x % 12]);
  });
}

function mape(actual: number[], predicted: number[]) {
  return (100 * actual.reduce((s, a, i) => s + Math.abs((a - predicted[i]) / a), 0)) / actual.length;
}

const W = 640,
  H = 260,
  PAD = { l: 40, r: 12, t: 12, b: 28 };

export function ForecastDemo() {
  const series = useMemo(() => makeSeries(), []);
  const [method, setMethod] = useState<Method>("seasonal");
  const [window, setWindow] = useState(6);
  const [horizon, setHorizon] = useState(9);

  const fc = useMemo(() => forecast(series, horizon, method, window), [series, horizon, method, window]);

  // backtest: train on everything but the last 6 months, compare
  const error = useMemo(() => {
    const train = series.slice(0, -6);
    const test = series.slice(-6);
    return mape(test, forecast(train, 6, method, window));
  }, [series, method, window]);

  const total = series.length + horizon;
  const all = [...series, ...fc];
  const yMin = Math.floor(Math.min(...all) / 20) * 20;
  const yMax = Math.ceil(Math.max(...all) / 20) * 20;
  const x = (i: number) => PAD.l + (i / (total - 1)) * (W - PAD.l - PAD.r);
  const y = (v: number) => PAD.t + (1 - (v - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);
  const toPath = (pts: [number, number][]) => pts.map(([i, v], k) => `${k ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  const actualPath = toPath(series.map((v, i) => [i, v]));
  const forecastPath = toPath([[series.length - 1, series.at(-1)!], ...fc.map((v, i) => [series.length + i, v] as [number, number])]);
  const ticks = Array.from({ length: 5 }, (_, i) => yMin + ((yMax - yMin) * i) / 4);

  return (
    <DemoFrame title="Sales forecast simulator">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
        <div>
          <p className="mb-1.5 text-xs font-medium text-muted">Method</p>
          <div className="flex flex-wrap gap-1.5">
            {METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  method === m.id ? "bg-accent text-accent-fg" : "border border-line text-muted hover:text-fg"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        {method === "ma" && (
          <label className="text-xs font-medium text-muted">
            Window: <span className="font-mono text-fg">{window} months</span>
            <input type="range" min={2} max={12} value={window} onChange={(e) => setWindow(+e.target.value)} className="mt-1 block w-40 accent-[var(--accent)]" />
          </label>
        )}
        <label className="text-xs font-medium text-muted">
          Horizon: <span className="font-mono text-fg">{horizon} months</span>
          <input type="range" min={3} max={18} value={horizon} onChange={(e) => setHorizon(+e.target.value)} className="mt-1 block w-40 accent-[var(--accent)]" />
        </label>
        <div className="ml-auto text-right">
          <p className="text-xs text-muted">Backtest error (MAPE, last 6 mo)</p>
          <p className={`font-mono text-2xl font-bold ${error < 6 ? "text-accent" : error < 12 ? "text-amber-500" : "text-red-500"}`}>
            {error.toFixed(1)}%
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 w-full" role="img" aria-label="Line chart of monthly sales with forecast">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} stroke="var(--line)" />
            <text x={PAD.l - 6} y={y(t) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">
              {Math.round(t)}
            </text>
          </g>
        ))}
        <rect x={x(series.length - 1)} y={PAD.t} width={W - PAD.r - x(series.length - 1)} height={H - PAD.t - PAD.b} fill="var(--accent)" opacity="0.07" />
        {[0, 12, 24, 36].filter((i) => i < total).map((i) => (
          <text key={i} x={x(i)} y={H - 8} fontSize="10" fill="var(--muted)" textAnchor="middle">
            Year {i / 12 + 1}
          </text>
        ))}
        <path d={actualPath} fill="none" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round" />
        <path d={forecastPath} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="6 4" strokeLinejoin="round" />
      </svg>
      <div className="mt-2 flex gap-5 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-fg" /> Actual sales</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-accent" /> Forecast</span>
      </div>
    </DemoFrame>
  );
}
