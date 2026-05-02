import type { ComparisonResult, DiffRow } from "../api/client";

const SECTION_LABELS: Record<keyof Omit<ComparisonResult, "base_id" | "target_id">, string> = {
  decisions: "Decision",
  boundary: "Boundary",
  human: "Human",
};

const th: React.CSSProperties = {
  padding: "0.4rem 0.75rem",
  background: "#f3f4f6",
  borderBottom: "2px solid #d1d5db",
  textAlign: "left",
  fontSize: "0.8em",
  fontWeight: "bold",
  color: "#374151",
};
const td: React.CSSProperties = { padding: "0.35rem 0.75rem", fontSize: "0.85em", borderBottom: "1px solid #e5e7eb" };
const changedRow: React.CSSProperties = { background: "#fef9c3" };

function SectionRows({ section, rows }: { section: string; rows: DiffRow[] }) {
  return (
    <>
      {rows.map((r, i) => (
        <tr key={`${section}-${i}`} style={r.changed ? changedRow : undefined}>
          {i === 0 && (
            <td style={{ ...td, fontWeight: "bold", color: "#6b7280", verticalAlign: "top" }} rowSpan={rows.length}>
              {section}
            </td>
          )}
          <td style={td}>{r.field}</td>
          <td style={{ ...td, color: r.changed ? "#b45309" : "#111" }}>{r.base ?? "—"}</td>
          <td style={{ ...td, color: r.changed ? "#15803d" : "#111" }}>{r.target ?? "—"}</td>
          <td style={{ ...td, textAlign: "center" }}>{r.changed ? "✓" : ""}</td>
        </tr>
      ))}
    </>
  );
}

export function ComparisonView({ result }: { result: ComparisonResult }) {
  return (
    <div style={{ marginTop: "1rem" }}>
      <h3 style={{ margin: "0 0 0.5rem", fontSize: "1rem" }}>
        Comparison: <code>{result.base_id}</code> → <code>{result.target_id}</code>
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th style={th}>Section</th>
            <th style={th}>Field</th>
            <th style={th}>Base</th>
            <th style={th}>Target</th>
            <th style={{ ...th, textAlign: "center" }}>Changed</th>
          </tr>
        </thead>
        <tbody>
          {(["decisions", "boundary", "human"] as const).map((key) => (
            <SectionRows key={key} section={SECTION_LABELS[key]} rows={result[key]} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
