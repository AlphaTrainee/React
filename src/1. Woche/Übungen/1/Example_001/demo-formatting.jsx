export default function Demo({ title, items, enabled }) {
  const data = {
    title: title,
    items: items,
    enabled: enabled,
    meta: {
      createdAt: new Date(),
      tags: ['a', 'b', 'c'],
    },
  };
  return (
    <div className="demo">
      <h2>{title}</h2>
      {enabled ? (
        <ul>
          {items.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      ) : (
        <p>disabled</p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
