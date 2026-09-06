import { useState } from 'react';
import {
  vsmCategoriesList,
  vsmSymbolsList,
  type VsmCategory,
  type VsmSymbolItem,
} from '../data/vsmSymbolsData';

// Miniatur Simbol SVG Standar VSM Lucidchart & Lean
function VsmSymbolIcon({ shapeType }: { shapeType: string }) {
  switch (shapeType) {
    // 1. Process Symbols
    case 'vsm-customer-box':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <polygon points="6,12 14,4 22,12 30,4 38,12 46,4 54,12" fill="#2563eb" />
          <rect x="6" y="12" width="48" height="26" fill="#eff6ff" stroke="#2563eb" strokeWidth="2" rx="2" />
          <text x="30" y="28" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#1e3a8a">CUST/SUPP</text>
        </svg>
      );
    case 'vsm-process-box':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <rect x="4" y="4" width="48" height="34" fill="#ffffff" stroke="#1e293b" strokeWidth="2" rx="3" />
          <rect x="4" y="4" width="48" height="11" fill="#1e293b" rx="2" />
          <text x="28" y="12" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff">PROCESS</text>
          <text x="28" y="27" textAnchor="middle" fontSize="7" fill="#475569">Operasi</text>
        </svg>
      );
    case 'vsm-shared-process':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <rect x="2" y="3" width="52" height="36" fill="#ffffff" stroke="#475569" strokeWidth="2" rx="3" />
          <line x1="2" y1="12" x2="54" y2="12" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="3" x2="12" y2="39" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="44" y1="3" x2="44" y2="39" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
          <text x="28" y="10" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#334155">SHARED</text>
          <text x="28" y="27" textAnchor="middle" fontSize="6.5" fill="#64748b">Bersama</text>
        </svg>
      );
    case 'vsm-data-box':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <rect x="4" y="3" width="48" height="36" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" rx="2" />
          <line x1="4" y1="15" x2="52" y2="15" stroke="#cbd5e1" />
          <line x1="4" y1="27" x2="52" y2="27" stroke="#cbd5e1" />
          <text x="7" y="12" fontSize="6" fontWeight="bold" fill="#0284c7">C/T = 8m</text>
          <text x="7" y="23" fontSize="6" fill="#64748b">C/O = 0m</text>
          <text x="7" y="35" fontSize="6" fill="#64748b">1 Shift</text>
        </svg>
      );
    case 'vsm-workcell':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <path
            d="M 6,4 H 50 A 4,4 0 0 1 54,8 V 36 A 4,4 0 0 1 50,40 H 40 A 3,3 0 0 1 37,37 V 20 A 3,3 0 0 0 34,17 H 22 A 3,3 0 0 0 19,20 V 37 A 3,3 0 0 1 16,40 H 6 A 4,4 0 0 1 2,36 V 8 A 4,4 0 0 1 6,4 Z"
            fill="#eff6ff"
            stroke="#1d4ed8"
            strokeWidth="1.8"
          />
          <text x="28" y="13" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1e3a8a">Workcell</text>
        </svg>
      );

    // 2. Material Symbols
    case 'vsm-inventory-triangle':
      return (
        <svg width="48" height="42" viewBox="0 0 48 42">
          <polygon points="24,2 4,38 44,38" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
          <text x="24" y="31" textAnchor="middle" fontWeight="bold" fill="#854d0e" fontSize="16">I</text>
        </svg>
      );
    case 'vsm-shipments':
      return (
        <svg width="56" height="34" viewBox="0 0 56 34">
          <path d="M 4,12 L 36,12 L 36,6 L 52,17 L 36,28 L 36,22 L 4,22 Z" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
          <text x="22" y="10" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#15803d">SHIP</text>
        </svg>
      );
    case 'vsm-push-arrow':
      return (
        <svg width="56" height="32" viewBox="0 0 56 32">
          <path d="M 4,11 L 36,11 L 36,5 L 52,16 L 36,27 L 36,21 L 4,21 Z" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
          <line x1="12" y1="11" x2="12" y2="21" stroke="#475569" strokeWidth="1.8" />
          <line x1="20" y1="11" x2="20" y2="21" stroke="#475569" strokeWidth="1.8" />
          <line x1="28" y1="11" x2="28" y2="21" stroke="#475569" strokeWidth="1.8" />
        </svg>
      );
    case 'vsm-supermarket':
      return (
        <svg width="48" height="40" viewBox="0 0 48 40">
          <path d="M 6,36 L 6,6 L 42,6 L 42,36" fill="none" stroke="#0d9488" strokeWidth="3" />
          <line x1="6" y1="16" x2="36" y2="16" stroke="#0d9488" strokeWidth="2.5" />
          <line x1="6" y1="26" x2="36" y2="26" stroke="#0d9488" strokeWidth="2.5" />
        </svg>
      );
    case 'vsm-material-pull':
      return (
        <svg width="56" height="30" viewBox="0 0 56 30">
          <path d="M 4,15 L 38,15 L 38,8 L 52,15 L 38,22 L 38,15 Z" fill="#ffffff" stroke="#0d9488" strokeWidth="2.2" />
        </svg>
      );
    case 'vsm-fifo-lane':
      return (
        <svg width="56" height="32" viewBox="0 0 56 32">
          <line x1="4" y1="8" x2="42" y2="8" stroke="#059669" strokeWidth="2" />
          <line x1="4" y1="24" x2="42" y2="24" stroke="#059669" strokeWidth="2" />
          <polygon points="42,4 52,16 42,28" fill="#059669" />
          <text x="22" y="19" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#047857">FIFO</text>
        </svg>
      );
    case 'vsm-safety-stock':
      return (
        <svg width="48" height="42" viewBox="0 0 48 42">
          <path d="M 24,6 Q 26,3 29,8 L 40,31 Q 42,36 36,36 L 12,36 Q 6,36 8,31 L 19,8 Q 22,3 24,6 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
          <text x="24" y="31" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#92400e">S</text>
        </svg>
      );
    case 'vsm-external-shipment':
      return (
        <svg width="56" height="34" viewBox="0 0 56 34">
          <path d="M 4,10 L 34,10 L 34,24 L 4,24 Z" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
          <path d="M 34,13 L 42,13 L 46,19 L 46,24 L 34,24 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <circle cx="12" cy="26" r="4" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
          <circle cx="40" cy="26" r="4" fill="#ffffff" stroke="#475569" strokeWidth="1.8" />
        </svg>
      );

    // 3. Information Symbols
    case 'vsm-control-box':
      return (
        <svg width="56" height="42" viewBox="0 0 56 42">
          <rect x="4" y="4" width="48" height="34" fill="#f8fafc" stroke="#4f46e5" strokeWidth="2" rx="3" />
          <text x="28" y="18" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#312e81">CONTROL</text>
          <text x="28" y="30" textAnchor="middle" fontSize="6" fill="#6366f1">Pusat Jadwal</text>
        </svg>
      );
    case 'vsm-manual-info':
      return (
        <svg width="56" height="30" viewBox="0 0 56 30">
          <line x1="4" y1="15" x2="44" y2="15" stroke="#64748b" strokeWidth="2" />
          <polygon points="44,10 52,15 44,20" fill="#64748b" />
          <text x="25" y="11" textAnchor="middle" fontSize="6.5" fill="#64748b">Nota / Memo</text>
        </svg>
      );
    case 'vsm-electronic-info':
      return (
        <svg width="56" height="32" viewBox="0 0 56 32">
          <polyline points="4,16 16,8 24,24 36,8 44,18" fill="none" stroke="#2563eb" strokeWidth="2.2" />
          <polygon points="43,13 52,21 41,23" fill="#2563eb" />
          <text x="26" y="30" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#2563eb">EDI / Data</text>
        </svg>
      );
    case 'vsm-production-kanban':
      return (
        <svg width="40" height="44" viewBox="0 0 40 44">
          <rect x="6" y="4" width="28" height="36" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" rx="3" />
          <line x1="6" y1="14" x2="34" y2="14" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="20" y="31" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#b45309">P</text>
        </svg>
      );
    case 'vsm-withdrawal-kanban':
      return (
        <svg width="40" height="44" viewBox="0 0 40 44">
          <rect x="6" y="4" width="28" height="36" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" rx="3" />
          <line x1="6" y1="14" x2="34" y2="14" stroke="#ea580c" strokeWidth="1.5" />
          <text x="20" y="31" textAnchor="middle" fontWeight="bold" fontSize="11" fill="#c2410c">W</text>
        </svg>
      );
    case 'vsm-signal-kanban':
      return (
        <svg width="40" height="44" viewBox="0 0 40 44">
          <rect x="6" y="4" width="28" height="36" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" rx="3" />
          <polygon points="20,12 28,26 12,26" fill="#dc2626" />
          <text x="20" y="35" textAnchor="middle" fontWeight="bold" fontSize="6" fill="#991b1b">MIN</text>
        </svg>
      );
    case 'vsm-kanban-post':
      return (
        <svg width="48" height="42" viewBox="0 0 48 42">
          <rect x="4" y="22" width="40" height="16" fill="#fefce8" stroke="#ca8a04" strokeWidth="2" rx="2" />
          <rect x="10" y="10" width="10" height="14" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.6" rx="1" />
          <rect x="24" y="6" width="10" height="18" fill="#ffffff" stroke="#ca8a04" strokeWidth="1.6" rx="1" />
        </svg>
      );
    case 'vsm-sequenced-pull':
      return (
        <svg width="52" height="34" viewBox="0 0 52 34">
          <rect x="4" y="4" width="14" height="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" rx="2" />
          <text x="11" y="15" textAnchor="middle" fontWeight="bold" fontSize="9" fill="#15803d">1</text>
          <rect x="24" y="4" width="14" height="14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.8" rx="2" />
          <text x="31" y="15" textAnchor="middle" fontWeight="bold" fontSize="9" fill="#15803d">2</text>
          <line x1="18" y1="11" x2="24" y2="11" stroke="#16a34a" strokeWidth="1.6" />
          <line x1="38" y1="11" x2="48" y2="11" stroke="#16a34a" strokeWidth="2" />
          <polygon points="48,6 52,11 48,16" fill="#16a34a" />
        </svg>
      );
    case 'vsm-load-leveling':
      return (
        <svg width="52" height="42" viewBox="0 0 52 42">
          <rect x="4" y="6" width="44" height="30" fill="#eef2ff" stroke="#6366f1" strokeWidth="2" rx="2" />
          <line x1="15" y1="6" x2="15" y2="36" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="26" y1="6" x2="26" y2="36" stroke="#6366f1" strokeWidth="1.2" />
          <line x1="37" y1="6" x2="37" y2="36" stroke="#6366f1" strokeWidth="1.2" />
          <rect x="7" y="12" width="6" height="10" fill="#6366f1" />
          <rect x="18" y="12" width="6" height="14" fill="#818cf8" />
          <rect x="29" y="12" width="6" height="8" fill="#a5b4fc" />
        </svg>
      );
    case 'vsm-mrp-erp':
      return (
        <svg width="52" height="40" viewBox="0 0 52 40">
          <rect x="6" y="4" width="40" height="26" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="2" rx="3" />
          <rect x="10" y="8" width="32" height="17" fill="#ffffff" stroke="#7c3aed" strokeWidth="1.2" />
          <line x1="10" y1="13" x2="42" y2="13" stroke="#c4b5fd" strokeWidth="6" />
          <line x1="10" y1="19" x2="34" y2="19" stroke="#ddd6fe" strokeWidth="4" />
          <rect x="18" y="32" width="16" height="3" fill="#7c3aed" />
          <rect x="22" y="35" width="8" height="3" fill="#7c3aed" />
        </svg>
      );
    case 'vsm-go-see':
      return (
        <svg width="48" height="30" viewBox="0 0 48 30">
          <circle cx="12" cy="15" r="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="36" cy="15" r="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="20" y1="15" x2="28" y2="15" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="4" y1="13" x2="4" y2="8" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="44" y1="13" x2="44" y2="8" stroke="#0284c7" strokeWidth="2.5" />
        </svg>
      );
    case 'vsm-verbal-info':
      return (
        <svg width="56" height="32" viewBox="0 0 56 32">
          <path d="M 4,22 Q 16,8 30,22 Q 38,30 48,22" fill="none" stroke="#db2777" strokeWidth="2" strokeDasharray="4 3" />
          <circle cx="42" cy="8" r="3.5" fill="#db2777" />
          <path d="M 36,20 Q 42,13 48,20" fill="none" stroke="#db2777" strokeWidth="2" />
        </svg>
      );

    // 4. General Symbols
    case 'vsm-kaizen-burst':
      return (
        <svg width="52" height="42" viewBox="0 0 52 42">
          <polygon
            points="26,2 32,13 44,8 39,20 50,28 37,31 36,41 26,33 16,41 15,31 2,28 13,20 8,8 20,13"
            fill="#ea580c"
            stroke="#c2410c"
            strokeWidth="1.5"
          />
          <text x="26" y="24" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#ffffff">KAIZEN</text>
        </svg>
      );
    case 'vsm-operator':
      return (
        <svg width="44" height="42" viewBox="0 0 44 42">
          <circle cx="22" cy="13" r="7" fill="#f1f5f9" stroke="#0f766e" strokeWidth="2" />
          <path d="M 8,36 C 8,25 36,25 36,36" fill="#f1f5f9" stroke="#0f766e" strokeWidth="2" />
        </svg>
      );
    case 'vsm-timeline':
    case 'vsm-timeline-ladder':
      return (
        <svg width="56" height="36" viewBox="0 0 56 36">
          <line x1="4" y1="8" x2="22" y2="8" stroke="#dc2626" strokeWidth="2.5" />
          <line x1="22" y1="8" x2="22" y2="26" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="22" y1="26" x2="44" y2="26" stroke="#16a34a" strokeWidth="2.5" />
          <line x1="44" y1="26" x2="44" y2="8" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 1" />
          <line x1="44" y1="8" x2="54" y2="8" stroke="#dc2626" strokeWidth="2.5" />
          <text x="13" y="6" textAnchor="middle" fontSize="5" fill="#dc2626" fontWeight="bold">NVA</text>
          <text x="33" y="34" textAnchor="middle" fontSize="5" fill="#16a34a" fontWeight="bold">VA</text>
        </svg>
      );
    case 'vsm-transportation':
      return (
        <svg width="56" height="36" viewBox="0 0 56 36">
          <rect x="6" y="10" width="44" height="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" rx="3" />
          <circle cx="16" cy="28" r="3.5" fill="#0284c7" />
          <circle cx="40" cy="28" r="3.5" fill="#0284c7" />
          <rect x="12" y="14" width="8" height="6" fill="#bae6fd" />
          <rect x="24" y="14" width="8" height="6" fill="#bae6fd" />
          <rect x="36" y="14" width="8" height="6" fill="#bae6fd" />
        </svg>
      );
    case 'vsm-forklift':
      return (
        <svg width="52" height="38" viewBox="0 0 52 38">
          <circle cx="14" cy="30" r="4" fill="#334155" />
          <circle cx="28" cy="30" r="4" fill="#334155" />
          <path d="M 8,26 L 8,16 L 22,16 L 30,26 Z" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.8" />
          <line x1="36" y1="6" x2="36" y2="30" stroke="#334155" strokeWidth="2.5" />
          <line x1="36" y1="28" x2="48" y2="28" stroke="#334155" strokeWidth="2.5" />
        </svg>
      );
    case 'vsm-expedited':
      return (
        <svg width="56" height="32" viewBox="0 0 56 32">
          <path d="M 4,16 L 34,16 M 26,8 L 36,16 L 26,24" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 12,8 L 22,16 L 12,24" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="44" y="20" fontSize="7" fontWeight="bold" fill="#e11d48">EXP</text>
        </svg>
      );
    case 'vsm-milk-run':
      return (
        <svg width="52" height="38" viewBox="0 0 52 38">
          <circle cx="26" cy="19" r="14" fill="none" stroke="#0891b2" strokeWidth="2" strokeDasharray="4 2" />
          <polygon points="38,12 43,19 35,21" fill="#0891b2" />
          <rect x="18" y="14" width="16" height="10" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" rx="2" />
        </svg>
      );
    case 'vsm-warehouse':
      return (
        <svg width="52" height="42" viewBox="0 0 52 42">
          <polygon points="26,4 4,18 48,18" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
          <rect x="6" y="18" width="40" height="20" fill="#f8fafc" stroke="#64748b" strokeWidth="1.8" />
          <rect x="20" y="24" width="12" height="14" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.2" />
        </svg>
      );
    case 'vsm-cross-dock':
      return (
        <svg width="52" height="38" viewBox="0 0 52 38">
          <rect x="18" y="6" width="16" height="26" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.8" rx="2" />
          <line x1="4" y1="14" x2="18" y2="14" stroke="#0d9488" strokeWidth="2" />
          <polygon points="18,10 22,14 18,18" fill="#0d9488" />
          <line x1="34" y1="24" x2="48" y2="24" stroke="#0d9488" strokeWidth="2" />
          <polygon points="44,20 48,24 44,28" fill="#0d9488" />
        </svg>
      );
    case 'vsm-orders':
      return (
        <svg width="44" height="42" viewBox="0 0 44 42">
          <path d="M 8,4 L 28,4 L 36,12 L 36,38 L 8,38 Z" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.8" />
          <polygon points="28,4 28,12 36,12" fill="#c7d2fe" />
          <line x1="14" y1="18" x2="30" y2="18" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="14" y1="24" x2="30" y2="24" stroke="#6366f1" strokeWidth="1.5" />
          <line x1="14" y1="30" x2="24" y2="30" stroke="#6366f1" strokeWidth="1.5" />
        </svg>
      );
    case 'vsm-phone':
      return (
        <svg width="48" height="42" viewBox="0 0 48 42">
          <circle cx="24" cy="21" r="16" fill="#f3e8ff" stroke="#8b5cf6" strokeWidth="1.8" />
          <path d="M 17,14 C 18,17 21,21 24,24 C 27,27 31,28 32,27 L 30,23 L 26,22 L 24,24 C 22,22 20,20 18,18 L 20,16 L 19,12 Z" fill="#8b5cf6" />
        </svg>
      );
    case 'vsm-batched-kanban':
      return (
        <svg width="50" height="42" viewBox="0 0 50 42">
          <rect x="14" y="4" width="28" height="24" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" rx="2" />
          <rect x="9" y="9" width="28" height="24" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" rx="2" />
          <rect x="4" y="14" width="28" height="24" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.8" rx="2" />
          <text x="18" y="29" textAnchor="middle" fontWeight="bold" fontSize="10" fill="#b45309">B</text>
        </svg>
      );
    case 'vsm-control-center':
      return (
        <svg width="52" height="42" viewBox="0 0 52 42">
          <polygon points="26,3 46,14 46,32 26,39 6,32 6,14" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
          <line x1="26" y1="3" x2="26" y2="39" stroke="#93c5fd" strokeWidth="1.2" />
          <text x="26" y="24" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#1d4ed8">CTRL</text>
        </svg>
      );
    case 'vsm-quality-problem':
      return (
        <svg width="48" height="42" viewBox="0 0 48 42">
          <circle cx="24" cy="21" r="16" fill="#fef2f2" stroke="#ef4444" strokeWidth="2.2" />
          <line x1="16" y1="13" x2="32" y2="29" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
          <line x1="32" y1="13" x2="16" y2="29" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'vsm-solution-improvement':
      return (
        <svg width="56" height="40" viewBox="0 0 56 40">
          <path
            d="M 12,28 C 8,28 4,24 4,19 C 4,14 8,11 13,11 C 15,6 20,3 27,3 C 34,3 39,7 41,12 C 46,12 50,16 50,21 C 50,26 46,29 41,29 Z"
            fill="#ecfdf5"
            stroke="#10b981"
            strokeWidth="2"
          />
          <text x="26" y="20" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#047857">IDEA</text>
        </svg>
      );
    case 'vsm-other-info':
      return (
        <svg width="48" height="40" viewBox="0 0 48 40">
          <rect x="4" y="4" width="40" height="32" fill="#f8fafc" stroke="#64748b" strokeWidth="1.8" strokeDasharray="3 2" rx="3" />
          <circle cx="24" cy="9" r="2.5" fill="#ef4444" />
          <line x1="10" y1="17" x2="38" y2="17" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="10" y1="24" x2="32" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      );
    default:
      return (
        <svg width="44" height="40" viewBox="0 0 44 40">
          <rect x="4" y="4" width="36" height="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" rx="2" />
        </svg>
      );
  }
}

