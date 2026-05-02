import { useCallback } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Trace } from "../types/dtm";
import { useTraceStore } from "../store/traceStore";

const COL = [50, 250, 450, 650, 850, 1050];
const rowY = (i: number) => 80 + i * 120;

function label(title: string, sub: string) {
  return (
    <div style={{ textAlign: "center", lineHeight: 1.4 }}>
      <strong>{title}</strong>
      <br />
      <span style={{ fontSize: "0.75em", color: "#555" }}>{sub}</span>
    </div>
  );
}

function buildGraph(trace: Trace): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Event
  nodes.push({ id: trace.event.id, position: { x: COL[0], y: rowY(0) }, data: { label: label("Event", trace.event.type) } });

  // Signals (separate nodes)
  trace.signals.forEach((s, i) => {
    nodes.push({ id: s.id, position: { x: COL[1], y: rowY(i) }, data: { label: label("Signal", s.type) } });
    edges.push({ id: `evt__${s.id}`, source: trace.event.id, target: s.id });
  });

  // Decisions (separate nodes, distinct from Signal)
  trace.decisions.forEach((d, i) => {
    nodes.push({ id: d.id, position: { x: COL[2], y: rowY(i) }, data: { label: label("Decision", d.action) } });
    const src = trace.signals.find((s) => s.id === d.signal_id)?.id ?? trace.signals[0]?.id;
    if (src) edges.push({ id: `sig__${d.id}`, source: src, target: d.id });
  });

  // Boundary (required)
  nodes.push({ id: trace.boundary.id, position: { x: COL[3], y: rowY(0) }, data: { label: label("Boundary", trace.boundary.name) } });
  trace.decisions.forEach((d) =>
    edges.push({ id: `dec__${trace.boundary.id}__${d.id}`, source: d.id, target: trace.boundary.id })
  );

  // Human (optional)
  if (trace.human) {
    nodes.push({ id: trace.human.id, position: { x: COL[4], y: rowY(0) }, data: { label: label("Human", trace.human.name) } });
    edges.push({ id: `bnd__hum`, source: trace.boundary.id, target: trace.human.id });
  }

  // Log
  const logSrc = trace.human?.id ?? trace.boundary.id;
  const logCol = trace.human ? COL[5] : COL[4];
  trace.logs.forEach((l, i) => {
    nodes.push({ id: l.id, position: { x: logCol, y: rowY(i) }, data: { label: label("Log", l.level) } });
    edges.push({ id: `log__${l.id}`, source: logSrc, target: l.id });
  });

  return { nodes, edges };
}

export function TraceFlow({ trace }: { trace: Trace }) {
  const setSelectedNode = useTraceStore((s) => s.setSelectedNode);
  const { nodes, edges } = buildGraph(trace);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => setSelectedNode(node.id),
    [setSelectedNode]
  );

  return (
    <div style={{ height: 400, border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
