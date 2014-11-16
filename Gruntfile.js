module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    root: {
      app: 'app',
      dist: 'dist',
      tmp: '.tmp'
    },

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static('app')
            ];
          }
        }
      }
    },

    clean: {
      dist: [
        '<%= root.tmp %>',
        '<%= root.dist %>'
      ],
      server: '<%= root.tmp %>'
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= root.app %>',
          dest: '<%= root.dist %>',
          src: [
            '*.{ico,png,txt,xml}',
            '{,*/}*.html',
            'CNAME',
            'fonts/*.*'
          ]
        }]
      }
    },

    bower: {
      install: {
        options: {
          copy: false
        }
      }
    },

    stylus: {
      options: {
        paths: ['./bower_components'],
        use: [
          require('fluidity'),
          function() {
            return require('autoprefixer-stylus')({browsers: 'last 2 versions'});
          }
        ],
        'include css': true,
      },
      compile: {
        files: {
          '<%= root.tmp %>/styles/main.css': '<%= root.app %>/styles/main.styl'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= root.dist %>/styles/main.css': [
            './bower_components/normalize-css/normalize.css',
            './bower_components/selectize/dist/css/selectize.css',
            '<%= root.tmp %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= root.app %>/scripts/{,*/}{,*/}*.js',
        '<%= root.test %>/specs/{,*/}{,*/}*.js',
        '<%= root.test %>/runner.js'
      ]
    },

    requirejs: {
      options: {
        baseUrl: '<%= root.app %>/scripts',
        mainConfigFile: '<%= root.app %>/scripts/config.js',
        name: '../../bower_components/almond/almond',
      },
      compile: {
        options: {
          out: '<%= root.dist %>/scripts/main.js',
          include: 'main'
        }
      },
    },

    useminPrepare: {
      options: {
        dest: '<%= root.dist %>',
        flow: {
          html: {
            steps: { js: [], css: [] },
            post: {}
          }
        }
      },
      html: '<%= root.app %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= root.dist %>', '<%= root.dist %>/images']
      },
      html: ['<%= root.dist %>/{,*/}*.html'],
      css: ['<%= root.dist %>/styles/{,*/}*.css']
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= root.dist %>',
          src: '{,*/}*.html',
          dest: '<%= root.dist %>'
        }]
      }
    },

    watch: {
      styles: {
        files: [
          '<%= root.app %>/styles/{,*/}{,*/}*.styl'
        ],
        tasks: ['stylus']
      },
      scripts: {
        options: {
          livereload: true
        },
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      }
    },

    'gh-pages': {
      options: {
        base: 'dist'
      },
      src: ['**']
    },

    concurrent: {
      server: [
        'stylus'
      ]
    }

  });

  grunt.registerTask('server', [
    'clean:server',
    'bower',
    'concurrent:server',
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

  grunt.registerTask('build', [
    'test',
    'clean:dist',
    'bower',
    'useminPrepare',
    'copy:dist',
    'stylus',
    'requirejs',
    'cssmin',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);

};
