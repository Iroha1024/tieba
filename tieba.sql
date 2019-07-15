/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.7.19 : Database - tieba
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`tieba` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `tieba`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ba_id` int(11) NOT NULL,
  `title` char(30) NOT NULL,
  `content` text NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `article` */

insert  into `article`(`a_id`,`user_id`,`ba_id`,`title`,`content`,`is_deleted`) values (1,2,1,'推荐个p站画师，mika pikazo','画风非常亮眼，非常擅长这种色彩缤纷的作画，是辉夜月（酒疯婆子）的原作者，之前画过fgo，多角色构图中擅长用颜色来表现人物，使得每个角色各有特点，反正总之就是很棒很dio很厉害就对了[http://5b0988e595225.cdn.sohucs.com/images/20180901/ec453135088b42f587e249f6bc92a845.jpeg][http://5b0988e595225.cdn.sohucs.com/images/20180901/9ecba591de404e148eda2051fff281d0.jpeg]',0),(2,5,2,'cdec宰猪','舒服了',0),(3,8,3,'欢迎','欢迎来到仿贴吧electron应用[https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563176739940&di=365977b351cac8fadb2568547fcbc69b&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fpview%2Fevent_poster%2Fraw%2Fpublic%2F4b9f644354eb714.jpg]',0),(4,9,2,'用 洋 人 打 败 洋 人','用 洋 人 打 败 洋 人[http://wx2.sinaimg.cn/mw690/b4b5059agy1g509j0mxwwj20hs0bvtbb.jpg]',0);

/*Table structure for table `ba` */

DROP TABLE IF EXISTS `ba`;

CREATE TABLE `ba` (
  `ba_id` int(11) NOT NULL,
  `ba_name` char(20) NOT NULL,
  `ba_url` char(20) NOT NULL,
  PRIMARY KEY (`ba_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `ba` */

insert  into `ba`(`ba_id`,`ba_name`,`ba_url`) values (1,'bilibili','bilibili'),(2,'dota2','dota2'),(3,'推荐','recommend');

/*Table structure for table `reply` */

DROP TABLE IF EXISTS `reply`;

CREATE TABLE `reply` (
  `a_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `floor_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `is_owner` tinyint(1) NOT NULL,
  `target` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `reply` */

insert  into `reply`(`a_id`,`user_id`,`floor_id`,`content`,`is_owner`,`target`) values (1,2,2,'谢谢，我已经学会了（雾）[https://imgsa.baidu.com/forum/w%3D580/sign=7369c8855fda81cb4ee683c56266d0a4/698d6334970a304efb18808bdfc8a786c9175c1f.jpg]',1,NULL),(1,3,3,'第一张当头像不错，但是单独放出来有点亮眼睛',1,NULL),(1,4,4,'色彩鲜明，可以',1,NULL),(1,1,2,'大佬',0,NULL),(2,6,2,'舒服了',1,NULL),(2,7,3,'要被猪宰了吗',1,NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` char(20) NOT NULL,
  `user_img` text,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`user_id`,`user_name`,`user_img`) values (1,'中野二乃','http://tb.himg.baidu.com/sys/portrait/item/b3094e0f?t=1553058806'),(2,'特色抽象猫娘','http://tb.himg.baidu.com/sys/portrait/item/ce6fdf30?t=1559900563'),(3,'秃发树机能11\r\n','http://tb.himg.baidu.com/sys/portrait/item/e809b0d2?t=1533781061'),(4,'执花','http://tb.himg.baidu.com/sys/portrait/item/5d47ff5d?t=1552959842'),(5,'绿蚁新醅酒','http://tb.himg.baidu.com/sys/portrait/item/90e5ce93?t=1530603771'),(6,'倾城丶追梦','http://tb.himg.baidu.com/sys/portrait/item/32492e62?t=1475316561'),(7,'月見里時雨','http://tb.himg.baidu.com/sys/portrait/item/f1fd77cc?t=1554267312'),(8,'iroha','https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1563186077&di=81f3a719d4315d27a500d7b8e4abc00f&src=http://b-ssl.duitang.com/uploads/item/201607/30/20160730131742_TNhdE.thumb.700_0.jpeg'),(9,'sszzxgz','http://tb.himg.baidu.com/sys/portrait/item/e685e7ce?t=1541486485');

/*Table structure for table `user_ba` */

DROP TABLE IF EXISTS `user_ba`;

CREATE TABLE `user_ba` (
  `user_id` int(11) NOT NULL,
  `ba_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_ba` */

insert  into `user_ba`(`user_id`,`ba_id`) values (8,1),(8,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
