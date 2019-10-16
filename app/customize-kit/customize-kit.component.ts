import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { trigger, style, transition, animate, group, query, state, stagger } from "@angular/animations";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { screen } from "platform";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { Page } from "tns-core-modules/ui/page";
import { registerElement } from "nativescript-angular/element-registry";
import { Video } from 'nativescript-videoplayer';

import { KitsService, Kit, ClubKit, KitType } from "~/shared/services/kits.service";

registerElement("VideoPlayer", () => Video);

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
export class CustomizeKitComponent implements OnInit {
    private screenWidth;
    clubKits: ClubKit[];

    currentClubIdx = 0;
    currentClubKitType: KitType = KitType.Home;
    currentClubKitImgIdx = 0;

    jerseyName = "Pendergast";

    @ViewChild('kitContainer', { static: false }) kitContainerElement: ElementRef;

    constructor(
        private _page: Page,
        private kitsSvc: KitsService,
    ) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.screenWidth = screen.mainScreen.widthDIPs;
        this.clubKits = this.kitsSvc.getClubKits();
        // this.preloadImages();
    }

    // preloadImages() {
    //     this.kits.forEach(kit => {
    //         kit.imgSrcs.forEach(src => (new Image()).imageSource = fromFile(src));
    //     });
    // }

    isCurrentClubKitIdx(index) {
        // console.log(`${index}: ${this.currentIndex === index}`);
        return this.currentClubKitImgIdx === index;
    }

    get currentClub(): ClubKit {
        return this.clubKits[this.currentClubIdx];
    }

    get currentKit(): Kit {
        return this.currentClub[this.currentClubKitType];
    }

    get currentKitImgSrcs(): string[] {
        return this.currentKit.imgSrcs;
    }

    get currentKitFontColor(): string {
        return this.currentKit.font.color;
    }

    get currentKitFontCSSName(): string {
        return this.currentKit.font.className || "";
    }

    prevImg() {
        this.currentClubKitImgIdx = (this.currentClubKitImgIdx < this.currentKitImgSrcs.length - 1) ? ++this.currentClubKitImgIdx : 0;
    }

    nextImg() {
        this.currentClubKitImgIdx = (this.currentClubKitImgIdx > 0) ? --this.currentClubKitImgIdx : this.currentKitImgSrcs.length - 1;
    }

    onSwipe(args: SwipeGestureEventData) {
        if (args.direction === SwipeDirection.left) {
            this.nextImg();
        }
        else if (args.direction === SwipeDirection.right) {
            this.prevImg();
        }
    }

    isOpen = true;

    toggle() {
        this.isOpen = !this.isOpen;
    }

    isThingOpen() {
        return this.isOpen ? 'open' : 'closed';
    }

    async setKit(kitType: KitType) {
        const ele = this.kitContainerElement.nativeElement;

        //reset
        ele.translateX = 0;
        ele.opacity = 1;

        try {
            await ele.animate({
                opacity: 0,
                translate: { x: -this.screenWidth, y: 0 },
                duration: 200,
            });

            //Replace the new kit
            this.currentClubKitType = kitType;

            await ele.animate({
                delay: 200,
                opacity: 1,
                translate: { x: 0, y: 0 },
                duration: 500,
                curve: AnimationCurve.easeOut,
            });
        } catch (error) {
            console.error(`Problem animating kit`, error)
        }

    }
}
