import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" aria-label="Footer">
      <div>
        <div className="footer-brand-title">REKAVANTA</div>
        <div>Technology &amp; Product Studio — Build Solutions. Create Possibilities.</div>
      </div>

      <ul className="footer-nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#manifesto">Philosophy</a>
        </li>
        <li>
          <a href="#studio">Studio</a>
        </li>
        <li>
          <a href="#work">Work</a>
        </li>
      </ul>

      <div>
        <div>Contact: hello@rekavanta.com</div>
        <div>&copy; {new Date().getFullYear()} REKAVANTA. All rights reserved.</div>
      </div>
    </footer>
  );
};

