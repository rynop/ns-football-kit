import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CustomizeKitRoutingModule } from "./customize-kit-routing.module";
import { CustomizeKitComponent } from "./customize-kit.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        CustomizeKitRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CustomizeKitComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomizeKitModule { }
