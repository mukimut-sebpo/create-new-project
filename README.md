# Generate a New Build Project
Fill in the CSV file and run the main.js file. A new project will be generated with proper folder structure, index.html with divs and images from manifest and CDN imports.

## Filling the CSV
- **name column (column A):** Enter the variable names provided by the client.
- **type column (column B):** Enter weather variable type is image or text. If the type is image, an image tag will be created in the html and tag's id will be variable name.
- **value column (column C):** This is for the default value of the variable. If you don't know the value, leave it blank. If you leave the value of an image variable blank, the value will automatically be `images/blank.png`.
- **html column (column D):** This is for how you want the variable to appear in html. If you put `d` for a text variable then a div will be created in the html whose id will be the name of the variable. If you put `f` for an image variable then `frameSize` class will be added the image tag that will be created. If you enter nothing, nothing will happen for that variable.

You need to provide some additional information in cloumn F.

- **F1/rlVarName:** The name of the variable of the richload.
- **F2/richloadName:** The name of the richload (i.e `rlVarName`).
- **F3/basefileName:** The name of the creative/basefile.
- **F4/hasFeed:** If the ad gets data from feed endpoint, set it true. CDN link for `FTFeed.min.js` will be added to the html and html feed related code will be added to `scrips.js`.
- **F5/hasTracker:** If the ad has state call trackinng, set it true. CDN link for `Tracker.js` will be added to the html.

  
## Generating the project.
Once all the data has been entered in the CSV, save it, go to terminal and enter

```node main.js```

A new folder with the name of the basefile will be created. Inside it, you will find all the generated files arranged with proper folder structure.
