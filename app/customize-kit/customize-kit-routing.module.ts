import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CustomizeKitComponent } from "./customize-kit.component";

const routes: Routes = [
    { path: "", component: CustomizeKitComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomizeKitRoutingModule { }
