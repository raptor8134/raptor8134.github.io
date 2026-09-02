One-line: the data table for material properties and test results; numbers are tabular and right-aligned.

```jsx
<SpecTable caption="Tensile, ASTM E8" columns={["Alloy","UTS (MPa)","Elong. (%)"]}
  rows={[["Ti-6Al-4V","1043","11.2"],["AlSi10Mg","412","6.4"]]} />
```

Always name the standard or method in the caption. Units belong in the column header, not in cells.
