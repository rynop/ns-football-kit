import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { KitSummaryComponent } from "./kit-summary.component";

const routes: Routes = [
    { path: "", component: KitSummaryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class KitSummaryRoutingModule { }
