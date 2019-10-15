import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core';
import { AnimationCurve } from 'tns-core-modules/ui/enums';
import { screen } from 'tns-core-modules/platform';

import * as common from './bottomBar.common';

@Component({
    selector: 'BottomBar',
    moduleId: module.id,
    templateUrl: './bottomBar.component.html',
    styleUrls: ['./bottomBar.component.css']
})
export class BottomBarComponent implements OnInit {
    selectedTab = common.CUSTOMIZEKIT_TAB_NAME;
    numTabs = common.TAB_ORDER.length;

    @ViewChild('tabHighlight', { static: false }) tabHighlight: ElementRef;

    @ViewChild('customizeKit', { static: false }) customizekitEle: ElementRef;

    @Output() tabSelected = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void { }

    selectTab(selTab: string) {
        const previousTab = this.selectedTab;
        // if (selTab !== this.selectedTab) {
        const index = common.TAB_ORDER.indexOf(selTab);
        this.selectedTab = selTab;
        this.tabHighlight.nativeElement.animate({
            translate: {
                x: (index * screen.mainScreen.widthDIPs) / this.numTabs,
                y: 0
            },
            curve: AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
            duration: 300
        });

        this.animateCurrentImage(this.getImage(selTab));
        this.animatePreviousImage(this.getImage(previousTab));
        this.tabSelected.emit(this.selectedTab);
        // }
    }

    getImage(tabName: string) {
        if (-1 !== common.TAB_ORDER.indexOf(tabName)) {
            return this[tabName.toLowerCase() + 'Ele'];
        } else {
            console.error(`Could not find ${tabName} common.TAB_ORDER`);
            return undefined;
        }
    }

    animateCurrentImage(arg: any) {
        arg.nativeElement.animate({
            scale: { x: 1.2, y: 1.2 },
            curve: AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
            duration: 300
        });
    }

    animatePreviousImage(arg: any) {
        arg.nativeElement.animate({
            scale: { x: 1, y: 1 },
            curve: AnimationCurve.cubicBezier(1, 0.02, 0.45, 0.93),
            duration: 300
        });
    }
}
