CREATE DATABASE  IF NOT EXISTS `learncluster` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `learncluster`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: learncluster
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '22a1a479-c935-11f0-9fad-acf23c8aac4e:1-122';

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES ('8de74580-ed81-11f0-a766-acf23c8aac4e','manage_roles','CRUD role & phân quyền'),('8de7700c-ed81-11f0-a766-acf23c8aac4e','manage_courses','CRUD khóa học'),('8de7e901-ed81-11f0-a766-acf23c8aac4e','manage_chapters_lessons','CRUD chương & bài học'),('8de7f9d7-ed81-11f0-a766-acf23c8aac4e','manage_assignments','CRUD bài tập'),('8de8092c-ed81-11f0-a766-acf23c8aac4e','grade_submissions','Chấm điểm bài tập'),('8de81a08-ed81-11f0-a766-acf23c8aac4e','manage_study_dates','CRUD study date'),('8de82b02-ed81-11f0-a766-acf23c8aac4e','manage_participants','Quản lý thành viên study date'),('8de84391-ed81-11f0-a766-acf23c8aac4e','view_statistics','Xem thống kê toàn hệ thống / lớp'),('8de860b5-ed81-11f0-a766-acf23c8aac4e','moderate_content','Kiểm duyệt nội dung'),('8de86d42-ed81-11f0-a766-acf23c8aac4e','join_course','Tham gia khóa học'),('8de87c2e-ed81-11f0-a766-acf23c8aac4e','submit_assignment','Nộp bài tập'),('8de894ea-ed81-11f0-a766-acf23c8aac4e','create_notes_bookmarks','Tạo note / bookmark'),('8de8b69d-ed81-11f0-a766-acf23c8aac4e','earn_achievements','Nhận badge / achievement'),('8de8d1d3-ed81-11f0-a766-acf23c8aac4e','send_messages','Gửi tin nhắn trong study date'),('8de8ea87-ed81-11f0-a766-acf23c8aac4e','view_course_content','Xem nội dung khóa học'),('8de8fc66-ed81-11f0-a766-acf23c8aac4e','manage_notifications','Quản lý thông báo'),('8de9081d-ed81-11f0-a766-acf23c8aac4e','review_feedback','Xem & phản hồi feedback'),('8de9137b-ed81-11f0-a766-acf23c8aac4e','manage_reports','Xử lý báo cáo vi phạm'),('daa009f7-ed80-11f0-a766-acf23c8aac4e','managmanage_users','CRUD người dùng');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-10 23:57:09
