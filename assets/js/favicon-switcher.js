document.addEventListener("DOMContentLoaded", function() {
    const faviconDark = document.querySelector('link[media="(prefers-color-scheme:dark)"]');
    const faviconLight = document.querySelector('link[media="(prefers-color-scheme:light)"]');
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        if(faviconDark) faviconDark.setAttribute('rel', 'icon');
    } else {
        if(faviconLight) faviconLight.setAttribute('rel', 'icon');
    }
});
