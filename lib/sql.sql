

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
  INDEX `Channel_serverId_idx`(`serverId` ASC) USING BTREE,
  CONSTRAINT `Channel_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Channel_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Channel
-- ----------------------------
INSERT INTO `Channel` VALUES ('15c8e3b6-6a11-428c-960e-a079b3de0e6b', 'general', 'TEXT', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '486ed59d-f17c-465b-ba79-815f948550a7', '2023-09-20 01:15:43.124', '2023-09-20 01:15:43.124');
INSERT INTO `Channel` VALUES ('6d8c0f21-3f5a-440d-9afe-3114d202f529', 'general', 'TEXT', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '1b10a8f2-e462-48a9-8bde-691c5a979808', '2023-09-26 03:16:28.408', '2023-09-26 03:16:28.408');
INSERT INTO `Channel` VALUES ('b01880c2-b2f4-4add-9ea4-990ab17edfc9', 'general', 'TEXT', 'd9806edd-3636-4c21-ba92-d3e3074b614d', 'b01ba3cf-bb31-4d59-9576-cb8e668b950f', '2023-09-26 08:34:59.996', '2023-09-26 08:34:59.996');

-- ----------------------------
-- Table structure for Member
-- ----------------------------
DROP TABLE IF EXISTS `Member`;
CREATE TABLE `Member`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','MODERATOR','GUEST') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GUEST',
  `profileId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `serverId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Member_profileId_idx`(`profileId` ASC) USING BTREE,
  INDEX `Member_serverId_idx`(`serverId` ASC) USING BTREE,
  CONSTRAINT `Member_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Member_serverId_fkey` FOREIGN KEY (`serverId`) REFERENCES `Server` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Member
-- ----------------------------
INSERT INTO `Member` VALUES ('135f4217-5db7-45ed-bcfe-944fc65a4c3c', 'ADMIN', 'd9806edd-3636-4c21-ba92-d3e3074b614d', 'b01ba3cf-bb31-4d59-9576-cb8e668b950f');
INSERT INTO `Member` VALUES ('2f41ec9e-2a87-49e4-8a64-e13d480fe7ef', 'ADMIN', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '486ed59d-f17c-465b-ba79-815f948550a7');
INSERT INTO `Member` VALUES ('b032e0d4-a813-4164-a0d7-e4e5146e598b', 'ADMIN', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '1b10a8f2-e462-48a9-8bde-691c5a979808');

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
INSERT INTO `Profile` VALUES ('d9806edd-3636-4c21-ba92-d3e3074b614d', 'user_2V1FIn8BtcaOmPJelsdqlh6gypX', 'shi mofa', 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVjFGSjNBTlpiVlBDdFNjNkRHaURKU3owZWwuanBlZyJ9', '493678156qq@gmail.com', '2023-09-20 01:15:10.656', '2023-09-20 01:15:10.656');

-- ----------------------------
-- Table structure for Server
-- ----------------------------
DROP TABLE IF EXISTS `Server`;
CREATE TABLE `Server`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `inviteCode` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profileId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `Server_profileId_idx`(`profileId` ASC) USING BTREE,
  CONSTRAINT `Server_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of Server
-- ----------------------------
INSERT INTO `Server` VALUES ('1b10a8f2-e462-48a9-8bde-691c5a979808', '1112', 'https://utfs.io/f/8960e8cb-9b98-4fc5-b09c-f912caedce85-hcsp6t.jpg', 'd86288b6-72ab-4080-b6d5-f969df13ae33', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '2023-09-26 03:16:28.408', '2023-09-26 03:16:28.408');
INSERT INTO `Server` VALUES ('486ed59d-f17c-465b-ba79-815f948550a7', 'discord-clone', 'https://utfs.io/f/b7754d44-dba7-4077-a24b-2aacc0f40729-7n3t2t.jpg', '3b4a1475-a705-40c1-b814-8e796449d00a', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '2023-09-20 01:15:43.124', '2023-09-20 01:15:43.124');
INSERT INTO `Server` VALUES ('b01ba3cf-bb31-4d59-9576-cb8e668b950f', 'hello server', 'https://utfs.io/f/48389705-0fe5-46ee-9457-3e53404cc63e-87v7nl.jpg', '30011f6f-e9e4-4ff2-879f-be386ba8cc7c', 'd9806edd-3636-4c21-ba92-d3e3074b614d', '2023-09-26 08:34:59.996', '2023-09-26 08:34:59.996');

SET FOREIGN_KEY_CHECKS = 1;
