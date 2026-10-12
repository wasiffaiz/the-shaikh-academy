
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Nav from './components/Nav';
import { coaches } from './data/coaches';

export default function CoachProfile() {
  const { id } = useParams();

  const coach = coaches.find(c => c.id === id);

  if (!coach) {
    return (
      <>
        <Nav />
        <main style={{ padding: '120px 7vw', minHeight: '70vh' }}>
          <h1>Coach not found</h1>
          <Link to="/">Return to homepage</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />

      <main className="coachProfilePage">
        <motion.section
          key={coach.id}
          className="coachProfileHero"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="coachProfilePhoto">
            <img src={coach.image} alt={coach.name} />
          </div>

          <div className="coachProfileContent">
            <div className="eyebrow">
              {coach.code} / {coach.role}
            </div>

            <h1>{coach.name}</h1>

            <div className="professionalBackground">
              {coach.background}
            </div>

            <p className="coachProfileQuote">
              {coach.quote}
            </p>

            <p>{coach.copy}</p>

            <Link to="/book" className="coachProfileBook">
              BOOK A SESSION <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.section>

        <div className="coachProfileFooter">
          <Link to="/#coaches">
            <ArrowLeft size={16} />
            BACK TO COACHES
          </Link>

          <div className="coachProfileNext">
            <span>EXPLORE OUR COACHES</span>

            <div className="coachProfileNextLinks">
              {coaches
                .filter(c => c.id !== coach.id)
                .map(c => (
                  <Link
                    key={c.id}
                    to={'/coaches/' + c.id}
                  >
                    {c.name}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

