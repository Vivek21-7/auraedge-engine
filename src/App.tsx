/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BentoAccordion from './components/BentoAccordion';
import PricingMatrix from './components/PricingMatrix';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import DeployModal from './components/DeployModal';
import DemoModal from './components/DemoModal';

export default function App() {
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <div id="app-root" className="min-h-screen bg-[#0A0A0B] text-[#EDEDED] selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Semantic Layout: Header */}
      <Header onStartDeploying={() => setIsDeployOpen(true)} />

      {/* Semantic Layout: Main */}
      <main id="app-main">
        {/* Hero Section */}
        <Hero 
          onStartDeploying={() => setIsDeployOpen(true)} 
          onWatchDemo={() => setIsDemoOpen(true)} 
        />

        {/* Feature 2: Bento Grid / Accordion with Context Lock */}
        <BentoAccordion />

        {/* Feature 1: Pricing Matrix Section */}
        <PricingMatrix />

        {/* Social Proof & Testimonials Section */}
        <SocialProof />
      </main>

      {/* Semantic Layout: Footer */}
      <Footer />

      {/* Interactive Modals */}
      <DeployModal isOpen={isDeployOpen} onClose={() => setIsDeployOpen(false)} />
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

