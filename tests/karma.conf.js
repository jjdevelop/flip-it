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
            // '../www/lib/**/*.js',
            '../www/lib/ionic/js/ionic.bundle.js',
            '../www/lib/phaser/build/phaser.min.js',
            '../www/lib/angular-mocks/angular-mocks.js',
            
            // application scripts
            '../www/js/app.js',
            '../www/js/controllers.js',
            '../www/js/main.js',

            // test specification scripts
            'unit-tests/**/*.js'
        ],

        singleRun: true,
        autoWatch: false,
        frameworks: ['jasmine'],
        browsers : ['Chrome'],
        // browsers : ['PhantomJS'], // headless

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
