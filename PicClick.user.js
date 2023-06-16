// ==UserScript==
// @name        PicClick Improvements
// @description Minor visual improvements to PicClick search results
// @namespace   https://ajsmith.org
// @match       https://picclick.com/*
// @grant       GM_addStyle
// @version     1.0
// @author      Andy Smith
// @run-at      document-start
// ==/UserScript==

(function () {
	"use strict";
	GM_addStyle(`
		/* Increase size of price */
		li[id^="item-"] > .price > strong {
			font-size: large;
		}

		/* Hide sale before prices, since sales on the internet are fake */
		li[id^="item-"] > .price > strong > small {
			display: none;
		}
		
		/* Remove the Amazon sponsor links from results, now only Ebay results */
		.items > li.amazon {
			display: none;
		}
	`);
})();
