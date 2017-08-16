'use strict';

module.exports = grunt => {

  grunt.initConfig({
    concurrent: {
      dev: [ 'pug:dev', 'sass:dev', 'uglify:dev', 'copy:dev', 'watch' ],
      options: {
        logConcurrentOutput: true
      }
    },
    pug: {
      dev: {
        files: {
          './index.html': './src/views/index.pug'
        }
      }
    },
    sass: {
      dev: {
        files: {
          './dist/public/css/style.css': './src/style/style.scss'
        },
        options: {
          style: 'expanded'
        }
      },
      dist: {
        files: {
          './dist/public/css/style.css': './src/style/style.scss'
        },
        options: {
          style: 'compressed'
        }
      }
    },
    uglify: {
      dev: {
        src: './src/js/script.js',
        dest: './dist/public/js/script.min.js',
      },
    },
    copy: {
      dev: {
        files: [
          {
            expand: true,
            cwd: './src/public',
            src: '*',
            dest: './base/public',
            filter: 'isFile'
          },
        ]
      }
    },
    watch: {
      pug: {
        files: [ './src/views/*' ],
        tasks: [ 'pug:dev' ],
        options: {
          livereload: true
        },
      },
      sass: {
        files: [ './src/style/*' ],
        tasks: [ 'sass:dev' ],
        options: {
          livereload: true
        },
      },
      uglify: {
        files: [ './src/js/*' ],
        tasks: [ 'uglify:dev' ],
        options: {
          livereload: true
        },
      },
      copy: {
        files: [ './src/*' ],
        tasks: [ 'copy:dev' ],
        options: {
          livereload: true
        },
      },
      configFiles: {
        files: [ 'Gruntfile.js' ],
        options: {
          reload: true,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.registerTask('default', 'concurrent');
  grunt.registerTask('dist', ['pug:dev', 'sass:dist', 'uglify:dev', 'copy:dev']);
};
