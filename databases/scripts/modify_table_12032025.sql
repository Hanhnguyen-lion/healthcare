alter table m_treatment_category
add price numeric(19,6);

alter table public.m_medicine
drop column input_date;


alter table public.m_medicine
drop column expire_date;

alter table m_medicine
add column category_id int;

alter table m_medicine
add column create_date timestamp DEFAULT now() NOT NULL;

alter table m_medicine
add column modify_date timestamp DEFAULT now() NOT NULL;

alter table m_medicine
add CONSTRAINT fk_medicine_category FOREIGN KEY (category_id) REFERENCES public.m_medicine_type(id);

update m_medicine
set category_id = 1
where category_id is null;


update m_treatment_category
set price = 100
where price is null;

drop VIEW if exists public.v_medicine;
CREATE OR REPLACE VIEW public.v_medicine
AS SELECT mm.id,
    mm."name",
    mm.price,
    mm.category_id,
    mt.name_en as medicine_type,
	mt.name_vn,
	mt.name_jp
   FROM m_medicine mm
     LEFT JOIN m_medicine_type mt ON mm.category_id = mt.id
  ORDER BY 
	mm."name";

CREATE OR REPLACE VIEW public.v_treatment
AS SELECT hp.id,
    hp.billing_id,
    hm.patient_id,
    tc.name_en AS treatment_type,
    hp.description,
    hp.treatment_date,
    hp.quantity,
    tc.price as amount,
    hp.quantity::numeric * tc.price AS total,
    hp.category_id
   FROM m_treatment hp
     LEFT JOIN h_billing hm ON hp.billing_id = hm.id
     LEFT JOIN m_treatment_category tc ON hp.category_id = tc.id
  ORDER BY hp.billing_id, hp.treatment_date;

CREATE OR REPLACE VIEW public.v_billing
AS SELECT hb.id AS billing_id,
    hb.patient_id,
    mp.code AS patient_code,
    format('%s %s'::text, mp.last_name, mp.first_name) AS patient_name,
    hb.billing_date,
    sum(hp.quantity::numeric * mm.price + mt.quantity::numeric * tc.price) AS total
   FROM h_billing hb
     LEFT JOIN m_patient mp ON hb.patient_id = mp.id
     LEFT JOIN h_prescription hp ON hp.billing_id = hb.id
     LEFT JOIN m_medicine mm ON hp.medicine_id = mm.id
     LEFT JOIN m_treatment mt ON mt.billing_id = hb.id
     LEFT JOIN m_treatment_category tc ON mt.category_id = tc.id
  GROUP BY hb.id, hb.patient_id, mp.code, mp.last_name, mp.first_name, hb.billing_date
  ORDER BY hb.id;

CREATE OR REPLACE VIEW public.v_medicalcare
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
	hb.admission_date;


