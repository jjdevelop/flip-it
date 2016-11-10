module.exports = function(config){
    config.set({

        // generate js from templates
        preprocessors: {
            '**/*.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: "../www/",
            moduleName: "templates"
        },

        basePath : './',

        files : [
            // required resource scripts
            '../www/lib/**/*.js',

            // application scripts
            '../www/js/*.js',

            // test specification scripts
            'unit-tests/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        // Chrome browser for continuous (developer) unit tests, overridden in gruntfile.js for build pipeline.
        browsers : ['Chrome'],

        // Avoiding timeouts
        captureTimeout: 60000,
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 100000,

        plugins : [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        colors: true,

        // Show results as progress statements only for developer continuous testing.
        // To write junit tests as in the gruntfile, add 'junit' to the reporters array below.
        reporters: [ 'progress' ],

        // junit format xml for the build pipeline.
        junitReporter : {
            outputDir: 'test-results',
            outputFile: 'unit-test-results.xml',
            suite: 'unit',
            useBrowserName: false
        }

    });
};
