
module.exports = function(grunt) {

    grunt.initConfig({
        concat: {
            dist: {
                src: 'js/**/*.js',
                dest: 'build/fullJS.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
};
