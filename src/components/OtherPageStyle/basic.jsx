import React from 'react';
import Footer from '../home/footer/Footer';
import Back from '../back/Back';

const Basic = ({ name, title, cover, children,className }) => {
  return (
    <section className="about">
      <Back name={name} title={title} cover={cover} />
      <section className="contact mt-5 mb-5">
        <div className="container">
          <div className={`contact__form border p-4 shadow ${className}`}>
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Basic;
