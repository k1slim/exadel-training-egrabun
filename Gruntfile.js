module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "js/init.js",
                    name: "init",
                    include: ['init'],
                    exclude:['jquery','lodash','handlebars','text'],
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
//        uglify: {
//            main: {
//                files: {
//                    'build/js/production.min.js': '<%= concat.main.dest %>'
//                }
//            }
//        },
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
            gitcheckout: {
                task: {
                    options: {
                        branch: ' gh-pages'
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
                    src: ['Gruntfile.js']
                }
            }
        },
        gitpush: {
            task: {
                options: {
                    remote:'origin master'
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

    grunt.loadNpmTasks('grunt-git');

    grunt.registerTask('default', ['requirejs',/*'concat', 'uglify',*/ 'csso', 'jshint','handlebars']);

    grunt.registerTask('git', ['gitcommit','gitpush']);

};