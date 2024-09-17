-- Adminer 4.3.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `bdestiloguau` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bdestiloguau`;

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `NombreCat` varchar(250) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `categoria` (`idCategoria`, `NombreCat`) VALUES
(1,	'Primavera'),
(2,	'Verano'),
(3,	'Otoño'),
(4,	'Invierno');

DROP TABLE IF EXISTS `compra`;
CREATE TABLE `compra` (
  `idCompra` int(11) NOT NULL AUTO_INCREMENT,
  `idProducto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha_compra` date NOT NULL,
  PRIMARY KEY (`idCompra`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idProducto` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `compras`;
CREATE TABLE `compras` (
  `idproducto` int(11) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `precio` float NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha_compra` date NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cupones`;
CREATE TABLE `cupones` (
  `idCupon` int(11) NOT NULL AUTO_INCREMENT,
  `cupon` float NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `vigencia` date NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`idCupon`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `cupones` (`idCupon`, `cupon`, `descripcion`, `fechaRegistro`, `vigencia`, `status`) VALUES
(1,	0.1,	'WOW123',	'2024-09-01',	'2024-09-30',	1),
(13,	0.2,	'CD2',	'2024-09-16',	'2024-09-19',	1),
(6,	0.2,	'CD1',	'2024-09-02',	'2024-09-05',	0),
(14,	0.2,	'CD3',	'2024-09-12',	'2024-09-15',	1),
(15,	0.2,	'RTY12',	'2024-09-04',	'2024-09-19',	1);

DROP TABLE IF EXISTS `cuponxusuario`;
CREATE TABLE `cuponxusuario` (
  `idCupon` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `Usado` int(11) NOT NULL,
  KEY `idUsuario` (`idUsuario`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `ofertas`;
CREATE TABLE `ofertas` (
  `idOferta` int(11) NOT NULL AUTO_INCREMENT,
  `oferta` float NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  PRIMARY KEY (`idOferta`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

INSERT INTO `ofertas` (`idOferta`, `oferta`, `descripcion`) VALUES
(1,	0,	'Ninguna Oferta'),
(3,	0.2,	'Oferta del 20%');

DROP TABLE IF EXISTS `permisos`;
CREATE TABLE `permisos` (
  `idPermiso` int(11) NOT NULL AUTO_INCREMENT,
  `permiso` varchar(50) NOT NULL,
  PRIMARY KEY (`idPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `permxrol`;
CREATE TABLE `permxrol` (
  `idRol` int(11) NOT NULL,
  `idPermiso` int(11) NOT NULL,
  KEY `idRol` (`idRol`),
  KEY `idPermiso` (`idPermiso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `producto`;
CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `idOferta` int(11) NOT NULL,
  `precio` float NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `producto` varchar(255) NOT NULL,
  `sku` varchar(10) NOT NULL,
  `idTalla` int(11) NOT NULL,
  `descripcion` varchar(225) NOT NULL,
  `foto` varchar(225) NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`idProducto`),
  KEY `idTalla` (`idTalla`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `producto` (`idProducto`, `idUsuario`, `idOferta`, `precio`, `Marca`, `producto`, `sku`, `idTalla`, `descripcion`, `foto`, `fecha_ingreso`, `cantidad`) VALUES
(1,	1,	1,	211,	'rt',	'x',	'este',	1,	'chaleco',	'',	'2015-09-19',	1);

DROP TABLE IF EXISTS `producto_fav`;
CREATE TABLE `producto_fav` (
  `id_producto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_reg` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `prodxcat`;
CREATE TABLE `prodxcat` (
  `idProducto` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `recibo`;
CREATE TABLE `recibo` (
  `idRecibo` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`idRecibo`),
  KEY `idUsuario` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rol` (`idRol`, `rol`) VALUES
(1,	'Usuario'),
(2,	'Administrador');

DROP TABLE IF EXISTS `suscripcion`;
CREATE TABLE `suscripcion` (
  `id_sub` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_sub` varchar(10) NOT NULL,
  `descripcion_sub` varchar(255) NOT NULL,
  `precio_sub` float NOT NULL,
  `duracion_sub` int(11) NOT NULL,
  PRIMARY KEY (`id_sub`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `tallas`;
CREATE TABLE `tallas` (
  `idTalla` int(11) NOT NULL AUTO_INCREMENT,
  `talla` varchar(20) NOT NULL,
  PRIMARY KEY (`idTalla`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tallas` (`idTalla`, `talla`) VALUES
(1,	'Pequeño'),
(2,	'Mediano'),
(3,	'Grande'),
(4,	'Extra Grande'),
(5,	'Mini'),
(6,	'Toy');

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idRol` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `foto` varchar(255) NOT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `usuario` (`idUsuario`, `idRol`, `nombre`, `apellido`, `email`, `password`, `fecha_creacion`, `foto`) VALUES
(1,	2,	'test',	'1',	'test1@gmail.com',	'MTIzNDU=',	'2024-09-16 12:25:28',	'1721157608571-logo.png'),
(2,	1,	'test',	'2',	'test2@gmail.com',	'MTIzNDU=',	'2024-09-16 14:06:52',	'1721157608571-logo.png'),
(3,	1,	'test',	'3',	'test3@gmail.com',	'MTIzNDU=',	'2024-09-16 19:50:55',	'1721157608571-logo.png');

DROP TABLE IF EXISTS `usuarioxsub`;
CREATE TABLE `usuarioxsub` (
  `idUsuario` int(11) NOT NULL,
  `id_sub` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- 2024-09-17 02:27:50
