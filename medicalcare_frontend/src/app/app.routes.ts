import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthGuard } from './helpers/auth-guard';
import { Login } from './account/login';
import { Register } from './account/register';
import { ForgotPassword } from './account/forgot-password';
import { PatientComponent } from './patient/patient';
import { EditPatient } from './patient/edit-patient';
import { CreatePatient } from './patient/create-patient';
import { Billing } from './billing/billing';
import { ViewPatient } from './patient/view-patient';
import { HospitalsComponent } from './hospitals/hospitals';
import { EditHospital } from './hospitals/edit-hospital';
import { ViewHospital } from './hospitals/view-hospital';
import { CreatHospital } from './hospitals/creat-hospital';
import { DepartmentsComponent } from './departments/departments';
import { CreateDepartment } from './departments/create-department';
import { ViewDepartment } from './departments/view-department';
import { EditDepartment } from './departments/edit-department';
import { DoctorsCompnonent } from './doctors/doctors';
import { ViewDoctor } from './doctors/view-doctor';
import { EditDoctor } from './doctors/edit-doctor';
import { CreateDoctor } from './doctors/create-doctor';
import { MedicinesComponent } from './medicines/medicines';
import { EditMedicine } from './medicines/edit-medicine';
import { ViewMedicine } from './medicines/view-medicine';
import { CreateMedicine } from './medicines/create-medicine';
import { MedicalCaresComponent } from './MedicalCare/medical-cares';
import { CreateMedicalCare } from './MedicalCare/create-medical-care';


export const routes: Routes = [
    {
        path: "",
        component: Home,
        canActivate:[AuthGuard]
    },
    {
        path: "Account/Login",
        component: Login
    },
    {
        path: "Account/Register",
        component: Register
    },
    {
        path: "Account/Forgotpassword",
        component: ForgotPassword
    },
    {
        path: "Hospital",
        component: HospitalsComponent
    },
    {
        path: "Hospital/Edit/:id",
        component: EditHospital
    },
    {
        path: "Hospital/View/:id",
        component: ViewHospital
    },
    {
        path: "Hospital/Add",
        component: CreatHospital
    },
    {
        path: "Department",
        component: DepartmentsComponent
    },
    {
        path: "Department/Edit/:id",
        component: EditDepartment
    },
    {
        path: "Department/View/:id",
        component: ViewDepartment
    },
    {
        path: "Department/Add",
        component: CreateDepartment
    },
    {
        path: "Doctor",
        component: DoctorsCompnonent
    },
    {
        path: "Doctor/Edit/:id",
        component: EditDoctor
    },
    {
        path: "Doctor/View/:id",
        component: ViewDoctor
    },
    {
        path: "Doctor/Add",
        component: CreateDoctor
    },
    {
        path: "Medicine",
        component: MedicinesComponent
    },
    {
        path: "Medicine/Edit/:id",
        component: EditMedicine
    },
    {
        path: "Medicine/View/:id",
        component: ViewMedicine
    },
    {
        path: "Medicine/Add",
        component: CreateMedicine
    },
    {
        path: "Patient",
        component: PatientComponent
    },
    {
        path: "Patient/Edit/:id",
        component: EditPatient
    },
    {
        path: "Patient/View/:id",
        component: ViewPatient
    },
    {
        path: "Patient/Add",
        component: CreatePatient
    },
    {
        path: "Billing",
        component: Billing
    },
    {
        path: "MedicalCare",
        component: MedicalCaresComponent
    },
    {
        path: "MedicalCare/Add",
        component: CreateMedicalCare
    },
    { path: '**', redirectTo: '' }
];
