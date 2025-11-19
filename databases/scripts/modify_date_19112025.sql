/*
	Modify Date: 11/19/2025
	Modify By: Hanh
	Description: 
		1) rename h_medical_record table to h_medicalcare
		2) rename h_presciption -> h_prescription
		3) add columns on h_examination to h_medicalcare and drop h_examination
*/

--create H_Examination table
drop table if exists h_examination;


--create h_medical_record table
drop table if exists h_medical_record cascade;
drop table if exists h_medicalcare cascade;
CREATE TABLE IF NOT EXISTS h_medicalcare(
	id serial not null,
	patient_id int,
	doctor_id int,
	department_id int,
	visit_date date,
	diagnostic varchar(100),
	treatment varchar(100),
	notes varchar(1000),
	start_date date,
	end_date date,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_medicalcare primary key (id),
    constraint fk_medicalcare_patient foreign key(patient_id) references m_patient (id),
    constraint fk_medicalcare_doctor foreign key(doctor_id) references m_doctor (id),
    constraint fk_medicalcare_department foreign key(department_id) references m_department (id)
);

--create m_presciption table
drop table if exists m_presciption cascade;
drop table if exists h_prescription cascade;
CREATE TABLE IF NOT EXISTS h_prescription(
	id serial not null,
	record_id int,
	medicine_id int,
	dosage int,
	frequency int,
	start_date date,
	end_date date,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_prescription primary key (id),
    constraint fk_prescription_patient foreign key(record_id) references h_medicalcare (id),
    constraint fk_prescription_medicine foreign key(medicine_id) references m_medicine (id)
);

ALTER TABLE m_patient
ALTER COLUMN gender TYPE VARCHAR(10);

ALTER TABLE m_doctor
ALTER COLUMN gender TYPE VARCHAR(10);

ALTER TABLE m_account
ALTER COLUMN gender TYPE VARCHAR(10);
