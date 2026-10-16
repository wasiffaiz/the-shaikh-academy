import React, { useMemo, useState } from 'react';
import './court-lab.css';

// Tactic descriptions are from the Tennis Singles and Doubles Tactics Playbook.
const TACTICS = [
  {
    "id": "singles-1",
    "number": 1,
    "format": "Singles",
    "title": "Create space, then attack",
    "description": "Use deep crosscourt shots to move the opponent. When the court opens, attack the space rather than forcing a winner from a neutral position.",
    "category": "Point construction",
    "diagram": "general"
  },
  {
    "id": "singles-2",
    "number": 2,
    "format": "Singles",
    "title": "Crosscourt rally",
    "description": "Your default neutral pattern. Crosscourt gives more court length, lower net clearance and better recovery. Change direction when the incoming ball is shorter or slower.",
    "category": "Rally patterns",
    "diagram": "cross"
  },
  {
    "id": "singles-3",
    "number": 3,
    "format": "Singles",
    "title": "Forehand domination",
    "description": "Use inside-out forehands to pressure the backhand. When the opponent starts covering that side, change to the inside-in forehand.",
    "category": "Rally patterns",
    "diagram": "general"
  },
  {
    "id": "singles-4",
    "number": 4,
    "format": "Singles",
    "title": "Attack the weaker wing",
    "description": "Identify the weaker side early and make the opponent hit repeated uncomfortable balls there. Build pressure rather than hunting an immediate winner.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-5",
    "number": 5,
    "format": "Singles",
    "title": "Depth before power",
    "description": "A controlled deep ball is often more damaging than a huge short ball. Aim many neutral shots into the back third of the court.",
    "category": "Rally patterns",
    "diagram": "general"
  },
  {
    "id": "singles-6",
    "number": 6,
    "format": "Singles",
    "title": "Use height",
    "description": "Heavy topspin above the opponent's comfortable strike zone is especially useful against aggressive hitters and weaker backhands.",
    "category": "Shot variation",
    "diagram": "general"
  },
  {
    "id": "singles-7",
    "number": 7,
    "format": "Singles",
    "title": "Change pace",
    "description": "Mix heavy topspin, slower high balls, slice and occasional acceleration so rhythm players cannot groove their timing.",
    "category": "Shot variation",
    "diagram": "general"
  },
  {
    "id": "singles-8",
    "number": 8,
    "format": "Singles",
    "title": "Down-the-line change",
    "description": "Change direction when balanced and preferably on a shorter ball: crosscourt - crosscourt - short ball - down the line.",
    "category": "Rally patterns",
    "diagram": "line"
  },
  {
    "id": "singles-9",
    "number": 9,
    "format": "Singles",
    "title": "Short-ball attack",
    "description": "Move forward immediately on a genuinely short ball. Approach deep, preferably toward the weaker side, and continue toward the net.",
    "category": "Attacking",
    "diagram": "general"
  },
  {
    "id": "singles-10",
    "number": 10,
    "format": "Singles",
    "title": "Approach down the line",
    "description": "A down-the-line approach often makes net coverage simpler because you can follow the ball and reduce the opponent's passing angles.",
    "category": "Attacking",
    "diagram": "line"
  },
  {
    "id": "singles-11",
    "number": 11,
    "format": "Singles",
    "title": "Two-shot passing",
    "description": "Against a net player, first make them volley from below net height. Attack the weak volley with the next passing shot.",
    "category": "Attacking",
    "diagram": "general"
  },
  {
    "id": "singles-12",
    "number": 12,
    "format": "Singles",
    "title": "Lob against net players",
    "description": "Use a topspin or defensive lob when the opponent crowds the net. Showing the lob also makes them less aggressive moving forward.",
    "category": "Attacking",
    "diagram": "net"
  },
  {
    "id": "singles-13",
    "number": 13,
    "format": "Singles",
    "title": "Serve +1",
    "description": "Choose your first groundstroke before serving. Example: wide serve - open-court forehand. Treat the serve and next shot as one pattern.",
    "category": "Serve & return",
    "diagram": "serve"
  },
  {
    "id": "singles-14",
    "number": 14,
    "format": "Singles",
    "title": "Body serve",
    "description": "Jam opponents with large swings. A body serve can create a weak blocked return that you can attack.",
    "category": "Serve & return",
    "diagram": "serve"
  },
  {
    "id": "singles-15",
    "number": 15,
    "format": "Singles",
    "title": "First-serve variation",
    "description": "Rotate wide, body and T locations. Variation makes your favourite serve more difficult to anticipate.",
    "category": "Serve & return",
    "diagram": "serve"
  },
  {
    "id": "singles-16",
    "number": 16,
    "format": "Singles",
    "title": "Second-serve strategy",
    "description": "Prioritise spin, placement and reliability. Attack the weaker return while occasionally changing location to prevent anticipation.",
    "category": "Serve & return",
    "diagram": "serve"
  },
  {
    "id": "singles-17",
    "number": 17,
    "format": "Singles",
    "title": "Return strategy",
    "description": "Against a big first serve, shorten the swing and neutralise. Against a second serve, step in and apply pressure.",
    "category": "Serve & return",
    "diagram": "general"
  },
  {
    "id": "singles-18",
    "number": 18,
    "format": "Singles",
    "title": "Deep-middle tactic",
    "description": "When under pressure, play high and deep through the middle. This reduces angles and buys recovery time.",
    "category": "Defending",
    "diagram": "middle"
  },
  {
    "id": "singles-19",
    "number": 19,
    "format": "Singles",
    "title": "Defensive crosscourt",
    "description": "When stretched wide, use a high-margin crosscourt ball rather than forcing a low-percentage down-the-line shot.",
    "category": "Defending",
    "diagram": "cross"
  },
  {
    "id": "singles-20",
    "number": 20,
    "format": "Singles",
    "title": "Reset the point",
    "description": "When badly positioned, defend first: high/deep ball - recover - neutralise - rebuild the point.",
    "category": "Defending",
    "diagram": "general"
  },
  {
    "id": "singles-21",
    "number": 21,
    "format": "Singles",
    "title": "Wrong-footing",
    "description": "When an opponent anticipates the open court, occasionally hit behind them. This is especially useful against fast movers.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-22",
    "number": 22,
    "format": "Singles",
    "title": "Drop shot",
    "description": "Use it when balanced and when the opponent is well behind the baseline. It should exploit positioning, not simply end a tiring rally.",
    "category": "Shot variation",
    "diagram": "general"
  },
  {
    "id": "singles-23",
    "number": 23,
    "format": "Singles",
    "title": "Drop shot + lob",
    "description": "After establishing the drop shot, bring the opponent forward and then lob over them to test forward-backward movement.",
    "category": "Shot variation",
    "diagram": "general"
  },
  {
    "id": "singles-24",
    "number": 24,
    "format": "Singles",
    "title": "Attack movement weaknesses",
    "description": "Test lateral, forward, backward and diagonal movement. Build patterns around whichever direction causes the poorest balance or recovery.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-25",
    "number": 25,
    "format": "Singles",
    "title": "Tall-player tactic",
    "description": "Use low slices, short angles, drop shots and occasional lobs to force repeated vertical movement and uncomfortable low contact points.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-26",
    "number": 26,
    "format": "Singles",
    "title": "Fast defender tactic",
    "description": "Do not simply hit harder. Use angles, controlled aggression, short balls, drop shots and net approaches so they must generate their own pace.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-27",
    "number": 27,
    "format": "Singles",
    "title": "Against hard hitters",
    "description": "Change height, spin and pace. Give fewer clean waist-height balls and avoid turning the match into a pure hitting contest.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "singles-28",
    "number": 28,
    "format": "Singles",
    "title": "Against pushers",
    "description": "Stay patient. Move them, create a genuinely short ball, attack with margin, and finish at net when appropriate.",
    "category": "Opponent analysis",
    "diagram": "general"
  },
  {
    "id": "doubles-1",
    "number": 1,
    "format": "Doubles",
    "title": "First serve + net",
    "description": "Serve, let the partner pressure from the net, and move forward when the return allows. Aim to establish two-player net control.",
    "category": "Serve & return",
    "diagram": "net"
  },
  {
    "id": "doubles-2",
    "number": 2,
    "format": "Doubles",
    "title": "Return crosscourt",
    "description": "The standard high-percentage return keeps the ball away from the opposing net player and makes the server play the next ball.",
    "category": "Serve & return",
    "diagram": "cross"
  },
  {
    "id": "doubles-3",
    "number": 3,
    "format": "Doubles",
    "title": "Return at the server's feet",
    "description": "Against serve-and-volley, keep the return low. A volley below net height often creates an attackable next ball.",
    "category": "Serve & return",
    "diagram": "serve"
  },
  {
    "id": "doubles-4",
    "number": 4,
    "format": "Doubles",
    "title": "Two-up formation",
    "description": "When both partners control the net, you take away time and close large parts of the court.",
    "category": "Positioning",
    "diagram": "general"
  },
  {
    "id": "doubles-5",
    "number": 5,
    "format": "Doubles",
    "title": "Protect the middle",
    "description": "Middle balls cause confusion and reduce angles. Shift together so the gap between partners does not become an easy target.",
    "category": "Positioning",
    "diagram": "middle"
  },
  {
    "id": "doubles-6",
    "number": 6,
    "format": "Doubles",
    "title": "Poaching",
    "description": "The net player crosses decisively to intercept the return. Read preparation and coordinate with the server.",
    "category": "Net play",
    "diagram": "net"
  },
  {
    "id": "doubles-7",
    "number": 7,
    "format": "Doubles",
    "title": "Fake poach",
    "description": "Show movement toward the middle and then stay. This can force the returner to change direction or make an error.",
    "category": "Net play",
    "diagram": "net"
  },
  {
    "id": "doubles-8",
    "number": 8,
    "format": "Doubles",
    "title": "Planned poach",
    "description": "Agree before the point that the net player will cross. The server then covers the vacated side.",
    "category": "Net play",
    "diagram": "net"
  },
  {
    "id": "doubles-9",
    "number": 9,
    "format": "Doubles",
    "title": "Australian formation",
    "description": "Server and net player begin on the same side to disrupt a returner who is repeatedly succeeding crosscourt.",
    "category": "Formations",
    "diagram": "general"
  },
  {
    "id": "doubles-10",
    "number": 10,
    "format": "Doubles",
    "title": "I-formation",
    "description": "The net player crouches near the middle and moves to the planned side after the serve, hiding the team's intended coverage.",
    "category": "Formations",
    "diagram": "general"
  },
  {
    "id": "doubles-11",
    "number": 11,
    "format": "Doubles",
    "title": "Lob return",
    "description": "Use the lob when the opposing net player is aggressively poaching. Even occasional successful lobs can push them back.",
    "category": "Serve & return",
    "diagram": "general"
  },
  {
    "id": "doubles-12",
    "number": 12,
    "format": "Doubles",
    "title": "Attack the weaker volleyer",
    "description": "Direct repeated balls toward the opponent who is less comfortable at net rather than always playing the stronger baseliner.",
    "category": "Opponent analysis",
    "diagram": "net"
  },
  {
    "id": "doubles-13",
    "number": 13,
    "format": "Doubles",
    "title": "Attack the feet",
    "description": "Low balls at a net player's feet are difficult to attack. Look for the weak upward volley and finish the next ball.",
    "category": "Net play",
    "diagram": "general"
  },
  {
    "id": "doubles-14",
    "number": 14,
    "format": "Doubles",
    "title": "Volley through the middle",
    "description": "On difficult volleys, the middle is a high-percentage target. On easy high volleys, attack an angle or the opponent's feet.",
    "category": "Net play",
    "diagram": "middle"
  },
  {
    "id": "doubles-15",
    "number": 15,
    "format": "Doubles",
    "title": "Overhead communication",
    "description": "Call 'mine' early. Clear communication prevents hesitation and collisions.",
    "category": "Communication",
    "diagram": "general"
  },
  {
    "id": "doubles-16",
    "number": 16,
    "format": "Doubles",
    "title": "Staggered positioning",
    "description": "The player closer to the ball pressures forward while the partner covers slightly deeper, helping against lobs and passes.",
    "category": "Positioning",
    "diagram": "general"
  },
  {
    "id": "doubles-17",
    "number": 17,
    "format": "Doubles",
    "title": "Follow the ball",
    "description": "Both partners shift in the direction of the ball. Imagine a rope connecting you so the team moves together.",
    "category": "Positioning",
    "diagram": "general"
  },
  {
    "id": "doubles-18",
    "number": 18,
    "format": "Doubles",
    "title": "Avoid a giant gap",
    "description": "When one partner is pulled wide, the other shifts toward the middle instead of staying glued to the doubles alley.",
    "category": "Positioning",
    "diagram": "general"
  },
  {
    "id": "doubles-19",
    "number": 19,
    "format": "Doubles",
    "title": "Lob then move forward",
    "description": "A strong offensive lob can reverse court position. As opponents retreat, both partners advance and take the net.",
    "category": "Attacking",
    "diagram": "general"
  },
  {
    "id": "doubles-20",
    "number": 20,
    "format": "Doubles",
    "title": "Defend against two at net",
    "description": "Use low middle balls, shots at the feet, sharp angles and lobs instead of repeatedly trying low-percentage clean passes.",
    "category": "Defending",
    "diagram": "net"
  },
  {
    "id": "doubles-21",
    "number": 21,
    "format": "Doubles",
    "title": "Communicate every point",
    "description": "Discuss serve location and whether the net player will stay, poach or fake. Simple plans create coordinated movement.",
    "category": "Communication",
    "diagram": "general"
  }
];
const CHECKLIST = [
  'Test forehand, backhand, high ball, low ball and movement early.',
  "Identify the opponent's weakest repeatable pattern.",
  'Use your highest-percentage pattern on big points.',
  'Change tactics when evidence says the current plan is failing.',
  'In doubles, agree serve location and net-player movement before important points.'
];

