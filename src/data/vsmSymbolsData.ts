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

  // ==========================================
  // 5. SIMBOL TAMBAHAN (LUCIDCHART) - MATERIAL FLOW
  // ==========================================
  {
    id: 'material-pull',
    name: 'Panah Tarik Material (Material Pull)',
    officialName: 'Material Pull Arrow',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#0d9488',
    shapeType: 'vsm-material-pull',
    simpleExplanation:
      'Panah tipis berlubang yang menandakan barang hanya ditarik/diambil oleh proses hilir saat benar-benar dibutuhkan, bukan didorong oleh proses hulu.',
    analogy: 'Seperti mengambil satu sendok es krim dari cone hanya saat lidah siap menjilat, bukan menuang semua isi toples dulu.',
    example: 'Koki mengambil 1 porsi ayam tepung dari wadah marinasi hanya saat ada pesanan masuk, lalu wadah diisi ulang.',
    leanSignificance:
      'Inti sistem Pull (Just-In-Time): produksi dipicu permintaan nyata, menekan overproduction dan penumpukan WIP.',
    tips: 'Digambar sebagai panah outline (tanpa isi) dari supermarket menuju proses hilir.',
  },
  {
    id: 'safety-stock',
    name: 'Stok Pengaman (Safety Stock)',
    officialName: 'Safety Stock',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#d97706',
    shapeType: 'vsm-safety-stock',
    simpleExplanation:
      'Segitiga dengan sudut membulat yang melambangkan persediaan cadangan (buffer) untuk menjaga produksi tetap jalan saat ada gangguan.',
    analogy: 'Tabungan darurat di rekening: tidak dipakai sehari-hari, tapi siap dipakai kalau gaji telat.',
    example: 'Stok cadangan 2 dus gelas plastik di dapur QuickBite agar tidak kehabisan saat supplier telat antar.',
    leanSignificance:
      'Menjamin kelancaran aliran saat terjadi fluktuasi permintaan atau gangguan pasokan, namun jumlahnya harus dikelola agar tidak jadi pemborosan.',
    tips: 'Berbeda dengan segitiga inventory biasa karena sudutnya membulat dan biasanya diberi label S.',
  },
  {
    id: 'external-shipment',
    name: 'Pengiriman Eksternal (External Shipment)',
    officialName: 'External Shipment',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#475569',
    shapeType: 'vsm-external-shipment',
    simpleExplanation:
      'Ikon truk yang menandakan pengiriman barang dari supplier ke pabrik atau dari pabrik ke customer.',
    analogy: 'Mobil box yang mengantar bahan baku ke dapur dan armada kurir yang mengantar pesanan ke pelanggan.',
    example: 'Truk distributor telur dan ayam tiba setiap pagi pukul 07.00 di loading dock QuickBite.',
    leanSignificance:
      'Menandai titik perpindahan barang melintasi batas sistem (masuk dari pemasok, keluar ke pelanggan).',
    tips: 'Biasanya digambar dengan anak panah besar berisi ikon truk, arah panah sesuai alur pengiriman.',
  },
  {
    id: 'workcell',
    name: 'Sel Kerja Terintegrasi (Workcell)',
    officialName: 'Workcell',
    category: 'Material Flow',
    categoryLabel: 'Alur Fisik / Material',
    badgeColor: '#1d4ed8',
    shapeType: 'vsm-workcell',
    simpleExplanation:
      'Kotak proses besar yang menggabungkan beberapa proses kecil dalam satu sel produksi yang saling berdekatan.',
    analogy: 'Satu dapur compact yang punya kompor, wastafel, dan meja potong dalam satu baris, sehingga koki tidak perlu bolak-balik jauh.',
    example: 'Sel kerja penataan topping: roti diiris, dioles saus, dan ditabur keju dalam satu area tanpa jeda.',
    leanSignificance:
      'Mengurangi jarak dan waktu transport antar proses, mendorong aliran satu unit (one-piece flow).',
    tips: 'Digambar sebagai kotak besar dengan beberapa kotak proses kecil di dalamnya.',
  },

  // ==========================================
  // 6. SIMBOL TAMBAHAN (LUCIDCHART) - INFORMATION FLOW
  // ==========================================
  {
    id: 'production-kanban',
    name: 'Kanban Produksi (Production Kanban)',
    officialName: 'Production Kanban',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#f59e0b',
    shapeType: 'vsm-production-kanban',
    simpleExplanation:
      'Kartu perintah yang memberi tahu proses pemasok untuk memproduksi sejumlah barang tertentu bagi proses hilir.',
    analogy: 'Struk dapur "buat 10 burger" yang ditempel di depan koki sebelum mulai memasak.',
    example: 'Kartu "produksi 5 porsi nasi ayam" muncul begitu stok di rak ambil tersisa 5 porsi.',
    leanSignificance:
      'Mengendalikan produksi agar jumlahnya selalu sesuai permintaan turun, mencegah membuat barang lebih dulu tanpa perintah.',
    tips: 'Bentuknya kartu persegi kecil; sering digabung dalam satu jalur dengan withdrawal kanban.',
  },
  {
    id: 'withdrawal-kanban',
    name: 'Kanban Penarikan (Withdrawal Kanban)',
    officialName: 'Withdrawal Kanban',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#ea580c',
    shapeType: 'vsm-withdrawal-kanban',
    simpleExplanation:
      'Kartu atau perangkat yang memerintahkan petugas material untuk memindahkan barang dari supermarket ke proses penerima.',
    analogy: 'Bon permintaan "tolong ambilkan gula 2 kg dari gudang" yang dibawa petugas saat stok di dapur menipis.',
    example: 'Petugas dapur membawa kartu tarik untuk mengambil 1 kotak bumbu dari rak penyimpanan ke meja koki.',
    leanSignificance:
      'Menggerakkan barang hanya saat dibutuhkan proses hilir, menjaga arus material tetap pull-based.',
    tips: 'Biasanya dicetak pada kartu berbeda warna dari production kanban agar mudah dibedakan.',
  },
  {
    id: 'signal-kanban',
    name: 'Kanban Sinyal (Signal Kanban)',
    officialName: 'Signal Kanban',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#dc2626',
    shapeType: 'vsm-signal-kanban',
    simpleExplanation:
      'Kanban yang dipakai saat stok antara dua proses sudah turun ke titik minimum, memberi sinyal untuk produksi ulang.',
    analogy: 'Lampu minyak di dashboard mobil menyala saat bensin tinggal sedikit, menandakan harus segera isi.',
    example: 'Saat stok gelas di rak tinggal 1 dus, sinyal kanban menempel di tiang agar segera dipesan ulang.',
    leanSignificance:
      'Mencegah stockout pada barang yang diproduksi dalam batch besar atau yang tidak diambil satu-satu.',
    tips: 'Sering digambar sebagai kartu dengan segitiga/tanda sinyal di tengahnya.',
  },
  {
    id: 'kanban-post',
    name: 'Papan Kanban (Kanban Post)',
    officialName: 'Kanban Post',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#ca8a04',
    shapeType: 'vsm-kanban-post',
    simpleExplanation:
      'Lokasi atau papan tempat kartu kanban disimpan dan menunggu untuk diambil oleh proses hilir.',
    analogy: 'Kotak masuk surat di kantor: surat (kanban) menumpuk di sana sampai kurir (proses hilir) mengambilnya.',
    example: 'Papan gantung di dinding dapur tempat kartu pesanan menunggu diambil koki.',
    leanSignificance:
      'Menjadi titik kontrol visual: jika kartu menumpuk berarti ada hambatan aliran yang perlu dievaluasi.',
    tips: 'Digambar sebagai kotak/meja kecil dengan beberapa kartu berdiri di atasnya.',
  },
  {
    id: 'sequenced-pull',
    name: 'Penarikan Berurutan (Sequenced Pull)',
    officialName: 'Sequenced Pull',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#16a34a',
    shapeType: 'vsm-sequenced-pull',
    simpleExplanation:
      'Sistem yang memberi perintah langsung ke proses sub-rakitan untuk membuat barang dalam urutan tertentu, tanpa perantara supermarket.',
    analogy: 'Konveyor sushi di restoran Jepang: setiap piring diisi sesuai urutan pesanan pelanggan tanpa stok perantara.',
    example: 'Urutan pesanan #042, #043, #044 langsung diteruskan ke dapur dalam antrean tetap sesuai nomor.',
    leanSignificance:
      'Memangkas waktu tunggu supermarket untuk produk dengan permintaan yang sudah terprediksi dan relatif stabil.',
    tips: 'Digambar sebagai kotak kecil berlabel urutan (1,2,3) yang terhubung langsung ke proses.',
  },
  {
    id: 'load-leveling',
    name: 'Kotak Perata Beban (Load Leveling / Heijunka)',
    officialName: 'Load Leveling (Heijunka Box)',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#6366f1',
    shapeType: 'vsm-load-leveling',
    simpleExplanation:
      'Kotak berkolom yang meratakan volume dan jenis produksi dengan membagi kartu kanban ke slot waktu agar beban kerja rata.',
    analogy: 'Jadwal piket dapur yang diatur bergiliran agar semua anggota tim kebagian beban merata tiap hari.',
    example: 'Slot 10.00-11.00 diisi 4 kartu burger, 11.00-12.00 diisi 3 kartu burger dan 1 nasi ayam, dst.',
    leanSignificance:
      'Menghaluskan lonjakan permintaan sehingga proses hulu tidak kewalahan dan kapasitas terpakai efisien.',
    tips: 'Digambar sebagai kotak persegi dengan garis kolom vertikal (slot waktu) berisi kartu.',
  },
  {
    id: 'mrp-erp',
    name: 'Penjadwalan MRP/ERP',
    officialName: 'MRP / ERP Scheduling',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#7c3aed',
    shapeType: 'vsm-mrp-erp',
    simpleExplanation:
      'Kotak berisi ikon komputer yang menandakan perencanaan kebutuhan material dan jadwal produksi dihitung oleh sistem ERP/MRP terpusat.',
    analogy: 'Aplikasi kasir yang otomatis menghitung: stok habis dikurangi, otomatis muncul daftar belanja ke supplier.',
    example: 'Sistem POS QuickBite menghitung kebutuhan bahan baku harian dari data penjualan kemarin.',
    leanSignificance:
      'Pusat data terintegrasi untuk forecast, namun tetap perlu divalidasi dengan kondisi nyata di lantai produksi.',
    tips: 'Digambar sebagai kotak dengan ikon monitor atau tulisan MRP/ERP di dalamnya.',
  },
  {
    id: 'go-see',
    name: 'Langsung Lihat (Go See)',
    officialName: 'Go See',
    category: 'General & Kaizen',
    categoryLabel: 'Umum & Kaizen',
    badgeColor: '#0284c7',
    shapeType: 'vsm-go-see',
    simpleExplanation:
      'Ikon kacamata yang berarti manajer/pelaku proses mengamati langsung kondisi nyata di lapangan, bukan hanya membaca laporan.',
    analogy: 'Koki senior mencicipi langsung kuah di dapur daripada hanya membaca resep tertulis.',
    example: 'Pengelola QuickBite berdiri 15 menit di depan antrean untuk melihat sendiri bottleneck di jam sibuk.',
    leanSignificance:
      'Prinsip Genchi Genbutsu (go and see): keputusan perbaikan berbasis fakta lapangan, bukan asumsi.',
    tips: 'Digambar sebagai ikon kacamata; sering dipakai pada peta future state untuk titik observasi.',
  },
  {
    id: 'verbal-info',
    name: 'Informasi Lisan (Verbal Information)',
    officialName: 'Verbal Information',
    category: 'Information Flow',
    categoryLabel: 'Alur Informasi',
    badgeColor: '#db2777',
    shapeType: 'vsm-verbal-info',
    simpleExplanation:
      'Alur informasi yang disampaikan secara lisan atau personal, digambar sebagai panah dengan ikon orang kecil.',
    analogy: 'Teriak "satu es teh, Bu!" dari meja ke dapur tanpa tulisan.',
    example: 'Mahasiswa di kasir menyebut langsung menu favoritnya, dan kasir meneruskannya secara lisan ke koki.',
    leanSignificance:
      'Rentan salah dengar dan tidak terdokumentasi; pada future state biasanya diganti dengan sinyal visual atau digital.',
    tips: 'Panah bergelombang/tipis dengan simbol kepala-badan kecil di atasnya.',
  },

  // ==========================================
  // 7. SIMBOL TAMBAHAN (LUCIDCHART) - TIMELINE & METRICS
  // ==========================================
  {
    id: 'takt-time',
    name: 'Waktu Takt (Takt Time)',
    officialName: 'Takt Time',
    category: 'Timeline & Metrics',
    categoryLabel: 'Garis Waktu & Metrik',
    badgeColor: '#0f766e',
    shapeType: 'vsm-takt-time',
    simpleExplanation:
      'Kecepatan produksi yang harus dipenuhi agar selaras dengan permintaan pelanggan, dihitung dari waktu kerja dibagi jumlah permintaan.',
    analogy: 'Irama metronom pengatur tempo musik: semua alat musik (proses) harus mengikuti birama yang sama.',
    example: 'Jam buka 8 jam (480 menit) dibagi 120 pesanan/hari = Takt Time 4 menit per pesanan.',
    leanSignificance:
      'Patokan sinkronisasi seluruh proses: jika cycle time melebihi takt time, antrean pasti menumpuk.',
    tips: 'Biasanya ditulis di data box atau dekat kotak ringkasan sebagai angka acuan.',
  },
];
