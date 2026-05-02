import { useEffect, useState } from "react";
import { useTraceStore } from "../store/traceStore";
import { TraceFlow } from "../components/TraceFlow";
import { SignalPanel } from "../components/SignalPanel";
import { DecisionPanel } from "../components/DecisionPanel";
import { BoundaryPanel } from "../components/BoundaryPanel";
import { HumanPanel } from "../components/HumanPanel";
import { ComparisonView } from "../components/ComparisonView";

export function TracePage() {
  const {
    trace, loading, error, loadTrace, selectedNode,
    comparison, compareLoading, compareError, runCompare,
    simTrace, simLoading, simError, runSimulate,
  } = useTraceStore();
  const [confidence, setConfidence] = useState(0.9);

  useEffect(() => {
    loadTrace("demo-trace");
  }, [loadTrace]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!trace) return null;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem", maxWidth: 1200 }}>
      <h2 style={{ margin: "0 0 0.75rem" }}>Trace: {trace.id}</h2>

      <TraceFlow trace={trace} />

      {selectedNode && (
        <p style={{ marginTop: "0.4rem", color: "#0066cc", fontSize: "0.85em" }}>
          Selected node: {selectedNode}
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <SignalPanel signals={trace.signals} />
        <DecisionPanel decisions={trace.decisions} />
        <BoundaryPanel boundary={trace.boundary} />
        <HumanPanel human={trace.human} />
      </div>

      {/* Simulation */}
      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
        <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>Simulation</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <label style={{ fontSize: "0.9rem" }}>
            Signal Confidence:&nbsp;
            <strong style={{ color: confidence >= 0.8 ? "#15803d" : "#b45309" }}>
              {confidence.toFixed(2)}
            </strong>
            &nbsp;
            <span style={{ fontSize: "0.75em", color: "#6b7280" }}>
              {confidence >= 0.8 ? "→ escalate_to_human" : "→ notify_only"}
            </span>
          </label>
          <input
            type="range" min={0} max={1} step={0.05}
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            style={{ width: 160 }}
          />
          <button
            onClick={() => runSimulate("demo-trace", confidence)}
            disabled={simLoading}
            style={{ padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.9rem" }}
          >
            {simLoading ? "Running…" : "Run Simulation"}
          </button>
        </div>
        {simError && <p style={{ color: "red", fontSize: "0.85em" }}>{simError}</p>}
        {simTrace && (
          <div>
            <p style={{ margin: "0.5rem 0 0.25rem", fontSize: "0.85em", color: "#6b7280" }}>
              Simulated trace: <code>{simTrace.id}</code>
              &nbsp;·&nbsp;Decision: <strong>{simTrace.decisions[0]?.action}</strong>
              &nbsp;·&nbsp;Human: <strong>{simTrace.human ? simTrace.human.action : "none"}</strong>
            </p>
            <TraceFlow trace={simTrace} />
          </div>
        )}
      </div>

      {/* Compare */}
      <div style={{ marginTop: "1.5rem", borderTop: "1px solid #e5e7eb", paddingTop: "1rem" }}>
        <button
          onClick={() => runCompare("demo-trace", "demo-trace-2")}
          disabled={compareLoading}
          style={{ padding: "0.4rem 1rem", cursor: "pointer", fontSize: "0.9rem" }}
        >
          {compareLoading ? "Comparing…" : "Compare demo-trace vs demo-trace-2"}
        </button>
        {compareError && <p style={{ color: "red", fontSize: "0.85em" }}>{compareError}</p>}
        {comparison && <ComparisonView result={comparison} />}
      </div>

      <details style={{ marginTop: "1rem" }}>
        <summary style={{ cursor: "pointer", fontSize: "0.85em", color: "#6b7280" }}>Raw JSON</summary>
        <pre style={{ background: "#f4f4f4", padding: "1rem", overflow: "auto", fontSize: "0.8em" }}>
          {JSON.stringify(trace, null, 2)}
        </pre>
      </details>
    </div>
  );
}
