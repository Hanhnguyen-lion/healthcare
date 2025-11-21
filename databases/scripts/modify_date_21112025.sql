ALTER TABLE m_hospital
ALTER COLUMN description TYPE VARCHAR(1000);

ALTER TABLE m_hospital
ALTER COLUMN address TYPE VARCHAR(1000);

ALTER TABLE m_hospital
ALTER COLUMN phone TYPE VARCHAR(100);

DROP TABLE if exists public.m_disease;

CREATE TABLE public.m_disease (
	id serial4 NOT NULL,
	name_en varchar(50) NOT NULL,
	name_vn varchar(50) NOT NULL,
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_disease PRIMARY KEY (id)
);

DROP TABLE if exists public.h_prescription;

CREATE TABLE public.h_prescription (
	id serial4 NOT NULL,
	medicalcare_id int4 NULL,
	medicine_id int4 NULL,
	doctor_id int4 NULL,
	dosage int4 NULL,
	frequency int4 NULL,
	start_date date NULL,
	end_date date NULL,
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_prescription PRIMARY KEY (id),
	CONSTRAINT fk_prescription_medicine FOREIGN KEY (medicine_id) REFERENCES public.m_medicine(id),
	CONSTRAINT fk_prescription_medicalcare FOREIGN KEY (medicalcare_id) REFERENCES public.h_medicalcare(id),
	CONSTRAINT fk_prescription_doctor FOREIGN KEY (doctor_id) REFERENCES public.m_doctor(id)
);


--create m_hospital table
drop table if exists c_insurancerate;
CREATE TABLE IF NOT EXISTS c_insurancerate (
    id SERIAL not NULL,
    diseasecode1 VARCHAR(50) NULL,
    DiseasePrice1 int NULL,
    diseasecode2 VARCHAR(50) NULL,
    DiseasePrice2 int NULL,
    diseasecode3 VARCHAR(50) NULL,
    DiseasePrice3 int NULL,
    diseasecode4 VARCHAR(50) NULL,
    DiseasePrice4 int NULL,
    diseasecode5 VARCHAR(50) NULL,
    DiseasePrice5 int NULL,
    diseasecode6 VARCHAR(50) NULL,
    DiseasePrice6 int NULL,
    diseasecode7 VARCHAR(50) NULL,
    DiseasePrice7 int NULL,
    diseasecode8 VARCHAR(50) NULL,
    DiseasePrice9 int NULL,
    diseasecode10 VARCHAR(50) NULL,
    DiseasePrice10 int NULL,
    create_date timestamp not null DEFAULT now(),
    modify_date timestamp not null DEFAULT now(),
    constraint pk_insurancerate primary key (id)
);