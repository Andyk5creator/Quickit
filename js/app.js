(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    function rain() {
        const rainContainer = document.querySelector(".rain");
        let drops = "";
        for (let index = 0; index < 100; index++) {
            const randomAnimate = Math.floor(Math.random() * 98 + 2);
            const randomBottom = Math.floor(Math.random() * 4 + 2);
            drops += `\n\t\t<div class="drop" style="left:${index}%;bottom:${randomBottom + 100}%;animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;">\n\t\t<div class="stem" style="animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;"></div>\n\t\t<div class="splat" style="animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;"></div>\n\t\t</div>\n\t\t\n\t\t`;
            rainContainer.innerHTML = drops;
        }
    }
    window.addEventListener("load", windowLoad);
    function windowLoad() {
        rain();
    }
    isWebp();
})();