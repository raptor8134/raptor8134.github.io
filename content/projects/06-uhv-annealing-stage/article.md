---
meta:
  - { key: Scope, value: "Continuation of the multi-source UHV deposition system, under a summer research fellowship" }
  - { key: Role, value: Sole technical contributor }
skills: "design for vacuum · precision machining · thermal design · instrumentation and measurement · failure analysis"
---

This is the second half of the [multi-source UHV deposition system](/uhv-deposition/) — the summer fellowship added a requirement the original senior-design scope did not cover.

**At a glance**

- Removable sample stub carrying its own heater and thermocouple; four isolated contacts in a 1" × 0.75" package
- Anneals silicon to 1000 °C and still interchanges under vacuum via the hub chamber's transfer arm
- Electrical contacts built into the existing pin-and-clip retention rather than added to it
- Mechanically validated across repeated high-temperature cycling; thermocouple readout above ~600 °C is an open issue

## The requirement

Prior to XPS (X-ray photoelectron spectroscopy) in another connected chamber, samples need to be annealed at various temperatures between 500 and 1000 °C. Both the heater and the thermocouple must sit on the removable stub itself to stay in proximity to the sample, which means routing four electrical contacts through a sample carrier measuring 1" × 0.75" — one that also has to survive repeated in-vacuum handling by the transfer arm and thermal cycling to 1000 °C.

## Building the contacts into the retention

I built the contacts out of the retention mechanism rather than adding to it. The stub was already held by two structural pins and a clip. I used one pin to deliver heater current and the clip plus the second pin to return the body to neutral, then added side wings for the thermocouple contacts, isolated by ceramic plates and screws. The sample, heater, and clip are separated by an alumina plate. The heater is 0.011" tungsten wire on ceramic bead insulators, roughly 0.5 Ω, driven at 5-10 V.

Differential expansion works in the design's favor. The 304 stainless body expands faster than the embedded alumina beads and screws, so the ceramics are never crushed or seized on cycling. The structural pins loosen slightly at temperature, but they run with clearance by design and the clip provides retention independently.

## Fabrication

I machined the stub components on a manual mill, holding ±0.005" on the tightest features. Alumina requires diamond or fiber laser cutting and the lab has no laser, so every ceramic part was ground from sheet scrap with diamond burrs. Material selection was vacuum-compatible throughout — copper, stainless, molybdenum, tungsten, alumina — with the thermocouple assembly the remaining outgassing question at full temperature.

## Where it stands

**Results:** the stage side delivers power reliably and stubs interchange cleanly even after repeated high-temperature cycling. The silicon reaches target temperature by visual confirmation.

**Open issue:** thermocouple readings drop off abruptly above ~600 °C. Debugging is ongoing. The leading hypothesis is a temperature-dependent shunt path through the alumina isolation — bulk resistivity of alumina falls sharply in exactly that band, which would create a virtual junction and pull the reading toward an intermediate point on the leads. The discriminating test is reversibility on cooldown plus leg-to-leg and leg-to-chassis resistance measured hot and cold; EMI would disappear the instant heater power is cut, a shunt would not. Type K is in use for cost during development and may be replaced regardless once the mechanism is confirmed.

> [!note] Pending
> Update pending.
