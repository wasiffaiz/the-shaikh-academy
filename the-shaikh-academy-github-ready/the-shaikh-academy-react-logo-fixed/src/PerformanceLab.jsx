import { useEffect, useMemo, useState } from 'react';
import { Search, X, ArrowUpRight, ArrowLeft, ArrowRight, Bookmark, Dumbbell, MapPin } from 'lucide-react';
import './performance-lab.css';

const CATEGORIES = [
  {
    "id": "foot",
    "name": "Footwork & Agility",
    "description": "Efficient movement, reactions and recovery.",
    "number": "01"
  },
  {
    "id": "strength",
    "name": "Strength & Power",
    "description": "Force production, landing and explosive movement.",
    "number": "02"
  },
  {
    "id": "arm",
    "name": "Shoulder & Arm Conditioning",
    "description": "Progressive shoulder, forearm and grip capacity.",
    "number": "03"
  },
  {
    "id": "core",
    "name": "Core & Balance",
    "description": "Trunk control and single-leg stability.",
    "number": "04"
  },
  {
    "id": "mobility",
    "name": "Mobility & Recovery",
    "description": "Prepare for training and restore comfortable movement.",
    "number": "05"
  },
  {
    "id": "speed",
    "name": "Speed & Endurance",
    "description": "Acceleration and repeat-effort conditioning.",
    "number": "06"
  }
];
const EXERCISES = [
  {
    "id": "ex01",
    "category": "foot",
    "title": "Split-Step Reaction",
    "environment": "Court",
    "level": "All",
    "equipment": "None",
    "dose": "3 \u00d7 20 sec",
    "rest": "40 sec",
    "purpose": "React promptly as an opponent strikes.",
    "steps": [
      "Start in ready position",
      "Perform a small hop as a partner signals",
      "Land balanced and push toward the indicated side"
    ],
    "cue": "Time the landing to the cue.",
    "caution": "Stay low and avoid excessive jumping."
  },
  {
    "id": "ex02",
    "category": "foot",
    "title": "Lateral Shuffle",
    "environment": "Court",
    "level": "Beginner",
    "equipment": "Cones",
    "dose": "3 \u00d7 20 sec",
    "rest": "40 sec",
    "purpose": "Move efficiently across the baseline.",
    "steps": [
      "Set two cones 3\u20134 m apart",
      "Shuffle between cones while facing the net",
      "Plant outside foot and change direction"
    ],
    "cue": "Keep your hips level.",
    "caution": "Avoid crossing feet during short shuffles."
  },
  {
    "id": "ex03",
    "category": "foot",
    "title": "Crossover Recovery",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "3 \u00d7 6 each side",
    "rest": "45 sec",
    "purpose": "Recover from wide court positions.",
    "steps": [
      "Start near the singles sideline",
      "Push off the outside leg",
      "Crossover toward the centre then settle into ready position"
    ],
    "cue": "Accelerate first, then control the stop.",
    "caution": "Keep steps controlled before adding speed."
  },
  {
    "id": "ex04",
    "category": "foot",
    "title": "Four-Corner Footwork",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "4 \u00d7 30 sec",
    "rest": "60 sec",
    "purpose": "Connect forward, backward and lateral movement.",
    "steps": [
      "Place four markers around your half-court",
      "Move from centre to a called marker",
      "Recover to centre after each touch"
    ],
    "cue": "Recover with balance before the next cue.",
    "caution": "Avoid running backward blindly."
  },
  {
    "id": "ex05",
    "category": "foot",
    "title": "Shadow Tennis",
    "environment": "Court",
    "level": "All",
    "equipment": "Racket",
    "dose": "3 \u00d7 60 sec",
    "rest": "45 sec",
    "purpose": "Rehearse efficient movement without ball pressure.",
    "steps": [
      "Begin at baseline centre",
      "Move to a forehand or backhand position",
      "Shadow the swing and recover to ready position"
    ],
    "cue": "Move your feet before the swing.",
    "caution": "Prioritise quality over speed."
  },
  {
    "id": "ex06",
    "category": "foot",
    "title": "Random Cone Reaction",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "4 \u00d7 20 sec",
    "rest": "60 sec",
    "purpose": "Train change of direction in response to a cue.",
    "steps": [
      "Set three cones across the court",
      "Have a partner call a colour or number",
      "Sprint or shuffle to the cue and recover"
    ],
    "cue": "React to the signal rather than guessing.",
    "caution": "Allow full recovery when movement quality drops."
  },
  {
    "id": "ex07",
    "category": "foot",
    "title": "Sprint\u2013Brake\u2013Recover",
    "environment": "Court",
    "level": "Advanced",
    "equipment": "Cones",
    "dose": "4 \u00d7 5 reps",
    "rest": "75 sec",
    "purpose": "Accelerate and decelerate under control.",
    "steps": [
      "Sprint 4\u20136 m to a cone",
      "Lower your centre of mass to stop",
      "Push back toward the start"
    ],
    "cue": "Brake in several controlled steps.",
    "caution": "Start at moderate speed before progressing."
  },
  {
    "id": "ex08",
    "category": "foot",
    "title": "Single-Leg Stick Landing",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "3 \u00d7 5 each side",
    "rest": "45 sec",
    "purpose": "Improve single-leg landing control.",
    "steps": [
      "Stand on one leg",
      "Hop a short distance forward",
      "Land softly and hold for two seconds"
    ],
    "cue": "Knee tracks over the foot.",
    "caution": "Reduce hop distance if unstable."
  },
  {
    "id": "ex09",
    "category": "strength",
    "title": "Goblet Squat",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Dumbbell",
    "dose": "3 \u00d7 8\u201310",
    "rest": "90 sec",
    "purpose": "Develop lower-body strength for court movement.",
    "steps": [
      "Hold one dumbbell at chest",
      "Squat between your hips",
      "Drive through the floor to stand"
    ],
    "cue": "Keep the whole foot grounded.",
    "caution": "Use a pain-free depth and manageable load."
  },
  {
    "id": "ex10",
    "category": "strength",
    "title": "Reverse Lunge",
    "environment": "Gym",
    "level": "All",
    "equipment": "Dumbbell",
    "dose": "3 \u00d7 8 each leg",
    "rest": "75 sec",
    "purpose": "Build single-leg strength and control.",
    "steps": [
      "Stand tall with weights at sides",
      "Step backward into a lunge",
      "Push through front leg to return"
    ],
    "cue": "Control the descent.",
    "caution": "Shorten the range if knee discomfort occurs."
  },
  {
    "id": "ex11",
    "category": "strength",
    "title": "Romanian Deadlift",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "Dumbbell",
    "dose": "3 \u00d7 8",
    "rest": "90 sec",
    "purpose": "Strengthen posterior-chain muscles.",
    "steps": [
      "Hold weights in front of thighs",
      "Hinge hips backward with soft knees",
      "Stand tall by driving hips forward"
    ],
    "cue": "Keep weights close to legs.",
    "caution": "Avoid rounding the lower back."
  },
  {
    "id": "ex12",
    "category": "strength",
    "title": "Step-Up",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Bench",
    "dose": "3 \u00d7 8 each leg",
    "rest": "75 sec",
    "purpose": "Improve single-leg force production.",
    "steps": [
      "Place one foot on a stable low bench",
      "Push through the lead foot to stand",
      "Lower slowly"
    ],
    "cue": "Avoid bouncing off the trailing leg.",
    "caution": "Use a lower step if balance is limited."
  },
  {
    "id": "ex13",
    "category": "strength",
    "title": "Medicine-Ball Rotational Throw",
    "environment": "Gym",
    "level": "Advanced",
    "equipment": "Medicine ball",
    "dose": "3 \u00d7 5 each side",
    "rest": "75 sec",
    "purpose": "Train coordinated rotational power.",
    "steps": [
      "Stand side-on to a safe wall",
      "Rotate hips and torso together",
      "Throw ball into wall and reset"
    ],
    "cue": "Generate force from the ground up.",
    "caution": "Use light weight and clear throwing space."
  },
  {
    "id": "ex14",
    "category": "strength",
    "title": "Lateral Bound and Hold",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "3 \u00d7 5 each side",
    "rest": "60 sec",
    "purpose": "Build lateral power and landing control.",
    "steps": [
      "Push sideways from one leg",
      "Land on opposite leg",
      "Hold balance before repeating"
    ],
    "cue": "Stick each landing before increasing distance.",
    "caution": "Reduce distance if knees cave inward."
  },
  {
    "id": "ex15",
    "category": "strength",
    "title": "Calf Raise",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "None",
    "dose": "3 \u00d7 12\u201315",
    "rest": "45 sec",
    "purpose": "Build ankle and calf capacity.",
    "steps": [
      "Stand near a support",
      "Rise onto the balls of the feet",
      "Lower slowly to full comfortable range"
    ],
    "cue": "Move through a controlled range.",
    "caution": "Avoid bouncing."
  },
  {
    "id": "ex16",
    "category": "strength",
    "title": "Push-Up",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "3 \u00d7 6\u201312",
    "rest": "60 sec",
    "purpose": "Build upper-body pushing strength.",
    "steps": [
      "Place hands slightly wider than shoulders",
      "Lower body as one unit",
      "Press back to start"
    ],
    "cue": "Keep ribs and pelvis aligned.",
    "caution": "Use incline variation if needed."
  },
  {
    "id": "ex17",
    "category": "arm",
    "title": "Band External Rotation",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Resistance band",
    "dose": "2\u20133 \u00d7 12 each side",
    "rest": "45 sec",
    "purpose": "Train rotator-cuff control.",
    "steps": [
      "Anchor a light band at elbow height",
      "Keep elbow near side",
      "Rotate hand outward slowly"
    ],
    "cue": "Move at the shoulder, not the torso.",
    "caution": "Use light resistance and stop if painful."
  },
  {
    "id": "ex18",
    "category": "arm",
    "title": "Band Internal Rotation",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Resistance band",
    "dose": "2 \u00d7 12 each side",
    "rest": "45 sec",
    "purpose": "Strengthen controlled shoulder rotation.",
    "steps": [
      "Anchor band at elbow height",
      "Keep elbow near ribs",
      "Rotate hand inward and return slowly"
    ],
    "cue": "Avoid shrugging.",
    "caution": "Start with low resistance."
  },
  {
    "id": "ex19",
    "category": "arm",
    "title": "Scapular Wall Slide",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "2 \u00d7 10",
    "rest": "40 sec",
    "purpose": "Improve shoulder-blade movement.",
    "steps": [
      "Stand with forearms on wall",
      "Slide arms upward comfortably",
      "Return without arching back"
    ],
    "cue": "Keep ribs gently down.",
    "caution": "Do not force painful overhead range."
  },
  {
    "id": "ex20",
    "category": "arm",
    "title": "Prone Y Raise",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "2 \u00d7 8\u201310",
    "rest": "45 sec",
    "purpose": "Build shoulder-blade endurance.",
    "steps": [
      "Lie face-down on a bench or mat",
      "Lift arms into a Y with thumbs up",
      "Lower slowly"
    ],
    "cue": "Use small controlled lifts.",
    "caution": "Avoid neck tension."
  },
  {
    "id": "ex21",
    "category": "arm",
    "title": "Wrist Extension Eccentric",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "Dumbbell",
    "dose": "2 \u00d7 10 each side",
    "rest": "45 sec",
    "purpose": "Progressively load wrist extensor muscles.",
    "steps": [
      "Support forearm on bench",
      "Assist wrist upward with other hand",
      "Lower weight slowly with working wrist"
    ],
    "cue": "Use a very light load.",
    "caution": "Painful tendon symptoms need individual assessment."
  },
  {
    "id": "ex22",
    "category": "arm",
    "title": "Wrist Pronation\u2013Supination",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Dumbbell",
    "dose": "2 \u00d7 10 each side",
    "rest": "45 sec",
    "purpose": "Develop forearm rotational control.",
    "steps": [
      "Support elbow at 90 degrees",
      "Hold one end of a light dumbbell",
      "Rotate palm up and down slowly"
    ],
    "cue": "Move within comfortable range.",
    "caution": "Keep the weight very light."
  },
  {
    "id": "ex23",
    "category": "arm",
    "title": "Farmer Carry",
    "environment": "Gym",
    "level": "All",
    "equipment": "Dumbbell",
    "dose": "3 \u00d7 25 m",
    "rest": "60 sec",
    "purpose": "Train grip, shoulder stability and posture.",
    "steps": [
      "Hold weights at sides",
      "Walk with steady steps",
      "Maintain upright posture"
    ],
    "cue": "Keep shoulders relaxed and stable.",
    "caution": "Choose a load you can carry without leaning."
  },
  {
    "id": "ex24",
    "category": "arm",
    "title": "Serratus Push-Up Plus",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "2 \u00d7 10",
    "rest": "45 sec",
    "purpose": "Improve shoulder-blade protraction control.",
    "steps": [
      "Take a plank or wall-push position",
      "Keep elbows straight",
      "Push chest away by spreading shoulder blades"
    ],
    "cue": "Small movement is enough.",
    "caution": "Use wall variation if plank is difficult."
  },
  {
    "id": "ex25",
    "category": "core",
    "title": "Front Plank",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "None",
    "dose": "3 \u00d7 20\u201340 sec",
    "rest": "45 sec",
    "purpose": "Build trunk endurance.",
    "steps": [
      "Set elbows below shoulders",
      "Brace gently through torso",
      "Hold a straight body line"
    ],
    "cue": "Breathe throughout.",
    "caution": "Stop before your back begins to sag."
  },
  {
    "id": "ex26",
    "category": "core",
    "title": "Side Plank",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "3 \u00d7 20 sec each",
    "rest": "45 sec",
    "purpose": "Develop lateral trunk stability.",
    "steps": [
      "Support body on forearm",
      "Lift hips off ground",
      "Maintain alignment from shoulder to ankle"
    ],
    "cue": "Keep hips stacked.",
    "caution": "Bend knees for an easier version."
  },
  {
    "id": "ex27",
    "category": "core",
    "title": "Pallof Press",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "Resistance band",
    "dose": "3 \u00d7 10 each side",
    "rest": "45 sec",
    "purpose": "Resist unwanted torso rotation.",
    "steps": [
      "Stand side-on to anchored band",
      "Press hands forward from chest",
      "Hold briefly then return"
    ],
    "cue": "Keep hips facing forward.",
    "caution": "Reduce band tension if torso twists."
  },
  {
    "id": "ex28",
    "category": "core",
    "title": "Dead Bug",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "None",
    "dose": "3 \u00d7 8 each side",
    "rest": "45 sec",
    "purpose": "Coordinate trunk control with limb movement.",
    "steps": [
      "Lie on back with arms and knees raised",
      "Extend opposite arm and leg",
      "Return without arching back"
    ],
    "cue": "Exhale as the limbs extend.",
    "caution": "Shorten reach if back lifts."
  },
  {
    "id": "ex29",
    "category": "core",
    "title": "Bird Dog",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "None",
    "dose": "3 \u00d7 8 each side",
    "rest": "45 sec",
    "purpose": "Train cross-body balance and control.",
    "steps": [
      "Start on hands and knees",
      "Extend opposite arm and leg",
      "Pause then return"
    ],
    "cue": "Keep pelvis still.",
    "caution": "Avoid lifting the leg too high."
  },
  {
    "id": "ex30",
    "category": "core",
    "title": "Single-Leg Balance Reach",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "3 \u00d7 6 each side",
    "rest": "45 sec",
    "purpose": "Improve control during single-leg positions.",
    "steps": [
      "Stand on one leg",
      "Reach free foot lightly forward and sideways",
      "Return to tall balance"
    ],
    "cue": "Move slowly and keep knee aligned.",
    "caution": "Use a wall for support if needed."
  },
  {
    "id": "ex31",
    "category": "core",
    "title": "Suitcase Carry",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "Dumbbell",
    "dose": "3 \u00d7 20 m each",
    "rest": "60 sec",
    "purpose": "Train resistance to side bending.",
    "steps": [
      "Hold a weight in one hand",
      "Walk tall without leaning",
      "Switch hands and repeat"
    ],
    "cue": "Keep shoulders level.",
    "caution": "Start light and avoid excessive sway."
  },
  {
    "id": "ex32",
    "category": "core",
    "title": "Standing Cable Chop",
    "environment": "Gym",
    "level": "Intermediate",
    "equipment": "Cable",
    "dose": "3 \u00d7 10 each side",
    "rest": "60 sec",
    "purpose": "Train controlled trunk rotation.",
    "steps": [
      "Set cable at shoulder height",
      "Pull diagonally across body",
      "Return under control"
    ],
    "cue": "Rotate through hips and upper back.",
    "caution": "Avoid twisting through pain."
  },
  {
    "id": "ex33",
    "category": "mobility",
    "title": "Dynamic Leg Swing",
    "environment": "Court",
    "level": "Beginner",
    "equipment": "None",
    "dose": "2 \u00d7 10 each direction",
    "rest": "20 sec",
    "purpose": "Prepare hips for movement.",
    "steps": [
      "Hold fence for support",
      "Swing one leg forward and backward",
      "Repeat side to side"
    ],
    "cue": "Start small then increase range.",
    "caution": "Do not force end range."
  },
  {
    "id": "ex34",
    "category": "mobility",
    "title": "Walking Lunge with Rotation",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "2 \u00d7 8 steps",
    "rest": "30 sec",
    "purpose": "Combine hip mobility and thoracic rotation.",
    "steps": [
      "Step into a comfortable lunge",
      "Rotate upper body toward front leg",
      "Step forward and alternate"
    ],
    "cue": "Move smoothly without forcing twist.",
    "caution": "Reduce depth if balance is limited."
  },
  {
    "id": "ex35",
    "category": "mobility",
    "title": "Ankle Knee-to-Wall",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "2 \u00d7 10 each side",
    "rest": "20 sec",
    "purpose": "Improve ankle dorsiflexion control.",
    "steps": [
      "Face a wall in split stance",
      "Drive front knee toward wall",
      "Keep heel on floor"
    ],
    "cue": "Track knee over toes.",
    "caution": "Work within a comfortable range."
  },
  {
    "id": "ex36",
    "category": "mobility",
    "title": "Open Book Rotation",
    "environment": "Gym",
    "level": "Beginner",
    "equipment": "None",
    "dose": "2 \u00d7 8 each side",
    "rest": "30 sec",
    "purpose": "Mobilise the upper back.",
    "steps": [
      "Lie on side with knees bent",
      "Open top arm across chest",
      "Follow hand with eyes then return"
    ],
    "cue": "Keep knees stacked.",
    "caution": "Avoid forcing shoulder range."
  },
  {
    "id": "ex37",
    "category": "mobility",
    "title": "World\u2019s Greatest Stretch",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "None",
    "dose": "2 \u00d7 5 each side",
    "rest": "30 sec",
    "purpose": "Prepare hips and upper back.",
    "steps": [
      "Step into a long lunge",
      "Place one hand inside front foot",
      "Rotate other arm upward then reset"
    ],
    "cue": "Move through positions slowly.",
    "caution": "Use blocks or reduce depth if needed."
  },
  {
    "id": "ex38",
    "category": "mobility",
    "title": "Hip Flexor Stretch",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "2 \u00d7 25 sec each",
    "rest": "15 sec",
    "purpose": "Restore comfortable hip extension after training.",
    "steps": [
      "Kneel in half-kneeling position",
      "Gently tuck pelvis",
      "Shift forward slightly until mild stretch"
    ],
    "cue": "Keep torso tall.",
    "caution": "Avoid arching the lower back."
  },
  {
    "id": "ex39",
    "category": "mobility",
    "title": "Calf Stretch",
    "environment": "Gym",
    "level": "All",
    "equipment": "None",
    "dose": "2 \u00d7 25 sec each",
    "rest": "15 sec",
    "purpose": "Maintain comfortable calf range.",
    "steps": [
      "Place hands on wall",
      "Step one leg back",
      "Press back heel down gently"
    ],
    "cue": "Keep back foot pointing forward.",
    "caution": "Stretch gently, not into pain."
  },
  {
    "id": "ex40",
    "category": "mobility",
    "title": "Easy Recovery Walk",
    "environment": "Court",
    "level": "All",
    "equipment": "None",
    "dose": "5\u201310 min",
    "rest": "\u2014",
    "purpose": "Ease down after demanding training.",
    "steps": [
      "Walk at a comfortable pace",
      "Allow breathing to settle",
      "Rehydrate and note how you feel"
    ],
    "cue": "Use this as recovery, not extra conditioning.",
    "caution": "Seek medical help for unusual severe symptoms."
  },
  {
    "id": "ex41",
    "category": "speed",
    "title": "5-Metre Acceleration",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "5 \u00d7 2 reps",
    "rest": "60 sec",
    "purpose": "Develop explosive first steps.",
    "steps": [
      "Mark a 5 m lane",
      "Start from athletic ready position",
      "Sprint through the finish then walk back"
    ],
    "cue": "Drive first steps forward.",
    "caution": "Allow enough rest for quality efforts."
  },
  {
    "id": "ex42",
    "category": "speed",
    "title": "10\u201320 m Sprint",
    "environment": "Court",
    "level": "Advanced",
    "equipment": "Cones",
    "dose": "4 \u00d7 2 reps",
    "rest": "90 sec",
    "purpose": "Develop acceleration beyond first steps.",
    "steps": [
      "Mark a safe 10\u201320 m lane",
      "Accelerate smoothly to finish",
      "Decelerate over extra space"
    ],
    "cue": "Run tall as speed increases.",
    "caution": "Warm up fully and leave braking space."
  },
  {
    "id": "ex43",
    "category": "speed",
    "title": "Court Shuttle Intervals",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "5 \u00d7 20 sec",
    "rest": "60 sec",
    "purpose": "Train repeated change-of-direction effort.",
    "steps": [
      "Set markers 4\u20136 m apart",
      "Shuttle between markers for 20 seconds",
      "Recover fully between bouts"
    ],
    "cue": "Stay controlled at turns.",
    "caution": "Reduce speed if footwork deteriorates."
  },
  {
    "id": "ex44",
    "category": "speed",
    "title": "Baseline\u2013Service Line Repeats",
    "environment": "Court",
    "level": "All",
    "equipment": "None",
    "dose": "4 \u00d7 6 reps",
    "rest": "60 sec",
    "purpose": "Build tennis-specific repeated movement.",
    "steps": [
      "Start at baseline",
      "Run to service line and return",
      "Repeat with steady technique"
    ],
    "cue": "Focus on clean changes of direction.",
    "caution": "Adjust volume to fitness level."
  },
  {
    "id": "ex45",
    "category": "speed",
    "title": "Reactive First-Step Race",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "4 \u00d7 5 cues",
    "rest": "60 sec",
    "purpose": "Connect reaction with acceleration.",
    "steps": [
      "Stand at centre mark",
      "Partner points left or right",
      "Take two explosive steps toward the cue"
    ],
    "cue": "Read cue before moving.",
    "caution": "Keep enough space from other players."
  },
  {
    "id": "ex46",
    "category": "speed",
    "title": "Tempo Court Runs",
    "environment": "Court",
    "level": "Intermediate",
    "equipment": "Cones",
    "dose": "6 \u00d7 30 sec",
    "rest": "60 sec",
    "purpose": "Build controlled aerobic conditioning.",
    "steps": [
      "Choose a clear court running circuit",
      "Run at a repeatable moderate pace",
      "Walk during recovery"
    ],
    "cue": "Keep effort sustainable.",
    "caution": "Avoid maximal sprinting every interval."
  },
  {
    "id": "ex47",
    "category": "speed",
    "title": "Bike Intervals",
    "environment": "Gym",
    "level": "All",
    "equipment": "Bike",
    "dose": "6 \u00d7 45 sec",
    "rest": "75 sec",
    "purpose": "Develop conditioning with lower impact.",
    "steps": [
      "Warm up 5 minutes",
      "Pedal briskly for 45 seconds",
      "Recover easily for 75 seconds"
    ],
    "cue": "Maintain smooth cadence.",
    "caution": "Adjust resistance to current fitness."
  },
  {
    "id": "ex48",
    "category": "speed",
    "title": "Jump Rope Rhythm",
    "environment": "Gym",
    "level": "All",
    "equipment": "Jump rope",
    "dose": "4 \u00d7 30 sec",
    "rest": "45 sec",
    "purpose": "Improve rhythmic lower-leg coordination.",
    "steps": [
      "Use a suitable rope and clear space",
      "Make low relaxed jumps",
      "Keep rhythm with soft landings"
    ],
    "cue": "Stay light and quiet on landing.",
    "caution": "Use marching steps if jumping is unsuitable."
  }
];

