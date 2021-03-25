CREATE TABLE trainer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    trainer_name VARCHAR(255) NOT NULL,
    trainer_pw VARCHAR(25) NOT NULL,
    pokemon VARCHAR(255),
    trainer_victories INT NOT NULL DEFAULT 0,
    trainer_defeats INT NOT NULL DEFAULT 0
);