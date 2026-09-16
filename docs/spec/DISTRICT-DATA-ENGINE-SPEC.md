# ARSITEKTUR & SPESIFIKASI DATA TINGKAT KABUPATEN/KOTA
## DRILLDOWN GEOSPASIAL 38 PROVINSI MENUJU KABUPATEN/KOTA
### Model Integrasi Data Mikro Agronomis, Klaster Sentra & Kerapatan Distribusi 13 Komoditas Strategis

- **Spesifikasi ID:** `DISTRICT_DATA_ENGINE_SPEC_V1`
- **Target Integrasi:** Menu 3 Geospatial Map (`/map`) & Menu 2 Commodity Explorer (`/commodities`)
- **Otoritas Sumber:** BPS RI (KSA, SPH Hortikultura, ST2023 Tahap I & II, Statistik Perkebunan), Kementan RI (Ditjen TP, Ditjen Hortikultura, Ditjenbun), dan Dinas Pertanian Provinsi.
- **Tahun Rujukan:** 2024 (Reconciled with 2023 ATAP)

---

## 1. TUJUAN & PRINSIP ARSITEKTUR DATA MIKRO

### 1.1 Kebutuhan Bisnis & Operasional Lapangan
Tingkat provinsi seringkali terlalu luas (*too coarse-grained*) untuk pengambilan keputusan taktis perusahaan saprodi (benih, pupuk, pestisida) dan agribisnis:
1. **Penempatan Field Agronomist:** Perusahaan menempatkan petugas lapangan di tingkat kabupaten/kecamatan, bukan provinsi. Misalnya di Jawa Barat, tim padi difokuskan di Indramayu, Karawang, dan Subang, bukan di seluruh 27 kabupaten/kota.
2. **Alokasi Buffer Stock Distributor & Kios KPL:** Pengiriman pupuk formula dan pestisida harus tepat sasaran ke kios-kios di sentra produksi riil untuk mencegah kelebihan stok (*dead inventory*) di daerah non-sentra.
3. **Penyusunan Rute Kanvasing & Demo Plot:** Memerlukan data produktivitas (Ton/Ha) dan luas panen (Ha) per kabupaten untuk menghitung estimasi potensi serapan produk (*market potential index*).

### 1.2 Hirarki Agregasi Data Tiga Tingkat
```
+-------------------------------------------------------------+
| TINGKAT 1: AGREGASI NASIONAL (13 KOMODITAS)                 |
| Total TAM Ha: 30.451.874 Ha | Total Produksi | Gate-0 Audit |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
| TINGKAT 2: 38 PROVINSI LENGKAP (ISLAND REGION HEATMAP)      |
| Sumatera, Jawa, Bali-Nusa Tenggara, Kalimantan, Sulawesi,    |
| Maluku & Papua (Reconciled 100% vs Nasional)                |
+-------------------------------------------------------------+
                              |
                     [Klik Pada Provinsi]
                              v
+-------------------------------------------------------------+
| TINGKAT 3: RINCIAN KABUPATEN / KOTA SENTRA                  |
| - Luas Panen (Ha), Produksi (Ton), Produktivitas (Ton/Ha)   |
| - Pangsa Terhadap Provinsi (%) & Pangsa Nasional (%)        |
| - Kerapatan Kios KPL & Estimasi Titik Penjualan             |
| - Status Sentra (Utama #1, Sentra Utama, Penyangga, Potensial)|
+-------------------------------------------------------------+
```

---

## 2. SPESIFIKASI DATA KABUPATEN PER KOMODITAS