// Court diagrams use a consistent orientation: our team at the bottom, opponents at the top.
// Only tactics with a clear spatial pattern receive diagrams. Others show coaching guidance.
const DIAGRAMS = {
  'singles-1': {kind:'cross',note:'Create width with a deep crosscourt shot before attacking the space.'},
  'singles-2': {kind:'cross',note:'The diagonal offers more length and a lower net crossing point.'},
  'singles-3': {kind:'insideout',note:'Inside-out forehand toward the backhand; inside-in is the variation.'},
  'singles-4': {kind:'cross',note:'Target the identified weaker wing; this example assumes the far right corner.'},
  'singles-5': {kind:'deep',note:'Prioritise a deep landing area over maximum pace.'},
  'singles-8': {kind:'line',note:'Change direction down the line when balanced on a suitable ball.'},
  'singles-9': {kind:'approach',note:'Move forward on the short ball and follow your approach.'},
  'singles-10': {kind:'approach',note:'Follow a down-the-line approach toward the net.'},
  'singles-11': {kind:'feet',note:'Make the net player volley low, then look for the passing opportunity.'},
  'singles-12': {kind:'lob',note:'Lift the ball over an opponent who is crowding the net.'},
  'singles-13': {kind:'serveplus',note:'Wide serve creates a possible open-court first groundstroke.'},
  'singles-14': {kind:'bodyserve',note:'Serve toward the returner’s body to restrict their swing.'},
  'singles-17': {kind:'return',note:'Return deep with control; step in when the serve allows.'},
  'singles-18': {kind:'middle',note:'A high, deep middle ball limits reply angles.'},
  'singles-19': {kind:'cross',note:'A defensive crosscourt reply buys recovery time.'},
  'singles-20': {kind:'middle',note:'Reset with depth, then recover before rebuilding.'},
  'singles-21': {kind:'behind',note:'Hitting behind an opponent can exploit early anticipation.'},
  'singles-22': {kind:'drop',note:'Use the drop shot when the opponent is deep and you are balanced.'},
  'singles-23': {kind:'droplob',note:'Bring the opponent forward, then consider the lob.'},
  'doubles-1': {kind:'servevolley',note:'Serving team: partner starts at net; server advances when appropriate.'},
  'doubles-2': {kind:'doublescross',note:'Crosscourt return avoids the opposing net player.'},
  'doubles-3': {kind:'feet',note:'Direct a low return toward the incoming server’s feet.'},
  'doubles-4': {kind:'twoup',note:'Both partners take the net with coordinated lateral coverage.'},
  'doubles-5': {kind:'middlecover',note:'Both partners shift to protect the middle gap.'},
  'doubles-6': {kind:'poach',note:'The net partner crosses to intercept a predictable return.'},
  'doubles-7': {kind:'fakepoach',note:'The net player feints toward the middle but stays.'},
  'doubles-8': {kind:'poach',note:'Planned crossing: the server must cover the vacated side.'},
  'doubles-9': {kind:'australian',note:'Server and net partner begin on the same half of the court.'},
  'doubles-10': {kind:'iformation',note:'Net player begins crouched near the centre; direction is agreed beforehand.'},
  'doubles-11': {kind:'lob',note:'A lob return can pass over an aggressive opposing net player.'},
  'doubles-12': {kind:'feet',note:'Target the less secure volleyer; this is an illustrative target.'},
  'doubles-13': {kind:'feet',note:'A low ball at the net player’s feet forces an upward volley.'},
  'doubles-14': {kind:'middle',note:'A difficult volley through the middle is often the safer option.'},
  'doubles-16': {kind:'stagger',note:'One partner presses forward; the other covers slightly deeper.'},
  'doubles-17': {kind:'shift',note:'Partners shift together toward the side where the ball travels.'},
  'doubles-18': {kind:'middlecover',note:'When a partner is pulled wide, the other protects the centre.'},
  'doubles-19': {kind:'lobadvance',note:'After a successful offensive lob, both partners move forward.'},
  'doubles-20': {kind:'lob',note:'Against two net players, a lob is one possible response.'},
};

