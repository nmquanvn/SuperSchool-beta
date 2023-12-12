import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollTop = () => window.scrollTo(0, 0);
  return (
    <div>
      <footer className="site-footer">
        <div className="site-footer__bottom">
          <div className="container">
            <p className="site-footer__copy">
              &copy; Copyright 2021 by <Link to="/">SuperSchool.com</Link>
            </p>
            <div className="site-footer__social">
              <div
                onClick={scrollTop}
                className="scroll-to-target site-footer__scroll-top"
              >
                <i className="kipso-icon-top-arrow"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="search-popup">
        <div className="search-popup__overlay custom-cursor__overlay search-overlay"></div>
        <div className="search-popup__inner">
          <form action="#" className="search-popup__form">
            <input
              type="text"
              name="search"
              placeholder="Gõ vào đây để tìm kiếm..."
            />
            <button type="submit">
              <i className="kipso-icon-magnifying-glass"></i>
            </button>
            <div className="cancel">
              <i className="fas fa-times-circle"></i>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Footer;