const SAVED_KEY = 'shaikh-performance-saved-v1';
const options = (values) => values.map(value => <option key={value} value={value}>{value}</option>);

export default function PerformanceLab() {
  const [category, setCategory] = useState('All');
  const [environment, setEnvironment] = useState('All');
  const [level, setLevel] = useState('All');
  const [equipment, setEquipment] = useState('All');
  const [query, setQuery] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState(() => {
    try {
      const value = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]');
      return Array.isArray(value) ? value.filter(id => typeof id === 'string') : [];
    } catch { return []; }
  });
  const [activeId, setActiveId] = useState(null);
  const active = EXERCISES.find(item => item.id === activeId) || null;
  const activeIndex = EXERCISES.findIndex(item => item.id === activeId);

  useEffect(() => {
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); } catch { /* storage unavailable */ }
  }, [saved]);
  useEffect(() => {
    if (!active) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = event => {
      if (event.key === 'Escape') setActiveId(null);
      if (event.key === 'ArrowRight') setActiveId(EXERCISES[(activeIndex + 1) % EXERCISES.length].id);
      if (event.key === 'ArrowLeft') setActiveId(EXERCISES[(activeIndex - 1 + EXERCISES.length) % EXERCISES.length].id);
    };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKey); };
  }, [activeId, activeIndex, active]);

  const filtered = useMemo(() => EXERCISES.filter(item => {
    const haystack = [item.title, item.purpose, item.equipment, item.environment, item.level, ...item.steps].join(' ').toLowerCase();
    return (category === 'All' || item.category === category)
      && (environment === 'All' || item.environment === environment)
      && (level === 'All' || item.level === level || item.level === 'All')
      && (equipment === 'All' || item.equipment === equipment)
      && (!savedOnly || saved.includes(item.id))
      && haystack.includes(query.trim().toLowerCase());
  }), [category, environment, level, equipment, query, savedOnly, saved]);

  const toggleSaved = id => setSaved(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
  const categoryName = id => CATEGORIES.find(item => item.id === id)?.name || id;
  const resetFilters = () => { setCategory('All'); setEnvironment('All'); setLevel('All'); setEquipment('All'); setQuery(''); setSavedOnly(false); };

  return (
    <main className="performancePage">
      <section className="performanceHero">
        <Link to="/" className="academyBackHome">
          <span aria-hidden="true">←</span>
          BACK TO HOME
        </Link>
        <p className="performanceEyebrow">THE SHAIKH ACADEMY <span>/</span> PLAYER DEVELOPMENT</p>
        <h1>THE PERFORMANCE<br /><em>LAB.</em></h1>
        <p className="performanceTagline">BUILD THE ATHLETE. ELEVATE THE PLAYER.</p>
        <p className="performanceLead">Purposeful gym and on-court training for tennis players. Develop movement, strength, stability and conditioning with clear, practical coaching guidance.</p>
        <div className="performanceMetrics"><span><strong>48</strong> EXERCISES</span><span><strong>06</strong> CATEGORIES</span><span><strong>02</strong> TRAINING ENVIRONMENTS</span></div>
      </section>

      <section className="performanceBody" id="exercise-library">
        <div className="performanceTopline"><span>THE TRAINING FRAMEWORK</span><span>GYM + ON COURT</span></div>
        <div className="performanceIntro"><h2>TRAIN WITH<br /><em>PURPOSE.</em></h2><p>Explore six performance foundations. Choose a category, filter by equipment or difficulty, and open any exercise for coaching instructions and a practical starting dosage.</p></div>
        <div className="performanceCategoryGrid">
          {CATEGORIES.map(item => <button type="button" className={'performanceCategoryCard' + (category === item.id ? ' isActive' : '')} key={item.id} onClick={() => { setCategory(category === item.id ? 'All' : item.id); document.getElementById('performance-exercises')?.scrollIntoView({behavior:'smooth',block:'start'}); }} aria-pressed={category === item.id}>
            <span className="performanceCategoryTop">{item.number} / 06 <ArrowUpRight size={17} /></span><strong>{item.name}</strong><small>{item.description}</small><span className="performanceCategoryCount">{EXERCISES.filter(ex => ex.category === item.id).length} EXERCISES</span>
          </button>)}
        </div>

        <div className="performanceLibrary" id="performance-exercises">
          <div className="performanceTopline"><span>EXPLORE THE EXERCISES</span><span>TRAINING LIBRARY / 48</span></div>
          <div className="performanceFilters">
            <label className="performanceSearch"><Search size={18} aria-hidden="true" /><span className="performanceSrOnly">Search exercises</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search exercises, benefits or equipment…" /></label>
            <label><span className="performanceSrOnly">Training environment</span><select value={environment} onChange={e => setEnvironment(e.target.value)}>{options(['All','Gym','Court'])}</select></label>
            <label><span className="performanceSrOnly">Difficulty level</span><select value={level} onChange={e => setLevel(e.target.value)}>{options(['All','Beginner','Intermediate','Advanced'])}</select></label>
            <label><span className="performanceSrOnly">Equipment</span><select value={equipment} onChange={e => setEquipment(e.target.value)}>{options(['All',...new Set(EXERCISES.map(item => item.equipment))].sort((a,b)=>a==='All'?-1:b==='All'?1:a.localeCompare(b)))}</select></label>
          </div>
          <div className="performanceResults"><span>{filtered.length} EXERCISES FOUND {category !== 'All' ? ' / ' + categoryName(category).toUpperCase() : ''}</span><div><button type="button" className={savedOnly ? 'isSelected' : ''} onClick={() => setSavedOnly(!savedOnly)} aria-pressed={savedOnly}><Bookmark size={14} /> SAVED ({saved.length})</button><button type="button" onClick={resetFilters}>RESET FILTERS</button></div></div>
          {filtered.length ? <div className="performanceExerciseGrid">{filtered.map(item => <article className="performanceExerciseCard" key={item.id}>
            <div className="performanceExerciseTop"><span>{item.id.toUpperCase()} / {categoryName(item.category).toUpperCase()}</span><button type="button" className={'performanceSave' + (saved.includes(item.id) ? ' isSaved' : '')} onClick={() => toggleSaved(item.id)} aria-label={(saved.includes(item.id) ? 'Remove saved ' : 'Save ') + item.title} aria-pressed={saved.includes(item.id)}><Bookmark size={19} fill={saved.includes(item.id) ? 'currentColor' : 'none'} /></button></div>
            <div className="performancePills"><span>{item.environment === 'Gym' ? <Dumbbell size={12} /> : <MapPin size={12} />}{item.environment}</span><span>{item.level}</span></div>
            <h3>{item.title}</h3><p>{item.purpose}</p><div className="performanceDose"><span>STARTING VOLUME</span><strong>{item.dose}</strong></div>
            <button className="performanceRead" type="button" onClick={() => setActiveId(item.id)}>VIEW EXERCISE <ArrowUpRight size={18}/></button>
          </article>)}</div> : <div className="performanceEmpty">No exercises match your filters. <button type="button" onClick={resetFilters}>Show all exercises</button></div>}
        </div>
      </section>

      <section className="performanceStatement"><p>THE SHAIKH ACADEMY / OUR APPROACH</p><h2>STRONGER MOVEMENT.<br /><em>SMARTER TENNIS.</em></h2><span>Build gradually. Prioritise movement quality. Adapt training to your needs.</span></section>
      <footer className="performanceFooter"><strong>THE SHAIKH ACADEMY</strong><span>THREE COACHES. ONE LEGACY.</span></footer>

      {active && <div className="performanceOverlay" onMouseDown={event => { if (event.target === event.currentTarget) setActiveId(null); }}>
        <section className="performanceModal" role="dialog" aria-modal="true" aria-label={active.title}>
          <div className="performanceModalHeader"><span>PERFORMANCE LAB / {active.id.toUpperCase()}</span><button type="button" onClick={() => setActiveId(null)} aria-label="Close exercise details"><X size={23}/></button></div>
          <div className="performanceModalBody"><div className="performanceModalMain"><p className="performanceEyebrow">{categoryName(active.category).toUpperCase()} / {active.environment.toUpperCase()}</p><h2>{active.title}</h2><p className="performanceModalPurpose">{active.purpose}</p><div className="performanceModalStats"><div><span>LEVEL</span><strong>{active.level}</strong></div><div><span>SETS / REPS</span><strong>{active.dose}</strong></div><div><span>REST</span><strong>{active.rest}</strong></div><div><span>EQUIPMENT</span><strong>{active.equipment}</strong></div></div><h3>HOW TO PERFORM</h3><ol>{active.steps.map((step,i) => <li key={i}>{step}</li>)}</ol><h3>COACHING CUE</h3><p>{active.cue}</p><h3>SAFETY & MODIFICATION</h3><p>{active.caution}</p><button className="performanceModalSave" type="button" onClick={() => toggleSaved(active.id)}><Bookmark size={16} fill={saved.includes(active.id) ? 'currentColor' : 'none'}/>{saved.includes(active.id) ? ' SAVED TO MY EXERCISES' : ' SAVE THIS EXERCISE'}</button></div><aside className="performanceModalAside"><span>THE SHAIKH ACADEMY</span><strong>QUALITY BEFORE QUANTITY.</strong><p>The suggested sets and repetitions are general starting points, not an individual programme. Adjust for age, ability, recovery and total tennis load.</p><p>Warm up before intense exercise. Stop if an exercise causes pain; persistent symptoms should be assessed by an appropriate clinician.</p></aside></div>
          <div className="performanceModalNav"><button type="button" onClick={() => setActiveId(EXERCISES[(activeIndex - 1 + EXERCISES.length) % EXERCISES.length].id)}><ArrowLeft size={17}/> PREVIOUS</button><span>{activeIndex + 1} / {EXERCISES.length}</span><button type="button" onClick={() => setActiveId(EXERCISES[(activeIndex + 1) % EXERCISES.length].id)}>NEXT <ArrowRight size={17}/></button></div>
        </section>
      </div>}
    </main>
  );
}

