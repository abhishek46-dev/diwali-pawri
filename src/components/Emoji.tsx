import Image from "next/image";
import type { CSSProperties } from "react";

// 3D emoji from Microsoft's Fluent Emoji set (MIT), saved in /public/emoji
export type EmojiName =
  | "blossom" | "cake" | "candy" | "cards" | "champagne" | "cherry" | "chili" | "clink" | "cocktail" | "cry"
  | "diya" | "dress" | "drum" | "fireworks" | "gem" | "heart" | "hibiscus" | "lotus" | "mirrorball" | "notes"
  | "popper" | "rose" | "sneaker" | "sparkler" | "sparkles" | "star" | "sunflower" | "tulip";

export const FLOWERS: EmojiName[] = ["hibiscus", "sunflower", "lotus", "cherry", "tulip", "blossom", "rose"];

export default function Emoji({
  name,
  size = 32,
  label,
  className,
  style,
}: {
  name: EmojiName;
  size?: number;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Image
      src={`/emoji/${name}.png`}
      alt={label ?? ""}
      aria-hidden={label ? undefined : true}
      width={size}
      height={size}
      className={className}
      style={style}
      draggable={false}
    />
  );
}
