import { useState } from 'react';
import { defaultFishboneData, type FishboneCause } from '../data/fishboneData';

export function FishboneDiagram() {
  const [data] = useState(defaultFishboneData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeCause, setActiveCause] = useState<{ category: string; cause: FishboneCause } | null>(null);

  const topCategories = data.categories.filter((c) => c.position === 'top');
  const bottomCategories = data.categories.filter((c) => c.position === 'bottom');

  // Koordinat tulang utama (Spine)
  const spineY = 390;
  const spineStartX = 50;
  const spineEndX = 980;

  // Titik temu tulang cabang pada Spine (X values)
  const ribSpineX = [330, 630, 930];

  return (
    <div className="fishbone-container">
      <header className="fishbone-header">
        <div>
          <h2>Diagram Fishbone (Ishikawa 6M)</h2>
          <p>Analisis Akar Masalah: Kesalahan Penyajian Menu Makanan di Kantin Kampus</p>
        </div>
        <div className="fishbone-actions">
          {selectedCategory && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="btn btn-secondary"
            >
              🔄 Tampilkan Semua Kategori
            </button>
          )}
        </div>
      </header>

      {/* Filter Kategori Bar */}
      <div className="category-filter-bar">
        <span>Sorot Kategori 6M:</span>
        <div className="filter-chips">
          {data.categories.map((cat) => (
            <button
              key={cat.id}
              className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{
                borderColor: cat.color,
                backgroundColor: selectedCategory === cat.id ? cat.color : 'transparent',
                color: selectedCategory === cat.id ? '#ffffff' : cat.color,
              }}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
              }
            >
              {cat.englishName} ({cat.name})
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Diagram */}
      <div className="svg-wrapper">
        <svg
          viewBox="0 0 1350 780"
          className="fishbone-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="spine-arrow"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#1e293b" />
            </marker>
            <filter id="card-shadow" x="-5%" y="-5%" width="115%" height="115%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* Ekor Ikan (Fish Tail) */}
          <polygon
            points={`${spineStartX},${spineY} ${spineStartX - 35},${spineY - 60} ${spineStartX - 20},${spineY} ${spineStartX - 35},${spineY + 60}`}
            fill="#cbd5e1"
            stroke="#94a3b8"
            strokeWidth="2"
          />

          {/* Tulang Belakang Utama (Main Spine) */}
          <line
            x1={spineStartX}
            y1={spineY}
            x2={spineEndX}
            y2={spineY}
            stroke="#1e293b"
            strokeWidth="5"
            strokeLinecap="round"
            markerEnd="url(#spine-arrow)"
          />

          {/* Kepala Ikan / Kotak Masalah Utama (Fish Head - Problem) */}
          <g transform={`translate(${spineEndX + 15}, ${spineY - 80})`}>
            {/* Bentuk Segitiga / Poligon Kepala Ikan */}
            <path
              d="M 0,80 L 40,0 L 290,0 Q 310,80 290,160 L 40,160 Z"
              fill="#fef2f2"
              stroke="#ef4444"
              strokeWidth="2.5"
              filter="url(#card-shadow)"
            />
            <text x="160" y="30" textAnchor="middle" fill="#b91c1c" fontWeight="bold" fontSize="13">
              ⚠️ PROBLEM STATEMENT (EFFECT)
            </text>
            <foreignObject x="35" y="40" width="245" height="110">
              <div
                style={{
                  fontSize: '12px',
                  lineHeight: '1.4',
                  color: '#1f2937',
                  fontWeight: 500,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                "{data.problem}"
              </div>
            </foreignObject>
          </g>

          {/* Render 3 Cabang Atas (Man, Method, Machine) */}
          {topCategories.map((cat, idx) => {
            const connectX = ribSpineX[idx];
            const endX = connectX - 140;
            const endY = 80;
            const isDimmed = selectedCategory && selectedCategory !== cat.id;

            return (
              <g
                key={cat.id}
                opacity={isDimmed ? 0.2 : 1}
                style={{ transition: 'opacity 0.25s ease' }}
              >
                {/* Garis Tulang Cabang (Rib Line) */}
                <line
                  x1={connectX}
                  y1={spineY}
                  x2={endX}
                  y2={endY}
                  stroke={cat.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Badge Header Kategori */}
                <g transform={`translate(${endX - 90}, ${endY - 45})`}>
                  <rect
                    width="180"
                    height="40"
                    rx="8"
                    fill={cat.color}
                    filter="url(#card-shadow)"
                  />
                  <text
                    x="90"
                    y="25"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontWeight="bold"
                    fontSize="14"
                  >
                    {cat.englishName} ({cat.name})
                  </text>
                </g>

                {/* Sub-Causes (Ranting Penyebab) */}
                {cat.causes.map((cause, cIdx) => {
                  // Hitung posisi percabangan pada garis rib (antara connectX,spineY dan endX,endY)
                  const factor = (cIdx + 1) / (cat.causes.length + 1);
                  const branchX = connectX - (connectX - endX) * factor;
                  const branchY = spineY - (spineY - endY) * factor;
                  const lineLength = 170;
                  const subEndX = branchX - lineLength;

                  return (
                    <g
                      key={cIdx}
                      className="cause-node"
                      onClick={() => setActiveCause({ category: cat.name, cause })}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Garis Sub-branch horizontal */}
                      <line
                        x1={branchX}
                        y1={branchY}
                        x2={subEndX}
                        y2={branchY}
                        stroke={cat.color}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      <circle cx={branchX} cy={branchY} r="4" fill={cat.color} />

                      {/* Card Penyebab */}
                      <foreignObject
                        x={subEndX - 15}
                        y={branchY - 42}
                        width="185"
                        height="40"
                      >
                        <div
                          className="cause-box"
                          style={{ borderLeftColor: cat.color }}
                          title={cause.detail}
                        >
                          <span>{cause.text}</span>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Render 3 Cabang Bawah (Material, Measurement, Environment) */}
          {bottomCategories.map((cat, idx) => {
            const connectX = ribSpineX[idx];
            const endX = connectX - 140;
            const endY = 700;
            const isDimmed = selectedCategory && selectedCategory !== cat.id;

            return (
              <g
                key={cat.id}
                opacity={isDimmed ? 0.2 : 1}
                style={{ transition: 'opacity 0.25s ease' }}
              >
                {/* Garis Tulang Cabang (Rib Line) */}
                <line
                  x1={connectX}
                  y1={spineY}
                  x2={endX}
                  y2={endY}
                  stroke={cat.color}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Badge Header Kategori */}
                <g transform={`translate(${endX - 90}, ${endY + 5})`}>
                  <rect
                    width="180"
                    height="40"
                    rx="8"
                    fill={cat.color}
                    filter="url(#card-shadow)"
                  />
                  <text
                    x="90"
                    y="25"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontWeight="bold"
                    fontSize="14"
                  >
                    {cat.englishName} ({cat.name})
                  </text>
                </g>

                {/* Sub-Causes (Ranting Penyebab) */}
                {cat.causes.map((cause, cIdx) => {
                  const factor = (cIdx + 1) / (cat.causes.length + 1);
                  const branchX = connectX - (connectX - endX) * factor;
                  const branchY = spineY + (endY - spineY) * factor;
                  const lineLength = 170;
                  const subEndX = branchX - lineLength;

                  return (
                    <g
                      key={cIdx}
                      className="cause-node"
                      onClick={() => setActiveCause({ category: cat.name, cause })}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Garis Sub-branch horizontal */}
                      <line
                        x1={branchX}
                        y1={branchY}
                        x2={subEndX}
                        y2={branchY}
                        stroke={cat.color}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                      />
                      <circle cx={branchX} cy={branchY} r="4" fill={cat.color} />

                      {/* Card Penyebab */}
                      <foreignObject
                        x={subEndX - 15}
                        y={branchY + 3}
                        width="185"
                        height="40"
                      >
                        <div
                          className="cause-box"
                          style={{ borderLeftColor: cat.color }}
                          title={cause.detail}
                        >
                          <span>{cause.text}</span>
                        </div>
                      </foreignObject>
                    </g>
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Modal / Panel Rincian Akar Masalah */}
      {activeCause && (
        <div className="cause-modal-backdrop" onClick={() => setActiveCause(null)}>
          <div className="cause-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span className="badge">Kategori: {activeCause.category}</span>
              <button
                className="close-btn"
                onClick={() => setActiveCause(null)}
              >
                ✕
              </button>
            </div>
            <h3>{activeCause.cause.text}</h3>
            <p className="modal-body">{activeCause.cause.detail}</p>
            <div className="modal-footer">
              <small>Metodologi: Lean Six Sigma - Root Cause Analysis (Ishikawa 6M)</small>
            </div>
          </div>
        </div>
      )}

      {/* Ringkasan Tabel 6M */}
      <section className="fishbone-matrix">
        <h3>Tabel Pemetaan Akar Masalah 6M (Root Cause Summary)</h3>
        <div className="matrix-grid">
          {data.categories.map((cat) => (
            <div
              key={cat.id}
              className="matrix-card"
              style={{ borderTopColor: cat.color }}
            >
              <div className="matrix-header" style={{ color: cat.color }}>
                <strong>{cat.englishName}</strong>
                <span>({cat.name})</span>
              </div>
              <ul>
                {cat.causes.map((c, i) => (
                  <li key={i}>{c.detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
