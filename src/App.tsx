import React, { useState } from 'react';
import { ProgressBar } from './components/common/ProgressBar';
import { ContactModal } from './components/common/ContactModal';
import { ProjectModal } from './components/common/ProjectModal';
import { Hero } from './components/sections/Hero';
import { EditorialBar } from './components/sections/EditorialBar';
import { Manifesto } from './components/sections/Manifesto';
import { Studio } from './components/sections/Studio';
import { Capabilities } from './components/sections/Capabilities';
import { Initiatives } from './components/sections/Initiatives';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/sections/Footer';
import { Initiative } from './types';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState('Start a Conversation');
  const [contactDirection, setContactDirection] = useState('');

  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  const handleOpenContact = (subject: string, direction = '') => {
    setContactSubject(subject);
    setContactDirection(direction);
    setIsContactOpen(true);
  };

  const handleSelectInitiative = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
    setIsProjectOpen(true);
  };

  const handleDiscussInitiative = (initiative: Initiative) => {
    setIsProjectOpen(false);
    handleOpenContact(`Inquire: ${initiative.title}`, 'Selected Initiatives');
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Hero Section */}
      <Hero onOpenContact={handleOpenContact} />

      {/* Main Content */}
      <main>
        {/* Editorial Scroll Bar */}
        <EditorialBar />

        {/* Brand Manifesto */}
        <Manifesto />

        {/* Studio & Capabilities Section */}
        <section id="studio" className="studio-section" aria-label="Our Studio and Selected Work">
          <Studio />

          <div className="studio-details-container">
            <Capabilities />
            <Initiatives onSelectInitiative={handleSelectInitiative} />
            <FinalCTA onOpenContact={handleOpenContact} />
          </div>

          <Footer />
        </section>
      </main>

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        subjectTitle={contactSubject}
        defaultDirection={contactDirection}
        onClose={() => setIsContactOpen(false)}
      />

      <ProjectModal
        isOpen={isProjectOpen}
        initiative={selectedInitiative}
        onClose={() => setIsProjectOpen(false)}
        onDiscuss={handleDiscussInitiative}
      />
    </>
  );
}
