export interface FishboneCause {
  text: string;
  detail?: string;
}

export interface FishboneCategory {
  id: string;
  name: string;
  englishName: string;
  color: string;
  position: 'top' | 'bottom';
  causes: FishboneCause[];
}

export interface FishboneData {
  problem: string;
  categories: FishboneCategory[];
}

export const defaultFishboneData: FishboneData = {
  problem: 'Sering terjadi kesalahan menu makanan yang disajikan kepada mahasiswa (salah menu atau salah jumlah) pada jam sibuk di kantin kampus.',
  categories: [
    {
      id: 'man',
      name: 'SDM',
      englishName: 'Man',
      color: '#3b82f6', // blue
      position: 'top',
      causes: [
        {
          text: 'Dominasi mahasiswa part-time',
          detail: 'Karyawan didominasi mahasiswa part-time yang sering berganti shift kerja.',
        },
        {
          text: 'Kurang pelatihan SOP pencatatan',
          detail: 'Kurangnya pelatihan standar operasional prosedur (SOP) pencatatan bagi staf baru.',
        },
      ],
    },
    {
      id: 'method',
      name: 'Metode',
      englishName: 'Method',
      color: '#8b5cf6', // purple
      position: 'top',
      causes: [
        {
          text: 'Singkatan manual tidak baku',
          detail: 'Kasir menggunakan singkatan manual buatan sendiri tanpa kamus baku, membuat koki salah interpretasi.',
        },
        {
          text: 'Tidak ada prosedur double-check',
          detail: 'Tidak ada prosedur validasi atau pengecekan ulang pesanan sebelum diserahkan ke dapur atau ke pelanggan.',
        },
      ],
    },
    {
      id: 'machine',
      name: 'Mesin / Alat',
      englishName: 'Machine',
      color: '#0284c7', // sky
      position: 'top',
      causes: [
        {
          text: 'Ketiadaan sistem POS / Struk otomatis',
          detail: 'Tidak adanya sistem POS (Point of Sales) atau mesin cetak struk otomatis; murni mengandalkan pencatatan kertas manual.',
        },
      ],
    },
    {
      id: 'material',
      name: 'Bahan / Media',
      englishName: 'Material',
      color: '#f59e0b', // amber
      position: 'bottom',
      causes: [
        {
          text: 'Kertas nota tipis & karbon pudar',
          detail: 'Kertas nota rangkap dua tipis, mudah basah terkena cipratan air, dan serat karbon mulai pudar.',
        },
        {
          text: 'Nota di dapur tidak dijepit clipboard',
          detail: 'Nota di dapur tidak dijepit menggunakan clipboard, mudah tertiup angin kipas atau terselip barang lain.',
        },
      ],
    },
    {
      id: 'measurement',
      name: 'Pengukuran',
      englishName: 'Measurement',
      color: '#10b981', // emerald
      position: 'bottom',
      causes: [
        {
          text: 'Tanpa KPI & target akurasi harian',
          detail: 'Manajemen tenant tidak memiliki indikator pengukuran atau target waktu yang jelas untuk memantau akurasi pesanan harian.',
        },
      ],
    },
    {
      id: 'environment',
      name: 'Lingkungan',
      englishName: 'Environment',
      color: '#ef4444', // red
      position: 'bottom',
      causes: [
        {
          text: 'Kantin bising & jarak kasir-dapur jauh',
          detail: 'Kondisi area kantin kampus sangat bising dan padat, ditambah jarak fisik kasir-dapur cukup jauh sehingga mengganggu komunikasi verbal.',
        },
      ],
    },
  ],
};
