import React from 'react';
import Footer from '@components/Footer';
import Contact from '@components/Contact';
import PageHeader from '@components/PageHeader';
import NavOne from '@components/NavOne';
import TopBar from '@components/TopBar';

function ContactPage() {
  return (
    <>
      <TopBar />
      <NavOne />
      <PageHeader title="Liên hệ" />
      <Contact />
      <Footer />
    </>
  );
}

export default ContactPage;
