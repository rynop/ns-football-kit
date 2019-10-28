import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { KitSummaryRoutingModule } from "./kit-summary-routing.module";
import { KitSummaryComponent } from "./kit-summary.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        KitSummaryRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        KitSummaryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class KitSummaryModule { }
