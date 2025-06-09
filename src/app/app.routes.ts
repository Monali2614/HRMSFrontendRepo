// import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

// import { AuthGuard } from './guards/auth.guard';

// import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
// import { HrDashboardComponent } from './dashboard/hr-dashboard/hr-dashboard.component';
// import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
// import { SeniorhrDashboardComponent } from './dashboard/seniorhr-dashboard/seniorhr-dashboard.component';
// import { HomeComponent } from './home/home.component';


// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },

//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },

//   { path: 'home', component: HomeComponent, },

//   { path: 'dashboard/user', component: UserDashboardComponent, canActivate: [AuthGuard], data: { role: 'USER' } },
//   { path: 'dashboard/hr', component: HrDashboardComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
//   { path: 'dashboard/manager', component: ManagerDashboardComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
//   { path: 'dashboard/seniorhr', component: SeniorhrDashboardComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },
//   { path: '**', redirectTo: 'login' },
// ];





//? tesing routes

import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';

import { ManagerLayoutComponent } from './layout/manager-layout/manager-layout.component';

import { EngageComponent } from './pages/engage/engage.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { AllUserComponent } from './pages/all-user/all-user.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { HrLayoutComponent } from './layout/hr-layout/hr-layout.component';
import { SeniorHrLayoutComponent } from './layout/senior-hr-layout/senior-hr-layout.component';
import { ManagerHomeComponent } from './pages/manager-home/manager-home.component';
import { SeniorHrHomeComponent } from './pages/senior-hr-home/senior-hr-home.component';
import { HrHomeComponent } from './pages/hr-home/hr-home.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

import { UserDocumentCenterComponent } from './pages/user-document-center/user-document-center.component';
import { PayslipComponent } from './pages/payslip/payslip.component';
import { UserPeopleComponent } from './pages/user-people/user-people.component';
import { TaskComponent } from './pages/task/task.component';
import { KudoComponent } from './pages/kudo/kudo.component';
import { HelpdeskComponent } from './pages/helpdesk/helpdesk.component';
import { RequestHubComponent } from './pages/request-hub/request-hub.component';
import { UserFeedbackComponent } from './pages/user-feedback/user-feedback.component';
import { ApplyLeavesComponent } from './pages/apply-leaves/apply-leaves.component';
import { HrGenerateSalaryComponent } from './pages/hr-generate-salary/hr-generate-salary.component';
import { AllLeaveRequestComponent } from './pages/all-leave-request/all-leave-request.component';
import { LeavesStatusComponent } from './pages/leaves-status/leaves-status.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Dashboard routes with AuthGuard
  { path: 'dashboard/manager', component: ManagerLayoutComponent, canActivate: [AuthGuard], data: { role: 'MANAGER' } },
  { path: 'dashboard/seniorhr', component: SeniorHrLayoutComponent, canActivate: [AuthGuard], data: { role: 'SENIORHR' } },
  { path: 'dashboard/hr', component: HrLayoutComponent, canActivate: [AuthGuard], data: { role: 'HR' } },
  { path: 'dashboard/user', component: UserLayoutComponent, canActivate: [AuthGuard], data: { role: 'USER' } },

  // 📌 Manager Layout Route
  {
    path: '',
    component: ManagerLayoutComponent,
    children: [
      { path: 'manager-home', component: ManagerHomeComponent, canActivate: [AuthGuard] },
      { path: 'manager-engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'manager-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'manager-all-user', component: AllUserComponent, canActivate: [AuthGuard] },
    ]
  },

  // 📌 Senior-Hr Layout Route
  {
    path: '',
    component: SeniorHrLayoutComponent,
    children: [
      { path: 'senior-hr-home', component: SeniorHrHomeComponent, canActivate: [AuthGuard] },
      { path: 'senior-hr-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'senior-hr-all-user', component: AllUserComponent, canActivate: [AuthGuard] },
      { path: 'senior-hr-engage', component: EngageComponent, canActivate: [AuthGuard] },
    ]
  },

  // 📌 Hr Layout Route
  {
    path: '',
    component: HrLayoutComponent,
    children: [
      { path: 'hr-home', component: HrHomeComponent, canActivate: [AuthGuard] },
      { path: 'hr-add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] },
      { path: 'hr-all-user', component: AllUserComponent, canActivate: [AuthGuard] },
      { path: 'hr-engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'hr-generate-salary', component: HrGenerateSalaryComponent, canActivate: [AuthGuard] },
         { path: 'all-leave-request', component: AllLeaveRequestComponent, canActivate: [AuthGuard] },
    ]
  },

  // 📌 User Layout Route
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: 'user-home', component: UserHomeComponent, canActivate: [AuthGuard] },
      { path: 'pay-slip', component: PayslipComponent, canActivate: [AuthGuard] },
      { path: 'user-document-centre', component: UserDocumentCenterComponent, canActivate: [AuthGuard] },
      { path: 'user-people', component: UserPeopleComponent, canActivate: [AuthGuard] },
      { path: 'my-worklife/kudo', component: KudoComponent, canActivate: [AuthGuard] },
      { path: 'to-do/task', component: TaskComponent, canActivate: [AuthGuard] },
      { path: 'engage', component: EngageComponent, canActivate: [AuthGuard] },
      { path: 'Helpdesk', component: HelpdeskComponent, canActivate: [AuthGuard] },
      { path: 'Workflow Delegates/request-hub', component: RequestHubComponent, canActivate: [AuthGuard] },
      { path: 'my-worklife/feedback', component: UserFeedbackComponent, canActivate: [AuthGuard] },
      { path: 'leaves/apply-leaves', component: ApplyLeavesComponent, canActivate: [AuthGuard] },
       { path: 'leaves/leaves-status', component: LeavesStatusComponent, canActivate: [AuthGuard] },
       
    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' },
];
