//This is the "Offline page" service worker
//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
if (navigator.serviceWorker.controller) {
} else {
  //Register the ServiceWorker
  navigator.serviceWorker.register('/pwabuilder-sw.js', {
    
  }).then(function(reg) {
  });
}

