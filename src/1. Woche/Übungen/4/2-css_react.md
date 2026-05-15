### Fragen

**Frage 1:** Warum konnte die folgende Verwendung von Plain CSS problematisch sein?

```jsx
<div className="wrapper"></div>
```

die Klasse könnte mehrfach vorhanden sein

```jsx
<div className="card-wrapper"></div>
```

**Frage 2:** Wir haben eine Komponente, die mit CSS Modules gestylt wird:

```ts
import styles from "./styles3.module.css";
function ComponentThree() {
  return <div className={styles.wrapper}>
</div>
}
```

Die Styles in `styles3.module.css` sind:

```css
.wrap {
  display: flex;
  align-items: center;
  background: #e7650f;
}
```

Die Styles werden beim Starten der App nicht angewendet. Was ist das Problem?
die klasse heisst wrao und nicht wrapper

```ts
import styles from "./styles3.module.css";
function ComponentThree() {
  return <div className={styles.wrap}>
</div>
}
```

**Frage 3:** Wir stylen einen Button mit Tailwind. Aktuell:

```jsx
<button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```

Wie können wir das Styling verbessern, sodass der Hintergrund beim Hover eine 700er-Blau-Stufe bekommt?

hover:bg-blue-700

**Frage 4:**

... kommt später .....

**Frage 5:** Wir stylen einen Button mit Tailwind, der eine `color`-Prop nutzt:

```jsx
<button className={`bg-${color}-500 text-white font-bold py-2 px-4 rounded`}>
  Button
</button>
```

Die Button-Farbe funktioniert nicht. Was ist das Problem?

der klassenname muss komplett vorliegen, es wird im beispiel zusammengesetzt, das ignoriert tailwind
