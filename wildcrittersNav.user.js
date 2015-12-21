// ==UserScript==
// @name        WildCritters View Helper
// @namespace   WildCritters-View-Helper
// @description Keybindings and view changer that make viewing images and navigating pools on WildCritters easier
// @author      thingywhat
// @include     http://wildcritters.ws/post/show/*
// @version     1
// @grant       none
// ==/UserScript==

window.onload = function(){
  // A couple of functions to fullscreen and unfullscreen (And handle the cookie)
  function fullView(){
    document.getElementById('right-col').className = 'content fullView';
    document.cookie = "fullView=true";
  }
  function normalView(){
    document.getElementById('right-col').className = 'content';
    document.cookie = "fullView=false;";
  }

  // Put the CSS in the head element
  var style = document.createElement('style');
  style.innerHTML = "#right-col.fullView { position: fixed; top: 0; left: 0; right: 0; bottom: 0; width: 100%; background-color: rgba(0,0,0,0.95); } #right-col.fullView img { display: block; margin: auto!important; width: auto; height: 100vh; cursor: pointer; }";
  document.getElementsByTagName("head")[0].appendChild(style);

  // Make the view full if the cookie is set.
  if(~document.cookie.indexOf("fullView=true")){
    fullView();
  }

  // Toggle fullView and not when clicking the image
  document.getElementById('image').onclick = function(){
    if(~document.cookie.indexOf("fullView=true")){
      normalView();
    } else {
      fullView();
    }
  };

  // Find the next and previous page buttons, if they exist
  var next = $$('.status-notice > a').filter(function(targ){
    return ~targ.textContent.indexOf(">>");
  })[0];

  var previous = $$('.status-notice > a').filter(function(targ){
    return ~targ.textContent.indexOf("<<");
  })[0];

  // When pressing left of right, navigate the pool forward or backward if applicable
  document.body.onkeydown = function(e){
    if (e.keyCode === 39 && typeof next !== 'undefined') {
      next.click();
    } else if(e.keyCode === 37 && typeof previous !== 'undefined'){
      previous.click();
    }
  };
};
