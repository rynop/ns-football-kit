import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import {
    HomeRoutingModule,
    navigatableHomeComponents
} from './home-routing.module';
import { HomeComponent } from './home.component';
import { BottomBarModule } from './bottomBar/bottomBar.module';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        HomeRoutingModule,
        BottomBarModule,
    ],
    declarations: [HomeComponent, ...navigatableHomeComponents],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
