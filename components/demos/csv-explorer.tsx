"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { DemoFrame } from "../mdx/blocks";

const SAMPLE = `month,region,orders,revenue,returns
2025-01,North,412,18230.50,12
2025-01,South,380,16010.00,9
2025-01,West,295,13105.75,
2025-02,North,430,19011.20,15
2025-02,South,355,15220.10,7
2025-02,West,310,13890.00,11
2025-03,North,468,20877.40,10
2025-03,South,402,17550.90,13
2025-03,West,"3,10",13200.00,8
2025-04,North,501,22340.00,14
2025-04,South,421,18311.60,
2025-04,West,334,14998.30,6`;

/** Minimal CSV parser: handles quoted fields, escaped quotes and CRLF. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') (field += '"'), i++;
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") row.push(field), (field = "");
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field), rows.push(row), (row = []), (field = "");
    } else field += c;
  }
  if (field || row.length) row.push(field), rows.push(row);
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

type Profile = {
  name: string;
  kind: "number" | "text";
  missing: number;
  invalid: number;
  values: string[];
  nums: number[];
  min?: number;
  max?: number;
  mean?: number;
  distinct: number;
};

function profile(header: string[], body: string[][]): Profile[] {
  return header.map((name, ci) => {
    const values = body.map((r) => (r[ci] ?? "").trim());
    const present = values.filter((v) => v !== "");
    const parsed = present.map((v) => Number(v));
    const okNums = parsed.filter((n) => !Number.isNaN(n));
    // numeric if at least 80% of present values parse as numbers
    const kind = present.length && okNums.length / present.length >= 0.8 ? "number" : "text";
    const p: Profile = {
      name,
      kind,
      missing: values.length - present.length,
      invalid: kind === "number" ? present.length - okNums.length : 0,
      values,
      nums: okNums,
      distinct: new Set(present).size,
    };
    if (kind === "number" && okNums.length) {
      p.min = Math.min(...okNums);
      p.max = Math.max(...okNums);
      p.mean = okNums.reduce((a, b) => a + b, 0) / okNums.length;
    }
    return p;
  });
}

function bars(p: Profile): { label: string; count: number }[] {
  if (p.kind === "number" && p.min !== undefined && p.max !== undefined) {
    const bins = 8;
    const step = (p.max - p.min) / bins || 1;
    const counts = Array(bins).fill(0);
    p.nums.forEach((n) => counts[Math.min(bins - 1, Math.floor((n - p.min!) / step))]++);
    return counts.map((count, i) => ({ label: fmt(p.min! + i * step), count }));
  }
  const freq = new Map<string, number>();
  p.values.filter(Boolean).forEach((v) => freq.set(v, (freq.get(v) ?? 0) + 1));
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([label, count]) => ({ label, count }));
}

const fmt = (n?: number) => (n === undefined ? "—" : Math.abs(n) >= 1000 ? n.toLocaleString("en", { maximumFractionDigits: 0 }) : +n.toFixed(2) + "");

export function CsvExplorer() {
  const [text, setText] = useState(SAMPLE);
  const [selected, setSelected] = useState(2);

  const { header, body, profiles } = useMemo(() => {
    const rows = parseCsv(text);
    const [header = [], ...body] = rows;
    return { header, body, profiles: profile(header, body) };
  }, [text]);

  const current = profiles[Math.min(selected, profiles.length - 1)];
  const chart = current ? bars(current) : [];
  const maxCount = Math.max(1, ...chart.map((b) => b.count));
  const issues = profiles.reduce((s, p) => s + p.missing + p.invalid, 0);

  const onFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2_000_000) return alert("Please use a file under 2 MB for this demo.");
    file.text().then((t) => {
      setText(t);
      setSelected(0);
    });
  };

  return (
    <DemoFrame title="CSV data-quality explorer">
      <div className="flex flex-wrap items-center gap-2">
        <label className="cursor-pointer rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-accent-fg hover:opacity-90">
          Upload a CSV
          <input type="file" accept=".csv,text/csv" className="sr-only" onChange={onFile} />
        </label>
        <button onClick={() => (setText(SAMPLE), setSelected(2))} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted hover:text-fg">
          Reset sample
        </button>
        <span className="ml-auto font-mono text-xs text-muted">
          {body.length} rows · {header.length} cols ·{" "}
          <span className={issues ? "text-amber-500" : "text-accent"}>{issues} issues</span>
        </span>
      </div>
      <p className="mt-2 text-xs text-muted">Your file never leaves the browser. Or edit the text below directly.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="mt-3 h-28 w-full resize-y rounded-xl border border-line bg-bg p-3 font-mono text-xs leading-relaxed outline-none focus:border-accent"
      />

      {profiles.length > 0 && (
        <>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p, i) => (
              <button
                key={p.name + i}
                onClick={() => setSelected(i)}
                className={`rounded-xl border p-3 text-left transition ${i === selected ? "border-accent bg-accent-soft/30" : "border-line hover:border-fg/30"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate font-mono text-sm font-semibold">{p.name || `col ${i + 1}`}</span>
                  <span className="rounded bg-line px-1.5 text-[10px] uppercase text-muted">{p.kind}</span>
                </div>
                <div className="mt-1.5 font-mono text-[11px] text-muted">
                  {p.kind === "number" ? `min ${fmt(p.min)} · avg ${fmt(p.mean)} · max ${fmt(p.max)}` : `${p.distinct} distinct values`}
                </div>
                {(p.missing > 0 || p.invalid > 0) && (
                  <div className="mt-1 text-[11px] text-amber-500">
                    {p.missing > 0 && `${p.missing} missing`} {p.invalid > 0 && `${p.invalid} not numeric`}
                  </div>
                )}
              </button>
            ))}
          </div>

          {current && (
            <div className="mt-6">
              <p className="mb-3 text-sm font-medium">
                {current.kind === "number" ? "Distribution of" : "Top values in"} <span className="font-mono text-accent">{current.name}</span>
              </p>
              <div className="space-y-1.5">
                {chart.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="w-20 shrink-0 truncate text-right font-mono text-muted">{b.label}</span>
                    <div className="h-5 flex-1 rounded bg-line/50">
                      <div className="h-full rounded bg-accent transition-all" style={{ width: `${(b.count / maxCount) * 100}%` }} />
                    </div>
                    <span className="w-6 font-mono text-muted">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </DemoFrame>
  );
}
