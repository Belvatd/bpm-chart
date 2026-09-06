import { useState } from 'react';
import { vsmStepsData, vsmSummaryData, type VsmStep } from '../data/vsmData';

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
        <div className="vsm-toggle">
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
          {/* SECTION 1: PELANGGAN (CUSTOMER) & KONTROL INFORMASI MANUAL   */}
          {/* ============================================================ */}

          {/* Customer Box (Mahasiswa Kantin) */}
          <g transform="translate(1000, 30)">
            <rect
              width="200"
              height="80"
              fill="#eff6ff"
              stroke="#2563eb"
              strokeWidth="2"
              rx="6"
              filter="url(#vsm-shadow)"
            />
            {/* Ikon Pabrik / Pelanggan Bentuk Gerigi Khas VSM */}
            <polygon points="10,0 25,-12 40,0 55,-12 70,0" fill="#2563eb" />
            <text x="100" y="32" textAnchor="middle" fontWeight="bold" fill="#1e3a8a" fontSize="13">
              MAHASISWA KAMPUS
            </text>
            <text x="100" y="52" textAnchor="middle" fill="#475569" fontSize="11">
              (Customer Demand)
            </text>
            <text x="100" y="68" textAnchor="middle" fill="#2563eb" fontWeight="600" fontSize="11">
              Jam Sibuk Makan Siang
            </text>
          </g>

          {/* Production Control / Tenant Management Box */}
          <g transform="translate(480, 30)">
            <rect
              width="240"
              height="80"
              fill="#f8fafc"
              stroke="#64748b"
              strokeWidth="2"
              rx="6"
              filter="url(#vsm-shadow)"
            />
            <text x="120" y="30" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="13">
              PENGELOLA KASIR TENANT
            </text>
            <text x="120" y="50" textAnchor="middle" fill="#64748b" fontSize="11">
              (Kontrol Operasional Manual)
            </text>
            <text x="120" y="68" textAnchor="middle" fill="#ef4444" fontWeight="600" fontSize="10">
              Sistem Kertas &amp; Nota Rangkap 2
            </text>
          </g>

          {/* Alur Informasi Manual: Pesanan Mahasiswa ke Kasir */}
          <path
            d="M 1000,70 L 720,70"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="6 3"
            markerEnd="url(#vsm-arrow-blue)"
          />
          <text x="860" y="60" textAnchor="middle" fill="#2563eb" fontSize="10" fontWeight="600">
            Pesanan Lisan &amp; Uang Tunai
          </text>

          {/* Alur Informasi Manual: Kasir ke Tahap 1 */}
          <path
            d="M 520,110 L 520,180 L 210,180 L 210,270"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#vsm-arrow)"
          />
          <text x="350" y="172" textAnchor="middle" fill="#64748b" fontSize="10">
            Instruksi Nota Fisik Manual
          </text>

          {/* Alur Penyerahan Fisik / Makanan Jadi ke Mahasiswa (Finished Goods Delivery to Customer) */}
          <path
            d="M 1140,325 L 1170,325 L 1170,110"
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
                {/* INVENTORY / WAIT TIME TRIANGLE (Sebelum Proses atau Antara)  */}
                {/* ============================================================ */}
                {/* Segitiga Antrean / Wait Time di sebelah kiri kotak proses */}
                {idx === 0 && (
                  <g transform={`translate(${x - 75}, ${processY + 25})`}>
                    {/* Segitiga Kuning Lean VSM */}
                    <polygon points="25,0 0,45 50,45" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="25" y="36" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    <text x="25" y="60" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="25" y="73" textAnchor="middle" fill="#64748b" fontSize="8">
                      (Antrean Mhs)
                    </text>
                  </g>
                )}

                {idx > 0 && (
                  <g transform={`translate(${processX[idx - 1] + processWidth + 25}, ${processY + 25})`}>
                    {/* Panah Push antar proses */}
                    <path
                      d={`M -15,22 L 10,22`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      markerEnd="url(#vsm-arrow)"
                    />
                    {/* Segitiga WIP / Batching Wait */}
                    <polygon points="35,0 10,45 60,45" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="35" y="36" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
                      I
                    </text>
                    <text x="35" y="60" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">
                      Wait: {step.waitTime} m
                    </text>
                    <text x="35" y="73" textAnchor="middle" fill="#64748b" fontSize="8">
                      {idx === 1 ? '(Batch 5 nota)' : idx === 2 ? '(Delay koki)' : '(Delay panggil)'}
                    </text>
                    <path
                      d={`M 60,22 L 85,22`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      markerEnd="url(#vsm-arrow)"
                    />
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
