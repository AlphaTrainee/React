'use client';
import { useEffect, useState } from 'react';

export function ColorModeToggle() {
  console.log('Server oder Client (ColorModeToggle.tsx)');

  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (colorMode === 'dark') {
      document.body.classList.add('dark');
      document.documentElement.style.setProperty('--background', '#0a0a0a');
      document.documentElement.style.setProperty('--foreground', '#ededed');
    } else {
      document.body.classList.remove('dark');
      document.documentElement.style.setProperty('--background', '#ededed');
      document.documentElement.style.setProperty('--foreground', '#0a0a0a');
    }
  }, [colorMode]);

  function handleClick() {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newColorMode);
  }

  return (
    <button onClick={handleClick} className="flex rounded bg-blue-500 px-4 py-2 text-white">
      {colorMode === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
}
