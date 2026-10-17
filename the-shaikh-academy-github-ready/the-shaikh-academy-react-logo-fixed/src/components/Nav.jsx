import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './nav-refinement.css';

const LINKS = [
  { label: 'Legacy', href: '/#legacy' },
  { label: 'Coaches', href: '/#coaches' },
  { label: 'Programs', href: '/programs' },
  { label: 'Tactics', href: '/court-lab' },
  { label: 'Exercises', href: '/exercises' },
  { label: 'Grand Slams', href: '/grand-slams' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'Contact', href: '/#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!location.hash) return;
    const id = decodeURIComponent(location.hash.slice(1));
    let frame;
    // Wait for the routed homepage to mount before looking for its section.
    frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth', block: 'start'
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, reducedMotion]);

  const isActive = (href) => href.startsWith('/#')
    ? location.pathname === '/' && location.hash === href.slice(1)
    : location.pathname === href;

  const closeAndScroll = (href) => {
    setOpen(false);
    // React Router does not retrigger the hash effect for an identical URL.
    if (href.startsWith('/#') && location.pathname === '/' && location.hash === href.slice(1)) {
      document.getElementById(href.slice(2))?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth', block: 'start'
      });
    }
  };

  return (
    <>
      <header className="nav academyNav">
        <Link className="brand academyBrand" to="/" onClick={() => setOpen(false)} aria-label="The Shaikh Academy — Home">
          <img src="/assets/legacy-logo.png" alt="" width="64" height="48" />
          <span>THE SHAIKH ACADEMY</span>
        </Link>

        <nav className="academyDesktopLinks" aria-label="Main navigation">
          {LINKS.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => closeAndScroll(link.href)}
              aria-current={isActive(link.href) ? 'page' : undefined}>
              {link.label}
            </Link>
          ))}
          <Link to="/book" className="navBookButton" aria-current={isActive('/book') ? 'page' : undefined}>
            BOOK A SESSION <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>

        <button type="button" className="menu academyMenu" onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
          aria-controls="academy-mobile-navigation">
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav id="academy-mobile-navigation" className="mobileNav academyMobileNav"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}>
            {LINKS.map((link, index) => (
              <motion.div key={link.href}
                initial={reducedMotion ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : index * 0.025 }}>
                <Link to={link.href} onClick={() => closeAndScroll(link.href)}
                  aria-current={isActive(link.href) ? 'page' : undefined}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link to="/book" className="mobileBookButton" onClick={() => setOpen(false)}>
              BOOK A SESSION <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}


