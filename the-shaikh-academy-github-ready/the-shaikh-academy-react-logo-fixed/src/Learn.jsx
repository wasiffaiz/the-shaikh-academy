import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './learn.css';

const LESSONS = {
  forehand: {
    title: 'FOREHAND',
    subtitle: 'Build a controlled, repeatable forehand.',
    stages: [
      ['READY POSITION', 'Balanced stance, eyes forward, racket prepared.'],
      ['UNIT TURN', 'Turn shoulders and prepare the racket early.'],
      ['CONTACT', 'Meet the ball comfortably in front of your body.'],
      ['FOLLOW-THROUGH', 'Continue the swing and recover your balance.']
    ]
  },
  backhand: {
    title: 'TWO-HANDED BACKHAND',
    subtitle: 'Use preparation and body rotation to control the shot.',
    stages: [
      ['READY POSITION', 'Stay balanced with both hands ready.'],
      ['UNIT TURN', 'Turn shoulders and prepare both hands together.'],
      ['CONTACT', 'Strike in front with a stable racket face.'],
      ['FOLLOW-THROUGH', 'Rotate smoothly and return to ready position.']
    ]
  },
  serve: {
    title: 'SERVE',
    subtitle: 'Connect the toss, upward drive and landing.',
    stages: [
      ['STARTING STANCE', 'Set your feet and relax your upper body.'],
      ['BALL TOSS', 'Lift the tossing arm smoothly and consistently.'],
      ['CONTACT', 'Reach upwards to strike at full comfortable extension.'],
      ['LANDING', 'Follow through and land balanced inside the court.']
    ]
  }
};

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const lerp = THREE.MathUtils.lerp;
const smooth = t => { const v = clamp(t, 0, 1); return v * v * (3 - 2 * v); };
const phase = (t, a, b) => smooth((t - a) / (b - a));

function Limb({ start, end, radius = 0.09, color = '#e3b18e' }) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const direction = b.clone().sub(a);
  const q = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0), direction.clone().normalize()
  );
  return (
    <mesh position={mid.toArray()} quaternion={q} castShadow>
      <cylinderGeometry args={[radius, radius, direction.length(), 10]} />
      <meshStandardMaterial color={color} roughness={0.78} />
    </mesh>
  );
}

