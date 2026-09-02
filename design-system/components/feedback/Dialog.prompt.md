One-line: modal for the contact form and figure lightboxes.

```jsx
<Dialog open={open} title="Contact" onClose={close}
        footer={<Button size="sm">Send</Button>}>…</Dialog>
```

Only surface in the system with a glow (`--glow-accent`) — depth is otherwise conveyed by rules alone.
