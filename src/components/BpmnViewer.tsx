import { useEffect, useRef, useState } from 'react';
import { BpmnVisualization, FitType } from 'bpmn-visualization';
import { sampleBpmnXml } from '../sampleBpmn';

interface StepAction {
  id: string;
  name: string;
  lane: 'Mahasiswa' | 'Kasir' | 'Dapur';
  type?: 'success' | 'warning' | 'normal';
}

const ALL_STEP_IDS = [
  'Event_Start',
  'Task_Pesan',
  'Task_CatatBayar',
  'Gateway_Kembalian',
  'Task_HitungKembalian',
  'Gateway_MergeKembalian',
  'Task_BeriNota',
  'Task_TerimaNota',
  'Task_AntarNota',
  'Task_TerimaNotaDapur',
  'Gateway_Stok',
  'Task_Masak',
  'Task_TaruhMejaSaji',
  'Task_KasirPanggilMakanan',
  'Task_AmbilMakanan',
  'Event_End_Sukses',
  'Task_LaporHabis',
  'Task_KasirPanggil',
  'Task_TawarRefund',
  'Event_End_Batal',
];

const STEPS: StepAction[] = [
  { id: 'Event_Start', name: '1. Datang', lane: 'Mahasiswa' },
  { id: 'Task_Pesan', name: '2. Pesan Menu Lisan', lane: 'Mahasiswa' },
  { id: 'Task_CatatBayar', name: '3. Catat & Terima Uang', lane: 'Kasir' },
  { id: 'Gateway_Kembalian', name: '4. [Gateway] Cek Kembalian?', lane: 'Kasir' },
  { id: 'Task_HitungKembalian', name: '4a. Hitung Kembalian', lane: 'Kasir' },
  { id: 'Task_BeriNota', name: '5. Berikan Nota & Kembalian', lane: 'Kasir' },
  { id: 'Task_TerimaNota', name: '6. Terima Nota & Kembalian', lane: 'Mahasiswa' },
  { id: 'Task_AntarNota', name: '7. Antar Nota ke Dapur', lane: 'Kasir' },
  { id: 'Task_TerimaNotaDapur', name: '8. Koki Terima Nota', lane: 'Dapur' },
  { id: 'Gateway_Stok', name: '9. [Gateway] Cek Stok Bahan', lane: 'Dapur' },
  // Jalur Stok Ada
  { id: 'Task_Masak', name: '10A. Masak Makanan', lane: 'Dapur', type: 'success' },
  { id: 'Task_TaruhMejaSaji', name: '11A. Taruh di Meja Saji', lane: 'Dapur', type: 'success' },
  { id: 'Task_KasirPanggilMakanan', name: '12A. Kasir Panggil Nama', lane: 'Kasir', type: 'success' },
  { id: 'Task_AmbilMakanan', name: '13A. Ambil Makanan', lane: 'Mahasiswa', type: 'success' },
  { id: 'Event_End_Sukses', name: '14A. Selesai', lane: 'Mahasiswa', type: 'success' },
  // Jalur Stok Habis
  { id: 'Task_LaporHabis', name: '10B. Lapor Stok Habis', lane: 'Dapur', type: 'warning' },
  { id: 'Task_KasirPanggil', name: '11B. Kasir Panggil Mahasiswa', lane: 'Kasir', type: 'warning' },
  { id: 'Task_TawarRefund', name: '12B. Tawarkan Ganti / Refund', lane: 'Kasir', type: 'warning' },
  { id: 'Event_End_Batal', name: '13B. Pesanan Batal/Refund', lane: 'Kasir', type: 'warning' },
];

