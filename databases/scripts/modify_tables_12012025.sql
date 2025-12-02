
DROP TABLE if exists public.h_billing cascade ;
CREATE TABLE public.h_billing (
	id serial4 NOT NULL,
	patient_id int4 NULL,
	doctor_id int4 NULL,
	department_id int4 NULL,
	appointment_id int4 NULL,
	diagnostic varchar(100) NULL,
	notes varchar(1000) NULL,
	amount numeric(19, 6) NULL,
	status varchar(20) NULL,
	admission_date date NULL,
	discharge_date date NULL,
	days int,
	billing_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_billing PRIMARY KEY (id),
	CONSTRAINT fk_billing_appointment FOREIGN KEY (appointment_id) REFERENCES public.h_appointment(id),
	CONSTRAINT fk_billing_patient FOREIGN KEY (patient_id) REFERENCES public.m_patient(id),
	CONSTRAINT fk_billing_department FOREIGN KEY (department_id) REFERENCES public.m_department(id),
	CONSTRAINT fk_billing_doctor FOREIGN KEY (doctor_id) REFERENCES public.m_doctor(id)
);

DROP TABLE public.m_treatment cascade ;

CREATE TABLE public.m_treatment (
	id serial4 NOT NULL,
	billing_id int4 NULL,
	treatment_type varchar(50) NULL,
	description varchar(1000) NULL,
	quantity int4 NULL,
	amount numeric(19, 6) NULL,
	treatment_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_treatment PRIMARY KEY (id),
	CONSTRAINT fk_treatment_billing FOREIGN KEY (billing_id) REFERENCES public.h_billing(id) ON DELETE CASCADE
);

DROP TABLE public.h_prescription cascade ;

CREATE TABLE public.h_prescription (
	id serial4 NOT NULL,
	billing_id int4 NULL,
	medicine_id int4 NULL,
	quantity int4 NULL,
	duration int4 NULL,
	duration_type varchar(20) NULL,
	medicine_type varchar(20) NULL,
	dosage varchar(200) NULL,
	notes varchar(1000) NULL,
	prescription_date timestamp DEFAULT now() NOT NULL,
	CONSTRAINT pk_prescription PRIMARY KEY (id),
	CONSTRAINT fk_prescription_billing FOREIGN KEY (billing_id) REFERENCES public.h_billing(id) ON DELETE CASCADE,
	CONSTRAINT fk_prescription_medicine FOREIGN KEY (medicine_id) REFERENCES public.m_medicine(id) ON DELETE CASCADE
);
DROP VIEW if exists public.v_treatment;

CREATE VIEW public.v_treatment
AS SELECT hp.id,
    hp.billing_id,
    hm.patient_id,
    hp.treatment_type,
    hp.description,
    hp.treatment_date,
	hp.quantity,
	hp.amount,
    (hp.quantity * hp.amount) total 
   FROM m_treatment hp
     LEFT JOIN h_billing hm ON hp.billing_id = hm.id
  ORDER BY hp.billing_id, hp.treatment_date;

-- public.v_prescription source
DROP VIEW if exists public.v_prescription;
CREATE VIEW public.v_prescription
AS SELECT hp.id,
    hp.billing_id,
    hm.patient_id,
    hp.dosage,
    hp.quantity,
    hp.duration,
    hp.duration_type,
    hp.medicine_type AS medicine,
    hp.prescription_date,
    hp.notes,
    hp.medicine_id,
    mm.name AS medicine_name,
    mm.type AS medicine_type,
    mm.price as amount,
    (hp.quantity * mm.price) as total
   FROM h_prescription hp
     LEFT JOIN h_billing hm ON hp.billing_id = hm.id
     LEFT JOIN m_medicine mm ON hp.medicine_id = mm.id
  ORDER BY mm.name;


-- public.v_prescription source
DROP VIEW if exists public.v_billing;
CREATE VIEW public.v_billing
AS 
SELECT 
	hb.id as billing_id,
    hb.patient_id,
    mp.code as patient_code,
    format('%s %s'::text, mp.last_name, mp.first_name) AS patient_name,
    hb.billing_date,
    SUM((hp.quantity * mm.price) + (mt.quantity * mt.amount)) total
   FROM h_billing hb
   left join m_patient mp on hb.patient_id = mp.id
     LEFT JOIN h_prescription hp ON hp.billing_id = hb.id
     LEFT JOIN m_medicine mm  ON hp.medicine_id = mm.id
     LEFT JOIN m_treatment mt ON mt.billing_id = hb.id
group by
	hb.id,
    hb.patient_id,
    mp.code,
    mp.last_name, 
    mp.first_name,
    hb.billing_date
  ORDER BY billing_id;


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