function Player({ lesson, progress }) {
  // Stylised motion poses, deliberately simplified rather than biomechanical capture.
  const turn = phase(progress, 0.10, 0.32);
  const strike = phase(progress, 0.34, 0.66);
  const finish = phase(progress, 0.66, 0.94);
  const isServe = lesson === 'serve';
  const isBackhand = lesson === 'backhand';
  const torsoRotation = isServe
    ? lerp(-0.22, 0.28, strike)
    : (isBackhand ? -1 : 1) * (0.55 * turn - 0.95 * strike + 0.4 * finish);

  const rightShoulder = [0.32, 2.32, 0];
  const leftShoulder = [-0.32, 2.32, 0];
  const rightElbow = isServe
    ? [0.62, lerp(2.05, 2.7, strike), lerp(0.08, -0.05, strike)]
    : [lerp(0.57, isBackhand ? -0.1 : 0.72, strike), lerp(2.04, 2.2, strike), lerp(-0.35, 0.35, strike)];
  const rightHand = isServe
    ? [lerp(0.83, 0.55, strike), lerp(2.35, 3.55, strike), -0.12]
    : [lerp(isBackhand ? -0.38 : 0.85, isBackhand ? 0.64 : -0.58, strike), lerp(1.82, 2.18, finish), lerp(-0.55, 0.7, strike)];
  const leftElbow = isServe
    ? [-0.55, lerp(2.22, 2.85, phase(progress, 0.12, 0.48)), 0]
    : [-0.53, 2.08, -0.08];
  const leftHand = isServe
    ? [-0.65, lerp(2.0, 3.55, phase(progress, 0.1, 0.48)), 0]
    : isBackhand
      ? [rightHand[0] - 0.16, rightHand[1] - 0.07, rightHand[2] - 0.04]
      : [-0.55, 1.8, 0.26];

  return (
    <group rotation={[0, torsoRotation, 0]}>
      <mesh position={[0, 1.99, 0]} castShadow>
        <capsuleGeometry args={[0.32, 0.72, 6, 12]} />
        <meshStandardMaterial color="#e3b18e" roughness={0.86} />
      </mesh>
      <mesh position={[0, 2.83, 0]} castShadow>
        <sphereGeometry args={[0.24, 18, 16]} />
        <meshStandardMaterial color="#d7a27d" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.99, -0.015]} castShadow>
        <sphereGeometry args={[0.244, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2.7]} />
        <meshStandardMaterial color="#1a2632" />
      </mesh>
      <mesh position={[0, 1.47, 0]} castShadow>
        <boxGeometry args={[0.52, 0.32, 0.37]} />
        <meshStandardMaterial color="#f4f2ed" />
      </mesh>
      <Limb start={[-0.17, 1.38, 0]} end={[-0.22, 0.72, 0.05]} radius={0.13} color="#f4f2ed" />
      <Limb start={[-0.22, 0.72, 0.05]} end={[-0.27, 0.13, 0.1]} radius={0.09} color="#d7a27d" />
      <Limb start={[0.17, 1.38, 0]} end={[0.24, 0.74, isServe ? -0.13 : 0.12]} radius={0.13} color="#f4f2ed" />
      <Limb start={[0.24, 0.74, isServe ? -0.13 : 0.12]} end={[0.32, 0.13, isServe ? -0.28 : 0.21]} radius={0.09} color="#d7a27d" />
      <mesh position={[-0.27, 0.1, 0.19]} castShadow><boxGeometry args={[0.27, 0.14, 0.48]}/><meshStandardMaterial color="#f4f2ed"/></mesh>
      <mesh position={[0.32, 0.1, isServe ? -0.2 : 0.3]} castShadow><boxGeometry args={[0.27, 0.14, 0.48]}/><meshStandardMaterial color="#f4f2ed"/></mesh>
      <Limb start={rightShoulder} end={rightElbow} radius={0.105} color="#d7a27d" />
      <Limb start={rightElbow} end={rightHand} radius={0.08} color="#d7a27d" />
      <Limb start={leftShoulder} end={leftElbow} radius={0.105} color="#d7a27d" />
      <Limb start={leftElbow} end={leftHand} radius={0.08} color="#d7a27d" />
      <group position={rightHand} rotation={[isServe ? -0.2 : 0, 0, isServe ? -0.1 : 0.25]}>
        <Limb start={[0, 0, 0]} end={[0, 0.42, 0]} radius={0.037} color="#202c38" />
        <mesh position={[0, 0.72, 0]} scale={[0.37, 0.52, 0.065]} castShadow>
          <sphereGeometry args={[1, 24, 16]} />
          <meshStandardMaterial color="#263f52" wireframe />
        </mesh>
      </group>
      {isServe && (
        <mesh position={[-0.65, lerp(2.25, 3.9, phase(progress, 0.12, 0.54)), 0.08]}>
          <sphereGeometry args={[0.085, 14, 12]} />
          <meshStandardMaterial color="#d8ef6a" />
        </mesh>
      )}
    </group>
  );
}

