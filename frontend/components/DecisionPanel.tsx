import type { Decision } from "../types/dtm";

const card: React.CSSProperties = {
  border: "1px solid #fca5a5",
  borderRadius: 8,
  padding: "0.75rem",
  background: "#fff7ed",
};
const lbl: React.CSSProperties = { color: "#ef4444", fontSize: "0.75em", fontWeight: "bold", marginRight: "0.4rem" };
const row: React.CSSProperties = { marginBottom: "0.2rem" };

export function DecisionPanel({ decisions }: { decisions: Decision[] }) {
  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem" }}>
        Decision <span style={{ fontWeight: "normal", color: "#6b7280" }}>— 選択された行動（Signal とは別）</span>
      </h3>
      {decisions.map((d, i) => (
        <div key={d.id} style={{ paddingBottom: "0.5rem", borderBottom: i < decisions.length - 1 ? "1px solid #fecaca" : "none" }}>
          <div style={row}><span style={lbl}>action</span>{d.action}</div>
          <div style={row}><span style={lbl}>reason</span>{d.reason}</div>
          <div style={row}><span style={lbl}>signal basis</span>{d.signal_id}</div>
          <div style={row}><span style={lbl}>timestamp</span>{d.timestamp}</div>
        </div>
      ))}
    </div>
  );
}
