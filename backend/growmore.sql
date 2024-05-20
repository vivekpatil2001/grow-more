-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2024 at 05:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `growmore`
--

-- --------------------------------------------------------

--
-- Table structure for table `compony`
--

CREATE TABLE `compony` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `invest` int(25) NOT NULL,
  `cmpprofit` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `compony`
--

INSERT INTO `compony` (`id`, `user_id`, `invest`, `cmpprofit`) VALUES
(3, '6649f6ceb4e2c', 2000, 2000),
(4, '6649f747ec08a', 2000, 500);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `balance` varchar(50) NOT NULL,
  `profit` varchar(50) NOT NULL,
  `refferal` varchar(20) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'user',
  `payment` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `username`, `email`, `balance`, `profit`, `refferal`, `password`, `role`, `payment`) VALUES
(43, '6649f6ceb4e2c', 'shivam', 'shivam@gmail.com', '3500', '1500', '', '3ae9d8799d1bb5e201e5704293bb54ef', 'user', ''),
(44, '6649f747ec08a', 'pravin', 'pravin@gmail.com', '2000', '0', '6649f6ceb4e2c', 'c86da2729ab8f79d8f582e9abc469eb0', 'user', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `compony`
--
ALTER TABLE `compony`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`,`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `compony`
--
ALTER TABLE `compony`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
