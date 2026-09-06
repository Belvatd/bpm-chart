export interface LucidVsmProcessStep {
  id: string;
  name: string;
  operatorCount: number;
  leadTimeHours: number;
  cycleTimeHours: number;
  defectRatePercent: number;
  changeoverMinutes: number;
  isDefectAlert: boolean; // true if defect >= 15%
  description: string;
  analysis: string;
}

export interface LucidVsmBuffer {
  id: string;
  name: string;
  type: 'supermarket' | 'fifo' | 'inventory';
  capacity: string;
  location: string;
  description: string;
}

export interface LucidVsmSymbolUsed {
  name: string;
  lucidName: string;
  category: 'Process' | 'Material' | 'Information' | 'General';
  roleInSample: string;
  whyUsed: string;
}

export const lucidTemplateMeta = {
  title: 'Manufacturing Center: Custom Chair Production',
  state: 'Current State VSM (Pull System)',
  sourceUrl: 'https://lucid.co/templates/value-stream-map-example',
  templateId: '6508ebbc-b7c1-4375-bb0a-aa901dedc9dc',
  demand: '17 custom chairs / day',
  taktTime: '1 chair every 3.76 hours',
  totalLeadTime: '9 hours',
  totalCycleTime: '4.4 hours',
  efficiency: '48.9%', // (4.4 / 9.0) * 100%
  defectThreshold: 15,
};

export const lucidTemplateProcesses: LucidVsmProcessStep[] = [
  {
    id: 'cut-materials',
    name: '1. Cut Materials (Pemotongan Bahan)',
    operatorCount: 3,
    leadTimeHours: 4.0,
    cycleTimeHours: 2.0,
    defectRatePercent: 57,
    changeoverMinutes: 2,
    isDefectAlert: true,
    description: 'Pemotongan kayu mentah dari gudang menjadi komponen rangka kursi.',
    analysis:
      'Tingkat cacat sangat kritis (57%!) akibat ketidakkonsistenan bahan baku kayu dan keausan pisau gergaji. Waktu proses 2 jam dengan lead time 4 jam menunjukkan adanya waktu tunggu antrean kayu.',
  },
  {
    id: 'assemble-chair',
    name: '2. Assemble Chair (Perakitan Kursi)',
    operatorCount: 2,
    leadTimeHours: 2.0,
    cycleTimeHours: 0.8,
    defectRatePercent: 26,
    changeoverMinutes: 4,
    isDefectAlert: true,
    description: 'Penyambungan rangka, pemasangan sendi kayu, dan pengeleman struktur kursi.',
    analysis:
      'Defect rate 26% melebihi batas 15%, sering disebabkan oleh komponen kayu hasil potongan tahap 1 yang presisinya kurang pas, sehingga membutuhkan penyesuaian manual saat perakitan.',
  },
  {
    id: 'stain-chair',
    name: '3. Stain Chair (Pewarnaan & Finishing)',
    operatorCount: 1,
    leadTimeHours: 0.7,
    cycleTimeHours: 0.4,
    defectRatePercent: 18,
    changeoverMinutes: 0.5,
    isDefectAlert: true,
    description: 'Pengamplasan halus, aplikasi pelapis warna kayu (wood stain), dan pernis pelindung.',
    analysis:
      'Defect rate 18% tergolong merah. Variasi ketebalan polesan warna dan debu ruangan finishing menjadi penyebab utama cacat permukaan sebelum masuk ke inspeksi.',
  },
  {
    id: 'inspect-chair',
    name: '4. Inspect Chair (Inspeksi Kualitas)',
    operatorCount: 1,
    leadTimeHours: 1.0,
    cycleTimeHours: 0.5,
    defectRatePercent: 50,
    changeoverMinutes: 6,
    isDefectAlert: true,
    description: 'Pemeriksaan dimensi, kekuatan beban, dan kehalusan finishing permukaan.',
    analysis:
      'Defect rate mencapai 50%! Separuh kursi yang diperiksa terdeteksi memiliki ketidaksempurnaan dan harus dikembalikan (rework) atau ditolak, menjadi bottleneck kualitas terbesar di pabrik.',
  },
  {
    id: 'pack-chair',
    name: '5. Pack Chair (Pengemasan Pelindung)',
    operatorCount: 3,
    leadTimeHours: 0.7,
    cycleTimeHours: 0.5,
    defectRatePercent: 13,
    changeoverMinutes: 6,
    isDefectAlert: false,
    description: 'Pemberian pelindung sudut, pembungkusan plastik bubble, dan pengepakan ke kardus pengiriman.',
    analysis:
      'Defect rate 13% (di bawah batas 15% / status normal). Proses berjalan relatif lancar dengan 3 operator yang menangani pengepakan kardus.',
  },
  {
    id: 'ship-chair',
    name: '6. Ship Chair (Pengiriman ke Pelanggan)',
    operatorCount: 3,
    leadTimeHours: 0.5,
    cycleTimeHours: 0.2,
    defectRatePercent: 10,
    changeoverMinutes: 1,
    isDefectAlert: false,
    description: 'Pemuatan kardus kursi ke truk ekspedisi harian untuk dikirim ke pembeli.',
    analysis:
      'Defect rate 10% (normal). Waktu siklus sangat cepat (0.2 jam / 12 menit) untuk pemuatan ke truk pengiriman harian (Daily Shipment).',
  },
];

