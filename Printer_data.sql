-- Tạo bảng ACCOUNT
Create database printer_service;

Use printer_service;


CREATE TABLE ACCOUNT (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(50),
    phone_number VARCHAR(15),
    birth_date DATE,
    email VARCHAR(100),
    Fname VARCHAR(50),
    Lname VARCHAR(50)
);

-- Tạo bảng STUDENT
CREATE TABLE STUDENT (
    ID INT PRIMARY KEY,
    Savailable_pages INT
);

-- Tạo bảng EMPLOYEE
CREATE TABLE EMPLOYEE (
    ID INT PRIMARY KEY,
    Estart_date DATE
);

-- Tạo bảng PAYMENT
CREATE TABLE PAYMENT (
    PMid INT AUTO_INCREMENT PRIMARY KEY,
    PMtime DATETIME,
    PMpages_purchased INT,
    PMmethod VARCHAR(20),
    SID INT
);

-- Tạo bảng NOTIFICATION
CREATE TABLE NOTIFICATION (
    NID INT AUTO_INCREMENT PRIMARY KEY,
    Ntitle VARCHAR(100),
    Ncontent TEXT,
    Nsend_time DATETIME
);

-- Tạo bảng TRANSACTION
CREATE TABLE TRANSACTION (
    TID INT AUTO_INCREMENT PRIMARY KEY,
    Tpages_per_copy INT,
    Tcopies INT,
    Tstatus VARCHAR(20),
    Tstart_time DATETIME,
    Tend_time DATETIME,
    SID INT,
    DID INT,
    PID INT
);

-- Tạo bảng PRINTER
CREATE TABLE PRINTER (
    PID INT AUTO_INCREMENT PRIMARY KEY,
    Pmodel VARCHAR(50),
    Pstatus VARCHAR(20),
    Plocation VARCHAR(100),
    Pname VARCHAR(50),
    Plast_maintenance DATE,
    Pprovide_coloring BOOLEAN,
    EID INT
);

-- Tạo bảng DOCUMENT
CREATE TABLE DOCUMENT (
    DID INT AUTO_INCREMENT PRIMARY KEY,
    Dupload_time DATETIME,
    Dname VARCHAR(100),
    Dsize INT,
    Dformat VARCHAR(20),
    Dpage_num INT,
    SID INT
);

-- Tạo bảng SEND_TO
CREATE TABLE SEND_TO (
    NID INT,
    SID INT,
    PRIMARY KEY (NID, SID)
);

INSERT INTO ACCOUNT (ID, username, password, phone_number, birth_date, email, Fname, Lname)
VALUES
(2000, 'student1', 'pass123', '0123456789', '2000-01-01', 'student1@example.com', 'John', 'Doe'),
(2001, 'student2', 'pass123', '0987654321', '2001-02-02', 'student2@example.com', 'Jane', 'Smith'),
(2002, 'student3', 'pass123', '0123456789', '2002-03-03', 'student3@example.com', 'Tom', 'Lee'),
(1, 'employee1', 'pass123', '0112345678', '1990-04-04', 'employee1@example.com', 'Alice', 'Brown'),
(2, 'employee2', 'pass123', '0223456789', '1991-05-05', 'employee2@example.com', 'Bob', 'White'),
(3, 'employee3', 'pass123', '0334567890', '1992-06-06', 'employee3@example.com', 'Charlie', 'Green');

SET FOREIGN_KEY_CHECKS = 0;
SET FOREIGN_KEY_CHECKS = 1;
SET SQL_SAFE_UPDATES = 0;
SET SQL_SAFE_UPDATES = 1;
DELETE FROM ACCOUNT;

INSERT INTO STUDENT (ID, Savailable_pages)
VALUES
(2000, 100),
(2001, 200),
(2002, 300);

INSERT INTO EMPLOYEE (ID, Estart_date)
VALUES
(1, '2015-01-01'),
(2, '2016-02-01'),
(3, '2017-03-01');

INSERT INTO PAYMENT (PMtime, PMpages_purchased, PMmethod, SID)
VALUES
('2024-11-01 10:00:00', 100, 'Credit Card', 2000),
('2024-11-02 12:30:00', 50, 'Cash', 2001),
('2024-11-03 15:45:00', 200, 'Online Banking', 2002);

INSERT INTO NOTIFICATION (Ntitle, Ncontent, Nsend_time)
VALUES
('System Maintenance', 'System will be under maintenance tonight.', '2024-11-01 23:00:00'),
('Quota Update', 'Your printing quota has been updated.', '2024-11-02 08:00:00'),
('New Printer Added', 'A new printer is now available in building B.', '2024-11-03 14:00:00');

INSERT INTO TRANSACTION (Tpages_per_copy, Tcopies, Tstatus, Tstart_time, Tend_time, SID, DID, PID)
VALUES
(10, 2, 'Completed', '2024-11-01 09:00:00', '2024-11-01 09:10:00', 2000, 1, 1),
(20, 1, 'In Progress', '2024-11-02 11:00:00', NULL, 2001, 2, 2),
(15, 3, 'Completed', '2024-11-03 13:00:00', '2024-11-03 13:15:00', 2002, 3, 3);

