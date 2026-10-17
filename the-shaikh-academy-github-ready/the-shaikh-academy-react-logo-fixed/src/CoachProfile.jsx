import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import Nav from './components/Nav';
import { coaches } from './data/coaches';
import './coach-profile-refinement.css';

export default function CoachProfile() {
  const { id } = useParams();
  const reducedMotion = useReducedMotion();
  const coach = coaches.find((person) => person.id === id);

  if (!coach) {
    return (
      <>
        <Nav />
        <main className="academyCoachMissing">
          <p className="academyCoachKicker">THE SHAIKH ACADEMY</p>
          <h1>Coach not found.</h1>
          <p>This profile may have moved. Meet our coaching team instead.</p>
          <Link to="/#coaches">MEET THE COACHES <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </main>
      </>
    );
  }

  const otherCoaches = coaches.filter((person) => person.id !== coach.id);

  return (
    <>
      <Nav />
      <main className="coachProfilePage academyCoachPage">
        <div className="academyCoachTopline">
          <Link to="/#coaches" className="academyCoachBack">
            <ArrowLeft size={16} aria-hidden="true" /> ALL COACHES
          </Link>
          <span>THE SHAIKH ACADEMY / {coach.number}</span>
        </div>

        <motion.section
          key={coach.id}
          className="coachProfileHero academyCoachHero"
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          aria-labelledby="coach-profile-name"
        >
          <div className="coachProfilePhoto academyCoachPhoto">
            <img src={coach.image} alt={`${coach.name}, ${coach.role} in ${coach.country}`} decoding="async" fetchPriority="high" />
            <span className="academyCoachPhotoIndex" aria-hidden="true">{coach.number} / 03</span>
          </div>

          <div className="coachProfileContent academyCoachContent">
            <p className="academyCoachKicker">{coach.code} <span aria-hidden="true">/</span> {coach.role}</p>
            <h1 id="coach-profile-name">{coach.name}</h1>
            <div className="academyCoachLocation"><MapPin size={15} aria-hidden="true" /> {coach.country}</div>
            <div className="academyCoachRule" />
            <p className="coachProfileQuote">{coach.quote}</p>
            <p className="academyCoachDescription">{coach.copy}</p>
            {coach.background && (
              <div className="academyCoachEducation">
                <span>BACKGROUND</span>
                <strong>{coach.background}</strong>
              </div>
            )}
            <Link to="/book" className="coachProfileBook academyCoachBook">
              BOOK A SESSION <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </motion.section>

        <section className="coachProfileFooter academyCoachFooter" aria-labelledby="explore-coaches-heading">
          <div className="academyCoachFooterIntro">
            <p className="academyCoachKicker">THREE COACHES. ONE LEGACY.</p>
            <h2 id="explore-coaches-heading">Explore our coaches.</h2>
          </div>
          <div className="coachProfileNextLinks academyCoachNextLinks">
            {otherCoaches.map((person) => (
              <Link key={person.id} to={`/coaches/${person.id}`}>
                <span className="academyCoachNextMeta">{person.code} / {person.role}</span>
                <span className="academyCoachNextName">{person.name} <ArrowUpRight size={20} aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}


