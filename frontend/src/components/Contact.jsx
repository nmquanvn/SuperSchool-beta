/* eslint-disable */
import React from 'react';

const Contact = () => {
  return (
    <div>
      <section className="contact-info-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="kipso-icon-manager"></i>
                </div>
                <h2 className="contact-info-one__title">Về chúng tôi</h2>
                <p className="contact-info-one__text">
                  Những chàng trai vui vẻ
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="kipso-icon-placeholder"></i>
                </div>
                <h2 className="contact-info-one__title">Địa chỉ</h2>
                <p className="contact-info-one__text">
                  135b Trần Hưng Đạo, Quận 1<br />
                  TP Hồ Chí Minh
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact-info-one__single">
                <div className="contact-info-one__icon">
                  <i className="kipso-icon-contact"></i>
                </div>
                <h2 className="contact-info-one__title">Thông tin liên hệ</h2>
                <p className="contact-info-one__text">
                  phanthanhvi97@gmail.com <br />
                  0983345305 <br /> &nbsp;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-one">
        <div className="container">
          <h2 className="contact-one__title text-center">
            Hãy liên lạc <br />
            với chúng tôi
          </h2>
          <div className="result text-center"></div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
