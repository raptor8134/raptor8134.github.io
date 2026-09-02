---
meta:
  - { key: Scope, value: "[ROCKETRY ORG], year 3" }
  - { key: Role, value: Airframe lead }
skills: "structural design and FEA · buckling and load path analysis · sheet metal design and forming · design for manufacture · systems integration · propulsion sizing"
---

**At a glance**

- Extruded-column and sheet metal skeletal structure with removable aeroshell
- Designed to support non-structural tanks ahead of a planned LOX vehicle
- Buckling-critical due to a full-width payload deployment cutout; verified by FEA, hand calculation, and independent re-analysis
- Custom 3D printed forming dies, driven on a drill press
- Engine resized from the HalfCat reference design to roughly double baseline thrust
- Built and integrated; not yet flown, pending resolution of ignition issues

## Why not composites

Our previous vehicle, Poseidon, was a composite airframe built for competition performance. Tangerine had a different job: it is a test vehicle, and performance was explicitly not a requirement. Once that constraint comes off, composite fabrication stops being worth what it costs — it is slow, it consumes single-use tooling, and a finished monocoque tube is a sealed box you cannot get inside.

What we needed instead was access. Three things drove the architecture:

**Plumbing access.** A liquid bipropellant test vehicle is mostly plumbing, and every iteration means getting to it. A skeletal structure exposes the entire run.

**Non-structural tank development.** The team is working toward a LOX vehicle, where at minimum the pressurant tank cannot carry airframe loads. That is a significant departure from a design where the tank *is* the airframe, and it needed a structure to develop against before the propellant change compounded the risk.

**Aerodynamics as a separable problem.** A removable aeroshell handles the airflow and comes off entirely for ground work, which decouples aerodynamic surfaces from structural and plumbing iteration.

## Structural architecture

The vehicle is a column-and-ring skeleton: extruded columns running the vehicle length *[PROFILE, ALLOY — TK]*, tied by sheet metal reinforcement segments *[MATERIAL, GAUGE — TK]*, with a non-load-bearing aeroshell over the top.

The design driver is a cutout in the side of the vehicle for payload deployment. Removing material from the side of a slender compression structure is the classic way to make it buckle, and it is the reason this airframe needed real analysis rather than a sizing rule.

The load path resolves it without any local reinforcement, by asymmetry. Of the four columns, **three are sized to carry the entire flight load.** The fourth exists only to retain the tank and is truncated before the payload section begins. The payload cutout therefore interrupts a member that carries no airframe load — the primary load path passes the cutout untouched.

This is worth stating plainly because an un-reinforced cutout in a buckling-critical structure looks like an omission unless the load path is explained. It was the point of the architecture: put the opening where the structure does not need to be continuous, rather than opening the structure and patching it.

I also hand-verified the redundancy case: **two of the three primary columns can carry the load if the third fails**, accounting for the resulting asymmetric loading.

## Analysis and verification

Load cases *[TK — flight loads, boundary conditions, margin carried]*.

The verification chain had three independent legs, which was deliberate given the first one:

**Primary FEA** was run in a cloud analysis tool integrated with OnShape — not Onshape's own simulation, a third-party service I wanted to evaluate. Using an unvalidated solver on a buckling-critical part is not something to do quietly, so I treated its output as a hypothesis rather than a result.

**Hand calculation** independently confirmed the column sizing and produced the two-of-three redundancy result above.

**Independent re-analysis** by two teammates with prior Fusion 360 simulation experience, in a solver with a known track record. Results agreed with mine.

The methodology matters more here than the numbers. Verification cost me almost nothing in schedule and meant an unfamiliar tool never became a single point of failure in a structure whose failure mode is sudden.

*[Re-running the analysis in Fusion 360 for documented plots and margin figures.]*

## Forming dies

The sheet metal reinforcement segments needed accurate, repeatable bends, and no forming tooling for them existed. Commercial dies or machined tooling were not justifiable for a handful of low-load parts on a student budget, and outsourcing meant lead time we did not have.

I designed and 3D printed a set of dies, with the top die carrying a shank so the whole operation could run in a drill press instead of a press brake we did not own.

Springback was handled empirically rather than analytically: I printed dies across a range of overbend angles, formed samples on each, and selected the die that produced the squarest finished bend. Computing springback for a given material, gauge, and radius is possible, but it depends on material properties we did not have certified data for, and iterating a printed die costs a few hours of print time. The sweep was faster and produced an answer good enough for a non-load-critical part.

The honest limitation: finished bend angles were assessed by comparison, not measured to a tolerance. For these parts that was acceptable. For anything structural it would not be, and the fix is a measured sweep producing an actual springback curve for the material rather than a single selected die.

## Propulsion

The engine is a direct resize of the HalfCat reference design — nitrous oxide and ethanol, piston-driven tank pressurization, pintle injector — scaled to roughly **double the baseline thrust.** I ran the engine sizing and propellant flow calculations using HalfCat's published simulation spreadsheet and performed a substantial share of the fabrication.

I want to be precise about the scope: this was applying a well-documented open design at a new operating point, not clean-sheet engine design. The engineering was in understanding which parameters could be scaled and which could not, and in the fabrication.

## Integration

I owned integration of recovery, payload, and propulsion into the airframe, and specifically the payload-to-airframe and propulsion-to-airframe interfaces.

The representative problem was a conflict between the media team, who needed a mount for a 360° camera, and the payload team, who needed mount points for the ejection system — both wanting the same real estate in a vehicle with no spare volume. Rather than arbitrate one out, I resolved it by consolidating both onto a shared mounting ring, keeping the camera on board and conserving the space the alternative would have consumed.

## Status

Vehicle built and integrated. Not yet flown, held by ignition issues unrelated to the airframe. The structure, forming process, and integration approach are validated to the extent ground work allows.