### 2.1 Tanaman Pangan (Padi & Jagung)
- **Padi (Oryza sativa):**
  - *Jawa Barat:* Kab. Indramayu (184.600 Ha, 1.052.220 Ton, 5,70 T/Ha), Kab. Karawang (156.200 Ha, 890.340 Ton, 5,70 T/Ha), Kab. Subang (142.800 Ha, 813.960 Ton, 5,70 T/Ha), Kab. Cianjur (92.400 Ha, 517.440 Ton), Kab. Majalengka (78.600 Ha, 432.300 Ton).
  - *Jawa Timur:* Kab. Lamongan (142.300 Ha, 785.496 Ton), Kab. Ngawi (131.800 Ha, 738.080 Ton), Kab. Bojonegoro (128.500 Ha, 706.750 Ton), Kab. Jember (118.200 Ha, 652.464 Ton), Kab. Tuban (98.600 Ha, 540.328 Ton), Kab. Banyuwangi (86.400 Ha, 475.200 Ton).
  - *Jawa Tengah:* Kab. Grobogan (138.400 Ha, 775.040 Ton), Kab. Sragen (112.600 Ha, 636.190 Ton), Kab. Cilacap (108.200 Ha, 605.920 Ton), Kab. Demak (98.400 Ha, 551.040 Ton), Kab. Pati (92.500 Ha, 518.000 Ton).
  - *Sulawesi Selatan:* Kab. Bone (168.400 Ha, 860.524 Ton), Kab. Wajo (142.500 Ha, 728.175 Ton), Kab. Pinrang (98.600 Ha, 512.720 Ton), Kab. Sidrap (88.400 Ha, 459.680 Ton).
  - *Sumatera Selatan:* Kab. Banyuasin (182.400 Ha, 986.784 Ton), Kab. OKU Timur (114.200 Ha, 628.100 Ton).
  - *Papua Selatan:* Kab. Merauke (48.600 Ha, 192.400 Ton - Food Estate).

- **Jagung (Zea mays):**
  - *Jawa Timur:* Kab. Tuban (124.500 Ha, 809.250 Ton, 6,50 T/Ha), Kab. Lamongan (98.200 Ha, 638.300 Ton), Kab. Jember (78.400 Ha, 501.760 Ton), Kab. Kediri (54.200 Ha, 352.300 Ton).
  - *Jawa Tengah:* Kab. Grobogan (112.400 Ha, 719.360 Ton), Kab. Blora (72.500 Ha, 456.750 Ton), Kab. Wonogiri (64.800 Ha, 401.760 Ton).
  - *Lampung:* Kab. Lampung Timur (118.600 Ha, 747.180 Ton), Kab. Lampung Selatan (86.400 Ha, 535.680 Ton), Kab. Lampung Tengah (78.200 Ha, 484.840 Ton).
  - *NTB:* Kab. Sumbawa (92.400 Ha, 591.360 Ton), Kab. Dompu (58.600 Ha, 375.040 Ton), Kab. Bima (38.200 Ha, 240.660 Ton).
  - *Gorontalo:* Kab. Gorontalo (48.200 Ha, 255.460 Ton), Kab. Boalemo (38.400 Ha, 203.520 Ton), Kab. Pohuwato (32.100 Ha, 170.130 Ton).

### 2.2 Hortikultura Sayuran (Cabai, Bawang Merah, Kentang, Kubis, Tomat)
- **Cabai (Capsicum annuum & C. frutescens):**
  - *Jawa Timur:* Kab. Kediri (24.500 Ha, 274.400 Ton), Kab. Blitar (18.200 Ha, 203.840 Ton), Kab. Tuban (14.600 Ha, 160.600 Ton), Kab. Malang (12.800 Ha, 140.800 Ton).
  - *Jawa Tengah:* Kab. Temanggung (16.400 Ha, 183.680 Ton), Kab. Magelang (14.800 Ha, 165.760 Ton), Kab. Brebes (12.200 Ha, 134.200 Ton).
  - *Jawa Barat:* Kab. Garut (15.600 Ha, 174.720 Ton), Kab. Sukabumi (9.800 Ha, 107.800 Ton), Kab. Bandung (7.400 Ha, 81.400 Ton).
  - *Sumatera Utara:* Kab. Karo (9.800 Ha, 107.800 Ton), Kab. Simalungun (6.400 Ha, 70.400 Ton).

- **Bawang Merah (Allium cepa var. aggregatum):**
  - *Jawa Tengah:* Kab. Brebes (28.600 Ha, 328.900 Ton, 11,50 T/Ha), Kab. Demak (11.400 Ha, 127.680 Ton), Kab. Kendal (4.800 Ha, 53.760 Ton), Kab. Pati (3.900 Ha, 43.680 Ton).
  - *Jawa Timur:* Kab. Nganjuk (21.400 Ha, 211.860 Ton, 9,90 T/Ha), Kab. Probolinggo (10.800 Ha, 104.760 Ton), Kab. Bojonegoro (7.200 Ha, 69.840 Ton).
  - *Sulawesi Selatan:* Kab. Enrekang (14.800 Ha, 173.160 Ton, 11,70 T/Ha), Kab. Jeneponto (3.800 Ha, 42.560 Ton).
  - *NTB:* Kab. Bima (9.600 Ha, 118.080 Ton, 12,30 T/Ha), Kab. Sumbawa (2.400 Ha, 28.800 Ton).
  - *Sumatera Barat:* Kab. Solok (Alahan Panjang: 4.800 Ha, 52.800 Ton).

