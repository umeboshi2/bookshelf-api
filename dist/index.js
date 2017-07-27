// Generated by CoffeeScript 1.12.6
'use strict';
var Howhap, _, errors, fs, getStack, path, pluralize;

_ = require('lodash');

path = require('path');

fs = require('fs');

Howhap = require('howhap');

errors = require('./errors');

getStack = require('./get-stack');

pluralize = require('pluralize');

module.exports = function(config) {
  var callingFilePath, defaultConfig, e, files, models, originalPath, stack;
  if (!_.isObject(config)) {
    throw new Howhap(errors.BAD_CONFIG);
  }
  defaultConfig = {
    putBehavior: 'upsert',
    hardDelete: false,
    deletedAttribute: 'deletedAt',
    errors: errors,
    pluralEndpoints: false
  };
  config = _.extend(defaultConfig, config);
  if (!config.models) {
    if (!config.path) {
      throw new Howhap(config.errors.MISSING_PATH);
    }
    originalPath = config.path;
    if (!path.isAbsolute(config.path)) {
      stack = getStack();
      stack.shift();
      callingFilePath = stack.shift().getFileName();
      config.path = path.join(path.dirname(callingFilePath), config.path);
    }
    files = null;
    try {
      files = fs.readdirSync(config.path);
    } catch (error) {
      e = error;
      if (e.code === 'ENOENT') {
        throw new Howhap(config.errors.BAD_PATH, {
          path: originalPath
        });
      }
      throw new Howhap(config.errors.UNKNOWN, {
        error: e.toString()
      });
    }
    models = files.filter(function(file) {
      return path.extname(file) === '.js' && file.charAt(0) !== '.';
    }).map(function(file) {
      var modelName;
      modelName = file.split('.')[0];
      return {
        model: require(path.join(config.path, file)),
        name: config.pluralEndpoints ? pluralize(modelName) : modelName
      };
    }).reduce((function(before, info) {
      before[info.name.toLowerCase()] = info.model;
      return before;
    }), {});
  } else {
    models = config.models;
  }
  return require('./middleware')(models, config);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi4iLCJzb3VyY2VzIjpbInNyYy9pbmRleC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsSUFBQTs7QUFDQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSOztBQUNQLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFDTCxNQUFBLEdBQVMsT0FBQSxDQUFRLFFBQVI7O0FBQ1QsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSOztBQUNULFFBQUEsR0FBVyxPQUFBLENBQVEsYUFBUjs7QUFDWCxTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVI7O0FBRVosTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQyxNQUFEO0FBQ2YsTUFBQTtFQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsUUFBRixDQUFXLE1BQVgsQ0FBSjtBQUNFLFVBQU0sSUFBSSxNQUFKLENBQVcsTUFBTSxDQUFDLFVBQWxCLEVBRFI7O0VBRUEsYUFBQSxHQUNFO0lBQUEsV0FBQSxFQUFhLFFBQWI7SUFDQSxVQUFBLEVBQVksS0FEWjtJQUVBLGdCQUFBLEVBQWtCLFdBRmxCO0lBR0EsTUFBQSxFQUFRLE1BSFI7SUFJQSxlQUFBLEVBQWlCLEtBSmpCOztFQUtGLE1BQUEsR0FBUyxDQUFDLENBQUMsTUFBRixDQUFTLGFBQVQsRUFBd0IsTUFBeEI7RUFDVCxJQUFHLENBQUMsTUFBTSxDQUFDLE1BQVg7SUFDRSxJQUFHLENBQUMsTUFBTSxDQUFDLElBQVg7QUFDRSxZQUFNLElBQUksTUFBSixDQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBekIsRUFEUjs7SUFFQSxZQUFBLEdBQWUsTUFBTSxDQUFDO0lBRXRCLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBTCxDQUFnQixNQUFNLENBQUMsSUFBdkIsQ0FBSjtNQUNFLEtBQUEsR0FBUSxRQUFBLENBQUE7TUFDUixLQUFLLENBQUMsS0FBTixDQUFBO01BQ0EsZUFBQSxHQUFrQixLQUFLLENBQUMsS0FBTixDQUFBLENBQWEsQ0FBQyxXQUFkLENBQUE7TUFDbEIsTUFBTSxDQUFDLElBQVAsR0FBYyxJQUFJLENBQUMsSUFBTCxDQUFVLElBQUksQ0FBQyxPQUFMLENBQWEsZUFBYixDQUFWLEVBQXlDLE1BQU0sQ0FBQyxJQUFoRCxFQUpoQjs7SUFLQSxLQUFBLEdBQVE7QUFDUjtNQUNFLEtBQUEsR0FBUSxFQUFFLENBQUMsV0FBSCxDQUFlLE1BQU0sQ0FBQyxJQUF0QixFQURWO0tBQUEsYUFBQTtNQUVNO01BQ0osSUFBRyxDQUFDLENBQUMsSUFBRixLQUFVLFFBQWI7QUFDRSxjQUFNLElBQUksTUFBSixDQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBekIsRUFBbUM7VUFBQSxJQUFBLEVBQU0sWUFBTjtTQUFuQyxFQURSOztBQUVBLFlBQU0sSUFBSSxNQUFKLENBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUF6QixFQUFrQztRQUFBLEtBQUEsRUFBTyxDQUFDLENBQUMsUUFBRixDQUFBLENBQVA7T0FBbEMsRUFMUjs7SUFNQSxNQUFBLEdBQVMsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFDLElBQUQ7YUFFcEIsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFiLENBQUEsS0FBc0IsS0FBdEIsSUFBZ0MsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFaLENBQUEsS0FBa0I7SUFGOUIsQ0FBYixDQUdSLENBQUMsR0FITyxDQUdILFNBQUMsSUFBRDtBQUNKLFVBQUE7TUFBQSxTQUFBLEdBQVksSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBQWdCLENBQUEsQ0FBQTthQUM1QjtRQUNFLEtBQUEsRUFBTyxPQUFBLENBQVEsSUFBSSxDQUFDLElBQUwsQ0FBVSxNQUFNLENBQUMsSUFBakIsRUFBdUIsSUFBdkIsQ0FBUixDQURUO1FBRUUsSUFBQSxFQUFTLE1BQU0sQ0FBQyxlQUFWLEdBQStCLFNBQUEsQ0FBVSxTQUFWLENBQS9CLEdBQXlELFNBRmpFOztJQUZJLENBSEcsQ0FTUixDQUFDLE1BVE8sQ0FTQSxDQUFDLFNBQUMsTUFBRCxFQUFTLElBQVQ7TUFDUixNQUFPLENBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFWLENBQUEsQ0FBQSxDQUFQLEdBQWtDLElBQUksQ0FBQzthQUN2QztJQUZRLENBQUQsQ0FUQSxFQVlOLEVBWk0sRUFqQlg7R0FBQSxNQUFBO0lBK0JFLE1BQUEsR0FBUyxNQUFNLENBQUMsT0EvQmxCOztTQWdDQSxPQUFBLENBQVEsY0FBUixDQUFBLENBQXdCLE1BQXhCLEVBQWdDLE1BQWhDO0FBMUNlIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5fID0gcmVxdWlyZSgnbG9kYXNoJylcbnBhdGggPSByZXF1aXJlKCdwYXRoJylcbmZzID0gcmVxdWlyZSgnZnMnKVxuSG93aGFwID0gcmVxdWlyZSgnaG93aGFwJylcbmVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJylcbmdldFN0YWNrID0gcmVxdWlyZSgnLi9nZXQtc3RhY2snKVxucGx1cmFsaXplID0gcmVxdWlyZSgncGx1cmFsaXplJylcblxubW9kdWxlLmV4cG9ydHMgPSAoY29uZmlnKSAtPlxuICBpZiAhXy5pc09iamVjdChjb25maWcpXG4gICAgdGhyb3cgbmV3IEhvd2hhcChlcnJvcnMuQkFEX0NPTkZJRylcbiAgZGVmYXVsdENvbmZpZyA9XG4gICAgcHV0QmVoYXZpb3I6ICd1cHNlcnQnXG4gICAgaGFyZERlbGV0ZTogZmFsc2VcbiAgICBkZWxldGVkQXR0cmlidXRlOiAnZGVsZXRlZEF0J1xuICAgIGVycm9yczogZXJyb3JzXG4gICAgcGx1cmFsRW5kcG9pbnRzOiBmYWxzZVxuICBjb25maWcgPSBfLmV4dGVuZChkZWZhdWx0Q29uZmlnLCBjb25maWcpXG4gIGlmICFjb25maWcubW9kZWxzXG4gICAgaWYgIWNvbmZpZy5wYXRoXG4gICAgICB0aHJvdyBuZXcgSG93aGFwKGNvbmZpZy5lcnJvcnMuTUlTU0lOR19QQVRIKVxuICAgIG9yaWdpbmFsUGF0aCA9IGNvbmZpZy5wYXRoXG4gICAgIyBSZWxhdGl2ZSBwYXRoXG4gICAgaWYgIXBhdGguaXNBYnNvbHV0ZShjb25maWcucGF0aClcbiAgICAgIHN0YWNrID0gZ2V0U3RhY2soKVxuICAgICAgc3RhY2suc2hpZnQoKVxuICAgICAgY2FsbGluZ0ZpbGVQYXRoID0gc3RhY2suc2hpZnQoKS5nZXRGaWxlTmFtZSgpXG4gICAgICBjb25maWcucGF0aCA9IHBhdGguam9pbihwYXRoLmRpcm5hbWUoY2FsbGluZ0ZpbGVQYXRoKSwgY29uZmlnLnBhdGgpXG4gICAgZmlsZXMgPSBudWxsXG4gICAgdHJ5XG4gICAgICBmaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGNvbmZpZy5wYXRoKVxuICAgIGNhdGNoIGVcbiAgICAgIGlmIGUuY29kZSA9PSAnRU5PRU5UJ1xuICAgICAgICB0aHJvdyBuZXcgSG93aGFwKGNvbmZpZy5lcnJvcnMuQkFEX1BBVEgsIHBhdGg6IG9yaWdpbmFsUGF0aClcbiAgICAgIHRocm93IG5ldyBIb3doYXAoY29uZmlnLmVycm9ycy5VTktOT1dOLCBlcnJvcjogZS50b1N0cmluZygpKVxuICAgIG1vZGVscyA9IGZpbGVzLmZpbHRlcigoZmlsZSkgLT5cbiAgICAgICMgSWdub3JlIG5vbi1qYXZhc2NyaXB0IGZpbGVzIGFuZCBoaWRkZW4gZmlsZXMuXG4gICAgICBwYXRoLmV4dG5hbWUoZmlsZSkgPT0gJy5qcycgYW5kIGZpbGUuY2hhckF0KDApICE9ICcuJ1xuICAgICkubWFwKChmaWxlKSAtPlxuICAgICAgbW9kZWxOYW1lID0gZmlsZS5zcGxpdCgnLicpWzBdXG4gICAgICB7XG4gICAgICAgIG1vZGVsOiByZXF1aXJlKHBhdGguam9pbihjb25maWcucGF0aCwgZmlsZSkpXG4gICAgICAgIG5hbWU6IGlmIGNvbmZpZy5wbHVyYWxFbmRwb2ludHMgdGhlbiBwbHVyYWxpemUobW9kZWxOYW1lKSBlbHNlIG1vZGVsTmFtZVxuICAgICAgfVxuICAgICkucmVkdWNlKCgoYmVmb3JlLCBpbmZvKSAtPlxuICAgICAgYmVmb3JlW2luZm8ubmFtZS50b0xvd2VyQ2FzZSgpXSA9IGluZm8ubW9kZWxcbiAgICAgIGJlZm9yZVxuICAgICksIHt9KVxuICBlbHNlXG4gICAgbW9kZWxzID0gY29uZmlnLm1vZGVsc1xuICByZXF1aXJlKCcuL21pZGRsZXdhcmUnKSBtb2RlbHMsIGNvbmZpZ1xuIl19
//# sourceURL=/freespace/home/umeboshi/workspace/bookshelf-api/src/index.coffee