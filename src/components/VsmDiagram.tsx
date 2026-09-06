import { useState } from 'react';
import { vsmStepsData, vsmSummaryData, type VsmStep } from '../data/vsmData';

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

export function VsmDiagram() {
  const [selectedStep, setSelectedStep] = useState<VsmStep | null>(null);
  const [showKaizen, setShowKaizen] = useState<boolean>(true);

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

  return (
    <div className="vsm-container">
      <header className="vsm-header">
        <div>
          <h2>Value Stream Mapping (VSM) — Current State (As-Is)</h2>
          <p>Pemetaan Alur Nilai &amp; Analisis Pemborosan (Waste) Layanan Tenant QuickBite</p>
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
            📥 Export ke Lucidchart (.drawio)
          </a>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showKaizen}
              onChange={(e) => setShowKaizen(e.target.checked)}
            />
            <span>💡 Tampilkan Peluang Kaizen (Perbaikan)</span>
          </label>
        </div>
      </header>

      {/* KPI Cards Ringkasan Lead Time & Efisiensi */}
      <div className="vsm-metrics-grid">
        <div className="vsm-kpi-card total">
          <span className="kpi-label">Total Lead Time (PLT)</span>
          <span className="kpi-value">{vsmSummaryData.totalLeadTime} Menit</span>
          <span className="kpi-sub">Waktu keseluruhan dari datang hingga terima makanan</span>
        </div>

        <div className="vsm-kpi-card waste">
          <span className="kpi-label">Total Wait Time (NVA / Waste)</span>
          <span className="kpi-value text-danger">{vsmSummaryData.totalWaitTime} Menit</span>
          <span className="kpi-badge badge-danger">{vsmSummaryData.wasteRatio}% dari Total Waktu</span>
        </div>

        <div className="vsm-kpi-card value">
          <span className="kpi-label">Total Process Time (VA)</span>
          <span className="kpi-value text-success">{vsmSummaryData.totalProcessTime} Menit</span>
          <span className="kpi-badge badge-success">{vsmSummaryData.efficiency}% Waktu Nilai Tambah</span>
        </div>

        <div className="vsm-kpi-card efficiency">
          <span className="kpi-label">Process Cycle Efficiency (PCE)</span>
          <span className="kpi-value text-primary">{vsmSummaryData.efficiency}%</span>
          <span className="kpi-sub">Target Lean Kelas Dunia: &gt; 25%</span>
        </div>
      </div>

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

          {/* ============================================================ */}
          {/* SECTION 1: PELANGGAN (CUSTOMER), KASIR & ALUR INFORMASI LISAN */}
          {/* ============================================================ */}

          {/* Kotak Kasir (Top-Left, sejajar vertikal langsung di atas Tahap 1) */}
          <g transform="translate(135, 25)">
            {/* Bentuk Pabrik Bergerigi (Sawtooth Factory Icon khas VSM) */}
            <path
              d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="2"
              filter="url(#vsm-shadow)"
            />
            <text x="75" y="48" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="15">
              Kasir
            </text>
            <text x="75" y="65" textAnchor="middle" fill="#64748b" fontSize="9.5">
              (Tenant QuickBite)
            </text>
          </g>

          {/* Kotak Customer / Mahasiswa (Top-Right) */}
          <g transform="translate(975, 25)">
            {/* Bentuk Pabrik Bergerigi (Sawtooth Factory Icon khas VSM) */}
            <path
              d="M 0,18 L 25,0 L 50,18 L 75,0 L 100,18 L 125,0 L 150,18 L 150,75 L 0,75 Z"
              fill="#ffffff"
              stroke="#334155"
              strokeWidth="2"
              filter="url(#vsm-shadow)"
            />
            <text x="75" y="48" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="15">
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
            <title>Alur Informasi Lisan (Verbal Information Flow): Mahasiswa menyampaikan pesanan secara langsung dengan berbicara ke kasir</title>
            {/* Kepala */}
            <circle cx="0" cy="-24" r="8" fill="#ffffff" stroke="#334155" strokeWidth="1.8" />
            <circle cx="-2.5" cy="-25" r="1" fill="#334155" />
            <circle cx="2.5" cy="-25" r="1" fill="#334155" />
            <path d="M -3,-21 Q 0,-18 3,-21" fill="none" stroke="#334155" strokeWidth="1.2" />
            {/* Badan / Torso */}
            <line x1="0" y1="-16" x2="0" y2="0" stroke="#334155" strokeWidth="2" />
            {/* Tangan / Arms */}
            <line x1="-14" y1="-8" x2="14" y2="-8" stroke="#334155" strokeWidth="1.8" />
            {/* Kaki / Legs */}
            <line x1="0" y1="0" x2="-9" y2="15" stroke="#334155" strokeWidth="1.8" />
            <line x1="0" y1="0" x2="9" y2="15" stroke="#334155" strokeWidth="1.8" />

            {/* Label Informasi Lisan */}
            <text x="0" y="-37" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontWeight="bold">
              Alur Informasi Lisan (Verbal Flow)
            </text>
            <text x="0" y="30" textAnchor="middle" fill="#64748b" fontSize="9">
              Pesanan Lisan &amp; Uang Tunai
            </text>
          </g>

          {/* Alur Informasi Manual: Garis Vertikal Lurus Kasir ke Tahap 1 */}
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

          {/* Alur Penyerahan Fisik / Makanan Jadi ke Mahasiswa (Finished Goods Delivery to Customer) */}
          <path
            d="M 1140,325 L 1170,325 L 1170,65 L 1125,65"
            fill="none"
            stroke="#16a34a"
            strokeWidth="2.5"
            markerEnd="url(#vsm-arrow-green)"
          />
          <g transform="translate(1178, 195)">
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
                    {/* Segitiga Kuning Lean VSM */}
                    <polygon points="25,0 8,43 42,43" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="25" y="34" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    <text x="25" y="58" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="25" y="71" textAnchor="middle" fill="#64748b" fontSize="8.5">
                      (Antrean Mhs)
                    </text>
                    {/* Push Arrow: Mahasiswa bergerak dari antrean ke Kasir */}
                    <PushArrow x={48} y={13} width={28} height={18} />
                  </g>
                )}

                {idx > 0 && (
                  <g transform={`translate(${processX[idx - 1] + processWidth}, ${processY + 25})`}>
                    {/* Push Arrow 1 (Keluar dari proses sebelumnya menuju antrean/buffer) */}
                    <PushArrow x={4} y={13} width={26} height={18} />

                    {/* Segitiga WIP / Batching Wait */}
                    <polygon points="50,0 33,43 67,43" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="50" y="34" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    <text x="50" y="58" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="50" y="71" textAnchor="middle" fill="#64748b" fontSize="8.5">
                      {idx === 1 ? '(Batch 5 nota)' : idx === 2 ? '(Delay koki)' : '(Delay panggil)'}
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
            <h3>📌 Kesimpulan Utama Analisis VSM (Lean Assessment)</h3>
            <span className="conclusion-tag">Pemborosan Kritis: ~65%</span>
          </div>
          <p className="conclusion-text">{vsmSummaryData.conclusion}</p>
        </div>

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
                <th>Wait Time (NVA)</th>
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
                  <td><span className="text-danger font-bold">{step.waitTime} Menit</span></td>
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
      </section>
    </div>
  );
}
