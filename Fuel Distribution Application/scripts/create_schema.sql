CREATE DATABASE `order_service` 

CREATE TABLE `order_service`.`fuel_order`(
  `order_id` BIGINT NOT NULL AUTO_INCREMENT, 
  `fuel_type` VARCHAR(45) NOT NULL, 
  `generated_key` VARCHAR(255) NOT NULL, 
  `order_date` DATETIME(6) NOT NULL, 
  `quantity` INT NOT NULL,
  `station_number` VARCHAR(100) NOT NULL ,
   PRIMARY KEY (`order_id`)
);

CREATE TABLE `order_service`.`order_status`(
`status_id` BIGINT NOT NULL AUTO_INCREMENT,
`generated_key` VARCHAR(255) NOT NULL, 
`allocation_status` VARCHAR(45) NOT NULL, 
`dispatch_status` VARCHAR(45) NOT NULL, 
`schedule_status` VARCHAR(45) NOT NULL, 
`dispatched_date` DATE NOT NULL,
`scheduled_date` DATE NOT NULL,
`received_date` DATETIME NOT NULL,
PRIMARY KEY (`status_id`)
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


  

CREATE DATABASE `schedule_service`;

  CREATE TABLE `schedule_service`.`order_schedule` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT NOT NULL,
  `generatedKey` varchar(255) NOT NULL,
  `scheduledDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) 

