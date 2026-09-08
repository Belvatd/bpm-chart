import { useState } from 'react';
import {
  vsmStepsData,
  vsmSummaryData,
  vsmWorkcellStepsData,
  vsmWorkcellSummaryData,
  type VsmStep,
} from '../data/vsmData';

/**
 * Komponen Push Arrow (Panah Dorong Lean VSM)
 * Menampilkan panah bergaris-garis belang (striped arrow) sesuai standar resmi VSM.
 */
function PushArrow({
  x,
  y,
  width = 26,
  height = 18,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
}) {
  const headWidth = 9;
  const shaftWidth = width - headWidth;
  const shaftHeight = 10;
  const headHeight = height;

  const yShaftTop = y + (headHeight - shaftHeight) / 2;
  const yShaftBottom = yShaftTop + shaftHeight;
  const yHeadTop = y;
  const yHeadBottom = y + headHeight;
  const yCenter = y + headHeight / 2;
  const xHeadBase = x + shaftWidth;
  const xTip = x + width;

  const d = `M ${x},${yShaftTop} L ${xHeadBase},${yShaftTop} L ${xHeadBase},${yHeadTop} L ${xTip},${yCenter} L ${xHeadBase},${yHeadBottom} L ${xHeadBase},${yShaftBottom} L ${x},${yShaftBottom} Z`;

  const stripe1 = x + shaftWidth * 0.25;
  const stripe2 = x + shaftWidth * 0.5;
  const stripe3 = x + shaftWidth * 0.75;

  return (
    <g className="vsm-push-arrow">
      <title>Push Arrow (Panah Dorong): Alur pesanan/material didorong ke tahap berikutnya secara push (tanpa tarikan kanban)</title>
      <path
        d={d}
        fill="#f8fafc"
        stroke="#334155"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1={stripe1} y1={yShaftTop} x2={stripe1} y2={yShaftBottom} stroke="#334155" strokeWidth="1.5" />
      <line x1={stripe2} y1={yShaftTop} x2={stripe2} y2={yShaftBottom} stroke="#334155" strokeWidth="1.5" />
      <line x1={stripe3} y1={yShaftTop} x2={stripe3} y2={yShaftBottom} stroke="#334155" strokeWidth="1.5" />
    </g>
  );
}

/**
 * Komponen Notasi Resmi Workcell VSM (Inverted-U / Meja Tapal Kuda)
 * Sesuai simbol resmi VSM Lucidchart / Lean Enterprise Institute
 */
