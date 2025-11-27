drop view if exists v_prescription;
create view v_prescription as
select
	hp.id,
	hp.medicalcare_id,
	hm.patient_id,
	hp.dosage,
	hp.frequency,
	hp.start_date,
	hp.end_date,
	hp.medicine_id,
	mm."name" as medicine_name,
	mm."type" as medicine_type,
	hp.doctor_id,
	format('%s %s', md.last_name, md.first_name) doctor_name
from h_prescription hp 
left join h_medicalcare hm on hp.medicalcare_id = hm.id
left join m_medicine mm on hp.medicine_id = mm.id
left join m_doctor md on hp.doctor_id = md.id
order by medicine_name;

drop view if exists v_treatment;
create view v_treatment as
select
	hp.id,
	hp.medicalcare_id,
	hm.patient_id,
	hp.treatment_type,
	hp.description,
	hp.treatment_date
from m_treatment hp 
left join h_medicalcare hm on hp.medicalcare_id = hm.id
order by hp.medicalcare_id, treatment_date;


drop view if exists v_medicalcare;
create view v_medicalcare as
select
	hm.id,
	hm.patient_id,
	mp.code as patient_code,
	format('%s %s', mp.last_name, mp.first_name) patient_name,
	hm.visit_date,
	hm.start_date,
	hm.end_date,
	date_part('month', hm.visit_date)::int visit_month,
	date_part('year', hm.visit_date)::int visit_year,
	hm.diagnostic,
	hm.notes,
	hm.department_id,
	mdep."name" as department_name,
	hm.doctor_id,
	format('%s %s', md.last_name, md.first_name) doctor_name
from h_medicalcare hm 
left join m_patient mp on hm.patient_id = mp.id
left join m_doctor md on hm.doctor_id = md.id
left join m_department mdep on hm.department_id = mdep.id
order by patient_code, hm.visit_date DESC;
