import { ColorModeToggle } from './ColorModeToggle';

export function Header() {
  console.log('Header: ist es RSC? (Header.tsx)');
  const total = 99 + 99;
  return (
    <header className="flex w-full item-center justify-between">
      <span className="text-lg font-black">Meine App: {total}</span>
      <ColorModeToggle />
    </header>
  );
}
