import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { HomeComponent } from './home.component';
import { CustomizeKitComponent } from '../customize-kit/customize-kit.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: '',
                component: CustomizeKitComponent
            },
            {
                path: 'customizekit',
                component: CustomizeKitComponent
            }
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }

export const navigatableHomeComponents = [
    CustomizeKitComponent,
];
