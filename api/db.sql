CREATE TABLE rental_agency (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    date_of_birth DATE,
    address VARCHAR(255),
    phone_number VARCHAR(20)
);

CREATE TABLE car (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255),
    brand VARCHAR(255),
    year INT,
    category VARCHAR(255),
    agency_id INT,
    is_available BOOLEAN,
    FOREIGN KEY (agency_id) REFERENCES rental_agency(id)
);

CREATE TABLE reservation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATETIME,
    end_date DATETIME,
    user_id INT,
    car_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (car_id) REFERENCES car(id)
);

CREATE TABLE message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT,
    content VARCHAR(255),
    send_date DATETIME,
    chat_room_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(id),
    FOREIGN KEY (chat_room_id) REFERENCES chat_room(id)
);

CREATE TABLE chat_room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    start_date DATETIME,
    end_date DATETIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE payment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount FLOAT,
    payment_date DATETIME,
    reservation_id INT,
    FOREIGN KEY (reservation_id) REFERENCES reservation(id)
);
