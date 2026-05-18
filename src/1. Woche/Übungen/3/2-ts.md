## Übung:Typescript II

### Frage 1: Inference vs Annotation

- Was ist der Typ von `discount`, und wird ein Type Error auftreten?

```ts
let discount = 0.1;
discount = "10%";
```

typ ist number
error: es wird ein string zugewiesen

### Frage 2: Date korrekt typisieren (Annotation vs Inference)

- Welche Varianten sind korrekt, und welche führen zu einem Type Error?

```ts
let a: Date;
a = new Date();

let b = new Date();

let c: Date = "2022-01-01";
```

die ersten beiden sind korrekt
die dritte: es soll ein string zugewiesen werden

### Frage 3: Array-Typen (Date[])

- Ergänze die Type Annotation so, dass nur `Date`-Werte erlaubt sind:

```ts
const dates = [];
dates.push(new Date());
dates.push("tomorrow");
```

```ts
{
  const dates: Date[] = [];
  dates.push(new Date());
  dates.push("tomorrow");
}

oder (mit generischem Argument)

{
  const dates: Array<Date | String> = [];
  dates.push(new Date());
  dates.push("tomorrow");
}
```

### Frage 4: Optional Property und Type Error

- Wird hier ein Type Error auftreten? Warum?

```ts
type Product = { name: string; unitPrice?: number };
const p: Product = { name: "Table" };
const total = p.unitPrice * 2;
```

"p.unitPrice" ist möglicherweise nicht "nicht definiert".

### Frage 5: Union Type mit null

- Welche Zuweisungen sind erlaubt?

```ts
type RGB = "red" | "green" | "blue" | null;

let color: RGB = "red";
color = null;
color = "yellow";
```

color = "yellow"; ist nicht erlaubt

---

### Frage 6: Intersection Type (&)

- Welche Properties muss `DiscountedProduct` haben?

```ts
type Product = { name: string; unitPrice?: number };
type DiscountedProduct = Product & { discount: number };

const x: DiscountedProduct = { name: "Chair", discount: 5 };
const y: DiscountedProduct = { discount: 5 };
```

name und discount

### Frage 7: any erklärt „warum kein Fehler“

- Warum gibt es hier keinen Type Error, obwohl das zur Laufzeit schiefgehen kann?

```ts
function logLength(x: any) {
  console.log(x.length);
}

logLength(123);
```

any erlaubt jeden datentyp

---

### Frage 8: unknown + Type Guard (Type Predicate)

- Ergänze die Funktion so, dass TypeScript im `if`-Block `data.name` erlaubt.

```ts
function isNamed(data: unknown) {
  if (/* TODO */) {
    console.log(data.name);
  }
}
```

if (data && typeof data === 'object' && 'name' in data) {

---

### Frage 9: Type Alias für Function Type

- Definiere einen Function Type `Purchase`, der `quantity: number` nimmt und nichts zurückgibt.
- Nutze ihn dann in einem `Product`-Typ.

  type Purchase = (quantity: number) => void;

  type Product = {
  name: string;
  price: number;
  onPurchase: Purchase;
  };
