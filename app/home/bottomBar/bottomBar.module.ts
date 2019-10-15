import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { BottomBarComponent } from './bottomBar.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [BottomBarComponent],
    exports: [BottomBarComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class BottomBarModule { }
