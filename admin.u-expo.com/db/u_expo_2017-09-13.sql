# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.1.73)
# Database: u_expo
# Generation Time: 2017-09-13 10:39:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table case
# ------------------------------------------------------------

DROP TABLE IF EXISTS `case`;

CREATE TABLE `case` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cn_name` varchar(20) NOT NULL,
  `en_name` varchar(20) NOT NULL,
  `custom` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `start_time` int(10) unsigned NOT NULL DEFAULT '0',
  `end_time` int(10) unsigned NOT NULL DEFAULT '0',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
  `pic` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `case` WRITE;
/*!40000 ALTER TABLE `case` DISABLE KEYS */;

INSERT INTO `case` (`id`, `cn_name`, `en_name`, `custom`, `city`, `start_time`, `end_time`, `dateline`, `pic`)
VALUES
	(3,'标题1111','title1','custom  11111','北京',0,0,0,NULL),
	(4,'标题22222','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(5,'标题33333','title3333','custom3333333','北京3333',0,0,0,NULL),
	(6,'232322323','','','',0,0,0,NULL),
	(7,'标题224532222','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(8,'标题22','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(9,'标题223','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(10,'标题2234','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(11,'标题22345','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(12,'标题223456','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(13,'标题2234567','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(14,'标题22345678','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(15,'标题223456789','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(16,'标题22345678910','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(17,'标题2234567891011','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(18,'标题223456789101112','title2','cutom 2222222','北京2222',0,0,0,NULL),
	(19,'大家好！！！','','','',0,0,0,NULL),
	(40,'55555','','','',0,0,4294967295,''),
	(41,'232332','','','',0,0,4294967295,'');

/*!40000 ALTER TABLE `case` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table relation_case_tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `relation_case_tag`;

CREATE TABLE `relation_case_tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `case_id` varchar(20) DEFAULT NULL,
  `tag_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `relation_case_tag` WRITE;
/*!40000 ALTER TABLE `relation_case_tag` DISABLE KEYS */;

INSERT INTO `relation_case_tag` (`id`, `case_id`, `tag_id`)
VALUES
	(31,'11','7'),
	(32,NULL,NULL),
	(33,'11','8'),
	(46,'40','9'),
	(47,'41','10');

/*!40000 ALTER TABLE `relation_case_tag` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table setting
# ------------------------------------------------------------

DROP TABLE IF EXISTS `setting`;

CREATE TABLE `setting` (
  `set_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(20) NOT NULL,
  `admin_password` varchar(20) NOT NULL,
  PRIMARY KEY (`set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `setting` WRITE;
/*!40000 ALTER TABLE `setting` DISABLE KEYS */;

INSERT INTO `setting` (`set_id`, `admin_name`, `admin_password`)
VALUES
	(1,'admin','admin!@#'),
	(2,'','');

/*!40000 ALTER TABLE `setting` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table tag
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tag`;

CREATE TABLE `tag` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `value` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;

INSERT INTO `tag` (`id`, `value`)
VALUES
	(7,'北京'),
	(8,'上海'),
	(9,'上海1'),
	(10,'上海2'),
	(11,'上海3'),
	(12,'上海4'),
	(13,'上海5'),
	(14,'上海6'),
	(15,'上海7');

/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
