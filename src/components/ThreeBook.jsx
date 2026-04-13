import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Html,
  ContactShadows,
  Float,
  OrbitControls,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';

// ─── Layout constants ────────────────────────────────────────────────────────
const PAGE_WIDTH = 4.1;
const PAGE_HEIGHT = 5.6;
const SPINE_GAP = 0.08;
const MAX_THICKNESS = 0.25;

// ── HTML portal sizing ───────────────────────────────────────────────────────
// The <Html transform> component in @react-three/drei renders a DOM element
// at 1px = 1 three.js world unit by default, then applies `scale` on top.
//
// Strategy: define CSS dimensions in pixels that *feel* like a real page at
// screen resolution, then calculate the scale factor to shrink that pixel
// canvas back down to match the 3-D page mesh dimensions exactly.
//
// CSS_WIDTH / CSS_HEIGHT  — the "virtual canvas" size in px the HTML is
//   laid out against. Larger = crisper text; must stay proportional to
//   PAGE_WIDTH / PAGE_HEIGHT so nothing is cropped.
//
// HTML_SCALE = PAGE_WIDTH / CSS_WIDTH
//   This tells drei "shrink my N-px-wide canvas to PAGE_WIDTH world units".
//   At 1024px wide the text reads at ~18px effective, which is comfortable.
//
// 💡 To make HTML content appear LARGER on the page, INCREASE the zoom below.
// This works by reducing the virtual canvas size, making pixels proportionally bigger.
const CONTENT_ZOOM = 2.0; 
const CSS_WIDTH = Math.round(1024 / CONTENT_ZOOM);
const CSS_HEIGHT = Math.round(CSS_WIDTH * (PAGE_HEIGHT / PAGE_WIDTH)); 
// Scale strictly enforces that the CSS dimensions fit precisely within the 3D grid
const HTML_SCALE = PAGE_WIDTH / CSS_WIDTH;

// Export these so parent components that pass renderPageFunc can size their
// page content correctly — all content must be laid out at CSS_WIDTH × CSS_HEIGHT.
export { CSS_WIDTH, CSS_HEIGHT };

// ─── Sacred Palette ──────────────────────────────────────────────────────────
// Inspired by aged temple manuscripts: deep sandalwood, ivory parchment, antique gold
const COVER_COLOR = '#2C1810'; // deep umber — warm, grounded, not harsh
const COVER_ACCENT = '#8B6914'; // antique gold for spine details
const PAPER_COLOR = '#FBF5E6'; // warm ivory, like hand-pressed paper
const PAPER_EDGE_COLOR = '#DDD0B0'; // aged parchment edge
const SPINE_COLOR = '#1E1008'; // darkest umber for the spine fold


