myFT.on("instantads", function (e) {
    init();
    createAd();

    myFT.applyClickTag(main, 1, variables.clicktag_1);

    document.fonts.ready.then(() => {
        fontsLoaded = true;
        if(allImagesLoaded) {
            setTimeout(startAnimation, 250);
        }
    })
});


function createAd() {
     

}



function setText(element, text, styles) {
    // element.classList.add(checkPlatform(0), checkPlatform(1))

    const styleList = styles.split('|');
    !!text.trim() ? element.innerHTML = text : null;

    element.style.fontSize = styleList[0] + 'px';
    element.style.color = styleList[1];


    setXY(element, styleList[2]);

    for (let i = 2; i < styleList.length; i++) {
        setAdditionalCss(element, styleList[i]);
    }
}

function preload() {
    const varImages = myFT.manifestProperties.instantAds
        .filter(e => e.type == 'image')
        .map(e => e.name);
    // const varImages = [];
    const imageCount = varImages.length;
	let imageLoaded = 0;

    varImages.forEach(e => {
        const currentImage = document.getElementById(e);
        currentImage.src = variables[e];
        currentImage.addEventListener('load', iLoad, false);
    });

    
    function iLoad() {
        // trace(imageLoaded)
        imageLoaded++;
        if (imageLoaded == imageCount) {
            trace('preload done');
            allImagesLoaded = true;
            if(fontsLoaded) {
                setTimeout(startAnimation, 250);
            }
        }
    }
}

function startAnimation() {
    
    const tl = gsap.timeline();
    tl.set([main], { opacity: 1, delay: .5 });


    trace(tl.duration());


}