export const lucidTemplateBuffers: LucidVsmBuffer[] = [
  {
    id: 'raw-supermarket',
    name: 'Raw Materials Supermarket',
    type: 'supermarket',
    capacity: '24 chairs',
    location: 'Antara Cut Materials dan Assemble Chair',
    description:
      'Rak kanban penyangga bahan kayu potong berkapasitas 24 kursi. Perakitan hanya mengambil komponen saat ada jadwal kerja, dan pemotongan hanya mengisi ulang jika stok berkurang.',
  },
  {
    id: 'wip-supermarket',
    name: 'WIP Supermarket',
    type: 'supermarket',
    capacity: '30 chairs',
    location: 'Antara Assemble Chair dan Stain Chair',
    description:
      'Penyangga persediaan setengah jadi kursi yang sudah dirakit berkapasitas 30 kursi, memisahkan stasiun perakitan dari stasiun pewarnaan.',
  },
  {
    id: 'fifo-lane',
    name: 'FIFO Lane (First-In First-Out)',
    type: 'fifo',
    capacity: 'Alur teratur antrean berurutan',
    location: 'Antara Stain Chair dan Inspect Chair',
    description:
      'Jalur antrean teratur di mana kursi yang selesai diwarnai langsung mengantre masuk ke ruang inspeksi secara urut tanpa boleh saling mendahului.',
  },
  {
    id: 'inventory-triangle',
    name: 'Inventory Queue (Segitiga Tumpukan)',
    type: 'inventory',
    capacity: '2 chairs',
    location: 'Antara Inspect Chair dan Pack Chair',
    description:
      'Tumpukan menunggu (waiting queue) sebanyak 2 kursi yang selesai diinspeksi sebelum dijemput oleh operator pengemasan.',
  },
  {
    id: 'finished-supermarket',
    name: 'Finished Goods Supermarket',
    type: 'supermarket',
    capacity: '30 chairs',
    location: 'Antara Pack Chair dan Ship Chair',
    description:
      'Gudang produk jadi berkapasitas 30 kursi kemasan yang siap diambil oleh tim pengiriman saat truk tiba.',
  },
];

