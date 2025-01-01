myFT.on("instantads", function (e) {
    init();
    createAd();

    myFT.applyClickTag(main, 1, variables.clicktag_1);

    const feedParams = new FTFeedParams();
    feedParams.segmentId = "";
    feedParams.feedEndpoint = variables.feed_endpoint;
    feedParams.defaultFeedEndpoint = variables.default_feed_endpoint;
    var ftFeed = new FTFeed(myFT, feedParams);
    ftFeed.getFeed(feedLoaded, feedLoadError);

    document.fonts.ready.then(() => {
        fontsLoaded = true;
        if(allImagesLoaded) {
            setTimeout(startAnimation, 250);
        }
    })
});

function feedLoaded(feedArray) {

}

function feedLoadError() {

}


function createAd() {
     

}



function setText(element, text, styles) {
    // element.classList.add(checkPlatform(0), checkPlatform(1))

    const styleList = styles.split('|');
    !!text.trim() ? element.innerHTML = text : null;

    element.style.fontSize = styleList[0] + 'px';
    element.style.color = styleList[1];

    setXY(element, styleList[2]);

    setAdditionalCss(element, styleList , 2)
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


