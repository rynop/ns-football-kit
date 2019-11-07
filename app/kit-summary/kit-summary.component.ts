import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import { Observable } from "rxjs";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { screen } from "platform";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { RouterExtensions } from "nativescript-angular";

import { KitsService, Club, Kit } from "../shared/services/kits.service";
import { trigger, style, transition, animate, keyframes } from "@angular/animations";

const CAROUSEL_SLIDE_DURATION = 250;

@Component({
    selector: "KitSummary",
    moduleId: module.id,
    templateUrl: "./kit-summary.component.html",
    styleUrls: ["./kit-summary.component.css"],
    animations: [
        trigger('fav', [
            transition('off => on', [
                style({ transform: 'scale(1)' }),
                animate('1s', keyframes([
                    style({ transform: 'scale(1.3)', offset: .25 }),
                    style({ transform: 'scale(1)', offset: .5 }),
                    style({ transform: 'scale(1.3)', offset: .75 }),
                    style({ transform: 'scale(1)', offset: 1.0 })
                ])),
            ]),
            transition('on => off', [
                style({ transform: 'scale(1)' }),
                animate('300ms ease-in-out', keyframes([
                    style({ transform: 'scale(1.3)', offset: .5 }),
                    style({ transform: 'scale(1)', offset: 1.0 })
                ])),
            ]),
        ]),
        trigger('addToCart', [
            transition(':increment', [
                style({ transform: 'scale(1)' }),
                animate('400ms ease-in-out', keyframes([
                    style({ transform: 'scale(2.5)', offset: .5 }),
                    style({ transform: 'scale(1)', offset: 1.0 })
                ])),
            ]),
        ]),
    ]
})
export class KitSummaryComponent implements OnInit {
    private screenWidth;
    currentClub$: Observable<Club>;
    currentKit$: Observable<Kit>;
    currentName$: Observable<string>;
    currentNumber$: Observable<string>;
    currentSize$: Observable<string>;
    numInCart$: Observable<number>;

    numImagesPerKit = 3;    //front,back,front over back
    currentCarouselIdx: number = 0;
    carouselAnimations: Animation;
    isFav = false;

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
        this.numInCart$ = this.kitsSvc.numInCart$;
    }

    goBack() {
        this.routerExtensions.navigate(['/home'], { clearHistory: true, animated: true, transition: { name: 'slideBottom' } });
    }

    showCustomize() {
        this.routerExtensions.navigate(['/customizekit'], { clearHistory: true });
    }

    onFavTap() {
        this.isFav = !this.isFav;
    }

    addToCart() {
        this.kitsSvc.addToCart();
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
