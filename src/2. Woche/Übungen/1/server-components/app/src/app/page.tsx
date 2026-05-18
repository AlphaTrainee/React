import Image from "next/image";

/* 
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <div>
      <Counter />
    </div>
  );
}
 */

import { Badge } from "@/components/Badge"; // Hier nutzen wir den @-Alias, den du vorhin eingerichtet hast!

export default function Home() {
  return (
    <main className="p-8">
      <h1>Mein Projekt-Dashboard</h1>

      <div className="mt-4 flex gap-4">
        {/* Hier rufen wir die Komponente zweimal mit verschiedenen Daten auf */}
        <Badge label="Weiche 1: Aktiv" variant="success" />
        <Badge label="Spannung niedrig!" variant="warning" />
      </div>
    </main>
  );
}
