# DTM View Core

> **DTM View Core is not a visualization tool.**
> **It is a decision system interface.**

---

## Purpose

DTM View Core provides an interface for tracing, simulating, and comparing decisions made by AI-driven systems.

**AI is Signal. Decision is designed.**

Signals emerge from events — but decisions are not automatic.
They are shaped by boundaries, validated by humans, and logged as accountable records.
This system makes that structure visible and testable.

---

## Decision Trace Model (DTM)

```
Event → Signal → Decision → Boundary → Human → Log
```

| Node | Role |
|---|---|
| **Event** | Something that happened in the environment |
| **Signal** | AI's interpretation of the event |
| **Decision** | The action chosen — distinct from Signal |
| **Boundary** | Constraints and rules that govern decisions |
| **Human** | Optional human intervention or approval |
| **Log** | Immutable record of the trace outcome |

Signal and Decision are always separate nodes.
A signal does not decide — it informs.

---

## MVP Features

| Feature | Description |
|---|---|
| **TraceFlow** | React Flow graph of the full DTM trace |
| **Detail Panels** | Signal / Decision / Boundary / Human panels per trace |
| **Compare** | Field-level diff of Decision / Boundary / Human between two traces |
| **Simulation** | Vary signal confidence and observe how Decision and Human change |

---

## Getting Started

### Backend

```bash
cd dtm-view-core
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### Frontend

```bash
cd dtm-view-core/frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Docker Compose

```bash
cd dtm-view-core
docker compose up --build
```

---

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/traces` | List all traces |
| `GET` | `/api/trace/{trace_id}` | Get a single trace |
| `POST` | `/api/compare` | Compare Decision / Boundary / Human between two traces |
| `POST` | `/api/simulate` | Simulate Decision outcome by varying signal confidence |

### POST /api/compare

```json
{ "base_trace_id": "demo-trace", "target_trace_id": "demo-trace-2" }
```

### POST /api/simulate

```json
{ "trace_id": "demo-trace", "signal_confidence": 0.9 }
```

confidence ≥ 0.8 → `escalate_to_human`
confidence < 0.8 → `notify_only`

---

## Roadmap

| Area | Description |
|---|---|
| **WebSocket** | Real-time trace streaming |
| **Ledger / DB** | Persistent trace storage |
| **DSL integration** | Define decision rules as code |
| **Decision Trace Studio** | Full authoring and replay environment |
