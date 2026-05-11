/* 
1. Lege `total` mit `let` an und setze es auf `100`.
2. Ziehe `25` von `total` ab.
3. Lege `taxRate` mit `const` an und setze es auf `0.19`.
4. Berechne `withTax` aus `total` und `taxRate` und logge das Ergebnis.
*/
{
  let total = 100;
  total -= 25;
  console.log(total);

  const taxRate = 0.19;

  const withTax = total * (1 + taxRate);
  console.log(withTax);
}

/* 
1. Schreibe eine Arrow Function `isLong`, die prüft, ob ein String mindestens 8 Zeichen hat.
2. Teste `isLong("password")` und `isLong("cat")`.
*/
{
  const isLong = (testString) => (testString.length < 8 ? false : true);
  console.log(isLong("password"));
  console.log(isLong("cat"));
}

/* 
1. Lege `product = "Kaffee"` und `price = 3.5` an.
2. Erzeuge einen String: `"Produkt: Kaffee (3.5 EUR)"` mit Template Literal.
3. Erzeuge einen mehrzeiligen String mit "Rechnung" in Zeile 1 und dem Produkt in Zeile 2.
*/
{
  const product = "Kaffee";
  const price = 3.5;
  console.log(`Produkt: ${product} (${price} EUR)`);
  console.log(`RECHNUNG\nProdukt: ${product} (${price} EUR)`);
}

/* 
1. Erstelle ein Objekt `config` mit `host`, `port`, `secure`.
2. Destructuriere `host` und `port`.
3. Erstelle ein Array `colors = ["red", "green", "blue", "yellow"]`.
4. Destructuriere nur das 2. Element in `second`.
*/
{
  const config = {
    host: "localhost",
    port: 3000,
    secure: "geheim",
  };
  const { host, port } = config;
  console.log(host, port);

  const colors = ["red", "green", "blue", "yellow"];
  const { [1]: second } = colors;
  console.log(second);
}

/* 
1. Schreibe `formatPrice(amount, currency = "EUR")`.
2. Gib `"amount currency"` zurück, z. B. `"3.5 EUR"`.
3. Teste `formatPrice(10)` und `formatPrice(10, "USD")` und `formatPrice(undefined)`.
*/
{
  const formatPrice = (amount, currency = "EUR") => `${amount} ${currency}`;
  console.log(formatPrice(10));
  console.log(formatPrice(10, "USD"));
  console.log(formatPrice(undefined));
}

/* 
1. Schreibe `joinWords(...words)`, die alle Wörter mit `"-"` verbindet.
2. `joinWords()` soll einen leeren String `""` liefern.
3. Teste `joinWords("a", "b", "c")` und `joinWords()`.
*/
{
  function joinWords(...words) {
    if (words.length === 0) {
      return "";
    } else {
      return words.join("-");
    }
  }
  console.log(joinWords());
  console.log(joinWords("a", "b", "c"));
}

/* 
1. Erstelle `base = [2, 4, 6]`.
2. Erstelle `extended` als neues Array, das `0` vorne und `8` hinten anfügt.
3. Erstelle `settings = { theme: "dark", debug: false }`.
4. Erstelle `settings2` als Kopie, aber setze `debug` auf `true`.
*/
{
  const base = [2, 4, 6];
  const extended = [0, ...base, 8];
  console.log(extended);

  const settings = { theme: "dark", debug: false };
  const settings2 = { ...settings, debug: true };
  console.log(settings2);
}

/* 
1. Lege `first = "Sam"` und `last = "Miller"` an.
2. Erzeuge ein Objekt `person` mit Property Shorthand (`first`, `last`).
3. Füge eine Methode `fullName()` hinzu, die `"Sam Miller"` zurückgibt.
*/
{
  const first = "Sam";
  const last = "Miller";
  const person = {
    first,
    last,
    fullName() {
      return `${this.first} ${this.last}`;
    },
  };
  console.log(person.fullName());
}

/* 
1. Lege `prefix = "item"` an.
2. Erzeuge ein Objekt mit Keys `item1`, `item2`, `item3` und Werten `10`, `20`, `30`.
3. Nutze dafür eine Schleife und computed keys.
*/
{
  prefix = "item";

  const myObj = {};
  for (let i = 1; i <= 3; i++) {
    myObj[`${prefix}${i}`] = i * 10;
  }
  console.log(myObj);
}

/* 
1. Schreibe `fetchNumber(n)`, die nach 100ms resolved mit `n * 2`.
2. Wenn `n` keine Zahl ist, soll sie rejecten.
3. Teste einmal mit `fetchNumber(5)` und einmal mit `fetchNumber("x")`.
*/
{
  const fetchNumber = (n) => {
    return new Promise((resolve, reject) => {
      if (typeof n !== "number") {
        return reject("Fehler: Das ist keine Zahl!");
      }

      setTimeout(() => {
        resolve(n * 2);
      }, 100);
    });
  };

  fetchNumber(5)
    .then((res) => console.log("Ergebnis:", res)) // Ergebnis: 10
    .catch((err) => console.error(err));

  // Fehler:
  fetchNumber("x")
    .then((res) => console.log(res))
    .catch((err) => console.error(err)); // Fehler: Das ist keine Zahl!
}