// ─── Page content wrapper with sacred styling ────────────────────────────────
// CSS_WIDTH is 1024px — all font sizes / padding scaled up ~2.5×.
// Html portal shrinks everything back via HTML_SCALE so it fits the 3D mesh.
const pageStyle = {
  width: CSS_WIDTH,
  height: CSS_HEIGHT,
  background: 'transparent',
  userSelect: 'none',
  fontFamily: '"Crimson Text", Georgia, serif',
  color: '#2C1A0A',
  padding: '56px 48px 44px',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

// Decorative corner flourish — sizes scaled for 1024px canvas
function CornerMark({ corner }) {
  const pos = {
    topLeft: { top: 18, left: 18 },
    topRight: { top: 18, right: 18 },
    bottomLeft: { bottom: 18, left: 18 },
    bottomRight: { bottom: 18, right: 18 },
  }[corner];
  return (
    <div style={{
      position: 'absolute', ...pos,
      width: 32, height: 32,
      borderTop: corner.startsWith('top') ? '2px solid rgba(139,105,20,0.45)' : 'none',
      borderBottom: corner.startsWith('bottom') ? '2px solid rgba(139,105,20,0.45)' : 'none',
      borderLeft: corner.endsWith('Left') ? '2px solid rgba(139,105,20,0.45)' : 'none',
      borderRight: corner.endsWith('Right') ? '2px solid rgba(139,105,20,0.45)' : 'none',
    }} />
  );
}

// Inner page border line
function PageBorder() {
  return (
    <div style={{
      position: 'absolute', inset: 26,
      border: '1px solid rgba(139,105,20,0.18)',
      pointerEvents: 'none',
    }} />
  );
}

// ─── Default page renderer — callers override via renderPageFunc ─────────────
function DefaultPageContent({ page, index }) {
  if (!page) return (
    <div style={pageStyle}>
      <PageBorder />
      {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(c => <CornerMark key={c} corner={c} />)}
    </div>
  );

  const isCover = index === 0;

  if (isCover) return (
    <div style={{ ...pageStyle, alignItems: 'center', justifyContent: 'center', gap: 0 }}>
      <PageBorder />
      {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(c => <CornerMark key={c} corner={c} />)}

      <div style={{
        fontSize: 92, color: '#8B6914', marginBottom: 32,
        fontFamily: '"Noto Serif Devanagari", serif',
        textShadow: '0 2px 16px rgba(139,105,20,0.25)',
        lineHeight: 1,
      }}>ॐ</div>

      <div style={{
        fontFamily: '"Cinzel Decorative", "Cinzel", serif',
        fontSize: 38, fontWeight: 700,
        color: '#1E0F04', letterSpacing: '0.18em',
        textAlign: 'center', lineHeight: 1.5,
        marginBottom: 20,
      }}>BHAGAVAD<br />GITA</div>

      <div style={{
        fontSize: 24, letterSpacing: '0.22em',
        color: 'rgba(139,105,20,0.7)', textAlign: 'center',
        fontFamily: '"Cinzel", serif',
        marginBottom: 48,
      }}>श्रीमद्भगवद्गीता</div>

      <div style={{
        width: 120, height: 2,
        background: 'linear-gradient(to right, transparent, rgba(139,105,20,0.5), transparent)',
        marginBottom: 48,
      }} />

      <div style={{
        fontSize: 20, letterSpacing: '0.22em',
        color: 'rgba(44,26,10,0.45)', textAlign: 'center',
        fontFamily: '"Cinzel", serif',
      }}>SONG OF THE DIVINE</div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <PageBorder />
      {['topLeft', 'topRight', 'bottomLeft', 'bottomRight'].map(c => <CornerMark key={c} corner={c} />)}

      <div style={{
        fontFamily: '"Cinzel", serif',
        fontSize: 20, letterSpacing: '0.16em',
        color: 'rgba(139,105,20,0.65)',
        marginBottom: 28,
        textAlign: index % 2 === 0 ? 'left' : 'right',
      }}>
        {page.chapter || 'Chapter I'} · {page.verse || `Verse ${index}`}
      </div>

      {page.sanskrit && (
        <div style={{
          borderLeft: '5px solid rgba(139,105,20,0.4)',
          paddingLeft: 28,
          marginBottom: 32,
          marginLeft: 4,
        }}>
          <div style={{
            fontFamily: '"Noto Serif Devanagari", "Lohit Devanagari", serif',
            fontSize: 32, lineHeight: 1.9,
            color: '#3D1F06',
            fontStyle: 'italic',
          }}>{page.sanskrit}</div>
          {page.transliteration && (
            <div style={{
              fontSize: 22, lineHeight: 1.6,
              color: 'rgba(139,105,20,0.7)',
              marginTop: 10, fontStyle: 'italic',
              fontFamily: '"Crimson Text", serif',
            }}>{page.transliteration}</div>
          )}
        </div>
      )}

      <div style={{
        textAlign: 'center', fontSize: 24,
        color: 'rgba(139,105,20,0.35)',
        marginBottom: 28, letterSpacing: 20,
      }}>· · ·</div>

      {page.translation && (
        <div style={{
          fontSize: 28, lineHeight: 1.85,
          color: '#2C1A0A',
          fontFamily: '"Crimson Text", serif',
          fontWeight: 400,
          flex: 1,
        }}>{page.translation}</div>
      )}

      <div style={{
        textAlign: 'center',
        fontFamily: '"Cinzel", serif',
        fontSize: 20,
        color: 'rgba(139,105,20,0.4)',
        marginTop: 20,
        letterSpacing: '0.1em',
      }}>— {index} —</div>
    </div>
  );
}


// ─── BookPage ────────────────────────────────────────────────────────────────
function BookPage({ position, rotation, isLeft, frontContent, backContent }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh
        castShadow
        receiveShadow
        position={[
          isLeft ? (-PAGE_WIDTH / 2) - SPINE_GAP : (PAGE_WIDTH / 2) + SPINE_GAP,
          0, 0,
        ]}
      >
        <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, 0.008]} />
        <meshPhysicalMaterial
          color={PAPER_COLOR}
          roughness={0.85}
          clearcoat={0.05}
          clearcoatRoughness={0.9}
        />

        {frontContent && (
          <Html
            transform
            scale={HTML_SCALE}
            position={[0, 0, 0.005]}
            style={{ width: `${CSS_WIDTH}px`, height: `${CSS_HEIGHT}px`, overflow: 'hidden', background: 'transparent' }}
          >
            <div style={{ width: `${CSS_WIDTH}px`, height: `${CSS_HEIGHT}px`, background: 'transparent' }}>
              {frontContent}
            </div>
          </Html>
        )}

        {backContent && (
          <Html
            transform
            scale={HTML_SCALE}
            position={[0, 0, -0.005]}
            rotation-y={Math.PI}
            style={{ width: `${CSS_WIDTH}px`, height: `${CSS_HEIGHT}px`, overflow: 'hidden', background: 'transparent' }}
          >
            <div style={{ width: `${CSS_WIDTH}px`, height: `${CSS_HEIGHT}px`, background: 'transparent' }}>
              {backContent}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}


// ─── PageStack ───────────────────────────────────────────────────────────────
function PageStack({ isLeft, depth }) {
  if (depth <= 0.001) return null;
  const posZ = -depth / 2 - 0.004;
  const posX = isLeft
    ? (-PAGE_WIDTH / 2) - SPINE_GAP - 0.01
    : (PAGE_WIDTH / 2) + SPINE_GAP + 0.01;

  return (
    <mesh position={[posX, 0, posZ]} receiveShadow castShadow>
      <boxGeometry args={[PAGE_WIDTH - 0.04, PAGE_HEIGHT - 0.04, depth]} />
      <meshStandardMaterial
        color={PAPER_EDGE_COLOR}
        roughness={0.55}
        metalness={0.08}
      />
    </mesh>
  );
}


// ─── HardCover ───────────────────────────────────────────────────────────────
function HardCover({ isLeft }) {
  const coverW = PAGE_WIDTH + 0.15;
  const coverH = PAGE_HEIGHT + 0.2;
  const coverD = 0.045;
  const posZ = -MAX_THICKNESS - coverD / 2 - 0.01;
  const posX = isLeft
    ? -(coverW / 2) - SPINE_GAP + 0.05
    : (coverW / 2) + SPINE_GAP - 0.05;

  return (
    <group>
      {/* Main cover board */}
      <mesh position={[posX, 0, posZ]} receiveShadow castShadow>
        <boxGeometry args={[coverW, coverH, coverD]} />
        <meshPhysicalMaterial
          color={COVER_COLOR}
          roughness={0.72}
          metalness={0.04}
          clearcoat={0.15}
          clearcoatRoughness={0.7}
        />
      </mesh>

      {/* Subtle gold border inlay on the outer face */}
      <mesh
        position={[
          posX + (isLeft ? -0.001 : 0.001),
          0,
          posZ + coverD / 2 + 0.001,
        ]}
      >
        <boxGeometry args={[coverW - 0.18, coverH - 0.18, 0.002]} />
        <meshStandardMaterial
          color={COVER_ACCENT}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}


// ─── Spine ───────────────────────────────────────────────────────────────────
function Spine() {
  return (
    <group position={[0, 0, -MAX_THICKNESS - 0.04]}>
      {/* Cylinder body */}
      <mesh receiveShadow castShadow>
        <cylinderGeometry args={[0.13, 0.13, PAGE_HEIGHT + 0.2, 32]} />
        <meshPhysicalMaterial
          color={SPINE_COLOR}
          roughness={0.65}
          metalness={0.06}
          clearcoat={0.2}
          clearcoatRoughness={0.65}
        />
      </mesh>

      {/* Gold band top */}
      <mesh position={[0, (PAGE_HEIGHT + 0.2) / 2 - 0.12, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.06, 32]} />
        <meshStandardMaterial color={COVER_ACCENT} roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Gold band bottom */}
      <mesh position={[0, -(PAGE_HEIGHT + 0.2) / 2 + 0.12, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.06, 32]} />
        <meshStandardMaterial color={COVER_ACCENT} roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Gold band middle */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.135, 0.135, 0.04, 32]} />
        <meshStandardMaterial color={COVER_ACCENT} roughness={0.25} metalness={0.7} />
      </mesh>
    </group>
  );
}


