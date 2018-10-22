module.exports = function(grunt){

    //配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            domop: {
                src: [
                    '../www/js/*.js',
                    '../www/js/**/**/*.js'
                ],
                dest: '../www/lib/public/im.all.js'
            }
        },
        watch: {
            js: {
                files: [
                    '../../../www/js/*.js'
                ],
                tasks: ['concat']
            }
        }
    });

    //载入concat和uglify插件，分别对于合并和压缩
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //注册任务
    grunt.registerTask('default', ['concat']);
    grunt.registerTask('watch', ['concat','watch']);
};
