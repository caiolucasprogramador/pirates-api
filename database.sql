CREATE TABLE pirates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    bounty BIGINT DEFAULT 0,
    devilfruit BOOLEAN DEFAULT false 
);

INSERT INTO pirates (name, role, bounty, devilfruit) VALUES
('Monkey D. Luffy', 'Capitão', 3000000000, true),
('Roronoa Zoro', 'Espadachim', 1111000000, false),
('Nami', 'Navegadora', 366000000, false),
('Usopp', 'Atirador', 500000000, false),
('Sanji', 'Cozinheiro', 1032000000, false),
('Tony Tony Chopper', 'Médico', 1000, true),
('Nico Robin', 'Arqueóloga', 930000000, true),
('Franky', 'Carpinteiro', 394000000, true),
('Brook', 'Músico', 383000000, true),
('Jimbe', 'Timoneiro', 1100000000, false);