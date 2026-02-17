// ==UserScript==
// @name        Peacock Customization
// @match       https://www.peacocktv.com/watch/*
// @description Various Peacock customizations
// @namespace   https://ajsmith.org
// @grant       GM_addStyle
// @version     1.0
// @author      Andy Smith
// ==/UserScript==

(function () {
	"use strict";

	GM_addStyle(`
    .playback-overlay__container.clip, .playback-overlay__container.live, .playback-overlay__container.preview, .playback-overlay__container.singleliveevent, .playback-overlay__container.vod, [data-testid="overlay"] {
      background: unset !important;
      padding-bottom: 0.5rem !important;
    }
    .playback-metadata__container.channel-guide .playback-metadata__container-title, .playback-metadata__container.clip .playback-metadata__container-title, .playback-metadata__container.live .playback-metadata__container-title, .playback-metadata__container.preview .playback-metadata__container-title, .playback-metadata__container.singleliveevent .playback-metadata__container-title, .playback-metadata__container.vod .playback-metadata__container-title, h1.contentPrimary {
      margin-bottom: 0.5rem !important;
    }
    .playback-metadata__container.channel-guide .playback-metadata__container-description, .playback-metadata__container.clip .playback-metadata__container-description, .playback-metadata__container.live .playback-metadata__container-description, .playback-metadata__container.preview .playback-metadata__container-description, .playback-metadata__container.singleliveevent .playback-metadata__container-description, .playback-metadata__container.vod .playback-metadata__container-description, [data-testid="metadata"] {
      margin-top: 0.5rem !important;
    }
    .playback-overlay__container.hidden, .feature__dynamic-content-rating .dynamic-content-rating-visible {
        background: unset !important;
    }
    .playback-metadata__container.channel-guide, .playback-metadata__container.clip, .playback-metadata__container.live, .playback-metadata__container.preview, .playback-metadata__container.singleliveevent, .playback-metadata__container.vod {
      margin-bottom: 0 !important;
    }
    .playback-time-elapsed__container, [data-testid="playback-upper-controls"] > div:first-child {
      margin-bottom: 0.5rem !important;
    }

    .playback-header__container, [data-testid="overlay"] > div:first-child {
        background: unset !important;
    }
    .playback-header__container.hidden {
        top: -4rem !important;
    }
    .rc-slider-rail {
      background-color: #4d4d4d78 !important;
    }
    .rc-slider-buffer-track, .rc-slider-track {
      background-color: #ffffff5c !important;
    }
    [data-testid="playback-lower-controls"] {
      padding-bottom: 0.5rem !important;
    }

    [data-testid="playback-upper-controls"] > div > p {
      margin-bottom: 0 !important;
    }
  `);

	// Skip intro ad that's played on every reload
	const observer = new MutationObserver((mutations, observer) => {
		const countdown = document.querySelector("[data-testid=countdown]");
		if (!countdown) return;

		console.log("HANDLE VIDEO");
		const video = document.querySelector("video");
		if (!video) {
			return;
		}
		video.remove();
		observer.disconnect();

		// Audio source still plays, so fast forward
		video.addEventListener("play", () => {
			console.log("PLAY");
			video.playbackRate = 10;
			video.currentTime = 1000000;
		});
	});

	observer.observe(document.body, {
		childList: true,
		subtree: true,
	});
})();
