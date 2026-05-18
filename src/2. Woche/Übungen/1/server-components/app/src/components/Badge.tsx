// import "./Badge.css";
// import styles from "./Badge.module.css";

type Variant = "success" | "warning";

type Props = {
  label: string;
  variant: Variant;
};

/* 
export function Badge({ label, variant }: Props) {
  return <span className={`badge ${variant}`}>{label}</span>;
}
 */

/* 
export function Badge({ label, variant }: Props) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{label}</span>;
}
 */

// Hier definieren wir die Tailwind-Farben für die jeweiligen Varianten
const variantStyles: Record<Variant, string> = {
  success: "bg-green-100 text-green-800 border-green-800",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-800",
};

export function Badge({ label, variant }: Props) {
  // 1. Die Basis-Klassen (identisch für alle Badges)
  const baseStyles = "inline-block rounded border px-2 py-1 text-sm font-bold";

  // 2. Die spezifischen Farb-Klassen je nach Variante auslesen
  const currentVariantStyle = variantStyles[variant];

  // 3. Beides kombinieren
  return (
    <span className={`${baseStyles} ${currentVariantStyle}`}>{label}</span>
  );
}
