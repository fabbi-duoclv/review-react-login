import { useState } from 'react';
import styles from './Header.module.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">
            <img src="/vite.svg" alt="Logo" className={styles.logoImage} />
            <span className={styles.logoText}>React App</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className={styles.menuButton} 
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuIcon}></span>
        </button>

        {/* Navigation menu */}
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={`${styles.navLink} ${styles.active}`}>Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="/about" className={styles.navLink}>About</a>
            </li>
            <li className={styles.navItem}>
              <a href="/services" className={styles.navLink}>Services</a>
            </li>
            <li className={styles.navItem}>
              <a href="/blog" className={styles.navLink}>Blog</a>
            </li>
            <li className={styles.navItem}>
              <a href="/contact" className={styles.navLink}>Contact</a>
            </li>
          </ul>

          <div className={styles.navButtons}>
            <a href="/login" className={styles.loginButton}>Login</a>
            <a href="/signup" className={styles.signupButton}>Sign Up</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 