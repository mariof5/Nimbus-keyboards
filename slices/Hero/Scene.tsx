"use client";
import { Keyboard } from "@/components/Keyboard";
import { useControls } from "leva";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Keycap } from "@/components/Keycap";
import { useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";




gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Scene() {

  const keyboardGroupRef = useRef<THREE.Group>(null);

  // const {positionX, positionY, positionZ, rotationX, rotationY, rotationZ} =
  // useControls({
  //              positionX:0.23,
  //              positionY:-0.6,
  //              positionZ:1.5,
  //              rotationX:1.6,
  //              rotationY:0.3,
  //              rotationZ:0, 
  //             })

    const scalingFactor = window.innerWidth <= 500 ? 0.4 : 1 ; // Adjust the scaling factor based on screen width

    useGSAP(() => {
      if (!keyboardGroupRef.current) return;

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference", ()=>{ 
        if(!keyboardGroupRef.current) return;

        const keyboard= keyboardGroupRef.current;

        const tl = gsap.timeline({
          ease: "power2.inOut"
        })
        tl.to(keyboard.position, {
          x: 0,
          y: -0.5,
          z: 0.5,
          duration: 2
        })
      })
    })




    return(
          <group>
            <PerspectiveCamera  makeDefault position= {[0, 0, 4] } fov={50} />

            <group scale={scalingFactor}>
              <group ref={keyboardGroupRef} position={[0.23, -0.6, 1.7]} rotation={[1.6, 0.3, 0]} >

            <Keyboard scale={9}/> 

              </group>
          <group>
            <Keycap position={[0, -0.4, 2.6]} rotation={[0, 2, 3]}  texture={0}/>
            <Keycap position={[-1.4, 0, 2.3]} rotation={[3, 2, 1]} texture={1}/>
            <Keycap position={[-1.8, 1, 1.5]} rotation={[0, 1, 3]} texture={2}/>
            <Keycap position={[0, 1, 1]} rotation={[0, 4, 2]} texture={3}/>
            <Keycap position={[0.7, 0.9, 1.4]} rotation={[3, 2, 0]} texture={4}/>
            <Keycap position={[1.3, -0.3, 2.3]} rotation={[1, 2, 0]} texture={5}/>
            <Keycap position={[0, 1, 2]} rotation={[2, 2, 3]} texture={6}/>
            <Keycap position={[-0.7, 0.6, 2]} rotation={[1, 4, 0]} texture={7}/>
            <Keycap position={[-0.77, 0.1, 2.8]} rotation={[3, 2, 3]} texture={8}/>
            <Keycap position={[2, 0, 1]} rotation={[0, 0, 3]} texture={7}/>
            
          </group>
            </group>
            <Environment files={["/hdr/blue-studio.hdr"]} environmentIntensity={.2}/>
            <spotLight position={[-2, 1.4, 3]} intensity={30} castShadow  shadow-bias={-0.001} shadow-normalBias={0.002} shadow-mapSize={1024}/> 
          </group>
    )
}