
import React, { useState } from 'react';
import './court-lab.css';

const shotOptions = {
  cross: {
    label: 'CROSS-COURT',
    target: [222, 72],
    path: 'M160 306 Q185 190 222 72',
    returnPath: 'M222 72 Q185 180 96 295',
    opponent: [222, 72],
    returnTarget: [96, 295],
    recovery: [145, 306],
    explanation:
      'Cross-court shots travel over a lower part of the net and offer more court length. Prepare for a possible change of direction.'
  },
  line: {
    label: 'DOWN THE LINE',
    target: [94, 72],
    path: 'M160 306 Q125 190 94 72',
    returnPath: 'M94 72 Q145 180 225 295',
    opponent: [94, 72],
    returnTarget: [225, 295],
    recovery: [185, 306],
    explanation:
      'Down-the-line attacks can change the rally direction, but they may expose the opposite side of your court.'
  },
  middle: {
    label: 'DEEP MIDDLE',
    target: [160, 52],
    path: 'M160 306 L160 52',
    returnPath: 'M160 52 Q160 180 160 295',
    opponent: [160, 52],
    returnTarget: [160, 295],
    recovery: [160, 306],
    explanation:
      'A deep central shot can reduce the angles available to your opponent and help you regain a balanced position.'
  }
};

const spinOptions = [
  {
    id: 'topspin',
    label: 'TOPSPIN',
    description: 'A higher-margin shot that dips into the court.'
  },
  {
    id: 'flat',
    label: 'FLAT',
    description: 'A more direct trajectory with less net clearance.'
  },
  {
    id: 'slice',
    label: 'SLICE',
    description: 'Backspin can keep the bounce lower.'
  },
  {
    id: 'lob',
    label: 'LOB',
    description: 'A high shot used to create time or pass a net player.'
  }
];

const challenges = [
  {
    title: 'THE OPEN COURT',
    situation:
      'Your opponent is pulled wide to their backhand side. You receive a manageable ball near your baseline.',
    question: 'Which option best exploits the open court?',
    answers: [
      {
        label: 'ATTACK THE OPEN SPACE',
        correct: true,
        feedback:
          'Good decision. When you are balanced and have time, directing the ball into the open space can make your opponent cover more distance.'
      },
      {
        label: 'HIT DIRECTLY BACK TO THEM',
        correct: false,
        feedback:
          'Returning to the opponent can sometimes be useful, but here the open court offers an attacking opportunity.'
      },
      {
        label: 'PLAY A DROP SHOT FROM DEEP',
        correct: false,
        feedback:
          'A drop shot from a deep position is difficult to execute consistently. Consider your court position first.'
      }
    ]
  },
  {
    title: 'DEFENDING A WIDE BALL',
    situation:
      'You have been pulled outside the singles sideline and are hitting while stretched.',
    question: 'What is usually the safer tactical response?',
    answers: [
      {
        label: 'HIGH, DEEP CROSS-COURT',
        correct: true,
        feedback:
          'Good choice. Height and depth can give you recovery time, although the best response still depends on the incoming ball.'
      },
      {
        label: 'LOW-PERCENTAGE LINE WINNER',
        correct: false,
        feedback:
          'A down-the-line winner while stretched is difficult and can leave your court exposed.'
      },
      {
        label: 'SHORT CENTRAL BALL',
        correct: false,
        feedback:
          'A short ball may allow your opponent to step forward and attack.'
      }
    ]
  },
  {
    title: 'ATTACKING THE SHORT BALL',
    situation:
      'Your opponent hits a short, comfortable ball. You can move inside the baseline with good balance.',
    question: 'What should guide your attacking decision?',
    answers: [
      {
        label: 'PLACEMENT AND RECOVERY',
        correct: true,
        feedback:
          'Correct. Choose a target you can execute reliably and recover according to your opponent’s likely reply.'
      },
      {
        label: 'MAXIMUM POWER EVERY TIME',
        correct: false,
        feedback:
          'Power alone is not enough. Placement, balance and your next position matter.'
      },
      {
        label: 'STAY BEHIND THE BASELINE',
        correct: false,
        feedback:
          'Moving forward can help you take time away from the opponent when the ball is suitable.'
      }
    ]
  }
];

