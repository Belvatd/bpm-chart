export interface VsmStep {
  id: number;
  name: string;
  activity: string;
  waitTime: number; // in minutes
  processTime: number; // in minutes
  waitReason: string;
  processDetails: string;
  operator: string;
  batchSize: string;
  inventoryQty?: number; // Physical count / jumlah satuan antrean fisik (Lean VSM)
  inventoryUnit?: string; // Satuan fisik (Orang, Nota, Pesanan, Porsi)
  inventoryLabel?: string; // Keterangan antrean
  kaizenBurst?: {
    title: string;
    description: string;
  };
}

export interface VsmSummary {
  totalWaitTime: number;
  totalProcessTime: number;
  totalLeadTime: number;
  efficiency: number; // PCE in %
  wasteRatio: number; // %
  conclusion: string;
}

export const vsmStepsData: VsmStep[] = [
  {
    id: 1,
    name: 'Pemesanan & Pembayaran di Kasir',
    activity: 'Mahasiswa antre, menyebutkan pesanan lisan, kasir menulis nota manual, dan menerima pembayaran tunai.',
    waitTime: 10,
    processTime: 2,
    waitReason: 'Antrean lambat karena kasir harus menulis tangan nota rangkap dua dan menghitung kembalian tunai manual.',
    processDetails: 'Kasir menulis pesanan, menghitung total, dan menerima uang tunai.',
    operator: '1 Kasir',
    batchSize: '1 Customer',
    inventoryQty: 5,
    inventoryUnit: 'Orang',
    inventoryLabel: 'Antrean Mhs',
    kaizenBurst: {
      title: 'Digital Ordering (QR/Kiosk)',
      description: 'Ganti pemesanan lisan & nota manual dengan scan QR menu atau Self-Service Kiosk untuk menghilangkan antrean 10 menit.',
    },
  },
  {
    id: 2,
    name: 'Serah Terima Nota ke Dapur',
    activity: 'Lembar nota utama ditahan dan ditumpuk di meja kasir, lalu diantar secara manual dengan berjalan kaki ke area dapur tenant.',
    waitTime: 5,
    processTime: 1,
    waitReason: 'Penumpukan/Batching Delay: Nota sengaja dibiarkan menumpuk menunggu terkumpul 5 pesanan baru kasir berjalan mengantar.',
    processDetails: 'Kasir berjalan kaki membawa tumpukan nota fisik ke dapur.',
    operator: '1 Kasir (part-time)',
    batchSize: 'Batch 5 Nota',
    inventoryQty: 5,
    inventoryUnit: 'Nota',
    inventoryLabel: 'Batch 5 Nota',
    kaizenBurst: {
      title: 'Kitchen Display System (KDS)',
      description: 'Hapus sistem batching kertas. Pesanan langsung masuk secara real-time ke layar dapur begitu dibayar.',
    },
  },
  {
    id: 3,
    name: 'Persiapan & Memasak di Dapur',
    activity: 'Koki menerima nota fisik, membaca tulisan tangan yang buram, berpikir/bertanya, lalu mulai memasak.',
    waitTime: 3,
    processTime: 8,
    waitReason: 'Delay Konfirmasi: Koki bingung membaca tulisan buram atau singkatan tak baku, harus bolak-balik bertanya ke kasir.',
    processDetails: 'Koki memasak pesanan sesuai instruksi resep.',
    operator: '1 Koki',
    batchSize: '1 Porsi',
    inventoryQty: 3,
    inventoryUnit: 'Pesanan',
    inventoryLabel: 'Antrean Koki',
    kaizenBurst: {
      title: 'Standardized Order Tickets',
      description: 'Tiket pesanan digital dengan format teks standar dan jelas, menghilangkan salah tafsir singkatan koki.',
    },
  },
  {
    id: 4,
    name: 'Penyerahan Makanan',
    activity: 'Makanan jadi ditaruh di meja saji tenant, lalu koki/kasir memanggil nama pemesan secara lisan di tengah keramaian kantin.',
    waitTime: 4,
    processTime: 1,
    waitReason: 'Delay Pengambilan: Makanan dingin menganggur di meja saji karena panggilan lisan kalah dengan suara bising kantin kampus.',
    processDetails: 'Mahasiswa mendengar panggilan, maju ke meja saji, dan mengambil makanan.',
    operator: '1 Mahasiswa / Kasir',
    batchSize: '1 Porsi Saji',
    inventoryQty: 3,
    inventoryUnit: 'Porsi',
    inventoryLabel: 'Meja Saji',
    kaizenBurst: {
      title: 'Order Calling Screen / Buzzer',
      description: 'Pasang layar monitor pemanggil nomor antrean atau pager/buzzer getar agar mahasiswa langsung tahu saat pesanan siap.',
    },
  },
];

