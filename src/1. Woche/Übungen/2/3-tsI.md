# Übung: Typescript I

## Frage 1: Inferred Type für flag

* Was ist der inferierte Typ für `flag` im folgenden Code?

```ts
let flag = false;
```

- boolean


## Frage 2: Type Annotation für ein Array von Dates

* Was ist die Type Annotation für ein Array von `Date`? [date1, date2]

Array<Date> oder Date[]




## Frage 3: Optionales Property und Type Error

* Tritt ein Type Error im folgenden Code auf?

```ts
type Point = {x: number; y: number; z?: number};
const point: Point = { x: 24, y: 65 };

Nein, weil z ist optional
```



## Frage 4: Type Alias für Integer 1 bis 3

* Erstelle mit einem Type Alias einen Zahlentyp, der nur die Integer-Werte 1 bis einschließlich 3 annehmen kann.

````ts
type OneToThree = 1 | 2 | 3
````


## Frage 5: lastSale soll null akzeptieren

* Folgender Code wirft einen Type Error, weil `lastSale` kein `null` akzeptieren kann:

```ts
type Product = {
  name: string;
  lastSale: Date;
}
const table: Product = {name: "Table", lastSale: null}
```

* Wie kann der `Product`-Typ geändert werden, damit `lastSale` `null` akzeptieren kann?

```ts
type Product = {
  name: string;
  lastSale: Date | null;
}
const table: Product = {name: "Table", lastSale: null}
```


