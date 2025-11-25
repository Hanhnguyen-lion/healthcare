DROP TABLE IF EXISTS public.m_treatment;
CREATE TABLE public.m_treatment (
	id serial4 NOT NULL,
	medicalcare_id int4 NULL,
	treatment_type varchar(50) NULL,
	description varchar(1000) NULL,
	treatment_date date NULL,
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_treatment PRIMARY KEY (id),
	CONSTRAINT fk_treatment_medicalcare FOREIGN KEY (medicalcare_id) REFERENCES public.h_medicalcare(id)
);