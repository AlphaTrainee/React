# Keine AHnung

```bash
npm i @tanstack/react-query
```

```tsx
const [name, setName] = useState<string | undefined>();
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | undefined>();

useEffect(() => {
  getPerson()
    .then((person) => {
      setLoading(false);
      setName(person.name);
    })
    .catch((e) => {
      setError(e);
      setLoading(false);
    });
}, [personId]);
if (loading) {
  return <div>Lädt ...</div>;
}
```

```tsx
function Product({ id }: { id: number }) {
  const { data, error, isPending } = useQuery({
    queryKey: ["products", id],
    queryFn: () =>
      fetch(`https/shop.com/products/${id}`).then((res) => res.json()),
  });
}

if (isPending) return "Loading...";
if (error) return `Error: ${error.message}`;

return (
  <div>
    <h2>{data.name}</h2>
    <p>{data.description}</p>
  </div>
);
```

```tsx
function App() {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>.....</QueryClientProvider>;
}
```

```tsx
queryClient.invalidateQueries({ queryKey: ["products"] });
```
