
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './book.css';

const coachByCountry = {
  India: 'Jakeer Hussain',
  Germany: 'Mohammad',
  'United Kingdom': 'Wasif Faiz'
};

const programs = [
  'Private Coaching',
  'Junior Development',
  'Adult Tennis',
  'Performance Training',
  'Group Coaching'
];

const reveal = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65 }
};

export default function Book() {
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    data.coach = coachByCountry[data.country] || '';

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Unable to submit booking request.');
      }

      form.reset();
      setCountry('');
      setStatus('success');
    } catch (error) {
      setErrorMessage('Your request could not be sent. Please email info@theshaikhacademy.com.');
      setStatus('error');
    }
  }

  return (
    <main className="bookPage">
      <header className="bookNav">
        <Link to="/" className="bookBrand">
          <img src="/assets/legacy-logo.png" alt="The Shaikh Academy" />
          <span>THE SHAIKH ACADEMY</span>
        </Link>
        <nav>
          <Link to="/programs">PROGRAMS</Link>
          <Link to="/">HOME</Link>
        </nav>
      </header>

      <section className="bookHero">
        <motion.div {...reveal}>
          <span className="bookEyebrow">THE SHAIKH ACADEMY / BOOKINGS</span>
          <h1>YOUR JOURNEY.<br/><em>STARTS HERE.</em></h1>
          <p>
            Every player has a different starting point.
            Tell us about your game, your goals and the
            coaching experience you're looking for.
          </p>
        </motion.div>
      </section>

      <section className="bookContent">
        <motion.div {...reveal} className="bookIntro">
          <span className="bookEyebrow">01 / BOOKING REQUEST</span>
          <h2>LET'S GET<br/><em>ON COURT.</em></h2>
          <p>
            Complete the form and our team will review your
            request, check availability and contact you
            about the next steps.
          </p>

          <div className="bookSteps">
            <div><span>01</span> CHOOSE YOUR LOCATION</div>
            <div><span>02</span> TELL US ABOUT YOUR GAME</div>
            <div><span>03</span> REQUEST YOUR SESSION</div>
          </div>

          <p className="bookNote">
            Submitting this form does not confirm a session.
            All coaching requests are subject to availability.
          </p>
        </motion.div>

        <motion.form {...reveal} className="bookForm" onSubmit={handleSubmit}>
          <div className="bookFormHeading">
            <span className="bookEyebrow">PLAYER DETAILS</span>
            <h3>THE FIRST STEP.</h3>
          </div>

          <div className="bookFormGrid">
            <div className="bookField">
              <label htmlFor="bookName">FULL NAME *</label>
              <input id="bookName" name="name" type="text" required maxLength="120" />
            </div>

            <div className="bookField">
              <label htmlFor="bookEmail">EMAIL ADDRESS *</label>
              <input id="bookEmail" name="email" type="email" required />
            </div>

            <div className="bookField">
              <label htmlFor="bookPhone">PHONE / WHATSAPP</label>
              <input id="bookPhone" name="phone" type="tel" />
            </div>

            <div className="bookField">
              <label htmlFor="bookAge">PLAYER AGE</label>
              <input id="bookAge" name="age" type="number" min="3" max="110" />
            </div>

            <div className="bookField">
              <label htmlFor="bookCountry">COUNTRY *</label>
              <select
                id="bookCountry"
                name="country"
                required
                value={country}
                onChange={e => setCountry(e.target.value)}
              >
                <option value="">SELECT COUNTRY</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            <div className="bookField">
              <label htmlFor="bookCoach">PREFERRED COACH</label>
              <input
                id="bookCoach"
                value={coachByCountry[country] || 'SELECT COUNTRY FIRST'}
                readOnly
              />
            </div>

            <div className="bookField">
              <label htmlFor="bookProgram">COACHING PROGRAM *</label>
              <select id="bookProgram" name="program" required defaultValue="">
                <option value="" disabled>SELECT PROGRAM</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div className="bookField">
              <label htmlFor="bookLevel">PLAYING LEVEL *</label>
              <select id="bookLevel" name="level" required defaultValue="">
                <option value="" disabled>SELECT LEVEL</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Competitive</option>
              </select>
            </div>

            <div className="bookField">
              <label htmlFor="bookDate">PREFERRED DATE</label>
              <input
                id="bookDate"
                name="preferredDate"
                type="date"
                min={new Date().toLocaleDateString('en-CA')}
              />
            </div>

            <div className="bookField">
              <label htmlFor="bookTime">PREFERRED TIME</label>
              <select id="bookTime" name="preferredTime" defaultValue="">
                <option value="">FLEXIBLE / NOT SURE</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>

            <div className="bookField bookFull">
              <label htmlFor="bookGoals">YOUR TENNIS GOALS *</label>
              <textarea
                id="bookGoals"
                name="goals"
                rows="4"
                required
                placeholder="Tell us what you'd like to improve or achieve."
              />
            </div>

            <div className="bookField bookFull">
              <label htmlFor="bookMessage">ADDITIONAL INFORMATION</label>
              <textarea
                id="bookMessage"
                name="message"
                rows="3"
                placeholder="Anything else we should know?"
              />
            </div>
          </div>

          <p className="bookPrivacy">
            Your details will be used to respond to your coaching
            enquiry. Please do not include medical information
            or other sensitive personal details in this form.
          </p>

          <button
            className="bookSubmit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'SENDING REQUEST...' : 'SUBMIT BOOKING REQUEST'}
            {status !== 'sending' && <ArrowUpRight size={19}/>}
          </button>

          {status === 'success' && (
            <p className="bookSuccess" role="status">
              <CheckCircle2 size={19}/>
              REQUEST RECEIVED — WE'LL BE IN TOUCH.
            </p>
          )}

          {status === 'error' && (
            <p className="bookError" role="alert">{errorMessage}</p>
          )}
        </motion.form>
      </section>

      <section className="bookBottom">
        <span className="bookEyebrow">DEVELOPMENT WITH PURPOSE</span>
        <h2>MORE THAN<br/><em>A LESSON.</em></h2>
        <p>
          Discover our six-stage player development method,
          designed to connect evaluation, training and progress.
        </p>
        <Link to="/programs">
          EXPLORE OUR METHOD <ArrowUpRight size={17}/>
        </Link>
      </section>

      <footer className="bookFooter">
        <Link to="/"><ArrowLeft size={16}/> BACK TO HOME</Link>
        <span>© 2026 THE SHAIKH ACADEMY</span>
      </footer>
    </main>
  );
}
