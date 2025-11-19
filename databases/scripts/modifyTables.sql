/*
	Modify Date: 11/18/2025
	Modify By: Hanh
	Description: 
		1) Change m_patient table
		2) Add medicalRecord table
		3) Add prescription table
	
*/
--create m_Doctor table
drop table if exists m_doctor cascade ;
CREATE TABLE IF NOT EXISTS m_doctor (
    id SERIAL not NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
	phone VARCHAR(50),
	email VARCHAR(50),
    gender VARCHAR(1) NULL,
    quanlification VARCHAR(50) NULL,
    job_specification VARCHAR(1000) NULL,
    hospital_id int NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_doctor primary key (id),
    constraint fk_doctor_hospital foreign key (hospital_id) references m_hospital(id)
);


--create M_Patient table
drop table if exists m_patient cascade;
CREATE TABLE IF NOT EXISTS m_patient(
    id SERIAL not null,
	code VARCHAR(50) NOT null,
	first_name VARCHAR(50) NOT null,
	last_name VARCHAR(50) NOT null,
	date_of_birth date,
	gender varchar(2),
	home_address VARCHAR(1000),
	office_address VARCHAR(1000),
	phone_number VARCHAR(50),
	email VARCHAR(50),
	job VARCHAR(50),
	emergency_contact_name varchar(100),
	emergency_contact_phone varchar(20),
	insurance_type varchar(50),
	insurance_policy_number varchar(50),
	insurance_provider varchar(100),
	insurance_expire date,
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


--create M_Department table
drop table if exists m_department cascade;
CREATE TABLE IF NOT EXISTS m_department (
    id SERIAL not null,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NULL,
    doctor_id int NULL,
    hospital_id int NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_department primary key (id),
    constraint fk_department_hospital foreign key(hospital_id) references m_hospital(id),
    constraint fk_department_doctor foreign key(doctor_id) references m_doctor(id)
);


--create H_Examination table
drop table if exists h_examination;
CREATE TABLE IF NOT EXISTS h_examination(
	patient_id int not null,
	department_id int not null,
	constraint pf_examination primary key (patient_id, department_id),
    constraint fk_examination_patient foreign key(patient_id) references m_patient (id),
    constraint fk_examination_department foreign key(department_id) references m_department (id)
);


--create H_Appointment table
drop table if exists h_appointment;
CREATE TABLE IF NOT EXISTS h_appointment(
    id SERIAL not null,
    appointment_date date not null,
	patient_id int,
	doctor_id int,
	reason_to_vist VARCHAR(100),
	status VARCHAR(50),
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_appointment primary key (id),
    constraint fk_appointment_patient foreign key(patient_id) references m_patient (id),
    constraint fk_appointment_doctor foreign key(doctor_id) references m_doctor (id)
);

--create h_medical_record table
drop table if exists h_medical_record;
CREATE TABLE IF NOT EXISTS h_medical_record(
	id serial not null,
	patient_id int,
	doctor_id int,
	visit_date date,
	diagnostic varchar(100),
	treatment varchar(100),
	prescription varchar(100),
	notes varchar(1000),
    constraint pk_medical_record primary key (id),
    constraint fk_medical_record_patient foreign key(patient_id) references m_patient (id),
    constraint fk_medical_record_doctor foreign key(doctor_id) references m_doctor (id)
);

--create m_presciption table
drop table if exists m_presciption cascade;
CREATE TABLE IF NOT EXISTS m_presciption(
	id serial not null,
	record_id int,
	medicine_id int,
	dosage int,
	frequency int,
	start_date date,
	end_date date,
    constraint pk_presciption primary key (id),
    constraint fk_presciption_patient foreign key(record_id) references h_medical_record (id),
    constraint fk_presciption_medicine foreign key(medicine_id) references m_medicine (id)
);

--create H_Billing table
drop table if exists h_billing cascade;
CREATE TABLE IF NOT EXISTS h_billing(
	id serial not null,
	patient_id int,
	appointment_id int,
	presciption_id int,
	billing_date date not null,
	amount numeric(19,6),
	status varchar(20),
    constraint pk_billing primary key (id),
    constraint fk_billing_patient foreign key(patient_id) references m_patient (id),
    constraint fk_billing_medicine foreign key(appointment_id) references h_appointment (id),
    constraint fk_billing_doctor foreign key(presciption_id) references m_presciption (id)
);
