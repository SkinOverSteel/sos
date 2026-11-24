# Skin Over Steel Log workflow

This pilot models which actions are available after a member starts a browser-local log. It tracks the presence of an intervention and outcome, and the number of check-ins. The Next.js browser tests cover storage and UI behavior.

## Story: Record and close a log

> As a member, I want to record an intervention and check-ins, then record an outcome when the trial ends.

### A new log starts with a baseline and no further entries

```quint
type Log = { hasIntervention: bool, checkins: int, closed: bool }
pure val initial: Log = { hasIntervention: false, checkins: 0, closed: false }
```

### Editing the intervention makes it available for check-ins and closure

```quint
pure def recordIntervention(log: Log): Log =
  { ...log, hasIntervention: true }
```

### Adding a check-in requires an intervention and both ratings from one to five

```quint
pure def canAddCheckin(log: Log, firmness: int, confidence: int): bool =
  log.hasIntervention and 1 <= firmness and firmness <= 5 and 1 <= confidence and confidence <= 5

pure def addCheckin(log: Log, firmness: int, confidence: int): Log =
  { ...log, checkins: log.checkins + 1 }

pure val firmnessValues = Set(0, 1, 2, 3, 4, 5, 6)
pure val confidenceValues = Set(0, 1, 2, 3, 4, 5, 6)
```

### Removing an existing check-in subtracts one and keeps the log open or closed

```quint
pure def canRemoveCheckin(log: Log): bool = log.checkins > 0
pure def removeCheckin(log: Log): Log = { ...log, checkins: log.checkins - 1 }

pure def stepRemovalKeepsStage(before: Log, after: Log): bool =
  (after.checkins < before.checkins) implies
    (after.checkins == before.checkins - 1 and before.closed == after.closed)
```

### A member can close an open log once the intervention exists

A check-in is optional.

```quint
pure def canClose(log: Log): bool = log.hasIntervention and not(log.closed)
pure def close(log: Log): Log = { ...log, closed: true }

pure def sometimesClosedWithoutCheckins(log: Log): bool =
  log.closed and log.checkins == 0
```

### A member can reopen a closed log and keep the check-ins

```quint
pure def canReopen(log: Log): bool = log.closed
pure def reopen(log: Log): Log = { ...log, closed: false }

pure def stepReopenKeepsCheckins(before: Log, after: Log): bool =
  (before.closed and not(after.closed)) implies before.checkins == after.checkins
```

### A log with no intervention has no check-ins or outcome

This rule covers logs created through the form. Imported backups follow the existing version 1 decoder.

```quint
pure def alwaysInterventionRequired(log: Log): bool =
  not(log.hasIntervention) implies (log.checkins == 0 and not(log.closed))

pure def alwaysNonnegativeCheckins(log: Log): bool = log.checkins >= 0
```

### Check-ins can still be added to a closed log

```quint
pure def sometimesClosedWithCheckins(log: Log): bool = log.closed and log.checkins > 0
```
