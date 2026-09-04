export type VsmCategory =
  | 'Material Flow'
  | 'Information Flow'
  | 'General & Kaizen'
  | 'Timeline & Metrics';

export interface VsmSymbolItem {
  id: string;
  name: string;
  officialName: string;
  category: VsmCategory;
  categoryLabel: string;
  badgeColor: string;
  shapeType: string;
  simpleExplanation: string;
  analogy: string;
  example: string;
  leanSignificance: string;
  tips?: string;
}

export const vsmCategoriesList: { id: VsmCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'Semua Simbol VSM' },
  { id: 'Material Flow', label: 'Alur Fisik / Material' },
  { id: 'Information Flow', label: 'Alur Informasi' },
  { id: 'General & Kaizen', label: 'Umum & Kaizen' },
  { id: 'Timeline & Metrics', label: 'Garis Waktu & Metrik' },
];

export const vsmSymbolsList: VsmSymbolItem[] = [
  // ==========================================
  // 1. MATERIAL FLOW (ALUR FISIK / BARANG)
  // ==========================================
  {
    id: 'customer-supplier-box',
    name: 'Pelanggan / Pemasok Luar (Customer / Supplier)',
    officialName: 'Customer / Supplier Box',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#2563eb', // blue
    shapeType: 'vsm-customer-box',
    simpleExplanation:
      'Kotak bergigi atap pabrik yang mewakili pihak luar sistem: entitas pemesan (Customer/Pelanggan) atau penyedia bahan baku (Supplier/Pemasok).',
    analogy: 'Pelanggan yang memesan di kasir atau mobil boks distributor telur yang mengirim pasokan.',
    example: 'Mahasiswa kampus yang memesan makan siang di tenant QuickBite (Demand: 120 pesanan/hari).',
    leanSignificance:
      'Menjadi titik tolak penentu Takt Time (kecepatan permintaan pelanggan yang harus dipenuhi pabrik/layanan).',
    tips: 'Biasanya diletakkan di sudut kiri atas (Supplier) dan kanan atas (Customer).',
  },
  {
    id: 'process-box',
    name: 'Kotak Tahapan Proses (Dedicated Process Box)',
    officialName: 'Process Box',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#1e293b', // slate
    shapeType: 'vsm-process-box',
    simpleExplanation:
      'Satu blok tahapan kerja di mana suatu aktivitas fisik atau layanan sedang aktif dikerjakan secara berkelanjutan.',
    analogy: 'Meja penggorengan di dapur tempat koki aktif memasak makanan.',
    example: 'Tahap 3: Persiapan & Memasak pesanan makanan oleh koki di dapur tenant.',
    leanSignificance:
      'Tempat terjadinya aktivitas bernilai tambah (Value-Added) dan waktu siklus proses (Process Time).',
    tips: 'Hanya mewakili satu area kerja atau sel produksi berkelanjutan, bukan langkah mikro.',
  },
  {
    id: 'data-box',
    name: 'Kotak Metrik Operasional (Data Box)',
    officialName: 'Data Box',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#0284c7', // sky
    shapeType: 'vsm-data-box',
    simpleExplanation:
      'Tabel data kecil tepat di bawah kotak proses yang mencatat parameter kinerja terukur seperti waktu kerja, jumlah staf, dan ukuran batch.',
    analogy: 'Dashboard speedometer mobil yang memperlihatkan kecepatan, jarak, dan sisa bahan bakar.',
    example: 'PT (Process Time) = 8 Menit, Operator = 1 Koki, Ukuran Batch = 1 Porsi.',
    leanSignificance:
      'Dasar perhitungan kuantitatif untuk membandingkan kapasitas tiap stasiun kerja dan menemukan bottleneck.',
    tips: 'Berisi metrik kunci: PT (Process Time), C/O (Changeover Time), Uptime, Shift, dan Defect Rate.',
  },
  {
    id: 'inventory-triangle',
    name: 'Segitiga Tumpukan / Waktu Tunggu (Inventory / Queue)',
    officialName: 'Inventory Triangle (WIP)',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#dc2626', // red/danger
    shapeType: 'vsm-inventory-triangle',
    simpleExplanation:
      'Segitiga kuning bersimbol "I" yang menandakan adanya barang, dokumen, atau orang yang menganggur/tertahan menunggu giliran diproses.',
    analogy: 'Mobil-mobil yang macet mengular di depan gerbang tol yang sempit.',
    example: 'Tumpukan 5 lembar nota fisik yang dibiarkan menunggu di meja kasir sebelum diantar ke dapur (Wait Time = 5 Menit).',
    leanSignificance:
      'Simbol utama pemborosan (Waste of Inventory & Waiting). Menyumbang porsi terbesar keterlambatan Lead Time.',
    tips: 'Di bawah segitiga wajib dicantumkan jumlah tumpukan dan estimasi hari/menit waktu tunggu.',
  },
  {
    id: 'push-arrow',
    name: 'Panah Dorong Hasil (Push Arrow / Movement)',
    officialName: 'Push Arrow (Material Movement)',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#475569',
    shapeType: 'vsm-push-arrow',
    simpleExplanation:
      'Panah tebal bergaris belang-belang yang menandakan bahwa hasil kerja dipindahkan secara sepihak ke tahap berikutnya tanpa menunggu sinyal kebutuhan (Push System).',
    analogy: 'Memasak 50 porsi nasi goreng sekaligus dan menumpuknya di etalase, berharap ada yang beli.',
    example: 'Kasir menumpuk nota dan langsung melemparnya ke meja dapur secara sepihak (Overproduction Push).',
    leanSignificance:
      'Mengindikasikan sistem kerja tradisional "Push" yang rentan memicu penumpukan barang berlebih (Work-In-Process).',
    tips: 'Lawan dari sistem "Pull" (tarik). Dalam Lean, panah push diupayakan diubah menjadi sistem tarik.',
  },
  {
    id: 'fifo-lane',
    name: 'Jalur Antrean Teratur (FIFO Lane)',
    officialName: 'First-In-First-Out (FIFO) Lane',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#059669', // green
    shapeType: 'vsm-fifo-lane',
    simpleExplanation:
      'Jalur penyimpanan terbatas dengan aturan siapa yang masuk duluan harus diproses duluan, dan memiliki kapasitas maksimal tertentu.',
    analogy: 'Antrean kasir tol otomatis: mobil yang masuk pertama harus keluar pertama.',
    example: 'Rel jepitan nota pesanan di atas kompor koki dengan kapasitas maksimal 10 nota berurutan.',
    leanSignificance:
      'Mencegah kekacauan urutan pesanan dan membatasi jumlah penumpukan agar tidak melebihi batas toleransi.',
    tips: 'Digambarkan sebagai pipa panah dengan tulisan FIFO dan batas kapasitas maksimal (Max: X unit).',
  },
  {
    id: 'supermarket',
    name: 'Rak Penampung Tarik (Supermarket Pull)',
    officialName: 'Supermarket',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#0d9488',
    shapeType: 'vsm-supermarket',
    simpleExplanation:
      'Tempat penyimpanan sementara berskala kecil di mana tahap berikutnya hanya mengambil barang jika memang dibutuhkan, lalu segera diisi kembali.',
    analogy: 'Rak minuman di minimarket: kasir hanya mengisi rak ketika stok di rak mulai kosong diambil pembeli.',
    example: 'Wadah potongan ayam tepung yang sudah dimarinasi; koki hanya mengambil sesuai pesanan yang masuk.',
    leanSignificance:
      'Jantung dari sistem Lean Pull (Just-In-Time) untuk menjaga persediaan tetap minimum dan terhindar dari pemborosan stok.',
    tips: 'Bentuk kotak terbuka tiga sisi menyerupai huruf [E] yang menghadap ke bawah.',
  },

  // ==========================================
  // 2. INFORMATION FLOW (ALUR INFORMASI)
  // ==========================================
  {
    id: 'manual-info-arrow',
    name: 'Alur Informasi Manual (Kertas / Lisan)',
    officialName: 'Manual Information Flow',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#64748b',
    shapeType: 'vsm-manual-info',
    simpleExplanation:
      'Garis panah tipis lurus yang menunjukkan aliran instruksi jadwal atau pesanan yang dikomunikasikan secara manual melalui kertas atau lisan.',
    analogy: 'Menyampaikan pesan dengan memo tempel Post-It atau berbicara tatap muka.',
    example: 'Mahasiswa menyebutkan menu pesanan secara lisan ke kasir di konter.',
    leanSignificance:
      'Rentan terhadap salah dengar, salah baca tulisan tangan, serta keterlambatan fisik pengantaran.',
    tips: 'Garis lurus tunggal berujung mata panah tipis.',
  },
  {
    id: 'electronic-info-arrow',
    name: 'Alur Informasi Digital (Sistem / Elektronik)',
    officialName: 'Electronic Information Flow',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#2563eb',
    shapeType: 'vsm-electronic-info',
    simpleExplanation:
      'Garis panah zig-zag berbentuk sambaran petir yang melambangkan transmisi data secara instan melalui sistem digital, LAN, internet, atau API.',
    analogy: 'Pesan chat instan WhatsApp atau transaksi pembayaran kartu kredit.',
    example: 'Pesanan dari aplikasi QR menu langsung terkirim secara instan ke layar monitor dapur (KDS).',
    leanSignificance:
      'Solusi utama Lean To-Be untuk melenyapkan waktu tunggu (zero delay communication) dan memangkas waktu kirim informasi.',
    tips: 'Garis patah-patah petir (lightning bolt) berpanah.',
  },
  {
    id: 'production-control-box',
    name: 'Kotak Pusat Kendali (Production Control / Central)',
    officialName: 'Production Control Box',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#4f46e5',
    shapeType: 'vsm-control-box',
    simpleExplanation:
      'Kotak kontrol pusat yang bertugas merencanakan jadwal kerja, mengelola pesanan, dan menginstruksikan operasional harian.',
    analogy: 'Menara kontrol bandara (ATC) yang memandu jadwal lepas landas dan mendarat pesawat.',
    example: 'Pengelola Kasir QuickBite yang menerima pesanan mahasiswa dan mendistribusikan nota ke staf dapur.',
    leanSignificance:
      'Pusat kendali aliran nilai; menentukan apakah sistem berjalan lambat berbasis batch atau lincah berbasis arus satuan.',
    tips: 'Biasanya diletakkan di tengah bagian atas peta VSM, terhubung ke Customer, Supplier, dan tiap tahapan.',
  },
  {
    id: 'kanban-card',
    name: 'Kartu Perintah Kerja (Kanban Card)',
    officialName: 'Production / Withdrawal Kanban',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#f59e0b',
    shapeType: 'vsm-kanban-card',
    simpleExplanation:
      'Kartu fisik atau sinyal visual yang menginstruksikan staf untuk "Hanya memproduksi atau mengambil 1 unit lagi sekarang".',
    analogy: 'Kupon nomor antrean cuci mobil atau kartu giliran donor darah.',
    example: 'Tiket pesanan digital nomor #042 yang muncul di layar koki sebagai perintah untuk mulai menggoreng burger.',
    leanSignificance:
      'Alat visual pengendali kelebihan produksi (anti-overproduction); jika tidak ada kartu kanban, staf tidak boleh bekerja membuat barang.',
    tips: 'Bentuk persegi panjang kecil dengan sudut terpotong atau simbol kartu kecil.',
  },

  // ==========================================
  // 3. GENERAL & KAIZEN (UMUM & PERBAIKAN)
  // ==========================================
  {
    id: 'kaizen-burst',
    name: 'Bintang Ledakan Peluang Kaizen (Kaizen Burst)',
    officialName: 'Kaizen Burst (Kaizen Opportunity)',
    category: 'General & Kaizen',
    categoryLabel: 'Umum & Kaizen',
    badgeColor: '#ea580c', // orange/burst
    shapeType: 'vsm-kaizen-burst',
    simpleExplanation:
      'Bentuk bintang ledakan tajam yang menyorot titik terjadinya pemborosan parah dan membutuhkan lokakarya perbaikan cepat (Kaizen workshop).',
    analogy: 'Tanda seru bahaya atau lingkaran merah pada peta bencana yang menandai titik krisis darurat.',
    example: 'Kaizen: "Ganti penumpukan nota manual dengan Kitchen Display System (KDS) untuk memangkas delay 5 menit."',
    leanSignificance:
      'Pilar penghubung antara peta kondisi saat ini (Current State) menuju peta masa depan yang efisien (Future State).',
    tips: 'Diisi dengan kalimat singkat ide perbaikan spesifik dan terukur.',
  },
  {
    id: 'operator-symbol',
    name: 'Ikon Petugas / Pekerja (Operator)',
    officialName: 'Operator Symbol',
    category: 'General & Kaizen',
    categoryLabel: 'Umum & Kaizen',
    badgeColor: '#6b7280',
    shapeType: 'vsm-operator',
    simpleExplanation:
      'Simbol miniatur kepala dan bahu orang yang menunjukkan berapa jumlah staf manusia yang ditugaskan penuh pada stasiun kerja tersebut.',
    analogy: 'Ikon profil pengguna di aplikasi handphone.',
    example: '1 Kasir di loket depan dan 1 Koki di meja penggorengan dapur.',
    leanSignificance:
      'Digunakan untuk analisis beban kerja (Line Balancing) dan efisiensi produktivitas tenaga kerja (Full-Time Equivalent/FTE).',
    tips: 'Bentuk lingkaran kepala dengan setengah lingkaran badan di bawahnya.',
  },

  // ==========================================
  // 4. TIMELINE & METRICS (GARIS WAKTU & METRIK)
  // ==========================================
  {
    id: 'timeline-ladder',
    name: 'Tangga Garis Waktu Lean (Timeline Ladder)',
    officialName: 'Timeline Ladder (Step Wave)',
    category: 'Timeline & Metrics',
    categoryLabel: 'Garis Waktu & Metrik',
    badgeColor: '#0f172a',
    shapeType: 'vsm-timeline-ladder',
    simpleExplanation:
      'Garis berundak seperti tangga di dasar diagram yang memisahkan waktu menganggur/menunggu (garis atas) dengan waktu kerja produktif (garis bawah).',
    analogy: 'Jadwal dokter: waktu 40 menit menunggu di ruang tunggu (atas) vs waktu 10 menit pemeriksaan dokter (bawah).',
    example: 'Undakan atas: Wait Time 10m, 5m, 3m, 4m (Total 22m). Undakan bawah: Process Time 2m, 1m, 8m, 1m (Total 12m).',
    leanSignificance:
      'Jantung pengukuran VSM! Memperlihatkan secara visual betapa waktu pemborosan jauh lebih panjang daripada waktu kerja nyata.',
    tips: 'Garis atas selalu mewakili Non-Value Added (NVA), garis bawah selalu mewakili Value-Added (VA).',
  },
  {
    id: 'lead-time-summary-box',
    name: 'Kotak Ringkasan Lead Time (Total Summary Box)',
    officialName: 'Lead Time Summary Box',
    category: 'Timeline & Metrics',
    categoryLabel: 'Garis Waktu & Metrik',
    badgeColor: '#4338ca',
    shapeType: 'vsm-summary-box',
    simpleExplanation:
      'Kotak kalkulasi di ujung kanan bawah tangga waktu yang menjumlahkan Total Waktu Tunggu, Total Waktu Proses, serta Efisiensi Siklus.',
    analogy: 'Struk nilai rapor akhir yang menyajikan persentase kehadiran produktif siswa.',
    example: 'Total Wait Time = 22m, Total Process Time = 12m, Total Lead Time = 34m, Efisiensi Siklus (PCE) = 35.3%.',
    leanSignificance:
      'Menghitung Process Cycle Efficiency (PCE) = (Value-Added Time / Total Lead Time) x 100%.',
    tips: 'Tolok ukur keberhasilan proyek perbaikan Lean Six Sigma dari As-Is ke To-Be.',
  },
];