function Scene({ lesson, playing, slow, resetToken, seekProgress, onProgress }) {
  const elapsed = useRef(0);
  const [progress, setProgress] = useState(0);
  useEffect(() => { elapsed.current = seekProgress; setProgress(seekProgress); onProgress(seekProgress); }, [lesson, resetToken]);
  useFrame((_, delta) => {
    if (!playing) return;
    elapsed.current = Math.min(1, elapsed.current + Math.min(delta, 0.05) / (slow ? 8 : 4));
    setProgress(elapsed.current);
    onProgress(elapsed.current);
  });
  return (
    <>
      <color attach="background" args={['#142436']} />
      <ambientLight intensity={1.6} />
      <directionalLight position={[3, 7, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.9} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#24443e" roughness={1} />
      </mesh>
      <gridHelper args={[10, 10, '#668b7b', '#34584d']} position={[0, 0.01, 0]} />
      <Player lesson={lesson} progress={progress} />
      <OrbitControls enablePan={false} minDistance={3.5} maxDistance={9} minPolarAngle={0.45} maxPolarAngle={Math.PI / 2.05} target={[0, 1.65, 0]} />
    </>
  );
}

export default function Learn() {
  const [lesson, setLesson] = useState('forehand');
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [resetToken, setResetToken] = useState(0);
  const [progress, setProgress] = useState(0);
  const [seekProgress, setSeekProgress] = useState(0);
  const data = LESSONS[lesson];
  const stageIndex = Math.min(3, Math.floor(progress * 4));

  const changeLesson = id => {
    setLesson(id);
    setPlaying(false);
    setProgress(0);
    setSeekProgress(0);
    setResetToken(n => n + 1);
  };
  const replay = () => {
    setSeekProgress(0);
    setResetToken(n => n + 1);
    setProgress(0);
    setPlaying(true);
  };
  const jumpToStage = index => {
    setPlaying(false);
    setSeekProgress(index / 4 + 0.01);
    setResetToken(n => n + 1);
  };

  return (
    <main className="learnPage">
      <header className="learnIntro">
        <span>THE SHAIKH ACADEMY / PLAYER DEVELOPMENT</span>
        <h1>MASTER THE <em>MOTION.</em></h1>
        <p>STUDY THE MOVEMENT. UNDERSTAND THE TECHNIQUE. BUILD YOUR GAME.</p>
      </header>

      <div className="learnTabs" role="group" aria-label="Select tennis technique">
        {Object.entries(LESSONS).map(([id, item]) => (
          <button type="button" key={id} className={lesson === id ? 'active' : ''} aria-pressed={lesson === id} onClick={() => changeLesson(id)}>{item.title}</button>
        ))}
      </div>

      <section className="learnWorkspace">
        <div className="learnViewer">
          <Canvas shadows camera={{ position: [4.6, 3.4, 5.2], fov: 40 }} dpr={[1, 1.8]}>
            <Scene lesson={lesson} playing={playing} slow={slow} resetToken={resetToken} seekProgress={seekProgress} onProgress={setProgress} />
          </Canvas>
          <span className="learnViewerLabel">3D TECHNIQUE VIEWER / DRAG TO ROTATE · SCROLL TO ZOOM</span>
        </div>

        <div className="learnPanel">
          <span className="learnEyebrow">01 / TECHNIQUE STUDIO</span>
          <h2>{data.title}</h2>
          <p>{data.subtitle}</p>
          <div className="learnControls">
            <button type="button" onClick={() => { if (progress >= 1) replay(); else setPlaying(v => !v); }}>{playing ? 'Ⅱ PAUSE' : progress >= 1 ? '▶ PLAY AGAIN' : '▶ PLAY'}</button>
            <button type="button" onClick={replay}>↻ REPLAY</button>
            <button type="button" className={slow ? 'active' : ''} aria-pressed={slow} onClick={() => setSlow(v => !v)}>{slow ? '½× SLOW ON' : '½× SLOW'}</button>
          </div>
          <div className="learnProgress" role="progressbar" aria-label="Animation progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}><div style={{ width: `${progress * 100}%` }} /></div>
          <span className="learnEyebrow">02 / MOVEMENT BREAKDOWN</span>
          <div className="learnStages">
            {data.stages.map(([name, description], index) => (
              <button type="button" key={name} onClick={() => jumpToStage(index)} className={stageIndex === index ? 'learnStage active' : 'learnStage'} aria-pressed={stageIndex === index}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{name}</strong><p>{description}</p></div>
              </button>
            ))}
          </div>
          <p className="learnNote">This stylised 3D demonstration illustrates broad movement phases. It is not motion-captured or a substitute for personalised coaching.</p>
        </div>
      </section>
      <footer className="learnFooter">THE SHAIKH ACADEMY <span>FOUNDATION. DISCIPLINE. PROGRESS.</span></footer>
    </main>
  );
}