export const lucidTemplateSymbolsUsed: LucidVsmSymbolUsed[] = [
  {
    name: 'Supplier & Customer Box',
    lucidName: 'Customer/Supplier',
    category: 'Process',
    roleInSample: 'Pabrik Supplier di kiri atas (pemasok kayu) dan Customer di kanan atas (pembeli custom chair).',
    whyUsed: 'Menentukan titik awal permintaan pasar (Demand = 17 chairs/day) dan titik akhir penyerahan barang jadi.',
  },
  {
    name: 'Production Control Box',
    lucidName: 'Production Control',
    category: 'Information',
    roleInSample: 'Kotak pusat kendali jadwal di tengah atas yang menerima penjualan harian dan mengirim jadwal harian.',
    whyUsed: 'Mengoordinasikan alur informasi antara penjualan (Daily Sales), prakiraan (30-60-90 Day Forecast), dan lantai pabrik (Daily Schedule).',
  },
  {
    name: 'Dedicated Process Box (x6)',
    lucidName: 'Dedicated Process Flow',
    category: 'Process',
    roleInSample: '6 tahapan kerja: Cut materials, Assemble chair, Stain chair, Inspect chair, Pack chair, Ship chair.',
    whyUsed: 'Mewakili setiap stasiun kerja fisik mandiri yang memiliki alur material internal kontinu.',
  },
  {
    name: 'Data Box (x6)',
    lucidName: 'Data Box',
    category: 'Process',
    roleInSample: 'Tabel 4 baris di bawah setiap kotak proses: LT (Lead Time), CT (Cycle Time), Defect rate, dan C/O time.',
    whyUsed: 'Mencatat parameter kinerja operasional kuantitatif yang menjadi basis perhitungan timeline ladder.',
  },
  {
    name: 'Operator Symbol',
    lucidName: 'Operator',
    category: 'General',
    roleInSample: 'Ikon pekerja manusia di dalam tiap kotak proses: 3 di Cut, 2 di Assemble, 1 di Stain, 1 di Inspect, 3 di Pack, 3 di Ship.',
    whyUsed: 'Menunjukkan kebutuhan tenaga kerja (manpower) di masing-masing stasiun kerja.',
  },
  {
    name: 'Supermarket (x3)',
    lucidName: 'Supermarket',
    category: 'Material',
    roleInSample: 'Raw materials (24 chairs), WIP (30 chairs), Finished goods (30 chairs).',
    whyUsed: 'Menerapkan Pull System yang membatasi stok maksimal dan mencegah kelebihan produksi (overproduction).',
  },
  {
    name: 'Material Pull & Withdrawal Kanban',
    lucidName: 'Material Pull & Withdrawal Kanban',
    category: 'Material',
    roleInSample: 'Panah lengkung dan kartu instruksi tarik yang menempel pada rak supermarket.',
    whyUsed: 'Menunjukkan bahwa material hanya diambil oleh proses hilir saat diperlukan.',
  },
  {
    name: 'FIFO Lane',
    lucidName: 'FIFO Lane',
    category: 'Material',
    roleInSample: 'Jalur panah bergaris pembatas antara Stain chair dan Inspect chair.',
    whyUsed: 'Menjaga integritas urutan pengeringan dan inspeksi cat tanpa penumpukan sembarangan.',
  },
  {
    name: 'Inventory Triangle (WIP)',
    lucidName: 'Inventory',
    category: 'Material',
    roleInSample: 'Segitiga kuning bersimbol "I" berisi 2 chairs di antara Inspect chair dan Pack chair.',
    whyUsed: 'Mengidentifikasi adanya waktu tunggu (waiting waste) kursi menganggur sebelum dipak.',
  },
  {
    name: 'Warehouse',
    lucidName: 'Warehouse',
    category: 'General',
    roleInSample: 'Bangunan gudang penyimpanan bahan baku di sisi kiri bawah sebelum proses pemotongan.',
    whyUsed: 'Tempat penerimaan pengiriman mingguan kayu gelondongan dari supplier.',
  },
  {
    name: 'Forklift',
    lucidName: 'Forklift',
    category: 'General',
    roleInSample: 'Ikon forklift yang mengangkut material dari Warehouse ke meja Cut materials.',
    whyUsed: 'Menandai perpindahan material internal bervolume berat menggunakan alat mekanis.',
  },
  {
    name: 'External Shipment (Truk x2)',
    lucidName: 'External Shipment',
    category: 'Material',
    roleInSample: 'Weekly delivery dari Supplier ke Warehouse, dan Daily shipment dari Ship chair ke Customer.',
    whyUsed: 'Memvisualisasikan logistik transportasi jalan raya di batas terluar rantai nilai.',
  },
  {
    name: 'Quality Problem Indicator (x4)',
    lucidName: 'Quality Problem',
    category: 'General',
    roleInSample: 'Rambu lingkaran merah bersilang "X" pada 4 stasiun yang memiliki Defect rate >= 15% (Cut, Assemble, Stain, Inspect).',
    whyUsed: 'Menyoroti stasiun yang menghasilkan pemborosan cacat (Waste of Defects/Rework) paling parah.',
  },
  {
    name: 'Timeline Ladder',
    lucidName: 'Timeline',
    category: 'General',
    roleInSample: 'Garis bertingkat di dasar peta: undakan atas (LT / Lead Time) vs undakan bawah (CT / Cycle Time).',
    whyUsed: 'Memisahkan waktu bernilai tambah (Value-Added 4.4 jam) vs total lead time (9 jam).',
  },
  {
    name: 'Lead Time Summary Box',
    lucidName: 'Lead Time Summary Box',
    category: 'General',
    roleInSample: 'Kotak pink di sudut kanan bawah: Total lead time = 9 hr(s), Total cycle time (VA) = 4.4 hr(s).',
    whyUsed: 'Memberikan ringkasan metrik efisiensi aliran nilai (PCE = 48.9%).',
  },
];
