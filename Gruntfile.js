module.exports = function(grunt) {
  grunt.initConfig({
    exec: {
      build: {
        command: 'node node_modules/requirejs/bin/r.js -o require-config.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('copy-require', function() {
    grunt.file.mkdir('build/js/lib');
    grunt.file.copy('node_modules/requirejs/require.js', 'build/js/lib/require.js');
  });

  grunt.registerTask('default', ['copy-require']);
};
