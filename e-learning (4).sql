-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2024 a las 10:10:44
-- Versión del servidor: 10.4.32-MariaDB-log
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `e-learning`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `ID_Actividad` int(11) NOT NULL,
  `ID_Curso` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Fecha_Publicacion` date NOT NULL,
  `Fecha_limite` date NOT NULL,
  `Descripcion` varchar(400) NOT NULL,
  `Dificultad` varchar(100) NOT NULL,
  `Tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`ID_Actividad`, `ID_Curso`, `Titulo`, `Fecha_Publicacion`, `Fecha_limite`, `Descripcion`, `Dificultad`, `Tipo`) VALUES
(1, 1, 'Crucigrama de Conceptos Básicos de Bases de Datos', '2024-05-08', '2024-05-22', 'Actividad didáctica enfocada en resolver un crucigrama para repasar los conceptos básicos de Bases de Datos.', 'Fácil', 'Crucigrama'),
(2, 2, 'Exámen Diagnóstico de Redes de Computadoras', '2024-05-06', '2024-05-09', 'Exámen Diagnóstico de los conceptos Básicos de la comunicación en redes para evaluar el nivel de los integrantes del curso.', 'Fácil', 'Cuestionario'),
(3, 3, 'Ahogado de Conceptos de Investigación', '2024-05-01', '2024-05-05', 'Juego didáctico para repasar conceptos básicos de los Fundamentos de la Metodología de la Investigación.', 'Intermedio', 'Ahogado'),
(4, 1, 'Quizz del Diseño de Distribución', '2024-05-12', '2024-05-21', 'Quizz para evaluar los conocimientos semanales relacionados al Diseño de Distribución de Bases de Datos.', 'Difícil', 'Cuestionario'),
(5, 2, 'Crucigrama de Conceptos de Enrutamiento', '2024-05-08', '2024-05-25', 'Crucigrama didáctico para repasar los conceptos básicos de enrutamiento de paquetes.', 'Difícil', 'Crucigrama');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `ID_Alumno` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Edad` int(11) NOT NULL,
  `Institucion` varchar(200) NOT NULL,
  `Carrera` varchar(200) NOT NULL,
  `Semestre` varchar(200) NOT NULL,
  `Grupo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`ID_Alumno`, `Nombre`, `Edad`, `Institucion`, `Carrera`, `Semestre`, `Grupo`) VALUES
