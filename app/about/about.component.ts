import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "about",
    moduleId: module.id,
    template: `<ActionBar title="About"></ActionBar><WebView [src]="html"></WebView>`,
})
export class AboutComponent {
    html: string;

    // Use https://markdowntohtml.com/ to convert README-NS-UpLabs-Challenge.md to html
    constructor(private routerExtensions: RouterExtensions) {
        this.html = `
        <style>
        .container {
            margin: 20px;
            font-family: "Arial";
            font-size: 14px;
        }
        </style>
        <div class="container">

<h1 id="custom-kits">Custom Kits</h1>
<p>A <a href="https://www.nativescript.org/blog/the-nativescript-challenge-on-uplabs-is-back">NativeScript/UpLabs challenge</a> submission. </p>
<p><strong>Designed by</strong>: <a href="https://dribbble.com/karodesigns">Oghenekaro</a> (joshuaokwe@gmail.com) </p>
<p><strong>Developed by</strong>: <a href="https://www.rynop.com">Ryan Pendergast</a> (ryan.pendergast@gmail.com | <a href="https://www.linkedin.com/in/rynop/">in/rynop</a> | <a href="https://github.com/rynop">GitHub</a>)</p>
<p>A football kit customization app, built with NS Angular flavor, showcasing Android and iOS feature parity via three pages:</p>
<ol>
<li>Home:<ul>
<li>Inline video</li>
<li>Animations inside nested scroll (vertical for main page, and horizontal for cards/items)</li>
<li>Flexbox Layout that nicely spaces content on a single screen (for majority of viewports)</li>
<li>Tap-able items:<ul>
<li>Trending: Real Madrid, Juventus, Arsenal</li>
<li>Choose by brand: each card showcases a different NS page transition</li>
<li>Customize your own kit from blank: jump right to the kit builder</li>
</ul>
</li>
</ul>
</li>
<li>Summary:<ul>
<li>1 page summary of the kit.  Complete with real-time updates of the customizations you choose</li>
<li>Add to cart: animates cart icon in upper right</li>
<li>Favorite: animated heart</li>
<li>Image carousel with no plug-in</li>
</ul>
</li>
<li>Customize Kit:<ul>
<li>Image carousel with no plug-in.  Images update in real-time when customized.</li>
<li>Multiple animations</li>
<li>When &quot;Done&quot; is hit, kit is saved and you are returned to the Summary page.  Note previews and content on summary page reflect customizations.</li>
</ul>
</li>
</ol>
<p>Additionally this app showcases async data binding, observables, behavior subjects, and Angular animations.</p>
<p>Known issues:</p>
<ul>
<li>Video player plugin is <a href="https://github.com/nstudio/nativescript-videoplayer/issues/153">broken</a> on Android.</li>
<li>Can&#39;t force portrait in NS Playground</li>
<li>NS playground can&#39;t take advantage of <a href="https://www.nativescript.org/blog/markingmode-none-is-official-boost-android-performance-while-avoiding-memory-issues">Android performance boost</a></li>
</ul>        
        
        </div>`;
    }

    goBack() {
        this.routerExtensions.back();
    }
}