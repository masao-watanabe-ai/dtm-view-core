import type { Trace } from "../types/dtm";

export interface DiffRow {
  field: string;
  base: string | null;
  target: string | null;
  changed: boolean;
}

export interface ComparisonResult {
  base_id: string;
  target_id: string;
  decisions: DiffRow[];
  boundary: DiffRow[];
  human: DiffRow[];
}

const BASE_URL = "http://localhost:8000";

export async function fetchTrace(traceId: string): Promise<Trace> {
  const res = await fetch(`${BASE_URL}/api/trace/${traceId}`);
  if (!res.ok) throw new Error(`Failed to fetch trace: ${res.status}`);
  return res.json();
}

export async function fetchTraces(): Promise<Trace[]> {
  const res = await fetch(`${BASE_URL}/api/traces`);
  if (!res.ok) throw new Error(`Failed to fetch traces: ${res.status}`);
  return res.json();
}

export async function compareTraces(baseId: string, targetId: string): Promise<ComparisonResult> {
  const res = await fetch(`${BASE_URL}/api/compare`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base_trace_id: baseId, target_trace_id: targetId }),
  });
  if (!res.ok) throw new Error(`Failed to compare traces: ${res.status}`);
  return res.json();
}

export async function simulateTrace(traceId: string, signalConfidence: number): Promise<Trace> {
  const res = await fetch(`${BASE_URL}/api/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ trace_id: traceId, signal_confidence: signalConfidence }),
  });
  if (!res.ok) throw new Error(`Failed to simulate: ${res.status}`);
  return res.json();
}
