!function(){var e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),n=document.querySelector("body"),d=null;t.disabled=!0,e.addEventListener("click",(function(a){e.disabled=!0,t.disabled=!1,d=setInterval((function(){return n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.addEventListener("click",(function(n){t.disabled=!0,e.disabled=!1,clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.9bf22ba1.js.map