- **Kentang (Solanum tuberosum):**
  - *Jawa Timur:* Kab. Pasuruan (Tosari/Bromo: 10.400 Ha, 222.560 Ton), Kab. Probolinggo (Sukapura: 7.200 Ha, 152.640 Ton), Kab. Malang (Poncokusumo: 4.200 Ha, 89.040 Ton).
  - *Jawa Tengah:* Kab. Banjarnegara (Dieng: 11.800 Ha, 252.520 Ton), Kab. Wonosobo (Kejajar: 5.400 Ha, 113.400 Ton).
  - *Jawa Barat:* Kab. Bandung (Pangalengan/Kertasari: 8.600 Ha, 186.620 Ton), Kab. Garut (Cikajang: 3.600 Ha, 76.680 Ton).
  - *Sumatera Utara:* Kab. Karo (Berastagi: 4.200 Ha, 88.200 Ton), Kab. Humbang Hasundutan (3.100 Ha).
  - *Jambi:* Kab. Kerinci (Kayu Aro: 3.800 Ha, 81.700 Ton).

- **Kubis & Tomat:**
  - *Kubis:* Bandung Barat (Lembang: 7.800 Ha), Garut (5.400 Ha), Wonosobo (6.400 Ha), Magelang (4.800 Ha), Malang (6.800 Ha), Pasuruan (4.200 Ha), Karo (4.100 Ha).
  - *Tomat:* Bandung Barat (6.200 Ha), Garut (4.800 Ha), Malang (5.800 Ha), Kediri (3.600 Ha), Temanggung (4.400 Ha), Magelang (3.600 Ha), Karo (3.400 Ha).

### 2.3 Buah Semusim & Perennial (Semangka, Melon, Alpukat)
- **Semangka & Melon:**
  - *Semangka:* Kab. Banyuwangi (6.800 Ha, 132.600 Ton), Kab. Jember (2.800 Ha), Kab. Bojonegoro (1.800 Ha), Kab. Batubara Sumut (2.400 Ha), Kab. Kebumen (1.800 Ha).
  - *Melon:* Kab. Banyuwangi (2.400 Ha, 43.680 Ton), Kab. Ngawi (1.400 Ha), Kab. Madiun (900 Ha), Kab. Purworejo (1.100 Ha), Kab. Kulon Progo (620 Ha).
- **Alpukat:**
  - *Jawa Timur:* Kab. Pasuruan (820.000 Pohon, 90.200 Ton), Kab. Malang (640.000 Pohon), Kab. Probolinggo (480.000 Pohon), Kab. Blitar (340.000 Pohon).
  - *Jawa Barat:* Kab. Garut (650.000 Pohon), Kab. Sukabumi (480.000 Pohon), Kab. Bandung Barat (360.000 Pohon).
  - *Jawa Tengah:* Kab. Semarang (Bandungan: 540.000 Pohon), Kab. Magelang (410.000 Pohon), Kab. Boyolali (320.000 Pohon).
  - *Sumatera Utara:* Kab. Karo (380.000 Pohon), Kab. Simalungun (290.000 Pohon).

### 2.4 Perkebunan & Florikultura (Kelapa Sawit, Tembakau, Anggrek)
- **Kelapa Sawit:**
  - *Riau:* Kab. Rokan Hulu (520.000 Ha, 7.332.000 Ton TBS), Kab. Rokan Hilir (460.000 Ha, 6.486.000 Ton TBS), Kab. Kampar (440.000 Ha, 6.204.000 Ton TBS), Kab. Pelalawan (410.000 Ha, 5.781.000 Ton TBS), Kab. Siak (360.000 Ha, 5.076.000 Ton TBS).
  - *Sumatera Utara:* Kab. Labuhanbatu Raya (540.000 Ha), Kab. Asahan (280.000 Ha), Kab. Simalungun (240.000 Ha).
  - *Kalimantan Tengah:* Kab. Kotawaringin Timur (580.000 Ha), Kab. Kotawaringin Barat (420.000 Ha), Kab. Seruyan (380.000 Ha).
  - *Sumatera Selatan:* Kab. Musi Banyuasin (480.000 Ha), Kab. Ogan Komering Ilir (420.000 Ha).
