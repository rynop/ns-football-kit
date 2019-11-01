import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { trigger, style, transition, animate, group, query, state, stagger } from "@angular/animations";
import { Page } from "tns-core-modules/ui/page";
import { TextField } from "tns-core-modules/ui/text-field";
import { alert } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular";
import { Subscription } from "rxjs";

import { KitsService, Kit, Club } from "../shared/services/kits.service";

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
        trigger('openClose', [
            // ...
            state('open', style({
                // height: '200px',
                transform: "scale(1.1)",
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                // height: '100px',
                opacity: 0.5,
                backgroundColor: 'green',
                transform: "scale(1)"
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),

        trigger("flyInOut", [
            state("in", style({ transform: "translateX(0)" })),
            transition("void => *", [
                style({ transform: "translateX(-100px)" }),
                animate(300)
            ]),
            transition("* => void", [
                animate(100, style({ transform: "translateX(100px)" }))
            ])
        ]),

        trigger("flyKitInOut", [
            // state("in", style('*')),
            transition("void => *", [
                style({ opacity: 0, transform: "translateX(-200px)" }),
                animate('2s ease-in', style({ opacity: 1 })),
            ]),
            transition("* => void", [
                animate(100, style({ transform: "translateX(100px)" }))
            ])
        ]),


        // trigger('slideAnimation', [
        //     transition(':increment', group([
        //         query("void => *", [
        //             style({ opacity: 0, width: '0px' }),
        //             stagger(50, [
        //                 animate('300ms ease-out', style({ opacity: 1, width: '*' })),
        //             ]),
        //         ], { optional: true }),
        //         query('* => void', [
        //             animate('0.5s ease-out', style({
        //                 opacity: 0
        //             }))
        //         ])
        //     ])),
        //     transition(':decrement', group([
        //         query("void => *", [
        //             // style({ opacity: 0,  transform: "scale(1)" }),
        //             // stagger(50, [
        //             //     animate('300ms ease-out', style({ opacity: 1, width: '*' })),
        //             // ]),
        //             style({ transform: 'translateX(-100px)' }),
        //             animate(100)
        //         ], { optional: true }),
        //         query('* => void', [
        //             animate(100, style({ transform: 'translateX(100px)' }))
        //             // animate('0.5s ease-out', style({
        //             //     opacity: 0
        //             // }))
        //         ])
        //     ]))
        // ]),

        trigger('slideAnimation', [
            transition(':increment', group([
                query('void => *', [
                    style({
                        // transform: 'translateX(800px)'
                        opacity: 0
                    }),
                    stagger(50, [
                        animate('0.5s ease-out', style({ opacity: 1 }))
                    ])
                ], { optional: true }),
                query('* => void', [
                    animate('0.5s ease-out', style({
                        transform: 'translateX(-800px)',
                        opacity: 0
                    }))
                ])
            ])),
            transition(':decrement', group([
                query('void => *', [
                    style({
                        // transform: 'translateX(-800px)'
                        opacity: 0
                    }),
                    stagger(50, [
                        animate('0.5s ease-out', style({ opacity: 1 }))
                    ])
                ], { optional: true }),
                query('* => void', [
                    animate('0.5s ease-out', style({
                        transform: 'translateX(800px)',
                        opacity: 0
                    }))
                ])
            ]))
        ])
    ],
})
export class CustomizeKitComponent implements OnInit, OnDestroy {

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
    armBadgeOn: boolean;
    armBadgeSrc: string;
    chestBadgeOn: boolean;
    chestBadgeSrc: string

    sizes: string[];
    kitFrontShowing = true;

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
        {
            label: 'Badges',
            icon: String.fromCharCode(0xf3ed),
        },
    ];

    @ViewChild('kitContainer', { static: false }) kitContainerElement: ElementRef;

    constructor(
        private _page: Page,
        private routerExtensions: RouterExtensions,
        private kitsSvc: KitsService,
    ) {
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
        this.subscriptions.add(ks.armBadgeOn$.subscribe(v => this.armBadgeOn = v));
        this.subscriptions.add(ks.chestBadgeOn$.subscribe(v => this.chestBadgeOn = v));

        this.sizes = ks.sizes;
        this.chestBadgeSrc = ks.chestBadgeSrc;
        this.armBadgeSrc = ks.armBadgeSrc;
        this.numberValid = true;
        this.nameValid = true;
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

        if (this.isNameBtnActive) {
            this.kitFrontShowing = false;
        }
    }

    toggleFrontBackKit() {
        this.kitFrontShowing = !this.kitFrontShowing;
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

        // const ele = this.kitContainerElement.nativeElement;

        // //reset
        // ele.translateX = 0;
        // ele.opacity = 1;

        // try {
        //     // WTF does await work in local `tns preview` but not from the preview web app!?!?!
        //     await ele.animate({
        //         opacity: 0,
        //         translate: { x: -this.screenWidth, y: 0 },
        //         duration: 200,
        //     })
        //         .then(() => {
        //             //Replace the new kit
        //             this.kitsSvc.setCurrentClubKit(kitType);
        //         })
        //         .then(() => ele.animate({
        //             delay: 200,
        //             opacity: 1,
        //             translate: { x: 0, y: 0 },
        //             duration: 500,
        //             curve: AnimationCurve.easeOut,
        //         }));
        // } catch (error) {
        //     if (-1 === error.message.indexOf('Animation cancelled')) {
        //         console.error(`Problem animating kit`, error);
        //     }
        //     this.kitsSvc.setCurrentClubKit(kitType);
        // }

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
        this.chestBadgeOn = !this.chestBadgeOn;
    }
    toggleArmBadge() {
        this.armBadgeOn = !this.armBadgeOn;
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

        this.kitsSvc.setCurrentClubKit(this.currentKit);
        this.kitsSvc.setCurrentSize(this.currentSize);
        this.kitsSvc.setCurrentNumber(this.currentNumber);
        this.kitsSvc.setCurrentName(this.currentName);
        this.kitsSvc.setArmBadgeOn(this.armBadgeOn);
        this.kitsSvc.setChestBadgeOn(this.chestBadgeOn);
        this.goBack();
    }
}
