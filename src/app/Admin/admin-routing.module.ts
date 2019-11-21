import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StateRegisterComponent } from './state-register/state-register.component';
import { DivisionRegisterComponent } from './division-register/division-register.component';
import { DistrictRegisterComponent } from './district-register/district-register.component';
import { TehsilsRegisterComponent } from './tehsils-register/tehsils-register.component';
import { MahanagarpalikaRegisterComponent } from './mahanagarpalika-register/mahanagarpalika-register.component';
import { NagarpalikaRegisterComponent } from './nagarpalika-register/nagarpalika-register.component';
import { NagarpanchayatRegisterComponent } from './nagarpanchayat-register/nagarpanchayat-register.component';
import { GrampanchayatRegisterComponent } from './grampanchayat-register/grampanchayat-register.component';
import { WardRegisterComponent } from './ward-register/ward-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordListComponent } from './record-list/record-list.component';
import { SubComplainRegisterComponent } from './subcomplain-register/subcomplain-register.component';
import { ComplainRegisterComponent } from './complain-register/complain-register.component';

const AdminRoutes: Routes = [{
    path: '',
    component: AdminComponent,
    children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'record-list', component: RecordListComponent },
        { path: 'stateregister', component: StateRegisterComponent },
        { path: 'divisionregister', component: DivisionRegisterComponent },
        { path: 'districtregister', component: DistrictRegisterComponent },
        { path: 'tehsilregister', component: TehsilsRegisterComponent },
        { path: 'mahanagarpalikaregister', component: MahanagarpalikaRegisterComponent },
        { path: 'nagarpalikaregister', component: NagarpalikaRegisterComponent },
        { path: 'nagarpanchayatregister', component: NagarpanchayatRegisterComponent },
        { path: 'grampanchayatregister', component: GrampanchayatRegisterComponent },
        { path: 'wardregister', component: WardRegisterComponent },
        { path: 'complainregister', component: ComplainRegisterComponent },
        { path: 'subcomplainregister', component: SubComplainRegisterComponent  }
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }