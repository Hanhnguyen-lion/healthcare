

drop VIEW if exists public.v_medicalcare;
CREATE VIEW public.v_medicalcare
AS SELECT hb.id,
    hb.patient_id,
    mp.code AS patient_code,
    format('%s %s'::text, mp.last_name, mp.first_name) AS patient_name,
    hb.admission_date,
    date_part('month'::text, hb.admission_date)::integer AS admission_month,
    date_part('year'::text, hb.admission_date)::integer AS admission_year,
    hb.diagnostic,
    hb.notes,
    hb.department_id,
    mdep.name AS department_name,
    hb.doctor_id,
    format('%s %s'::text, md.last_name, md.first_name) AS doctor_name
   FROM h_billing hb
     LEFT JOIN m_patient mp ON hb.patient_id = mp.id
     LEFT JOIN m_doctor md ON hb.doctor_id = md.id
     LEFT JOIN m_department mdep ON hb.department_id = mdep.id
  ORDER BY 
	mp.code, 
	hb.admission_date DESC;

DROP TABLE if exists public.m_treatment_category;

CREATE TABLE public.m_treatment_category (
	id serial4 NOT NULL,
	name_en varchar(50) NOT NULL,
	name_vn varchar(50) NULL,
	name_jp varchar(50) NULL,
	description varchar(1000) NULL,
	create_date timestamp DEFAULT now() NOT NULL,
	modify_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_treatment_category PRIMARY KEY (id)
);

alter table m_treatment
add column category_id INT;

alter table m_treatment
add CONSTRAINT fk_treatment_category FOREIGN KEY (category_id) REFERENCES public.m_treatment_category(id);


CREATE OR REPLACE VIEW public.v_treatment
AS SELECT hp.id,
    hp.billing_id,
    hm.patient_id,
    tc.name_en treatment_type,
    hp.description,
    hp.treatment_date,
    hp.quantity,
    hp.amount,
    hp.quantity::numeric * hp.amount AS total,
    hp.category_id
   FROM m_treatment hp
     LEFT JOIN h_billing hm ON hp.billing_id = hm.id
     left join m_treatment_category tc on hp.category_id = tc.id
  ORDER BY hp.billing_id, hp.treatment_date;

