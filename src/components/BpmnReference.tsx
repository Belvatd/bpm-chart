import { useState } from 'react';
import {
  bpmnCategories,
  bpmnSymbolsList,
  type BpmnCategory,
  type BpmnSymbolItem,
} from '../data/bpmnSymbolsData';

// Komponen Pembantu Miniatur Simbol SVG
function SymbolIcon({ shapeType }: { shapeType: string }) {
  switch (shapeType) {
    case 'start-none':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
        </svg>
      );
    case 'start-timer':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="10" fill="none" stroke="#15803d" strokeWidth="1.5" />
          <polyline points="24,18 24,24 28,24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'start-message':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="18" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
          <rect x="15" y="18" width="18" height="12" fill="#ffffff" stroke="#15803d" strokeWidth="1.5" rx="1" />
          <polyline points="15,18 24,24 33,18" fill="none" stroke="#15803d" strokeWidth="1.5" />
        </svg>
      );
    case 'intermediate-timer':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="19" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <circle cx="24" cy="24" r="15" fill="none" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="9" fill="none" stroke="#b45309" strokeWidth="1.2" />
          <polyline points="24,19 24,24 27,24" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'end-none':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="#fee2e2" stroke="#dc2626" strokeWidth="4.5" />
        </svg>
      );
    case 'end-terminate':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="#fee2e2" stroke="#991b1b" strokeWidth="4.5" />
          <circle cx="24" cy="24" r="9" fill="#991b1b" />
        </svg>
      );
    case 'end-error':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="#fee2e2" stroke="#b91c1c" strokeWidth="4.5" />
          <polygon points="26,14 18,24 23,24 21,34 30,22 25,22" fill="#b91c1c" />
        </svg>
      );
    case 'task-user':
      return (
        <svg width="56" height="44" viewBox="0 0 56 44">
          <rect x="2" y="2" width="52" height="40" rx="6" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" />
          {/* Ikon User */}
          <circle cx="10" cy="10" r="3" fill="#2563eb" />
          <path d="M 6,18 C 6,14 14,14 14,18" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        </svg>
      );
    case 'task-manual':
      return (
        <svg width="56" height="44" viewBox="0 0 56 44">
          <rect x="2" y="2" width="52" height="40" rx="6" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
          {/* Ikon Tangan */}
          <path d="M 8,16 L 8,11 C 8,9.5 10,9.5 10,11 L 10,16 M 10,11 C 10,9.5 12,9.5 12,11 L 12,16 M 12,12 C 12,10.5 14,10.5 14,12 L 14,17" fill="none" stroke="#475569" strokeWidth="1.2" />
        </svg>
      );
    case 'task-service':
      return (
        <svg width="56" height="44" viewBox="0 0 56 44">
          <rect x="2" y="2" width="52" height="40" rx="6" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
          {/* Ikon Gear Roda Gigi */}
          <circle cx="10" cy="11" r="3" fill="none" stroke="#0284c7" strokeWidth="2" />
          <circle cx="10" cy="11" r="5" fill="none" stroke="#0284c7" strokeWidth="1" strokeDasharray="2 1" />
        </svg>
      );
    case 'task-message':
      return (
        <svg width="56" height="44" viewBox="0 0 56 44">
          <rect x="2" y="2" width="52" height="40" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" />
          <rect x="6" y="6" width="10" height="7" fill="#6366f1" rx="1" />
          <polyline points="6,6 11,10 16,6" fill="none" stroke="#ffffff" strokeWidth="1" />
        </svg>
      );
    case 'task-sub':
      return (
        <svg width="56" height="44" viewBox="0 0 56 44">
          <rect x="2" y="2" width="52" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" strokeWidth="2" />
          {/* Kotak [+] di bawah */}
          <rect x="23" y="32" width="10" height="8" fill="#ffffff" stroke="#4f46e5" strokeWidth="1" />
          <text x="28" y="39" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4f46e5">+</text>
        </svg>
      );
    case 'gateway-exclusive':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <polygon points="24,3 45,24 24,45 3,24" fill="#fffbeb" stroke="#d97706" strokeWidth="2.5" />
          <line x1="17" y1="17" x2="31" y2="31" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
          <line x1="31" y1="17" x2="17" y2="31" stroke="#b45309" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'gateway-parallel':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <polygon points="24,3 45,24 24,45 3,24" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
          <line x1="24" y1="14" x2="24" y2="34" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="14" y1="24" x2="34" y2="24" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case 'gateway-inclusive':
      return (
        <svg width="48" height="48" viewBox="0 0 48 48">
          <polygon points="24,3 45,24 24,45 3,24" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2.5" />
          <circle cx="24" cy="24" r="8" fill="none" stroke="#6d28d9" strokeWidth="3" />
        </svg>
      );
    case 'flow-sequence':
      return (
        <svg width="56" height="30" viewBox="0 0 56 30">
          <line x1="4" y1="15" x2="44" y2="15" stroke="#1e293b" strokeWidth="2.5" />
          <polygon points="44,10 54,15 44,20" fill="#1e293b" />
        </svg>
      );
    case 'flow-message':
      return (
        <svg width="56" height="30" viewBox="0 0 56 30">
          <circle cx="7" cy="15" r="3" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="11" y1="15" x2="44" y2="15" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" />
          <polygon points="44,10 53,15 44,20" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
        </svg>
      );
    case 'swimlane-pool':
      return (
        <svg width="56" height="38" viewBox="0 0 56 38">
          <rect x="2" y="2" width="52" height="34" fill="#f0fdf4" stroke="#047857" strokeWidth="1.5" />
          <rect x="2" y="2" width="12" height="34" fill="#047857" />
          <text x="8" y="22" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="bold">P</text>
        </svg>
      );
    case 'swimlane-lane':
      return (
        <svg width="56" height="38" viewBox="0 0 56 38">
          <rect x="2" y="2" width="52" height="34" fill="#f0f9ff" stroke="#0369a1" strokeWidth="1.5" />
          <line x1="2" y1="19" x2="54" y2="19" stroke="#0369a1" strokeWidth="1" strokeDasharray="3 2" />
          <text x="8" y="13" fill="#0369a1" fontSize="7" fontWeight="bold">L1</text>
          <text x="8" y="30" fill="#0369a1" fontSize="7" fontWeight="bold">L2</text>
        </svg>
      );
    case 'data-object':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <path d="M 10,4 L 28,4 L 36,12 L 36,40 L 10,40 Z" fill="#fffbeb" stroke="#b45309" strokeWidth="1.8" />
          <polyline points="28,4 28,12 36,12" fill="#fed7aa" stroke="#b45309" strokeWidth="1.5" />
          <line x1="15" y1="18" x2="28" y2="18" stroke="#d97706" strokeWidth="1.5" />
          <line x1="15" y1="24" x2="31" y2="24" stroke="#d97706" strokeWidth="1.5" />
          <line x1="15" y1="30" x2="25" y2="30" stroke="#d97706" strokeWidth="1.5" />
        </svg>
      );
    case 'data-store':
      return (
        <svg width="44" height="44" viewBox="0 0 44 44">
          <ellipse cx="22" cy="10" rx="14" ry="5" fill="#fffbeb" stroke="#b45309" strokeWidth="1.8" />
          <path d="M 8,10 L 8,30 C 8,33 36,33 36,30 L 36,10" fill="#fffbeb" stroke="#b45309" strokeWidth="1.8" />
          <path d="M 8,16 C 8,19 36,19 36,16" fill="none" stroke="#b45309" strokeWidth="1.5" />
          <path d="M 8,23 C 8,26 36,26 36,23" fill="none" stroke="#b45309" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
  }
}

