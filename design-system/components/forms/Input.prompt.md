One-line: text field; inset dark well, uppercase mono label that turns accent on focus.

```jsx
<Input label="Email" placeholder="you@lab.org" />
<Input prompt placeholder="filter projects…" size="sm" />
```

Focus = accent border + `--glow-focus`. `invalid` recolours border and hint to `--signal-fail`.
