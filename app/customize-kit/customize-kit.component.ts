import { Component, OnInit } from "@angular/core";
import { Image } from 'tns-core-modules/ui/image';
import { fromFile } from 'tns-core-modules/image-source';
import { trigger, style, transition, animate, group, query, state, stagger } from "@angular/animations";
import { SwipeGestureEventData, SwipeDirection } from "tns-core-modules/ui/gestures";

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
    jerseyName = "";
    currentIndex = 0;
    kitImages = [
        { src: '~/images/cfc-264394/back.jpg' },
        { src: '~/images/cfc-264394/side.jpg' },
        { src: '~/images/cfc-264394/angle.jpg' },
        { src: '~/images/cfc-264394/front.jpg' },
    ];

    constructor() {
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
}
