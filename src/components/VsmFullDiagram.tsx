import { useState } from 'react';

// ============================================================
// VsmFullDiagram — Case VSM LENGKAP dengan seluruh notasi Lean
// (29 notasi: alur material, alur informasi, umum & kaizen,
//  garis waktu & metrik — termasuk 14 simbol Lucidchart baru)
// ============================================================

const svgWidth = 1250;
const svgHeight = 800;

// 4 Proses
const processWidth = 180;
const processHeight = 110;
const processY = 250;
const processX = [40, 340, 640, 940];

// Tangga waktu
const timelineY = 582;
const stepLadderHeight = 45;

// Segmen waktu (Wait di atas, Process di bawah)
const waitSegs = [
  { x1: 224, x2: 284, label: '30 m', note: 'Antre bahan' },
  { x1: 524, x2: 582, label: '15 m', note: 'Prep bertahap' },
  { x1: 826, x2: 884, label: '20 m', note: 'Batch masak' },
  { x1: 944, x2: 1004, label: '10 m', note: 'Panggil pelanggan' },
];
const procSegs = [
  { x1: 40, x2: 220, label: '5 m' },
  { x1: 340, x2: 520, label: '8 m' },
  { x1: 640, x2: 820, label: '12 m' },
  { x1: 940, x2: 1120, label: '4 m' },
];

const steps = [
  {
    id: 1,
    name: 'Terima & Cek Bahan',
    pt: '5 m',
    co: '0 m',
    ops: 2,
    batch: '20 kg',
  },
  {
    id: 2,
    name: 'Persiapan (Workcell)',
    pt: '8 m',
    co: '2 m',
    ops: 2,
    batch: '10 porsi',
  },
  {
    id: 3,
    name: 'Memasak Batch',
    pt: '12 m',
    co: '3 m',
    ops: 1,
    batch: '5 porsi',
  },
  {
    id: 4,
    name: 'Rakit & Serahkan',
    pt: '4 m',
    co: '0 m',
    ops: 2,
    batch: '1 porsi',
  },
];

function OperatorIcon({ count, color }: { count: number; color: string }) {
  return (
    <g>
      <circle cx="10" cy="7" r="4" fill={color} />
      <path d="M 3,18 Q 10,11 17,18 Z" fill={color} />
      <text x="22" y="13" fontSize="8" fontWeight="bold" fill={color}>
        ×{count}
      </text>
    </g>
  );
}

