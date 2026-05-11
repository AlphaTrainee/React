/* 
1. Erstelle `strings.js` und exportiere `upper(s)` und `lower(s)` als named exports.
2. Importiere beide in `app.js`.
3. Logge `upper("hi")` und `lower("HI")`.
*/

import { upper, lower } from "./strings.js";

console.log(upper("hi"));
console.log(lower("HI"));
