import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular';
import { android as androidApp } from 'tns-core-modules/application';
import { device } from 'tns-core-modules/platform';
import { trigger, style, transition, animate } from "@angular/animations";

import { KitsService, Club } from '../shared/services/kits.service';
import { Observable } from 'rxjs';

declare var android: any;
interface sliderImage {
    src: string;
    background: string;
    name: string;
}

@Component({
    selector: 'Home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        // Ugly cuz Angular animations are broken on Android: https://github.com/NativeScript/nativescript-angular/issues/1518
        // See hack in ngAfterViewInit()
        trigger('trendingFlyIn', [
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(500)'
                }),
                animate('1.1s 200ms ease-out', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                }))
            ]),
        ]),
        trigger('clubsFlyIn', [
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(500)'
                }),
                animate('1.1s 400ms ease-out', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                }))
            ]),
        ]),
        trigger('brandsflyIn', [
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(500)'
                }),
                animate('1.1s 600ms ease-out', style({
                    opacity: 1,
                    transform: 'translateX(0)'
                }))
            ]),
        ]),
    ],
})
export class HomeComponent implements OnInit, AfterViewInit {
    startLoadAnimations = false;
    clubs: Club[];
    numInCart$: Observable<number>;

    trending: sliderImage[] = [
        {
            src: '~/images/trending/rm.png',
            background: 'linear-gradient(80.17deg, #8A7347 39.83%, #F8CC75 93.4%)',
            name: 'Real Madrid',
        },
        {
            src: '~/images/trending/juv.png',
            background: 'linear-gradient(77.76deg, #FD707E 39.83%, #F8CC75 93.4%)', name: 'Juventus',
        },
        {
            src: '~/images/trending/arsenal.png',
            background: 'linear-gradient(77.76deg, #C80120 39.83%, #F8CC75 93.4%)', name: 'Arsenal',
        },
        {
            src: '~/images/trending/nigeria.png',
            background: 'linear-gradient(77.76deg, #97C875 39.83%, #F8CC75 93.4%)', name: 'Nigeria',
        },
        {
            src: '~/images/trending/bayern.png',
            background: 'linear-gradient(77.76deg, #F02B33 39.83%, #F8CC75 93.4%)', name: 'Nigeria',
        },
    ];

    byClub: sliderImage[] = [
        {
            src: '~/images/logos/rm.png',
            background: '#00529F',
            name: '',
        },
        {
            src: '~/images/logos/juv.png',
            background: '#F5B400', name: '',
        },
        {
            src: '~/images/logos/cbf.png',
            background: '#008BFF',
            name: '',
        },
        {
            src: '~/images/logos/mu.png',
            background: '#780004',
            name: '',
        },
        {
            src: '~/images/logos/france.png',
            background: '#1A2657',
            name: '',
        },
        {
            src: '~/images/logos/acm.png',
            background: '#393939',
            name: '',
        },
        {
            src: '~/images/logos/portugal.png',
            background: '#691214',
            name: '',
        },
        {
            src: '~/images/logos/tot.png',
            background: '#5A74AC',
            name: '',
        },
        {
            src: '~/images/logos/lei.png',
            background: '#0A0D20',
            name: '',
        },
        {
            src: '~/images/logos/bel.png',
            background: '#5A040E',
            name: '',
        },
    ];

    constructor(
        private page: Page,
        private routerExtensions: RouterExtensions,
        private kitsSvc: KitsService,
    ) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.clubs = this.kitsSvc.getClubs();
        this.numInCart$ = this.kitsSvc.numInCart$;
    }

    ngAfterViewInit(): void {
        // Get rid of stats bar on android
        if (androidApp && device.sdkVersion >= '21') {
            console.log('Disabling Android status bar');
            const View = android.view.View;
            if (androidApp.startActivity) {
                const window = androidApp.startActivity.getWindow();
                const decorView = window.getDecorView();
                decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_HIDE_NAVIGATION |
                    View.SYSTEM_UI_FLAG_FULLSCREEN |
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                );
            }
        }

        // Hack cuz Angular animations are broken on Android: https://github.com/NativeScript/nativescript-angular/issues/1518
        setTimeout(() => {
            this.startLoadAnimations = true;
        }, 200);
    }

    chooseClub(idx: number) {
        if (idx > 2) {
            idx = 0;    // Only 3 kits supported right now
        }
        this.kitsSvc.setCurrentClub(idx);
        this.routerExtensions.navigate(['/kitsummary'], { clearHistory: false, animated: true, transition: { name: 'slideTop' } });
    }

    doTrans(idx: number) {
        const trans = ['fade',
            'flipRight',
            'flipLeft',
            'slideLeft',
            'slideRight',
            'slideTop',
            'slideBottom',];

        this.routerExtensions.navigate(['/about'], { clearHistory: false, animated: true, transition: { name: trans[idx % trans.length] } });
    }

    showCustomize() {
        this.routerExtensions.navigate(['/customizekit'], { clearHistory: false });
    }
}
