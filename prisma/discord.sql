/*
 Navicat MySQL Data Transfer

 Source Server         : dev5p.in.satt.jp
 Source Server Type    : MySQL
 Source Server Version : 80023 (8.0.23)
 Source Host           : dev5p.in.satt.jp:3306
 Source Schema         : discord

 Target Server Type    : MySQL
 Target Server Version : 80023 (8.0.23)
 File Encoding         : 65001

 Date: 28/11/2023 18:51:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Channel
-- ----------------------------
DROP TABLE IF EXISTS `Channel`;
CREATE TABLE `Channel`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('TEXT','AUDIO','VIDEO') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'TEXT',
  `profileId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serverId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Channel_profileId_idx`(`profileId` ASC) USING BTREE,
  INDEX `Channel_serverId_idx`(`serverId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Channel
-- ----------------------------
INSERT INTO `Channel` VALUES ('1c2dc64f-1dd0-4411-8aab-bdc74c87887c', 'video-text', 'VIDEO', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:26:05.106', '2023-11-28 05:26:05.106');
INSERT INTO `Channel` VALUES ('1e1b5146-5ebf-458e-a683-b6a596b63756', 'audio-test', 'AUDIO', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:25:53.336', '2023-11-28 05:25:53.336');
INSERT INTO `Channel` VALUES ('3b591559-74b1-4685-bd86-add0be006f63', 'general', 'TEXT', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:18:34.005', '2023-11-28 05:18:34.005');
INSERT INTO `Channel` VALUES ('4b35dd6a-2186-4500-a6ae-89de9f011fb1', 'general', 'TEXT', '77b25d34-632d-4488-850d-8590cc18eb3b', '98ddea2c-321c-4ce1-b4fa-f08ec47309b8', '2023-11-28 05:39:35.223', '2023-11-28 05:39:35.223');
INSERT INTO `Channel` VALUES ('6799b8d1-3938-41c7-9d96-38ec271621e4', 'text-channel1', 'TEXT', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:25:33.520', '2023-11-28 05:25:33.520');

-- ----------------------------
-- Table structure for Conversation
-- ----------------------------
DROP TABLE IF EXISTS `Conversation`;
CREATE TABLE `Conversation`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberOneId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `memberTwoId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Conversation_memberOneId_memberTwoId_key`(`memberOneId` ASC, `memberTwoId` ASC) USING BTREE,
  INDEX `Conversation_memberTwoId_idx`(`memberTwoId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Conversation
-- ----------------------------
INSERT INTO `Conversation` VALUES ('619d4063-a5a2-4f5e-8eb2-a23a6664f757', '77c0ce8b-d82e-4008-bd1d-65f32ccc6159', 'b4dc6726-0e8e-43f9-9081-3a4a3b9120c4');

-- ----------------------------
-- Table structure for DirectMessage
-- ----------------------------
DROP TABLE IF EXISTS `DirectMessage`;
CREATE TABLE `DirectMessage`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `memberId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversationId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `DirectMessage_memberId_idx`(`memberId` ASC) USING BTREE,
  INDEX `DirectMessage_conversationId_idx`(`conversationId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of DirectMessage
-- ----------------------------

-- ----------------------------
-- Table structure for Member
-- ----------------------------
DROP TABLE IF EXISTS `Member`;
CREATE TABLE `Member`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','MODERATOR','GUEST') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GUEST',
  `profileId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serverId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Member_profileId_idx`(`profileId` ASC) USING BTREE,
  INDEX `Member_serverId_idx`(`serverId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Member
-- ----------------------------
INSERT INTO `Member` VALUES ('77c0ce8b-d82e-4008-bd1d-65f32ccc6159', 'GUEST', '77b25d34-632d-4488-850d-8590cc18eb3b', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:39:12.890', '2023-11-28 05:39:12.890');
INSERT INTO `Member` VALUES ('b4dc6726-0e8e-43f9-9081-3a4a3b9120c4', 'ADMIN', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '7444e85f-f2c1-483e-8db6-2bf88d99ee43', '2023-11-28 05:18:34.005', '2023-11-28 05:18:34.005');
INSERT INTO `Member` VALUES ('d548d76f-4c50-4ed9-aae4-0f8445814a8b', 'ADMIN', '77b25d34-632d-4488-850d-8590cc18eb3b', '98ddea2c-321c-4ce1-b4fa-f08ec47309b8', '2023-11-28 05:39:35.223', '2023-11-28 05:39:35.223');

-- ----------------------------
-- Table structure for Message
-- ----------------------------
DROP TABLE IF EXISTS `Message`;
CREATE TABLE `Message`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fileUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `memberId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `channelId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Message_channelId_idx`(`channelId` ASC) USING BTREE,
  INDEX `Message_memberId_idx`(`memberId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Message
-- ----------------------------
INSERT INTO `Message` VALUES ('9d0c8dbd-83a8-4068-8edc-0aaade9c45fb', 'aaa', NULL, '77c0ce8b-d82e-4008-bd1d-65f32ccc6159', '6799b8d1-3938-41c7-9d96-38ec271621e4', 0, '2023-11-28 05:40:44.787', '2023-11-28 05:40:44.787');

-- ----------------------------
-- Table structure for Profile
-- ----------------------------
DROP TABLE IF EXISTS `Profile`;
CREATE TABLE `Profile`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Profile_userId_key`(`userId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Profile
-- ----------------------------
INSERT INTO `Profile` VALUES ('77b25d34-632d-4488-850d-8590cc18eb3b', 'user_2W0FRnH3Ymgt3Su7J4cISODmx9o', 'a bb', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yVzBGUnF6WnNsUE01emlsUkZyVk1RSmJkM1oifQ', 'h_ri@satt.jp', '2023-11-28 05:39:09.788', '2023-11-28 08:41:13.689');
INSERT INTO `Profile` VALUES ('98f8dd6d-7ab0-43fb-8814-710d42f8be99', 'user_2V1FIn8BtcaOmPJelsdqlh6gypX', 'shi mofa', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVjFGSjNBTlpiVlBDdFNjNkRHaURKU3owZWwuanBlZyJ9', '493678156qq@gmail.com', '2023-10-18 23:55:55.345', '2023-10-18 23:55:55.345');

-- ----------------------------
-- Table structure for Server
-- ----------------------------
DROP TABLE IF EXISTS `Server`;
CREATE TABLE `Server`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `inviteCode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `Server_inviteCode_key`(`inviteCode` ASC) USING BTREE,
  INDEX `Server_profileId_idx`(`profileId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Server
-- ----------------------------
INSERT INTO `Server` VALUES ('7444e85f-f2c1-483e-8db6-2bf88d99ee43', 'server two', 'https://uploadthing.com/f/bda06b62-cfd2-4cb8-9c67-ba776e7f81b5-k19rok.png', 'fc3d8250-8862-4e51-8dba-03b693b5c170', '98f8dd6d-7ab0-43fb-8814-710d42f8be99', '2023-11-28 05:18:34.005', '2023-11-28 05:18:34.005');
INSERT INTO `Server` VALUES ('98ddea2c-321c-4ce1-b4fa-f08ec47309b8', 'server one', 'https://uploadthing.com/f/25163ef9-9840-4297-99ef-10cda5b144de-ild7ob.jpg', 'cb17b1ff-0b4d-4d68-b229-7ac51cb11aa6', '77b25d34-632d-4488-850d-8590cc18eb3b', '2023-11-28 05:39:35.223', '2023-11-28 05:39:35.223');

SET FOREIGN_KEY_CHECKS = 1;
