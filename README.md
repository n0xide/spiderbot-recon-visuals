# spiderbot-recon — Build Dashboard

Interactive build-tracking dashboard for a **multi-legged recon walker**:
gait-based locomotion, multi-servo bus driven from a Teensy, payload
electronics (camera + telemetry), bench-friendly footprint.

**Live site:** <https://n0xide.github.io/spiderbot-recon-visuals/>

## What's inside

11 pages, sidebar-navigated dashboard with shared `styles.css` + `shared.js`.

| Page | Purpose |
|---|---|
| `index.html` | Dashboard home |
| `phase-dashboard.html` | Phase tracker — build progress with checkboxes |
| `bom-tracker.html` | Bill of materials checklist with live totals |
| `servo-bus-map.html` | Multi-servo bus layout + per-leg ID assignment |
| `teensy-pinout.html` | Teensy pin assignments + UART/I2C/SPI routing |
| `power-architecture.html` | Power distribution + e-stop + battery integration |
| `connector-pinouts.html` | Every connector + pinout reference |
| `gait-visualizer.html` | Gait pattern visualizer (tripod / wave / ripple) |
| `ik-calculator.html` | Leg IK calculator (per-leg 3-DOF inverse kinematics) |
| `calibration-checklist.html` | Joint zero + offset calibration procedure |
| `safety-card.html` | Safety protocols + e-stop verification + travel-mode lock |

## How to use

**Online** — open the live URL above.

**Offline** — clone or download:

```bash
git clone https://github.com/n0xide/spiderbot-recon-visuals.git
cd spiderbot-recon-visuals
open index.html
```

No build step. No external CDN. Persistent checklists via `localStorage`.

## Stack overview

| Layer | Pick |
|---|---|
| Locomotion | Multi-legged (configurable gait) |
| Servos | Bus-servo daisy-chain per leg |
| Compute | Teensy main controller |
| Style | Sidebar dashboard with shared `styles.css` + `shared.js` |

(Full design details + part numbers live in the source workspace and are
not published here.)

## License

[MIT](LICENSE). Hobby-project dashboard published for documentation —
components, suppliers, and methods shown may not be appropriate for
production or safety-critical use.

## Source

Derived from a personal mechatronics build workspace at
`mechatronics/projects/spiderbot-recon/`. Markdown sources (`design.md`,
`bom.md`, `phases.md`, etc.) live there and are referenced as dim labels.
See `MAINTAINING.md` for the round-trip workflow.

## Related bundles
- [arm-6dof-so100-mega-visuals](https://n0xide.github.io/arm-6dof-so100-mega-visuals/)
  — sister bus-servo project (Feetech STS3215, hobby budget)
- [arm-6dof-pa612-visuals](https://n0xide.github.io/arm-6dof-pa612-visuals/)
  — industrial-prototype 6-DOF arm
- [mechatronics-visuals](https://n0xide.github.io/mechatronics-visuals/) —
  curriculum (EM Phase 7 kinematics, EM Phase 4 PID)
