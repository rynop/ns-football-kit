import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Observable } from "rxjs";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { screen } from "platform";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { RouterExtensions } from "nativescript-angular";

import { KitsService, Club, Kit } from "../shared/services/kits.service";

const CAROUSEL_SLIDE_DURATION = 250;

@Component({
    selector: "KitSummary",
    moduleId: module.id,
    templateUrl: "./kit-summary.component.html",
    styleUrls: ["./kit-summary.component.css"],
    animations: [
    ],
})
export class KitSummaryComponent implements OnInit, AfterViewInit, OnDestroy {
    private screenWidth;
    currentClub$: Observable<Club>;
    currentKit$: Observable<Kit>;
    currentName$: Observable<string>;
    currentNumber$: Observable<string>;
    currentSize$: Observable<string>;
    numImagesPerKit = 3;    //front,back,front over back
    currentCarouselIdx: number = 0;
    carouselAnimations: Animation;

    @ViewChild('clubCarouselContent', { static: false }) clubCarouselEle: ElementRef;

    constructor(
        private _page: Page,
        private routerExtensions: RouterExtensions,
        private kitsSvc: KitsService,
    ) {
        this.screenWidth = screen.mainScreen.widthDIPs;
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.currentClub$ = this.kitsSvc.currentClub$;
        this.currentKit$ = this.kitsSvc.currentClubKit$;
        this.currentName$ = this.kitsSvc.currentName$;
        this.currentNumber$ = this.kitsSvc.currentNumber$;
        this.currentSize$ = this.kitsSvc.currentSize$;
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        // this.subscriptions.unsubscribe();
    }

    goBack() {
        this.routerExtensions.navigate(['/home'], { clearHistory: true, animated: true, transition: { name: 'slideBottom' } });
    }

    showCustomize() {
        this.routerExtensions.navigate(['/customizekit'], { clearHistory: true });
    }

    //
    // Carousel
    //
    onCarouselSwipe(args: SwipeGestureEventData) {
        this.moveCarousel(args.direction);
    }

    moveCarousel(direction: SwipeDirection) {
        const prevClubIdx = this.currentCarouselIdx;
        if (SwipeDirection.right === direction) {
            this.currentCarouselIdx = (this.currentCarouselIdx - 1 + this.numImagesPerKit) % this.numImagesPerKit;
        } else if (SwipeDirection.left === direction) {
            this.currentCarouselIdx = (this.currentCarouselIdx + 1) % this.numImagesPerKit;
        } else {
            return;
        }

        const curClubEle = this.clubCarouselEle.nativeElement.getChildAt(prevClubIdx);
        const nextClubEle = this.clubCarouselEle.nativeElement.getChildAt(this.currentCarouselIdx);

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
