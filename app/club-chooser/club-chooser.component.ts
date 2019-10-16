import { Component, OnInit } from "@angular/core";
import { screen } from "platform";
import { Page } from "tns-core-modules/ui/page";

import { KitsService, Kit, Club, KitType } from "~/shared/services/kits.service";

@Component({
    selector: "ClubChooser",
    moduleId: module.id,
    templateUrl: "./club-chooser.component.html",
    styleUrls: ["./club-chooser.component.css"],
    animations: [
    ],
})
export class ClubChooserComponent implements OnInit {
    private screenWidth;

    constructor(
        private _page: Page,
        private kitsSvc: KitsService,
    ) {
    }

    ngOnInit(): void {
        this._page.actionBarHidden = true;
        this.screenWidth = screen.mainScreen.widthDIPs;
    }
}