export default function CourtLab() {
  const [selectedShot, setSelectedShot] = useState('cross');
  const [selectedSpin, setSelectedSpin] = useState('topspin');
  const [level, setLevel] = useState('intermediate');
  const [replayKey, setReplayKey] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const shot = shotOptions[selectedShot];
  const spin = spinOptions.find(item => item.id === selectedSpin);
  const challenge = challenges[challengeIndex];
  const selectedAnswer =
    answerIndex === null ? null : challenge.answers[answerIndex];

  const replay = () => {
    setReplayKey(previous => previous + 1);
  };

  const changeShot = (id) => {
    setSelectedShot(id);
    replay();
  };

  const answerChallenge = (index) => {
    if (answerIndex !== null) return;

    setAnswerIndex(index);
    setAnswered(previous => previous + 1);

    if (challenge.answers[index].correct) {
      setScore(previous => previous + 1);
    }
  };

  const nextChallenge = () => {
    setChallengeIndex(previous => (previous + 1) % challenges.length);
    setAnswerIndex(null);
  };

  const resetChallenges = () => {
    setChallengeIndex(0);
    setAnswerIndex(null);
    setScore(0);
    setAnswered(0);
  };

  return (
    <main className="courtLab">

      <header className="courtLabIntro">
        <span>THE SHAIKH ACADEMY / INTERACTIVE EXPERIENCE</span>
        <h1>THE COURT <em>LAB.</em></h1>
        <h2>TACTICAL INTELLIGENCE.</h2>
        <p>READ THE GAME. ANTICIPATE THE SHOT. WIN THE POINT.</p>
      </header>

      <section className="courtLabWorkspace">

        <div className="courtLabCourt">
          <svg
            viewBox="0 0 320 350"
            role="img"
            aria-label={`Tactical tennis rally: ${shot.label}`}
          >
            <rect
              x="27" y="12" width="266" height="326"
              fill="#315a4f"
              stroke="#f4f2ed"
              strokeWidth="2"
            />

            <rect
              x="61" y="12" width="198" height="326"
              fill="none"
              stroke="#f4f2ed"
              strokeWidth="2"
            />

            <path
              d="M61 92H259 M61 258H259 M160 92V258"
              fill="none"
              stroke="#f4f2ed"
              strokeWidth="2"
            />

            <path
              d="M18 175H302"
              stroke="#e0e7e3"
              strokeWidth="4"
            />

            <path
              d={shot.path}
              fill="none"
              stroke="#e3b18e"
              strokeWidth="3"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />

            <path
              d={shot.returnPath}
              fill="none"
              stroke="#8ad4e8"
              strokeWidth="2.5"
              strokeDasharray="5 6"
              strokeLinecap="round"
            />

            {/* Your ball travels first; the return follows. */}
            <circle
              key={`outbound-${selectedShot}-${replayKey}`}
              r="5"
              fill="#d8ef6a"
              stroke="#ffffff"
              strokeWidth="1"
            >
              <animateMotion
                path={shot.path}
                dur="1.2s"
                begin="0s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                values="1;1;0"
                keyTimes="0;0.99;1"
                dur="1.2s"
                begin="0s"
                fill="freeze"
              />
            </circle>

            <circle
              key={`return-${selectedShot}-${replayKey}`}
              r="5"
              fill="#8ad4e8"
              stroke="#ffffff"
              strokeWidth="1"
              opacity="0"
            >
              <animateMotion
                path={shot.returnPath}
                dur="1.2s"
                begin="1.45s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                values="0;1;1"
                keyTimes="0;0.01;1"
                dur="1.2s"
                begin="1.45s"
                fill="freeze"
              />
            </circle>

            {/* Player */}
            <circle cx="160" cy="306" r="8" fill="#ffffff" />

            {/* Opponent movement */}
            <circle
              key={`opponent-${selectedShot}-${replayKey}`}
              cx="160"
              cy="47"
              r="8"
              fill="#101a28"
              stroke="#ffffff"
              strokeWidth="2"
            >
              <animate
                attributeName="cx"
                from="160"
                to={shot.opponent[0]}
                dur="1.2s"
                begin="0s"
                fill="freeze"
              />
              <animate
                attributeName="cy"
                from="47"
                to={shot.opponent[1]}
                dur="1.2s"
                begin="0s"
                fill="freeze"
              />
            </circle>

            {/* Target */}
            <circle
              cx={shot.target[0]}
              cy={shot.target[1]}
              r="18"
              fill="#e3b18e"
              fillOpacity=".12"
              stroke="#e3b18e"
              strokeDasharray="4 4"
            />

            {/* Return landing */}
            <circle
              cx={shot.returnTarget[0]}
              cy={shot.returnTarget[1]}
              r="14"
              fill="#8ad4e8"
              fillOpacity=".12"
              stroke="#8ad4e8"
              strokeDasharray="4 4"
            />

            {/* Recovery target */}
            <circle
              cx={shot.recovery[0]}
              cy={shot.recovery[1]}
              r="14"
              fill="none"
              stroke="#e3b18e"
              strokeWidth="2"
              strokeDasharray="3 4"
            />

            <text
              x="160" y="328"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
            >
              YOU
            </text>

            <text
              x="160" y="30"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
            >
              OPPONENT
            </text>
          </svg>
        </div>

        <div className="courtLabControls">
          <span className="courtLabEyebrow">01 / SHOT SIMULATOR</span>
          <h3>CHOOSE YOUR SHOT.</h3>
          <p>
            Select a direction and observe a possible opponent response.
          </p>

          <div className="courtLabShotButtons">
            {Object.entries(shotOptions).map(([id, item]) => (
              <button
                key={id}
                type="button"
                className={selectedShot === id ? 'active' : ''}
                aria-pressed={selectedShot === id}
                onClick={() => changeShot(id)}
              >
                {item.label}
                <span>↗</span>
              </button>
            ))}
          </div>

          <div className="courtLabSelection">
            <span>SELECTED SHOT</span>
            <strong>{shot.label}</strong>
          </div>

          <button
            type="button"
            className="courtLabReplay"
            onClick={replay}
          >
            ↻ REPLAY RALLY
          </button>

          <div className="courtLabTactics">
            <span className="courtLabEyebrow">
              02 / SHOT VARIATION
            </span>
            <h3>CONTROL THE BALL.</h3>

            <div className="courtLabChoiceGrid">
              {spinOptions.map(item => (
                <button
                  type="button"
                  key={item.id}
                  className={selectedSpin === item.id ? 'active' : ''}
                  onClick={() => setSelectedSpin(item.id)}
                  aria-pressed={selectedSpin === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="courtLabInfo">{spin.description}</p>
            <p className="courtLabDisclaimer">
              Shot variations provide coaching explanations.
              The displayed trajectory is a simplified tactical diagram.
            </p>
          </div>

          <div className="courtLabTactics">
            <span className="courtLabEyebrow">
              03 / TACTICAL INTELLIGENCE
            </span>
            <h3>READ THE RETURN.</h3>

            <div className="courtLabTacticCard">
              <span>POSSIBLE OPPONENT RESPONSE</span>
              <p>{shot.explanation}</p>
            </div>

            <div className="courtLabTacticCard">
              <span>YOUR RECOVERY POSITION</span>
              <p>
                Follow the dashed recovery marker on the court.
                Split step as your opponent prepares to strike,
                and adjust to the ball you actually receive.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TACTICAL CHALLENGE */}
      <section className="courtLabChallenge">
        <span className="courtLabEyebrow">
          04 / WIN THE POINT
        </span>

        <h2>THINK LIKE A PLAYER.</h2>
        <p className="courtLabChallengeIntro">
          Read the situation. Make your decision.
          Learn the tactical reasoning.
        </p>

        <div className="courtLabChallengePanel">

          <div className="courtLabChallengeTop">
            <span>
              CHALLENGE {challengeIndex + 1} / {challenges.length}
            </span>
            <span>SCORE {score} / {answered}</span>
          </div>

          <h3>{challenge.title}</h3>
          <p>{challenge.situation}</p>
          <strong className="courtLabQuestion">
            {challenge.question}
          </strong>

          <div className="courtLabAnswers">
            {challenge.answers.map((answer, index) => (
              <button
                key={index}
                type="button"
                disabled={answerIndex !== null}
                className={
                  answerIndex === index
                    ? answer.correct ? 'correct' : 'incorrect'
                    : ''
                }
                onClick={() => answerChallenge(index)}
              >
                <span>{answer.label}</span>
                <span>↗</span>
              </button>
            ))}
          </div>

          {selectedAnswer && (
            <div
              className="courtLabFeedback"
              aria-live="polite"
            >
              <span>
                {selectedAnswer.correct
                  ? 'GOOD TACTICAL DECISION'
                  : 'COACHING FEEDBACK'}
              </span>
              <p>{selectedAnswer.feedback}</p>
            </div>
          )}

          {answerIndex !== null && (
            <button
              type="button"
              className="courtLabNext"
              onClick={nextChallenge}
            >
              NEXT CHALLENGE →
            </button>
          )}

          <button
            type="button"
            className="courtLabReset"
            onClick={resetChallenges}
          >
            RESET TRAINING
          </button>

        </div>
      </section>

      {/* DIFFICULTY LEVELS */}
      <section className="courtLabLevels">
        <span className="courtLabEyebrow">
          05 / PLAYER DEVELOPMENT
        </span>

        <h2>CHOOSE YOUR LEVEL.</h2>

        <div className="courtLabLevelButtons">
          {['beginner', 'intermediate', 'advanced'].map(item => (
            <button
              key={item}
              type="button"
              className={level === item ? 'active' : ''}
              aria-pressed={level === item}
              onClick={() => setLevel(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <p className="courtLabInfo">
          {level === 'beginner' &&
            'Focus on safe targets, consistency and basic recovery.'}
          {level === 'intermediate' &&
            'Focus on constructing points, changing direction and court positioning.'}
          {level === 'advanced' &&
            'Focus on anticipating responses, managing risk and exploiting space.'}
        </p>

        <p className="courtLabDisclaimer">
          Difficulty currently changes the learning focus.
          Level-specific challenges can be added in a later version.
        </p>
      </section>

      <footer className="courtLabFooter">
        <span>THE SHAIKH ACADEMY</span>
        <p>BUILT ON FOUNDATION. DRIVEN BY PROGRESS. DEFINED BY THE PLAYER.</p>
      </footer>

    </main>
  );
}

