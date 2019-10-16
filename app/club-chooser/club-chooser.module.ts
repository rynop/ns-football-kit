import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { ClubChooserRoutingModule } from "./club-chooser-routing.module";
import { ClubChooserComponent } from "./club-chooser.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ClubChooserRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        ClubChooserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomizeKitModule { }
