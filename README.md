# Game Of War
a web simulation of the classic card game of war

How to use?

The game of war app must be generated as part of your app's build process before being used.

To build the app, write the following code in some javascript file:
```javascript
let gameofwar = require('gameofwar');
let appDistributionDirectory = 'path_To_Your_Output_Directory_Name';
gameofwar.CreateApp(appDistributionDirectory);
```
In your command shell, run `node nameOfFileContainingPreviousCode.js` 
The app will build and deploy to the directory you specified (the appDistributionDirectory variable) inside a folder called 'gameofwar'.

Then in whatever part of your web app you want to invoke the gameofwar game, you will need to include the following elments in your html
```html
<div id="import_gameofwar"></div>
...
<script src="./gameofwar/index.js" />
```
The div will be where the app shows up (must include the id with the name 'import_gameofwar') and the script tag will load it.
