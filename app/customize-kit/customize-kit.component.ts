import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Image } from 'tns-core-modules/ui/image';
import { fromFile } from 'tns-core-modules/image-source';
import { trigger, style, transition, animate, group, query, state, stagger } from "@angular/animations";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";
import { AnimationDefinition, Animation } from 'ui/animation';
import { screen } from "platform";
import { AnimationCurve } from "tns-core-modules/ui/enums";

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
    jerseyName = "";
    currentIndex = 0;
    kitImages = [
        { src: '~/images/cfc-264394/back.jpg' },
        { src: '~/images/cfc-264394/side.jpg' },
        { src: '~/images/cfc-264394/angle.jpg' },
        { src: '~/images/cfc-264394/front.jpg' },
    ];

    @ViewChild('kitContainer', { static: false }) kitContainerElement: ElementRef;

    constructor() {
        this.screenWidth = screen.mainScreen.widthDIPs;
        this.preloadImages();
    }

    ngOnInit(): void {
    }

    preloadImages() {
        this.kitImages.forEach(kitImage => {
            (new Image()).imageSource = fromFile(kitImage.src);
        });
    }

    setCurrentSlideIndex(index) {
        this.currentIndex = index;
    }

    isCurrentSlideIndex(index) {
        // console.log(`${index}: ${this.currentIndex === index}`);
        return this.currentIndex === index;
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex < this.kitImages.length - 1) ? ++this.currentIndex : 0;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex > 0) ? --this.currentIndex : this.kitImages.length - 1;
    }

    onSwipe(args: SwipeGestureEventData) {
        if (args.direction === SwipeDirection.left) {
            this.nextSlide();
        }
        else if (args.direction === SwipeDirection.right) {
            this.prevSlide();
        }
    }

    isOpen = true;

    toggle() {
        this.isOpen = !this.isOpen;
    }

    isThingOpen() {
        return this.isOpen ? 'open' : 'closed';
    }

    async doAnimate() {
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
