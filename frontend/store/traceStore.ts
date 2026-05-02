import { create } from "zustand";
import type { Trace } from "../types/dtm";
import { fetchTrace, compareTraces as apiCompare, simulateTrace as apiSimulate } from "../api/client";
import type { ComparisonResult } from "../api/client";

interface TraceStore {
  trace: Trace | null;
  loading: boolean;
  error: string | null;
  selectedNode: string | null;
  comparison: ComparisonResult | null;
  compareLoading: boolean;
  compareError: string | null;
  simTrace: Trace | null;
  simLoading: boolean;
  simError: string | null;
  loadTrace: (traceId: string) => Promise<void>;
  setSelectedNode: (nodeId: string | null) => void;
  runCompare: (baseId: string, targetId: string) => Promise<void>;
  runSimulate: (traceId: string, confidence: number) => Promise<void>;
}

export const useTraceStore = create<TraceStore>((set) => ({
  trace: null,
  loading: false,
  error: null,
  selectedNode: null,
  comparison: null,
  compareLoading: false,
  compareError: null,
  simTrace: null,
  simLoading: false,
  simError: null,

  loadTrace: async (traceId) => {
    set({ loading: true, error: null });
    try {
      const trace = await fetchTrace(traceId);
      set({ trace, loading: false });
    } catch (e) {
      set({ error: String(e), loading: false });
    }
  },

  setSelectedNode: (nodeId) => set({ selectedNode: nodeId }),

  runCompare: async (baseId, targetId) => {
    set({ compareLoading: true, compareError: null, comparison: null });
    try {
      const comparison = await apiCompare(baseId, targetId);
      set({ comparison, compareLoading: false });
    } catch (e) {
      set({ compareError: String(e), compareLoading: false });
    }
  },

  runSimulate: async (traceId, confidence) => {
    set({ simLoading: true, simError: null, simTrace: null });
    try {
      const simTrace = await apiSimulate(traceId, confidence);
      set({ simTrace, simLoading: false });
    } catch (e) {
      set({ simError: String(e), simLoading: false });
    }
  },
}));
