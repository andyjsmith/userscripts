// ==UserScript==
// @name        YouTube Customization
// @match       https://www.youtube.com/*
// @description Various YouTube customizations
// @namespace   https://ajsmith.org
// @grant       GM_addStyle
// @version     1.0
// @author      Andy Smith
// ==/UserScript==

(function () {
	"use strict";

	GM_addStyle(`
    /* Hide shorts */
    ytd-rich-shelf-renderer[is-shorts] {
      display: none;
    }

    /* Make premieres smaller and transparent */
    ytd-item-section-renderer:has(button[aria-label='Notify me']) {
      /* display: none; */
	  opacity: 0.7;
    }
	ytd-item-section-renderer:has(button[aria-label='Notify me']) ytd-thumbnail {
		width: 80px !important;
    	height: 44px !important;
	}
	ytd-item-section-renderer:has(button[aria-label='Notify me']) ytd-video-renderer #buttons {
		display: none !important;
	}
	ytd-item-section-renderer:has(button[aria-label='Notify me']) ytd-video-renderer yt-formatted-string[id='description-text'] {
		display: none !important;
	}

    /* Hide thanks button */
    #flexible-item-buttons > yt-button-view-model:has(button[aria-label='Thanks']) {
      display: none;
    }

    .custom-badge-vod {
      background-color: #a234e7;
    }
  `);

	let observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType == Node.ELEMENT_NODE) {
					// Subscriptions page
					if (window.location.pathname === "/feed/subscriptions") {
						// Add a badge next to each livestream VOD
						if (
							node.classList.contains("inline-metadata-item") &&
							node.innerText.startsWith("Streamed")
						) {
							let parent = node.closest(
								".text-wrapper.ytd-video-renderer"
							);
							let vodNodeParent = document.createElement("div");
							let vodNode = document.createElement("div");
							vodNodeParent.appendChild(vodNode);
							vodNodeParent.style.display = "flex";
							vodNode.innerText = "VOD";
							vodNode.className =
								"badge ytd-badge-supported-renderer custom-badge-vod";
							parent.appendChild(vodNodeParent);
						}
					}
				}
			});
		});
	}).observe(document.body, {
		childList: true,
		subtree: true,
		characterData: true,
	});

	// TODO: Add a link somewhere for downloading the thumbnail
	// https://i.ytimg.com/vi/ZEvrDaEfePw/maxresdefault.jpg
})();
