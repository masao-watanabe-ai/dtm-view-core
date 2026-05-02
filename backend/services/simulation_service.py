from __future__ import annotations

import uuid
from datetime import datetime
from backend.models.trace_model import Trace
from backend.models.decision_model import Decision
from backend.models.human_model import Human
from backend.models.log_model import Log, LogLevel
from backend.services.trace_service import get_trace


def simulate(trace_id: str, signal_confidence: float) -> Trace | None:
    base = get_trace(trace_id)
    if not base:
        return None

    new_id = f"sim-{trace_id}-{uuid.uuid4().hex[:6]}"
    sig_id = base.signals[0].id if base.signals else "unknown"

    if signal_confidence >= 0.8:
        action = "escalate_to_human"
        reason = f"High confidence ({signal_confidence:.2f}) — escalating to human review"
        human = Human(
            id=f"hum-sim-{uuid.uuid4().hex[:6]}",
            name="on-call-engineer",
            role="escalation-reviewer",
            action="escalated",
            timestamp=datetime.utcnow(),
        )
    else:
        action = "notify_only"
        reason = f"Low confidence ({signal_confidence:.2f}) — notification only, no escalation"
        human = None

    decision = Decision(
        id=f"dec-sim-{uuid.uuid4().hex[:6]}",
        signal_id=sig_id,
        action=action,
        reason=reason,
        timestamp=datetime.utcnow(),
    )
    log = Log(
        id=f"log-sim-{uuid.uuid4().hex[:6]}",
        trace_id=new_id,
        level=LogLevel.info,
        message=f"Simulation: confidence={signal_confidence:.2f} → action={action}",
        timestamp=datetime.utcnow(),
    )

    return Trace(
        id=new_id,
        event=base.event,
        signals=base.signals,
        decisions=[decision],
        boundary=base.boundary,
        human=human,
        logs=[log],
        created_at=datetime.utcnow(),
    )
