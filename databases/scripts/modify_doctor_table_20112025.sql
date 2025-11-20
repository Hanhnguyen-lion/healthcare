alter table public.m_doctor
add column department_id int;

alter table public.m_doctor
add CONSTRAINT fk_doctor_department FOREIGN KEY (department_id) REFERENCES public.m_department(id);
