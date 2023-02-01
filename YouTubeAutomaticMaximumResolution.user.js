// ==UserScript==
// @name        YouTube Automatic Maximum Resolution
// @description Sets YouTube video quality/resolution to the maximum available when playing.
// @namespace   https://ajsmith.org
// @match       https://www.youtube.com/watch*
// @grant       none
// @version     1.0
// @author      Andy Smith
// ==/UserScript==

(function () {
	"use strict";

	function start() {
		document
			.querySelector(".ytp-right-controls > button.ytp-settings-button")
			.click();
		[].slice
			.call(document.querySelector(".ytp-panel-menu").children)
			.forEach((menuItem) => {
				if (
					menuItem.getElementsByClassName("ytp-menuitem-label")[0]
						.innerText == "Quality"
				) {
					menuItem.click();
				}
			});
		document
			.querySelector(".ytp-quality-menu .ytp-panel-menu .ytp-menuitem")
			.click();
	}

	if (
		document.readyState == "complete" ||
		document.readyState == "loaded" ||
		document.readyState == "interactive"
	) {
		start();
	} else {
		document.addEventListener("DOMContentLoaded", start);
	}
})();