export function VsmReference() {
  const [selectedCategory, setSelectedCategory] = useState<VsmCategory | 'All'>('All');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeItem, setActiveItem] = useState<VsmSymbolItem | null>(null);

  // Filter logika
  const filteredSymbols = vsmSymbolsList.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchKeyword =
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.officialName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.lucidDefinition.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.example.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.leanSignificance.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <div className="reference-container">
      <header className="reference-header">
        <div>
          <h2>Kamus Notasi &amp; Simbol Value Stream Mapping (VSM)</h2>
          <p>
            Panduan lengkap <strong>41 Simbol Standar VSM</strong> yang diselaraskan langsung dengan{' '}
            <a
              href="https://lucid.co/diagram/vsm/value-stream-mapping-tutorial"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0284c7', textDecoration: 'underline', fontWeight: 600 }}
            >
              Panduan Resmi Lucidchart VSM Tutorial &amp; Symbols
            </a>
            . Dikelompokkan ke dalam 4 kategori resmi: <em>Process, Material, Information,</em> dan <em>General</em>.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
          <a
            href="/vsm_symbols_reference.csv"
            download="vsm_symbols_reference.csv"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'background-color 0.15s'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0369a1')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0284c7')}
          >
            📥 Download CSV (41 Simbol untuk Lucidchart / Excel)
          </a>
        </div>
      </header>

      {/* Bar Kontrol: Filter Kategori & Pencarian */}
      <div className="reference-controls">
        <div className="search-box-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari simbol VSM Lucidchart (cth: customer, dedicated process, shared, supermarket, kanban, milk run)..."
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
          {vsmCategoriesList.map((cat) => (
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

      {/* Tabel Notasi VSM Lengkap */}
      <div className="table-responsive">
        <table className="bpmn-table">
          <thead>
            <tr>
              <th style={{ width: '80px', textAlign: 'center' }}>Simbol</th>
              <th style={{ width: '220px' }}>Nama Simbol Lucidchart</th>
              <th style={{ width: '170px' }}>Kategori Lucidchart</th>
              <th>Definisi Resmi Lucidchart &amp; Penjelasan</th>
              <th>Contoh Kasus (QuickBite / Layanan)</th>
              <th style={{ width: '90px', textAlign: 'center' }}>Makna Lean</th>
            </tr>
          </thead>
          <tbody>
            {filteredSymbols.length > 0 ? (
              filteredSymbols.map((item) => (
                <tr key={item.id} className="bpmn-row">
                  {/* Kolom 1: Bentuk Simbol SVG */}
                  <td className="symbol-cell" align="center">
                    <div className="symbol-preview-wrapper" title={item.officialName}>
                      <VsmSymbolIcon shapeType={item.shapeType} />
                    </div>
                  </td>

                  {/* Kolom 2: Nama Notasi */}
                  <td>
                    <strong className="symbol-title">{item.name}</strong>
                    <span className="symbol-official">
                      Library Lucidchart: <code>{item.officialName}</code>
                    </span>
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

                  {/* Kolom 4: Definisi Resmi Lucidchart & Penjelasan Sederhana */}
                  <td>
                    <div
                      style={{
                        marginBottom: '8px',
                        padding: '8px 10px',
                        background: '#f8fafc',
                        borderLeft: `3px solid ${item.badgeColor}`,
                        borderRadius: '0 6px 6px 0',
                        fontSize: '12px',
                        color: '#334155',
                      }}
                    >
                      <strong
                        style={{
                          display: 'block',
                          fontSize: '10.5px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.4px',
                          color: '#64748b',
                          marginBottom: '2px',
                        }}
                      >
                        📖 Definisi Resmi Lucidchart:
                      </strong>
                      <em>"{item.lucidDefinition}"</em>
                    </div>
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

                  {/* Kolom 6: Tombol Detail Makna Lean */}
                  <td align="center">
                    <button
                      className="detail-action-btn"
                      onClick={() => setActiveItem(item)}
                      title="Lihat peran simbol dalam Lean Thinking"
                    >
                      Detail ⚡
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} align="center" className="empty-search-cell">
                  Tidak ditemukan simbol VSM yang sesuai dengan kata kunci "<strong>{searchKeyword}</strong>".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Peran Simbol dalam Lean Thinking */}
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
              <VsmSymbolIcon shapeType={activeItem.shapeType} />
              <div>
                <h3>{activeItem.name}</h3>
                <code>Bentuk Resmi Lucidchart: {activeItem.officialName}</code>
              </div>
            </div>

            <div
              className="modal-section"
              style={{
                background: '#f8fafc',
                borderLeft: `4px solid ${activeItem.badgeColor}`,
                padding: '12px 14px',
                borderRadius: '0 8px 8px 0',
              }}
            >
              <h4 style={{ color: '#0f172a', margin: '0 0 6px 0' }}>📖 Definisi Resmi Panduan Lucidchart:</h4>
              <p style={{ fontStyle: 'italic', color: '#334155', margin: 0, fontSize: '0.9rem' }}>
                "{activeItem.lucidDefinition}"
              </p>
            </div>

            <div className="modal-section">
              <h4>🎯 Peran Kunci dalam Metodologi Lean (Waste vs VA):</h4>
              <p>{activeItem.leanSignificance}</p>
            </div>

            <div className="modal-section">
              <h4>🔍 Penerapan pada Kasus QuickBite:</h4>
              <p>{activeItem.example}</p>
            </div>

            {activeItem.tips && (
              <div className="modal-tips-box">
                <strong>💡 Panduan Praktis di Lucidchart:</strong>
                <p>{activeItem.tips}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
