
import './performance-lab.css';

const categories = [
  {
    number: '01',
    name: 'Footwork & Agility',
    description:
      'Develop split-step timing, efficient recovery, lateral movement and change of direction.',
    environment: 'ON COURT'
  },
  {
    number: '02',
    name: 'Strength & Power',
    description:
      'Build lower-body strength, rotational power and explosive movement for tennis.',
    environment: 'GYM'
  },
  {
    number: '03',
    name: 'Shoulder & Arm Conditioning',
    description:
      'Improve shoulder control and progressively strengthen the muscles used in racket sports.',
    environment: 'GYM / HOME'
  },
  {
    number: '04',
    name: 'Core & Balance',
    description:
      'Develop trunk stability, rotational control and balance during dynamic movements.',
    environment: 'GYM / COURT'
  },
  {
    number: '05',
    name: 'Mobility & Recovery',
    description:
      'Support movement quality through dynamic mobility, controlled stretching and recovery.',
    environment: 'ANYWHERE'
  },
  {
    number: '06',
    name: 'Speed & Endurance',
    description:
      'Improve acceleration, repeated-effort capacity and tennis-specific conditioning.',
    environment: 'ON COURT'
  }
];

export default function PerformanceLab() {
  return (
    <main className="performancePage">
      <section className="performanceHero">
        <p className="performanceEyebrow">
          THE SHAIKH ACADEMY
          <span> / </span>
          PLAYER DEVELOPMENT
        </p>

        <h1>
          THE PERFORMANCE
          <br />
          <em>LAB.</em>
        </h1>

        <p className="performanceTagline">
          BUILD THE ATHLETE. ELEVATE THE PLAYER.
        </p>

        <p className="performanceLead">
          Great tennis is built beyond the baseline.
          Explore purposeful gym and on-court training
          designed to develop movement, strength,
          stability and physical confidence.
        </p>

        <div className="performanceMetrics">
          <span>
            <strong>02</strong> TRAINING ENVIRONMENTS
          </span>
          <span>
            <strong>06</strong> PERFORMANCE CATEGORIES
          </span>
          <span>
            <strong>01</strong> COMPLETE PLAYER
          </span>
        </div>
      </section>

      <section className="performanceBody">
        <div className="performanceTopline">
          <span>THE TRAINING FRAMEWORK</span>
          <span>GYM + ON COURT</span>
        </div>

        <div className="performanceIntro">
          <h2>
            TRAIN WITH
            <br />
            <em>PURPOSE.</em>
          </h2>

          <p>
            Every exercise should serve a purpose.
            Our framework connects physical preparation
            with the demands of tennis, helping players
            understand what to train and why.
          </p>
        </div>

        <div className="performanceGrid">
          {categories.map((category) => (
            <article
              className="performanceCard"
              key={category.number}
            >
              <div className="performanceCardTop">
                <span>{category.number} / 06</span>
                <span>{category.environment}</span>
              </div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <div className="performanceCardBottom">
                EXERCISES COMING NEXT
                <span aria-hidden="true">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="performanceStatement">
        <p>THE SHAIKH ACADEMY / OUR APPROACH</p>
        <h2>
          STRONGER MOVEMENT.
          <br />
          <em>SMARTER TENNIS.</em>
        </h2>
        <span>
          Preparation is part of performance.
        </span>
      </section>

      <footer className="performanceFooter">
        <strong>THE SHAIKH ACADEMY</strong>
        <span>THREE COACHES. ONE LEGACY.</span>
      </footer>
    </main>
  );
}
