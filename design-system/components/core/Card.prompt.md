One-line: the standard bordered panel; with `label`/`index` it becomes the project card used across the portfolio grid.

```jsx
<Card label="Project" index="004" title="Fatigue-resistant lattice inserts"
      meta="2025 · Ti-6Al-4V · SLM" interactive footer={<><span>Read case study</span><Icon name="arrow-up-right"/></>}>
  <p>Single sentence of outcome.</p>
</Card>
```

Never add a drop shadow or radius above 2px. Hover = raised surface + accent border + accent header label.
