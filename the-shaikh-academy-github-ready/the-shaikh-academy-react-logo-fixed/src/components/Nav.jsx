
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'Legacy', href: '#legacy' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Programs', href: '/programs' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Contact', href: '#contact' }
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
          {links.map(link =>
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            )
          )}

          <Link to="/book" className="navBookButton">
            BOOK A SESSION <ArrowUpRight size={16}/>
          </Link>
        </nav>

        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X/> : <Menu/>}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobileNav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.href.startsWith('/') ? (
                  <Link to={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ) : (
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                )}
              </motion.div>
            ))}

            <Link
              to="/book"
              className="mobileBookButton"
              onClick={() => setOpen(false)}
            >
              BOOK A SESSION <ArrowUpRight size={17}/>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
