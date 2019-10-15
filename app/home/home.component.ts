import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
// import * as bbCommon from './bottomBar/bottomBar.common';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }

    tabSelected(tabName: string) {
        let route: string;
        const clearHistory = true;
        switch (tabName) {
            // case bbCommon.LOGIN_TAB_NAME:
            //     route = '/home/login';
            //     // clearHistory = false;
            //     break;
            default:
                route = `/home/${tabName.toLowerCase()}`;
                break;
        }

        console.log(
            `HomeComponent: routing to ${route} clearHistory: ${clearHistory}`
        );

        this.routerExtensions.navigate([route], { clearHistory });
    }
}
