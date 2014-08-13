module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "js/init.js",
                    name: "init",
                    include: ['init'],
                    exclude: ['jquery', 'lodash', 'handlebars', 'text'],
                    out: "build/js/production.js"
                }
            }
        },
//        concat: {
//            main: {
//                src: [
//                    'js/init.js',
//                    'js/util.js',
//                    'js/stat.js',
//                    'js/router.js',
//                    'js/persistence.js',
//                    'js/test.js',
//                    'js/constructor.js'
//                ],
//                dest: 'build/js/production.js'
//            }
//        },
        uglify: {
            main: {
                files: {
                    'build/js/lib/require.min.js': 'build/js/lib/require.min.js',
                    'build/js/lib/text.min.js': 'build/js/lib/text.min.js'
                }
            }
        },
        csso: {
            main: {
                files: {
                    'build/css/main.min.css': ['css/compiled/main.css']
                }
            }
        },
        jshint: {
            options: {
                globals: {
                    jQuery: true
                }
            },
            all: [
                'Gruntfile.js',
                'js/*.js'
            ]
        },
        handlebars: {
            compile: {
                files: {
                    "build/template/resultTest.js": "template/templateListTest.hbs",
                    "build/template/resultQuest.js": "template/templateQuest.hbs"
                }
            }
        },
        gitcommit: {
            task: {
                options: {
                    message: 'Testing',
                    noVerify: true,
                    noStatus: false
                },
                files: {
                    src: ['build/']
                }
            }
        },
        gitpush: {
            task: {
                options: {
                    remote: 'origin',
                    branch: 'gh-pages'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        src: 'index.html',
                        dest: 'build/index.html'
                    },
                    {
                        src: 'js/json/data.json',
                        dest: 'build/js/json/data.json'
                    },
                    {
                        src: 'bower_components/jquery/dist/jquery.min.js',
                        dest: 'build/js/lib/jquery.min.js'
                    },
                    {
                        src: 'bower_components/handlebars/handlebars.min.js',
                        dest: 'build/js/lib/handlebars.min.js'
                    },
                    {
                        src: 'bower_components/lodash/dist/lodash.min.js',
                        dest: 'build/js/lib/lodash.min.js'
                    },
                    {
                        src: 'bower_components/requirejs/require.js',
                        dest: 'build/js/lib/require.min.js'
                    },
                    {
                        src: 'bower_components/requirejs-text/text.js',
                        dest: 'build/js/lib/text.min.js'
                    },
                    {
                        src: 'template/templateListTest.hbs',
                        dest: 'build/template/templateListTest.hbs'
                    },
                    {
                        src: 'template/templateQuest.hbs',
                        dest: 'build/template/templateQuest.hbs'
                    }
                ]
            }
        },
        replace: {
            index: {
                src: ['build/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: /js\/init/i,
                        to: "js/production.js"
                    },
                    {
                        from: /css\/compiled\/main.css/i,
                        to: "css/main.min.css"
                    },
                    {
                        from: /bower_components\/requirejs\/require.js/i,
                        to: "js/lib/require.min.js"
                    }
                ]
            },
            code: {
                src: ['build/js/production.js'],
                overwrite: true,
                replacements: [
                    {
                        from: /..\/bower_components\/jquery\/dist\/jquery.min/i,
                        to: "lib/jquery.min"
                    },
                    {
                        from: /..\/bower_components\/handlebars\/handlebars/i,
                        to: "lib/handlebars.min"
                    }                    ,
                    {
                        from: /..\/bower_components\/lodash\/dist\/lodash/i,
                        to: "lib/lodash.min"
                    },
                    {
                        from: /..\/bower_components\/requirejs-text\/text/i,
                        to: "lib/text.min"
                    }
                ]
            }
        },
        jasmine: {
            main: {
                src: 'constructor.js',
                options: {
                    specs: 'spec/spec.js',
                    keepRunner: true,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'js/init.js',
                        requireConfig: {
                            baseUrl: 'js/'
                        }
                    }
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.loadNpmTasks('grunt-git');

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('build', ['jshint', 'copy', 'uglify', 'requirejs', 'csso', 'replace'/*,'handlebars'*/]);
    grunt.registerTask('git', ['gitcommit', 'gitpush']);
    grunt.registerTask('test', ['jasmine']);

};