function VsmWorkcellShape({
  x,
  y,
  width = 460,
  height = 195,
  bridgeHeight = 65,
  legWidth = 125,
  onClick,
  isSelected,
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  bridgeHeight?: number;
  legWidth?: number;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  const bh = bridgeHeight;
  const lw = legWidth;
  const r = 10;

  // Path inverted-U arch dengan sudut membulat rapi
  const d = `
    M ${x + r},${y}
    H ${x + width - r}
    A ${r},${r} 0 0 1 ${x + width},${y + r}
    V ${y + height - r}
    A ${r},${r} 0 0 1 ${x + width - r},${y + height}
    H ${x + width - lw + r}
    A ${r},${r} 0 0 1 ${x + width - lw},${y + height - r}
    V ${y + bh + r}
    A ${r},${r} 0 0 0 ${x + width - lw - r},${y + bh}
    H ${x + lw + r}
    A ${r},${r} 0 0 0 ${x + lw},${y + bh + r}
    V ${y + height - r}
    A ${r},${r} 0 0 1 ${x + lw - r},${y + height}
    H ${x + r}
    A ${r},${r} 0 0 1 ${x},${y + height - r}
    V ${y + r}
    A ${r},${r} 0 0 1 ${x + r},${y}
    Z
  `;

  return (
    <g
      className="vsm-workcell-shape"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <title>Workcell: Notasi resmi sel kerja terintegrasi berbentuk tapal kuda (U-Shape) untuk aliran One-Piece Flow</title>
      <path
        d={d}
        fill={isSelected ? '#eff6ff' : '#ffffff'}
        stroke={isSelected ? '#2563eb' : '#1e293b'}
        strokeWidth={isSelected ? 3 : 2.5}
        filter="url(#vsm-shadow)"
      />
      {/* Label WORKCELL persis seperti gambar standar */}
      <text
        x={x + width / 2}
        y={y + bh * 0.48}
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        fill="#0f172a"
        fontFamily="sans-serif"
      >
        Workcell
      </text>
      <text
        x={x + width / 2}
        y={y + bh * 0.8}
        textAnchor="middle"
        fontSize="11"
        fontWeight="600"
        fill="#2563eb"
      >
        Sel Dapur &amp; Penyajian Terpadu
      </text>
    </g>
  );
}

/**
 * Komponen FIFO Lane (Pipa Alur Satu per Satu Lean VSM)
 */
function FifoLane({
  x,
  y,
  width = 130,
  height = 30,
  label = 'FIFO (Max 3)',
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  label?: string;
}) {
  const headW = 14;
  const shaftW = width - headW;
  const yTop = y;
  const yBot = y + height;
  const yMid = y + height / 2;

  return (
    <g className="vsm-fifo-lane">
      <title>FIFO Lane: Jalur antrean teratur First-In, First-Out (maksimal 3 pesanan digital)</title>
      <line x1={x} y1={yTop} x2={x + shaftW} y2={yTop} stroke="#059669" strokeWidth="2.2" />
      <line x1={x} y1={yBot} x2={x + shaftW} y2={yBot} stroke="#059669" strokeWidth="2.2" />
      <polygon
        points={`${x + shaftW},${yTop - 5} ${x + width},${yMid} ${x + shaftW},${yBot + 5}`}
        fill="#059669"
      />
      <line x1={x + shaftW * 0.33} y1={yTop + 2} x2={x + shaftW * 0.33} y2={yBot - 2} stroke="#a7f3d0" strokeWidth="1.5" />
      <line x1={x + shaftW * 0.66} y1={yTop + 2} x2={x + shaftW * 0.66} y2={yBot - 2} stroke="#a7f3d0" strokeWidth="1.5" />
      <text
        x={x + shaftW / 2}
        y={yMid + 4}
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="bold"
        fill="#047857"
      >
        {label}
      </text>
    </g>
  );
}

export function VsmDiagram() {
  const [vsmMode, setVsmMode] = useState<'current' | 'workcell'>('current');
  const [selectedStep, setSelectedStep] = useState<VsmStep | null>(null);
  const [showKaizen, setShowKaizen] = useState<boolean>(true);
  const [showSupplier, setShowSupplier] = useState<boolean>(true);

  // Koordinat layout VSM SVG
  const svgWidth = 1300;
  const svgHeight = 720;

  // 4 Proses X positions
  const processX = [120, 400, 680, 960];
  const processWidth = 180;
  const processHeight = 110;
  const processY = 270;

  // Tangga waktu (Timeline Ladder)
  const timelineY = 560;
  const stepLadderHeight = 45;

  const activeSummary = vsmMode === 'current' ? vsmSummaryData : vsmWorkcellSummaryData;

  return (
    <div className="vsm-container">
      {/* Segmented Mode Selector: Current State vs Future State Workcell */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        background: '#e2e8f0',
        padding: '5px',
        borderRadius: '10px',
        width: 'fit-content'
      }}>
        <button
          type="button"
          onClick={() => { setVsmMode('current'); setSelectedStep(null); }}
          style={{
            padding: '8px 18px',
            borderRadius: '7px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: vsmMode === 'current' ? '#ffffff' : 'transparent',
            color: vsmMode === 'current' ? '#0f172a' : '#475569',
            boxShadow: vsmMode === 'current' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          📋 Kondisi Awal (Current State: 4 Tahap Terpisah)
        </button>
        <button
          type="button"
          onClick={() => { setVsmMode('workcell'); setSelectedStep(null); }}
          style={{
            padding: '8px 18px',
            borderRadius: '7px',
            border: 'none',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: vsmMode === 'workcell' ? '#1d4ed8' : 'transparent',
            color: vsmMode === 'workcell' ? '#ffffff' : '#475569',
            boxShadow: vsmMode === 'workcell' ? '0 2px 4px rgba(29,78,216,0.3)' : 'none',
            transition: 'all 0.15s ease'
          }}
        >
          ⚡ Versi Workcell (Future State: U-Shape Kitchen Cell)
        </button>
      </div>

      <header className="vsm-header">
        <div>
          <h2>
            {vsmMode === 'current'
              ? 'Value Stream Mapping (VSM) — Current State (As-Is)'
              : 'Value Stream Mapping (VSM) — Future State (To-Be) dengan Workcell'}
          </h2>
          <p>
            {vsmMode === 'current'
              ? 'Pemetaan Alur Nilai & Analisis Pemborosan (Waste) Layanan Tenant QuickBite'
              : 'Penerapan Sel Kerja (U-Shaped Workcell) & One-Piece Flow untuk Eliminasi Antar Nota & Memangkas Lead Time'}
          </p>
        </div>
        <div className="vsm-toggle" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <a
            href="/vsm_quickbite_for_lucidchart.drawio"
            download="vsm_quickbite_for_lucidchart.drawio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: '#ea580c',
              color: '#ffffff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'background-color 0.15s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#c2410c')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ea580c')}
          >
            📥 Export ke Lucidchart (.drawio 2 Halaman)
          </a>
          {vsmMode === 'current' && (
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showSupplier}
                onChange={(e) => setShowSupplier(e.target.checked)}
              />
              <span>🏭 Rantai Pasok Penuh (Supplier, Kasir &amp; Customer)</span>
            </label>
          )}
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showKaizen}
              onChange={(e) => setShowKaizen(e.target.checked)}
            />
            <span>💡 Tampilkan Peluang Kaizen</span>
          </label>
        </div>
      </header>

      {/* KPI Cards Ringkasan Lead Time & Efisiensi */}
      <div className="vsm-metrics-grid">
        <div className="vsm-kpi-card total">
          <span className="kpi-label">Total Lead Time (PLT)</span>
          <span className="kpi-value">{activeSummary.totalLeadTime} Menit</span>
          <span className="kpi-sub">
            {vsmMode === 'current'
              ? 'Waktu keseluruhan dari datang hingga terima makanan'
              : '⚡ Turun 23 Menit (-67.6%) dibanding kondisi awal'}
          </span>
        </div>

        <div className="vsm-kpi-card waste">
          <span className="kpi-label">Total Wait Time (NVA / Waste)</span>
          <span className="kpi-value text-danger">{activeSummary.totalWaitTime} Menit</span>
          <span className="kpi-badge badge-danger">
            {vsmMode === 'current'
              ? `${activeSummary.wasteRatio}% dari Total Waktu`
              : `📉 Hemat 91% (Hanya ${activeSummary.wasteRatio}% dari total)`}
          </span>
        </div>

        <div className="vsm-kpi-card value">
          <span className="kpi-label">Total Process Time (VA)</span>
          <span className="kpi-value text-success">{activeSummary.totalProcessTime} Menit</span>
          <span className="kpi-badge badge-success">
            {vsmMode === 'current'
              ? `${activeSummary.efficiency}% Waktu Nilai Tambah`
              : `${activeSummary.efficiency}% Waktu Nilai Tambah`}
          </span>
        </div>

        <div className="vsm-kpi-card efficiency">
          <span className="kpi-label">Process Cycle Efficiency (PCE)</span>
          <span className="kpi-value text-primary">{activeSummary.efficiency}%</span>
          <span className="kpi-sub">
            {vsmMode === 'current'
              ? 'Target Lean Kelas Dunia: > 25%'
              : '🏆 Mencapai World-Class Lean Level (> 25%)!'}
          </span>
        </div>
      </div>

      {/* Alert Edukatif Notasi Lean VSM */}
      {vsmMode === 'current' ? (
        <div style={{
          background: '#f8fafc',
          border: '1px solid #cbd5e1',
          borderLeft: '4px solid #0284c7',
          borderRadius: '8px',
          padding: '10px 16px',
          marginBottom: '16px',
          fontSize: '0.86rem',
          color: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <strong style={{ color: '#0369a1' }}>📘 Kaidah Baku Notasi Lean VSM (Koreksi Entitas):</strong>
            <span style={{ marginLeft: '6px' }}>
              Ikon <strong>Gerigi Pabrik</strong> khusus mewakili <em>Pihak Eksternal</em> (<strong>Supplier</strong> di kiri atas &amp; <strong>Customer</strong> di kanan atas).
              <strong> Kasir</strong> adalah fungsi internal (<em>Production Control</em>), sehingga wajib digambarkan dengan <strong>Kotak Persegi Panjang</strong>.
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b', background: '#e2e8f0', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
            {showSupplier ? 'Mode: Rantai Pasok Penuh (3 Entitas)' : 'Mode: Simplifikasi Kasir & Customer (2 Entitas)'}
          </span>
        </div>
      ) : (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderLeft: '4px solid #16a34a',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          fontSize: '0.86rem',
          color: '#14532d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <strong style={{ color: '#15803d' }}>⭐ Notasi Resmi Workcell (Tapal Kuda U-Shape):</strong>
            <span style={{ marginLeft: '6px' }}>
              Simbol <strong>Workcell</strong> berbentuk tapal kuda (Inverted-U) mengintegrasikan tahapan <em>Racik Bahan</em>, <em>Goreng di Fryer</em>, dan <em>Pick-up Saji</em> dalam radius 1 langkah.
              Tahap 2 (Antar Nota 5 menit) <strong>dieliminasi 100%</strong> dengan sistem <strong>FIFO Lane / KDS Real-Time</strong>.
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#166534', background: '#dcfce7', padding: '3px 8px', borderRadius: '4px', fontWeight: 600 }}>
            Notasi Sesuai Lucidchart / Lean Standard
          </span>
        </div>
      )}

      {/* Diagram SVG Canvas VSM */}
      <div className="vsm-svg-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="vsm-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Marker Panah Alur */}
            <marker
              id="vsm-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
            </marker>
            <marker
              id="vsm-arrow-blue"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
            </marker>
            <marker
              id="vsm-arrow-green"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#16a34a" />
            </marker>
            {/* Filter Bayangan */}
            <filter id="vsm-shadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
            </filter>
          </defs>

          {vsmMode === 'current' ? (
            <g className="vsm-current-state-group">
              {/* ============================================================ */}
              {/* SECTION 1: ENTITAS EKSTERNAL (SUPPLIER/CUSTOMER) & KONTROL   */}
              {/* ============================================================ */}

          {showSupplier ? (
            /* MODE 1: STANDAR BAKU LEAN VSM (3 PILAR: SUPPLIER - KASIR - CUSTOMER) */
            <g className="vsm-3-pillar-flow">
              {/* 1. Supplier Bahan Baku (Top-Left: Gerigi Pabrik Eksternal) */}
              <g transform="translate(40, 25)">
                <title>Supplier (Pemasok Eksternal): Distributor pengirim pasokan bahan baku segar (ayam, telur, beras)</title>
                <path
                  d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
                  fill="#ffffff"
                  stroke="#334155"
                  strokeWidth="2"
                  filter="url(#vsm-shadow)"
                />
                <text x="75" y="46" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">
                  SUPPLIER
                </text>
                <text x="75" y="60" textAnchor="middle" fill="#475569" fontSize="9">
                  Distributor Bahan Segar
                </text>
                <text x="75" y="70" textAnchor="middle" fill="#64748b" fontSize="8">
                  (Ayam, Telur, Sayur)
                </text>
              </g>

              {/* Alur Pengiriman Bahan Baku dari Supplier ke Antrean / Tenant */}
              <path
                d="M 115,100 L 115,195 L 45,195 L 45,270"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.8"
                markerEnd="url(#vsm-arrow)"
              />
              <g transform="translate(55, 175)">
                <rect x="-4" y="-10" width="80" height="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="3" />
                <text x="36" y="4" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="600">
                  🚚 Pasokan Harian
                </text>
              </g>

              {/* 2. Production Control: Pengelola Kasir Tenant (Top-Center: Kotak Persegi Panjang Standar VSM) */}
              <g transform="translate(490, 25)">
                <title>Production Control (Pusat Kendali Operasional): Pengelola kasir internal yang menerima pesanan dan menerbitkan nota fisik</title>
                <rect
                  width="220"
                  height="75"
                  fill="#f8fafc"
                  stroke="#334155"
                  strokeWidth="2"
                  rx="4"
                  filter="url(#vsm-shadow)"
                />
                <rect x="0" y="0" width="220" height="20" fill="#e2e8f0" rx="4" />
                <text x="110" y="14" textAnchor="middle" fontWeight="bold" fill="#334155" fontSize="8.5">
                  PRODUCTION CONTROL (KENDALI INTERNAL)
                </text>
                <text x="110" y="45" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">
                  PENGELOLA KASIR TENANT
                </text>
                <text x="110" y="62" textAnchor="middle" fill="#dc2626" fontSize="9" fontWeight="600">
                  Sistem Kertas &amp; Nota Rangkap 2
                </text>
              </g>

              {/* Alur Informasi Pengadaan: Kasir ke Supplier (PO Mingguan) */}
              <path
                d="M 490,62 L 190,62"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                markerEnd="url(#vsm-arrow)"
              />
              <text x="340" y="54" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="500">
                PO Bahan Baku Mingguan
              </text>

              {/* 3. Customer: Mahasiswa Kampus (Top-Right: Gerigi Pabrik Eksternal) */}
              <g transform="translate(1000, 25)">
                <title>Customer (Pelanggan Eksternal): Mahasiswa kampus yang datang membeli makan siang</title>
                <path
                  d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2"
                  filter="url(#vsm-shadow)"
                />
                <text x="75" y="46" textAnchor="middle" fontWeight="bold" fill="#1e3a8a" fontSize="13">
                  CUSTOMER
                </text>
                <text x="75" y="60" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="600">
                  Mahasiswa Kampus
                </text>
                <text x="75" y="70" textAnchor="middle" fill="#64748b" fontSize="8">
                  (Jam Sibuk Siang)
                </text>
              </g>

              {/* Alur Informasi Lisan: Customer ke Kasir */}
              <path
                d="M 1000,62 L 710,62"
                fill="none"
                stroke="#334155"
                strokeWidth="1.8"
                markerEnd="url(#vsm-arrow)"
              />

              {/* Ikon Verbal Flow (Stick Figure) di Tengah Garis Customer-Kasir */}
              <g transform="translate(855, 62)">
                <title>Alur Informasi Lisan (Verbal Flow): Mahasiswa memesan makanan secara lisan di depan kasir</title>
                <circle cx="0" cy="-22" r="7.5" fill="#ffffff" stroke="#334155" strokeWidth="1.8" />
                <circle cx="-2" cy="-23" r="1" fill="#334155" />
                <circle cx="2" cy="-23" r="1" fill="#334155" />
                <path d="M -3,-19 Q 0,-16 3,-19" fill="none" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="-14" x2="0" y2="0" stroke="#334155" strokeWidth="1.8" />
                <line x1="-12" y1="-7" x2="12" y2="-7" stroke="#334155" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="-8" y2="14" stroke="#334155" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="8" y2="14" stroke="#334155" strokeWidth="1.8" />
                <text x="0" y="-34" textAnchor="middle" fill="#0f172a" fontSize="9.5" fontWeight="bold">
                  Verbal Flow
                </text>
                <text x="0" y="27" textAnchor="middle" fill="#64748b" fontSize="8.5">
                  Pesanan Lisan &amp; Tunai
                </text>
              </g>

              {/* Alur Instruksi Kerja Kasir ke Tahap 1 */}
              <path
                d="M 530,100 L 530,180 L 210,180 L 210,270"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.6"
                markerEnd="url(#vsm-arrow)"
              />
              <text x="360" y="172" textAnchor="middle" fill="#64748b" fontSize="9.5">
                Instruksi Nota Fisik Manual
              </text>
            </g>
          ) : (
            /* MODE 2: SIMPLIFIKASI MODUL (2 ENTITAS: KASIR PERSEGI PANJANG & CUSTOMER PABRIK) */
            <g className="vsm-2-pillar-flow">
              {/* Kotak Kasir (Top-Left, di atas Tahap 1: KOTAK PERSEGI PANJANG, BUKAN GERIGI PABRIK) */}
              <g transform="translate(135, 25)">
                <title>Production Control (Kasir): Entitas internal pengendali pesanan menggunakan kotak persegi panjang standar VSM</title>
                <rect
                  width="150"
                  height="75"
                  fill="#f8fafc"
                  stroke="#334155"
                  strokeWidth="2"
                  rx="4"
                  filter="url(#vsm-shadow)"
                />
                <rect x="0" y="0" width="150" height="18" fill="#e2e8f0" rx="4" />
                <text x="75" y="13" textAnchor="middle" fontWeight="bold" fill="#334155" fontSize="8">
                  PRODUCTION CONTROL
                </text>
                <text x="75" y="44" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="14">
                  Kasir
                </text>
                <text x="75" y="62" textAnchor="middle" fill="#64748b" fontSize="9">
                  (Kendali Pesanan Internal)
                </text>
              </g>

              {/* Kotak Customer / Mahasiswa (Top-Right: Ikon Gerigi Pabrik Eksternal) */}
              <g transform="translate(975, 25)">
                <title>Customer (Pelanggan Eksternal): Mahasiswa kampus dengan ikon gerigi pabrik resmi VSM</title>
                <path
                  d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
                  fill="#ffffff"
                  stroke="#334155"
                  strokeWidth="2"
                  filter="url(#vsm-shadow)"
                />
                <text x="75" y="48" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="14">
                  Customer
                </text>
                <text x="75" y="65" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="600">
                  (Mahasiswa Kampus)
                </text>
              </g>

              {/* Alur Informasi Lisan: Garis Horizontal Lurus dari Customer ke Kasir */}
              <path
                d="M 975,65 L 285,65"
                fill="none"
                stroke="#334155"
                strokeWidth="1.8"
                markerEnd="url(#vsm-arrow)"
              />

              {/* Ikon Verbal Information (Orang / Stick Figure) di Tengah Garis */}
              <g transform="translate(630, 65)">
                <title>Alur Informasi Lisan (Verbal Information Flow): Mahasiswa memesan lisan ke kasir</title>
                <circle cx="0" cy="-24" r="8" fill="#ffffff" stroke="#334155" strokeWidth="1.8" />
                <circle cx="-2.5" cy="-25" r="1" fill="#334155" />
                <circle cx="2.5" cy="-25" r="1" fill="#334155" />
                <path d="M -3,-21 Q 0,-18 3,-21" fill="none" stroke="#334155" strokeWidth="1.2" />
                <line x1="0" y1="-16" x2="0" y2="0" stroke="#334155" strokeWidth="2" />
                <line x1="-14" y1="-8" x2="14" y2="-8" stroke="#334155" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="-9" y2="15" stroke="#334155" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="9" y2="15" stroke="#334155" strokeWidth="1.8" />
                <text x="0" y="-37" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
                  Alur Informasi Lisan (Verbal Flow)
                </text>
                <text x="0" y="30" textAnchor="middle" fill="#64748b" fontSize="9">
                  Pesanan Lisan &amp; Uang Tunai
                </text>
              </g>

              {/* Alur Instruksi Kerja: Garis Vertikal Lurus Kasir ke Tahap 1 */}
              <path
                d="M 210,100 L 210,270"
                fill="none"
                stroke="#334155"
                strokeWidth="1.8"
                markerEnd="url(#vsm-arrow)"
              />
              <text x="218" y="185" fill="#64748b" fontSize="10" fontWeight="500">
                Instruksi Nota Fisik
              </text>
            </g>
          )}

          {/* Alur Penyerahan Fisik / Makanan Jadi ke Mahasiswa (Finished Goods Delivery to Customer) */}
          <path
            d={showSupplier ? "M 1140,325 L 1180,325 L 1180,62 L 1150,62" : "M 1140,325 L 1170,325 L 1170,65 L 1125,65"}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            markerEnd="url(#vsm-arrow-green)"
          />
          <g transform={showSupplier ? "translate(1185, 195)" : "translate(1178, 195)"}>
            <rect
              x="-4"
              y="-14"
              width="96"
              height="44"
              fill="#f0fdf4"
              stroke="#86efac"
              strokeWidth="1.2"
              rx="4"
              filter="url(#vsm-shadow)"
            />
            <text x="44" y="2" textAnchor="middle" fill="#15803d" fontSize="8.5" fontWeight="bold">
              DELIVERY
            </text>
            <text x="44" y="15" textAnchor="middle" fill="#166534" fontSize="8">
              Serah Terima
            </text>
            <text x="44" y="25" textAnchor="middle" fill="#166534" fontSize="8">
              Makanan Jadi
            </text>
          </g>

          {/* ============================================================ */}
          {/* SECTION 2: PROCESS BOXES & DATA BOXES (4 TAHAPAN PROSES)     */}
          {/* ============================================================ */}

          {vsmStepsData.map((step, idx) => {
            const x = processX[idx];
            const isSelected = selectedStep?.id === step.id;

            return (
              <g
                key={step.id}
                className="vsm-process-group"
                onClick={() => setSelectedStep(step)}
                style={{ cursor: 'pointer' }}
              >
                {/* Process Block Header & Main Body */}
                <rect
                  x={x}
                  y={processY}
                  width={processWidth}
                  height={processHeight}
                  fill={isSelected ? '#e0e7ff' : '#ffffff'}
                  stroke={isSelected ? '#4338ca' : '#1e293b'}
                  strokeWidth={isSelected ? '2.5' : '1.8'}
                  rx="4"
                  filter="url(#vsm-shadow)"
                />

                {/* Header Strip */}
                <rect
                  x={x}
                  y={processY}
                  width={processWidth}
                  height="26"
                  fill={isSelected ? '#4338ca' : '#1e293b'}
                  rx="4"
                />
                <text
                  x={x + processWidth / 2}
                  y={processY + 17}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontWeight="bold"
                  fontSize="11"
                >
                  Tahap {step.id}: {step.id === 1 ? 'Kasir' : step.id === 2 ? 'Antar Nota' : step.id === 3 ? 'Memasak' : 'Penyerahan'}
                </text>

                {/* Process Text Description */}
                <foreignObject x={x + 8} y={processY + 30} width={processWidth - 16} height="75">
                  <div
                    style={{
                      fontSize: '10px',
                      lineHeight: '1.3',
                      color: '#334155',
                      fontWeight: 500,
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    {step.name}
                  </div>
                </foreignObject>

                {/* DATA BOX (PT, Operator, Batch) di bawah kotak proses */}
                <g transform={`translate(${x}, ${processY + processHeight + 8})`}>
                  <rect
                    width={processWidth}
                    height="68"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="1.2"
                    rx="3"
                  />
                  {/* Row 1: Process Time */}
                  <text x="10" y="20" fill="#0f172a" fontSize="10" fontWeight="bold">
                    PT (Process Time):
                  </text>
                  <text x={processWidth - 10} y="20" textAnchor="end" fill="#16a34a" fontSize="10" fontWeight="bold">
                    {step.processTime} Menit
                  </text>
                  <line x1="0" y1="26" x2={processWidth} y2="26" stroke="#e2e8f0" />

                  {/* Row 2: Operator */}
                  <text x="10" y="42" fill="#64748b" fontSize="9">
                    Operator:
                  </text>
                  <text x={processWidth - 10} y="42" textAnchor="end" fill="#334155" fontSize="9" fontWeight="600">
                    {step.operator}
                  </text>
                  <line x1="0" y1="48" x2={processWidth} y2="48" stroke="#e2e8f0" />

                  {/* Row 3: Batch */}
                  <text x="10" y="62" fill="#64748b" fontSize="9">
                    Ukuran Batch:
                  </text>
                  <text x={processWidth - 10} y="62" textAnchor="end" fill="#334155" fontSize="9" fontWeight="600">
                    {step.batchSize}
                  </text>
                </g>

                {/* ============================================================ */}
                {/* INVENTORY / WAIT TIME TRIANGLE & PUSH ARROWS (LEAN VSM)      */}
                {/* ============================================================ */}
                {/* Segitiga Antrean / Wait Time di sebelah kiri kotak proses */}
                {idx === 0 && (
                  <g transform={`translate(${x - 85}, ${processY + 25})`}>
                    <title>{`Antrean Masuk: ${step.inventoryQty ?? 5} ${step.inventoryUnit ?? 'Orang'} (Waktu Tunggu: ${step.waitTime} Menit)`}</title>
                    {/* Segitiga Kuning Lean VSM */}
                    <polygon points="25,0 8,43 42,43" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="25" y="34" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    {/* Badge Jumlah Satuan Fisik (Inventory Count) */}
                    <rect x="-17" y="48" width="84" height="17" rx="8.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
                    <text x="25" y="60.5" textAnchor="middle" fill="#92400e" fontWeight="bold" fontSize="9">
                      Qty: {step.inventoryQty ?? 5} {step.inventoryUnit ?? 'Orang'}
                    </text>
                    <text x="25" y="77" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="9.5">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="25" y="89" textAnchor="middle" fill="#64748b" fontSize="8">
                      ({step.inventoryLabel ?? 'Antrean Mhs'})
                    </text>
                    {/* Push Arrow: Mahasiswa bergerak dari antrean ke Kasir */}
                    <PushArrow x={48} y={13} width={28} height={18} />
                  </g>
                )}

                {idx > 0 && (
                  <g transform={`translate(${processX[idx - 1] + processWidth}, ${processY + 25})`}>
                    <title>{`${step.inventoryLabel ?? 'WIP Antrean'}: ${step.inventoryQty} ${step.inventoryUnit} (Waktu Tunggu: ${step.waitTime} Menit)`}</title>
                    {/* Push Arrow 1 (Keluar dari proses sebelumnya menuju antrean/buffer) */}
                    <PushArrow x={4} y={13} width={26} height={18} />

                    {/* Segitiga WIP / Batching Wait */}
                    <polygon points="50,0 33,43 67,43" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="50" y="34" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    {/* Badge Jumlah Satuan Fisik (Inventory Count) */}
                    <rect x="8" y="48" width="84" height="17" rx="8.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
                    <text x="50" y="60.5" textAnchor="middle" fill="#92400e" fontWeight="bold" fontSize="9">
                      Qty: {step.inventoryQty} {step.inventoryUnit}
                    </text>
                    <text x="50" y="77" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="9.5">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="50" y="89" textAnchor="middle" fill="#64748b" fontSize="8">
                      ({step.inventoryLabel ?? (idx === 1 ? 'Batch 5 nota' : idx === 2 ? 'Delay koki' : 'Delay panggil')})
                    </text>

                    {/* Push Arrow 2 (Keluar dari antrean/buffer menuju proses berikutnya) */}
                    <PushArrow x={70} y={13} width={26} height={18} />
                  </g>
                )}

                {/* KAIZEN BURST (Bintang Ledakan Masalah) */}
                {showKaizen && step.kaizenBurst && (
                  <g
                    transform={`translate(${x + processWidth / 2}, ${processY - 60})`}
                    className="kaizen-burst"
                  >
                    {/* Polygon Bentuk Bintang Burst */}
                    <polygon
                      points="0,-25 8,-12 24,-18 16,-4 28,8 12,12 12,28 -2,16 -18,24 -14,8 -28,0 -12,-8 -18,-24"
                      fill="#ea580c"
                      stroke="#c2410c"
                      strokeWidth="1.5"
                    />
                    <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="9">
                      KAIZEN
                    </text>
                    <foreignObject x="-70" y="-55" width="140" height="30">
                      <div
                        style={{
                          background: '#fff7ed',
                          border: '1px solid #fdba74',
                          borderRadius: '4px',
                          padding: '2px 4px',
                          fontSize: '8.5px',
                          fontWeight: 'bold',
                          color: '#c2410c',
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {step.kaizenBurst.title}
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            );
          })}

          {/* ============================================================ */}
          {/* SECTION 3: TIMELINE LADDER (TANGGA WAKTU LEAN VSM)           */}
          {/* ============================================================ */}

          <g transform={`translate(0, ${timelineY})`}>
            {/* Label Timeline */}
            <text x="25" y="-12" fill="#0f172a" fontWeight="bold" fontSize="11">
              TIMELINE LADDER (WAKTU ALUR NILAI):
            </text>

            {/* Tangga Step Wave: Non-Value Added (Atas) vs Value-Added (Bawah) */}
            {vsmStepsData.map((step, idx) => {
              const startX = idx === 0 ? processX[0] - 80 : processX[idx - 1] + processWidth;
              const midX = processX[idx];
              const endX = processX[idx] + processWidth;

              return (
                <g key={step.id}>
                  {/* 1. Palung Atas: WAIT TIME (Non-Value Added / Waste) */}
                  <line
                    x1={startX}
                    y1={0}
                    x2={midX}
                    y2={0}
                    stroke="#ef4444"
                    strokeWidth="3.5"
                  />
                  {/* Garis Vertikal Turun */}
                  <line
                    x1={midX}
                    y1={0}
                    x2={midX}
                    y2={stepLadderHeight}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  {/* Label Wait Time */}
                  <text
                    x={(startX + midX) / 2}
                    y={-8}
                    textAnchor="middle"
                    fill="#dc2626"
                    fontWeight="bold"
                    fontSize="11"
                  >
                    {step.waitTime} min
                  </text>
                  <text
                    x={(startX + midX) / 2}
                    y={-22}
                    textAnchor="middle"
                    fill="#991b1b"
                    fontSize="9"
                  >
                    [Wait / NVA]
                  </text>

                  {/* 2. Puncak Bawah: PROCESS TIME (Value Added) */}
                  <line
                    x1={midX}
                    y1={stepLadderHeight}
                    x2={endX}
                    y2={stepLadderHeight}
                    stroke="#16a34a"
                    strokeWidth="3.5"
                  />
                  {/* Garis Vertikal Naik ke proses selanjutnya */}
                  <line
                    x1={endX}
                    y1={stepLadderHeight}
                    x2={endX}
                    y2={0}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                  {/* Label Process Time */}
                  <text
                    x={(midX + endX) / 2}
                    y={stepLadderHeight + 18}
                    textAnchor="middle"
                    fill="#15803d"
                    fontWeight="bold"
                    fontSize="11"
                  >
                    {step.processTime} min
                  </text>
                  <text
                    x={(midX + endX) / 2}
                    y={stepLadderHeight + 30}
                    textAnchor="middle"
                    fill="#166534"
                    fontSize="9"
                  >
                    [Process / VA]
                  </text>
                </g>
              );
            })}

            {/* Kotak Ringkasan Total Lead Time di Ujung Kanan Tangga */}
            <g transform="translate(1150, -35)">
              <rect
                width="85"
                height="105"
                fill="#f1f5f9"
                stroke="#334155"
                strokeWidth="1.5"
                rx="4"
              />
              <text x="42" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748b">
                TOTAL
              </text>
              <line x1="0" y1="22" x2="85" y2="22" stroke="#cbd5e1" />

              <text x="42" y="38" textAnchor="middle" fontSize="9" fill="#dc2626" fontWeight="bold">
                NVA (Wait):
              </text>
              <text x="42" y="52" textAnchor="middle" fontSize="12" fill="#dc2626" fontWeight="bold">
                {vsmSummaryData.totalWaitTime} m
              </text>

              <text x="42" y="70" textAnchor="middle" fontSize="9" fill="#16a34a" fontWeight="bold">
                VA (Proc):
              </text>
              <text x="42" y="84" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">
                {vsmSummaryData.totalProcessTime} m
              </text>

              <line x1="0" y1="90" x2="85" y2="90" stroke="#cbd5e1" />
              <text x="42" y="101" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0f172a">
                PLT: {vsmSummaryData.totalLeadTime} m
              </text>
            </g>
          </g>

          {/* ============================================================ */}
          {/* SECTION 4: DIAGRAM NOTATION LEGEND (LEGENDA SIMBOL VSM)       */}
          {/* ============================================================ */}
          <g transform="translate(60, 665)">
            <rect
              width="1180"
              height="38"
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
              rx="6"
            />
            {/* Item 1: Push Arrow */}
            <g transform="translate(20, 10)">
              <PushArrow x={0} y={0} width={26} height={18} />
              <text x="34" y="13" fontSize="10.5" fontWeight="600" fill="#334155">
                Push Arrow (Alur Dorong Pesanan/WIP)
              </text>
            </g>

            {/* Item 2: Inventory Triangle */}
            <g transform="translate(310, 10)">
              <polygon points="12,0 0,18 24,18" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
              <text x="12" y="14" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="9">I</text>
              <text x="32" y="13" fontSize="10.5" fontWeight="600" fill="#854d0e">
                Inventory Buffer (WIP / Antrean NVA)
              </text>
            </g>

            {/* Item 3: Finished Goods Delivery */}
            <g transform="translate(600, 10)">
              <path d="M 0,9 L 22,9" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#vsm-arrow-green)" />
              <text x="34" y="13" fontSize="10.5" fontWeight="600" fill="#15803d">
                Delivery Flow (Serah Makanan ke Pelanggan)
              </text>
            </g>

            {/* Item 4: Manual Info Flow */}
            <g transform="translate(885, 10)">
              <path d="M 0,9 L 22,9" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#vsm-arrow)" />
              <text x="32" y="13" fontSize="10.5" fontWeight="600" fill="#475569">
                Manual Info Flow (Instruksi Nota Fisik)
              </text>
            </g>

            {/* Item 5: Kaizen Burst */}
            <g transform="translate(1135, 10)">
              <polygon points="8,0 11,5 17,3 14,8 18,12 12,13 12,18 7,14 2,16 4,11 0,8 5,5 3,0" fill="#ea580c" stroke="#c2410c" strokeWidth="0.8" />
              <text x="24" y="13" fontSize="10.5" fontWeight="600" fill="#c2410c">
                Kaizen Burst
              </text>
            </g>
          </g>
            </g>
          ) : (
            /* ============================================================ */
            /* MODE FUTURE STATE: WORKCELL DAPUR TERPADU (CONTINUOUS FLOW)  */
            /* ============================================================ */
            <g className="vsm-workcell-future-state">
              {/* 1. Supplier (Top-Left: Gerigi Pabrik) */}
              <g transform="translate(40, 25)">
                <title>Supplier (Pemasok Eksternal): Distributor pengirim pasokan bahan baku segar langsung ke dapur</title>
                <path
                  d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
                  fill="#ffffff"
                  stroke="#334155"
                  strokeWidth="2"
                  filter="url(#vsm-shadow)"
                />
                <text x="75" y="46" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">
                  SUPPLIER
                </text>
                <text x="75" y="60" textAnchor="middle" fill="#475569" fontSize="9">
                  Distributor Bahan Segar
                </text>
                <text x="75" y="70" textAnchor="middle" fill="#64748b" fontSize="8">
                  (Ayam, Telur, Beras)
                </text>
              </g>

              {/* Alur Pengiriman Bahan Baku dari Supplier ke Workcell Dapur */}
              <path
                d="M 115,100 L 115,185 L 460,185 L 460,225"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.8"
                markerEnd="url(#vsm-arrow)"
              />
              <g transform="translate(230, 175)">
                <rect x="-4" y="-10" width="140" height="20" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="3" />
                <text x="66" y="4" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="600">
                  🚚 Pasokan Harian ke Sel Dapur
                </text>
              </g>

              {/* 2. Production Control: KDS & Kasir Digital (Top-Center) */}
              <g transform="translate(490, 25)">
                <title>Production Control (Pusat Kendali Digital): Kitchen Display System (KDS) menerima pesanan real-time tanpa nota kertas</title>
                <rect
                  width="240"
                  height="75"
                  fill="#f8fafc"
                  stroke="#334155"
                  strokeWidth="2"
                  rx="4"
                  filter="url(#vsm-shadow)"
                />
                <rect x="0" y="0" width="240" height="20" fill="#e2e8f0" rx="4" />
                <text x="120" y="14" textAnchor="middle" fontWeight="bold" fill="#334155" fontSize="8.5">
                  PRODUCTION CONTROL (KENDALI KDS)
                </text>
                <text x="120" y="45" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">
                  KDS &amp; Kasir Digital
                </text>
                <text x="120" y="62" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="600">
                  Digital Dispatching &amp; Real-Time Queue
                </text>
              </g>

              {/* PO Mingguan dari Kasir ke Supplier */}
              <path
                d="M 490,62 L 190,62"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.5"
                markerEnd="url(#vsm-arrow)"
              />
              <text x="340" y="54" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="500">
                PO Bahan Baku Mingguan
              </text>

              {/* Sinyal Digital Real-Time dari KDS ke Workcell */}
              <path
                d="M 610,100 L 610,140 L 600,150 L 620,165 L 610,175 L 610,225"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.2"
                markerEnd="url(#vsm-arrow-blue)"
              />
              <g transform="translate(625, 145)">
                <rect x="-4" y="-9" width="150" height="18" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" rx="3" />
                <text x="71" y="3.5" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold">
                  ⚡ Sinyal KDS Real-Time (0 Detik Delay)
                </text>
              </g>

              {/* 3. Customer: Mahasiswa Kampus (Top-Right: Gerigi Pabrik) */}
              <g transform="translate(1000, 25)">
                <title>Customer (Pelanggan Eksternal): Mahasiswa kampus memesan via Kiosk/QR dan menerima makanan di counter saji</title>
                <path
                  d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2"
                  filter="url(#vsm-shadow)"
                />
                <text x="75" y="46" textAnchor="middle" fontWeight="bold" fill="#1e3a8a" fontSize="13">
                  CUSTOMER
                </text>
                <text x="75" y="60" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="600">
                  Mahasiswa Kampus
                </text>
                <text x="75" y="70" textAnchor="middle" fill="#64748b" fontSize="8">
                  (Makan Siang Cepat)
                </text>
              </g>

              {/* Alur Pesanan Digital dari Customer ke Production Control */}
              <path
                d="M 1000,62 L 730,62"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                markerEnd="url(#vsm-arrow-blue)"
              />
              {/* Stick Figure Pemesanan Digital di Tengah Garis */}
              <g transform="translate(865, 62)">
                <title>Pemesanan Digital: Mahasiswa memesan mandiri via scan QR meja atau Self-Service Kiosk</title>
                <circle cx="0" cy="-22" r="7.5" fill="#ffffff" stroke="#2563eb" strokeWidth="1.8" />
                <circle cx="-2" cy="-23" r="1" fill="#2563eb" />
                <circle cx="2" cy="-23" r="1" fill="#2563eb" />
                <path d="M -3,-19 Q 0,-16 3,-19" fill="none" stroke="#2563eb" strokeWidth="1" />
                <line x1="0" y1="-14" x2="0" y2="0" stroke="#2563eb" strokeWidth="1.8" />
                <line x1="-12" y1="-7" x2="12" y2="-7" stroke="#2563eb" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="-8" y2="14" stroke="#2563eb" strokeWidth="1.8" />
                <line x1="0" y1="0" x2="8" y2="14" stroke="#2563eb" strokeWidth="1.8" />
                <text x="0" y="-34" textAnchor="middle" fill="#1e3a8a" fontSize="9.5" fontWeight="bold">
                  Pemesanan QR / Kiosk
                </text>
                <text x="0" y="27" textAnchor="middle" fill="#64748b" fontSize="8.5">
                  Cashless &amp; Otomatis
                </text>
              </g>

              {/* ============================================================ */}
              {/* TAHAP 1: KIOSK PEMESANAN MANDIRI (PROSES 1)                   */}
              {/* ============================================================ */}
              {/* Antrean Tunggu Kiosk (Minimal, hanya 1 menit) */}
              <g transform="translate(45, 268)">
                <title>Antrean Masuk: Hanya 1 menit karena ada banyak QR code meja dan multi-kiosk</title>
                <polygon points="25,0 0,50 50,50" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <text x="25" y="40" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="16">I</text>
                <rect x="-10" y="55" width="70" height="16" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
                <text x="25" y="66.5" textAnchor="middle" fill="#92400e" fontWeight="bold" fontSize="8.5">
                  Qty: 1 Orang
                </text>
                <text x="25" y="80" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="9.5">
                  Wait: 1m
                </text>
                <text x="25" y="92" textAnchor="middle" fill="#64748b" fontSize="7.5">
                  (Antrean Kiosk)
                </text>
              </g>

              {/* Process Box Kiosk */}
              <g
                transform="translate(115, 245)"
                onClick={() => setSelectedStep(vsmWorkcellStepsData[0])}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  width="180"
                  height="95"
                  fill="#ffffff"
                  stroke="#1e293b"
                  strokeWidth="2"
                  rx="4"
                  filter="url(#vsm-shadow)"
                />
                <rect x="0" y="0" width="180" height="24" fill="#f1f5f9" rx="4" />
                <text x="90" y="16" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="11">
                  Tahap 1: Pemesanan Digital
                </text>
                <text x="90" y="48" textAnchor="middle" fill="#334155" fontSize="10">
                  Self-Service Kiosk / QR Menu
                </text>
                <text x="90" y="66" textAnchor="middle" fill="#2563eb" fontSize="9.5" fontWeight="600">
                  Bayar Cashless / QRIS
                </text>
                <text x="90" y="82" textAnchor="middle" fill="#64748b" fontSize="8.5">
                  (Klik untuk rincian)
                </text>

                {/* Data Box Kiosk */}
                <g transform="translate(0, 95)">
                  <rect
                    width="180"
                    height="65"
                    fill="#f8fafc"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text x="10" y="16" fontSize="10" fontWeight="bold" fill="#0f172a">
                    PT (Process Time): <tspan fill="#16a34a">2 Menit</tspan>
                  </text>
                  <text x="10" y="32" fontSize="9.5" fill="#475569">
                    Operator: Mandiri / 1 Kasir
                  </text>
                  <text x="10" y="46" fontSize="9.5" fill="#475569">
                    Batch: 1 Customer (One-Piece)
                  </text>
                  <text x="10" y="58" fontSize="8.5" fill="#64748b">
                    Uptime: 100% (Sistem Cloud)
                  </text>
                </g>
              </g>

              {/* Kaizen Burst Kiosk */}
              {showKaizen && (
                <g transform="translate(115, 185)">
                  <polygon
                    points="90,0 110,10 135,5 130,22 150,30 130,38 135,55 110,48 90,60 70,48 45,55 50,38 30,30 50,22 45,5 70,10"
                    fill="#fff7ed"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                  />
                  <text x="90" y="27" textAnchor="middle" fontWeight="bold" fill="#c2410c" fontSize="9">
                    KAIZEN: Digital Kiosk
                  </text>
                  <text x="90" y="40" textAnchor="middle" fill="#ea580c" fontSize="8">
                    Antrean turun 10m → 1m
                  </text>
                </g>
              )}

              {/* ============================================================ */}
              {/* ALIRAN FIFO: PENGHUBUNG KIOSK KE WORKCELL                    */}
              {/* ============================================================ */}
              <g
                transform="translate(308, 280)"
                onClick={() => setSelectedStep(vsmWorkcellStepsData[1])}
                style={{ cursor: 'pointer' }}
              >
                <FifoLane x={0} y={0} width={138} height={32} label="FIFO (Max 3)" />
                {/* Segitiga buffer antrean digital FIFO */}
                <g transform="translate(48, -48)">
                  <title>Buffer FIFO KDS: Maksimal 3 pesanan digital mengantre ke koki (Wait Time: 1m)</title>
                  <polygon points="20,0 0,36 40,36" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
                  <text x="20" y="28" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">I</text>
                  <rect x="-16" y="40" width="72" height="15" rx="7.5" fill="#fef3c7" stroke="#f59e0b" strokeWidth="0.8" />
                  <text x="20" y="51" textAnchor="middle" fill="#92400e" fontWeight="bold" fontSize="7.5">
                    Max: 3 Pesanan
                  </text>
                  <text x="20" y="65" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="9">
                    Wait: 1m
                  </text>
                  <text x="20" y="76" textAnchor="middle" fill="#64748b" fontSize="7.5">
                    (Buffer KDS)
                  </text>
                </g>
                {/* Badge Eliminasi Tahap 2 */}
                <g transform="translate(-10, 48)">
                  <rect x="0" y="0" width="158" height="22" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" rx="4" />
                  <text x="79" y="14.5" textAnchor="middle" fill="#b91c1c" fontSize="8.5" fontWeight="bold">
                    🚫 Antar Nota DIHAPUS (0 Menit)!
                  </text>
                </g>
              </g>

              {/* ============================================================ */}
              {/* TAHAP 2: THE WORKCELL (NOTASI RESMI U-SHAPE TAPAL KUDA)      */}
              {/* ============================================================ */}
              <g transform="translate(460, 225)">
                {/* Bentuk Tapal Kuda Inverted-U Sesuai Gambar Standar */}
                <VsmWorkcellShape
                  x={0}
                  y={0}
                  width={460}
                  height={195}
                  bridgeHeight={65}
                  legWidth={125}
                  onClick={() => setSelectedStep(vsmWorkcellStepsData[2])}
                  isSelected={selectedStep?.id === 3}
                />

                {/* Sub-Stasiun Kaki Kiri: 1. Racik & Prep */}
                <g transform="translate(8, 72)">
                  <rect width="109" height="114" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="5" />
                  <text x="54.5" y="24" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">
                    1. RACIK &amp; PREP
                  </text>
                  <text x="54.5" y="42" textAnchor="middle" fontSize="9" fill="#475569">
                    Mise en place
                  </text>
                  <text x="54.5" y="58" textAnchor="middle" fontSize="8.5" fill="#64748b">
                    Wadah Nasi &amp; Lauk
                  </text>
                  <rect x="14" y="72" width="81" height="22" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" rx="4" />
                  <text x="54.5" y="86.5" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#16a34a">
                    PT: 1 Menit
                  </text>
                  <text x="54.5" y="106" textAnchor="middle" fontSize="7.5" fill="#64748b">
                    One-Piece Flow
                  </text>
                </g>

                {/* Bagian Tengah: Inner Operator Loop (Area Berdiri Operator) */}
                <g transform="translate(133, 72)">
                  <rect
                    width="194"
                    height="114"
                    fill="#f0fdf4"
                    stroke="#86efac"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    rx="6"
                  />
                  {/* Operator 1: Koki Masak */}
                  <g transform="translate(50, 42)">
                    <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#15803d">
                      OP-1
                    </text>
                    <text x="0" y="26" textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155">
                      Koki Masak
                    </text>
                  </g>

                  {/* Operator 2: Server / Prep */}
                  <g transform="translate(144, 42)">
                    <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">
                      OP-2
                    </text>
                    <text x="0" y="26" textAnchor="middle" fontSize="8" fontWeight="600" fill="#334155">
                      Prep &amp; Plating
                    </text>
                  </g>

                  {/* Panah Melengkung Aliran Kontinu One-Piece Flow */}
                  <path
                    d="M 12,42 Q 50,15 97,42 T 182,42"
                    fill="none"
                    stroke="#16a34a"
                    strokeWidth="2.2"
                    strokeDasharray="4 3"
                    markerEnd="url(#vsm-arrow-green)"
                  />
                  <text x="97" y="88" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#15803d">
                    Inner Operator Loop
                  </text>
                  <text x="97" y="103" textAnchor="middle" fontSize="8" fill="#64748b">
                    Radius 1 Langkah &bull; Multi-Skilled Staf
                  </text>
                </g>

                {/* Sub-Stasiun Kaki Kanan: 2. Goreng & 3. Pick-Up Counter */}
                <g transform="translate(335, 72)">
                  <rect width="117" height="114" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" rx="5" />
                  <text x="58.5" y="22" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0f172a">
                    2. GORENG / MASAK
                  </text>
                  <text x="58.5" y="38" textAnchor="middle" fontSize="8.5" fill="#475569">
                    Deep Fryer Cepat (<tspan fill="#16a34a" fontWeight="bold">PT: 5m</tspan>)
                  </text>
                  <line x1="10" y1="52" x2="107" y2="52" stroke="#e2e8f0" strokeWidth="1" />
                  <text x="58.5" y="70" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#16a34a">
                    3. PICK-UP COUNTER
                  </text>
                  <text x="58.5" y="86" textAnchor="middle" fontSize="8.5" fill="#15803d">
                    Plating &amp; Saji (<tspan fontWeight="bold">PT: 1m</tspan>)
                  </text>
                  <text x="58.5" y="104" textAnchor="middle" fontSize="7.5" fill="#64748b">
                    Langsung ke Pemesan
                  </text>
                </g>

                {/* Data Box Workcell */}
                <g transform="translate(0, 195)">
                  <rect
                    width="460"
                    height="75"
                    fill="#f8fafc"
                    stroke="#334155"
                    strokeWidth="1.5"
                    rx="4"
                  />
                  <rect x="0" y="0" width="460" height="18" fill="#e2e8f0" rx="4" />
                  <text x="230" y="13" textAnchor="middle" fontWeight="bold" fill="#334155" fontSize="8.5">
                    DATA BOX: INTEGRATED KITCHEN WORKCELL
                  </text>

                  <text x="16" y="35" fontSize="10.5" fontWeight="bold" fill="#0f172a">
                    Cycle Time (C/T): <tspan fill="#16a34a">7 Menit</tspan>
                    <tspan fontSize="9" fontWeight="normal" fill="#64748b"> (Racik 1m + Goreng 5m + Plating 1m)</tspan>
                  </text>
                  <text x="330" y="35" fontSize="10" fill="#475569">
                    C/O (Changeover): <tspan fontWeight="bold" fill="#0f172a">0 Menit</tspan>
                  </text>

                  <text x="16" y="52" fontSize="9.5" fill="#334155">
                    Operators: <tspan fontWeight="bold">2 Multi-Skilled Staf</tspan> (Koki &amp; Server Saling Bantu)
                  </text>
                  <text x="330" y="52" fontSize="9.5" fill="#334155">
                    Batch: <tspan fontWeight="bold">1 Porsi (One-Piece)</tspan>
                  </text>

                  <text x="16" y="67" fontSize="8.5" fill="#64748b">
                    Aliran: Continuous Flow (Tanpa Antrean WIP di Dalam Sel) | Uptime: 100% | Scrap: 0%
                  </text>
                </g>

                {/* Kaizen Burst Workcell */}
                {showKaizen && (
                  <g transform="translate(60, -50)">
                    <polygon
                      points="170,0 200,10 235,5 230,22 260,30 230,38 235,55 200,48 170,60 140,48 105,55 110,38 80,30 110,22 105,5 140,10"
                      fill="#fff7ed"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                    />
                    <text x="170" y="27" textAnchor="middle" fontWeight="bold" fill="#c2410c" fontSize="10">
                      KAIZEN: U-Shaped Workcell Layout
                    </text>
                    <text x="170" y="42" textAnchor="middle" fill="#ea580c" fontSize="8.5">
                      Eliminasi Waste Transportasi &amp; Motion | One-Piece Flow
                    </text>
                  </g>
                )}
              </g>

              {/* ============================================================ */}
              {/* PENYERAHAN MAKANAN LANGSUNG KE PELANGGAN                     */}
              {/* ============================================================ */}
              <path
                d="M 920,365 L 960,365 L 960,62 L 1000,62"
                fill="none"
                stroke="#16a34a"
                strokeWidth="3"
                markerEnd="url(#vsm-arrow-green)"
              />
              <g transform="translate(970, 200)">
                <rect x="-4" y="-14" width="165" height="36" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" rx="5" />
                <text x="78" y="0" textAnchor="middle" fill="#15803d" fontSize="9" fontWeight="bold">
                  🍱 Penyerahan Langsung
                </text>
                <text x="78" y="14" textAnchor="middle" fill="#166534" fontSize="8">
                  Wait Saji: 0 Menit (Makanan Panas)
                </text>
              </g>

              {/* ============================================================ */}
              {/* TIMELINE LADDER (TANGGA WAKTU LEAD TIME FUTURE STATE)        */}
              {/* ============================================================ */}
              <g transform="translate(0, 560)">
                {/* Garis Dasar Nol */}
                <line x1="40" y1="0" x2="920" y2="0" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

                {/* 1. Kiosk: Wait 1m / Process 2m */}
                {/* Wait 1m */}
                <line x1="45" y1="0" x2="115" y2="0" stroke="#ef4444" strokeWidth="3.5" />
                <line x1="115" y1="0" x2="115" y2={stepLadderHeight} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="80" y="-8" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10.5">1 min</text>
                <text x="80" y="-22" textAnchor="middle" fill="#991b1b" fontSize="8.5">[Wait / NVA]</text>

                {/* Process 2m */}
                <line x1="115" y1={stepLadderHeight} x2="295" y2={stepLadderHeight} stroke="#16a34a" strokeWidth="3.5" />
                <line x1="295" y1={stepLadderHeight} x2="295" y2="0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="205" y={stepLadderHeight + 18} textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="10.5">2 min</text>
                <text x="205" y={stepLadderHeight + 30} textAnchor="middle" fill="#166534" fontSize="8.5">[Process / VA]</text>

                {/* 2. FIFO Buffer: Wait 1m / Process 0m */}
                <line x1="295" y1="0" x2="460" y2="0" stroke="#ef4444" strokeWidth="3.5" />
                <text x="377" y="-8" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10.5">1 min</text>
                <text x="377" y="-22" textAnchor="middle" fill="#991b1b" fontSize="8.5">[FIFO Buffer / NVA]</text>
                {/* Garis transport dieliminasi */}
                <text x="377" y={stepLadderHeight + 18} textAnchor="middle" fill="#64748b" fontSize="9.5" fontWeight="600">
                  0 min (Dieliminasi)
                </text>

                {/* 3. Workcell: Wait 0m / Process 7m */}
                <line x1="460" y1="0" x2="460" y2={stepLadderHeight} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="480" y="-12" textAnchor="middle" fill="#16a34a" fontWeight="bold" fontSize="9.5">
                  0 min [One-Piece]
                </text>

                <line x1="460" y1={stepLadderHeight} x2="920" y2={stepLadderHeight} stroke="#16a34a" strokeWidth="4" />
                <line x1="920" y1={stepLadderHeight} x2="920" y2="0" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <text x="690" y={stepLadderHeight + 18} textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="11">
                  7 min (Racik 1m + Goreng 5m + Plating 1m)
                </text>
                <text x="690" y={stepLadderHeight + 32} textAnchor="middle" fill="#166534" fontSize="9">
                  [Process / VA Murni: Integrated Workcell]
                </text>

                {/* Kotak Ringkasan Total Lead Time Workcell di Kanan */}
                <g transform="translate(960, -45)">
                  <rect
                    width="280"
                    height="125"
                    fill="#f0fdf4"
                    stroke="#16a34a"
                    strokeWidth="2"
                    rx="6"
                  />
                  <text x="140" y="20" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#166534">
                    RINGKASAN TOTAL FUTURE STATE
                  </text>
                  <line x1="0" y1="28" x2="280" y2="28" stroke="#bbf7d0" />

                  <text x="16" y="48" fontSize="10" fill="#dc2626" fontWeight="bold">
                    Total Wait (NVA): <tspan fontSize="12">2 Menit</tspan>
                  </text>
                  <text x="215" y="48" fontSize="9" fill="#15803d" fontWeight="bold">
                    📉 Hemat 91%
                  </text>

                  <text x="16" y="70" fontSize="10" fill="#16a34a" fontWeight="bold">
                    Total Process (VA): <tspan fontSize="12">9 Menit</tspan>
                  </text>
                  <text x="215" y="70" fontSize="9" fill="#166534">
                    (81.8%)
                  </text>

                  <line x1="16" y1="82" x2="264" y2="82" stroke="#bbf7d0" />
                  <text x="16" y="100" fontSize="11" fontWeight="bold" fill="#0f172a">
                    Production Lead Time: <tspan fill="#2563eb">11 Menit</tspan>
                  </text>
                  <text x="16" y="116" fontSize="10" fontWeight="bold" fill="#15803d">
                    Efisiensi Siklus (PCE): 81.8% <tspan fontSize="8.5" fontWeight="normal">(World-Class Lean)</tspan>
                  </text>
                </g>
              </g>

              {/* ============================================================ */}
              {/* LEGENDA SIMBOL FUTURE STATE (WORKCELL)                       */}
              {/* ============================================================ */}
              <g transform="translate(60, 665)">
                <rect
                  width="1180"
                  height="38"
                  fill="#f8fafc"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  rx="6"
                />
                {/* Item 1: Workcell Symbol */}
                <g transform="translate(20, 8)">
                  <path
                    d="M 2,2 H 24 A 2,2 0 0 1 26,4 V 18 A 2,2 0 0 1 24,20 H 19 A 2,2 0 0 1 17,18 V 10 A 2,2 0 0 0 15,8 H 11 A 2,2 0 0 0 9,10 V 18 A 2,2 0 0 1 7,20 H 2 A 2,2 0 0 1 0,18 V 4 A 2,2 0 0 1 2,2 Z"
                    fill="#ffffff"
                    stroke="#1e293b"
                    strokeWidth="1.5"
                  />
                  <text x="32" y="14" fontSize="10.5" fontWeight="bold" fill="#0f172a">
                    Workcell (Sel Kerja Tapal Kuda U-Shape)
                  </text>
                </g>

                {/* Item 2: FIFO Lane */}
                <g transform="translate(340, 8)">
                  <line x1="0" y1="4" x2="22" y2="4" stroke="#059669" strokeWidth="2" />
                  <line x1="0" y1="16" x2="22" y2="16" stroke="#059669" strokeWidth="2" />
                  <polygon points="22,1 30,10 22,19" fill="#059669" />
                  <text x="38" y="14" fontSize="10.5" fontWeight="600" fill="#047857">
                    FIFO Lane (Jalur Antrean Teratur KDS)
                  </text>
                </g>

                {/* Item 3: Delivery Flow */}
                <g transform="translate(660, 8)">
                  <path d="M 0,10 L 22,10" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#vsm-arrow-green)" />
                  <text x="34" y="14" fontSize="10.5" fontWeight="600" fill="#15803d">
                    Delivery Flow (Saji Langsung ke Pelanggan)
                  </text>
                </g>

                {/* Item 4: Digital Info Flow */}
                <g transform="translate(960, 8)">
                  <path d="M 0,10 L 22,10" stroke="#2563eb" strokeWidth="2" markerEnd="url(#vsm-arrow-blue)" />
                  <text x="32" y="14" fontSize="10.5" fontWeight="600" fill="#1d4ed8">
                    Electronic Flow (KDS Real-Time Dispatch)
                  </text>
                </g>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Modal / Detail Drawer saat proses di-klik */}
      {selectedStep && (
        <div className="vsm-modal-backdrop" onClick={() => setSelectedStep(null)}>
          <div className="vsm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge">Tahap {selectedStep.id}</span>
              <button className="close-btn" onClick={() => setSelectedStep(null)}>✕</button>
            </div>
            <h3>{selectedStep.name}</h3>
            <p className="activity-desc">{selectedStep.activity}</p>

            <div className="time-comparison-box">
              <div className="time-col waste">
                <span className="time-col-title">⏳ Wait Time (Pemborosan):</span>
                <span className="time-col-val">{selectedStep.waitTime} Menit</span>
                {selectedStep.inventoryQty !== undefined && (
                  <div style={{ margin: '6px 0', padding: '3px 8px', background: '#fef3c7', borderRadius: '4px', fontSize: '11px', color: '#92400e', fontWeight: 'bold', width: 'fit-content' }}>
                    📦 Antrean Fisik (WIP): {selectedStep.inventoryQty} {selectedStep.inventoryUnit}
                  </div>
                )}
                <p className="time-col-detail">{selectedStep.waitReason}</p>
              </div>
              <div className="time-col value">
                <span className="time-col-title">⚡ Process Time (Aktif):</span>
                <span className="time-col-val">{selectedStep.processTime} Menit</span>
                <p className="time-col-detail">{selectedStep.processDetails}</p>
              </div>
            </div>

            {selectedStep.kaizenBurst && (
              <div className="kaizen-detail-box">
                <strong>💡 Rekomendasi Solusi Kaizen (To-Be):</strong>
                <h4>{selectedStep.kaizenBurst.title}</h4>
                <p>{selectedStep.kaizenBurst.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kesimpulan Utama & Tabel Analisis Pemborosan */}
      <section className="vsm-analysis-section">
        <div className="conclusion-card">
          <div className="conclusion-header">
            <h3>
              {vsmMode === 'current'
                ? '📌 Kesimpulan Utama Analisis VSM (Lean Assessment)'
                : '📌 Kesimpulan Utama Transformasi Workcell (Future State Assessment)'}
            </h3>
            <span
              className="conclusion-tag"
              style={{
                background: vsmMode === 'workcell' ? '#dcfce7' : undefined,
                color: vsmMode === 'workcell' ? '#15803d' : undefined,
                border: vsmMode === 'workcell' ? '1px solid #86efac' : undefined,
              }}
            >
              {vsmMode === 'current' ? 'Pemborosan Kritis: ~65%' : 'Efisiensi Kelas Dunia: 81.8%'}
            </span>
          </div>
          <p className="conclusion-text">{activeSummary.conclusion}</p>
        </div>

        {vsmMode === 'workcell' ? (
          <>
            {/* TABEL 1: PERBANDINGAN SEBELUM VS SESUDAH (TRANSFORMASI WORKCELL) */}
            <div className="vsm-table-card" style={{ borderLeft: '4px solid #16a34a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#14532d', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⚡ Tabel Perbandingan Dampak Kaizen: Current State vs Future State Workcell
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    Perubahan metrik operasional QuickBite setelah penggabungan dapur ke dalam U-Shaped Workcell &amp; aliran One-Piece Flow.
                  </p>
                </div>
                <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  Lead Time Turun 67.6%
                </span>
              </div>

              <table className="vsm-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Parameter Operasional</th>
                    <th style={{ width: '22%' }}>Kondisi Awal (Current State)</th>
                    <th style={{ width: '24%' }}>Kondisi Target (Future Workcell)</th>
                    <th style={{ width: '32%' }}>Dampak Perbaikan Kaizen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Konfigurasi Tata Letak</strong></td>
                    <td>4 Stasiun Terpisah (Kasir, Antar Nota, Dapur, Meja Saji)</td>
                    <td><strong style={{ color: '#16a34a' }}>1 Kiosk + 1 U-Shaped Workcell Terpadu</strong></td>
                    <td className="detail-text">Menyatukan seluruh proses dapur &amp; serah terima dalam radius 1 langkah kaki.</td>
                  </tr>
                  <tr>
                    <td><strong>Tahap Antar Nota</strong></td>
                    <td><span className="text-danger font-bold">1m PT + 5m Wait (Batch 5)</span></td>
                    <td><strong style={{ color: '#16a34a' }}>DIELIMINASI 100% (0 Menit)</strong></td>
                    <td className="detail-text">Nota fisik diganti transmisi digital instan via Kitchen Display System (KDS).</td>
                  </tr>
                  <tr>
                    <td><strong>Ukuran Batch Kerja</strong></td>
                    <td>Batch 5 Nota (Sistem Dorong / Push)</td>
                    <td><strong style={{ color: '#2563eb' }}>One-Piece Flow (1 Porsi / Pesanan)</strong></td>
                    <td className="detail-text">Pesanan diracik dan dimasak satu demi satu tanpa menunggu tumpukan nota.</td>
                  </tr>
                  <tr>
                    <td><strong>Waktu Tunggu Koki di Dapur</strong></td>
                    <td><span className="text-danger font-bold">3 Menit (Tulisan Nota Buram)</span></td>
                    <td><strong style={{ color: '#16a34a' }}>0 Menit (Zero Delay)</strong></td>
                    <td className="detail-text">Format tiket KDS standar digital menghilangkan konfirmasi lisan yang membingungkan.</td>
                  </tr>
                  <tr>
                    <td><strong>Waktu Tunggu Serah Terima</strong></td>
                    <td><span className="text-danger font-bold">4 Menit (Makanan Dingin di Meja Saji)</span></td>
                    <td><strong style={{ color: '#16a34a' }}>0 Menit (Langsung di Pick-up Counter)</strong></td>
                    <td className="detail-text">Pick-up counter menyatu di ujung sel kerja, makanan panas langsung diserahkan.</td>
                  </tr>
                  <tr style={{ background: '#f8fafc' }}>
                    <td><strong>Total Waktu Tunggu (NVA)</strong></td>
                    <td><span className="text-danger font-bold">22 Menit (64.7% dari Lead Time)</span></td>
                    <td><strong style={{ color: '#16a34a' }}>2 Menit (18.2% dari Lead Time)</strong></td>
                    <td><span className="badge-success" style={{ fontSize: '0.85rem' }}>📉 Pemborosan Berkurang 90.9%</span></td>
                  </tr>
                  <tr style={{ background: '#f0fdf4' }}>
                    <td><strong>Production Lead Time (PLT)</strong></td>
                    <td><span className="text-danger font-bold">34 Menit</span></td>
                    <td><strong style={{ color: '#15803d', fontSize: '1.05rem' }}>11 Menit</strong></td>
                    <td><span className="badge-success" style={{ fontSize: '0.85rem' }}>⚡ Waktu Hemat 23 Menit (-67.6%)</span></td>
                  </tr>
                  <tr style={{ background: '#eff6ff' }}>
                    <td><strong>Process Cycle Efficiency (PCE)</strong></td>
                    <td><span className="font-bold">35.3%</span></td>
                    <td><strong style={{ color: '#1d4ed8', fontSize: '1.05rem' }}>81.8%</strong></td>
                    <td><span className="badge-primary" style={{ fontSize: '0.85rem' }}>🏆 Standar Kelas Dunia (&gt; 25%)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TABEL 2: KLASIFIKASI AKTIVITAS LEAN FUTURE STATE */}
            <div className="vsm-table-card" style={{ borderLeft: '4px solid #0284c7', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#0369a1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📋 Tabel Klasifikasi Aktivitas Lean (Versi Future State Workcell)
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    Pemetaan alur nilai QuickBite setelah disederhanakan menjadi 2 stasiun kerja terpadu + 1 jalur antrean FIFO digital.
                  </p>
                </div>
                <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  2 Stasiun + 1 FIFO Lane
                </span>
              </div>

              <table className="vsm-table">
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Langkah Proses</th>
                    <th style={{ width: '16%' }}>Waktu Proses</th>
                    <th style={{ width: '16%' }}>Waktu Tunggu</th>
                    <th style={{ width: '40%' }}>Keterangan (VA / BNVA / Waste)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: '#0284c7' }}>Stasiun 1:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Pemesanan Digital (QR Code / Kiosk)</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Mahasiswa memilih menu di layar sentuh / smartphone dan bayar QRIS</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>2 Menit</span>
                        <span className="badge-bnva">BNVA</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>1 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-bnva" style={{ marginRight: '4px' }}>BNVA</span> <strong>Pemesanan &amp; Kasir:</strong> Diperlukan untuk transaksi keuangan bisnis.</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste</span> <strong>Antrean Kiosk:</strong> Minim (1 menit) karena tersedia banyak opsi scan QR meja.</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ color: '#059669' }}>Penghubung:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Aliran FIFO Antrean KDS</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Pengiriman tiket digital secara real-time ke layar monitor koki dapur</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="font-bold" style={{ fontSize: '1rem', color: '#64748b' }}>0 Menit</span>
                        <span style={{ fontSize: '0.75rem', background: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>Dieliminasi</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>1 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><strong style={{ color: '#16a34a' }}>Zero Transport:</strong> Tahap antar nota kertas 5 menit 100% dihapus.</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste Buffer:</span> Maksimal 3 pesanan menunggu giliran di layar KDS (FIFO Lane).</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ color: '#16a34a' }}>Stasiun 2:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Workcell Dapur &amp; Penyajian Terpadu</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Sel tapal kuda: Racik (1m) → Goreng (5m) → Plating &amp; Serah Terima (1m)</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>7 Menit</span>
                        <span className="badge-va">VA Murni</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>0 Menit</span>
                        <span className="badge-va">Zero Delay</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-va" style={{ marginRight: '4px' }}>VA Murni</span> <strong>Sel Dapur Terpadu:</strong> Mengubah bahan mentah jadi pesanan jadi langsung ke tangan pemesan.</div>
                        <div style={{ marginTop: '3px' }}><strong style={{ color: '#16a34a' }}>One-Piece Flow:</strong> Tidak ada antrean WIP di dalam sel, koki dan server bekerja beriringan.</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>TOTAL FUTURE STATE (Lead Time)</strong></td>
                    <td><strong className="text-success" style={{ fontSize: '1rem' }}>9 Menit (VA + BNVA)</strong></td>
                    <td><strong className="text-danger" style={{ fontSize: '1rem' }}>2 Menit (Waste)</strong></td>
                    <td>
                      <strong style={{ color: '#0f172a' }}>Total Lead Time: 11 Menit | Efisiensi Siklus: 81.8%</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Rangkuman 3 Kategori Lean Future State */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>🟢 VA (Value Added):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d', margin: '2px 0' }}>7 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(63.6%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#166534', lineHeight: '1.4' }}>Proses racik, goreng, dan saji di dalam sel kerja langsung menghasilkan kepuasan makan.</div>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700 }}>🔵 BNVA (Business Non-Value Added):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1d4ed8', margin: '2px 0' }}>2 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(18.2%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#1e40af', lineHeight: '1.4' }}>Hanya transaksi pembayaran di Kiosk. Tahap antar nota fisik berhasil dimusnahkan.</div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>🔴 NVA / Waste (Pemborosan Minimal):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b91c1c', margin: '2px 0' }}>2 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(18.2%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#991b1b', lineHeight: '1.4' }}>Turun drastis dari 22 menit menjadi 2 menit saja. Eliminasi tuntas batching waste.</div>
                </div>
              </div>
            </div>

            {/* CARD EDUKATIF: PANDUAN NOTASI SIMBOL WORKCELL VSM */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '16px 20px',
              marginTop: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                {/* Visualisasi Simbol Workcell Mini */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', textAlign: 'center' }}>
                  <svg width="70" height="50" viewBox="0 0 56 42">
                    <path
                      d="M 6,4 H 50 A 4,4 0 0 1 54,8 V 36 A 4,4 0 0 1 50,40 H 40 A 3,3 0 0 1 37,37 V 20 A 3,3 0 0 0 34,17 H 22 A 3,3 0 0 0 19,20 V 37 A 3,3 0 0 1 16,40 H 6 A 4,4 0 0 1 2,36 V 8 A 4,4 0 0 1 6,4 Z"
                      fill="#ffffff"
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text x="28" y="13" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1e293b">Workcell</text>
                  </svg>
                  <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 700, marginTop: '2px' }}>Simbol Baku VSM</div>
                </div>

                <div style={{ flex: 1, minWidth: '280px' }}>
                  <h4 style={{ margin: '0 0 6px 0', color: '#0f172a', fontSize: '1rem' }}>
                    📖 Kaidah Notasi Simbol Workcell (Bentuk Tapal Kuda / Meja U-Shape)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>
                    Dalam metodologi Lean Manufacturing (*Learning to See* oleh Mike Rother &amp; John Shook) serta pustaka resmi <strong>Lucidchart / Draw.io</strong>,
                    simbol <strong>Workcell</strong> digambarkan dengan bentuk meja tapal kuda (Inverted-U). Bentuk ini melambangkan:
                  </p>
                  <ul style={{ margin: '6px 0 0 0', paddingLeft: '18px', fontSize: '0.82rem', color: '#334155', lineHeight: '1.5' }}>
                    <li><strong>Integrasi Multi-Proses:</strong> Beberapa langkah kerja (racik, masak, plating) disatukan di bawah satu payung sel tanpa perantara gudang/antrean.</li>
                    <li><strong>One-Piece Flow:</strong> Unit pesanan diproses satu demi satu mengalir di sekeliling sel kerja (*Continuous Flow*).</li>
                    <li><strong>Radius Satu Langkah:</strong> Operator berdiri di rongga dalam (*inner loop*), dapat memutar badan menjangkau seluruh stasiun tanpa berjalan jauh (*Zero Motion Waste*).</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Tabel Analisis Aktivitas Lean (VA / BNVA / Waste) - Sesuai Template Praktikum */}
            <div className="vsm-table-card" style={{ borderLeft: '4px solid #4338ca' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📋 Tabel Klasifikasi Aktivitas Lean (VA / BNVA / Waste)
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                    Pemetaan 4 langkah proses operasional QuickBite berdasarkan Value Added (VA), Business Non-Value Added (BNVA), dan Waste (NVA).
                  </p>
                </div>
                <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                  4 Langkah Proses
                </span>
              </div>

              <table className="vsm-table">
                <thead>
                  <tr>
                    <th style={{ width: '28%' }}>Langkah Proses</th>
                    <th style={{ width: '16%' }}>Waktu Proses</th>
                    <th style={{ width: '16%' }}>Waktu Tunggu</th>
                    <th style={{ width: '40%' }}>Keterangan (VA / BNVA / Waste)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong style={{ color: '#4338ca' }}>Langkah 1:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Pemesanan &amp; Pembayaran di Kasir</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Mahasiswa pesan lisan, kasir tulis nota fisik &amp; terima uang tunai</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>2 Menit</span>
                        <span className="badge-bnva">BNVA</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>10 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-bnva" style={{ marginRight: '4px' }}>BNVA</span> <strong>Proses Transaksi:</strong> Diperlukan untuk pencatatan keuangan bisnis &amp; tanda terima.</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste</span> <strong>Waktu Tunggu:</strong> Antrean berdiri mahasiswa di depan loket (Waiting Waste).</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ color: '#4338ca' }}>Langkah 2:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Serah Terima Nota ke Dapur</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Kasir berjalan kaki membawa kumpulan nota kertas ke meja dapur</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>1 Menit</span>
                        <span className="badge-bnva">BNVA</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>5 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-bnva" style={{ marginRight: '4px' }}>BNVA</span> <strong>Informasi Pesanan:</strong> Nota wajib sampai ke koki (keterbatasan operasional manual).</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste</span> <strong>Waktu Tunggu:</strong> Penumpukan batch 5 nota di meja kasir (Batching Waste).</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ color: '#4338ca' }}>Langkah 3:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Persiapan &amp; Memasak di Dapur</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Koki memasak pesanan makanan di atas wajan/kompor</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>8 Menit</span>
                        <span className="badge-va">VA Murni</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>3 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-va" style={{ marginRight: '4px' }}>VA Murni</span> <strong>Proses Memasak:</strong> Mentransformasi bahan mentah jadi makanan jadi yang dibeli pelanggan.</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste</span> <strong>Waktu Tunggu:</strong> Delay koki baca tulisan buram &amp; antrean kompor (Correction Waste).</div>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong style={{ color: '#4338ca' }}>Langkah 4:</strong>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>Penyerahan Makanan ke Mahasiswa</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Serah terima fisik makanan jadi di loket/meja saji</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-success font-bold" style={{ fontSize: '1rem' }}>1 Menit</span>
                        <span className="badge-bnva">BNVA</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="text-danger font-bold" style={{ fontSize: '1rem' }}>4 Menit</span>
                        <span className="badge-waste">Waste</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4' }}>
                        <div><span className="badge-bnva" style={{ marginRight: '4px' }}>BNVA</span> <strong>Serah Terima:</strong> Penyerahan fisik makanan agar sampai ke tangan pemesan.</div>
                        <div style={{ marginTop: '3px' }}><span className="badge-waste" style={{ marginRight: '4px' }}>Waste</span> <strong>Waktu Tunggu:</strong> Makanan dingin menganggur di meja saji karena panggilan kalah bising (Inventory Waste).</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td><strong>TOTAL KESELURUHAN (Lead Time)</strong></td>
                    <td><strong className="text-success" style={{ fontSize: '1rem' }}>12 Menit (VA + BNVA)</strong></td>
                    <td><strong className="text-danger" style={{ fontSize: '1rem' }}>22 Menit (Waste)</strong></td>
                    <td>
                      <strong style={{ color: '#0f172a' }}>Total Lead Time: 34 Menit | Efisiensi Siklus: 35.3%</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Rangkuman 3 Kategori Lean */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginTop: '16px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 700 }}>🟢 VA (Value Added):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d', margin: '2px 0' }}>8 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(23.5%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#166534', lineHeight: '1.4' }}>Hanya proses memasak di dapur yang bernilai tambah murni bagi pelanggan.</div>
                </div>

                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#1e40af', fontWeight: 700 }}>🔵 BNVA (Business Non-Value Added):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1d4ed8', margin: '2px 0' }}>4 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(11.8%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#1e40af', lineHeight: '1.4' }}>Kasir (2m) + Antar Nota (1m) + Serah Terima (1m). Wajib operasional, tapi dapat diefisienkan.</div>
                </div>

                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#991b1b', fontWeight: 700 }}>🔴 NVA / Waste (Pemborosan Murni):</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b91c1c', margin: '2px 0' }}>22 Menit <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>(64.7%)</span></div>
                  <div style={{ fontSize: '0.78rem', color: '#991b1b', lineHeight: '1.4' }}>Antrean (10m) + Batching (5m) + Delay Koki (3m) + Delay Saji (4m). Target eliminasi Kaizen!</div>
                </div>
              </div>
            </div>

            {/* Tabel Rincian 4 Tahapan */}
            <div className="vsm-table-card">
              <h3>Tabel Rincian Alur Nilai &amp; Pemborosan per Tahapan</h3>
              <table className="vsm-table">
                <thead>
                  <tr>
                    <th>Tahap</th>
                    <th>Nama Aktivitas</th>
                    <th>Wait Time &amp; Inventory WIP</th>
                    <th>Process Time (VA)</th>
                    <th>Penyebab Pemborosan (Waste Cause)</th>
                    <th>Peluang Perbaikan (Kaizen)</th>
                  </tr>
                </thead>
                <tbody>
                  {vsmStepsData.map((step) => (
                    <tr key={step.id}>
                      <td><strong>Tahap {step.id}</strong></td>
                      <td>{step.name}</td>
                      <td>
                        <span className="text-danger font-bold">{step.waitTime} Menit</span>
                        {step.inventoryQty !== undefined && (
                          <div style={{ fontSize: '11px', color: '#92400e', fontWeight: 600, marginTop: '2px' }}>
                            Qty: {step.inventoryQty} {step.inventoryUnit}
                          </div>
                        )}
                      </td>
                      <td><span className="text-success font-bold">{step.processTime} Menit</span></td>
                      <td className="detail-text">{step.waitReason}</td>
                      <td>
                        <span className="kaizen-badge">{step.kaizenBurst?.title}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2}><strong>TOTAL KESELURUHAN (Lead Time)</strong></td>
                    <td><strong className="text-danger">22 Menit (64.7%)</strong></td>
                    <td><strong className="text-success">12 Menit (35.3%)</strong></td>
                    <td colSpan={2}>
                      <strong>Total Lead Time: 34 Menit | Efisiensi Siklus: 35.3%</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
