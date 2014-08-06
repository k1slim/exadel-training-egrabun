var quiz;
require.config({
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'handlebars': '../bower_components/handlebars/handlebars',
        'lodash': '../bower_components/lodash/dist/lodash',

        'constructor': 'constructor',
        'test': 'test',
        'stat': 'stat',
        'persistence': 'persistence',
        'routing': 'routing',
        'util': 'util'
    },

    shim: {
        'handlebars': {
            exports: 'Handlebars'
        }
    }

});

require(['constructor'], function(ConstModule){
    quiz = ConstModule;
    quiz.init();

});