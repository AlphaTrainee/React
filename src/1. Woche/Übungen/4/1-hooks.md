## Fragen und Antworten

### 4) useMemo: Was steht nach einem Klick im Button?

**Aufgabe 4**

```tsx
export function Counter() {
  const [count, setCount] = useState(0);
  const memoCount = useMemo(() => count, []);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{memoCount}</button>
    </div>
  );
}
```

0

### 5) useCallback: Was steht nach zwei Klicks im Button?

**Aufgabe 5**

```tsx
export function Counter() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, []);
  return (
    <div>
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```

1
