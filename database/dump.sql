-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 14-12-2023 a las 17:03:34
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
-- dump v2
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistemaqr`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_alumno`
--

CREATE TABLE `ctb_alumno` (
  `id_alumno` int(11) NOT NULL,
  `nombre_alumno` varchar(50) NOT NULL,
  `apellido_alumno` varchar(50) NOT NULL,
  `boleta` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_alumno`
--

INSERT INTO `ctb_alumno` (`id_alumno`, `nombre_alumno`, `apellido_alumno`, `boleta`) VALUES
(4, 'JOSHUA ALEXANDER ', 'DEL MONTE ORTEGA', '2021350820');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_ciclo`
--

CREATE TABLE `ctb_ciclo` (
  `id_ciclo` int(11) NOT NULL,
  `ciclo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_ciclo`
--

INSERT INTO `ctb_ciclo` (`id_ciclo`, `ciclo`) VALUES
(16, '2024-1'),
(17, '2023-2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_grupo`
--

CREATE TABLE `ctb_grupo` (
  `id_grupo` int(11) NOT NULL,
  `grupo` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_grupo`
--

INSERT INTO `ctb_grupo` (`id_grupo`, `grupo`) VALUES
(12, '4CM11'),
(13, '6CV13'),
(14, '6CV16'),
(15, '5CV23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_laboratorio`
--

CREATE TABLE `ctb_laboratorio` (
  `id_laboratorio` int(11) NOT NULL,
  `laboratorio` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_laboratorio`
--

INSERT INTO `ctb_laboratorio` (`id_laboratorio`, `laboratorio`) VALUES
(11, '2'),
(12, '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_lista_asistencia`
--

CREATE TABLE `ctb_lista_asistencia` (
  `id_lista_asistencia` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `id_maestro` int(11) NOT NULL,
  `id_ciclo` int(11) NOT NULL,
  `id_laboratorio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_lista_asistencia`
--

INSERT INTO `ctb_lista_asistencia` (`id_lista_asistencia`, `id_grupo`, `id_materia`, `id_maestro`, `id_ciclo`, `id_laboratorio`) VALUES
(11, 12, 12, 13, 16, 11),
(12, 13, 13, 14, 16, 12),
(13, 14, 14, 15, 16, 11),
(14, 15, 15, 14, 17, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_maestro`
--

CREATE TABLE `ctb_maestro` (
  `id_maestro` int(11) NOT NULL,
  `maestro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_maestro`
--

INSERT INTO `ctb_maestro` (`id_maestro`, `maestro`) VALUES
(13, 'Ramiréz Hernández Jazmín'),
(14, 'Calzada Salas Ricardo I.'),
(15, 'Mendiola Medellin Maria Elena');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_materia`
--

CREATE TABLE `ctb_materia` (
  `id_materia` int(11) NOT NULL,
  `materia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_materia`
--

INSERT INTO `ctb_materia` (`id_materia`, `materia`) VALUES
(12, 'Analisis Numerico'),
(13, 'Sistemas Operativos'),
(14, 'Metodologia De La Investigacion '),
(15, 'Análisis De Algoritmos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ctb_usuario`
--

CREATE TABLE `ctb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `boleta` varchar(10) NOT NULL,
  `contrasenia` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ctb_usuario`
--

INSERT INTO `ctb_usuario` (`id_usuario`, `nombre_usuario`, `correo`, `boleta`, `contrasenia`) VALUES
(1, 'Jhon Doe', 'some@some.dev', '123456789', 'U2FsdGVkX1/jDXUo1Ujk+6OJpyIMKnncJFMeP6e3Q80='),
(2, 'Juanito Perez', 'juanito@noexiste.tampoco', '123456', 'U2FsdGVkX1/YTVUoWpAC9s4WkPNgxC2zxbc3rifCNo8='),
(3, 'Kolop', 'hoikwet@ppplo.com', '787878', 'U2FsdGVkX19ta9HhzC2prihF+Q1iOocfpZXiedyqmxQ='),
(4, 'Hola', 'some@some.some', '123', 'U2FsdGVkX1+I49f7O32dEeSc454xJEE2kpRWNF+VaIc='),
(5, 'Sd', 'some@gmail.com', '1234', 'U2FsdGVkX19bQq1CKQCt0RHbkSAICIa8uMCPse5On30='),
(6, 'Some', 'al@gmail.com', '4123', 'U2FsdGVkX1+ZFOMe+j1Kp8rBltPPQ0H9Xg8a9CG1WJg='),
(7, 'Some Name', 'qwe@sdsd.cm', '12340', 'U2FsdGVkX18fxQr58L6p0n5CmSffOJ1BJ/SFsfltiU8='),
(8, 'Juanito', 'some@gmail.com', '1313', 'U2FsdGVkX197gI3b+uaEQe/0De3BLlC8TlYHK8jmfVk='),
(9, 'DVE', 'sdsda@dodf.com', '12345', 'U2FsdGVkX18FQOxXQgI8fFhMfNcEM3k1KL4gaWrJ2yE='),
(10, 'Master', 'joshuin21@gmail.com', '2021350820', 'U2FsdGVkX1+IX3vCTq03oxsJJZA6g/i/rxg2s20aHrs=');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ttb_asistencia`
--

CREATE TABLE `ttb_asistencia` (
  `id_asistencia` int(11) NOT NULL,
  `id_alumno` int(11) NOT NULL,
  `id_lista_asistencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_asistencia` date NOT NULL DEFAULT current_timestamp(),
  `numero_maquina` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ttb_asistencia`
--

INSERT INTO `ttb_asistencia` (`id_asistencia`, `id_alumno`, `id_lista_asistencia`, `id_usuario`, `fecha_asistencia`, `numero_maquina`) VALUES
(19, 4, 11, 9, '2023-12-12', '0'),
(20, 4, 11, 9, '2023-12-13', '1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ctb_alumno`
--
ALTER TABLE `ctb_alumno`
  ADD PRIMARY KEY (`id_alumno`);

--
-- Indices de la tabla `ctb_ciclo`
--
ALTER TABLE `ctb_ciclo`
  ADD PRIMARY KEY (`id_ciclo`);

--
-- Indices de la tabla `ctb_grupo`
--
ALTER TABLE `ctb_grupo`
  ADD PRIMARY KEY (`id_grupo`);

--
-- Indices de la tabla `ctb_laboratorio`
--
ALTER TABLE `ctb_laboratorio`
  ADD PRIMARY KEY (`id_laboratorio`);

--
-- Indices de la tabla `ctb_lista_asistencia`
--
ALTER TABLE `ctb_lista_asistencia`
  ADD PRIMARY KEY (`id_lista_asistencia`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_materia` (`id_materia`),
  ADD KEY `id_maestro` (`id_maestro`),
  ADD KEY `id_ciclo` (`id_ciclo`),
  ADD KEY `id_laboratorio` (`id_laboratorio`);

--
-- Indices de la tabla `ctb_maestro`
--
ALTER TABLE `ctb_maestro`
  ADD PRIMARY KEY (`id_maestro`);

--
-- Indices de la tabla `ctb_materia`
--
ALTER TABLE `ctb_materia`
  ADD PRIMARY KEY (`id_materia`);

--
-- Indices de la tabla `ctb_usuario`
--
ALTER TABLE `ctb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `boleta` (`boleta`);

--
-- Indices de la tabla `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  ADD PRIMARY KEY (`id_asistencia`),
  ADD KEY `id_alumno` (`id_alumno`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_lista_asistencia` (`id_lista_asistencia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ctb_alumno`
--
ALTER TABLE `ctb_alumno`
  MODIFY `id_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ctb_ciclo`
--
ALTER TABLE `ctb_ciclo`
  MODIFY `id_ciclo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `ctb_grupo`
--
ALTER TABLE `ctb_grupo`
  MODIFY `id_grupo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ctb_laboratorio`
--
ALTER TABLE `ctb_laboratorio`
  MODIFY `id_laboratorio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `ctb_lista_asistencia`
--
ALTER TABLE `ctb_lista_asistencia`
  MODIFY `id_lista_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `ctb_maestro`
--
ALTER TABLE `ctb_maestro`
  MODIFY `id_maestro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ctb_materia`
--
ALTER TABLE `ctb_materia`
  MODIFY `id_materia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `ctb_usuario`
--
ALTER TABLE `ctb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  MODIFY `id_asistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ctb_lista_asistencia`
--
ALTER TABLE `ctb_lista_asistencia`
  ADD CONSTRAINT `ctb_lista_asistencia_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `ctb_materia` (`id_materia`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ctb_lista_asistencia_ibfk_2` FOREIGN KEY (`id_maestro`) REFERENCES `ctb_maestro` (`id_maestro`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ctb_lista_asistencia_ibfk_3` FOREIGN KEY (`id_grupo`) REFERENCES `ctb_grupo` (`id_grupo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ctb_lista_asistencia_ibfk_4` FOREIGN KEY (`id_ciclo`) REFERENCES `ctb_ciclo` (`id_ciclo`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ctb_lista_asistencia_ibfk_5` FOREIGN KEY (`id_laboratorio`) REFERENCES `ctb_laboratorio` (`id_laboratorio`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `ttb_asistencia`
--
ALTER TABLE `ttb_asistencia`
  ADD CONSTRAINT `ttb_asistencia_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `ctb_alumno` (`id_alumno`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ttb_asistencia_ibfk_4` FOREIGN KEY (`id_usuario`) REFERENCES `ctb_usuario` (`id_usuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ttb_asistencia_ibfk_5` FOREIGN KEY (`id_lista_asistencia`) REFERENCES `ctb_lista_asistencia` (`id_lista_asistencia`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;