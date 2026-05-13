### Fragen

#### Frage 1

Was ist falsch an der folgenden Komponenten-Definition?

```jsx
export function important() {
  return <div>This is really important!</div>;
}
```

Lösung:

```jsx
export function Important() {
  return <div>This is really important!</div>;
}
```

- React Komponeten müssen mit ein Großbuchstaben beginnen

#### Frage 2

Component Props werden wie folgt an eine Komponente übergeben:

```jsx
<ContactDetails name="Fred" email="fred@somewhere.com" />
```

Die Komponente ist dann wie folgt definiert:

```jsx
export function ContactDetails({ firstName, email }) {
  return (
    <div>
      <div>{firstName}</div>
      <div>{email}</div>
    </div>
  );
}
```

Der Name "Fred" wird aber nicht ausgegeben. Was ist das Problem?

- es wird firstName erwarte und nicht name

#### Frage 3

Was ist der initiale Wert des `loading`-State, der hier definiert wird?

```jsx
const [loading, setLoading] = useState(true);
```

- true

#### Frage 4

Was ist falsch daran, wie der State in der folgenden Komponente gesetzt wird?

```jsx
export function Agree() {
  const [agree, setAgree] = useState();
  return <button onClick={() => (agree = true)}>Click to agree</button>;
}
```

für state-Änderung muss setAgree hier verwendet werden

```jsx
export function Agree() {
  const [agree, setAgree] = useState();
  return <button onClick={() => setAgree(true)}>Click to agree</button>;
}
```

#### Frage 5

Die folgende Komponente implementiert ein optionales `onAgree`-Event. Was ist falsch an dieser Implementierung?

```jsx
export function Agree({ onAgree }) {
  function handleClick() {
    onAgree();
  }
  return <button onClick={handleClick}>Click to agree</button>;
}
```

- Lösung

```jsx
export function Agree({ onAgree }) {
  function handleClick() {
    if (onAgree) onAgree();
  }
  return <button onClick={handleClick}>Click to agree</button>;
}
```
