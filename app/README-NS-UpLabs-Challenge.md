# NS UpLabs Challenge: Football Kit

This submission to the [NativeScript/UpLabs challenge](https://www.nativescript.org/blog/the-nativescript-challenge-on-uplabs-is-back) is designed by Karo (joshuaokwe@gmail.com|[web add here](https://tbd.com)) and coded by Ryan Pendergast (ryan.pendergast@gmail.com|[rynop.com](https://www.rynop.com)|[LinkedIn](https://www.linkedin.com/in/rynop/)|[GitHub](https://github.com/rynop)).

This is our vision of a football kit customization app.  The NS Angular flavor is used here to showcase Android and iOS feature parity in three pages:

1.  Home page:
    - Inline video
    - Animations inside nested scroll (vertial for main page, and horizontal for cards/items)
    - Flexbox Layout that nicely spaces content on a single screen (for majority of viewports)
    - Tap-able items:
      - Trendnig: Real Madrid, Juventus, Arsenal
      - Choose by brand: each card showcases a different NS page transition
      - Customize your own kit from blank: jump right to the kit builder
1.  Summary page:
    - 1 page summary of the kit.  Complete with real-time updates of the customizations you choose
    - Add to car: animates cart icon in upper right
    - Favorite: animated heart
    - Image carousel with no plug-in
1.  Customize Kit page:
    - Image carousel with no plug-in.  Images update in real-time when customized.
    - Multiple animations
    - When "Done" is hit, kit is saved and you are returned to the Summary page.  Note previews and content on summary page reflect customizations.

This NS Angular flavor app showcases async data binding, observables, behavor subjects, and Angular animations.

Known issues:

- Video player plugin is [broken](https://github.com/nstudio/nativescript-videoplayer/issues/153) on Android.
- Can't force portrait in NS Playground
- NS playground can't take advantage of [Android performance boost](https://www.nativescript.org/blog/markingmode-none-is-official-boost-android-performance-while-avoiding-memory-issues)