(1, 'Ángel David Franco Hernández', 21, 'Universidad Autónoma del Estado de Hidalgo', 'Licenciatura en Ciencias Computacionales', 'Sexto', '2'),
(2, 'Isay Fajardo Reyes', 20, 'Universidad Autónoma del Estado de Hidalgo', 'Licenciatura en Ciencias Computacionales', 'Sexto', '2'),
(3, 'Samuel Alamilla Mejía', 20, 'Tecnológico de Pachuca', 'Licenciatura en Gastronomía', 'Quinto', '32'),
(4, 'Victor Vargas Yañez', 20, 'Universidad Autónoma del Estado de Hidalgo', 'Licenciatura en Ciencias Computacionales', 'Sexto', '2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

CREATE TABLE `calificacion` (
  `ID_Calificacion` int(11) NOT NULL,
  `Fecha_Asignacion` date NOT NULL,
  `Resultado` float NOT NULL,
  `Retroalimentación` varchar(200) NOT NULL,
  `ID_Actividad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario`
--

CREATE TABLE `comentario` (
  `ID_Comentario` int(11) NOT NULL,
  `Contenido` text NOT NULL,
  `Fecha_Publicacion` date NOT NULL,
  `ID_PerfilCurso` int(11) NOT NULL,
  `ID_Publicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentario`
--

INSERT INTO `comentario` (`ID_Comentario`, `Contenido`, `Fecha_Publicacion`, `ID_PerfilCurso`, `ID_Publicacion`) VALUES
(5, 'Muchas gracias profesor :), será un gusto aprender sobre las Bases de Datos Distribuidas', '2024-05-19', 1, 1),
(6, '¡Muy buena información! ', '2024-05-19', 2, 2),
(7, '¡Bienvenido al Curso!', '2024-05-19', 3, 1),
(8, 'Este concepto es muy difícil de entender :/', '2024-05-19', 5, 4),
(9, 'A mí no me quedó claro qué es un Nodo y cómo se representa gráficamente en un diagrama :c', '2024-05-20', 1, 7),
(10, '¡No te preocupes! En clase aclararemos este concepto. ¡Buen día!', '2024-05-20', 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `ID_Curso` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Descripcion` varchar(300) NOT NULL,
  `Autor` varchar(200) NOT NULL,
  `Fecha_Creacion` date NOT NULL,
  `Fecha_Final` date NOT NULL,
  `Dificultad` varchar(100) NOT NULL,
  `Semestre` varchar(100) NOT NULL,
  `Grupo` varchar(100) NOT NULL,
  `Licenciatura` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`ID_Curso`, `Nombre`, `Descripcion`, `Autor`, `Fecha_Creacion`, `Fecha_Final`, `Dificultad`, `Semestre`, `Grupo`, `Licenciatura`) VALUES
(1, 'Bases de Datos Distribuidas', 'Curso dedicado a analizar y estudiar los temas relacionados a las Bases de Datos Distribuidas. Disponible para los alumnos de 6to 2.', 'Eduardo Cornejo', '2024-02-05', '2024-05-31', 'Difícil', 'Sexto Semestre', '2', 'Ciencias Computacionales'),
(2, 'Redes de Computadoras', 'Curso dedicado a analizar y estudiar los temas relacionados a las Redes de Computadoras. Disponible para los alumnos de 6to 2.', 'Gonzalo Torres', '2024-02-12', '2024-05-28', 'Muy Difícil', 'Sexto Semestre', '2', 'Ciencias Computacionales'),
(3, 'Fundamentos de la Investigación', 'Curso dedicado a analizar y estudiar los temas relacionados a los Fundamentos Metodológicos para la Investigación. \r\nDisponible para los alumnos de 6to 2.', 'Carmen Vera', '2024-02-13', '2024-05-28', 'Intermedio', 'Sexto Semestre', '2', 'Ciencias Computacionales'),
(4, 'Diseño de Bases de Datos', 'Curso dedicado a analizar y estudiar los temas relacionados al Diseño de Bases de Datos. Disponible para los alumnos de 3ro 2.', 'Eduardo Cornejo', '2024-02-01', '2024-05-31', 'Intermedio', 'Tercer Semestre', '2', 'Ciencias Computacionales'),
(5, 'Comunicación de Redes', '\"Comunicación en Redes\" es un curso fundamental en el ámbito de las Ciencias Computacionales que explora los principios y fundamentos de las redes de comunicación.', 'Gonzalo Torres', '2024-02-12', '2024-05-30', 'Intermedio', 'Quinto', '2', 'Ciencias Computacionales'),
(6, 'Ingeniería de Software', 'Este curso abarca desde la concepción de un proyecto hasta su implementación y mantenimiento, pasando por el diseño, la programación, la prueba y la documentación del software.', 'Carmen Vera', '2024-02-09', '2024-05-29', 'Difícil', 'Tercero', '2', 'Ciencias Computacionales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_trabajo`
--

CREATE TABLE `equipo_trabajo` (
  `ID_Equipo` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Descripcion` varchar(400) NOT NULL,
  `Lider` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo_trabajo`
--

INSERT INTO `equipo_trabajo` (`ID_Equipo`, `Nombre`, `Descripcion`, `Lider`) VALUES
(1, 'Equipo Vibranium', 'Equipo dedicado al proyecto de Bases de Datos Distribuidas', 'Isay Fajardo Reyes'),
(2, 'Buscaminas', 'Equipo dedicado a la realización de Prácticas de Redes de Computadoras', 'Angel David Franco Hernández');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje`
--

CREATE TABLE `mensaje` (
  `ID_Mensaje` int(11) NOT NULL,
  `Destino` varchar(200) NOT NULL,
  `Contenido` varchar(500) NOT NULL,
  `Fecha_Envio` date NOT NULL,
  `ID_PerfilCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `ID_Perfil` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Contraseña` varchar(200) NOT NULL,
  `Tipo_Perfil` varchar(200) NOT NULL,
  `Biografia` varchar(400) NOT NULL,
  `Foto_Perfil` varchar(300) NOT NULL,
  `ID_Alumno` int(11) DEFAULT NULL,
  `ID_Profesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`ID_Perfil`, `Email`, `Contraseña`, `Tipo_Perfil`, `Biografia`, `Foto_Perfil`, `ID_Alumno`, `ID_Profesor`) VALUES
(1, 'fr397783@uaeh.edu.mx', '397783', 'Alumno', 'Alumno de la Licenciatura de Ciencias Computacionales perteneciente al grupo 6to 2 en la Universidad Autónoma del Estado de Hidalgo.', 'https://i.pinimg.com/564x/80/c9/0d/80c90d4609d9aa822f8071eded57f1a8.jpg', 1, NULL),
(2, 'fa403247@uaeh.edu.mx', '403247', 'Alumno', 'Alumno cursando el Sexto Semestre de la licenciatura en Ciencias Computacionales en la Universidad Autónoma del Estado de Hidalgo. Perteneciente al grupo 6to 2.', 'https://i.pinimg.com/564x/6f/3f/3e/6f3f3e06358146c319dfb7f070530daa.jpg', 2, NULL),
(3, 'al464191@uaeh.edu.mx', '464191', 'Alumno', 'Alumno cursando el Quinto Semestre de la licenciatura en Gastronomía en el Tecnológico de Pachuca. Perteneciente al grupo 5to 23.', 'https://i.pinimg.com/564x/22/14/a3/2214a38b161a1247d2d59cb292476eb1.jpg', 3, NULL),
(4, 'ver214897@uaeh.edu.mx', '214897', 'Profesor', 'Docente en la Universidad Autónoma del Estado de Hidalgo y autora de diversos cursos relacionados con la Licenciatura de Ciencias Computacionales.', 'https://i.pinimg.com/564x/8c/36/7c/8c367c74e30f5ae2fa9cf24b62ff6ca2.jpg', NULL, 1),
(5, 'tor562891@uaeh.edu.mx', '562891', 'Profesor', 'Docente en el Tecnológico de Pachuca y autor de diversos cursos relacionados con la Licenciatura de Ciencias Computacionales.', 'https://i.pinimg.com/564x/85/20/41/8520416d65838609f280146065013ffb.jpg', NULL, 2),
(6, 'cor765102@uaeh.edu.mx', '765102', 'Profesor', 'Docente en la Universidad Autónoma del Estado de Hidalgo y autor de diversos cursos para la Licenciatura de Ciencias Computacionales.', 'https://i.pinimg.com/564x/06/36/0a/06360a2ca91a0e07bf237877b31a187f.jpg', NULL, 3);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `perfil_alumno`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `perfil_alumno` (
`ID_Perfil` int(11)
,`Email` varchar(200)
,`Contraseña` varchar(200)
,`Tipo_Perfil` varchar(200)
,`Biografia` varchar(400)
,`Foto_Perfil` varchar(300)
,`Nombre` varchar(200)
,`Edad` int(11)
,`Institucion` varchar(200)
,`Carrera` varchar(200)
,`Semestre` varchar(200)
,`Grupo` varchar(200)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_curso`
--

CREATE TABLE `perfil_curso` (
  `ID_PerfilCurso` int(11) NOT NULL,
  `Fecha_Inscripcion` date NOT NULL,
  `ID_Perfil` int(11) NOT NULL,
  `ID_Curso` int(11) NOT NULL,
  `ID_Calificacion` int(11) DEFAULT NULL,
  `ID_Equipo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil_curso`
--

INSERT INTO `perfil_curso` (`ID_PerfilCurso`, `Fecha_Inscripcion`, `ID_Perfil`, `ID_Curso`, `ID_Calificacion`, `ID_Equipo`) VALUES
(1, '2024-02-20', 1, 1, NULL, 1),
(2, '2024-02-18', 2, 1, NULL, 1),
(3, '2024-02-27', 6, 1, NULL, NULL),
(4, '2024-02-18', 4, 3, NULL, NULL),
(5, '2024-02-20', 1, 2, NULL, 2),
(6, '2024-02-22', 2, 2, NULL, 1),
(7, '2024-02-15', 5, 2, NULL, NULL),
(8, '2024-02-27', 6, 4, NULL, NULL),
(10, '2024-02-20', 4, 6, NULL, NULL),
(13, '2024-02-10', 5, 5, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `perfil_profesor`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `perfil_profesor` (
`ID_Perfil` int(11)
,`Email` varchar(200)
,`Contraseña` varchar(200)
,`Tipo_Perfil` varchar(200)
,`Biografia` varchar(400)
,`Foto_Perfil` varchar(300)
,`Nombre` varchar(200)
,`NivelAcademico` varchar(200)
,`Licenciatura` varchar(200)
,`Institucion` varchar(200)
,`Especializacion` varchar(200)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `ID_Profesor` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Institucion` varchar(200) NOT NULL,
  `NivelAcademico` varchar(200) NOT NULL,
  `Licenciatura` varchar(200) NOT NULL,
  `Especializacion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`ID_Profesor`, `Nombre`, `Institucion`, `NivelAcademico`, `Licenciatura`, `Especializacion`) VALUES
(1, 'María del Carmen Vera Carranza', 'Universidad Autónoma del Estado de Hidalgo', 'Especialidad', 'Licenciatura en Ciencias Computacionales', 'Computación Educativa'),
(2, 'Gonzalo Alberto Torres Samperio', 'Tecnológico de Pachuca', 'Maestría', 'Licenciatura en Telecomunicaciones', 'Redes de Computadoras'),
(3, 'Eduardo Cornejo Velazquez', 'Universidad Autónoma del Estado de Hidalgo', 'Especialidad', 'Licenciatura en Ciencias Computacionales', 'Diseño e Implementación de Bases de Datos');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `publicacion_autor`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `publicacion_autor` (
`ID_Publicacion` int(11)
,`ID_Curso` int(11)
,`Titulo` varchar(100)
,`Categoria` varchar(200)
,`Contenido` text
,`Foto_Perfil` varchar(300)
,`Nombre` varchar(200)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicación`
--

CREATE TABLE `publicación` (
  `ID_Publicacion` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Categoria` varchar(200) NOT NULL,
  `Contenido` text NOT NULL,
  `ID_PerfilCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `publicación`
--

INSERT INTO `publicación` (`ID_Publicacion`, `Titulo`, `Categoria`, `Contenido`, `ID_PerfilCurso`) VALUES
(1, '¡Bienvenidos al curso de Bases de Datos Distribuidas!', 'Aviso', 'Es un honor para mí darles la bienvenida a este emocionante y desafiante curso. Seré su guía y facilitador a lo largo de este viaje de aprendizaje en el fascinante mundo de las bases de datos distribuidas.', 3),
(2, 'Introducción a las Bases de Datos Distribuidas', 'Información', 'Las bases de datos distribuidas son sistemas de almacenamiento de datos en los que los datos se distribuyen en múltiples ubicaciones físicas. A diferencia de las bases de datos centralizadas, en las cuales todos los datos se almacenan en un solo lugar, las bases de datos distribuidas permiten que los datos se repliquen y se almacenen en varios servidores o nodos, a menudo ubicados en diferentes geografías.', 3),
(3, '¡Bienvenidos al curso de Redes de Computadoras!', 'Aviso', 'Las redes de computadoras son fundamentales en la era digital en la que vivimos, ya que permiten la comunicación y el intercambio de información entre dispositivos a nivel local y global. Desde el uso de internet hasta la interconexión de dispositivos en una oficina, las redes son la columna vertebral de la tecnología moderna', 7),
(4, '¿Qué es una Red de Computadoras?', 'Información', 'Una red de computadoras es un conjunto de dispositivos interconectados que se comunican entre sí para compartir recursos e información. Estos dispositivos pueden incluir computadoras, servidores, impresoras, y otros equipos de hardware.\r\n', 7),
(6, '¿Qué es un Nodo?', 'Información', 'Un nodo en una base de datos distribuida es una unidad independiente que participa en el almacenamiento, procesamiento y gestión de datos en un sistema distribuido. Los nodos se comunican entre sí para coordinar el acceso y la actualización de datos, asegurando la consistencia, disponibilidad y partición de la base de datos. ', 3),
(7, 'Dudas sobre Temas Recientes', 'Pregunta', 'Este espacio está dedicado a que los alumnos compartan sus dudas de las clases recientes.', 3),
(8, 'Bienvenidos al Curso de Fundamentos de la Investigación', 'Aviso', '¡Bienvenidos al curso de Fundamentos de la Investigación! En este emocionante viaje académico, exploraremos las bases fundamentales que sustentan el proceso de investigación en diversas disciplinas.', 4),
(9, '¿De qué tratará este curso?', 'Información', 'Fundamentos de la Investigación es un curso diseñado para introducir a los estudiantes en los principios básicos que sustentan el proceso de investigación en diversas áreas del conocimiento. Explora conceptos fundamentales como la formulación de preguntas de investigación, la selección de métodos y técnicas de investigación, la recolección y análisis de datos, así como la presentación y comunicación de resultados. ', 4),
(10, '¡Bienvenidos al curso de Comunicación en Redes!', 'Información', '¡Bienvenidos al curso de Comunicación en Redes! Aquí, nos sumergiremos en el fascinante mundo de las redes de comunicación, donde cada conexión digital cuenta una historia. En este viaje, exploraremos cómo los dispositivos se conectan entre sí, intercambiando información en un universo digital interconectado.', 13);

-- --------------------------------------------------------

--
-- Estructura para la vista `perfil_alumno`
--
DROP TABLE IF EXISTS `perfil_alumno`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `perfil_alumno`  AS SELECT `perfil`.`ID_Perfil` AS `ID_Perfil`, `perfil`.`Email` AS `Email`, `perfil`.`Contraseña` AS `Contraseña`, `perfil`.`Tipo_Perfil` AS `Tipo_Perfil`, `perfil`.`Biografia` AS `Biografia`, `perfil`.`Foto_Perfil` AS `Foto_Perfil`, `alumno`.`Nombre` AS `Nombre`, `alumno`.`Edad` AS `Edad`, `alumno`.`Institucion` AS `Institucion`, `alumno`.`Carrera` AS `Carrera`, `alumno`.`Semestre` AS `Semestre`, `alumno`.`Grupo` AS `Grupo` FROM (`perfil` join `alumno` on(`perfil`.`ID_Alumno` = `alumno`.`ID_Alumno`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `perfil_profesor`
--
DROP TABLE IF EXISTS `perfil_profesor`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `perfil_profesor`  AS SELECT `perfil`.`ID_Perfil` AS `ID_Perfil`, `perfil`.`Email` AS `Email`, `perfil`.`Contraseña` AS `Contraseña`, `perfil`.`Tipo_Perfil` AS `Tipo_Perfil`, `perfil`.`Biografia` AS `Biografia`, `perfil`.`Foto_Perfil` AS `Foto_Perfil`, `profesor`.`Nombre` AS `Nombre`, `profesor`.`NivelAcademico` AS `NivelAcademico`, `profesor`.`Licenciatura` AS `Licenciatura`, `profesor`.`Institucion` AS `Institucion`, `profesor`.`Especializacion` AS `Especializacion` FROM (`perfil` join `profesor` on(`perfil`.`ID_Profesor` = `profesor`.`ID_Profesor`)) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `publicacion_autor`
--
DROP TABLE IF EXISTS `publicacion_autor`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `publicacion_autor`  AS SELECT `p`.`ID_Publicacion` AS `ID_Publicacion`, `c`.`ID_Curso` AS `ID_Curso`, `p`.`Titulo` AS `Titulo`, `p`.`Categoria` AS `Categoria`, `p`.`Contenido` AS `Contenido`, `pe`.`Foto_Perfil` AS `Foto_Perfil`, `pr`.`Nombre` AS `Nombre` FROM ((((`publicación` `p` join `perfil_curso` `pc` on(`p`.`ID_PerfilCurso` = `pc`.`ID_PerfilCurso`)) join `perfil` `pe` on(`pc`.`ID_Perfil` = `pe`.`ID_Perfil`)) join `profesor` `pr` on(`pe`.`ID_Profesor` = `pr`.`ID_Profesor`)) join `curso` `c` on(`pc`.`ID_Curso` = `c`.`ID_Curso`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`ID_Actividad`),
  ADD KEY `ID_Curso` (`ID_Curso`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`ID_Alumno`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`ID_Calificacion`),
  ADD KEY `ID_Actividad` (`ID_Actividad`);

--
-- Indices de la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`ID_Comentario`),
  ADD KEY `ID_PerfilCurso` (`ID_PerfilCurso`),
  ADD KEY `ID_Publicacion` (`ID_Publicacion`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`ID_Curso`);

--
-- Indices de la tabla `equipo_trabajo`
--
ALTER TABLE `equipo_trabajo`
  ADD PRIMARY KEY (`ID_Equipo`);

--
-- Indices de la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD PRIMARY KEY (`ID_Mensaje`),
  ADD KEY `ID_PerfilCurso` (`ID_PerfilCurso`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`ID_Perfil`),
  ADD KEY `Alumno` (`ID_Alumno`),
  ADD KEY `Profesor` (`ID_Profesor`);

--
-- Indices de la tabla `perfil_curso`
--
ALTER TABLE `perfil_curso`
  ADD PRIMARY KEY (`ID_PerfilCurso`),
  ADD KEY `ID_Perfil` (`ID_Perfil`),
  ADD KEY `ID_Curso` (`ID_Curso`),
  ADD KEY `ID_Calificacion` (`ID_Calificacion`),
  ADD KEY `ID_Equipo` (`ID_Equipo`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`ID_Profesor`);

--
-- Indices de la tabla `publicación`
--
ALTER TABLE `publicación`
  ADD PRIMARY KEY (`ID_Publicacion`),
  ADD KEY `ID_PerfilCurso` (`ID_PerfilCurso`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `actividad`
--
ALTER TABLE `actividad`
  MODIFY `ID_Actividad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `ID_Alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `comentario`
--
ALTER TABLE `comentario`
  MODIFY `ID_Comentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `ID_Curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `equipo_trabajo`
--
ALTER TABLE `equipo_trabajo`
  MODIFY `ID_Equipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `ID_Perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `perfil_curso`
--
ALTER TABLE `perfil_curso`
  MODIFY `ID_PerfilCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `ID_Profesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `publicación`
--
ALTER TABLE `publicación`
  MODIFY `ID_Publicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `actividad_ibfk_1` FOREIGN KEY (`ID_Curso`) REFERENCES `curso` (`ID_Curso`),
  ADD CONSTRAINT `actividad_ibfk_2` FOREIGN KEY (`ID_Curso`) REFERENCES `curso` (`ID_Curso`);

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`ID_Actividad`) REFERENCES `actividad` (`ID_Actividad`);

--
-- Filtros para la tabla `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`ID_PerfilCurso`) REFERENCES `perfil_curso` (`ID_PerfilCurso`),
  ADD CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`ID_Publicacion`) REFERENCES `publicación` (`ID_Publicacion`);

--
-- Filtros para la tabla `mensaje`
--
ALTER TABLE `mensaje`
  ADD CONSTRAINT `mensaje_ibfk_1` FOREIGN KEY (`ID_PerfilCurso`) REFERENCES `perfil_curso` (`ID_PerfilCurso`);

--
-- Filtros para la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD CONSTRAINT `Alumno` FOREIGN KEY (`ID_Alumno`) REFERENCES `alumno` (`ID_Alumno`),
  ADD CONSTRAINT `Profesor` FOREIGN KEY (`ID_Profesor`) REFERENCES `profesor` (`ID_Profesor`);

--
-- Filtros para la tabla `perfil_curso`
--
ALTER TABLE `perfil_curso`
  ADD CONSTRAINT `perfil_curso_ibfk_1` FOREIGN KEY (`ID_Perfil`) REFERENCES `perfil` (`ID_Perfil`),
  ADD CONSTRAINT `perfil_curso_ibfk_2` FOREIGN KEY (`ID_Curso`) REFERENCES `curso` (`ID_Curso`),
  ADD CONSTRAINT `perfil_curso_ibfk_3` FOREIGN KEY (`ID_Calificacion`) REFERENCES `calificacion` (`ID_Calificacion`),
  ADD CONSTRAINT `perfil_curso_ibfk_4` FOREIGN KEY (`ID_Equipo`) REFERENCES `equipo_trabajo` (`ID_Equipo`);

--
-- Filtros para la tabla `publicación`
--
ALTER TABLE `publicación`
  ADD CONSTRAINT `publicación_ibfk_1` FOREIGN KEY (`ID_PerfilCurso`) REFERENCES `perfil_curso` (`ID_PerfilCurso`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
