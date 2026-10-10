
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './programs.css';

const programs = [
  {
    number: '01',
    name: 'PRIVATE COACHING',
    audience: 'ALL PLAYING LEVELS',
    description: 'Personalised one-to-one coaching built around your individual game. Develop stronger technique, better decision-making and confidence through focused training.',
    focus: 'Technique / Tactics / Individual goals'
  },
  {
    number: '02',
    name: 'JUNIOR DEVELOPMENT',
    audience: 'YOUNG PLAYERS',
    description: 'A structured introduction to tennis that develops movement, coordination, technical foundations and a genuine enjoyment of the game.',
    focus: 'Fundamentals / Confidence / Coordination'
  },
  {
    number: '03',
    name: 'ADULT TENNIS',
    audience: 'BEGINNERS TO EXPERIENCED PLAYERS',
    description: 'Whether you are discovering tennis, returning after a break or looking to improve your recreational game, training is adapted to your experience and ambitions.',
    focus: 'Consistency / Skills / Match play'
  },
  {
    number: '04',
    name: 'PERFORMANCE TRAINING',
    audience: 'COMPETITIVE PLAYERS',
    description: 'Purposeful development for players preparing for competitive tennis, combining technical refinement, tactical awareness, movement and match preparation.',
    focus: 'Competition / Strategy / Performance'
  },
  {
    number: '05',
    name: 'GROUP COACHING',
    audience: 'JUNIORS AND ADULTS',
    description: 'Engaging, structured sessions where players improve their skills through cooperative drills, competitive exercises and realistic playing situations.',
    focus: 'Rallies / Teamwork / Competitive situations'
  }
];

const stages = [
  {
    number: '01',
    title: 'PLAYER DISCOVERY',
    subtitle: 'Every journey begins with understanding the player.',
    description: 'Before building a training programme, we explore the player’s background, experience, ambitions and relationship with tennis.',
    assess: [
      'Previous tennis experience and current playing level',
      'Personal goals and competitive ambitions',
      'Training history and weekly availability',
      'Self-identified strengths and challenges',
      'Motivation, confidence and expectations'
    ],
    method: 'A structured conversation and introductory on-court observation.',
    outcome: 'A clear player profile and an understanding of what the player wants to achieve.'
  },
  {
    number: '02',
    title: 'TECHNICAL EVALUATION',
    subtitle: 'Understanding the foundation of every stroke.',
    description: 'We assess how the player produces, controls and adapts their shots in different situations, identifying strengths and technical priorities.',
    assess: [
      'Forehand and backhand technique',
      'Serve mechanics and consistency',
      'Return of serve',
      'Volleys, overheads and net play',
      'Contact point, timing and racket control',
      'Depth, direction, spin and consistency'
    ],
    method: 'Progressive rally exercises, targeted feeds and realistic point situations.',
    outcome: 'A technical development profile identifying the most important skills to improve.'
  },
  {
    number: '03',
    title: 'TACTICAL ASSESSMENT',
    subtitle: 'Developing the intelligence behind the shot.',
    description: 'Good tennis is more than striking the ball. We examine how players read situations, make decisions and construct points.',
    assess: [
      'Court positioning and recovery',
      'Shot selection under pressure',
      'Rally construction and point patterns',
      'Defensive, neutral and attacking situations',
      'Transitioning towards the net',
      'Opponent awareness and match strategy'
    ],
    method: 'Conditioned points, situational exercises and match-play observation.',
    outcome: 'A clearer understanding of tactical strengths and opportunities for smarter decision-making.'
  },
  {
    number: '04',
    title: 'PHYSICAL ASSESSMENT',
    subtitle: 'Movement that supports the modern game.',
    description: 'We observe the physical qualities relevant to tennis and identify movement priorities appropriate to the player’s age, experience and ability.',
    assess: [
      'Footwork and court coverage',
      'Balance and coordination',
      'Acceleration and change of direction',
      'Reaction and recovery movement',
      'Tennis-specific endurance',
      'Movement efficiency during rallies'
    ],
    method: 'Age-appropriate movement activities, court drills and practical observation.',
    outcome: 'A movement development profile to guide appropriate physical training. This is not a medical assessment.'
  },
  {
    number: '05',
    title: 'PERSONALISED TRAINING PLAN',
    subtitle: 'Turning evaluation into purposeful action.',
    description: 'We bring together the findings from the previous stages and create an individual pathway that reflects the player’s priorities, goals and available training time.',
    assess: [
      'Priority technical and tactical areas',
      'Short-term and longer-term goals',
      'Recommended practice activities',
      'Appropriate training frequency',
      'On-court and independent practice',
      'Milestones for future reviews'
    ],
    method: 'A coach-led planning discussion based on the evaluation findings.',
    outcome: 'An agreed development plan with clear priorities and realistic next steps.'
  },
  {
    number: '06',
    title: 'PROGRESS REVIEW',
    subtitle: 'Development is a continuous process.',
    description: 'Player development does not end after the initial evaluation. We revisit goals, observe changes and adapt training as the player progresses.',
    assess: [
      'Progress against individual goals',
      'Changes in technical consistency',
      'Tactical application during match play',
      'Movement and physical development',
      'Player confidence and feedback',
      'New priorities for the next training phase'
    ],
    method: 'Periodic coach feedback, comparable drills and match-play observation.',
    outcome: 'A refreshed development plan reflecting the player’s current needs.'
  }
];

