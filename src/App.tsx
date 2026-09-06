import { useState, useEffect } from 'react';
import { BpmnViewer } from './components/BpmnViewer';
import { FishboneDiagram } from './components/FishboneDiagram';
import { VsmDiagram } from './components/VsmDiagram';
import { BpmnReference } from './components/BpmnReference';
import { VsmReference } from './components/VsmReference';
import { LucidVsmCaseStudy } from './components/LucidVsmCaseStudy';
import './App.css';

type ActiveTab = 'reference' | 'vsm-reference' | 'bpmn' | 'fishbone' | 'vsm' | 'lucid-vsm';

// Map hash → tab (deep-link: #vsm, #lucid-vsm, #bpmn, #fishbone, dst.)
const hashToTab: Record<string, ActiveTab> = {
  '#vsm-reference': 'vsm-reference',
  '#reference': 'reference',
  '#vsm': 'vsm',
  '#lucid-vsm': 'lucid-vsm',
  '#fishbone': 'fishbone',
  '#bpmn': 'bpmn',
};

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const h = window.location.hash as string;
    return (hashToTab[h] ?? 'vsm-reference') as ActiveTab;
  });

  // Sinkronkan hash saat tab berubah (biar bisa di-share / di-bookmark)
  useEffect(() => {
    const tabToHash: Record<ActiveTab, string> = {
      'vsm-reference': '#vsm-reference',
      reference: '#reference',
      vsm: '#vsm',
      'lucid-vsm': '#lucid-vsm',
      fishbone: '#fishbone',
      bpmn: '#bpmn',
    };
    window.history.replaceState(null, '', tabToHash[activeTab]);
  }, [activeTab]);

  return (
    <main className="app-main">
      {/* Navigation Tab Bar */}
      <nav className="main-tabs">
        <button
          className={`tab-btn ${activeTab === 'vsm-reference' ? 'active' : ''}`}
          onClick={() => setActiveTab('vsm-reference')}
        >
          📋 Notasi &amp; Simbol VSM
        </button>
        <button
          className={`tab-btn ${activeTab === 'reference' ? 'active' : ''}`}
          onClick={() => setActiveTab('reference')}
        >
          📖 Notasi &amp; Simbol BPMN
        </button>
        <button
          className={`tab-btn ${activeTab === 'vsm' ? 'active' : ''}`}
          onClick={() => setActiveTab('vsm')}
        >
          📈 VSM Kasus QuickBite
        </button>
        <button
          className={`tab-btn ${activeTab === 'lucid-vsm' ? 'active' : ''}`}
          onClick={() => setActiveTab('lucid-vsm')}
        >
          🪑 Case VSM Lucidchart (Pull System)
        </button>
        <button
          className={`tab-btn ${activeTab === 'fishbone' ? 'active' : ''}`}
          onClick={() => setActiveTab('fishbone')}
        >
          🐟 Fishbone Diagram (6M Ishikawa)
        </button>
        <button
          className={`tab-btn ${activeTab === 'bpmn' ? 'active' : ''}`}
          onClick={() => setActiveTab('bpmn')}
        >
          📊 BPMN 2.0 Process (QuickBite)
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'vsm-reference' && <VsmReference />}
        {activeTab === 'reference' && <BpmnReference />}
        {activeTab === 'vsm' && <VsmDiagram />}
        {activeTab === 'lucid-vsm' && <LucidVsmCaseStudy />}
        {activeTab === 'fishbone' && <FishboneDiagram />}
        {activeTab === 'bpmn' && <BpmnViewer />}
      </div>
    </main>
  );
}

export default App;
