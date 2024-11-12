Create database CarFixer;

CREATE TABLE Customers (
    customerId INT PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    phone VARCHAR(15),
    email VARCHAR(40),
    address VARCHAR(40));

INSERT INTO Customers (customerId, firstName, lastName, phone, email, address) VALUES
(01, 'John', 'Doe', 1234567890, 'john.doe@example.com', '123 Elm Street, Springfield'),
(02, 'Jane', 'Smith', 4590689015, 'jane.smith@example.com', '456 Oak Street, Vernon'),
(03, 'Alice', 'Johnson', 3456789012, 'alice.johnson@example.com', '789 Maple Avenue, Manchester'),
(04, 'Bob', 'Brown', 4567890123, 'bob.brown@example.com', '101 Pine Road, Middletown'),
(05, 'Eve', 'White', 5678901234, 'eve.white@example.com', '202 Cedar Lane, Springfield');


CREATE TABLE Cars (
    licensePlate VARCHAR(20) PRIMARY KEY,
    carMake VARCHAR(20),
    carModel VARCHAR(20),
    carYear INT,
    ownerId INT,
    FOREIGN KEY (ownerId) REFERENCES Customers(customerId)
);


-- Employees Table
CREATE TABLE Employees (
    employeeId INT PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    workPhone INT,
    personalPhone INT,
    totalAppts INT
);

CREATE TABLE Items (
    itemName VARCHAR(30) PRIMARY KEY,
    price FLOAT,
    stock INT
);


INSERT INTO Items (itemName, price, stock) VALUES
('Brake Pads', 75.50, 20),
('Oil Filter', 15.75, 50),
('Spark Plug', 8.00, 30),
('Car Battery', 120.00, 20),
('Air Filter', 18.00, 50);

CREATE TABLE Appointments (
    appointmentId INT PRIMARY KEY,
    customerId INT,
    date DATE,
    time TIME,
    finished BOOLEAN,
    employeeId INT,
    carId VARCHAR(10),
    issue VARCHAR(15),
    FOREIGN KEY (customerId) REFERENCES Customers(customerId),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId),
    FOREIGN KEY (carId) REFERENCES Cars(licensePlate)
);

CREATE TABLE Payments (
    paymentId INT PRIMARY KEY,
    customerId INT,
    noOfItems INT,
    paidAmount FLOAT,
    fullyPaid BOOLEAN,
    duePayment FLOAT,
    totalPrice FLOAT,
    appointmentId INT,
    FOREIGN KEY (customerId) REFERENCES Customers(customerId),
    FOREIGN KEY (appointmentId) REFERENCES Appointments(appointmentId)
);



CREATE TABLE Services (
    serviceName VARCHAR(20) PRIMARY KEY,
    serviceDescription VARCHAR(80)
);

INSERT INTO Services (serviceName, serviceDescription) VALUES
('Oil Change', 'Complete engine oil replacement'),
('Tire Rotation', 'Rotate tires for even wear'),
('Brake Inspection', 'Inspection and maintenance of brake pads and rotors'),
('Battery Check', 'Test and replace car battery if needed'),
('Engine Diagnostic', 'Comprehensive engine performance check');

-- Bridge Tables for Many-to-Many Relationships

-- Items Paid For Table (Bridge Table between Payments and Items)
CREATE TABLE Items_Payments (
    itemName VARCHAR(20),
    paymentId INT,
    FOREIGN KEY (itemName) REFERENCES Items(itemName),
    FOREIGN KEY (paymentId) REFERENCES Payments(paymentId)
);

-- Services Offered by Employee Table (Bridge Table between Employees and Services)
CREATE TABLE Employee_Specialties (
    employeeId INT,
    serviceName VARCHAR(20),
    FOREIGN KEY (employeeId) REFERENCES Employees(employeeId),
    FOREIGN KEY (serviceName) REFERENCES Services(serviceName)
);

-- Services Used Table (Bridge Table between Appointments and Services)
CREATE TABLE Services_Used (
    appointmentId INT,
    serviceName VARCHAR(20),
    FOREIGN KEY (appointmentId) REFERENCES Appointments(appointmentId),
    FOREIGN KEY (serviceName) REFERENCES Services(serviceName)
);
