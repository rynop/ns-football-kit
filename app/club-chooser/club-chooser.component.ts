import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Observable, Subscription } from "rxjs";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { screen } from "platform";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { AnimationCurve } from "tns-core-modules/ui/enums";

import { KitsService, Club } from "~/shared/services/kits.service";

const CAROUSEL_SLIDE_DURATION = 250;

@Component({
    selector: "ClubChooser",
    moduleId: module.id,
    templateUrl: "./club-chooser.component.html",
    styleUrls: ["./club-chooser.component.css"],
    animations: [
    ],
})
export class ClubChooserComponent implements OnInit, AfterViewInit, OnDestroy {
    private subscriptions: Subscription;
    clubs: Club[];
    currentClub: Club;
    currentClubIdx: number;
    availKitsForClub: string[];

    @ViewChild('clubLogo', { static: false }) clubLogoEle: ElementRef;
    @ViewChild('clubCarouselContent', { static: false }) clubCarouselEle: ElementRef;

    private screenWidth;
    clubAnimationsBeforeSwitch: Animation;
    clubAnimationsAfterSwitch: Animation;
    carouselAnimations: Animation;

    constructor(
        private _page: Page,
        private kitsSvc: KitsService,
    ) {
        this.screenWidth = screen.mainScreen.widthDIPs;
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.clubs = this.kitsSvc.getClubs();
        this.subscriptions = this.kitsSvc.currentClub$.subscribe(club => {
            this.currentClubIdx = this.kitsSvc.getCurrentClubIdx();
            // kitsSvc.currentClub$ is a BehaivorSubject so it will have a value right away
            // ViewChild's can't be resolved until ngAfterViewInit so we need to prevent animations
            this.onClubChanged(club)
        });
    }

    ngAfterViewInit() {
        this.setupAnimations();
        // this.slideElement.nativeElement.getChildAt(0).opacity = 0;
        console.log('0 opactiy', this.clubCarouselEle.nativeElement.getChildAt(0).opacity);
        console.log('1 opactiy', this.clubCarouselEle.nativeElement.getChildAt(1).opacity);
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    // Page animations (Non carousel animations)
    setupAnimations() {
        const clubLogoEle = this.clubLogoEle.nativeElement;
        const clubLogoAnimationDefBeforeSwitch: AnimationDefinition[] = [];
        const clubLogoAnimationDefAfterSwitch: AnimationDefinition[] = [];

        const commonAnimationProps = {
            duration: 250,
            curve: AnimationCurve.easeInOut
        };

        clubLogoAnimationDefBeforeSwitch.push({
            ...commonAnimationProps,
            target: clubLogoEle,
            scale: { x: 0, y: 0 },
            opacity: 0,
            rotate: 60
        });

        clubLogoAnimationDefAfterSwitch.push({
            ...commonAnimationProps,
            target: clubLogoEle,
            scale: { x: 1, y: 1 },
            opacity: 1,
            rotate: 0
        });

        this.clubAnimationsBeforeSwitch = new Animation(clubLogoAnimationDefBeforeSwitch);
        this.clubAnimationsAfterSwitch = new Animation(clubLogoAnimationDefAfterSwitch);
    }

    async onClubChanged(club: Club) {
        this.availKitsForClub = ['Home', 'Away'];
        if (club.third) {
            this.availKitsForClub.push('Third');
        }
        // onClubChanged will be called during init because the club observable is a BehaivorSubject
        // ViewChild's can't be resolved until ngAfterViewInit so we need to prevent animations
        // when the view isn't ready.
        if (!this.clubLogoEle) {
            this.currentClub = club;
        } else if (!this.clubAnimationsBeforeSwitch.isPlaying) {
            try {
                await this.clubAnimationsBeforeSwitch.play();
                this.currentClub = club;
                await this.clubAnimationsAfterSwitch.play();
            } catch (error) {
                if (-1 === error.message.indexOf('Animation cancelled')) {
                    console.error(`Provlem doing onClubChanged animations`, error);
                }
            }
        }
    }

    //
    // Club Carousel
    //
    onClubCarouselSwipe(args: SwipeGestureEventData) {
        this.moveClubCarousel(args.direction);
    }

    moveClubCarousel(direction: SwipeDirection) {
        const prevClubIdx = this.currentClubIdx;
        if (SwipeDirection.left === direction) {
            this.currentClubIdx = (this.currentClubIdx - 1 + this.clubs.length) % this.clubs.length;
        } else if (SwipeDirection.right === direction) {
            this.currentClubIdx = (this.currentClubIdx + 1) % this.clubs.length;
        } else {
            return;
        }

        this.kitsSvc.setCurrentClub(this.currentClubIdx);

        const curClubEle = this.clubCarouselEle.nativeElement.getChildAt(prevClubIdx);
        const nextClubEle = this.clubCarouselEle.nativeElement.getChildAt(this.currentClubIdx);

        this.animateCarousel(curClubEle, nextClubEle, direction);
    }

    async animateCarousel(currSlide, nextSlide, direction) {
        // TODO: check this.carouselAnimations.isPlaying

        // Move the slide that will come into view, out of view first
        nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
        nextSlide.opacity = 1;
        const definitions: AnimationDefinition[] = [];

        // Current card that will move out of view
        definitions.push({
            target: currSlide,
            translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
            duration: CAROUSEL_SLIDE_DURATION
        });

        // Next card that will move into view
        definitions.push({
            target: nextSlide,
            translate: { x: 0, y: 0 },
            duration: CAROUSEL_SLIDE_DURATION
        });

        this.carouselAnimations = new Animation(definitions);

        try {
            await this.carouselAnimations.play();
        } catch (error) {
            if (-1 === error.message.indexOf('Animation cancelled')) {
                console.error(`Provlem animating carousel`, error);
            }
        }
    }
}