export function BpmnReference() {
  const [selectedCategory, setSelectedCategory] = useState<BpmnCategory | 'All'>('All');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeItem, setActiveItem] = useState<BpmnSymbolItem | null>(null);

  // Filter logika
  const filteredSymbols = bpmnSymbolsList.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchKeyword =
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.officialName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.example.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <div className="reference-container">
      <header className="reference-header">
        <div>
          <h2>Kamus Notasi &amp; Simbol Standar BPMN 2.0</h2>
          <p>
            Panduan lengkap memahami arti setiap bentuk simbol alur proses bisnis dengan bahasa santai, jelas, dan analogi praktis.
          </p>
        </div>
      </header>

      {/* Bar Kontrol: Filter Kategori & Kotak Pencarian */}
      <div className="reference-controls">
        <div className="search-box-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari simbol, nama, atau contoh kasus (cth: exclusive, koki, kembalian, timer)..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          {searchKeyword && (
            <button className="clear-search-btn" onClick={() => setSearchKeyword('')}>
              ✕
            </button>
          )}
        </div>

        <div className="filter-chips-wrapper">
          {bpmnCategories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabel Notasi BPMN Lengkap */}
      <div className="table-responsive">
        <table className="bpmn-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Bentuk Simbol</th>
              <th style={{ width: '220px' }}>Nama Notasi</th>
              <th style={{ width: '150px' }}>Kategori</th>
              <th>Penjelasan Mudah Dipahami &amp; Analogi</th>
              <th>Contoh Nyata (Operasional / QuickBite)</th>
              <th style={{ width: '80px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredSymbols.length > 0 ? (
              filteredSymbols.map((item) => (
                <tr key={item.id} className="bpmn-row">
                  {/* Kolom 1: Bentuk Simbol SVG */}
                  <td className="symbol-cell" align="center">
                    <div className="symbol-preview-wrapper" title={item.officialName}>
                      <SymbolIcon shapeType={item.shapeType} />
                    </div>
                  </td>

                  {/* Kolom 2: Nama Notasi */}
                  <td>
                    <strong className="symbol-title">{item.name}</strong>
                    <span className="symbol-official"><code>{item.officialName}</code></span>
                  </td>

                  {/* Kolom 3: Kategori Badge */}
                  <td>
                    <span
                      className="category-pill"
                      style={{
                        backgroundColor: `${item.badgeColor}18`,
                        color: item.badgeColor,
                        borderColor: `${item.badgeColor}40`,
                      }}
                    >
                      {item.categoryLabel}
                    </span>
                  </td>

                  {/* Kolom 4: Penjelasan Mudah & Analogi */}
                  <td>
                    <p className="explanation-text">{item.simpleExplanation}</p>
                    <div className="analogy-box">
                      <span className="analogy-tag">💡 Analogi:</span> {item.analogy}
                    </div>
                  </td>

                  {/* Kolom 5: Contoh Nyata */}
                  <td>
                    <div className="example-box">
                      <strong>Contoh Kasus:</strong>
                      <p>{item.example}</p>
                    </div>
                  </td>

                  {/* Kolom 6: Tombol Detail Tips */}
                  <td align="center">
                    <button
                      className="detail-action-btn"
                      onClick={() => setActiveItem(item)}
                      title="Lihat tips aturan pemodelan"
                    >
                      Tips ℹ️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} align="center" className="empty-search-cell">
                  Tidak ditemukan simbol yang sesuai dengan kata kunci "<strong>{searchKeyword}</strong>".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tips Aturan Pemodelan BPMN */}
      {activeItem && (
        <div className="reference-modal-backdrop" onClick={() => setActiveItem(null)}>
          <div className="reference-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span
                className="category-pill"
                style={{
                  backgroundColor: `${activeItem.badgeColor}18`,
                  color: activeItem.badgeColor,
                  borderColor: `${activeItem.badgeColor}40`,
                }}
              >
                {activeItem.categoryLabel}
              </span>
              <button className="close-btn" onClick={() => setActiveItem(null)}>✕</button>
            </div>

            <div className="modal-symbol-preview">
              <SymbolIcon shapeType={activeItem.shapeType} />
              <div>
                <h3>{activeItem.name}</h3>
                <code>{activeItem.officialName}</code>
              </div>
            </div>

            <div className="modal-section">
              <h4>🎯 Kapan Harus Digunakan?</h4>
              <p>{activeItem.simpleExplanation}</p>
            </div>

            <div className="modal-section">
              <h4>🔍 Contoh Penerapan Praktis:</h4>
              <p>{activeItem.example}</p>
            </div>

            {activeItem.tips && (
              <div className="modal-tips-box">
                <strong>⚠️ Aturan &amp; Tips Praktis BPMN:</strong>
                <p>{activeItem.tips}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