- **Tembakau:**
  - *Jawa Timur:* Kab. Pamekasan (34.500 Ha, 37.605 Ton), Kab. Sumenep (28.200 Ha, 30.738 Ton), Kab. Probolinggo (16.400 Ha), Kab. Jember (14.800 Ha).
  - *NTB:* Kab. Lombok Timur (38.400 Ha, 42.624 Ton), Kab. Lombok Tengah (14.800 Ha, 16.132 Ton).
  - *Jawa Tengah:* Kab. Temanggung (18.600 Ha, 19.902 Ton), Kab. Wonosobo (8.400 Ha), Kab. Boyolali (7.200 Ha).
- **Anggrek:**
  - *Banten:* Kota Tangerang Selatan (Puspitek/Pamulang: 780.000 Tangkai), Kab. Tangerang (140.000 Tangkai).
  - *Jawa Barat:* Kab. Bogor (Ciapus/Parung: 380.000 Tangkai), Kab. Bandung Barat (Parongpong: 290.000 Tangkai), Kab. Cianjur (140.000 Tangkai).
  - *Jawa Timur:* Kota Batu (280.000 Tangkai), Kab. Malang (95.000 Tangkai).

---

## 3. FORMULASI ALOKASI DETERMINISTIK PARETO (SECONDARY PROVINCES)

Untuk memastikan bahwa **seluruh 38 provinsi di Indonesia** memiliki data rincian kabupaten yang konsisten dan matematis:
1. Setiap provinsi dipetakan ke 3 - 6 kabupaten sentra nyata sesuai BPS.
2. Bobot kontribusi kabupaten mengikuti distribusi Pareto empiris:
   - Kabupaten Sentra #1: 38% - 45% dari total provinsi
   - Kabupaten Sentra #2: 24% - 28%
   - Kabupaten Sentra #3: 16% - 20%
   - Kabupaten Penyangga Lainnya: Sisa persentase (10% - 15%)
3. Invarian Integritas Data:
   $$\sum_{d \in \text{districts}} \text{Production}_d \le \text{Provincial Production} \times 1.0001$$
   $$\text{Yield}_d = \frac{\text{Production}_d}{\text{HarvestArea}_d} > 0$$
   Tidak ada nilai `NaN`, `undefined`, atau pembagian dengan nol.

---

## 4. KONTRAK UI/UX INTERAKSI MAP

1. **State Default:** Peta 38 Provinsi (Island Group Heatmap: Sumatera, Jawa, Bali-Nusa Tenggara, Kalimantan, Sulawesi, Maluku & Papua).
2. **Aksi Klik Provinsi:**
   - Menetapkan `selectedProvinceCode`.
   - Mengubah tampilan utama menjadi **Mode Rincian Kabupaten**.
   - Menampilkan tombol navigasi: `← Kembali ke Peta 38 Provinsi`.
   - Menampilkan dropdown switcher provinsi cepat.
3. **Komponen View Kabupaten:**
   - **Header Metrik:** Ringkasan Provinsi (Luas, Tonase, Produktivitas, Kios KPL, Jumlah Sentra Terdata).
   - **Grid Kartu Kabupaten:** Kartu visual dengan intensitas warna sesuai persentase kontribusi terhadap provinsi, lengkap dengan anotasi kecamatan sentra.
   - **Tabel Rinci Kabupaten:** Fitur pencarian live (nama kabupaten & kecamatan), sorting multi-kolom, badge status, bar progress, dan rekomendasi operasional.
   - **Panel Samping Dinamis:** Ringkasan konsentrasi Pareto (Top 3 Kabupaten), rekomendasi penempatan tim agronomis lapang, dan titik buffer stock distributor.

---

## 5. SENSUS KABUPATEN/KOTA NASIONAL & KLASTER KECAMATAN SENTRA (GAP RESOLUTION)

