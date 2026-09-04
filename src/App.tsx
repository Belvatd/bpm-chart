import { useState } from 'react';
import { BpmnViewer } from './components/BpmnViewer';
import { FishboneDiagram } from './components/FishboneDiagram';
import { VsmDiagram } from './components/VsmDiagram';
import { BpmnReference } from './components/BpmnReference';
import { VsmReference } from './components/VsmReference';
import './App.css';

type ActiveTab = 'reference' | 'vsm-reference' | 'bpmn' | 'fishbone' | 'vsm';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('vsm-reference');

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
          📈 Value Stream Mapping (VSM)
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
        {activeTab === 'fishbone' && <FishboneDiagram />}
        {activeTab === 'bpmn' && <BpmnViewer />}
      </div>
    </main>
  );
}

export default App;
