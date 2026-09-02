One-line: 6px bar comparing one measurement to a limit; gradient fill by default.

```jsx
<Meter label="Yield strength" value={880} max={1100} unit="MPa" />
<Meter label="Porosity" value={2.1} max={3} unit="%" tone="warn" />
```

Use for 3–6 comparable values. More than that belongs in a SpecTable.
