import { Component, OnInit, ViewChild, ElementRef, OnDestroy, NgZone } from "@angular/core";
import { trigger, style, transition, animate, state, AnimationEvent } from "@angular/animations";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { alert } from "tns-core-modules/ui/dialogs";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures/gestures";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { RouterExtensions } from "nativescript-angular";
import { screen } from "platform";
import { Subscription } from "rxjs";

import { KitsService, Kit, Club } from "../shared/services/kits.service";

const CAROUSEL_SLIDE_DURATION = 250;

interface CustomizationButton {
    label: string;
    icon: string;
}

@Component({
    selector: "CustomizeKit",
    moduleId: module.id,
    templateUrl: "./customize-kit.component.html",
    styleUrls: ["./customize-kit.component.css"],
    animations: [
        trigger('slideUpDown', [
            state('open', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            state('closed', style({
                opacity: 0,
                transform: 'translateY(100)'
            })),
            transition('open => closed', [
                animate('500ms ease-out')
            ]),
            transition('closed => open', [
                animate('500ms ease-in')
            ]),
        ]),
        trigger('fadeToggle', [
            state('open', style({
                opacity: 1,
            })),
            state('closed', style({
                opacity: 0,
            })),
            transition('open => closed', [
                animate('500ms ease-out')
            ]),
            transition('closed => open', [
                animate('500ms ease-in')
            ]),
            transition('void => *', [
                style({ opacity: 0 }),
                animate('500ms ease-in')
            ]),
        ]),
    ],
})
export class CustomizeKitComponent implements OnInit, OnDestroy {
    private screenWidth;

    private subscriptions: Subscription;
    currentClub: Club;
    currentClubKitIdx: number;
    currentKit: Kit;
    currentKitImgSrcIdx = 0;

    currentSize: string;
    currentNumber: string;
    numberValid = true;
    currentName: string;
    nameValid = true;
    chestBadgeOn: boolean;
    chestBadgeSrc: string

    sizes: string[];
    kitFrontShowing = true;

    growCarousel = false;

    activeCustomizationButton: CustomizationButton;
    customizationButtons: CustomizationButton[] = [
        {
            label: 'Size',
            icon: String.fromCharCode(0xf337),
        },
        {
            label: 'Color',
            icon: String.fromCharCode(0xf53f),
        },
        {
            label: 'Name & Number',
            icon: String.fromCharCode(0xf031),
        },
        // Didn't have time to impl. Too many kit image variations
        {
            label: 'Badges',
            icon: String.fromCharCode(0xf3ed),
        },
    ];

    currentCarouselIdx: number = 0;
    carouselAnimations: Animation;
    numKitSlides = 2;

    @ViewChild('kitContainer', { static: false }) kitContainerElement: ElementRef;

    constructor(
        private _page: Page,
        private ngZone: NgZone,
        private routerExtensions: RouterExtensions,
        private kitsSvc: KitsService,
    ) {
        this.screenWidth = screen.mainScreen.widthDIPs;
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;

        const ks = this.kitsSvc;
        // We dont set this.current* to the observable becuase we don't want to 
        // set the new observable value until "Save and continue" is pressed
        this.subscriptions = ks.currentClub$.subscribe(v => this.currentClub = v);
        this.subscriptions.add(ks.currentClubKit$.subscribe(v => this.currentKit = v));
        this.subscriptions.add(ks.currentSize$.subscribe(v => this.currentSize = v));
        this.subscriptions.add(ks.currentNumber$.subscribe(v => this.currentNumber = v));
        this.subscriptions.add(ks.currentName$.subscribe(v => this.currentName = v));
        this.subscriptions.add(ks.chestBadgeOn$.subscribe(v => this.chestBadgeOn = v));

        this.sizes = ks.sizes;
        this.chestBadgeSrc = ks.chestBadgeSrc;
        this.numberValid = true;
        this.nameValid = true;

        if (this.currentClub.name === "Real Madrid") {    //RM are current champs. shield baked into img
            this.chestBadgeOn = false;
        }
        // this.preloadImages();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    goBack() {
        this.routerExtensions.navigate(['/kitsummary'], { clearHistory: true });
    }

    showCustomizationOptions() {
        this.activeCustomizationButton = undefined;
        this.kitFrontShowing = true;
    }
    showCustomization(b: CustomizationButton) {
        this.activeCustomizationButton = b;
        this.kitFrontShowing = !(this.isNameBtnActive);
    }

    onNavSlideStart(e: AnimationEvent) {
        if ('closed' === e.fromState && 'open' === e.toState) {
            this.growCarousel = false;
        } else if ('open' === e.fromState && 'closed' === e.toState) {
            // Hack cuz NS don't support all CSS styles in animations
            // Keep in sync with slideUpDown
            setTimeout(() => {
                this.growCarousel = true;
            }, 200);

        }
    }

    get nameFontClass() {
        return this.currentKit.font.nameFontClass;
    }
    get numberFontClass() {
        return this.currentKit.font.numberFontClass;
    }
    get isSizeBtnActive(): boolean {
        return this.activeCustomizationButton === this.customizationButtons[0];
    }
    get isColorBtnActive(): boolean {
        return this.activeCustomizationButton === this.customizationButtons[1];
    }
    get isNameBtnActive(): boolean {
        return this.activeCustomizationButton === this.customizationButtons[2];
    }
    get isBadgesBtnActive(): boolean {
        return this.activeCustomizationButton === this.customizationButtons[3];
    }

    // preloadImages() {
    //     this.kits.forEach(kit => {
    //         kit.imgSrcs.forEach(src => (new Image()).imageSource = fromFile(src));
    //     });
    // }

    setKit(kit: Kit) {
        this.currentKit = kit;
    }

    setSize(v: string) {
        this.currentSize = v;
    }
    setNumber(v: string) {
        if (this.isNumberValid(v)) {
            this.currentNumber = v;
        }
    }
    onNumberChange(event: any) {
        const tf = <TextField>event.object;
        this.setNumber(tf.text);
    }
    isNumberValid(v: string): boolean {
        if (!!v) {
            const num = +v;
            this.numberValid = !(!Number.isInteger(num) || v.length > 2);
        } else {    //empty is OK
            this.numberValid = true;
        }
        return this.numberValid;
    }

    setName(v: string) {
        if (this.isNameValid(v)) {
            this.currentName = v;
        }
    }
    onNameChange(event: any) {
        const tf = <TextField>event.object;
        this.setName(tf.text);
    }
    isNameValid(v: string): boolean {
        if (!!v) {
            this.nameValid = (this.currentName.length < 11);
        } else {    //empty is OK
            this.nameValid = true;
        }
        return this.nameValid;
    }

    toggleChestBadge() {
        if (this.currentClub.name !== "Real Madrid") {    //RM are current champs. shield baked into img
            this.chestBadgeOn = !this.chestBadgeOn;
        }
    }

    save() {
        if (!this.nameValid || !this.numberValid) {
            alert({
                title: 'Oops!',
                message: 'Please fix input error(s)',
                okButtonText: 'OK'
            });
            return;
        }

        this.ngZone.run(() => {
            this.kitsSvc.setCurrentClubKit(this.currentKit);
            this.kitsSvc.setCurrentSize(this.currentSize);
            this.kitsSvc.setCurrentNumber(this.currentNumber);
            this.kitsSvc.setCurrentName(this.currentName);
            this.kitsSvc.setChestBadgeOn(this.chestBadgeOn);
            this.goBack();
        });
    }

    //
    // Carousel
    //
    onCarouselSwipe(args: SwipeGestureEventData) {
        this.moveCarousel(args.direction);
    }

    moveCarousel(direction: SwipeDirection) {
        const prevIdx = this.currentCarouselIdx;
        if (SwipeDirection.right === direction) {
            this.currentCarouselIdx = (this.currentCarouselIdx - 1 + this.numKitSlides) % this.numKitSlides;
        } else if (SwipeDirection.left === direction) {
            this.currentCarouselIdx = (this.currentCarouselIdx + 1) % this.numKitSlides;
        } else {
            return;
        }

        const curEle = this.kitContainerElement.nativeElement.getChildAt(prevIdx);
        const nextEle = this.kitContainerElement.nativeElement.getChildAt(this.currentCarouselIdx);
        this.animateCarousel(curEle, nextEle, direction);
    }

    async animateCarousel(currSlide, nextSlide, direction) {
        // TODO: check this.carouselAnimations.isPlaying

        // Move the slide that will come into view, out of view first
        nextSlide.translateX = (direction == 2 ? this.screenWidth : -this.screenWidth);
        nextSlide.opacity = 0;
        const definitions: AnimationDefinition[] = [];

        // Current card that will move out of view
        definitions.push({
            target: currSlide,
            translate: { x: (direction == 2 ? -this.screenWidth : this.screenWidth), y: 0 },
            duration: CAROUSEL_SLIDE_DURATION,
            opacity: 0,
        });

        // Next card that will move into view
        definitions.push({
            target: nextSlide,
            translate: { x: 0, y: 0 },
            duration: CAROUSEL_SLIDE_DURATION,
            opacity: 1,
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
