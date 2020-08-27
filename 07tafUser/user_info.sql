/*
 Navicat Premium Data Transfer

 Source Server         : whup
 Source Server Type    : MySQL
 Source Server Version : 50626
 Source Host           : 192.168.6.170:3306
 Source Schema         : test_zzj

 Target Server Type    : MySQL
 Target Server Version : 50626
 File Encoding         : 65001

 Date: 04/12/2019 13:49:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `gender` char(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `age` smallint(3) DEFAULT NULL,
  `create_time` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1574992400128 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (372205255, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '1', '15666666666', 1, '2019-12-03 19:23:25', '2019-12-03 19:23:25');
INSERT INTO `user_info` VALUES (428015864, '123', '202cb962ac59075b964b07152d234b70', '1', '15666666666', 1, '2019-12-04 10:53:35', '2019-12-04 10:53:35');
INSERT INTO `user_info` VALUES (428033317, '222', 'bcbe3365e6ac95ea2c0343a2395834dd', '1', '15666666666', 1, '2019-12-04 10:53:53', '2019-12-04 10:53:53');
INSERT INTO `user_info` VALUES (428045573, '333', '310dcbbf4cce62f762a2aaa148d556bd', '1', '15333333333', 1, '2019-12-04 10:54:05', '2019-12-04 10:54:05');
INSERT INTO `user_info` VALUES (428066963, '555', '15de21c670ae7c3f6f3f1f37029303c9', '1', '15555555555', 2, '2019-12-04 10:54:26', '2019-12-04 10:54:26');
INSERT INTO `user_info` VALUES (428091132, '666', 'fae0b27c451c728867a567e8c1bb4e53', '1', '15222222222', 4, '2019-12-04 10:54:51', '2019-12-04 10:54:51');
INSERT INTO `user_info` VALUES (428103941, '777', 'f1c1592588411002af340cbaedd6fc33', '1', '15788899966', 1, '2019-12-04 10:55:03', '2019-12-04 10:55:03');
INSERT INTO `user_info` VALUES (428171476, '888', '0a113ef6b61820daa5611c870ed8d5ee', '1', '15888888888', 1, '2019-12-04 10:56:11', '2019-12-04 10:56:11');
INSERT INTO `user_info` VALUES (428188346, '999', 'b706835de79a2b4e80506f582af3676a', '1', '15987898778', 5, '2019-12-04 10:56:28', '2019-12-04 10:56:28');
INSERT INTO `user_info` VALUES (428211427, '1010', '1e48c4420b7073bc11916c6c1de226bb', '1', '15666666666', 1, '2019-12-04 10:56:51', '2019-12-04 10:56:51');
INSERT INTO `user_info` VALUES (428226339, '222222333', '202cb962ac59075b964b07152d234b70', '1', '15666666666', 1, '2019-12-04 10:57:06', '2019-12-04 10:57:06');
INSERT INTO `user_info` VALUES (428241196, '156', '1c9ac0159c94d8d0cbedc973445af2da', '1', '15666666666', 1, '2019-12-04 10:57:21', '2019-12-04 10:57:21');

SET FOREIGN_KEY_CHECKS = 1;
