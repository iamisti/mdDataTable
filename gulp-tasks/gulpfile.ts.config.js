'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './app/';
        this.sourceApp = this.source + 'modules/';

        this.buildFolder = './build/';
        this.tsOutputPath = this.buildFolder + 'compiled';
        this.allJavaScript = this.source + '/**/*.js';
        this.allTypeScript = this.sourceApp + '/**/*.ts';

        this.typings = './typings/';
        this.libraryTypeScriptDefinitions = './typings/main/**/*.ts';
        this.appTypeScriptReferences = './typings/main/**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;