import Image from "next/image";
import colorModeSvg from "./colorModeIcon.svg";

export function ColorModeIcon() {
  console.log("Server oder Client? (ColorModeIcon.tsx)");
  return (
    <Image src={colorModeSvg} alt="Color mode icon" className="mr-2 h-6 w-6" />
  );
}
