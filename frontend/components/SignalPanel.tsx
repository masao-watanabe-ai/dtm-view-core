import type { Signal } from "../types/dtm";

const card: React.CSSProperties = {
  border: "1px solid #93c5fd",
  borderRadius: 8,
  padding: "0.75rem",
  background: "#eff6ff",
};
const lbl: React.CSSProperties = { color: "#3b82f6", fontSize: "0.75em", fontWeight: "bold", marginRight: "0.4rem" };
const row: React.CSSProperties = { marginBottom: "0.2rem" };

export function SignalPanel({ signals }: { signals: Signal[] }) {
  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem" }}>
        Signal <span style={{ fontWeight: "normal", color: "#6b7280" }}>— Event 解釈</span>
      </h3>
      {signals.map((s, i) => (
        <div key={s.id} style={{ paddingBottom: "0.5rem", borderBottom: i < signals.length - 1 ? "1px solid #bfdbfe" : "none" }}>
          <div style={row}><span style={lbl}>type</span>{s.type}</div>
          <div style={row}><span style={lbl}>value</span>{s.value}</div>
          <div style={row}><span style={lbl}>source (event_id)</span>{s.event_id}</div>
          <div style={row}><span style={lbl}>timestamp</span>{s.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
