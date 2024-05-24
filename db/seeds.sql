INSERT INTO department (name) VALUES
('Command'),
('Main Engineering'),
('Tactical'),
('Ops'),
('Medical');

INSERT INTO role (title, salary, department) VALUES
('Captain', 100000, 1),
('First Officer', 75000, 1),
('Chief Tactical Officer', 50000, 3),
('Chief Engineer', 65000, 2),
('Chief Operations Officer', 55000, 4),
('Chief Medical Officer', 70000, 5),
("Ship's Councelor", 55000, 5)

INSERT INTO employee (last_name, first_name, rank, role_id, manager_id, ) VALUES
('Pcard', 'Jean-Luc', 'Cpt' 1),
('Riker', 'William T.', 'Cdr' 2, 1),
('Data', 'n/a', 'LtCdr', 5, 2),
('LaForge', 'Geordi', 'LtCdr', 4, 2),
('Crusher', 'Beverly', 'Cdr', 6, 1),
('Troi', 'Deanna', 'LtCdr', 7, 1),
('Yar', 'Tosha', 'Lt', 7, 1),
('Worf', 'n/a', 'Lt', 3, 2);