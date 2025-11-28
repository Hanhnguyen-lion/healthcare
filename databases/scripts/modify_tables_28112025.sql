DROP TABLE if exists public.m_medicine_type;
CREATE TABLE public.m_medicine_type (
	id serial4 NOT NULL,
	name_en varchar(50),
	name_vn varchar(50),
	name_jp varchar(50),
	description varchar(1000),
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_medicine_type PRIMARY KEY (id)
);

insert into public.m_medicine_type(name_en, name_vn)
values 
	('tablets', 'viên'),
	('bottle', 'chai'),
	('drops', 'giọt'),
	('tubs', 'tubs');
	
	

DROP TABLE if exists public.m_duration_type;
CREATE TABLE public.m_duration_type (
	id serial4 NOT NULL,
	name_en varchar(50),
	name_vn varchar(50),
	name_jp varchar(50),
	description varchar(1000),
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_duration_type PRIMARY KEY (id)
);
insert into public.m_duration_type(name_en, name_vn)
values 
	('day', 'ngày'),
	('week', 'tuần'),
	('month', 'tháng'),
	('year', 'năm');
DROP TABLE if exists public.h_prescription cascade ;
CREATE TABLE public.h_prescription (
	id serial4 NOT NULL,
	medicalcare_id int4 NULL,
	medicine_id int4 NULL,
	doctor_id int4 NULL,
	quantity int null,
	duration int null,
	duration_type varchar(20),
	medicine_type varchar(20),
	dosage varchar(200) NULL,
	prescription_date date NULL,
	notes varchar(1000),
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_prescription PRIMARY KEY (id),
	CONSTRAINT fk_prescription_doctor FOREIGN KEY (doctor_id) REFERENCES public.m_doctor(id),
	CONSTRAINT fk_prescription_medicalcare FOREIGN KEY (medicalcare_id) REFERENCES public.h_medicalcare(id),
	CONSTRAINT fk_prescription_medicine FOREIGN KEY (medicine_id) REFERENCES public.m_medicine(id)
);

CREATE OR REPLACE VIEW public.v_prescription
AS SELECT hp.id,
    hp.medicalcare_id,
    hm.patient_id,
    hp.dosage,
    hp.quantity,
    hp.duration,
    hp.duration_type,
    hp.medicine_type as medicine,
    hp.prescription_date,
    hp.notes,
    hp.medicine_id,
    mm.name AS medicine_name,
    mm.type AS medicine_type,
    hp.doctor_id,
    format('%s %s'::text, md.last_name, md.first_name) AS doctor_name
   FROM h_prescription hp
     LEFT JOIN h_medicalcare hm ON hp.medicalcare_id = hm.id
     LEFT JOIN m_medicine mm ON hp.medicine_id = mm.id
     LEFT JOIN m_doctor md ON hp.doctor_id = md.id
  ORDER BY mm.name;

-- public.v_medicalcare source
DROP VIEW if exists public.v_medicalcare;
CREATE OR REPLACE VIEW public.v_medicalcare
AS SELECT hm.id,
    hm.patient_id,
    mp.code AS patient_code,
    format('%s %s'::text, mp.last_name, mp.first_name) AS patient_name,
    hm.visit_date,
    date_part('month'::text, hm.visit_date)::integer AS visit_month,
    date_part('year'::text, hm.visit_date)::integer AS visit_year,
    hm.diagnostic,
    hm.notes,
    hm.department_id,
    mdep.name AS department_name,
    hm.doctor_id,
    format('%s %s'::text, md.last_name, md.first_name) AS doctor_name
   FROM h_medicalcare hm
     LEFT JOIN m_patient mp ON hm.patient_id = mp.id
     LEFT JOIN m_doctor md ON hm.doctor_id = md.id
     LEFT JOIN m_department mdep ON hm.department_id = mdep.id
  ORDER BY mp.code, hm.visit_date DESC;
DROP VIEW if exists public.v_billing;
CREATE OR REPLACE VIEW public.v_billing
AS SELECT hp.id,
    hp.medicalcare_id,
    hm.patient_id,
    hp.quantity,
    hp.prescription_date,
    hp.medicine_id,
    mm.name AS medicine_name,
    mm.type AS medicine_type,
    mm.price,
    (mm.price * hp.quantity) as amount
   FROM h_prescription hp
     LEFT JOIN h_medicalcare hm ON hp.medicalcare_id = hm.id
     LEFT JOIN m_medicine mm ON hp.medicine_id = mm.id
  ORDER BY 
	hm.patient_id,
	hp.medicalcare_id,
  	mm.name,
	hp.prescription_date;

alter table public.h_medicalcare
drop column start_date;

alter table public.h_medicalcare
drop column end_date;