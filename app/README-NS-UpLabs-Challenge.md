# Custom Kits

A [NativeScript/UpLabs challenge](https://www.nativescript.org/blog/the-nativescript-challenge-on-uplabs-is-back) submission. 

**Designed by**: [Oghenekaro](https://dribbble.com/karodesigns) (joshuaokwe@gmail.com) 

**Developed by**: [Ryan Pendergast](https://www.rynop.com) (ryan.pendergast@gmail.com | [in/rynop](https://www.linkedin.com/in/rynop/) | [GitHub](https://github.com/rynop))

A football kit customization app, built with NS Angular flavor, showcasing Android and iOS feature parity via three pages:

1.  Home:
    - Inline video
    - Animations inside nested scroll (vertical for main page, and horizontal for cards/items)
    - Flexbox Layout that nicely spaces content on a single screen (for majority of viewports)
    - Tap-able items:
      - Trending: Real Madrid, Juventus, Arsenal
      - Choose by brand: each card showcases a different NS page transition
      - Customize your own kit from blank: jump right to the kit builder
1.  Summary:
    - 1 page summary of the kit.  Complete with real-time updates of the customizations you choose
    - Add to cart: animates cart icon in upper right
    - Favorite: animated heart
    - Image carousel with no plug-in
1.  Customize Kit:
    - Image carousel with no plug-in.  Images update in real-time when customized.
    - Multiple animations
    - When "Done" is hit, kit is saved and you are returned to the Summary page.  Note previews and content on summary page reflect customizations.

Additionally this app showcases async data binding, observables, behavior subjects, and Angular animations.

Known issues:

- Video player plugin is [broken](https://github.com/nstudio/nativescript-videoplayer/issues/153) on Android.
- Can't force portrait in NS Playground
- NS playground can't take advantage of [Android performance boost](https://www.nativescript.org/blog/markingmode-none-is-official-boost-android-performance-while-avoiding-memory-issues)