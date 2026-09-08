---
meta:
  - { key: Scope, value: "Senior design project sponsored by the [Ludwig Bartels lab at UCR](https://bartels.chem.ucr.edu), continued under a summer research fellowship" }
  - { key: Role, value: Sole technical contributor }
skills: "UHV system design · thermal analysis · precision machining · design for vacuum · instrumentation and measurement · test planning and data analysis"
---

**At a glance**

- Three deposition sources (Ti by e-beam, Au and Al by thermal crucible) served by a single thickness monitor
- ±5 nm accuracy target over ~100 nm typical film thickness
- Interfaces with an existing hub chamber using in-vacuum interchangeable sample stubs
- Chamber built from salvaged lab hardware; 5×10⁻⁷ torr achieved
- Conduction-cooled QCM doubles the absorbable radiant load at constant crystal temperature
- All stage and stub components machined in-house, including diamond-ground alumina
- The fellowship extension — a 1000 °C annealing sample holder — is [a project of its own](/uhv-annealing-stage/)

## The problem

The sponsoring lab needed a deposition chamber capable of laying down three separate metals without breaking vacuum, feeding samples into an existing hub chamber whose sample stubs are swapped in vacuum by a mechanical transfer arm. Films had to be controlled to ±5 nm.

That last requirement is what shaped the entire project. Film thickness during evaporation is measured with a quartz crystal microbalance: a crystal oscillates at a frequency set by its mass, and deposited material shifts that frequency in a known way. The complication is that the crystal is equally sensitive to temperature, and both sources of drift are present at once. Heating softens the quartz lattice, lowering the resonant frequency in a way indistinguishable from added mass, while the added mass itself damps the oscillation — so temperature error and mass signal are confounded rather than separable.

The heat is unavoidable. Evaporating metal is molten metal, and both the deposition flux and the radiant heating it produces are line-of-sight. You cannot block one without blocking the other, short of adding an aperture and accepting a lower deposition rate. So the crystal is going to get hot, and the question is how hot you can let it get.

The design target came from that: hold the crystal inside the linear region of its temperature-error curve. Published work places that below roughly 50 °C, which leaves room to add a software correction up to 100 °C later once the system is characterized against direct film measurement.

## Chamber and layout

The available hardware constrained the design before I drew anything. Between the parts on hand, the three-source requirement, and the hub interface geometry, exactly one chamber in the lab could work: roughly 24" long by 10" in diameter. Larger than ideal, but the only vessel with enough port real estate to fit three sources, the transfer interface, gauging, feedthroughs, and the monitor. I built the chamber up from salvaged components and fabricated a cart to house it.

The three-source requirement invites an obvious but expensive solution: three thickness monitors, one per source. Instead I arranged the sources around a rotating stage that presents either the sample or the monitor to any one source. One crystal, one set of electronics, one calibration to maintain.

![The assembled chamber on its fabricated cart](images/chamber.jpg "The assembled chamber on its fabricated cart")

![Rotating source-selection stage, sample and monitor positions](images/rotating-stage.jpg "Rotating source-selection stage, sample and monitor positions")

## Thermal design

That decision created the thermal problem I actually had to solve. A stationary QCM can be water cooled directly. A rotating one cannot: there are no rotary water feedthroughs in this size class and no UHV-compatible flexible hose to route around the motion. Cooling had to be conductive.

The solution is a cold finger with a flexible solid-state thermal bridge. A 0.25" OD copper loop carries ~1 °C chiller water to a fixed point in the chamber — the diameter set by the largest feedthrough available, not by what I would have chosen. A 9" copper braid bridges from that loop to the copper stage body adjacent to the crystal, absorbing the stage rotation without any fluid crossing the moving joint.

Both ends are joined for thermal contact rather than convenience. The stage end is clamped over roughly 1 in² of direct contact by a stainless backing plate and screws; the cold finger end wraps the tube under a clamp of similar contact area. Copper braid was chosen for conductivity and for its ability to take repeated flexure without work-hardening into failure the way solid strap would.

![Cold finger and copper-braid thermal bridge](images/cold-finger.jpg "Cold finger and copper-braid thermal bridge")

Rotation is indexed manually via an external handle, repeatable to ±2° against a scale. Motorized indexing was out of scope, and the source-to-monitor geometry tolerates the error.

## Verification

The e-beam gun was installed in another group's chamber for the duration, so I characterized the thermal system using a resistive heater to stand in for the radiant load of a molten source. This turned out to be the better test regardless: it let me sweep input power continuously and independently of deposition, which a real source does not allow.

I instrumented the crystal and both ends of the thermal bridge. Two results came out of it:

![Crystal temperature vs. input power, cooled and uncooled](images/dt-sweep.png "Crystal temperature vs. input power, cooled and uncooled. Resistive heater standing in for a molten source.")

**The cooling loop absorbs roughly twice the radiant load at the same crystal temperature.** Uncooled, the crystal climbed to 65 °C and stopped stabilizing entirely — past the linear region and past the point where the measurement means anything. Cooled, the system holds equivalent crystal temperature at double the input wattage.

**The bridge is operating in steady-state conduction, not storing heat.** I computed power through the braid from the measured ΔT and its known length, cross-section, and conductivity, and confirmed it matched the applied load. The ΔT across the bridge widened from 5 °C to 20 °C across the power sweep, consistent with conduction-limited transport and no saturation.

> [!note] Pending
> Calculations to be inserted.

The instrumentation itself is a problem in operation: a thermocouple bonded to the crystal interferes with the measurement it is meant to protect. So I built a linear model inferring crystal temperature from the two bridge temperatures, letting the production system run without a sensor at the crystal.

Linear is the right model here, not a convenient one. At steady state along a conduction path, temperature at any two points is linearly related regardless of the hot-side condition, and the cold side is pinned by chiller water at a fixed ~1 °C. The relationship holds across the operating range by construction, and the sweep data confirms it.

> [!note] Pending
> Fit and residuals to be inserted.

## Extension

The summer fellowship added a requirement outside the original senior-design scope: a removable sample holder that anneals silicon to 1000 °C and still interchanges under vacuum. That grew into its own build — see **[1000 °C in-vacuum annealing sample holder →](/uhv-annealing-stage/)**.

## Fabrication

I machined all stage and stub components myself: milling 304 stainless and copper on a manual mill, holding ±0.005" on the tightest features. Alumina requires diamond or fiber laser cutting and the lab has no laser, so every ceramic part was ground from sheet scrap with diamond burrs.

Material selection was driven by vacuum compatibility throughout — copper, stainless, molybdenum, tungsten, alumina.

## Status

Thermal subsystem qualified. Chamber currently operates on borrowed pumping; standing up an independent pump stack is in work, presently limited to 1×10⁻⁴ torr pending rate-of-rise testing to separate leak from outgassing.
