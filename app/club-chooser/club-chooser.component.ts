import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";

import { KitsService, Club } from "~/shared/services/kits.service";
import { Observable } from "rxjs";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { AnimationCurve } from "tns-core-modules/ui/enums";

@Component({
    selector: "ClubChooser",
    moduleId: module.id,
    templateUrl: "./club-chooser.component.html",
    styleUrls: ["./club-chooser.component.css"],
    animations: [
    ],
})
export class ClubChooserComponent implements OnInit {
    clubs: Club[];
    currentClub$: Observable<Club>;
    currentClubIdx = 0;

    @ViewChild('clubLogo', { static: false }) clubLogoView: ElementRef;

    clubAnimationsBeforeSwitch: Animation;
    clubAnimationsAfterSwitch: Animation;

    constructor(
        private _page: Page,
        private kitsSvc: KitsService,
    ) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.clubs = this.kitsSvc.getClubs();
        this.currentClub$ = this.kitsSvc.currentClub$;
        this.setupAnimations();
    }

    async onClubIdxChanged(event) {
        const newIdx = event.value;
        // if (!this.clubAnimationsBeforeSwitch.isPlaying) {
        //     await this.clubAnimationsBeforeSwitch.play();

        //     await this.clubAnimationsAfterSwitch.play();
        // }
    }

    setupAnimations() {
        // console.log(this.clubLogoView);

        // const clubLogoEle = this.clubLogoView.nativeElement;
        // const clubLogoAnimationDefBeforeSwitch: AnimationDefinition[] = [];
        // const clubLogoAnimationDefAfterSwitch: AnimationDefinition[] = [];

        // const commonAnimationProps = {
        //     duration: 500,
        //     curve: AnimationCurve.easeInOut
        // };

        // clubLogoAnimationDefBeforeSwitch.push({
        //     ...commonAnimationProps,
        //     target: clubLogoEle,
        //     scale: { x: 0, y: 0 },
        //     opacity: 0,
        //     rotate: 60
        // });

        // clubLogoAnimationDefAfterSwitch.push({
        //     ...commonAnimationProps,
        //     target: clubLogoEle,
        //     scale: { x: 1, y: 1 },
        //     opacity: 1,
        //     rotate: 0
        // });

        // this.clubAnimationsBeforeSwitch = new Animation(clubLogoAnimationDefBeforeSwitch);
        // this.clubAnimationsAfterSwitch = new Animation(clubLogoAnimationDefAfterSwitch);
    }
}
