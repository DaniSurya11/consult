"use client";

export interface Lawyer {
  id: number;
  name: string;
  verified: boolean;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  tags: string[];
  status: string;
  price: string;
  priceNum: number;
  img: string;
  bio: string;
  education: string;
  license: string;
}

export const lawyers: Lawyer[] = [
  { 
    id: 1, 
    name: "Bima Pratama, S.H.", 
    verified: true,
    specialty: "Hukum Bisnis", 
    experience: "10+ tahun exp",
    rating: 4.9,
    reviews: 128,
    tags: ["Kontrak", "Perusahaan", "Investasi"],
    status: "Online",
    price: "Rp500.000",
    priceNum: 500000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA",
    bio: "Pakar hukum bisnis dengan pengalaman lebih dari 10 tahun menangani kasus korporasi, kontrak bisnis internasional, dan investasi. Lulusan Universitas Indonesia dengan gelar Doktor Ilmu Hukum.",
    education: "S3 Ilmu Hukum - Universitas Indonesia",
    license: "PERADI No. 12345/2014"
  },
  { 
    id: 2, 
    name: "Siti Halimah, S.H.", 
    verified: true,
    specialty: "Hukum Keluarga", 
    experience: "7+ tahun exp",
    rating: 4.8,
    reviews: 96,
    tags: ["Perceraian", "Hak Asuh Anak", "Harta Gono-gini"],
    status: "Online",
    price: "Rp400.000",
    priceNum: 400000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg",
    bio: "Spesialis hukum keluarga yang berpengalaman dalam menangani kasus perceraian, hak asuh anak, dan pembagian harta gono-gini. Dikenal dengan pendekatannya yang empatik namun tegas.",
    education: "S1 Ilmu Hukum - Universitas Gadjah Mada",
    license: "PERADI No. 23456/2017"
  },
  { 
    id: 3, 
    name: "Reza Fahlevi, S.H.", 
    verified: true,
    specialty: "Hukum Pidana", 
    experience: "8+ tahun exp",
    rating: 4.9,
    reviews: 112,
    tags: ["Pidana Umum", "Narkotika", "Cyber Crime"],
    status: "Online",
    price: "Rp600.000",
    priceNum: 600000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA",
    bio: "Advokat pidana berpengalaman yang telah menangani lebih dari 200 kasus pidana. Spesialisasi dalam kasus cyber crime dan narkotika dengan track record kemenangan 89%.",
    education: "S2 Hukum Pidana - Universitas Padjadjaran",
    license: "PERADI No. 34567/2016"
  },
  { 
    id: 4, 
    name: "Nadia Putri, S.H.", 
    verified: true,
    specialty: "Properti & Real Estate", 
    experience: "6+ tahun exp",
    rating: 4.7,
    reviews: 78,
    tags: ["Properti", "Sewa Menyewa", "Sertifikat"],
    status: "Offline",
    price: "Rp450.000",
    priceNum: 450000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg",
    bio: "Konsultan hukum properti yang membantu klien dalam transaksi jual-beli, sewa menyewa, dan sengketa tanah. Berpengalaman menangani proyek real estate berskala besar.",
    education: "S1 Ilmu Hukum - Universitas Diponegoro",
    license: "PERADI No. 45678/2018"
  },
  { 
    id: 5, 
    name: "Arif Rahman, S.H.", 
    verified: true,
    specialty: "Hukum Tenaga Kerja", 
    experience: "9+ tahun exp",
    rating: 4.8,
    reviews: 61,
    tags: ["PHK", "Perjanjian Kerja", "Pesangon"],
    status: "Online",
    price: "Rp350.000",
    priceNum: 350000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4JLHwnkjUhLBYjIgJAntKAAweR7xtfpXGcSctfMUhE_4OTPtI9YD6RfnFlH0rr-oVwLQy8kEWhqhcCvANSFvnyof9YmEhYg8PQHAQRo4EZIS50J1IOJtp9hd1Z6iM1Ij4BXwuDbuVEAnEbO9Oie5vRp4KhDcWV2v2nOloWoWGf2DNSjlbFlVZGy-uMkw_Idlm5g2kgARvU520bV2TANxXF5Me1vkLrqUFNs4ZhKAgJH_d8YMv_UlAOlJOUmU0IFmcjdre1oQFYcA",
    bio: "Ahli hukum ketenagakerjaan yang fokus pada perlindungan hak-hak pekerja. Berpengalaman dalam negosiasi perjanjian kerja, penanganan kasus PHK, dan perhitungan pesangon.",
    education: "S2 Hukum Bisnis - Universitas Airlangga",
    license: "PERADI No. 56789/2015"
  },
  { 
    id: 6, 
    name: "Dewi Sartika, S.H.", 
    verified: true,
    specialty: "Hukum Perdata", 
    experience: "5+ tahun exp",
    rating: 4.6,
    reviews: 44,
    tags: ["Perjanjian", "Gugatan", "Wanprestasi"],
    status: "Offline",
    price: "Rp300.000",
    priceNum: 300000,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuClCtB_n6jEhhPenDhf10PmiIs8PmjS6xvS7S6iA79EqKvpcXLltq-HcFjfS1-zl-4CJ1vZMtaO7RxQj_K1uvZGQ9A3IJNDi--gc_lYrrfDsUWL9CzMuj1qOd3iYfzoFRSm2kHY7aE98a4NA0LzncBdb97lMFhUdkz-pO1c_gEOR2a6kEjm2QidX2QFdRZfsP_W20yWNnzLlt4Zoqk8fZbdqpa-lDavulAgvZAw2fG-OHaRPRJ7wUcL2pi0KpeOZSA6Lji4EnoXArg",
    bio: "Advokat perdata muda yang energik dengan kemampuan analisis hukum yang tajam. Spesialisasi dalam penanganan sengketa perjanjian, gugatan perdata, dan kasus wanprestasi.",
    education: "S1 Ilmu Hukum - Universitas Brawijaya",
    license: "PERADI No. 67890/2019"
  }
];

export function getLawyerById(id: number): Lawyer | undefined {
  return lawyers.find((l) => l.id === id);
}
