# XtPlayer
An HTML5 player supporting Danmaku (bullet comments) and subtitles (dev)

## Demo
![微信 2024-10-30 12 04 54](https://github.com/user-attachments/assets/0d7dbe16-13bb-4759-bf6d-7dd7a818477d)


## Documentation
[https://api.acgxt.com/#/document/xtplayer](https://api.acgxt.com/#/document/xtplayer)

## Usage

```javascript
// Enable debug mode
window.XtPlayerDebug = true;

var xtPlayer = new XtPlayer("#app", {
    // Video source URL
    src: "8.mp4",
    // Loader type for video (hls, flv) requires preloaded scripts (hls.js, flv.js)
    loader: "mp4",
    quality: [ // Video quality options supported from v1.2.0
        {
            name: "High Definition",
            src: "8.mp4",
            loader: "mp4"
        },
        {
            name: "Clear",
            src: "8.mp4",
            loader: "mp4"
        },
        {
            name: "Smooth",
            src: "8.mp4",
            loader: "mp4"
        }
    ],
    width: 800, // Player width
    height: 'auto', // Auto height
    // Preview image for initialization
    poster: "https://static.acgxt.com/logo6.png",
    // Auto-play setting [user memory storage]
    autoplay: false,
    // Preload setting [user memory storage]
    preload: true,
    // Loop playback setting [user memory storage]
    loop: false,
    // Default volume level (0-1)
    volume: 1,
    // Danmaku (bullet comments) configuration
    danmaku: {
        // Default display setting for Danmaku [user memory storage]
        enable: true,
        // Danmaku retrieval API format: [{text:'xxx',color:'xxxx',time:1}]
        api: "https://xtplayer.acgxt.com/getDanmu.php",
        // Danmaku sending API
        send: "https://xtplayer.acgxt.com/sendDanmu.php",
        // Single line Danmaku density spacing (default 5)
        dense: 5,
        // Maximum number of Danmaku on screen (default 500)
        screenMax: 500,
        // Danmaku opacity (default 1)
        opacity: 1,
        // Danmaku font size (default 18) [not recommended to modify]
        fontSize: 18,
        // Danmaku movement speed (default 1)
        move: 1 
    },
    // Subtitle configuration
    subtitle: {
        // Default display setting for subtitles [user memory storage]
        enable: true,
        // Subtitle API format: [{text: "Subtitle content", start:"start seconds", end:"end seconds"}]
        api: "https://xtplayer.acgxt.com/subtitle.php"
    },
    button: { // Bottom control button display settings v1.2.1
        volume: false, // Volume control
        setting: false, // Settings
        windowFullScreen: false, // Windowed full screen
        fullScreen: false // Full screen
    }
});
```

## XtPlayer Changelog
### v1.3.0
* [x] Added rewind feature for Danmaku timing
* [x] Introduced colored Danmaku
* [ ] Rewritten in Rust

### v1.2.1
* Fixed the issue with Danmaku resizing in full-screen mode
* Added picture-in-picture mode via right-click
* Added manual time jump setting
* Added toggle display for settings button

### v1.2.0
* Introduced full-screen capability for web pages
* Added speed adjustment via right-click
* Added video quality selection
* Fixed known display bugs

### v1.1.1
* Fixed the discrepancy issue with the progress bar slider display

### v1.1.0
* Fixed various known bugs
* Added support for loading videos with flv.js

### v1.0.0
* Initial release of XtPlayer, supporting subtitles and Danmaku.
