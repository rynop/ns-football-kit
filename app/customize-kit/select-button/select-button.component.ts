import { Component, Input } from "@angular/core";

@Component({
    selector: "select-button",
    moduleId: module.id,
    // TODO: why the f does [ngClass]="containerClass" not work on the GridLayout? (passing in m-r-7)
    template: `
    <GridLayout width="65" height="65" class="container" [class.active]="selected">
        <GridLayout *ngIf="bkg" width="45" height="45" [background]="bkg" class="bkg"></GridLayout>
        <Image width="55" height="54" src="~/images/{{selected?'customize-btn-green.png':'customize-btn-dot.png'}}" stretch="none"></Image>
        <Label *ngIf="text" [text]="text" class="text" textAlignment="center" verticalAlignment="center" [ngClass]="textClass"></Label>
        <Image *ngIf="imgSrc" height="40" [src]="imgSrc" stretch="aspectFit"></Image>
        <GridLayout *ngIf="selected" height="16" width="16" style="border-radius:8; background:#7FAA4D;" verticalAlignment="bottom" horizontalAlignment="right">
            <Label text="&#xf00c;" class="fas" style="color:white; font-size: 10;" textAlignment="center"></Label>
        </GridLayout>
    </GridLayout>`,
    styles: ['.container {color: white;}', '.text {margin-top: -3;}', '.active .text {color: #7FAA4D;}', '.bkg {border-radius: 10;}'],
})
export class SelectButtonComponent {
    @Input() bkg: string;
    @Input() selected: boolean;
    @Input() text: string;
    @Input() textClass: string;
    @Input() imgSrc: string;
    @Input() containerClass: string;

    constructor() {
    }
}