function CourtSketch({ tactic }) {
  const d = DIAGRAMS[tactic.id];
  if (!d) return (
    <div className="tacticsDiagramNote">
      <span>COACHING PRINCIPLE</span>
      <h3>{tactic.title}</h3>
      <p>This tactic depends on the incoming ball, opponent and match situation. A single fixed player-position diagram would be misleading.</p>
      <p>Read the tactical explanation and practise recognising when to apply it.</p>
    </div>
  );
  const doubles = tactic.format === 'Doubles';
  const type = d.kind;
  // Court orientation: our team ALWAYS below the net (y > 175), opponents above (y < 175).
  // The four doubles positions are explicitly specified for each illustrated tactic.
  let ours = doubles ? [[104,305],[218,224]] : [[110,295]];
  let theirs = doubles ? [[216,48],[102,126]] : [[212,55]];
  let paths = [];
  let movements = [];
  const add = (x1,y1,x2,y2) => paths.push(`M${x1} ${y1} L${x2} ${y2}`);

  if (!doubles) {
  if (type==='cross' || type==='insideout' || type==='doublescross') add(110,295,222,48);
  if (type==='line') add(110,295,106,48);
  if (type==='deep') add(110,295,170,50);
  if (type==='middle') add(110,295,160,54);
  if (type==='behind') {theirs=[[226,54]];add(110,295,226,64);movements.push('M226 54 L170 54');}
  if (type==='approach') {ours=[[110,270]];add(110,270,104,50);movements.push('M110 270 L110 203');}
  if (type==='drop') {theirs=[[220,40]];add(110,295,220,154);}
  if (type==='droplob') {theirs=[[220,145]];add(110,295,220,153);paths.push('M110 290 Q160 20 220 45');}
  if (type==='lob') {theirs=[[212,115]];paths.push('M110 295 Q150 10 220 50');}
  if (type==='serveplus') {ours=[[218,310]];theirs=[[215,45]];add(218,310,95,45);paths.push('M125 275 L225 48');}
  if (type==='bodyserve') {ours=[[218,310]];theirs=[[105,55]];add(218,310,112,125);}
  if (type==='return') {ours=[[110,300]];theirs=[[212,45]];add(110,300,212,55);}
  } else {
    // Each entry: [A1, A2], [B1, B2], shot paths, optional movement arrows.
    // Shot paths show illustrative trajectories, not predicted match outcomes.
    const scenarios = {
      'doubles-1': {
        a:[[222,307],[104,226]], b:[[102,48],[222,125]],
        shots:['M222 307 L115 115'], moves:['M222 302 L222 224']
      },
      'doubles-2': {
        a:[[225,305],[100,227]], b:[[105,48],[222,125]],
        shots:['M225 305 L105 62']
      },
      'doubles-3': {
        a:[[225,305],[100,228]], b:[[105,105],[222,125]],
        shots:['M225 305 L105 118'], moves:['M105 55 L105 105']
      },
      'doubles-4': {
        a:[[104,220],[220,220]], b:[[105,48],[222,122]],
        moves:['M104 262 L104 222','M220 262 L220 222']
      },
      'doubles-5': {
        a:[[128,220],[198,224]], b:[[103,48],[223,124]],
        moves:['M88 220 L128 220','M238 224 L198 224']
      },
      'doubles-6': {
        a:[[222,305],[105,228]], b:[[104,48],[223,125]],
        shots:['M104 62 L211 270'], moves:['M105 228 L164 219']
      },
      'doubles-7': {
        a:[[222,305],[105,228]], b:[[104,48],[223,125]],
        shots:['M104 62 L222 265'], moves:['M105 228 L143 220','M143 220 L105 228']
      },
      'doubles-8': {
        a:[[222,305],[105,228]], b:[[104,48],[223,125]],
        shots:['M104 62 L211 270'], moves:['M105 228 L168 218','M222 305 L102 283']
      },
      'doubles-9': {
        a:[[222,307],[204,232]], b:[[104,48],[222,126]],
        shots:['M222 307 L105 120']
      },
      'doubles-10': {
        a:[[222,307],[160,234]], b:[[104,48],[222,126]],
        shots:['M222 307 L105 120'], moves:['M160 234 L112 219']
      },
      'doubles-11': {
        a:[[225,305],[103,229]], b:[[105,48],[222,125]],
        shots:['M225 305 Q258 118 242 55']
      },
      'doubles-12': {
        a:[[225,305],[103,225]], b:[[105,48],[222,126]],
        shots:['M225 305 L222 133']
      },
      'doubles-13': {
        a:[[225,305],[103,225]], b:[[105,48],[222,126]],
        shots:['M225 305 L222 140']
      },
      'doubles-14': {
        a:[[105,221],[223,240]], b:[[105,48],[222,125]],
        shots:['M105 221 L164 122']
      },
      'doubles-16': {
        a:[[103,218],[223,265]], b:[[105,48],[222,125]]
      },
      'doubles-17': {
        a:[[134,228],[242,235]], b:[[105,48],[222,125]],
        shots:['M134 228 L235 70'], moves:['M95 228 L134 228','M203 235 L242 235']
      },
      'doubles-18': {
        a:[[82,250],[156,233]], b:[[105,48],[222,125]],
        moves:['M215 233 L156 233']
      },
      'doubles-19': {
        a:[[104,294],[222,254]], b:[[105,93],[222,108]],
        shots:['M104 294 Q166 62 222 48'], moves:['M104 294 L104 216','M222 254 L222 215']
      },
      'doubles-20': {
        a:[[104,305],[222,267]], b:[[105,120],[222,120]],
        shots:['M104 305 Q170 55 230 43']
      }
    };
    const scenario = scenarios[tactic.id];
    if (scenario) {
      ours = scenario.a;
      theirs = scenario.b;
      paths = scenario.shots || [];
      movements = scenario.moves || [];
    }
  }
  // Guard against accidentally drawing teammates on opposite sides of the net.
  if (doubles && (ours.some(([,y]) => y <= 175) || theirs.some(([,y]) => y >= 175))) {
    console.error('Invalid doubles positions:', tactic.id);
  }
  const player=(p,i,team)=><g key={team+i}><circle cx={p[0]} cy={p[1]} r="10" fill={team==='us'?'#dceba3':'#e8a991'} stroke="#10212b" strokeWidth="2"/><text x={p[0]} y={p[1]+3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#13242b">{team==='us'?'A':'B'}{doubles?i+1:''}</text></g>;
  return <div className="tacticsDiagram">
    <svg className="tacticsSketch" viewBox="0 0 320 365" role="img" aria-label={`${tactic.title}: overhead schematic showing our team at the bottom and opponents at the top`}>
      <defs><marker id="tacticsShotArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#f2bd96" strokeWidth="1.5" /></marker><marker id="tacticsMoveArrow" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="none" stroke="#a9dce5" strokeWidth="1.5" /></marker></defs>
      <rect x="20" y="12" width="280" height="326" rx="4" fill="#264f47" />
      <g stroke="#f5f1e7" strokeWidth="2" fill="none" opacity=".9"><rect x="38" y="22" width="244" height="306"/><path d="M68 22V328 M252 22V328 M68 108H252 M68 242H252 M160 108V242 M38 175H282"/></g>
      {paths.map((path,i)=><path key={'p'+i} d={path} fill="none" stroke="#f2bd96" strokeWidth="3" strokeDasharray="6 6" markerEnd="url(#tacticsShotArrow)" />)}
      {movements.map((path,i)=><path key={'m'+i} d={path} fill="none" stroke="#a9dce5" strokeWidth="2.5" strokeDasharray="4 5" markerEnd="url(#tacticsMoveArrow)" />)}
      {ours.map((p,i)=>player(p,i,'us'))}{theirs.map((p,i)=>player(p,i,'them'))}
      <text x="160" y="356" textAnchor="middle" fontSize="9" letterSpacing="1" fill="#e2e8dd">OUR TEAM ↓  |  OPPONENTS ↑</text>
    </svg>
    <div className="tacticsLegend"><span><i className="tacticsDotUs"/> Our team (A)</span><span><i className="tacticsDotThem"/> Opponents (B)</span></div>
    <div className="tacticsLegend"><span><i className="tacticsLineShot"/> Shot</span><span><i className="tacticsLineMove"/> Movement</span></div>
    <p>{d.note}</p>
    <small>Teaching schematic; positioning varies with the incoming ball and match situation.</small>
  </div>;
}

export default function CourtLab() {
  const [format, setFormat] = useState('Singles');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState([]);
  const categories = useMemo(() => ['All', ...new Set(TACTICS.filter(t => t.format === format).map(t => t.category))], [format]);
  const filtered = useMemo(() => TACTICS.filter(t =>
    t.format === format && (category === 'All' || t.category === category) &&
    (t.title + ' ' + t.description + ' ' + t.category).toLowerCase().includes(search.trim().toLowerCase())
  ), [format, category, search]);
  const current = TACTICS.find(t => t.id === selected) || null;
  const switchFormat = value => { setFormat(value); setCategory('All'); setSelected(null); };
  const toggleSaved = id => setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const openTactic = id => { setSelected(id); };
  const closeTactic = () => setSelected(null);
  return (
    <main className="tacticsPage">
      <section className="tacticsHero">
        <div className="tacticsEyebrow">THE SHAIKH ACADEMY <span>/</span> TENNIS EDUCATION</div>
        <h1>TACTICAL<br /><em>INTELLIGENCE.</em></h1>
        <p className="tacticsTagline">PLAY SMARTER. WIN MORE.</p>
        <p className="tacticsLead">A practical collection of singles and doubles match patterns, positioning principles and decisions — built from our Tennis Tactics Playbook.</p>
        <div className="tacticsMetrics"><span><strong>28</strong> SINGLES TACTICS</span><span><strong>21</strong> DOUBLES TACTICS</span><span><strong>49</strong> TOTAL LESSONS</span></div>
      </section>

      <section className="tacticsBody" aria-label="Tactics library">
        <div className="tacticsTopline"><span>EXPLORE THE PLAYBOOK</span><span>01 — TACTICAL LIBRARY</span></div>
        <div className="tacticsFormatTabs" role="group" aria-label="Match format">
          {['Singles', 'Doubles'].map(f => <button key={f} type="button" className={format === f ? 'active' : ''} aria-pressed={format === f} onClick={() => switchFormat(f)}>{f.toUpperCase()} <span>{f === 'Singles' ? '28' : '21'}</span></button>)}
        </div>
        <p className="tacticsRule">{format === 'Singles' ? 'DEFENSIVE BALL — SURVIVE  /  NEUTRAL BALL — BUILD  /  SHORT BALL — ATTACK  /  EASY BALL — FINISH' : 'PROTECT THE MIDDLE  /  MOVE TOGETHER  /  COMMUNICATE BEFORE THE POINT  /  TAKE THE NET WHEN POSSIBLE'}</p>
        <div className="tacticsTools">
          <label className="tacticsSearch"><span className="srOnly">Search tactics</span><input type="search" placeholder="Search tactics, patterns or situations..." value={search} onChange={e => setSearch(e.target.value)} /></label>
          <label className="tacticsSelect"><span className="srOnly">Filter by category</span><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>)}</select></label>
        </div>
        <div className="tacticsCount">SHOWING {filtered.length} OF {format === 'Singles' ? 28 : 21} TACTICS</div>
        <div className="tacticsGrid">
          {filtered.map(t => <article className="tacticsCard" key={t.id}>
            <div className="tacticsCardTop"><span>{String(t.number).padStart(2, '0')} / {t.format.toUpperCase()}</span><button type="button" className={'tacticsSave ' + (saved.includes(t.id) ? 'isSaved' : '')} onClick={() => toggleSaved(t.id)} aria-label={saved.includes(t.id) ? 'Remove from saved tactics' : 'Save tactic'} aria-pressed={saved.includes(t.id)}>{saved.includes(t.id) ? '★' : '☆'}</button></div>
            <span className="tacticsCategory">{t.category}</span>
            <h2>{t.title}</h2>
            <p>{t.description}</p>
            <button type="button" className="tacticsRead" onClick={() => openTactic(t.id)}>EXPLORE TACTIC <span aria-hidden="true">↗</span></button>
          </article>)}
        </div>
        {!filtered.length && <div className="tacticsEmpty">No tactics match your search. Try another keyword or category.</div>}
      </section>

      <section className="tacticsChecklist">
        <div><span className="tacticsEyebrow">BEFORE YOU COMPETE</span><h2>MATCH-DAY<br /><em>CHECKLIST.</em></h2></div>
        <ol>{CHECKLIST.map(item => <li key={item}>{item}</li>)}</ol>
      </section>
      <footer className="tacticsFooter">THE SHAIKH ACADEMY <span>THREE COACHES. ONE LEGACY.</span></footer>

      {current && <div className="tacticsOverlay" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) closeTactic(); }}>
        <section className="tacticsModal" role="dialog" aria-modal="true" aria-labelledby="tacticsDialogTitle">
          <div className="tacticsModalHeader"><span>{current.format.toUpperCase()} / TACTIC {String(current.number).padStart(2, '0')}</span><button type="button" onClick={closeTactic} aria-label="Close tactic">✕</button></div>
          <div className="tacticsModalContent"><div className="tacticsModalText"><span className="tacticsCategory">{current.category}</span><h2 id="tacticsDialogTitle">{current.title}</h2><h3>THE TACTIC</h3><p>{current.description}</p><h3>ON-COURT FOCUS</h3><p>Practise recognising the match situation described above, then discuss the decision and positioning with your coach.</p><button type="button" className="tacticsModalSave" onClick={() => toggleSaved(current.id)}>{saved.includes(current.id) ? '★ SAVED TO YOUR LIST' : '☆ SAVE THIS TACTIC'}</button></div><div className="tacticsDiagramWrap"><CourtSketch tactic={current} /></div></div>
          <div className="tacticsModalNav"><button type="button" onClick={() => { const arr = TACTICS.filter(t => t.format === current.format); setSelected(arr[(current.number - 2 + arr.length) % arr.length].id); }}>← PREVIOUS</button><button type="button" onClick={() => { const arr = TACTICS.filter(t => t.format === current.format); setSelected(arr[current.number % arr.length].id); }}>NEXT TACTIC →</button></div>
        </section>
      </div>}
    </main>
  );
}





