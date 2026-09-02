One-line: the action control — gradient `primary` for the single main action, outlined `secondary` for everything alongside it, `ghost` for toolbar/inline actions.

```jsx
<Button variant="primary" prefix={<Icon name="download" />}>Download CV</Button>
<Button variant="secondary" size="sm">View project</Button>
<Button variant="ghost" size="sm" as="a" href="#">Source</Button>
```

Variants: primary (gradient, ink text), secondary (1px rule), ghost, danger (red outline).
Sizes: sm 26px / md 32px / lg 40px. Labels are UPPERCASE with `--track-caps`; never sentence case.
Hover brightens the gradient or fills with `--bg-hover` + accent border; press nudges 1px down.