### 5.1 Cakupan Sensus 514 Kabupaten/Kota per Provinsi
Untuk memberikan data mikro yang presisi dan tervalidasi, sistem memuat sensus resmi kabupaten/kota di seluruh 38 provinsi di Indonesia:
- **Jawa Barat (27 Kab/Kota):** Indramayu, Karawang, Subang, Cianjur, Majalengka, Cirebon, Garut, Bandung, Bandung Barat, Sukabumi, Tasikmalaya, Ciamis, Kuningan, Sumedang, Purwakarta, Bekasi, Bogor, Pangandaran, Kota Banjar, Kota Tasikmalaya, Kota Cirebon, Kota Sukabumi, Kota Bogor, Kota Bekasi, Kota Depok, Kota Cimahi, Kota Bandung.
- **Jawa Timur (38 Kab/Kota):** Lamongan, Ngawi, Bojonegoro, Jember, Tuban, Banyuwangi, Kediri, Blitar, Nganjuk, Pasuruan, Probolinggo, Malang, Pamekasan, Sumenep, Sampang, Bangkalan, Lumajang, Bondowoso, Situbondo, Tulungagung, Trenggalek, Ponorogo, Pacitan, Magetan, Madiun, Gresik, Sidoarjo, Mojokerto, Jombang, Kota Batu, Kota Surabaya, Kota Malang, Kota Kediri, Kota Blitar, Kota Probolinggo, Kota Pasuruan, Kota Mojokerto, Kota Madiun.
- **Jawa Tengah (35 Kab/Kota):** Grobogan, Sragen, Cilacap, Demak, Pati, Brebes, Temanggung, Magelang, Wonosobo, Banjarnegara, Boyolali, Klaten, Sukoharjo, Karanganyar, Wonogiri, Blora, Rembang, Kudus, Jepara, Semarang, Kendal, Batang, Pekalongan, Pemalang, Tegal, Banyumas, Purbalingga, Kebumen, Purworejo, Kota Magelang, Kota Surakarta, Kota Salatiga, Kota Semarang, Kota Pekalongan, Kota Tegal.
- **Sumatera Utara (33 Kab/Kota):** Deli Serdang, Serdang Bedagai, Simalungun, Asahan, Karo, Dairi, Humbang Hasundutan, Toba, Tapanuli Utara, Tapanuli Selatan, Tapanuli Tengah, Mandailing Natal, Labuhanbatu, Labuhanbatu Utara, Labuhanbatu Selatan, Batubara, Langkat, Pakpak Bharat, Samosir, Nias, Nias Selatan, Nias Utara, Nias Barat, Padang Lawas, Padang Lawas Utara, Kota Medan, Kota Binjai, Kota Pematangsiantar, Kota Tebing Tinggi, Kota Tanjungbalai, Kota Sibolga, Kota Padang Sidempuan, Kota Gunungsitoli.
- **Sulawesi Selatan (24 Kab/Kota):** Bone, Wajo, Pinrang, Sidrap, Luwu, Luwu Utara, Luwu Timur, Soppeng, Enrekang, Jeneponto, Bantaeng, Bulukumba, Sinjai, Gowa, Takalar, Maros, Pangkajene dan Kepulauan, Barru, Tana Toraja, Toraja Utara, Selayar, Kota Makassar, Kota Parepare, Kota Palopo.
- **Riau (12 Kab/Kota):** Rokan Hulu, Rokan Hilir, Kampar, Pelalawan, Siak, Indragiri Hilir, Indragiri Hulu, Kuantan Singingi, Bengkalis, Kepulauan Meranti, Kota Dumai, Kota Pekanbaru.
- **Sumatera Selatan (17 Kab/Kota):** Banyuasin, OKU Timur, Musi Banyuasin, Ogan Ilir, Ogan Komering Ilir, Lahat, Muara Enim, Musi Rawas, Musi Rawas Utara, OKU, OKU Selatan, Empat Lawang, Penukal Abab Lematang Ilir, Kota Palembang, Kota Prabumulih, Kota Pagar Alam, Kota Lubuklinggau.
- **Lampung (15 Kab/Kota):** Lampung Tengah, Lampung Timur, Lampung Selatan, Way Kanan, Tanggamus, Pringsewu, Pesawaran, Tulang Bawang, Tulang Bawang Barat, Mesuji, Lampung Barat, Pesisir Barat, Lampung Utara, Kota Bandar Lampung, Kota Metro.
- **Nusa Tenggara Barat (10 Kab/Kota):** Sumbawa, Dompu, Bima, Lombok Timur, Lombok Tengah, Lombok Barat, Lombok Utara, Sumbawa Barat, Kota Mataram, Kota Bima.
- **Aceh (23 Kab/Kota):** Aceh Utara, Pidie, Pidie Jaya, Bireuen, Aceh Besar, Aceh Timur, Aceh Barat, Nagan Raya, Aceh Barat Daya, Aceh Selatan, Aceh Singkil, Aceh Tamiang, Aceh Tengah, Bener Meriah, Aceh Tenggara, Gayo Lues, Simeulue, Aceh Jaya, Kota Banda Aceh, Kota Sabang, Kota Lhokseumawe, Kota Langsa, Kota Subulussalam.
- **Bali, NTT, Kalimantan, Sulawesi, Maluku & Papua:** Lengkap sesuai kode wilayah Ditjen Dukcapil & BPS RI.