export const vsmSummaryData: VsmSummary = {
  totalWaitTime: 22,
  totalProcessTime: 12,
  totalLeadTime: 34,
  efficiency: +( (12 / 34) * 100 ).toFixed(1), // 35.3%
  wasteRatio: +( (22 / 34) * 100 ).toFixed(1), // 64.7%
  conclusion:
    'Waktu tunggu (Wait Time) mendominasi hampir 65% dari total waktu keseluruhan layanan (34 menit). Pemborosan terbesar (waste) terjadi karena sistem penumpukan nota fisik (batching delay 5 menit) dan antrean manual yang lambat di awal (10 menit). Hal ini membuktikan bahwa proses manual saat ini sangat tidak efisien dan membutuhkan digitalisasi (To-Be).',
};

export const vsmWorkcellStepsData: VsmStep[] = [
  {
    id: 1,
    name: 'Pemesanan Digital (QR Code / Kiosk)',
    activity: 'Mahasiswa memesan via Self-Service Kiosk atau Scan QR meja. Pembayaran otomatis via e-wallet/QRIS.',
    waitTime: 1,
    processTime: 2,
    waitReason: 'Antrean sangat minim (1 menit) karena tersedia multi-kiosk dan QR di setiap meja makan.',
    processDetails: 'Pelanggan memilih menu digital, bayar cashless, tiket digital otomatis terbit.',
    operator: 'Pelanggan Mandiri / 1 Kasir Standby',
    batchSize: '1 Customer (One-Piece Flow)',
    inventoryQty: 1,
    inventoryUnit: 'Orang',
    inventoryLabel: 'Antrean Kiosk',
    kaizenBurst: {
      title: 'Digital Ordering & QRIS',
      description: 'Menghilangkan nota fisik dan antrean manual.',
    },
  },
  {
    id: 2,
    name: 'Aliran FIFO Antrean Dapur (KDS)',
    activity: 'Tiket pesanan masuk secara real-time ke Kitchen Display System (KDS) di dalam sel kerja dengan batas buffer maksimal 3 pesanan.',
    waitTime: 1,
    processTime: 0,
    waitReason: 'Buffer antrean digital FIFO (maksimal 3 pesanan antre).',
    processDetails: 'KDS memvisualisasikan urutan pesanan secara otomatis tanpa kertas dan tanpa kurir jalan kaki.',
    operator: 'Sistem Terotomasi (KDS)',
    batchSize: '1 Pesanan (FIFO)',
    inventoryQty: 3,
    inventoryUnit: 'Pesanan (Max)',
    inventoryLabel: 'Buffer KDS',
    kaizenBurst: {
      title: 'Eliminasi Antar Nota',
      description: 'Tahap 2 tradisional (antar nota 5 menit) 100% DIHAPUS.',
    },
  },
  {
    id: 3,
    name: 'Workcell Dapur & Penyajian Terpadu',
    activity: 'Di dalam sel kerja tapal kuda (U-Shape), 2 staf multi-skilled meracik, menggoreng di fryer, melakukan plating, dan langsung menyerahkan makanan ke pelanggan.',
    waitTime: 0,
    processTime: 7,
    waitReason: 'Zero Wait: Aliran One-Piece Flow kontinu di dalam sel. Dari wajan langsung ke piring dan diserahkan di counter terpadu.',
    processDetails: 'Integrasi 3 sub-proses: 1. Racik bahan (1m) -> 2. Penggorengan cepat (5m) -> 3. Plating & Serah Terima (1m).',
    operator: '2 Staf Multi-Skilled (Koki & Server)',
    batchSize: '1 Porsi (Continuous Flow)',
    inventoryQty: 0,
    inventoryUnit: 'Zero WIP',
    inventoryLabel: 'One-Piece Flow',
    kaizenBurst: {
      title: 'U-Shaped Workcell Layout',
      description: 'Jarak antar alat hanya 1 langkah. Staf dapat saling membantu saat beban tinggi.',
    },
  },
];

export const vsmWorkcellSummaryData: VsmSummary = {
  totalWaitTime: 2,
  totalProcessTime: 9,
  totalLeadTime: 11,
  efficiency: +( (9 / 11) * 100 ).toFixed(1), // 81.8%
  wasteRatio: +( (2 / 11) * 100 ).toFixed(1), // 18.2%
  conclusion:
    'Penerapan Sel Kerja (U-Shaped Workcell) dan aliran One-Piece Flow memangkas Lead Time dari 34 menit menjadi hanya 11 menit (pengurangan 68%). Waktu pemborosan (Wait Time) anjlok 91% dari 22 menit menjadi 2 menit. Efisiensi siklus (PCE) melonjak drastis dari 35.3% ke 81.8%, mencapai standar kelas dunia!',
};

