import type { Human } from "../types/dtm";

const card: React.CSSProperties = {
  border: "1px solid #c4b5fd",
  borderRadius: 8,
  padding: "0.75rem",
  background: "#faf5ff",
};
const lbl: React.CSSProperties = { color: "#8b5cf6", fontSize: "0.75em", fontWeight: "bold", marginRight: "0.4rem" };
const row: React.CSSProperties = { marginBottom: "0.2rem" };

export function HumanPanel({ human }: { human?: Human }) {
  if (!human) {
    return (
      <div style={{ ...card, background: "#f9fafb", borderColor: "#d1d5db" }}>
        <h3 style={{ margin: "0 0 0.4rem", fontSize: "0.95rem", color: "#9ca3af" }}>
          Human <span style={{ fontWeight: "normal" }}>— 介入なし</span>
        </h3>
        <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.85em" }}>No human intervention in this trace.</p>
      </div>
    );
  }

  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem" }}>
        Human <span style={{ fontWeight: "normal", color: "#6b7280" }}>— 人間の介入</span>
      </h3>
      <div style={row}><span style={lbl}>name</span>{human.name}</div>
      <div style={row}><span style={lbl}>role</span>{human.role}</div>
      <div style={row}><span style={lbl}>action</span>{human.action}</div>
      <div style={row}><span style={lbl}>timestamp</span>{human.timestamp}</div>
    </div>
  );
}
