import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { StateRegisterComponent } from './state-register/state-register.component';
import { AdminComponent } from './admin.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { DivisionRegisterComponent } from './division-register/division-register.component';
import { DistrictRegisterComponent } from './district-register/district-register.component';
import { TehsilsRegisterComponent } from './tehsils-register/tehsils-register.component';
import { MahanagarpalikaRegisterComponent } from './mahanagarpalika-register/mahanagarpalika-register.component';
import { NagarpanchayatRegisterComponent } from './nagarpanchayat-register/nagarpanchayat-register.component';
import { NagarpalikaRegisterComponent } from './nagarpalika-register/nagarpalika-register.component';
import { GrampanchayatRegisterComponent } from './grampanchayat-register/grampanchayat-register.component';
import { WardRegisterComponent } from './ward-register/ward-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordListComponent } from './record-list/record-list.component';
import { SubComplainRegisterComponent } from './subcomplain-register/subcomplain-register.component';
import { ComplainRegisterComponent } from './complain-register/complain-register.component';
import { IconComponent } from '../_components';

@NgModule({
    declarations:[
        AdminComponent,
        DashboardComponent,
        StateRegisterComponent,
        DivisionRegisterComponent,
        DistrictRegisterComponent,
        TehsilsRegisterComponent,
        MahanagarpalikaRegisterComponent,
        NagarpanchayatRegisterComponent,
        NagarpalikaRegisterComponent,
        GrampanchayatRegisterComponent,
        WardRegisterComponent,
        RecordListComponent,
        ComplainRegisterComponent,
        SubComplainRegisterComponent,
        IconComponent

    ],
    imports:[
        AdminRoutingModule,
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule.forRoot()
    ],
    exports:[]
})
export class AdminModule{}