INSERT INTO PRINTER (Pmodel, Pstatus, Plocation, Pname, Plast_maintenance, Pprovide_coloring, EID)
VALUES
('Canon A1', 'Active', 'Building A, Room 101', 'Printer A1', '2024-10-15', TRUE, 1),
('HP LaserJet', 'Active', 'Building B, Room 202', 'Printer B2', '2024-10-20', FALSE, 2),
('Epson X500', 'Maintenance', 'Building C, Room 303', 'Printer C3', '2024-10-25', TRUE, 3);

INSERT INTO DOCUMENT (Dupload_time, Dname, Dsize, Dformat, Dpage_num, SID)
VALUES
('2024-11-01 08:30:00', 'report1.pdf', 2048, 'PDF', 10, 2000),
('2024-11-02 09:45:00', 'assignment.docx', 1024, 'DOCX', 5, 2001),
('2024-11-03 10:15:00', 'presentation.pptx', 5120, 'PPTX', 20, 2002);

INSERT INTO SEND_TO (NID, SID)
VALUES
(1, 2000),
(2, 2001),
(3, 2002);

-- Thêm khóa ngoại cho STUDENT
ALTER TABLE STUDENT
ADD CONSTRAINT FK_Student_Account
FOREIGN KEY (ID) REFERENCES ACCOUNT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE;


-- Thêm khóa ngoại cho EMPLOYEE
ALTER TABLE EMPLOYEE
ADD CONSTRAINT FK_Employee_Account
FOREIGN KEY (ID) REFERENCES ACCOUNT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Thêm khóa ngoại cho PAYMENT
ALTER TABLE PAYMENT
ADD CONSTRAINT FK_Payment_Student
FOREIGN KEY (SID) REFERENCES STUDENT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Thêm khóa ngoại cho TRANSACTION
ALTER TABLE TRANSACTION
ADD CONSTRAINT FK_Transaction_Student
FOREIGN KEY (SID) REFERENCES STUDENT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT FK_Transaction_Document
FOREIGN KEY (DID) REFERENCES DOCUMENT(DID)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT FK_Transaction_Printer
FOREIGN KEY (PID) REFERENCES PRINTER(PID)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Thêm khóa ngoại cho PRINTER
ALTER TABLE PRINTER
ADD CONSTRAINT FK_Printer_Employee
FOREIGN KEY (EID) REFERENCES EMPLOYEE(ID)
ON DELETE SET NULL
ON UPDATE CASCADE;

-- Thêm khóa ngoại cho DOCUMENT
ALTER TABLE DOCUMENT
ADD CONSTRAINT FK_Document_Student
FOREIGN KEY (SID) REFERENCES STUDENT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Thêm khóa ngoại cho SEND_TO
ALTER TABLE SEND_TO
ADD CONSTRAINT FK_SendTo_Notification
FOREIGN KEY (NID) REFERENCES NOTIFICATION(NID)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT FK_SendTo_Student
FOREIGN KEY (SID) REFERENCES STUDENT(ID)
ON DELETE CASCADE
ON UPDATE CASCADE;

DELIMITER //

-DELIMITER //

CREATE TRIGGER check_account_id BEFORE INSERT ON ACCOUNT
FOR EACH ROW
BEGIN
    IF NEW.ID < 1 OR NEW.ID > 5000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid ID: ID must be in range [1-5000].';
    END IF;
END;
//

-- Trigger kiểm tra ràng buộc phạm vi ID cho STUDENT
CREATE TRIGGER check_student_id BEFORE INSERT ON STUDENT
FOR EACH ROW
BEGIN
    IF NEW.ID < 2000 OR NEW.ID > 5000 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid ID for STUDENT: ID must be in range [2000-5000].';
    END IF;
END;
//

-- Trigger kiểm tra ràng buộc phạm vi ID cho EMPLOYEE
CREATE TRIGGER check_employee_id BEFORE INSERT ON EMPLOYEE
FOR EACH ROW
BEGIN
    IF NEW.ID < 1 OR NEW.ID > 1999 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid ID for EMPLOYEE: ID must be in range [1-1999].';
    END IF;
END;
//

-- Trigger kiểm tra ràng buộc disjoint cho STUDENT
CREATE TRIGGER ensure_disjoint_student BEFORE INSERT ON STUDENT
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM EMPLOYEE WHERE ID = NEW.ID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Disjoint constraint violated: ID already exists in EMPLOYEE.';
    END IF;
END;
//

-- Trigger kiểm tra ràng buộc disjoint cho EMPLOYEE
CREATE TRIGGER ensure_disjoint_employee BEFORE INSERT ON EMPLOYEE
FOR EACH ROW
BEGIN
    IF EXISTS (SELECT 1 FROM STUDENT WHERE ID = NEW.ID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Disjoint constraint violated: ID already exists in STUDENT.';
    END IF;
END;
//

-- Trigger kiểm tra ràng buộc total trên ACCOUNT
CREATE TRIGGER check_total_constraint AFTER INSERT ON ACCOUNT
FOR EACH ROW
BEGIN
    -- Kiểm tra xem ID vừa thêm có tồn tại trong STUDENT hoặc EMPLOYEE
    IF NOT EXISTS (SELECT 1 FROM STUDENT WHERE ID = NEW.ID) AND
       NOT EXISTS (SELECT 1 FROM EMPLOYEE WHERE ID = NEW.ID) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Total constraint violated: ID must exist in either STUDENT or EMPLOYEE.';
    END IF;
END;
//

DELIMITER ;

