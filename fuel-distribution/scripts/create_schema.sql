CREATE DATABASE `order_service`;

CREATE TABLE `fuel_order` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `fuel_type` varchar(255) DEFAULT NULL,
  `generated_key` varchar(255) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `station_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `UK_mrv0f9wodtl2xnqf65xlmwdxk` (`generated_key`)
) 

CREATE TABLE `order_status` (
  `status_id` bigint NOT NULL AUTO_INCREMENT,
  `allocation_status` varchar(255) DEFAULT NULL,
  `dispatch_status` varchar(255) DEFAULT NULL,
  `dispatched_date` date DEFAULT NULL,
  `generated_key` varchar(255) NOT NULL,
  `schedule_status` varchar(255) DEFAULT NULL,
  `scheduled_date` date DEFAULT NULL,
  `received_date` datetime DEFAULT NULL,
  PRIMARY KEY (`status_id`),
  UNIQUE KEY `UK_49oxtc3q9v7nk0k2jpc5w9ehe` (`generated_key`)
) 




CREATE DATABASE `allocation_service`;

CREATE TABLE `allocation_service`.`stock` (
  `idstock` INT NOT NULL AUTO_INCREMENT,
  `stockQuantity` DOUBLE NOT NULL,
  `fuelType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idstock`));

CREATE TABLE `allocation_service`.`stock_allocation` (
  `idstockallocation` INT NOT NULL AUTO_INCREMENT,
  `idstock` INT NOT NULL,
  `order_id` INT NOT NULL,
`quantity` DOUBLE NOT NULL,
  PRIMARY KEY (`idstockallocation`));

CREATE TABLE `allocation_service`.`dispatch` (
  `iddispatch` INT NOT NULL AUTO_INCREMENT,
  `dispatchedDate` DATE NOT NULL,
  `order_id` INT NOT NULL,
`quantity` DOUBLE NOT NULL,
  PRIMARY KEY (`iddispatch`));


  CREATE DATABASE `schedule_service` ;

  CREATE TABLE `order_schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `generatedKey` varchar(255) NOT NULL,
  `scheduledDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) 


