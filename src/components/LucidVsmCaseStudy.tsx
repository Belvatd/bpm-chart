import { useState } from 'react';
import {
  lucidTemplateMeta,
  lucidTemplateProcesses,
  lucidTemplateBuffers,
  lucidTemplateSymbolsUsed,
  type LucidVsmProcessStep,
} from '../data/lucidVsmTemplateData';

export function LucidVsmCaseStudy() {
  const [selectedProcess, setSelectedProcess] = useState<LucidVsmProcessStep | null>(null);
  const [activeSection, setActiveSection] = useState<
    'diagram' | 'processes' | 'pull-system' | 'info-flow' | 'timeline-metrics' | 'symbols'
  >('diagram');
  const [showOriginalImage, setShowOriginalImage] = useState<boolean>(false);

  return (
    <div className="vsm-container">
      {/* Header Kasus */}
      <header className="vsm-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                backgroundColor: '#fef2f2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                letterSpacing: '0.5px',
              }}
            >
              LUCIDCHART OFFICIAL TEMPLATE
            </span>
            <span
              style={{
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                border: '1px solid #bfdbfe',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              PULL SYSTEM
            </span>
          </div>
          <h2>Analisis Studi Kasus VSM Lucidchart: Pabrik Kursi Kustom (Manufacturing Center)</h2>
          <p>
            Bedah anatomi proses, simbol, metrik waktu, dan pemodelan Pull System berdasarkan template resmi{' '}
            <a
              href={lucidTemplateMeta.sourceUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: 600 }}
            >
              Lucidchart Value Stream Map Example
            </a>
            .
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowOriginalImage(!showOriginalImage)}
            style={{
              padding: '7px 14px',
              backgroundColor: showOriginalImage ? '#0f172a' : '#475569',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            }}
          >
            {showOriginalImage ? '👁️ Sembunyikan Tangkapan Asli' : '🖼️ Lihat Tangkapan Asli Template'}
          </button>
          <a
            href={lucidTemplateMeta.sourceUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '7px 14px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            🌐 Buka di Lucidchart ↗
          </a>
        </div>
      </header>

      {/* Gambar Asli Lucidchart (Toggleable) */}
      {showOriginalImage && (
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '10px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <strong style={{ fontSize: '14px', color: '#0f172a' }}>
              📸 Tangkapan Layar Resolusi Tinggi Dokumen Asli Template Lucidchart:
            </strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Template ID: {lucidTemplateMeta.templateId}</span>
          </div>
          <div style={{ overflowX: 'auto', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px' }}>
            <img
              src="/lucid_template_vsm.png"
              alt="Lucidchart Value Stream Map Example"
              style={{ width: '100%', minWidth: '1000px', display: 'block', borderRadius: '6px' }}
            />
          </div>
        </div>
      )}

      {/* KPI Dashboard Card */}
      <div className="vsm-metrics-grid">
        <div className="vsm-kpi-card total">
          <span className="kpi-label">Permintaan Pelanggan (Demand)</span>
          <span className="kpi-value">{lucidTemplateMeta.demand}</span>
          <span className="kpi-sub">Target Takt Time: {lucidTemplateMeta.taktTime}</span>
        </div>

        <div className="vsm-kpi-card waste">
          <span className="kpi-label">Total Production Lead Time</span>
          <span className="kpi-value text-danger">{lucidTemplateMeta.totalLeadTime}</span>
          <span className="kpi-sub">Total waktu tunggu & transit material</span>
        </div>

        <div className="vsm-kpi-card value">
          <span className="kpi-label">Total Cycle Time (VA)</span>
          <span className="kpi-value text-success">{lucidTemplateMeta.totalCycleTime}</span>
          <span className="kpi-badge badge-success">{lucidTemplateMeta.efficiency} Waktu Nilai Tambah</span>
        </div>

        <div className="vsm-kpi-card efficiency">
          <span className="kpi-label">Stasiun Kritis Cacat (Defect &ge; 15%)</span>
          <span className="kpi-value text-danger">4 dari 6 Stasiun</span>
          <span className="kpi-sub">Cut (57%), Inspect (50%), Assemble (26%), Stain (18%)</span>
        </div>
      </div>

      {/* Navigasi Analisis */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #e2e8f0',
          paddingBottom: '8px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => setActiveSection('diagram')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'diagram' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'diagram' ? '#ffffff' : '#334155',
          }}
        >
          🗺️ Peta Diagram Interaktif VSM
        </button>
        <button
          onClick={() => setActiveSection('processes')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'processes' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'processes' ? '#ffffff' : '#334155',
          }}
        >
          ⚙️ 6 Tahapan Proses &amp; Analisis Cacat
        </button>
        <button
          onClick={() => setActiveSection('pull-system')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'pull-system' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'pull-system' ? '#ffffff' : '#334155',
          }}
        >
          🛒 Sistem Tarik: 3 Supermarket &amp; FIFO
        </button>
        <button
          onClick={() => setActiveSection('info-flow')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'info-flow' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'info-flow' ? '#ffffff' : '#334155',
          }}
        >
          📨 Alur Informasi &amp; Jadwal Harian
        </button>
        <button
          onClick={() => setActiveSection('timeline-metrics')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'timeline-metrics' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'timeline-metrics' ? '#ffffff' : '#334155',
          }}
        >
          ⏱️ Analisis Waktu (Takt vs CT vs LT)
        </button>
        <button
          onClick={() => setActiveSection('symbols')}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '13px',
            backgroundColor: activeSection === 'symbols' ? '#0284c7' : '#f1f5f9',
            color: activeSection === 'symbols' ? '#ffffff' : '#334155',
          }}
        >
          📚 15 Simbol Lucidchart Kasus Ini
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. DIAGRAM INTERAKTIF SVG                                 */}
      {/* ========================================================= */}
      {activeSection === 'diagram' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569' }}>
            💡 <strong>Petunjuk Interaksi:</strong> Klik pada kotak proses atau supermarket di diagram bawah untuk melihat detail metrik, rasio cacat, waktu siklus, dan analisis Lean-nya.
          </div>

          <div className="vsm-svg-wrapper">
            <svg viewBox="0 0 1350 780" className="vsm-svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="lucid-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#475569" />
                </marker>
                <marker id="lucid-arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
                </marker>
              </defs>

              {/* Background Grid Subtle */}
              <rect x="0" y="0" width="1350" height="780" fill="#ffffff" />

              {/* ========================================== */}
              {/* LEVEL 1: SUPPLIER & CUSTOMER & CONTROL     */}
              {/* ========================================== */}

              {/* SUPPLIER BOX (Pink Sawtooth Factory) */}
              <g transform="translate(80, 50)">
                <polygon points="10,20 25,5 40,20 55,5 70,20 85,5 100,20 115,5 130,20" fill="#fca5a5" />
                <rect x="10" y="20" width="120" height="50" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="70" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">Supplier</text>
              </g>

              {/* CUSTOMER BOX (Pink Sawtooth Factory) */}
              <g transform="translate(1080, 50)">
                <polygon points="10,20 25,5 40,20 55,5 70,20 85,5 100,20 115,5 130,20" fill="#fca5a5" />
                <rect x="10" y="20" width="120" height="50" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="70" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">Customer</text>
              </g>

              {/* PRODUCTION CONTROL (Center Pink Box) */}
              <g transform="translate(560, 45)">
                <rect x="0" y="0" width="140" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="3" />
                <text x="70" y="27" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Production</text>
                <text x="70" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b">Control</text>
              </g>

              {/* ALUR INFORMASI ATAS */}
              {/* Customer -> Production Control (Daily Sales) */}
              <path d="M 1080 75 L 700 75" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#lucid-arrow)" />
              <rect x="860" y="60" width="90" height="24" fill="#ffffff" stroke="#94a3b8" rx="2" />
              <text x="905" y="76" textAnchor="middle" fontSize="10" fill="#334155">Daily sales</text>

              {/* Customer <-> Production Control (30-60-90 Day Forecast) */}
              <path d="M 1080 100 L 700 100" stroke="#475569" strokeWidth="1.2" strokeDasharray="3 3" />
              <rect x="990" y="90" width="100" height="30" fill="#ffffff" stroke="#cbd5e1" rx="2" />
              <text x="1040" y="104" textAnchor="middle" fontSize="9" fill="#475569">30-60-90 day</text>
              <text x="1040" y="116" textAnchor="middle" fontSize="9" fill="#475569">forecast</text>

              {/* Production Control -> Supplier (Weekly PO) */}
              <path d="M 560 75 L 210 75" stroke="#475569" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#lucid-arrow)" />
              <rect x="360" y="60" width="90" height="24" fill="#ffffff" stroke="#94a3b8" rx="2" />
              <text x="405" y="76" textAnchor="middle" fontSize="10" fill="#334155">Weekly PO</text>

              {/* Production Control -> Supplier (30-60-90 Day Forecast) */}
              <rect x="250" y="90" width="100" height="30" fill="#ffffff" stroke="#cbd5e1" rx="2" />
              <text x="300" y="104" textAnchor="middle" fontSize="9" fill="#475569">30-60-90 day</text>
              <text x="300" y="116" textAnchor="middle" fontSize="9" fill="#475569">forecast</text>

              {/* Production Control -> DAILY SCHEDULE BAR */}
              <path d="M 630 105 L 630 145" stroke="#475569" strokeWidth="2" markerEnd="url(#lucid-arrow)" />
              <rect x="390" y="145" width="480" height="30" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" rx="2" />
              <text x="630" y="165" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">Daily schedule</text>

              {/* Panah Distribusi Daily Schedule ke 4 Proses */}
              <path d="M 440 175 L 230 280" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#lucid-arrow)" />
              <path d="M 540 175 L 430 280" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#lucid-arrow)" />
              <path d="M 720 175 L 630 280" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#lucid-arrow)" />
              <path d="M 820 175 L 830 280" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#lucid-arrow)" />

              {/* LOGISTIK EKSTERNAL KIRI (Supplier -> Warehouse) */}
              <g transform="translate(60, 180)">
                <rect x="0" y="0" width="60" height="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
                <path d="M 45 10 L 60 25 L 60 40 L 45 40 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="15" cy="40" r="6" fill="#334155" />
                <circle cx="50" cy="40" r="6" fill="#334155" />
                <text x="30" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155">Weekly</text>
                <text x="30" y="28" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155">delivery</text>
              </g>
              <path d="M 135 120 L 95 180" stroke="#64748b" strokeWidth="2" markerEnd="url(#lucid-arrow)" />
              <path d="M 95 225 L 75 290" stroke="#64748b" strokeWidth="2" markerEnd="url(#lucid-arrow)" />

              {/* WAREHOUSE (Gudang Kayu Mentah) */}
              <g transform="translate(15, 290)">
                <rect x="0" y="0" width="85" height="55" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" rx="2" />
                <text x="42" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#991b1b">Warehouse</text>
              </g>

              {/* FORKLIFT (Warehouse -> Cut Materials) */}
              <g transform="translate(110, 305)">
                <circle cx="10" cy="22" r="3" fill="#334155" />
                <circle cx="20" cy="22" r="3" fill="#334155" />
                <path d="M 5 20 L 5 12 L 16 12 L 22 20 Z" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.2" />
                <line x1="26" y1="5" x2="26" y2="22" stroke="#334155" strokeWidth="2" />
                <line x1="26" y1="20" x2="34" y2="20" stroke="#334155" strokeWidth="2" />
                <path d="M 35 16 L 50 16" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 2" markerEnd="url(#lucid-arrow)" />
              </g>

              {/* ========================================================================= */}
              {/* 6 STASIUN PROSES + BUFFER (PULL SYSTEM)                                   */}
              {/* ========================================================================= */}

              {/* 1. CUT MATERIALS */}
              <g
                transform="translate(170, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[0])}
              >
                <rect x="0" y="0" width="120" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="60" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Cut materials</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">3</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="120" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 4 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 2.0 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fontWeight="bold" fill="#dc2626">Defect rate: 57</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 2 min(s)</text>
                </g>

                {/* Quality Alert Badge (X) */}
                <circle cx="115" cy="100" r="9" fill="#dc2626" />
                <text x="115" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">✕</text>
              </g>

              {/* RAW MATERIALS SUPERMARKET (24 chairs) */}
              <g
                transform="translate(305, 275)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[0])}
              >
                <path d="M 0 45 L 0 5 L 28 5 L 28 45" fill="none" stroke="#0d9488" strokeWidth="2.5" />
                <line x1="0" y1="18" x2="24" y2="18" stroke="#0d9488" strokeWidth="1.5" />
                <line x1="0" y1="32" x2="24" y2="32" stroke="#0d9488" strokeWidth="1.5" />
                <path d="M 28 25 Q 38 15 38 25 Q 38 35 48 25" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#lucid-arrow)" />
                <text x="14" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f766e">Raw mat</text>
                <text x="14" y="70" textAnchor="middle" fontSize="8" fill="#0f766e">24 chairs</text>
              </g>

              {/* 2. ASSEMBLE CHAIR */}
              <g
                transform="translate(365, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[1])}
              >
                <rect x="0" y="0" width="120" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="60" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Assemble chair</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">2</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="120" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 2 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.8 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fontWeight="bold" fill="#dc2626">Defect rate: 26</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 4 min(s)</text>
                </g>

                {/* Quality Alert Badge (X) */}
                <circle cx="115" cy="100" r="9" fill="#dc2626" />
                <text x="115" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">✕</text>
              </g>

              {/* WIP SUPERMARKET (30 chairs) */}
              <g transform="translate(500, 275)">
                <path d="M 0 45 L 0 5 L 28 5 L 28 45" fill="none" stroke="#0d9488" strokeWidth="2.5" />
                <line x1="0" y1="18" x2="24" y2="18" stroke="#0d9488" strokeWidth="1.5" />
                <line x1="0" y1="32" x2="24" y2="32" stroke="#0d9488" strokeWidth="1.5" />
                <path d="M 28 25 Q 38 15 38 25 Q 38 35 48 25" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#lucid-arrow)" />
                <text x="14" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f766e">WIP</text>
                <text x="14" y="70" textAnchor="middle" fontSize="8" fill="#0f766e">30 chairs</text>
              </g>

              {/* 3. STAIN CHAIR */}
              <g
                transform="translate(560, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[2])}
              >
                <rect x="0" y="0" width="115" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="57" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Stain chair</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">1</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="115" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 0.7 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.4 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fontWeight="bold" fill="#dc2626">Defect rate: 18</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 0.5 min(s)</text>
                </g>

                {/* Quality Alert Badge (X) */}
                <circle cx="110" cy="100" r="9" fill="#dc2626" />
                <text x="110" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">✕</text>
              </g>

              {/* FIFO LANE */}
              <g transform="translate(685, 305)">
                <line x1="0" y1="5" x2="35" y2="5" stroke="#059669" strokeWidth="1.8" />
                <line x1="0" y1="25" x2="35" y2="25" stroke="#059669" strokeWidth="1.8" />
                <polygon points="35,1 42,15 35,29" fill="#059669" />
                <text x="18" y="19" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">FIFO</text>
              </g>

              {/* 4. INSPECT CHAIR */}
              <g
                transform="translate(735, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[3])}
              >
                <rect x="0" y="0" width="115" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="57" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Inspect chair</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">1</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="115" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 1 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.5 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fontWeight="bold" fill="#dc2626">Defect rate: 50</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 6 min(s)</text>
                </g>

                {/* Quality Alert Badge (X) */}
                <circle cx="110" cy="100" r="9" fill="#dc2626" />
                <text x="110" y="104" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">✕</text>
              </g>

              {/* INVENTORY TRIANGLE (2 chairs) */}
              <g transform="translate(860, 290)">
                <polygon points="18,5 4,32 32,32" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="18" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#854d0e">I</text>
                <text x="18" y="44" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#854d0e">2 chairs</text>
                <line x1="34" y1="18" x2="48" y2="18" stroke="#475569" strokeWidth="1.5" markerEnd="url(#lucid-arrow)" />
              </g>

              {/* 5. PACK CHAIR */}
              <g
                transform="translate(920, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[4])}
              >
                <rect x="0" y="0" width="115" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="57" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Pack chair</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">3</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="115" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 0.7 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.5 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fill="#334155">Defect rate: 13</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 6 min(s)</text>
                </g>
              </g>

              {/* FINISHED GOODS SUPERMARKET (30 chairs) */}
              <g transform="translate(1045, 275)">
                <path d="M 0 45 L 0 5 L 28 5 L 28 45" fill="none" stroke="#0d9488" strokeWidth="2.5" />
                <line x1="0" y1="18" x2="24" y2="18" stroke="#0d9488" strokeWidth="1.5" />
                <line x1="0" y1="32" x2="24" y2="32" stroke="#0d9488" strokeWidth="1.5" />
                <path d="M 28 25 Q 38 15 38 25 Q 38 35 48 25" fill="none" stroke="#059669" strokeWidth="1.5" markerEnd="url(#lucid-arrow)" />
                <text x="14" y="60" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0f766e">Finished</text>
                <text x="14" y="70" textAnchor="middle" fontSize="8" fill="#0f766e">30 chairs</text>
              </g>

              {/* 6. SHIP CHAIR */}
              <g
                transform="translate(1105, 280)"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedProcess(lucidTemplateProcesses[5])}
              >
                <rect x="0" y="0" width="115" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="57" y="22" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b">Ship chair</text>
                <circle cx="45" cy="42" r="5" fill="#f1f5f9" stroke="#991b1b" strokeWidth="1.2" />
                <text x="65" y="46" fontSize="10" fontWeight="bold" fill="#991b1b">3</text>

                {/* Data Box */}
                <g transform="translate(0, 65)">
                  <rect x="0" y="0" width="115" height="75" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                  <text x="8" y="16" fontSize="9" fill="#334155">LT: 0.5 hr(s)</text>
                  <text x="8" y="32" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.2 hr(s)</text>
                  <text x="8" y="48" fontSize="9" fill="#334155">Defect rate: 10</text>
                  <text x="8" y="64" fontSize="9" fill="#64748b">C/O time: 1 min(s)</text>
                </g>
              </g>

              {/* LOGISTIK PENGIRIMAN HARIAN (Ship -> Customer) */}
              <g transform="translate(1230, 240)">
                <rect x="0" y="0" width="60" height="40" fill="#e2e8f0" stroke="#64748b" strokeWidth="1.5" rx="2" />
                <path d="M 45 10 L 60 25 L 60 40 L 45 40 Z" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="15" cy="40" r="6" fill="#334155" />
                <circle cx="50" cy="40" r="6" fill="#334155" />
                <text x="30" y="18" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155">Daily</text>
                <text x="30" y="28" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#334155">shipment</text>
              </g>
              <path d="M 1220 310 L 1230 270" stroke="#16a34a" strokeWidth="2" />
              <path d="M 1260 240 L 1180 120" stroke="#16a34a" strokeWidth="2" markerEnd="url(#lucid-arrow-green)" />

              {/* ========================================================================= */}
              {/* TIMELINE LADDER (TANGGA WAKTU LEAN)                                       */}
              {/* ========================================================================= */}
              <g transform="translate(170, 480)">
                {/* Judul Garis Waktu */}
                <text x="0" y="10" fontSize="11" fontWeight="bold" fill="#0f172a">
                  TIMELINE LADDER (LEAD TIME vs CYCLE TIME):
                </text>

                {/* Step 1: Cut Materials */}
                <line x1="0" y1="30" x2="80" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="40" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 4 hr(s)</text>
                <line x1="80" y1="30" x2="80" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="80" y1="60" x2="160" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="120" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 2.0 hr(s)</text>
                <line x1="160" y1="60" x2="160" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                {/* Step 2: Assemble Chair */}
                <line x1="160" y1="30" x2="260" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="210" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 2 hr(s)</text>
                <line x1="260" y1="30" x2="260" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="260" y1="60" x2="340" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="300" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.8 hr(s)</text>
                <line x1="340" y1="60" x2="340" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                {/* Step 3: Stain Chair */}
                <line x1="340" y1="30" x2="430" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="385" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 0.7 hr(s)</text>
                <line x1="430" y1="30" x2="430" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="430" y1="60" x2="510" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="470" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.4 hr(s)</text>
                <line x1="510" y1="60" x2="510" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                {/* Step 4: Inspect Chair */}
                <line x1="510" y1="30" x2="600" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="555" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 1 hr(s)</text>
                <line x1="600" y1="30" x2="600" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="600" y1="60" x2="680" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="640" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.5 hr(s)</text>
                <line x1="680" y1="60" x2="680" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                {/* Step 5: Pack Chair */}
                <line x1="680" y1="30" x2="770" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="725" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 0.7 hr(s)</text>
                <line x1="770" y1="30" x2="770" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="770" y1="60" x2="850" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="810" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.5 hr(s)</text>
                <line x1="850" y1="60" x2="850" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

                {/* Step 6: Ship Chair */}
                <line x1="850" y1="30" x2="940" y2="30" stroke="#dc2626" strokeWidth="2" />
                <text x="895" y="25" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#dc2626">LT: 0.5 hr(s)</text>
                <line x1="940" y1="30" x2="940" y2="60" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="940" y1="60" x2="1010" y2="60" stroke="#16a34a" strokeWidth="2" />
                <text x="975" y="75" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">CT: 0.2 hr(s)</text>

                {/* SUMMARY BOX TOTAL (Rightmost Bottom) */}
                <g transform="translate(1030, 20)">
                  <rect x="0" y="0" width="130" height="60" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" rx="2" />
                  <text x="65" y="22" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b">Total lead time: 9 hr(s)</text>
                  <line x1="0" y1="30" x2="130" y2="30" stroke="#fca5a5" />
                  <text x="65" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#16a34a">Total cycle time: 4.4 hr(s)</text>
                </g>
              </g>

              {/* LEGEND BOX */}
              <g transform="translate(480, 640)">
                <rect x="0" y="0" width="450" height="115" fill="#f8fafc" stroke="#cbd5e1" rx="4" />
                <text x="225" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">Legend (Keterangan Parameter):</text>
                <text x="15" y="40" fontSize="9" fill="#334155"><strong>LT (lead time):</strong> Total waktu yang dibutuhkan untuk menyelesaikan tahapan</text>
                <text x="15" y="55" fontSize="9" fill="#334155"><strong>CT (cycle time):</strong> Waktu riil pengerjaan aktif produk (Value-Added time)</text>
                <text x="15" y="70" fontSize="9" fill="#334155"><strong>Takt time:</strong> Kecepatan produksi yang harus dicapai untuk memenuhi demand</text>
                <text x="15" y="85" fontSize="9" fill="#334155"><strong>Defect rate:</strong> Persentase produk cacat / tidak memenuhi spesifikasi</text>
                <text x="15" y="100" fontSize="9" fill="#334155"><strong>C/O (change over time):</strong> Waktu pergantian setup alat sebelum unit berikutnya</text>

                {/* Defect Badge Legend */}
                <g transform="translate(320, 75)">
                  <circle cx="10" cy="10" r="8" fill="#dc2626" />
                  <text x="10" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">✕</text>
                  <text x="25" y="13" fontSize="9" fontWeight="bold" fill="#dc2626">Defect rate &ge; 15%</text>
                </g>
              </g>
            </svg>
          </div>

          {/* Pop-up / Detail Drawer saat proses diklik */}
          {selectedProcess && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.1rem' }}>
                  {selectedProcess.name}
                </h3>
                <button
                  onClick={() => setSelectedProcess(null)}
                  style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>
              <p style={{ margin: 0, color: '#475569', fontSize: '13px' }}>{selectedProcess.description}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginTop: '4px' }}>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Operator</span>
                  <strong style={{ fontSize: '14px', color: '#0f172a' }}>{selectedProcess.operatorCount} Pekerja</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Cycle Time (CT)</span>
                  <strong style={{ fontSize: '14px', color: '#16a34a' }}>{selectedProcess.cycleTimeHours} Jam</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Lead Time (LT)</span>
                  <strong style={{ fontSize: '14px', color: '#dc2626' }}>{selectedProcess.leadTimeHours} Jam</strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Defect Rate</span>
                  <strong style={{ fontSize: '14px', color: selectedProcess.isDefectAlert ? '#dc2626' : '#16a34a' }}>
                    {selectedProcess.defectRatePercent}% {selectedProcess.isDefectAlert ? '(Kritis ✕)' : '(Aman)'}
                  </strong>
                </div>
                <div style={{ background: '#f8fafc', padding: '8px', borderRadius: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Changeover (C/O)</span>
                  <strong style={{ fontSize: '14px', color: '#0284c7' }}>{selectedProcess.changeoverMinutes} Menit</strong>
                </div>
              </div>

              <div style={{ background: '#fff7ed', borderLeft: '3px solid #ea580c', padding: '8px 12px', borderRadius: '0 4px 4px 0', marginTop: '4px' }}>
                <strong style={{ fontSize: '12px', color: '#c2410c' }}>💡 Analisis Lean:</strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '12.5px', color: '#9a3412' }}>{selectedProcess.analysis}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. ANALISIS 6 TAHAPAN PROSES & CACAT                      */}
      {/* ========================================================= */}
      {activeSection === 'processes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: '#991b1b', fontSize: '1.1rem' }}>
              🚨 Krisis Mutu Pabrik: 4 dari 6 Stasiun Memiliki Cacat &ge; 15%
            </h3>
            <p style={{ margin: 0, color: '#7f1d1d', fontSize: '13px', lineHeight: 1.5 }}>
              Pada template Lucidchart ini, desainer memberikan indikator visual lingkaran merah bertanda <strong>✕</strong> untuk stasiun yang melampaui batas toleransi cacat 15%. Hal ini menunjukkan bahwa sistem memiliki pemborosan kualitas masif (Waste of Defects &amp; Rework) yang memperpanjang Lead Time secara signifikan.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {lucidTemplateProcesses.map((p) => (
              <div
                key={p.id}
                style={{
                  background: '#ffffff',
                  border: p.isDefectAlert ? '1.5px solid #f87171' : '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '16px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  position: 'relative',
                }}
              >
                {p.isDefectAlert && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: '1px solid #fca5a5',
                    }}
                  >
                    ✕ Defect Rate {p.defectRatePercent}% (&ge; 15%)
                  </span>
                )}
                {!p.isDefectAlert && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#f0fdf4',
                      color: '#16a34a',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 700,
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    ✓ Defect Rate {p.defectRatePercent}% (Normal)
                  </span>
                )}

                <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', color: '#0f172a' }}>{p.name}</h4>
                <p style={{ margin: '0 0 12px 0', fontSize: '12.5px', color: '#64748b' }}>{p.description}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '12px' }}>
                  <div style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', fontSize: '11.5px' }}>
                    <span style={{ color: '#64748b' }}>Cycle Time (VA): </span>
                    <strong style={{ color: '#16a34a' }}>{p.cycleTimeHours} Jam</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', fontSize: '11.5px' }}>
                    <span style={{ color: '#64748b' }}>Lead Time: </span>
                    <strong style={{ color: '#dc2626' }}>{p.leadTimeHours} Jam</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', fontSize: '11.5px' }}>
                    <span style={{ color: '#64748b' }}>Operator: </span>
                    <strong style={{ color: '#0f172a' }}>{p.operatorCount} Staf</strong>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '6px 8px', borderRadius: '4px', fontSize: '11.5px' }}>
                    <span style={{ color: '#64748b' }}>Changeover: </span>
                    <strong style={{ color: '#0284c7' }}>{p.changeoverMinutes} Menit</strong>
                  </div>
                </div>

                <div style={{ background: '#f8fafc', borderLeft: '3px solid #0284c7', padding: '8px 10px', borderRadius: '0 4px 4px 0', fontSize: '12px' }}>
                  <strong>Evaluasi Masalah:</strong> {p.analysis}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. SISTEM TARIK (PULL SYSTEM, SUPERMARKET, FIFO)          */}
      {/* ========================================================= */}
      {activeSection === 'pull-system' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 6px 0', color: '#0f766e', fontSize: '1.1rem' }}>
              🛒 Karakteristik Utama Kasus: Lean Pull System (Bukan Sistem Dorong)
            </h3>
            <p style={{ margin: 0, color: '#115e59', fontSize: '13px', lineHeight: 1.5 }}>
              Berbeda dengan pabrik konvensional yang mendorong barang menggunakan Push Arrow belang-belang, template Lucidchart ini mengimplementasikan <strong>Pull System (Sistem Tarik)</strong> murni. Produksi tidak didorong sembarangan, melainkan ditarik melalui 3 Supermarket terkontrol dan 1 FIFO Lane.
            </p>
          </div>

          <div className="table-responsive">
            <table className="bpmn-table">
              <thead>
                <tr>
                  <th style={{ width: '180px' }}>Zona Penyangga</th>
                  <th style={{ width: '120px' }}>Tipe Buffer</th>
                  <th style={{ width: '140px' }}>Kapasitas Batas</th>
                  <th style={{ width: '220px' }}>Lokasi Antar Proses</th>
                  <th>Mekanisme Kerja &amp; Fungsi Lean</th>
                </tr>
              </thead>
              <tbody>
                {lucidTemplateBuffers.map((b) => (
                  <tr key={b.id} className="bpmn-row">
                    <td><strong>{b.name}</strong></td>
                    <td>
                      <span
                        className="category-pill"
                        style={{
                          backgroundColor: b.type === 'supermarket' ? '#ccfbf1' : b.type === 'fifo' ? '#f0fdf4' : '#fef9c3',
                          color: b.type === 'supermarket' ? '#0f766e' : b.type === 'fifo' ? '#16a34a' : '#854d0e',
                          borderColor: 'transparent',
                        }}
                      >
                        {b.type === 'supermarket' ? 'Supermarket' : b.type === 'fifo' ? 'FIFO Lane' : 'Inventory Triangle'}
                      </span>
                    </td>
                    <td><strong style={{ color: '#0f172a' }}>{b.capacity}</strong></td>
                    <td style={{ color: '#475569', fontSize: '12.5px' }}>{b.location}</td>
                    <td style={{ fontSize: '12.5px', color: '#334155' }}>{b.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>📌 Mengapa Memakai Supermarket &amp; FIFO Lane?</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>
              <li><strong>Mencegah Overproduction (Pemborosan Produksi Berlebih):</strong> Stasiun hulu seperti pemotongan bahan tidak boleh memotong kayu melebihi batas 24 kursi di rak supermarket.</li>
              <li><strong>Menyerap Variasi Waktu Siklus (Cycle Time Buffer):</strong> Pemotongan bahan membutuhkan waktu 2 jam, sedangkan perakitan membutuhkan 0.8 jam. Supermarket menjadi peredam perbedaan kecepatan ini tanpa menyebabkan penumpukan liar.</li>
              <li><strong>FIFO Menjaga Kualitas Cat (Stain to Inspect):</strong> Jalur FIFO antara pewarnaan dan inspeksi memastikan kursi yang baru dicat mengering secara teratur sesuai urutan sebelum dicek kualitasnya.</li>
            </ul>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. ALUR INFORMASI & JADWAL HARIAN                         */}
      {/* ========================================================= */}
      {activeSection === 'info-flow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '1.1rem' }}>
              📨 Anatomi Alur Informasi pada Template Lucidchart
            </h3>
            <p style={{ margin: '0 0 12px 0', color: '#475569', fontSize: '13px' }}>
              Template ini membagi alur komunikasi menjadi dua tingkat: level strategis/komersial (peramalan &amp; pesanan) dan level lantai pabrik (jadwal produksi harian):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#2563eb', fontSize: '13px' }}>1. Customer &rarr; Production Control</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '12.5px', color: '#475569' }}>
                  <li><strong>Daily Sales:</strong> Data pesanan kursi riil masuk setiap hari (17 unit/hari).</li>
                  <li><strong>30-60-90 Day Forecast:</strong> Prakiraan kebutuhan jangka menengah (1-3 bulan) untuk merencanakan kapasitas pabrik.</li>
                </ul>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#4f46e5', fontSize: '13px' }}>2. Production Control &rarr; Supplier</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '12.5px', color: '#475569' }}>
                  <li><strong>Weekly PO (Purchase Order):</strong> Pembelian resmi bahan baku kayu yang dikirim seminggu sekali (Weekly Delivery).</li>
                  <li><strong>30-60-90 Day Forecast:</strong> Dibagikan ke supplier agar mereka dapat menyiapkan pasokan kayu gelondongan tepat waktu.</li>
                </ul>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px' }}>
                <strong style={{ color: '#16a34a', fontSize: '13px' }}>3. Production Control &rarr; Floor (Daily Schedule)</strong>
                <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '12.5px', color: '#475569' }}>
                  <li><strong>Daily Schedule Bar:</strong> Jadwal kerja harian didistribusikan langsung ke 4 stasiun utama: <em>Cut Materials, Assemble Chair, Stain Chair,</em> dan <em>Inspect Chair</em>.</li>
                  <li>Stasiun pengemasan (Pack) dan pengiriman (Ship) bekerja murni berdasarkan tarikan supermarket barang jadi.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. ANALISIS METRIK WAKTU (TAKT vs CT vs LT)               */}
      {/* ========================================================= */}
      {activeSection === 'timeline-metrics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.1rem' }}>
              ⏱️ Perhitungan Metrik Waktu Lean (Berdasarkan Data Template)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #0284c7' }}>
                <strong style={{ color: '#0284c7', fontSize: '13px' }}>1. Takt Time (Detak Jantung Permintaan)</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>
                  <strong>Demand:</strong> 17 kursi custom / hari.<br />
                  <strong>Takt Time:</strong> 1 kursi setiap <strong>3.76 jam</strong> kerja.<br />
                  <em>Artinya: Pabrik harus mampu mengeluarkan 1 unit kursi setiap 3.76 jam untuk memenuhi permintaan pasar tanpa kekurangan atau kelebihan stok.</em>
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #16a34a' }}>
                <strong style={{ color: '#16a34a', fontSize: '13px' }}>2. Total Cycle Time / Process Time (VA)</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>
                  Jumlah waktu kerja aktif di 6 stasiun:<br />
                  2.0 (Cut) + 0.8 (Assemble) + 0.4 (Stain) + 0.5 (Inspect) + 0.5 (Pack) + 0.2 (Ship) = <strong>4.4 Jam</strong>.<br />
                  <em>Inilah waktu riil di mana produk benar-benar mengalami transformasi bernilai tambah.</em>
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #dc2626' }}>
                <strong style={{ color: '#dc2626', fontSize: '13px' }}>3. Total Production Lead Time (PLT)</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>
                  Total rentang waktu dari bahan mentah hingga siap dikirim:<br />
                  4.0 + 2.0 + 0.7 + 1.0 + 0.7 + 0.5 = <strong>8.9 Jam (~9.0 Jam)</strong>.<br />
                  <em>Selisih antara 9.0 jam (LT) dan 4.4 jam (CT) adalah 4.6 jam waktu tunggu/antrean di supermarket dan jalur transit.</em>
                </p>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #7c3aed' }}>
                <strong style={{ color: '#7c3aed', fontSize: '13px' }}>4. Process Cycle Efficiency (PCE)</strong>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155' }}>
                  Rumus: (Total Waktu VA / Total Lead Time) &times; 100%<br />
                  PCE = (4.4 Jam / 9.0 Jam) &times; 100% = <strong>48.9%</strong>.<br />
                  <em>Efisiensi siklus 48.9% tergolong sangat baik untuk industri manufaktur furnitur kustom (rata-rata industri konvensional &lt; 20%).</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. KAMUS 15 SIMBOL LUCIDCHART PADA KASUS INI              */}
      {/* ========================================================= */}
      {activeSection === 'symbols' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#475569' }}>
            Berikut adalah 15 simbol standar resmi Lucidchart yang diaplikasikan langsung pada diagram template <strong>Value Stream Map Example</strong>:
          </div>

          <div className="table-responsive">
            <table className="bpmn-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>No</th>
                  <th style={{ width: '180px' }}>Nama Notasi Simbol</th>
                  <th style={{ width: '180px' }}>Nama Resmi di Lucidchart</th>
                  <th style={{ width: '120px' }}>Kategori</th>
                  <th>Peran Khusus pada Kasus Pabrik Kursi Ini</th>
                  <th>Alasan Metodologis Digunakan</th>
                </tr>
              </thead>
              <tbody>
                {lucidTemplateSymbolsUsed.map((s, idx) => (
                  <tr key={idx} className="bpmn-row">
                    <td>{idx + 1}</td>
                    <td><strong>{s.name}</strong></td>
                    <td><code>{s.lucidName}</code></td>
                    <td>
                      <span
                        className="category-pill"
                        style={{
                          backgroundColor:
                            s.category === 'Process'
                              ? '#dbeafe'
                              : s.category === 'Material'
                              ? '#dcfce7'
                              : s.category === 'Information'
                              ? '#f3e8ff'
                              : '#ffedd5',
                          color:
                            s.category === 'Process'
                              ? '#1d4ed8'
                              : s.category === 'Material'
                              ? '#15803d'
                              : s.category === 'Information'
                              ? '#7e22ce'
                              : '#c2410c',
                          borderColor: 'transparent',
                        }}
                      >
                        {s.category}
                      </span>
                    </td>
                    <td style={{ fontSize: '12.5px', color: '#334155' }}>{s.roleInSample}</td>
                    <td style={{ fontSize: '12.5px', color: '#475569' }}>{s.whyUsed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
