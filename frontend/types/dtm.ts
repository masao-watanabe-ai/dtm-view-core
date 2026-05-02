export type LogLevel = "info" | "warn" | "error";

export interface Event {
  id: string;
  source: string;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface Signal {
  id: string;
  event_id: string;
  type: string;
  value: string;
  timestamp: string;
}

export interface Decision {
  id: string;
  signal_id: string;
  action: string;
  reason: string;
  timestamp: string;
}

export interface Boundary {
  id: string;
  name: string;
  rules: string[];
  active: boolean;
}

export interface Human {
  id: string;
  name: string;
  role: string;
  action: string;
  timestamp: string;
}

export interface Log {
  id: string;
  trace_id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
}

export interface Trace {
  id: string;
  event: Event;
  signals: Signal[];
  decisions: Decision[];
  boundary: Boundary;
  human?: Human;
  logs: Log[];
  created_at: string;
}
