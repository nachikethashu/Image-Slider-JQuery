var mozjpeg = require('imagemin-mozjpeg');
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {

            }
        },
        uglify: {
            options: {
                banner: '/* imageSlider.jquery.js \n * @author Nachiketha S H Upadhya <nachikethashu@gmail.com>\n */\n'
            },
            my_target: {
                files: {
                    'dist/imageSlider.jquery.min.js': ['src/*.js']
                }
            }
        },
        qunit: {
            files: ['test/*.html']
        },
        watch: {
            scripts: {
                files: ['**/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false,
                },
            },
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [mozjpeg()]
                },
                files: [{
                    expand: true,
                    cwd: 'demo/images/',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'demo/images/'
                }]
            }
        }
    });

    // Load the plugin that provides the "jshint" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Load the plugin that provides the "qunit" task.
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Load the plugin that provides the "watch" task.
    grunt.loadNpmTasks('grunt-contrib-watch');

    //image compressor
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify', 'qunit']);

};