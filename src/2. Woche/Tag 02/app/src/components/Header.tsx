import { ColorModeIcon } from "./ColorModeIcon";
import { ColorModeToggle } from "./ColorModeToggle";

export function Header() {
  console.log("Server oder Client (Header.tsx)");
  const total = 99 + 99;
  return (
    <header className="flex w-full items-center justify-between">
      <span className="text-lg font-black"> Meine App</span>
      <span>{total}</span>
      <ColorModeToggle icon={<ColorModeIcon />} />
    </header>
  );
}