// ─── Particles — drifting motes of light for atmosphere ──────────────────────
function DustMotes() {
  const count = 80;
  const mesh = useRef();
  const clock = useRef(0);

  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    clock.current += delta * 0.12;
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += Math.sin(clock.current + i * 0.7) * 0.003;
      pos[i * 3] += Math.cos(clock.current + i * 0.5) * 0.001;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#f5d78e"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}


// ─── ThreeBook (main export) ─────────────────────────────────────────────────
export default function ThreeBook({
  allPages = [],
  spread = 0,
  flipping = null,
  flipProgress = 0,
  renderPageFunc,
}) {
  const renderPage = renderPageFunc
    ?? ((page, index) => <DefaultPageContent page={page} index={index} />);

  const totalSpreads = Math.ceil(allPages.length / 2);
  const leftPageIdx = spread * 2;
  const rightPageIdx = spread * 2 + 1;
  const nextLeftIdx = (spread + 1) * 2;
  const nextRightIdx = (spread + 1) * 2 + 1;
  const prevLeftIdx = (spread - 1) * 2;
  const prevRightIdx = (spread - 1) * 2 + 1;

  const leftStackPerc = spread / totalSpreads;
  const rightStackPerc = 1 - (spread / totalSpreads);

  let staticLeftIdx = flipping === 'prev' ? prevLeftIdx : leftPageIdx;
  let staticRightIdx = flipping === 'next' ? nextRightIdx : rightPageIdx;

  let flipRotY = 0;
  let isFlipLeft = false;
  let flipFrontIdx = null;
  let flipBackIdx = null;
  let lift = 0;

  if (flipping === 'next') {
    isFlipLeft = false;
    flipRotY = -(flipProgress * Math.PI);
    flipFrontIdx = rightPageIdx;
    flipBackIdx = nextLeftIdx;
    lift = Math.sin(flipProgress * Math.PI) * 0.28;
  } else if (flipping === 'prev') {
    isFlipLeft = true;
    flipRotY = +(flipProgress * Math.PI);
    flipFrontIdx = leftPageIdx;
    flipBackIdx = prevRightIdx;
    lift = Math.sin(flipProgress * Math.PI) * 0.28;
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 8.8], fov: 40 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
        style={{ background: 'transparent' }}
      >
        {/*
          ── Lighting philosophy ─────────────────────────────────────────────
          Warm candlelight from above-right (key),
          soft fill from the left,
          and a dim cool rim from behind to separate the book from the bg.
        */}
        <ambientLight intensity={0.45} color="#ffeedd" />

        {/* Key light — warm, angled like a reading lamp */}
        <directionalLight
          position={[3.5, 8, 2]}
          intensity={1.8}
          color="#ffe4b5"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Fill light — soft, prevents harsh shadows */}
        <pointLight position={[-4, 3, 4]} intensity={0.6} color="#fff1dc" />

        {/* Rim light — separates book from dark bg */}
        <pointLight position={[0, -2, -5]} intensity={0.3} color="#c0a060" />

        <Environment preset="sunset" />
        <DustMotes />

        <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.35}>
          <group rotation={[-Math.PI / 14, 0, 0]}>

            <Spine />
            <HardCover isLeft={true} />
            <HardCover isLeft={false} />

            <PageStack isLeft={true} depth={leftStackPerc * MAX_THICKNESS} />
            <PageStack isLeft={false} depth={rightStackPerc * MAX_THICKNESS} />

            {/* Static left page */}
            <BookPage
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              isLeft={true}
              frontContent={renderPage(allPages[staticLeftIdx], staticLeftIdx)}
            />

            {/* Static right page */}
            <BookPage
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              isLeft={false}
              frontContent={renderPage(allPages[staticRightIdx], staticRightIdx)}
            />

            {/* Flipping page */}
            {flipping && (
              <BookPage
                position={[0, 0, lift]}
                rotation={[0, flipRotY, 0]}
                isLeft={isFlipLeft}
                frontContent={renderPage(allPages[flipFrontIdx], flipFrontIdx)}
                backContent={renderPage(allPages[flipBackIdx], flipBackIdx)}
              />
            )}
          </group>
        </Float>

        {/*
          Shadow: warmer tint, tighter blur — feels like a candle on a desk
        */}
        <ContactShadows
          position={[0, -4.6, 0]}
          opacity={0.45}
          scale={28}
          blur={5}
          far={4.5}
          color="#2a1a08"
          resolution={1024}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.08}
          minPolarAngle={Math.PI / 3.8}
          enableDamping
          dampingFactor={0.06}
          zoomSpeed={0.6}
          rotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}