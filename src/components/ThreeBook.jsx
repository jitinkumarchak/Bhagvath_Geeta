import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, ContactShadows, Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const PAGE_WIDTH = 4.1;
const PAGE_HEIGHT = 5.6;
const SPINE_GAP = 0.08; // Gap between pages at the spine
const MAX_THICKNESS = 0.25; // How thick the page stacks can get

// Scale constants to dynamically adjust HTML content size relative to 3D mesh without breaking geometry
const CONTENT_SCALE = 1.35; // 1.35x visual boost to text
const CSS_WIDTH = Math.round(410 / CONTENT_SCALE); 
const CSS_HEIGHT = Math.round(560 / CONTENT_SCALE); 
const HTML_SCALE = PAGE_WIDTH / CSS_WIDTH;
const COVER_COLOR = "#314f35"; // Deep green physical cover
const PAPER_COLOR = "#faf2e0";
const PAPER_EDGE_COLOR = "#f0e6d0";

function BookPage({ position, rotation, isLeft, frontContent, backContent }) {
  // To avoid clipping and z-fighting, add a tiny offset for backface
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow receiveShadow position={[isLeft ? (-PAGE_WIDTH / 2) - SPINE_GAP : (PAGE_WIDTH / 2) + SPINE_GAP, 0, 0]}>
        {/* A thin box to act as paper thickness */}
        <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, 0.008]} />
        <meshStandardMaterial color={PAPER_COLOR} roughness={0.9} />
        {/* FRONT HTML */}
        {frontContent && (
          <Html
            transform
            scale={HTML_SCALE}
            position={[0, 0, 0.005]} // just outside the box half-thickness
            style={{ width: CSS_WIDTH, height: CSS_HEIGHT, overflow: 'hidden', background: "transparent" }}
          >
            <div style={{ width: '100%', height: '100%', userSelect: 'none', background: 'transparent' }}>
              {frontContent}
            </div>
          </Html>
        )}
        {/* BACK HTML */}
        {backContent && (
          <Html
            transform
            scale={HTML_SCALE}
            position={[0, 0, -0.005]}
            rotation-y={Math.PI}
            style={{ width: CSS_WIDTH, height: CSS_HEIGHT, overflow: 'hidden', background: "transparent" }}
          >
            <div style={{ width: '100%', height: '100%', userSelect: 'none', background: 'transparent' }}>
              {backContent}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

// Side stack to represent depth of closed pages
function PageStack({ isLeft, depth }) {
  if (depth <= 0.001) return null;
  // Offset backwards from the active page 0 origin
  const posZ = -depth / 2 - 0.004; 
  // Slight indent from spine so the spine fold looks natural
  const posX = isLeft ? (-PAGE_WIDTH / 2) - SPINE_GAP - 0.01 : (PAGE_WIDTH / 2) + SPINE_GAP + 0.01; 
  return (
    <mesh position={[posX, 0, posZ]} receiveShadow castShadow>
      {/* slightly smaller overall bounds so it looks inset inside the hard cover */}
      <boxGeometry args={[PAGE_WIDTH - 0.04, PAGE_HEIGHT - 0.04, depth]} />
      <meshStandardMaterial color={PAPER_EDGE_COLOR} roughness={1} />
    </mesh>
  );
}

function HardCover({ isLeft }) {
  // Cover extends slightly beyond pages
  const coverW = PAGE_WIDTH + 0.15;
  const coverH = PAGE_HEIGHT + 0.2;
  const coverD = 0.04; // Thickness of the cover backing
  
  // Placed behind the maximum paper thickness stack
  const posZ = -MAX_THICKNESS - coverD / 2 - 0.01; 
  // Offset to the left or right, aligning closely to the spine (0)
  const posX = isLeft ? -(coverW / 2) - SPINE_GAP + 0.05 : (coverW / 2) + SPINE_GAP - 0.05;

  return (
    <mesh position={[posX, 0, posZ]} receiveShadow castShadow>
      <boxGeometry args={[coverW, coverH, coverD]} />
      {/* Nice matte dark green physical finish */}
      <meshStandardMaterial color={COVER_COLOR} roughness={0.8} />
    </mesh>
  );
}

export default function ThreeBook({
  allPages,
  spread,
  flipping,
  flipProgress,
  renderPageFunc,
}) {
  const leftPageIdx = spread * 2;
  const rightPageIdx = spread * 2 + 1;
  const nextLeftPageIdx = (spread + 1) * 2;
  const nextRightPageIdx = (spread + 1) * 2 + 1;
  const prevLeftPageIdx = (spread - 1) * 2;
  const prevRightPageIdx = (spread - 1) * 2 + 1;

  const totalSpreads = Math.ceil(allPages.length / 2);
  
  let leftStackPerc = spread / totalSpreads;
  let rightStackPerc = 1 - (spread / totalSpreads);

  // Determine what each page should show
  let staticLeftIdx = leftPageIdx;
  if (flipping === 'prev') staticLeftIdx = prevLeftPageIdx;
  
  let staticRightIdx = rightPageIdx;
  if (flipping === 'next') staticRightIdx = nextRightPageIdx;

  let flipRotY = 0;
  let isFlipLeft = false;
  let flipFrontIdx = null;
  let flipBackIdx = null;

  // By lifting the page smoothly in Z space, it avoids clipping through the paper stack and arcs naturally
  let lift = 0;

  if (flipping === 'next') {
    isFlipLeft = false;
    flipRotY = -(flipProgress * Math.PI); 
    flipFrontIdx = rightPageIdx;          
    flipBackIdx = nextLeftPageIdx;        
    lift = Math.sin(flipProgress * Math.PI) * 0.25; 
  } else if (flipping === 'prev') {
    isFlipLeft = true;
    flipRotY = +(flipProgress * Math.PI); 
    flipFrontIdx = leftPageIdx;           
    flipBackIdx = prevRightPageIdx;       
    lift = Math.sin(flipProgress * Math.PI) * 0.25;
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {/* Gl configuration for crisp colors */}
      <Canvas shadows camera={{ position: [0, 1.8, 8.5], fov: 42 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[3, 8, -4]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Environment preset="city" />

        <Float speed={2} rotationIntensity={0.15} floatIntensity={0.4}>
          <group rotation={[-Math.PI / 12, 0, 0]}>
            
            {/* Book Spine (cylindrical to connect the covers beautifully) */}
            {/* positioned precisely behind the folds */}
            <mesh position={[0, 0, -MAX_THICKNESS - 0.04]} receiveShadow castShadow>
               <cylinderGeometry args={[0.13, 0.13, PAGE_HEIGHT + 0.2, 32]} />
               <meshStandardMaterial color={COVER_COLOR} roughness={0.8} />
            </mesh>
            
            {/* Left and Right Green Hardcovers */}
            <HardCover isLeft={true} />
            <HardCover isLeft={false} />

            {/* Simulated Paper Stacks indicating thickness of remaining pages */}
            <PageStack isLeft={true} depth={leftStackPerc * MAX_THICKNESS} />
            <PageStack isLeft={false} depth={rightStackPerc * MAX_THICKNESS} />

            {/* Static Left Page (topmost active layer on the stack) */}
            <BookPage
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              isLeft={true}
              frontContent={renderPageFunc(allPages[staticLeftIdx], staticLeftIdx)}
            />

            {/* Static Right Page */}
            <BookPage
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              isLeft={false}
              frontContent={renderPageFunc(allPages[staticRightIdx], staticRightIdx)}
            />

            {/* Flipping Page Animation */}
            {flipping && (
              <BookPage
                position={[0, 0, lift]} 
                rotation={[0, flipRotY, 0]}
                isLeft={isFlipLeft}
                frontContent={renderPageFunc(allPages[flipFrontIdx], flipFrontIdx)}
                backContent={renderPageFunc(allPages[flipBackIdx], flipBackIdx)}
              />
            )}
          </group>
        </Float>

        <ContactShadows position={[0, -4.5, 0]} opacity={0.65} scale={25} blur={3.5} far={4} color="#000000" />
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2 + 0.1} minPolarAngle={Math.PI / 3.5} enableDamping />
      </Canvas>
    </div>
  );
}
