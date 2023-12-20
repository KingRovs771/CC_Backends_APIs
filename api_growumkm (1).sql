-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 20, 2023 at 02:05 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api_growumkm`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_bank`
--

CREATE TABLE `tbl_bank` (
  `id_bank` int NOT NULL,
  `nama_bank` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kode_bank` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_bank`
--

INSERT INTO `tbl_bank` (`id_bank`, `nama_bank`, `kode_bank`) VALUES
(1, 'Bank BRI', '002');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dokumen`
--

CREATE TABLE `tbl_dokumen` (
  `id_dokumen` int NOT NULL,
  `id_umkm` int NOT NULL,
  `tgl_upload` date DEFAULT NULL,
  `link_dokumen` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_investor`
--

CREATE TABLE `tbl_investor` (
  `id_investing` int NOT NULL,
  `uuid_investing` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_user` int NOT NULL,
  `id_umkm` int NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `add` int DEFAULT NULL,
  `final` int DEFAULT NULL,
  `update_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_provinsi`
--

CREATE TABLE `tbl_provinsi` (
  `id_provinsi` int NOT NULL,
  `nama_provinsi` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_provinsi`
--

INSERT INTO `tbl_provinsi` (`id_provinsi`, `nama_provinsi`) VALUES
(1, 'Jawa Tengah'),
(2, 'Kalimantan Barat');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sektor`
--

CREATE TABLE `tbl_sektor` (
  `id_sektor` int NOT NULL,
  `nama_sektor` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_sektor`
--

INSERT INTO `tbl_sektor` (`id_sektor`, `nama_sektor`) VALUES
(1, 'Food');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_umkm`
--

CREATE TABLE `tbl_umkm` (
  `id_umkm` int NOT NULL,
  `id_user` int NOT NULL,
  `id_provinsi` int NOT NULL,
  `id_sektor` int NOT NULL,
  `tgl_daftar` date NOT NULL,
  `tgl_berakhir` date NOT NULL,
  `npwp` int DEFAULT NULL,
  `nama_umkm` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama_pengusaha` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `produk_utama` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `badan_hukum` varchar(70) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `jmlh_tenaga` int NOT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `penjualan_tahunan` int DEFAULT NULL,
  `sistem_penjulanan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_aset` float NOT NULL,
  `trgt_invest` float NOT NULL,
  `invest_amount` float NOT NULL,
  `bunga` int NOT NULL,
  `deskripsi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_umkm`
--

INSERT INTO `tbl_umkm` (`id_umkm`, `id_user`, `id_provinsi`, `id_sektor`, `tgl_daftar`, `tgl_berakhir`, `npwp`, `nama_umkm`, `nama_pengusaha`, `produk_utama`, `badan_hukum`, `jmlh_tenaga`, `alamat`, `penjualan_tahunan`, `sistem_penjulanan`, `total_aset`, `trgt_invest`, `invest_amount`, `bunga`, `deskripsi`, `img`, `link_video`) VALUES
(1, 1, 1, 1, '2023-12-20', '2024-01-16', 45451545, 'Gav Photography', 'Jordan Gav', 'Wedding Photography', 'CV', 10, 'Cantel', 250000, 'kurang tahu', 3424230, 5464560, 0, 2, 'Sebuah', 'asdasd', 'asdasd');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id_user` int NOT NULL,
  `id_provinsi` int NOT NULL,
  `nik` int DEFAULT NULL,
  `nama_lengkap` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tgl_lahir` date NOT NULL,
  `no_hp` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alamat` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_bank` int NOT NULL,
  `no_rek` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `update_daftar` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id_user`, `id_provinsi`, `nik`, `nama_lengkap`, `tgl_lahir`, `no_hp`, `alamat`, `email`, `password`, `id_bank`, `no_rek`, `token`, `update_daftar`) VALUES
(1, 1, 352135485, 'Rizky Budiarto', '2000-12-26', '0855254577', 'Teguhan', 'test@gmail.com', 'Rahasia', 1, '54587484512154', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_userview`
--

CREATE TABLE `tbl_userview` (
  `id_rating` int NOT NULL,
  `id_user` int NOT NULL,
  `id_umkm` int NOT NULL,
  `timestamp` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_bank`
--
ALTER TABLE `tbl_bank`
  ADD PRIMARY KEY (`id_bank`);

--
-- Indexes for table `tbl_dokumen`
--
ALTER TABLE `tbl_dokumen`
  ADD PRIMARY KEY (`id_dokumen`),
  ADD KEY `tbl_dokumen_id_umkm_fkey` (`id_umkm`);

--
-- Indexes for table `tbl_investor`
--
ALTER TABLE `tbl_investor`
  ADD PRIMARY KEY (`id_investing`),
  ADD KEY `tbl_investor_id_user_fkey` (`id_user`),
  ADD KEY `tbl_investor_id_umkm_fkey` (`id_umkm`);

--
-- Indexes for table `tbl_provinsi`
--
ALTER TABLE `tbl_provinsi`
  ADD PRIMARY KEY (`id_provinsi`);

--
-- Indexes for table `tbl_sektor`
--
ALTER TABLE `tbl_sektor`
  ADD PRIMARY KEY (`id_sektor`);

--
-- Indexes for table `tbl_umkm`
--
ALTER TABLE `tbl_umkm`
  ADD PRIMARY KEY (`id_umkm`),
  ADD UNIQUE KEY `tbl_umkm_id_user_key` (`id_user`),
  ADD UNIQUE KEY `tbl_umkm_id_provinsi_key` (`id_provinsi`),
  ADD UNIQUE KEY `tbl_umkm_id_sektor_key` (`id_sektor`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `tbl_users_id_provinsi_key` (`id_provinsi`),
  ADD UNIQUE KEY `tbl_users_id_bank_key` (`id_bank`);

--
-- Indexes for table `tbl_userview`
--
ALTER TABLE `tbl_userview`
  ADD PRIMARY KEY (`id_rating`),
  ADD KEY `tbl_userview_id_user_fkey` (`id_user`),
  ADD KEY `tbl_userview_id_umkm_fkey` (`id_umkm`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_bank`
--
ALTER TABLE `tbl_bank`
  MODIFY `id_bank` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_dokumen`
--
ALTER TABLE `tbl_dokumen`
  MODIFY `id_dokumen` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_investor`
--
ALTER TABLE `tbl_investor`
  MODIFY `id_investing` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_provinsi`
--
ALTER TABLE `tbl_provinsi`
  MODIFY `id_provinsi` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_sektor`
--
ALTER TABLE `tbl_sektor`
  MODIFY `id_sektor` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_umkm`
--
ALTER TABLE `tbl_umkm`
  MODIFY `id_umkm` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_userview`
--
ALTER TABLE `tbl_userview`
  MODIFY `id_rating` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_dokumen`
--
ALTER TABLE `tbl_dokumen`
  ADD CONSTRAINT `tbl_dokumen_id_umkm_fkey` FOREIGN KEY (`id_umkm`) REFERENCES `tbl_umkm` (`id_umkm`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_investor`
--
ALTER TABLE `tbl_investor`
  ADD CONSTRAINT `tbl_investor_id_umkm_fkey` FOREIGN KEY (`id_umkm`) REFERENCES `tbl_umkm` (`id_umkm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_investor_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_umkm`
--
ALTER TABLE `tbl_umkm`
  ADD CONSTRAINT `tbl_umkm_id_provinsi_fkey` FOREIGN KEY (`id_provinsi`) REFERENCES `tbl_provinsi` (`id_provinsi`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_umkm_id_sektor_fkey` FOREIGN KEY (`id_sektor`) REFERENCES `tbl_sektor` (`id_sektor`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_umkm_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id_user`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD CONSTRAINT `tbl_users_id_bank_fkey` FOREIGN KEY (`id_bank`) REFERENCES `tbl_bank` (`id_bank`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_users_id_provinsi_fkey` FOREIGN KEY (`id_provinsi`) REFERENCES `tbl_provinsi` (`id_provinsi`) ON UPDATE CASCADE;

--
-- Constraints for table `tbl_userview`
--
ALTER TABLE `tbl_userview`
  ADD CONSTRAINT `tbl_userview_id_umkm_fkey` FOREIGN KEY (`id_umkm`) REFERENCES `tbl_umkm` (`id_umkm`) ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_userview_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `tbl_users` (`id_user`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