function KaizenBurst({
  x,
  y,
  title,
}: {
  x: number;
  y: number;
  title: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polygon
        points="0,-25 8,-12 24,-18 16,-4 28,8 12,12 12,28 -2,16 -18,24 -14,8 -28,0 -12,-8 -18,-24"
        fill="#ea580c"
        stroke="#c2410c"
        strokeWidth="1.5"
      />
      <text x="0" y="4" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="8">
        KAIZEN
      </text>
      <foreignObject x="-72" y="-52" width="144" height="26">
        <div
          style={{
            background: '#fff7ed',
            border: '1px solid #fdba74',
            borderRadius: '4px',
            padding: '2px 4px',
            fontSize: '8.5px',
            fontWeight: 'bold',
            color: '#c2410c',
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
      </foreignObject>
    </g>
  );
}

export function VsmFullDiagram() {
  const [showKaizen, setShowKaizen] = useState<boolean>(true);

  return (
    <div className="vsm-container">
      <header className="vsm-header">
        <div>
          <h2>Value Stream Mapping (VSM) — Case Lengkap QuickBite</h2>
          <p>
            Peta Alur Nilai Penuh: Supplier → Produksi → Pelanggan dengan 29 notasi Lean
            (kanban, supermarket, FIFO, heijunka, MRP/ERP, dst.)
          </p>
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

      {/* KPI Cards */}
      <div className="vsm-metrics-grid">
        <div className="vsm-kpi-card total">
          <span className="kpi-label">Total Lead Time (PLT)</span>
          <span className="kpi-value">104 Menit</span>
          <span className="kpi-sub">Dari bahan datang hingga pesanan sampai</span>
        </div>
        <div className="vsm-kpi-card waste">
          <span className="kpi-label">Total Wait Time (NVA / Waste)</span>
          <span className="kpi-value text-danger">75 Menit</span>
          <span className="kpi-badge badge-danger">72% dari Total Waktu</span>
        </div>
        <div className="vsm-kpi-card value">
          <span className="kpi-label">Total Process Time (VA)</span>
          <span className="kpi-value text-success">29 Menit</span>
          <span className="kpi-badge badge-success">27.9% Waktu Nilai Tambah</span>
        </div>
        <div className="vsm-kpi-card efficiency">
          <span className="kpi-label">Process Cycle Efficiency (PCE)</span>
          <span className="kpi-value text-primary">27.9%</span>
          <span className="kpi-sub">Target Lean Kelas Dunia: &gt; 25%</span>
        </div>
      </div>

      {/* Diagram SVG */}
      <div className="vsm-svg-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="vsm-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker id="vsmf-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
            </marker>
            <marker id="vsmf-arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#2563eb" />
            </marker>
            <marker id="vsmf-arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
            </marker>
            <marker id="vsmf-arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#dc2626" />
            </marker>
            <filter id="vsmf-shadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* ============================================================
              BAGIAN ATAS: SUPPLIER — PRODUCTION CONTROL (MRP/ERP) — CUSTOMER
          ============================================================ */}

          {/* Supplier Box */}
          <g transform="translate(30, 20)">
            <rect width="170" height="72" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" rx="6" filter="url(#vsmf-shadow)" />
            <polygon points="10,16 26,4 42,16 58,4 74,16 90,4 106,16 122,4 138,16 154,4 162,16" fill="#ca8a04" />
            <rect x="10" y="16" width="152" height="14" fill="#fef3c7" />
            <text x="86" y="52" textAnchor="middle" fontWeight="bold" fill="#92400e" fontSize="12">
              SUPPLIER
            </text>
            <text x="86" y="66" textAnchor="middle" fill="#a16207" fontSize="8.5">
              PT Berkah Boga (Bahan Baku)
            </text>
          </g>

          {/* Production Control + MRP/ERP */}
          <g transform="translate(540, 20)">
            <rect width="200" height="82" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" rx="6" filter="url(#vsmf-shadow)" />
            {/* ikon monitor ERP */}
            <rect x="14" y="14" width="24" height="16" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.4" rx="2" />
            <line x1="14" y1="20" x2="38" y2="20" stroke="#c4b5fd" strokeWidth="4" />
            <rect x="20" y="32" width="12" height="3" fill="#7c3aed" />
            <text x="52" y="24" fontWeight="bold" fill="#4c1d95" fontSize="11">
              PRODUCTION CONTROL
            </text>
            <text x="52" y="38" fill="#6d28d9" fontSize="8.5">
              Sistem MRP / ERP (POS QuickBite)
            </text>
            <text x="52" y="54" fill="#7c3aed" fontSize="8">
              Jadwal Harian + EDI ke Supplier
            </text>
            <text x="14" y="70" fill="#a78bfa" fontSize="7.5" fontWeight="bold">
              MRP/ERP Scheduling
            </text>
          </g>

          {/* Go See (ikon kacamata) */}
          <g transform="translate(804, 22)">
            <circle cx="10" cy="12" r="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            <circle cx="30" cy="12" r="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="17" y1="12" x2="23" y2="12" stroke="#0284c7" strokeWidth="2.2" />
            <line x1="3" y1="9" x2="3" y2="4" stroke="#0284c7" strokeWidth="2" />
            <line x1="37" y1="9" x2="37" y2="4" stroke="#0284c7" strokeWidth="2" />
            <text x="20" y="34" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0284c7">
              Go See
            </text>
          </g>

          {/* Customer Box */}
          <g transform="translate(1030, 20)">
            <rect width="180" height="72" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="6" filter="url(#vsmf-shadow)" />
            <polygon points="10,16 26,4 42,16 58,4 74,16 90,4 106,16 122,4 138,16 154,4 162,16" fill="#2563eb" />
            <rect x="10" y="16" width="152" height="14" fill="#dbeafe" />
            <text x="90" y="52" textAnchor="middle" fontWeight="bold" fill="#1e3a8a" fontSize="12">
              MAHASISWA KAMPUS
            </text>
            <text x="90" y="66" textAnchor="middle" fill="#2563eb" fontSize="8.5">
              Demand 120 porsi/hari (Digital POS)
            </text>
          </g>

          {/* Electronic Info: Customer → MRP */}
          <path
            d="M 1030,56 L 990,38 L 950,72 L 910,38 L 870,72 L 830,38 L 790,72 L 740,56"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            markerEnd="url(#vsmf-arrow-blue)"
          />
          <text x="885" y="30" textAnchor="middle" fill="#2563eb" fontSize="9" fontWeight="600">
            Permintaan Digital (Electronic Info: POS/EDI)
          </text>

          {/* Electronic Info: MRP → Supplier */}
          <path
            d="M 540,102 L 500,84 L 460,118 L 420,84 L 380,118 L 340,84 L 300,102 L 205,102"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            markerEnd="url(#vsmf-arrow-blue)"
          />
          <text x="372" y="132" textAnchor="middle" fill="#2563eb" fontSize="8.5" fontWeight="600">
            Pesan Bahan Otomatis via EDI (Electronic)
          </text>

          {/* Manual Info: MRP → P1 (jadwal nota) */}
          <path
            d="M 555,102 L 555,170 L 130,170 L 130,250"
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            markerEnd="url(#vsmf-arrow)"
          />
          <text x="342" y="162" textAnchor="middle" fill="#64748b" fontSize="8.5">
            Instruksi Jadwal Harian (Manual Info: nota kertas)
          </text>

          {/* Heijunka Box (Load Leveling) */}
          <g transform="translate(585, 130)">
            <rect width="150" height="50" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" rx="4" filter="url(#vsmf-shadow)" />
            <line x1="30" y1="0" x2="30" y2="50" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="60" y1="0" x2="60" y2="50" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="90" y1="0" x2="90" y2="50" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="120" y1="0" x2="120" y2="50" stroke="#6366f1" strokeWidth="1.2" />
            <rect x="5" y="8" width="22" height="16" fill="#6366f1" />
            <rect x="35" y="8" width="22" height="22" fill="#818cf8" />
            <rect x="65" y="8" width="22" height="12" fill="#a5b4fc" />
            <rect x="95" y="8" width="22" height="20" fill="#818cf8" />
            <text x="75" y="46" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#4338ca">
              HEIJUNKA BOX (Load Leveling)
            </text>
          </g>

          {/* Sequenced Pull: Heijunka → P3 */}
          <path
            d="M 660,180 L 660,216 L 730,216 L 730,250"
            fill="none"
            stroke="#16a34a"
            strokeWidth="1.8"
            strokeDasharray="5 3"
            markerEnd="url(#vsmf-arrow)"
          />
          <text x="698" y="209" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="600">
            Sequenced Pull
          </text>

          {/* ============================================================
              PROSES + DATA BOX (4 TAHAPAN)
          ============================================================ */}
          {steps.map((step, idx) => {
            const x = processX[idx];
            return (
              <g key={step.id}>
                {/* Process Box */}
                <rect
                  x={x}
                  y={processY}
                  width={processWidth}
                  height={processHeight}
                  fill="#ffffff"
                  stroke="#1e293b"
                  strokeWidth="1.8"
                  rx="4"
                  filter="url(#vsmf-shadow)"
                />
                <rect x={x} y={processY} width={processWidth} height="26" fill="#1e293b" rx="4" />
                <text
                  x={x + processWidth / 2}
                  y={processY + 17}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontWeight="bold"
                  fontSize="11"
                >
                  P{step.id}: {step.name}
                </text>
                {/* Workcell visual khusus P2 */}
                {step.id === 2 && (
                  <g>
                    <rect x={x + 8} y={processY + 34} width="70" height="34" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.4" rx="3" />
                    <rect x={x + 84} y={processY + 34} width="70" height="34" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="1.4" rx="3" />
                    <text x={x + processWidth / 2} y={processY + 78} textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1d4ed8">
                      SEL KERJA (WORKCELL) TERINTEGRASI
                    </text>
                  </g>
                )}
                {step.id !== 2 && (
                  <text
                    x={x + processWidth / 2}
                    y={processY + 52}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill="#475569"
                  >
                    {step.id === 1 && 'Bongkar & timbang bahan'}
                    {step.id === 3 && 'Pacemaker: isi ulang supermarket'}
                    {step.id === 4 && 'Rakit sesuai kartu pesanan'}
                  </text>
                )}
                {/* Operator icon */}
                <OperatorIcon count={step.ops} color="#475569" />
                <text x={x + processWidth - 34} y={processY + 100} fontSize="8" fill="#94a3b8">
                  {step.id === 1 ? '2 Staf' : step.id === 2 ? '2 Staf' : step.id === 3 ? '1 Koki' : '2 Staf'}
                </text>

                {/* Data Box */}
                <g transform={`translate(${x}, ${processY + processHeight + 8})`}>
                  <rect width={processWidth} height="76" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" rx="3" />
                  <text x="10" y="17" fill="#0f172a" fontSize="9.5" fontWeight="bold">
                    PT: <tspan fill="#16a34a">{step.pt}</tspan>
                  </text>
                  <text x={processWidth - 10} y="17" textAnchor="end" fill="#64748b" fontSize="9">
                    C/O: {step.co}
                  </text>
                  <line x1="0" y1="24" x2={processWidth} y2="24" stroke="#e2e8f0" />
                  <text x="10" y="41" fill="#64748b" fontSize="9">
                    Operator: <tspan fill="#334155" fontWeight="600">{step.ops} org</tspan>
                  </text>
                  <text x={processWidth - 10} y="41" textAnchor="end" fill="#64748b" fontSize="9">
                    Batch: <tspan fill="#334155" fontWeight="600">{step.batch}</tspan>
                  </text>
                  <line x1="0" y1="48" x2={processWidth} y2="48" stroke="#e2e8f0" />
                  <text x="10" y="65" fill="#94a3b8" fontSize="7.5">
                    {step.id === 1 ? '2 Shift / hari' : step.id === 2 ? '1 Shift + marinasi' : step.id === 3 ? '3 Shift / hari' : 'Sesuai antrean'}
                  </text>
                </g>
              </g>
            );
          })}

          {/* ============================================================
              ANTAR PROSES: PUSH — INVENTORY — SAFETY STOCK — FIFO — SUPERMARKET
          ============================================================ */}

          {/* Inventory Triangle antara P1-P2 */}
          <g transform="translate(234, 268)">
            <polygon points="25,0 0,45 50,45" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="25" y="36" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="13">
              I
            </text>
            <text x="25" y="60" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="9">
              Wait 30 m
            </text>
            <text x="25" y="72" textAnchor="middle" fill="#64748b" fontSize="7">
              (60 kg bahan)
            </text>
          </g>
          {/* Safety Stock dekat antrean */}
          <g transform="translate(252, 336)">
            <path
              d="M 14,4 Q 16,1 18,6 L 24,24 Q 26,29 20,29 L 8,29 Q 2,29 4,24 L 10,6 Q 12,1 14,4 Z"
              fill="#fef3c7"
              stroke="#d97706"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <text x="14" y="23" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#92400e">
              S
            </text>
            <text x="14" y="40" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#d97706">
              SAFETY STOCK
            </text>
          </g>
          {/* Push Arrow P1 → Inventory */}
          <path
            d="M 220,286 L 234,286 L 234,280 L 250,286 L 234,292 Z"
            fill="#ffffff"
            stroke="#475569"
            strokeWidth="1.8"
          />
          <text x="227" y="308" textAnchor="middle" fontSize="6.5" fill="#475569" fontWeight="600">
            Push
          </text>
          {/* Push Arrow Inventory → P2 */}
          <path
            d="M 284,286 L 316,286 L 316,280 L 338,286 L 316,292 Z"
            fill="#ffffff"
            stroke="#475569"
            strokeWidth="1.8"
          />
          <text x="312" y="308" textAnchor="middle" fontSize="6.5" fill="#475569" fontWeight="600">
            Push (dorong batch)
          </text>

          {/* FIFO Lane antara P2-P3 */}
          <g transform="translate(548, 262)">
            <line x1="4" y1="14" x2="42" y2="14" stroke="#059669" strokeWidth="2" />
            <line x1="4" y1="30" x2="42" y2="30" stroke="#059669" strokeWidth="2" />
            <polygon points="42,8 54,22 42,36" fill="#059669" />
            <text x="22" y="25" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#047857">
              FIFO
            </text>
            <text x="29" y="46" textAnchor="middle" fontSize="6.5" fill="#047857">
              Max: 8 porsi
            </text>
          </g>

          {/* Supermarket setelah P3 */}
          <g transform="translate(837, 262)">
            <path d="M 4,34 L 4,4 L 42,4 L 42,34" fill="none" stroke="#0d9488" strokeWidth="3.2" />
            <line x1="4" y1="14" x2="36" y2="14" stroke="#0d9488" strokeWidth="2.5" />
            <line x1="4" y1="24" x2="36" y2="24" stroke="#0d9488" strokeWidth="2.5" />
            <text x="23" y="48" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#0d9488">
              SUPERMARKET
            </text>
          </g>

          {/* Material Pull: supermarket → P4 */}
          <path
            d="M 883,280 L 912,280 L 912,273 L 936,280 L 912,287 L 912,280 Z"
            fill="#ffffff"
            stroke="#0d9488"
            strokeWidth="2"
          />
          <text x="910" y="304" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0d9488">
            Material Pull (tarik sesuai kebutuhan)
          </text>

          {/* Signal Kanban di supermarket */}
          <g transform="translate(849, 232)">
            <rect width="30" height="34" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.8" rx="2" />
            <polygon points="15,6 23,19 7,19" fill="#dc2626" />
            <text x="15" y="29" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#991b1b">
              MIN
            </text>
            <line x1="15" y1="34" x2="15" y2="42" stroke="#dc2626" strokeWidth="1.4" />
          </g>
          <text x="879" y="220" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#dc2626">
            Signal Kanban
          </text>

          {/* Production Kanban: supermarket → P3 */}
          <g transform="translate(800, 296)">
            <rect width="26" height="32" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.8" rx="2" />
            <line x1="0" y1="8" x2="26" y2="8" stroke="#f59e0b" strokeWidth="1.4" />
            <text x="13" y="25" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#b45309">
              P
            </text>
            <line x1="0" y1="22" x2="-8" y2="22" stroke="#f59e0b" strokeWidth="1.6" markerEnd="url(#vsmf-arrow)" />
          </g>
          <text x="786" y="344" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#b45309">
            Prod. Kanban (isi ulang supermarket)
          </text>

          {/* Withdrawal Kanban pada panah tarik */}
          <g transform="translate(898, 240)">
            <rect width="28" height="32" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.8" rx="2" />
            <line x1="0" y1="8" x2="28" y2="8" stroke="#ea580c" strokeWidth="1.4" />
            <text x="14" y="25" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#c2410c">
              W
            </text>
            <line x1="14" y1="32" x2="14" y2="38" stroke="#ea580c" strokeWidth="1.4" />
          </g>
          <text x="912" y="232" textAnchor="start" fontSize="6.5" fontWeight="bold" fill="#c2410c">
            Withdrawal Kanban
          </text>

          {/* Kanban Post di bawah supermarket */}
          <g transform="translate(849, 322)">
            <rect x="-6" y="0" width="46" height="14" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.8" rx="2" />
            <rect x="-12" y="-22" width="12" height="22" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.4" rx="1" />
            <rect x="6" y="-26" width="12" height="26" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.4" rx="1" />
            <text x="17" y="26" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#a16207">
              KANBAN POST
            </text>
          </g>

          {/* ============================================================
              VERBAL INFO (P4 → CUSTOMER) + TIMELINE + SUMMARY
          ============================================================ */}
          <path
            d="M 1120,300 C 1190,240 1190,150 1120,95"
            fill="none"
            stroke="#db2777"
            strokeWidth="1.8"
            strokeDasharray="5 3"
            markerEnd="url(#vsmf-arrow)"
          />
          <g transform="translate(1156, 205)">
            <circle cx="0" cy="-6" r="3.5" fill="#db2777" />
            <path d="M -7,8 Q 0,0 7,8" fill="none" stroke="#db2777" strokeWidth="1.8" />
            <text x="12" y="4" fontSize="7" fontWeight="bold" fill="#db2777">
              Verbal Info (panggilan lisan)
            </text>
          </g>

          {/* Takt Time badge */}
          <g transform="translate(880, 122)">
            <rect width="150" height="24" rx="12" fill="#f0fdfa" stroke="#0f766e" strokeWidth="1.5" />
            <circle cx="14" cy="12" r="7" fill="none" stroke="#0f766e" strokeWidth="1.6" />
            <line x1="14" y1="12" x2="14" y2="7" stroke="#0f766e" strokeWidth="1.6" />
            <line x1="14" y1="12" x2="18" y2="14" stroke="#0f766e" strokeWidth="1.6" />
            <text x="28" y="16" fontSize="8.5" fontWeight="bold" fill="#0f766e">
              Takt Time = 3,5 mnt/porsi
            </text>
          </g>

          {/* External Shipment (truk) */}
          <path d="M 125,92 L 125,150 L 130,250" fill="none" stroke="#475569" strokeWidth="1.6" strokeDasharray="4 2" markerEnd="url(#vsmf-arrow)" />
          <g transform="translate(100, 138)">
            <rect x="2" y="4" width="24" height="12" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <path d="M 26,7 L 31,7 L 36,12 L 36,16 L 26,16 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <circle cx="9" cy="18" r="3.4" fill="#ffffff" stroke="#475569" strokeWidth="1.4" />
            <circle cx="31" cy="18" r="3.4" fill="#ffffff" stroke="#475569" strokeWidth="1.4" />
            <text x="30" y="2" fontSize="6.5" fontWeight="bold" fill="#475569">
              External Shipment
            </text>
          </g>

          {/* Kaizen Bursts */}
          {showKaizen && (
            <>
              <KaizenBurst x={272} y={202} title="Kurangi batch: digitalisasi nota" />
              <KaizenBurst x={548} y={182} title="Terapkan KDS (Kitchen Display)" />
              <KaizenBurst x={876} y={176} title="Atur ulang slot supermarket agar tidak kosong" />
            </>
          )}

          {/* ============================================================
              TIMELINE LADDER
          ============================================================ */}
          <g transform={`translate(0, ${timelineY})`}>
            <text x="10" y="-16" fill="#0f172a" fontWeight="bold" fontSize="10">
              TIMELINE LADDER (NVA di atas / VA di bawah):
            </text>

            {/* Segmen Wait (NVA) */}
            {waitSegs.map((seg, i) => (
              <g key={`w${i}`}>
                <line x1={seg.x1} y1={0} x2={seg.x2} y2={0} stroke="#dc2626" strokeWidth="2.5" />
                <line x1={seg.x2} y1={0} x2={seg.x2} y2={stepLadderHeight} stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
                <text x={(seg.x1 + seg.x2) / 2} y={-8} textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="10">
                  {seg.label}
                </text>
                <text x={(seg.x1 + seg.x2) / 2} y={-21} textAnchor="middle" fill="#991b1b" fontSize="7">
                  [Wait {seg.note}]
                </text>
              </g>
            ))}

            {/* Segmen Process (VA) */}
            {procSegs.map((seg, i) => (
              <g key={`p${i}`}>
                <line x1={seg.x1} y1={stepLadderHeight} x2={seg.x2} y2={stepLadderHeight} stroke="#16a34a" strokeWidth="3.5" />
                <text x={(seg.x1 + seg.x2) / 2} y={stepLadderHeight + 17} textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="10">
                  {seg.label}
                </text>
              </g>
            ))}
            <text x={1168} y={stepLadderHeight + 17} textAnchor="middle" fill="#166534" fontSize="7">
              [Process / VA]
            </text>

            {/* Summary Box */}
            <g transform="translate(1150, -38)">
              <rect width="88" height="116" fill="#f1f5f9" stroke="#334155" strokeWidth="1.5" rx="4" />
              <text x="44" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748b">
                TOTAL
              </text>
              <line x1="0" y1="22" x2="88" y2="22" stroke="#cbd5e1" />
              <text x="44" y="38" textAnchor="middle" fontSize="8" fill="#dc2626" fontWeight="bold">
                NVA (Wait)
              </text>
              <text x="44" y="54" textAnchor="middle" fontSize="13" fill="#dc2626" fontWeight="bold">
                75 m
              </text>
              <text x="44" y="72" textAnchor="middle" fontSize="8" fill="#16a34a" fontWeight="bold">
                VA (Proc)
              </text>
              <text x="44" y="88" textAnchor="middle" fontSize="13" fill="#16a34a" fontWeight="bold">
                29 m
              </text>
              <line x1="0" y1="94" x2="88" y2="94" stroke="#cbd5e1" />
              <text x="44" y="107" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#0f172a">
                PLT: 104 m
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* ============================================================
          TABEL: 29 NOTASI YANG DIPAKAI
      ============================================================ */}
      <section className="vsm-table-card">
        <h3>📋 Semua 29 Notasi VSM yang Dipakai di Case Ini</h3>
        <table className="vsm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Notasi</th>
              <th>Lokasi di Diagram</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Material Flow', 'Customer / Supplier Box', 'Supplier (kiri atas) & Mahasiswa (kanan atas)'],
              ['Material Flow', 'Process Box', '4 kotak proses P1–P4 (baris tengah)'],
              ['Material Flow', 'Data Box', 'Di bawah tiap kotak proses (PT, C/O, Operator, Batch)'],
              ['Material Flow', 'Inventory Triangle', 'Antara P1–P2: antrean 30 m / 60 kg bahan'],
              ['Material Flow', 'Push Arrow', 'P1 → antrean → P2 (dorong batch)'],
              ['Material Flow', 'FIFO Lane', 'Antara P2–P3: urutan ketat, Max 8 porsi'],
              ['Material Flow', 'Supermarket', 'Setelah P3: rak tarik (kanban stockpoint)'],
              ['Material Flow', 'Material Pull', 'Supermarket → P4 (tarik sesuai kebutuhan)'],
              ['Material Flow', 'Safety Stock', 'Dekat antrean P1: stok pengaman (S)'],
              ['Material Flow', 'External Shipment', 'Truk: supplier → P1 (pengiriman bahan)'],
              ['Material Flow', 'Workcell', 'P2: sel kerja persiapan terintegrasi'],
              ['Information Flow', 'Production Control', 'Kotak tengah atas (pusat kendali)'],
              ['Information Flow', 'Manual Info', 'Kontrol → P1 (jadwal nota kertas)'],
              ['Information Flow', 'Electronic Info', 'Customer ↔ Kontrol & Kontrol → Supplier (zigzag/EDI)'],
              ['Information Flow', 'Kanban Card (Production)', 'Kartu P: supermarket → P3 (isi ulang)'],
              ['Information Flow', 'Kanban Card (Withdrawal)', 'Kartu W: penarikan supermarket → P4'],
              ['Information Flow', 'Kanban Card (Signal)', 'Kartu MIN di supermarket (stok menipis)'],
              ['Information Flow', 'Kanban Post', 'Papan kartu di bawah supermarket'],
              ['Information Flow', 'Sequenced Pull', 'Heijunka → P3 (perintah urut tanpa supermarket)'],
              ['Information Flow', 'Load Leveling (Heijunka)', 'Kotak perata beban di bawah Production Control'],
              ['Information Flow', 'MRP / ERP', 'Sistem POS/EDI di dalam Production Control'],
              ['Information Flow', 'Go See', 'Ikon kacamata: observasi langsung lapangan'],
              ['Information Flow', 'Verbal Information', 'P4 → Customer (panggilan lisan)'],
              ['General & Kaizen', 'Kaizen Burst', '3 titik perbaikan: antrean, FIFO, supermarket'],
              ['General & Kaizen', 'Operator', 'Ikon ×n di tiap kotak proses (jumlah staf)'],
              ['Timeline & Metrics', 'Timeline Ladder', 'Tangga waktu bawah (NVA atas / VA bawah)'],
              ['Timeline & Metrics', 'Lead Time Summary Box', 'Kotak TOTAL kanan bawah (75+29=104 m)'],
              ['Timeline & Metrics', 'Takt Time', 'Badge 3,5 mnt/porsi (tempo produksi ideal)'],
            ].map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <strong>{row[1]}</strong>
                </td>
                <td className="muted-cell">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="vsm-table-note">
          📌 Total Wait 75 m + Total Process 29 m = PLT 104 m; PCE 27.9%. Alur cerita: demand
          digital masuk ke MRP/ERP → jadwal manual ke P1 → push batch → FIFO → supermarket →
          kanban menarik ke P4 → serah terima lisan ke pelanggan. Simbol-simbol baru dari
          riset notasi Lucidchart (Material Pull, Safety Stock, Workcell, Heijunka, dll.)
          semuanya terwakili di sini.
        </p>
      </section>
    </div>
  );
}