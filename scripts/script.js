// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let index=1;


// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}



addEventListener('DOMContentLoaded', () => {

  setState("MainPage",false);
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry,i) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', () => {
          setState(`Entry${i}`,false);
        });
      });

    });

});





var settingObject = document.querySelector('img[alt="settings"]');
settingObject.addEventListener('click', () => {
  setState("Settings",false);
});

var headingObject = document.querySelector("h1");
headingObject.addEventListener('click', () => {
  console.log("back")
  setState("MainPage",false);
});


//Problem
window.addEventListener('popstate', function(event) {
  let info = event.state["page"];
  setState(info,true);


}, true);
