--create M_Account table
/*
	drop account_name column 
	set not null email column
	Modify Date: 11/14/2025
	Modify By: Hanh
	
	Modify Date: 11/18/2025
	Modify By: Hanh
	Description: 
		1) Change m_patient table
		2) Add medicalRecord table
		3) Add prescription table
	
*/
drop table if exists m_account cascade;
CREATE TABLE IF NOT EXISTS m_account (
    id SERIAL not NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) not NULL,
    first_name VARCHAR(50) not NULL,
    last_name VARCHAR(1000) not NULL,
	dob date,
	gender varchar(1),
	address VARCHAR(1000),
    phone VARCHAR(20) NULL,
    account_type VARCHAR(20) NULL,
    token VARCHAR(100) NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_account primary key (id)
);

--create m_hospital table
drop table if exists m_hospital cascade;
CREATE TABLE IF NOT EXISTS m_hospital (
    id SERIAL not NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100) NULL,
    country VARCHAR(50) NULL,
    address VARCHAR(1000) NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(50) NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_hospital primary key (id)
);
--create m_Doctor table
drop table if exists m_doctor cascade;
CREATE TABLE IF NOT EXISTS m_doctor (
    id SERIAL not NULL,
    name VARCHAR(50) NOT NULL,
    gender VARCHAR(1) NULL,
    quanlification VARCHAR(50) NULL,
    job_specification VARCHAR(1000) NULL,
    hosp_id int NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_doctor primary key (id),
    constraint fk_doctor_hospital foreign key (hosp_id) references m_hospital(id)
);

--create M_Department table
drop table if exists m_department cascade;
CREATE TABLE IF NOT EXISTS m_department (
    id SERIAL not null,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NULL,
    doctor_id int NULL,
    hosp_id int NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_department primary key (id),
    constraint fk_department_hospital foreign key(hosp_id) references m_hospital(id),
    constraint fk_department_doctor foreign key(hosp_id) references m_doctor(id)
);

--create M_Patient table
drop table if exists m_patient cascade;
CREATE TABLE IF NOT EXISTS m_patient(
    id SERIAL not null,
	code VARCHAR(50) NOT null,
	first_name VARCHAR(50) NOT null,
	last_name VARCHAR(50) NOT null,
	dob date,
	gender varchar(2),
	address VARCHAR(1000),
	phone VARCHAR(50),
	email VARCHAR(50),
	insurance_info VARCHAR(1000),
	medical_history VARCHAR(1000),
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_patient primary key (id)
);

--create m_medicine table
drop table if exists m_medicine cascade;
CREATE TABLE IF NOT EXISTS m_medicine(
    id SERIAL not null,
    name VARCHAR(50) NOT null,
	type VARCHAR(50),
	price numeric(19, 6),
	input_date date not null,
	expire_date date not null,
    constraint pk_medicine primary key (id)
);

--create M_Disease table
drop table if exists m_disease;
CREATE TABLE IF NOT EXISTS m_disease(
    id SERIAL not NULL,
    name VARCHAR(50) NOT null,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_disease primary key (id)
);

--create H_Appointment table
drop table if exists h_appointment;
CREATE TABLE IF NOT EXISTS h_appointment(
    id SERIAL not null,
    appoint_date date not null,
	patient_id int,
	doctor_id int,
	status VARCHAR(50),
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_appointment primary key (id),
    constraint fk_appointment_patient foreign key(patient_id) references m_patient (id),
    constraint fk_appointment_doctor foreign key(doctor_id) references m_doctor (id)
);

--create H_Examination table
drop table if exists h_examination;
CREATE TABLE IF NOT EXISTS h_examination(
	patient_id int not null,
	dep_id int not null,
	constraint pf_examination primary key (patient_id, dep_id),
    constraint fk_patient_examination foreign key(patient_id) references m_patient (id),
    constraint fk_department_examination foreign key(dep_id) references m_department (id)
);

--create H_Billing table
drop table if exists h_billing cascade;
CREATE TABLE IF NOT EXISTS h_billing(
	id serial not null,
	billing_date date not null,
	patient_id int,
	doctor_id int,
	medicine_id int,
	quantity int,
	amount numeric(19,6),
	duration int,
	dosage_per_day int,
    constraint pk_billing primary key (id),
    constraint fk_billing_patient foreign key(patient_id) references m_patient (id),
    constraint fk_billing_medicine foreign key(medicine_id) references m_medicine (id),
    constraint fk_billing_doctor foreign key(doctor_id) references m_doctor (id)
);
