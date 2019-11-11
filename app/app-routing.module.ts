import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'kitsummary', loadChildren: () => import('./kit-summary/kit-summary.module').then(m => m.KitSummaryModule) },
    { path: 'customizekit', loadChildren: () => import('./customize-kit/customize-kit.module').then(m => m.CustomizeKitModule) },
    { path: 'about', component: AboutComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
