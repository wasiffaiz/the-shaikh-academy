

import React, { useState } from 'react';
import './court-lab.css';

const shots = {
  cross: {
    label: 'CROSS-COURT',
    x: 222,
    y: 72,
    path: 'M160 306 Q185 190 222 72'
  },
  line: {
    label: 'DOWN THE LINE',
    x: 94,
    y: 72,
    path: 'M160 306 Q125 190 94 72'
  },
  middle: {
    label: 'DEEP MIDDLE',
    x: 160,
    y: 52,
    path: 'M160 306 L160 52'
  }
};

export default function CourtLab() {
  const [selectedShot, setSelectedShot] = useState('cross');
  const [replayKey, setReplayKey] = useState(0);

  const shot = shots[selectedShot];

  const replayShot = () => {
    setReplayKey(previous => previous + 1);
  };

  const selectShot = (id) => {
    setSelectedShot(id);
    replayShot();
  };

  return (
    <main className="courtLab">

      {/* PAGE INTRO */}
      <div className="courtLabIntro">
        <span>
          THE SHAIKH ACADEMY / INTERACTIVE EXPERIENCE
        </span>

        <h1>
          THE COURT <em>LAB.</em>
        </h1>

        <h2>TACTICAL INTELLIGENCE.</h2>

        <p>
          READ THE GAME. ANTICIPATE THE SHOT. WIN THE POINT.
        </p>
      </div>

      {/* COURT AND CONTROLS */}
      <section className="courtLabWorkspace">

        <div className="courtLabCourt">
          <svg
            viewBox="0 0 320 350"
            role="img"
            aria-label={`Tennis court showing ${shot.label} shot`}
          >

            {/* COURT BACKGROUND */}
            <rect
              x="27"
              y="12"
              width="266"
              height="326"
              fill="#315a4f"
              stroke="#f4f2ed"
              strokeWidth="2"
            />

            {/* SINGLES SIDELINES */}
            <rect
              x="61"
              y="12"
              width="198"
              height="326"
              fill="none"
              stroke="#f4f2ed"
              strokeWidth="2"
            />

            {/* SERVICE BOXES */}
            <path
              d="M61 92H259 M61 258H259 M160 92V258"
              stroke="#f4f2ed"
              strokeWidth="2"
              fill="none"
            />

            {/* NET */}
            <path
              d="M18 175H302"
              stroke="#e0e7e3"
              strokeWidth="4"
            />

            {/* SELECTED SHOT TRAJECTORY */}
            <path
              key={`path-${selectedShot}-${replayKey}`}
              d={shot.path}
              className="courtLabShotPath"
              fill="none"
              stroke="#e3b18e"
              strokeWidth="3"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />

            {/* ANIMATED TENNIS BALL */}
            <circle
              key={`ball-${selectedShot}-${replayKey}`}
              r="5"
              fill="#d8ef6a"
              stroke="#f4f2ed"
              strokeWidth="1"
            >
              <animateMotion
                dur="1.3s"
                begin="0s"
                fill="freeze"
                path={shot.path}
              />
            </circle>

            {/* YOUR POSITION */}
            <circle
              cx="160"
              cy="306"
              r="8"
              fill="#ffffff"
            />

            {/* OPPONENT POSITION */}
            <circle
              cx="160"
              cy="47"
              r="8"
              fill="#101a28"
              stroke="#ffffff"
              strokeWidth="2"
            />

            {/* TARGET AREA */}
            <circle
              cx={shot.x}
              cy={shot.y}
              r="19"
              fill="#e3b18e"
              fillOpacity=".15"
              stroke="#e3b18e"
              strokeDasharray="4 4"
            />

            {/* TARGET MARKER */}
            <circle
              cx={shot.x}
              cy={shot.y}
              r="5"
              fill="#e3b18e"
            />

            {/* PLAYER LABELS */}
            <text
              x="160"
              y="328"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
            >
              YOU
            </text>

            <text
              x="160"
              y="30"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
            >
              OPPONENT
            </text>

          </svg>
        </div>

        {/* SHOT SELECTION CONTROLS */}
        <div className="courtLabControls">

          <span className="courtLabEyebrow">
            01 / SHOT SELECTION
          </span>

          <h3>CHOOSE YOUR SHOT.</h3>

          <p>
            You are positioned at the baseline.
            Select where you want to place the ball.
          </p>

          <div className="courtLabShotButtons">
            {Object.entries(shots).map(([id, item]) => (
              <button
                key={id}
                type="button"
                className={
                  selectedShot === id ? 'active' : ''
                }
                onClick={() => selectShot(id)}
                aria-pressed={selectedShot === id}
              >
                {item.label}
                <span>↗</span>
              </button>
            ))}
          </div>

          {/* SELECTED SHOT */}
          <div className="courtLabSelection">
            <span>SELECTED SHOT</span>
            <strong>{shot.label}</strong>
          </div>

          {/* REPLAY BUTTON */}
          <button
            type="button"
            className="courtLabReplay"
            onClick={replayShot}
          >
            ↻ REPLAY SHOT
          </button>

        </div>
      </section>
    </main>
  );
}
