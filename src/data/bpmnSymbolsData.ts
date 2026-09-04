export type BpmnCategory =
  | 'Event'
  | 'Activity'
  | 'Gateway'
  | 'Connecting'
  | 'Swimlane'
  | 'Data & Artifact';

export interface BpmnSymbolItem {
  id: string;
  name: string;
  officialName: string;
  category: BpmnCategory;
  categoryLabel: string;
  badgeColor: string;
  shapeType: string;
  simpleExplanation: string;
  analogy: string;
  example: string;
  tips?: string;
}

export const bpmnCategories: { id: BpmnCategory | 'All'; label: string }[] = [
  { id: 'All', label: 'Semua Simbol' },
  { id: 'Event', label: 'Peristiwa (Event)' },
  { id: 'Activity', label: 'Tugas & Aktivitas (Task)' },
  { id: 'Gateway', label: 'Gerbang Keputusan (Gateway)' },
  { id: 'Connecting', label: 'Garis Penghubung (Flow)' },
  { id: 'Swimlane', label: 'Aktor & Kolam (Swimlane)' },
  { id: 'Data & Artifact', label: 'Data & Dokumen' },
];

export const bpmnSymbolsList: BpmnSymbolItem[] = [
  // ==========================================
  // 1. EVENTS
  // ==========================================
  {
    id: 'start-event',
    name: 'Titik Awal (Start Event)',
    officialName: 'Start Event (None)',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#16a34a', // green
    shapeType: 'start-none',
    simpleExplanation:
      'Pintu gerbang pembuka alur proses. Menandakan saat di mana suatu proses bisnis resmi dimulai tanpa syarat otomatis khusus.',
    analogy: 'Peluit kick-off pertandingan bola ditiup untuk memulai permainan.',
    example: 'Mahasiswa tiba di depan konter QuickBite untuk mulai memesan makanan.',
    tips: 'Hanya boleh memiliki panah KELUAR (outgoing flow), tidak boleh ada panah masuk.',
  },
  {
    id: 'timer-start-event',
    name: 'Awal Berdasarkan Waktu / Jadwal',
    officialName: 'Timer Start Event',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#16a34a',
    shapeType: 'start-timer',
    simpleExplanation:
      'Proses yang otomatis terpicu begitu mencapai jam, tanggal, atau interval waktu rutin tertentu.',
    analogy: 'Jam weker berdering setiap pukul 06.00 pagi.',
    example: 'Setiap pukul 08.00 pagi, koki wajib menyalakan kompor dan mengecek stok bahan baku.',
    tips: 'Sangat cocok untuk proses berkala (harian, mingguan, atau bulanan).',
  },
  {
    id: 'message-start-event',
    name: 'Awal Karena Menerima Pesan / Data',
    officialName: 'Message Start Event',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#16a34a',
    shapeType: 'start-message',
    simpleExplanation:
      'Proses baru akan mulai berjalan hanya jika ada pesan, email, sinyal, atau payload data yang datang dari pihak luar.',
    analogy: 'Driver ojol baru menyalakan motor ketika HP-nya berbunyi ada pesanan masuk.',
    example: 'Sistem dapur mulai membuat pesanan setelah notifikasi pembayaran transfer online diterima.',
    tips: 'Dipicu oleh pihak eksternal (di luar Pool yang bersangkutan).',
  },
  {
    id: 'intermediate-timer-event',
    name: 'Jeda Waktu Tunggu (Timer Intermediate)',
    officialName: 'Intermediate Timer Event',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#d97706', // amber
    shapeType: 'intermediate-timer',
    simpleExplanation:
      'Titik henti sementara di tengah proses. Alur harus menunggu durasi tertentu sebelum boleh lanjut ke langkah berikutnya.',
    analogy: 'Memasang timer oven 15 menit dan menunggu sampai kue matang sebelum diangkat.',
    example: 'Tunggu selama 5 menit agar adonan ayam goreng meresap bumbu sebelum dimasukkan ke wajan.',
    tips: 'Menggunakan garis lingkaran ganda tipis (double line).',
  },
  {
    id: 'end-event',
    name: 'Titik Selesai Normal (End Event)',
    officialName: 'End Event (None)',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#dc2626', // red
    shapeType: 'end-none',
    simpleExplanation:
      'Titik akhir dari sebuah jalur proses. Menandakan bahwa rangkaian langkah pada jalur tersebut telah rampung.',
    analogy: 'Garis finish pada lintasan lari maraton.',
    example: 'Mahasiswa menerima pesanan makanan dan meninggalkan konter (Proses Selesai).',
    tips: 'Digambar dengan garis lingkaran tebal (bold single line). Hanya ada panah masuk.',
  },
  {
    id: 'terminate-end-event',
    name: 'Titik Henti Paksa (Terminate End)',
    officialName: 'Terminate End Event',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#991b1b',
    shapeType: 'end-terminate',
    simpleExplanation:
      'Tombol darurat pemutus alur. Begitu titik ini tersentuh, SELURUH proses (termasuk tugas lain yang sedang jalan bersamaan) langsung dibatalkan seketika.',
    analogy: 'Menekan tombol Emergency Stop pada eskalator atau mesin pabrik.',
    example: 'Mahasiswa membatalkan transaksi karena dompet tertinggal, seluruh alur memasak & kasir dibatalkan langsung.',
    tips: 'Ada bulatan hitam pekat di dalam lingkaran tebal.',
  },
  {
    id: 'error-end-event',
    name: 'Titik Akhir Gagal / Kesalahan',
    officialName: 'Error End Event',
    category: 'Event',
    categoryLabel: 'Peristiwa (Event)',
    badgeColor: '#b91c1c',
    shapeType: 'end-error',
    simpleExplanation:
      'Titik akhir yang menandakan proses terhenti karena terjadi kegagalan fatal atau kondisi tak terduga.',
    analogy: 'Layar komputer blue-screen atau mesin ATM kehabisan uang tunai saat penarikan.',
    example: 'Gas kompor dapur mendadak habis dan pesanan tidak dapat diselesaikan.',
    tips: 'Memiliki simbol petir di dalam lingkaran tebal.',
  },

  // ==========================================
  // 2. ACTIVITIES / TASKS
  // ==========================================
  {
    id: 'user-task',
    name: 'Tugas Manusia Berbantu Sistem (User Task)',
    officialName: 'User Task',
    category: 'Activity',
    categoryLabel: 'Tugas & Aktivitas (Task)',
    badgeColor: '#2563eb', // blue
    shapeType: 'task-user',
    simpleExplanation:
      'Pekerjaan yang dilakukan oleh manusia (operator/karyawan) dengan bantuan aplikasi, software, atau komputer.',
    analogy: 'Kasir mengetik nama menu di layar monitor komputer kasir.',
    example: 'Kasir menginput jumlah porsi pesanan mahasiswa ke aplikasi POS (Point of Sales).',
    tips: 'Ikon orang di pojok kiri atas kotak.',
  },
  {
    id: 'manual-task',
    name: 'Tugas Manual Murni Fisik (Manual Task)',
    officialName: 'Manual Task',
    category: 'Activity',
    categoryLabel: 'Tugas & Aktivitas (Task)',
    badgeColor: '#475569',
    shapeType: 'task-manual',
    simpleExplanation:
      'Pekerjaan fisik yang murni dikerjakan oleh tenaga manusia tanpa melibatkan interaksi sistem software apa pun.',
    analogy: 'Menyapu lantai toko atau mengaduk kuah sayur di panci.',
    example: 'Koki mengiris bawang dan menggoreng nasi di wajan dapur.',
    tips: 'Ikon tangan di pojok kiri atas.',
  },
  {
    id: 'service-task',
    name: 'Tugas Otomatis Sistem (Service Task)',
    officialName: 'Service Task',
    category: 'Activity',
    categoryLabel: 'Tugas & Aktivitas (Task)',
    badgeColor: '#0284c7',
    shapeType: 'task-service',
    simpleExplanation:
      'Tugas yang dikerjakan 100% otomatis oleh program komputer/server/API tanpa campur tangan manusia sama sekali.',
    analogy: 'Mesin ATM menghitung saldo dan memotong saldo rekening Anda secara otomatis.',
    example: 'Sistem payment gateway memverifikasi pembayaran QRIS dan mengirimkan konfirmasi sukses dalam 2 detik.',
    tips: 'Ikon roda gigi (gear) di pojok kiri atas.',
  },
  {
    id: 'send-receive-task',
    name: 'Tugas Kirim & Terima Pesan',
    officialName: 'Send Task / Receive Task',
    category: 'Activity',
    categoryLabel: 'Tugas & Aktivitas (Task)',
    badgeColor: '#6366f1',
    shapeType: 'task-message',
    simpleExplanation:
      'Send Task bertugas mengirimkan pesan ke pihak lain. Receive Task menunggu dan menerima pesan masuk tersebut sebelum melanjutkan alur.',
    analogy: 'Kasir mengirim SMS resi, dan pelanggan membuka SMS resi tersebut.',
    example: 'Sistem mengirim WhatsApp notifikasi bahwa makanan sudah matang kepada nomor HP mahasiswa.',
    tips: 'Send Task memiliki amplop hitam/gelap, Receive Task memiliki amplop putih transparan.',
  },
  {
    id: 'sub-process',
    name: 'Sub-Proses (Sub-Process)',
    officialName: 'Sub-Process (Collapsed)',
    category: 'Activity',
    categoryLabel: 'Tugas & Aktivitas (Task)',
    badgeColor: '#4f46e5',
    shapeType: 'task-sub',
    simpleExplanation:
      'Kotak aktivitas majemuk yang di dalamnya tersimpan serangkaian langkah proses tersendiri yang lebih rinci.',
    analogy: 'Bab atau bab-anak di dalam buku panduan yang bisa dibuka untuk membaca rinciannya.',
    example: 'Aktivitas "Proses Penutupan Kasir Harian" (yang rinciannya mencakup hitung uang laci, cetak rekap z-report, setor uang ke brankas).',
    tips: 'Memiliki kotak kecil bersimbol tanda tambah [+] di bagian tengah bawah.',
  },

  // ==========================================
  // 3. GATEWAYS (LOGIKA ALUR)
  // ==========================================
  {
    id: 'exclusive-gateway',
    name: 'Pilihan Tunggal / Salah Satu (XOR Gateway)',
    officialName: 'Exclusive Gateway (XOR)',
    category: 'Gateway',
    categoryLabel: 'Gerbang Keputusan (Gateway)',
    badgeColor: '#d97706',
    shapeType: 'gateway-exclusive',
    simpleExplanation:
      'Persimpangan jalan bercabang di mana hanya TEPAT SATU jalur yang boleh dipilih (Apakah A ATAU B). Jika satu jalan dipilih, jalan lain tidak akan dilewati.',
    analogy: 'Lampu hijau dan merah: Anda hanya bisa jalan (Ya) ATAU berhenti (Tidak), tidak bisa keduanya sekaligus.',
    example: 'Cek stok bahan baku: Jika "Stok Ada", masak makanan. Jika "Stok Habis", tawarkan refund uang.',
    tips: 'Bentuk belah ketupat dengan simbol huruf silang [X].',
  },
  {
    id: 'parallel-gateway',
    name: 'Jalur Bersamaan / Serentak (AND Gateway)',
    officialName: 'Parallel Gateway (AND)',
    category: 'Gateway',
    categoryLabel: 'Gerbang Keputusan (Gateway)',
    badgeColor: '#059669',
    shapeType: 'gateway-parallel',
    simpleExplanation:
      'Titik percabangan di mana SEMUA jalur cabang wajib dijalankan serentak secara bersamaan tanpa perlu memilih.',
    analogy: 'Ketika pesanan paket komplit masuk: satu koki memanggang burger DAN koki lain menggoreng kentang di saat yang sama.',
    example: 'Satu staf menyiapkan es teh manis, sementara di saat bersamaan koki memasak nasi goreng.',
    tips: 'Bentuk belah ketupat dengan simbol tanda tambah [+]. Tidak memerlukan kondisi Ya/Tidak.',
  },
  {
    id: 'inclusive-gateway',
    name: 'Pilihan Fleksibel (OR Gateway)',
    officialName: 'Inclusive Gateway (OR)',
    category: 'Gateway',
    categoryLabel: 'Gerbang Keputusan (Gateway)',
    badgeColor: '#7c3aed',
    shapeType: 'gateway-inclusive',
    simpleExplanation:
      'Persimpangan di mana Anda bisa memilih satu, dua, atau bahkan semua cabang sekaligus tergantung syarat mana yang terpenuhi.',
    analogy: 'Memilih topping martabak: bisa pilih cokelat saja, keju saja, ATAU cokelat dan keju sekaligus.',
    example: 'Pelanggan bisa meminta struk via kertas cetak, via email PDF, atau kedua-duanya.',
    tips: 'Bentuk belah ketupat dengan simbol lingkaran bulat [O] di dalamnya.',
  },

  // ==========================================
  // 4. CONNECTING OBJECTS
  // ==========================================
  {
    id: 'sequence-flow',
    name: 'Garis Urutan Kerja (Sequence Flow)',
    officialName: 'Sequence Flow',
    category: 'Connecting',
    categoryLabel: 'Garis Penghubung (Flow)',
    badgeColor: '#1e293b',
    shapeType: 'flow-sequence',
    simpleExplanation:
      'Garis panah padat yang menunjukkan urutan pengerjaan langkah berikutnya di dalam satu organisasi/pool yang sama.',
    analogy: 'Jalan satu arah yang wajib diikuti dari pos 1 ke pos 2.',
    example: 'Dari "Kasir Menulis Nota", panah langsung mengarah ke "Kasir Menghitung Total Harga".',
    tips: 'Garis lurus tegas warna gelap berujung mata panah padat. TIDAK boleh menyeberangi batas Pool.',
  },
  {
    id: 'message-flow',
    name: 'Garis Pesan Antar-Pihak (Message Flow)',
    officialName: 'Message Flow',
    category: 'Connecting',
    categoryLabel: 'Garis Penghubung (Flow)',
    badgeColor: '#0284c7',
    shapeType: 'flow-message',
    simpleExplanation:
      'Garis putus-putus yang menggambarkan pertukaran informasi, dokumen, atau pesan antar dua entitas independen (antar Pool yang berbeda).',
    analogy: 'Surat atau paket yang dikirimkan dari rumah Anda ke rumah teman.',
    example: 'Mahasiswa mengirim pesan suara pesanan ke Kasir Tenant, atau Bank mengirim notifikasi debit ke rekening toko.',
    tips: 'Garis putus-putus dengan lingkaran kecil di pangkal dan mata panah berongga di ujungnya.',
  },

  // ==========================================
  // 5. SWIMLANES (AKTOR & KOLAM)
  // ==========================================
  {
    id: 'pool',
    name: 'Kolam Organisasi (Pool / Participant)',
    officialName: 'Pool / Participant',
    category: 'Swimlane',
    categoryLabel: 'Aktor & Kolam (Swimlane)',
    badgeColor: '#047857',
    shapeType: 'swimlane-pool',
    simpleExplanation:
      'Kotak persegi panjang besar yang mewakili satu entitas bisnis utuh atau organisasi independen (cth: Perusahaan, Tenant, Pelanggan Luar).',
    analogy: 'Satu gedung kantor atau satu perusahaan utuh yang memiliki aturan kerja internalnya sendiri.',
    example: 'Pool "Tenant QuickBite" terpisah dari Pool "Mahasiswa Kampus".',
    tips: 'Alur kerja di dalam pool bersifat internal. Komunikasi antar-pool hanya boleh menggunakan Message Flow.',
  },
  {
    id: 'lane',
    name: 'Jalur Peran / Jabatan (Lane)',
    officialName: 'Lane',
    category: 'Swimlane',
    categoryLabel: 'Aktor & Kolam (Swimlane)',
    badgeColor: '#0369a1',
    shapeType: 'swimlane-lane',
    simpleExplanation:
      'Sub-bagian atau sekat di dalam Pool yang membagi tugas berdasarkan jabatan, divisi, atau peran spesifik.',
    analogy: 'Meja kerja divisi di dalam ruangan kantor: meja Kasir, meja Akuntan, dan meja Dapur.',
    example: 'Di dalam Pool QuickBite terdapat Lane "Kasir" dan Lane "Dapur / Koki".',
    tips: 'Sequence Flow boleh bebas menyeberang antar-lane di dalam satu pool yang sama.',
  },

  // ==========================================
  // 6. DATA & ARTIFACTS
  // ==========================================
  {
    id: 'data-object',
    name: 'Objek Data / Dokumen Fisik',
    officialName: 'Data Object',
    category: 'Data & Artifact',
    categoryLabel: 'Data & Dokumen',
    badgeColor: '#b45309',
    shapeType: 'data-object',
    simpleExplanation:
      'Menunjukkan informasi atau dokumen fisik/digital yang dibutuhkan atau dihasilkan oleh suatu tugas.',
    analogy: 'Lembar formulir pendaftaran atau selembar kertas nota kwitansi belanja.',
    example: 'Lembar "Nota Rangkap 2" yang ditulis oleh kasir dan dibawa ke koki.',
    tips: 'Bentuk persegi panjang kertas dengan lipatan di sudut kanan atas.',
  },
  {
    id: 'data-store',
    name: 'Basis Data / Tempat Simpan Data',
    officialName: 'Data Store',
    category: 'Data & Artifact',
    categoryLabel: 'Data & Dokumen',
    badgeColor: '#b45309',
    shapeType: 'data-store',
    simpleExplanation:
      'Tempat penyimpanan data permanen di mana informasi dapat disimpan, dibaca, dan diperbarui secara berkala.',
    analogy: 'Lemari arsip dokumen kantor atau server database SQL cloud.',
    example: 'Database Menu & Harga Makanan pada server cloud QuickBite.',
    tips: 'Bentuk tabung silinder drum (seperti kaleng).',
  },
];
