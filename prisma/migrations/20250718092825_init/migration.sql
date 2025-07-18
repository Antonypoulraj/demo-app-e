-- CreateTable
CREATE TABLE `attendancedetails_tb` (
    `id` INTEGER NOT NULL,
    `Employee Name` VARCHAR(45) NOT NULL,
    `Employee ID` VARCHAR(45) NOT NULL,
    `Date` DATE NOT NULL,
    `Check In Time` DATETIME(0) NOT NULL,
    `Check Out TIme` DATETIME(0) NOT NULL,
    `Status` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `Employee ID_UNIQUE`(`Employee ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employeedetails_tb` (
    `id` INTEGER NOT NULL,
    `Name` VARCHAR(45) NOT NULL,
    `Email` VARCHAR(45) NOT NULL,
    `Departrment` VARCHAR(45) NOT NULL,
    `Position` VARCHAR(45) NOT NULL,
    `Phone` VARCHAR(45) NOT NULL,
    `Status` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Email_UNIQUE`(`Email`),
    UNIQUE INDEX `Phone_UNIQUE`(`Phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leavemanagement_tb` (
    `id` INTEGER NOT NULL,
    `Employee Name` VARCHAR(45) NOT NULL,
    `Employee ID` VARCHAR(45) NOT NULL,
    `Leave Type` VARCHAR(45) NOT NULL,
    `Start Date` DATE NOT NULL,
    `End Date` DATE NOT NULL,
    `Reason` VARCHAR(45) NOT NULL,
    `Manager Email ID` VARCHAR(45) NOT NULL,
    `Status` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `Employee ID_UNIQUE`(`Employee ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productionsdetails_tb` (
    `id` INTEGER NOT NULL,
    `Date` DATE NOT NULL,
    `Shift` VARCHAR(45) NOT NULL,
    `Project Name` VARCHAR(45) NOT NULL,
    `Component Name` VARCHAR(45) NOT NULL,
    `Total Machined Quantity` VARCHAR(45) NOT NULL,
    `Total Finished Quantity` VARCHAR(45) NOT NULL,
    `Total Rejection Quantity` VARCHAR(45) NOT NULL,
    `Rejection Reason` VARCHAR(45) NOT NULL,
    `Operator Name` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rawmaterialdetails_db` (
    `id` INTEGER NOT NULL,
    `Marterial Name` VARCHAR(45) NOT NULL,
    `Maerial Grade` VARCHAR(45) NOT NULL,
    `Category` VARCHAR(45) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Supplier` VARCHAR(45) NOT NULL,
    `Status` VARCHAR(45) NOT NULL,
    `Length` VARCHAR(45) NOT NULL,
    `Weight` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tooldetails_tb` (
    `id` INTEGER NOT NULL,
    `Tool Name` VARCHAR(45) NOT NULL,
    `Tool ID` VARCHAR(45) NOT NULL,
    `Category` VARCHAR(45) NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `Location` VARCHAR(45) NOT NULL,
    `Status` VARCHAR(45) NOT NULL,
    `Minimum Stock` INTEGER NOT NULL,
    `Maximum Stock` INTEGER NOT NULL,
    `Supplier` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `id_UNIQUE`(`id`),
    UNIQUE INDEX `Tool ID_UNIQUE`(`Tool ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
