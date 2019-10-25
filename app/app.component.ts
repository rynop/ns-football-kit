import { Component } from "@angular/core";

import { registerElement } from "nativescript-angular/element-registry";
// TODO: update in play.ns.org
import { Video } from 'nativescript-videoplayer';
registerElement("VideoPlayer", () => Video);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