const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.65 }
};

export default function Programs() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <main className="programsPage">
      <header className="programsNav">
        <Link to="/" className="programsBrand">
          <img src="/assets/legacy-logo.png" alt="The Shaikh Academy logo" />
          <span>THE SHAIKH ACADEMY</span>
        </Link>
        <nav>
          <Link to="/">HOME</Link>
          <Link to="/book" className="programsNavBook">
            BOOK A SESSION <ArrowUpRight size={15}/>
          </Link>
        </nav>
      </header>

      <section className="programsHero">
        <motion.div {...fade} className="programsHeroContent">
          <div className="programsEyebrow">
            THE SHAIKH ACADEMY / COACHING
          </div>
          <h1>EVERY PLAYER.<br/><em>A DIFFERENT<br/>JOURNEY.</em></h1>
          <p>
            No two players are the same. Our approach combines
            individual coaching, purposeful development and
            a commitment to helping every player move forward.
          </p>
          <a href="#our-programs" className="programsHeroLink">
            EXPLORE OUR PROGRAMS <ArrowUpRight size={17}/>
          </a>
        </motion.div>
        <span className="programsHeroIndex">IND / GER / GBR</span>
      </section>

      <section id="our-programs" className="programsSection">
        <motion.div {...fade} className="programsSectionIntro">
          <span className="programsEyebrow">01 / COACHING PROGRAMS</span>
          <h2>FIND YOUR<br/><em>GAME.</em></h2>
          <p>
            From first-time players to competitive athletes,
            our coaching pathways are designed around individual
            development and the demands of the game.
          </p>
        </motion.div>

        <div className="programsList">
          {programs.map((program) => (
            <motion.article {...fade} className="programItem" key={program.number}>
              <span className="programNumber">{program.number}</span>
              <div className="programDetails">
                <span className="programAudience">{program.audience}</span>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
                <small>{program.focus}</small>
              </div>
              <Link
                to="/book"
                className="programArrow"
                aria-label={`Enquire about ${program.name}`}
              >
                <ArrowUpRight size={24}/>
              </Link>
            </motion.article>
          ))}
        </div>
        <p className="programsAvailability">
          Program availability and pricing vary by coach and location.
          Please enquire for current options.
        </p>
      </section>

      <section className="methodIntro">
        <motion.div {...fade}>
          <span className="programsEyebrow">02 / OUR DEVELOPMENT PHILOSOPHY</span>
          <h2>ASSESS.<br/>DEVELOP.<br/><em>PROGRESS.</em></h2>
          <p>
            Great coaching begins with understanding the player.
            Our proposed six-stage development framework connects
            evaluation, purposeful training and continuous feedback.
          </p>
        </motion.div>
      </section>

      <section className="methodSection">
        <div className="methodHeading">
          <span className="programsEyebrow">THE SHAIKH PLAYER DEVELOPMENT METHOD</span>
          <h2>SIX STAGES.<br/><em>ONE PURPOSE.</em></h2>
          <p>
            Explore each stage to understand what we assess,
            how we approach it and what the player takes away.
          </p>
        </div>

        <div className="methodStages">
          {stages.map((stage, index) => {
            const open = activeStage === index;

            return (
              <div className={'methodStage ' + (open ? 'isOpen' : '')} key={stage.number}>
                <button
                  className="methodStageTrigger"
                  onClick={() => setActiveStage(open ? -1 : index)}
                  aria-expanded={open}
                  aria-controls={`stage-${index}`}
                >
                  <span className="methodStageNumber">{stage.number}</span>
                  <span className="methodStageTitle">{stage.title}</span>
                  {open ? <Minus size={23}/> : <Plus size={23}/>}
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`stage-${index}`}
                      key="content"
                      initial={{height:0,opacity:0}}
                      animate={{height:'auto',opacity:1}}
                      exit={{height:0,opacity:0}}
                      transition={{duration:0.35}}
                      className="methodStageBody"
                    >
                      <div className="methodStageContent">
                        <div className="methodStageDescription">
                          <h3>{stage.subtitle}</h3>
                          <p>{stage.description}</p>
                          <div className="methodOutcome">
                            <span>PLAYER OUTCOME</span>
                            <p>{stage.outcome}</p>
                          </div>
                        </div>

                        <div className="methodStageAssessment">
                          <span className="methodMiniLabel">WHAT WE ASSESS / DEVELOP</span>
                          <ul>
                            {stage.assess.map(item => <li key={item}>{item}</li>)}
                          </ul>
                          <span className="methodMiniLabel">OUR APPROACH</span>
                          <p>{stage.method}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="programsCountries">
        <span>INDIA</span>
        <span>GERMANY</span>
        <span>UNITED KINGDOM</span>
      </section>

      <section className="programsCTA">
        <motion.div {...fade}>
          <span className="programsEyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
          <h2>LET'S BUILD<br/><em>YOUR GAME.</em></h2>
          <p>
            Discover a coaching pathway designed around your
            playing level, ambitions and individual goals.
          </p>
          <Link to="/book">
            BOOK A SESSION <ArrowUpRight size={18}/>
          </Link>
        </motion.div>
      </section>

      <footer className="programsFooter">
        <Link to="/"><ArrowLeft size={16}/> BACK TO HOME</Link>
        <span>© 2026 THE SHAIKH ACADEMY</span>
      </footer>
    </main>
  );
}
