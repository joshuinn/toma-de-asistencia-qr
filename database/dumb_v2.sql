-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2024 at 08:14 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistemaqr`
--

-- --------------------------------------------------------

--
-- Table structure for table `ttb_asistencia`
--

CREATE TABLE `ttb_asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_lista_asistencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_asistencia` date NOT NULL DEFAULT current_timestamp(),
  `numero_maquina` varchar(2) NOT NULL,
  `numero_lista` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ttb_asistencia`
--

INSERT INTO `ttb_asistencia` (`id_asistencia`, `id_alumno`, `id_lista_asistencia`, `id_usuario`, `fecha_asistencia`, `numero_maquina`, `numero_lista`) VALUES
(52, 4, 22, 2, '2024-01-10', '0', 1),
(53, 6, 22, 2, '2024-01-10', '0', 2),
(54, 6, 22, 2, '2024-01-10', '12', 3),
(55, 4, 22, 2, '2024-01-10', '16', 3),
(56, 4, 20, 2, '2024-01-10', '0', 1),
(57, 6, 20, 2, '2024-01-10', '0', 2),
(58, 6, 22, 2, '2024-01-10', '1', 4),
(59, 4, 22, 2, '2024-01-10', '2', 4),
(60, 5, 22, 2, '2024-01-10', '6', 4),
(61, 7, 22, 2, '2024-01-10', '15', 4),
(62, 8, 22, 2, '2024-01-10', '0', 4),
(63, 9, 22, 2, '2024-01-10', '3', 4),
(64, 10, 22, 2, '2024-01-10', '0', 4),
(65, 11, 22, 2, '2024-01-10', '0', 4),
(66, 12, 22, 2, '2024-01-10', '5', 4),
(67, 13, 22, 2, '2024-01-10', '4', 4),
(68, 14, 22, 2, '2024-01-10', '5', 4),
(69, 15, 22, 2, '2024-01-10', '16', 4),
(70, 16, 22, 2, '2024-01-10', '0', 4),
(71, 4, 12, 2, '2024-01-11', '0', 1),
(72, 16, 12, 2, '2024-01-11', '0', 1),
(73, 17, 22, 2, '2024-01-11', '8', 5),
(74, 18, 22, 2, '2024-01-11', '0', 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_lista_asistencia` (`id_lista_asistencia`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  ADD CONSTRAINT `ttb_asistencia_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `ctb_alumno` (`id_alumno`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ttb_asistencia_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `ctb_usuario` (`id_usuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ttb_asistencia_ibfk_5` FOREIGN KEY (`id_lista_asistencia`) REFERENCES `ctb_lista_asistencia` (`id_lista_asistencia`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
