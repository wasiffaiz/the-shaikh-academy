import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const scrollToSection = () => {
      const section = document.getElementById(
        location.hash.slice(1)
      );

      if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const frame = requestAnimationFrame(scrollToSection);
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  const links = [
    { label: 'Legacy', href: '/#legacy' },
    { label: 'Coaches', href: '/#coaches' },
    { label: 'Programs', href: '/programs' },
    { label: 'Tactics', href: '/court-lab' },
    { label: 'Exercises', href: '/exercises' },
    { label: 'Grand Slams', href: '/grand-slams' },
    { label: 'Philosophy', href: '/#philosophy' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <header
        className="nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: 'rgba(3,14,30,.96)',
          backdropFilter: 'blur(12px)'
        }}
      >
        <Link className="brand" to="/">
          <img
            src="/assets/legacy-logo.png"
            alt="The Shaikh Academy Legacy mark"
          />
          <span>THE SHAIKH ACADEMY</span>
        </Link>

        <nav>
          {links.map(link => (
            <Link key={link.label} to={link.href}>
              {link.label}
            </Link>
          ))}

          <Link to="/book" className="navBookButton">
            BOOK A SESSION <ArrowUpRight size={16} />
          </Link>
        </nav>

        <button
          type="button"
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileNav"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.href}
                  onClick={() => {
                    setOpen(false);

                    if (
                      link.href.includes('#') &&
                      window.location.pathname === '/' &&
                      window.location.hash === link.href.slice(1)
                    ) {
                      document
                        .getElementById(link.href.split('#')[1])
                        ?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start'
                        });
                    }
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <Link
              to="/book"
              className="mobileBookButton"
              onClick={() => setOpen(false)}
            >
              BOOK A SESSION <ArrowUpRight size={17} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

