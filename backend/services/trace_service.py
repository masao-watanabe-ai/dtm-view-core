from __future__ import annotations

from datetime import datetime
from backend.models.trace_model import Trace
from backend.models.event_model import Event
from backend.models.signal_model import Signal
from backend.models.decision_model import Decision
from backend.models.boundary_model import Boundary
from backend.models.human_model import Human
from backend.models.log_model import Log, LogLevel

_DEMO_TRACE_ID = "demo-trace"


def _build_demo_trace(trace_id: str = _DEMO_TRACE_ID) -> Trace:
    event = Event(
        id="evt-001",
        source="sensor-A",
        type="threshold_exceeded",
        payload={"metric": "cpu", "value": 92},
        timestamp=datetime(2026, 5, 3, 9, 0, 0),
    )
    signal = Signal(
        id="sig-001",
        event_id=event.id,
        type="alert",
        value="cpu_high",
        timestamp=datetime(2026, 5, 3, 9, 0, 1),
    )
    decision = Decision(
        id="dec-001",
        signal_id=signal.id,
        action="scale_up",
        reason="CPU usage exceeded 90% threshold",
        timestamp=datetime(2026, 5, 3, 9, 0, 2),
    )
    boundary = Boundary(
        id="bnd-001",
        name="resource-policy",
        rules=["max_instances=10", "scale_step=2"],
        active=True,
    )
    human = Human(
        id="hum-001",
        name="ops-engineer",
        role="reviewer",
        action="approved",
        timestamp=datetime(2026, 5, 3, 9, 0, 5),
    )
    log = Log(
        id="log-001",
        trace_id=trace_id,
        level=LogLevel.info,
        message="Scale-up decision approved and executed.",
        timestamp=datetime(2026, 5, 3, 9, 0, 6),
    )
    return Trace(
        id=trace_id,
        event=event,
        signals=[signal],
        decisions=[decision],
        boundary=boundary,
        human=human,
        logs=[log],
        created_at=datetime(2026, 5, 3, 9, 0, 0),
    )


_DEMO_TRACE_2_ID = "demo-trace-2"


def _build_demo_trace_2() -> Trace:
    event = Event(
        id="evt-002",
        source="sensor-B",
        type="threshold_exceeded",
        payload={"metric": "cpu", "value": 85},
        timestamp=datetime(2026, 5, 3, 10, 0, 0),
    )
    signal = Signal(
        id="sig-002",
        event_id=event.id,
        type="warning",
        value="cpu_medium",
        timestamp=datetime(2026, 5, 3, 10, 0, 1),
    )
    decision = Decision(
        id="dec-002",
        signal_id=signal.id,
        action="notify_only",
        reason="CPU approaching threshold, monitoring required",
        timestamp=datetime(2026, 5, 3, 10, 0, 2),
    )
    boundary = Boundary(
        id="bnd-002",
        name="resource-policy-strict",
        rules=["max_instances=5", "scale_step=1"],
        active=True,
    )
    log = Log(
        id="log-002",
        trace_id=_DEMO_TRACE_2_ID,
        level=LogLevel.warn,
        message="Notification sent. No scale action taken.",
        timestamp=datetime(2026, 5, 3, 10, 0, 3),
    )
    return Trace(
        id=_DEMO_TRACE_2_ID,
        event=event,
        signals=[signal],
        decisions=[decision],
        boundary=boundary,
        human=None,
        logs=[log],
        created_at=datetime(2026, 5, 3, 10, 0, 0),
    )


_store: dict[str, Trace] = {
    _DEMO_TRACE_ID: _build_demo_trace(),
    _DEMO_TRACE_2_ID: _build_demo_trace_2(),
}


def get_trace(trace_id: str) -> Trace | None:
    return _store.get(trace_id)


def list_traces() -> list[Trace]:
    return list(_store.values())


def compare_traces(base_id: str, target_id: str) -> dict | None:
    base = get_trace(base_id)
    target = get_trace(target_id)
    if not base or not target:
        return None

    def row(field: str, bv: str | None, tv: str | None) -> dict:
        return {"field": field, "base": bv, "target": tv, "changed": bv != tv}

    b_dec = base.decisions[0] if base.decisions else None
    t_dec = target.decisions[0] if target.decisions else None
    decisions = [
        row("action", b_dec.action if b_dec else None, t_dec.action if t_dec else None),
        row("reason", b_dec.reason if b_dec else None, t_dec.reason if t_dec else None),
    ]

    boundary = [
        row("name", base.boundary.name, target.boundary.name),
        row("active", str(base.boundary.active), str(target.boundary.active)),
        row("rules", ", ".join(base.boundary.rules), ", ".join(target.boundary.rules)),
    ]

    bh, th = base.human, target.human
    human = [
        row("intervention", "yes" if bh else "none", "yes" if th else "none"),
        row("role", bh.role if bh else None, th.role if th else None),
        row("action", bh.action if bh else None, th.action if th else None),
    ]

    return {"base_id": base_id, "target_id": target_id, "decisions": decisions, "boundary": boundary, "human": human}
