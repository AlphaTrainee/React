# Woche 1 / Tag 3 TypeScript

## Typescript Compiler

## React Projekt mit Template erzeugen

```
npm create vite@latest alert -- --template react-ts
```

## React Hooks

### 1. useEffect

- behandelt `side effects`

```jsx
function Komponente() {

    useEffect(() => {
        console.log("effect");
    })

    return ...
}

function AndereKomponente({ search }: {search: string}) {
    useEffect(() => {
        console.log("Effekt hängt vom search prop ab");
    }, search)
}
```

### allgemeine Regeln für Hooks

- nur in Funktions Komponenten
- funktionieren nur im Top Level einer Komponente
  - nicht in Schleifen
  - nicht bedingt (in if / else, Schleifen usw)

**das ist NICHT Top Level**

```js
export AnotherComponent() {
    function handleClick() {
        useEffect(() => {
            console.log("Some Effect");
        })
    }
}
```

#### useEffect: cleanUp

```js
function ExampleComponent(
    { onClickAnywhere }: { onClickAnywhere: () => void }
) {
    useEffect(() => {
        function handleClick() {
            onClickAnywhere();
        }
        document.addEventListener("click", handleClick);
    });
    return function cleanup() {
        document.removeEventListener("click", handleClick);
    };
}
```