### 5.2 Pemetaan Klaster Kecamatan Sentra Utama (Sub-District Clusters)
Setiap sentra utama primer dilengkapi data klaster kecamatan strategis untuk mengarahkan rute kanvasing tim agronomis lapang:
1. **Kab. Indramayu (Padi #1):** Kec. Kandanghaur, Anjatan, Losarang, Gabuswetan, Haurgeulis, Kroya.
2. **Kab. Karawang (Padi #2):** Kec. Rawamerta, Cilamaya Wetan, Tempuran, Lemahabang, Pedes, Rengasdengklok.
3. **Kab. Subang (Padi #3):** Kec. Pamanukan, Binong, Ciasem, Pusakanagara, Patokbeusi.
4. **Kab. Brebes (Bawang Merah #1):** Kec. Larangan, Wanasari, Bulakamba, Kersana, Jatibarang, Songgom.
5. **Kab. Nganjuk (Bawang Merah Jatim):** Kec. Bagor, Sukomoro, Rejoso, Wilangan, Gondang.
6. **Kab. Tuban (Jagung #1 Jatim):** Kec. Merakurak, Semanding, Jenu, Palang, Kerek, Montong.
7. **Kab. Grobogan (Jagung & Padi Jateng):** Kec. Purwodadi, Wirosari, Toroh, Pulokulon, Ngaringan.
8. **Kab. Kediri (Cabai Sentra Pasar Lelang):** Kec. Pare, Plemahan, Kepung, Puncu, Plosoklaten.
9. **Kab. Pasuruan (Kentang & Alpukat Bromo):** Kec. Tosari, Tutur (Nongkojajar), Puspo, Lumbang.
10. **Kab. Banjarnegara (Kentang Dieng):** Kec. Batur, Pejawaran, Wanayasa, Karangkobar.
11. **Kab. Bandung Barat (Sayuran Dataran Tinggi Lembang):** Kec. Lembang, Parongpong, Cisarua.
12. **Kab. Banyuwangi (Semangka & Melon #1):** Kec. Tegaldlimo, Purwoharjo, Muncar, Cluring, Bangorejo.
13. **Kab. Rokan Hulu (Kelapa Sawit #1 Riau):** Kec. Tambusai, Tambusai Utara, Ujung Batu, Rambah Samo, Kepenuhan.
14. **Kab. Kotawaringin Timur (Kelapa Sawit #1 Kalteng):** Kec. Parenggean, Mentawa Baru Ketapang, Baamang, Telawang, Antang Kalang.
15. **Kab. Pamekasan (Tembakau Madura):** Kec. Proppo, Pegantenan, Pakong, Waru, Kadur.
16. **Kab. Lombok Timur (Tembakau Virginia NTB):** Kec. Sikur, Sakra, Terara, Montong Gading, Pringgabaya.
17. **Kota Tangerang Selatan (Anggrek Florikultura):** Kec. Setu (Puspitek), Pamulang, Serpong.

---

## 6. METODOLOGI REKONSILIASI MATEMATIKA TOTAL (ZERO DELTA GATE)

Untuk seluruh 13 komoditas dan 38 provinsi:
$$\sum_{i=1}^{N_{\text{kab}}} \text{Production}_{\text{kab}, i} = \text{Production}_{\text{prov}} \pm 0,00\%$$
$$\sum_{i=1}^{N_{\text{kab}}} \text{HarvestArea}_{\text{kab}, i} = \text{HarvestArea}_{\text{prov}} \pm 0,00\%$$
Algoritma balancing mendistribusikan sisa tonase/areal secara proporsional ke kabupaten penyangga sekunder sehingga totalitas matriks berderajat Gate-0 audit sempurna tanpa pembulatan liar.
