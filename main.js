const fs = require('fs');
const path = require('path')

const data = fs.readFileSync('data.csv', 'utf-8');
const lines = data.split('\n').map(line => line.split(','));
const rlVarName = lines[0][5];
const baseFile = lines[3][5];
const richLoadName = lines[1][5];

let output = `FT.manifest({
    "filename": "index.html",
    "width": 300, "height": 250,
    "clickTagCount": `
    + lines[2][5]
    + `, "hideBrowsers": ["ie8"],
    "richLoads": [
        {"name": "`
    + rlVarName
    + `", "src": "`
	+ richLoadName
	+`"}
	],
	"instantAds": [
        {"name": "` + rlVarName + `", "type": "richload"},
        `;

lines.forEach((line, index) => {
    if(index == 0) {
        return;
    }

    let varName = line[0].trim();

    if(!varName || varName.trim() == '') {
        return;
    }

    varName = varName.replace(' ', '_');
    let value = line[2];
    if(value) {
        value = value.replace('~', ',').trim();
    }
    const type = line[1];
    if(type == 'image' && (!value || value.trim() == '')) {
        value = 'images/blank.png';
    }

    output += `{
    \t\t"name": "` + varName + `", "type": "` + line[1] + `",
            "default": "` + value + `"
        }`;
    
    if(index < lines.length - 1) {
        output += ',';
    }
    output += '\n\t\t';
});


output += `
    ]
})`;



fs.mkdirSync(baseFile);
fs.mkdirSync(path.join(baseFile, 'richLoads'));
fs.mkdirSync(path.join(baseFile, 'richLoads', richLoadName));
fs.mkdirSync(path.join(baseFile, 'richLoads', richLoadName, 'js'));
fs.mkdirSync(path.join(baseFile, 'richLoads', richLoadName, 'images'));

fs.writeFileSync(path.join(baseFile, 'manifest.js') , output);
fs.writeFileSync(path.join(baseFile, 'index.html') ,getIndexContent(rlVarName));
fs.writeFileSync(path.join(baseFile, 'richLoads', richLoadName, 'index.html'), getRlIndex());

fs.copyFileSync('utils.js', path.join(baseFile, 'richLoads', richLoadName, 'js', 'utils.js'));
if(lines[4][5] == 'yes') {
    fs.copyFileSync('feed_script.js', path.join(baseFile, 'richLoads', richLoadName, 'js', 'script.js'));
} else {
    fs.copyFileSync('regular_script.js', path.join(baseFile, 'richLoads', richLoadName, 'js', 'script.js'));
}
fs.copyFileSync('style.css', path.join(baseFile, 'richLoads', richLoadName, 'style.css'));
fs.copyFileSync('blank.png', path.join(baseFile, 'richLoads', richLoadName, 'images', 'blank.png'));


function getIndexContent(varName) {
    return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content=" width=device-width, initial-scale=1, maximum-scale=1 user-scalable=0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <style>
            body{margin: 0px;padding: 0px;}

            #container{
                width: 300px; height: 250px; position: absolute; background-color: transparent; opacity:0;
            }

            #Richload1 {
                width: 100%; height: 100%; position: absolute; left: 0px; top: 0px;
            }
        </style>
    </head>
    <body>
        <div id="container">
            <ft-richload name="` + varName + `" id="Richload1"></ft-richload>
        </div>

        <script src="http://cdn.flashtalking.com/frameworks/js/api/2/10/html5API.js"></script>
        <script>var myFT = new FT, container = myFT.$('#container'); container.css('opacity', 1);</script>
    </body>
</html>`
}

function getRlIndex() {
    let text = `<!DOCTYPE html>
<html><head>
    <meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>300x250</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="main">
    </div>
</body>
<script src="https://cdn.flashtalking.com/frameworks/js/api/2/10/html5API.js"></script>
<script src="https://cdn.flashtalking.com/frameworks/js/gsap/3.11.1/gsap.min.js"></script>
`;

    if(lines[4][5] == 'yes') {
        text += '<script src="https://cdn.flashtalking.com/feeds/frameworks/js/api/20/FTFeed.min.js"></script>\n'
    }
    if(lines[5][5] == 'yes') {
        text += '<script src="https://cdn.flashtalking.com/feeds/frameworks/js/utils/Tracker.js"></script>'
    }

    text += `<script src="js/utils.js"></script>
<script src="js/script.js"></script>

</html>`
    return text;
}

// function trace(s) {console.log(s)}