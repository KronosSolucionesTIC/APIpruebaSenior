--USERS-------------------------------------------------------
CREATE TABLE `senior`.`users` (
	id int not null auto_increment primary key,
	first_name varchar(100) not null, 
	last_name varchar(100) not null, 
	date_birth date not null, 
	address varchar(100) not null,
    token varchar(100) null,
    password varchar(120) not null,
	mobile_phone varchar(100) not null,
	email varchar(100) not null
);

DROP TABLE users;