export function BpmnViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bpmnVisualizationRef = useRef<BpmnVisualization | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [customXml, setCustomXml] = useState<string>(sampleBpmnXml);
  const [showXmlInput, setShowXmlInput] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const bpmnVisualization = new BpmnVisualization({
      container: containerRef.current,
      navigation: { enabled: true },
    });
    bpmnVisualizationRef.current = bpmnVisualization;

    try {
      bpmnVisualization.load(customXml, {
        fit: { type: FitType.Center, margin: 20 },
      });
    } catch (err) {
      console.error('Gagal memuat BPMN:', err);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const handleLoadXml = (xmlString: string) => {
    if (!bpmnVisualizationRef.current) return;
    try {
      bpmnVisualizationRef.current.load(xmlString, {
        fit: { type: FitType.Center, margin: 20 },
      });
      setActiveStep(null);
    } catch (err) {
      alert('Format BPMN XML tidak valid atau gagal dimuat.');
      console.error(err);
    }
  };

  const handleResetZoom = () => {
    if (!bpmnVisualizationRef.current) return;
    bpmnVisualizationRef.current.navigation.fit({
      type: FitType.Center,
      margin: 20,
    });
  };

  const handleHighlightStep = (elementId: string) => {
    if (!bpmnVisualizationRef.current) return;
    const registry = bpmnVisualizationRef.current.bpmnElementsRegistry;

    // Bersihkan overlay & style sebelumnya
    ALL_STEP_IDS.forEach((id) => registry.removeAllOverlays(id));
    registry.removeCssClasses(ALL_STEP_IDS, ['step-active', 'step-success', 'step-warning']);

    if (activeStep === elementId) {
      setActiveStep(null);
      return;
    }

    const stepDef = STEPS.find((s) => s.id === elementId);
    const cssClass =
      stepDef?.type === 'success'
        ? 'step-success'
        : stepDef?.type === 'warning'
        ? 'step-warning'
        : 'step-active';

    const overlayColor =
      stepDef?.type === 'success'
        ? '#16a34a'
        : stepDef?.type === 'warning'
        ? '#ea580c'
        : '#2563eb';

    registry.addCssClasses(elementId, cssClass);
    registry.addOverlays(elementId, {
      position: 'top-right',
      label: '📍',
      style: {
        font: { color: 'white', size: 13 },
        fill: { color: overlayColor },
        stroke: { color: '#ffffff', width: 1.5 },
      },
    });

    setActiveStep(elementId);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCustomXml(content);
        handleLoadXml(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bpmn-wrapper">
      <header className="bpmn-header">
        <div>
          <h2>Visualisasi Proses Bisnis: Tenant QuickBite</h2>
          <p>
            Alur Pemesanan &amp; Pelayanan Makanan (Mahasiswa ↔ Kasir ↔ Dapur/Koki) dengan Gateway Kembalian &amp; Ketersediaan Bahan Baku
          </p>
        </div>
        <div className="toolbar">
          <button onClick={handleResetZoom} title="Pusatkan Diagram" className="btn btn-secondary">
            🎯 Reset View
          </button>
          <button
            onClick={() => setShowXmlInput(!showXmlInput)}
            className="btn btn-outline"
          >
            {showXmlInput ? 'Tutup Editor XML' : '📝 Lihat / Edit XML'}
          </button>
          <label className="btn btn-outline file-label">
            📂 Upload BPMN
            <input
              type="file"
              accept=".bpmn,.xml"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </header>

      {showXmlInput && (
        <div className="xml-panel">
          <textarea
            value={customXml}
            onChange={(e) => setCustomXml(e.target.value)}
            rows={10}
            placeholder="Paste BPMN 2.0 XML di sini..."
          />
          <div className="xml-actions">
            <button
              onClick={() => handleLoadXml(customXml)}
              className="btn btn-primary"
            >
              Terapkan XML
            </button>
            <button
              onClick={() => {
                setCustomXml(sampleBpmnXml);
                handleLoadXml(sampleBpmnXml);
              }}
              className="btn btn-secondary"
            >
              Kembalikan ke Default QuickBite
            </button>
          </div>
        </div>
      )}

      {/* Panel Navigasi / Simulasi Alur Proses */}
      <div className="simulation-section">
        <div className="simulation-header">
          <strong>⚡ Simulasi / Sorot Langkah:</strong>
          <span className="legend">
            <span className="legend-tag normal">Alur Utama</span>
            <span className="legend-tag success">Jalur A: Stok Ada</span>
            <span className="legend-tag warning">Jalur B: Stok Habis</span>
          </span>
        </div>
        <div className="step-groups">
          {STEPS.map((step) => {
            let className = 'step-btn';
            if (step.type === 'success') className += ' btn-step-success';
            else if (step.type === 'warning') className += ' btn-step-warning';
            if (activeStep === step.id) className += ' active';

            return (
              <button
                key={step.id}
                className={className}
                onClick={() => handleHighlightStep(step.id)}
              >
                <small>[{step.lane}]</small> {step.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="viewer-container">
        <div ref={containerRef} className="bpmn-container" />
      </div>

      <footer className="bpmn-footer">
        <small>💡 Gunakan scroll roda mouse untuk Zoom In/Out, klik &amp; seret kursor untuk menggeser canvas (Pan).</small>
      </footer>
    </div>
  );
}
