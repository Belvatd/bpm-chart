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
