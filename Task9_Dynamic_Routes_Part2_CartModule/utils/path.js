// viewPath is a function which takes a view or page name and returns an absolute path to that page
// the function uses Node.js path module to combine the root directory of the application, views directory and the passed view name to create an absolute path
const path = require('path');
// console.log(`path =>`, path.dirname(require.main.filename));
// const rootDir = path.dirname(process.mainModule.filename); (deprecated version)
const rootDir = path.dirname(require.main.filename); // this line gets the root directory of the application 
const viewPath = (view) =>{ // this creates a function which takes a page or view name
    return path.join(rootDir, 'views', view); // this line combines the root directory, views directory and the page/view name to create an absolute path to the page/view and returns it
};
module.exports = viewPath; // this exports the viewPath function so it can be used in other parts of the application