import type { Boundary } from "../types/dtm";

const card: React.CSSProperties = {
  border: "1px solid #6ee7b7",
  borderRadius: 8,
  padding: "0.75rem",
  background: "#f0fdf4",
};
const lbl: React.CSSProperties = { color: "#10b981", fontSize: "0.75em", fontWeight: "bold", marginRight: "0.4rem" };
const row: React.CSSProperties = { marginBottom: "0.2rem" };

export function BoundaryPanel({ boundary }: { boundary: Boundary }) {
  return (
    <div style={card}>
      <h3 style={{ margin: "0 0 0.6rem", fontSize: "0.95rem" }}>
        Boundary <span style={{ fontWeight: "normal", color: "#6b7280" }}>— 制約・ルール</span>
      </h3>
      <div style={row}><span style={lbl}>name</span>{boundary.name}</div>
      <div style={row}><span style={lbl}>active</span>{boundary.active ? "✓ active" : "inactive"}</div>
      <div style={{ ...row, marginTop: "0.4rem" }}>
        <span style={lbl}>rules</span>
        <ul style={{ margin: "0.2rem 0 0 1rem", padding: 0 }}>
          {boundary.rules.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
