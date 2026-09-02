One-line: full-width micrograph backdrop for a title/intro card, behind a rgba(18,18,18,.85) scrim and a 6px blur.

```jsx
<div style={{position:"relative"}}>
  <ScrollBackdrop images={["assets/backgrounds/micro-01.jpg","assets/backgrounds/micro-02.jpg","assets/backgrounds/micro-03.jpg"]}/>
  <h1>Title copy sits on top</h1>
</div>
```

Mount as the first child of the intro/hero card, which must be `position:relative` — the
backdrop fills it edge to edge (`position:absolute; inset:0`) at `z-index:-1`, so ordinary
in-flow content painted after it sits on top with no extra z-index needed. Pass a pool of
`images` (one is picked at random per mount) or a single explicit `image`. With no image it
renders a labelled placeholder slot — drop real micrographs into `assets/backgrounds/` and
pass their paths. Never put a photograph behind text without this scrim.
