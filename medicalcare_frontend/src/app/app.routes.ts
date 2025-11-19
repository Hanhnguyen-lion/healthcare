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
import { MedicalRecords } from './medical-records/medical-records';
import { ViewPatient } from './patient/view-patient';

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
        component: MedicalRecords
    },
    { path: '**', redirectTo: '' }
];
