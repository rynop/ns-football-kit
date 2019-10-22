import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { NavigationTransition } from 'tns-core-modules/ui/frame';
import { android as androidApp } from 'tns-core-modules/application';
import { RouterExtensions } from 'nativescript-angular';
import { device } from 'tns-core-modules/platform';
import { KitsService, Club } from '../shared/services/kits.service';

declare var android: any;

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    clubs: Club[];

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private kitsSvc: KitsService,
    ) {
        // // Get rid of stats bar on android
        // if (androidApp && device.sdkVersion >= '21') {
        //     console.log('Disabling status bar');
        //     const View = android.view.View;
        //     const window = androidApp.startActivity.getWindow();
        //     const decorView = window.getDecorView();
        //     decorView.setSystemUiVisibility(
        //         View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
        //         View.SYSTEM_UI_FLAG_FULLSCREEN |
        //         View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
        //     );
        // }
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.clubs = this.kitsSvc.getClubs();
    }

    ngAfterViewInit(): void {

    }

    chooseClub(idx: number) {
        console.log(`ChooseClub ${idx}`);

        this.kitsSvc.setCurrentClub(idx);
        this.routerExtensions.navigate(['/customizekit'], { clearHistory: false, animated: true, transition: { name: 'explode' } });
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

        // console.log(
        //     `HomeComponent: routing to ${route} clearHistory: ${clearHistory}`
        // );

        this.routerExtensions.navigate([route], { clearHistory });
    }
}
