"use client";

import { FC, useCallback, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import Image from "next/image";
import clsx from "clsx";
import { texture } from "three/tsl";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";

export const KEYCAP_TEXTURES = [
  {
    id: "goodwell",
    name: "Goodwell",
    path: "/goodwell_uv.png",
    knobColor: "#E44E21",
  },
  {
    id: "dreamboard",
    name: "Dreamboard",
    path: "/dreamboard_uv.png",
    knobColor: "#E9759F",
  },
  {
    id: "cherrynavy",
    name: "Cherry Navy",
    path: "/cherrynavy_uv.png",
    knobColor: "#F06B7E",
  },
  { id: "kick", 
    name: "Kick", 
    path: "/kick_uv.png", 
    knobColor: "#FD0A0A" },
  {
    id: "oldschool",
    name: "Old School",
    path: "/oldschool_uv.png",
    knobColor: "#B89D82",
  },
  {
    id: "candykeys",
    name: "Candy Keys",
    path: "/candykeys_uv.png",
    knobColor: "#F38785",
  },
];

type KeycapTexture = (typeof KEYCAP_TEXTURES)[number];
/**
 * Props for `ColorChangers`.
 */
export type ColorChangersProps =
  SliceComponentProps<Content.ColorChangersSlice>;

/**
 * Component for "ColorChangers" Slices.
 */
const ColorChangers: FC<ColorChangersProps> = ({ slice }) => {
  const [selectedTextureId, setSelectedTextureId] =useState(KEYCAP_TEXTURES[0].id);
  const [backgroundText, setBackgroundText] = useState(KEYCAP_TEXTURES[0].name);
  const [isAnimating, setIsAnimating] = useState(false);


function handleTextureSelect(texture: KeycapTexture) {
  if (texture.id === selectedTextureId || isAnimating) return

  setIsAnimating(true);
  setSelectedTextureId(texture.id);
  setBackgroundText(KEYCAP_TEXTURES.find((t)=>t.id === texture.id)?.name || "")
 
}
const handleAnimationComplete = useCallback(() => {
setIsAnimating(false);
},[]) 



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex h-[90vh] min-h-[1000px] flex-col overflow-hidden bg-linear-to-br from-[#0f172a] to-[#062f4a] text-white"
    >
      {/* SVG Background */}
      <svg className="pointer-events-none absolute top-0 left-0 h-auto w-full mix-blend-overlay"
      viewBox="0 0 75 100">
        <text
        fontSize={7}
        textAnchor="middle"
        dominantBaseline={"middle"}
        x="50%"
        y="50%"
        className="font-black-slanted fill-white/20 uppercase group-hover:fill-white/30 motion-safe:transition-all motion-safe:duration-700"
        
        >
          {Array.from({length: 20}, (_, i)=>(
            <tspan key={i} x={`${(i + 1) * 10}%`} dy={i === 0 ? -50:6}>
              {Array.from({length:10}, ()=> backgroundText).join(" ")}
            </tspan>
          ))}
        </text>
      </svg>
      {/* Canvas */}
      <Canvas camera={{position: [0, 0.5, 0.5], fov:45, zoom:1.5}}>
       <Scene
          selectedTextureId={selectedTextureId}
          onAnimationComplete={handleAnimationComplete}
        />
        </Canvas>

      <Bounded  
  className="relative shrink-0"
  innerClassName="gap-6 lg:gap-8 flex flex-col lg:flex-row"
>
  {/* LEFT SIDE */}
  <div className="max-w-md shrink-0">
    <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">
      <PrismicText field={slice.primary.heading}/>
    </h2>

    <div className="text-pretty lg:text-lg">
      <PrismicRichText field={slice.primary.description}/>
    </div>
  </div>

  {/* RIGHT SIDE (your grid) */}
  <div className="flex-1 flex justify-end">
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 rounded-2xl bg-white p-4 text-black shadow-lg">
      {KEYCAP_TEXTURES.map((texture) => (
        <li key={texture.id} className="w-full h-full">
          <button
            onClick={() => handleTextureSelect(texture)}
            disabled={isAnimating}
            className={clsx(
              "flex w-full h-full flex-col items-center justify-center rounded-lg border-2 p-2",
              "transition-all duration-300 hover:scale-105",
              selectedTextureId === texture.id
                ? "border-[#81BFED] bg-[#81BFED]/20"
                : "border-gray-300 hover:border-gray-500",
              isAnimating && "cursor-not-allowed opacity-50"
            )}
            disabled={isAnimating}
          >
            <div className="w-full mb-2 overflow-hidden rounded border bg-gray-100">
              <Image
                src={texture.path}
                alt={texture.name}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-center text-xs font-semibold">
              {texture.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  </div>
</Bounded>
  
    </section>
  );
};

export default ColorChangers;
