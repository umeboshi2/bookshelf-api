// Generated by CoffeeScript 1.12.6
'use strict';
module.exports = function() {
  var err, orig, stack;
  orig = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) {
    return stack;
  };
  err = new Error;
  Error.captureStackTrace(err);
  stack = err.stack;
  Error.prepareStackTrace = orig;
  stack.shift();
  return stack;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjc3JjL2dldC1zdGFjay5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQTtBQUNmLE1BQUE7RUFBQSxJQUFBLEdBQU8sS0FBSyxDQUFDO0VBRWIsS0FBSyxDQUFDLGlCQUFOLEdBQTBCLFNBQUMsQ0FBRCxFQUFJLEtBQUo7V0FDeEI7RUFEd0I7RUFHMUIsR0FBQSxHQUFNLElBQUk7RUFDVixLQUFLLENBQUMsaUJBQU4sQ0FBd0IsR0FBeEI7RUFDQSxLQUFBLEdBQVEsR0FBRyxDQUFDO0VBQ1osS0FBSyxDQUFDLGlCQUFOLEdBQTBCO0VBQzFCLEtBQUssQ0FBQyxLQUFOLENBQUE7U0FDQTtBQVhlIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gLT5cbiAgb3JpZyA9IEVycm9yLnByZXBhcmVTdGFja1RyYWNlXG5cbiAgRXJyb3IucHJlcGFyZVN0YWNrVHJhY2UgPSAoXywgc3RhY2spIC0+XG4gICAgc3RhY2tcblxuICBlcnIgPSBuZXcgRXJyb3JcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgZXJyXG4gIHN0YWNrID0gZXJyLnN0YWNrXG4gIEVycm9yLnByZXBhcmVTdGFja1RyYWNlID0gb3JpZ1xuICBzdGFjay5zaGlmdCgpXG4gIHN0YWNrXG4iXX0=
//# sourceURL=/freespace/home/umeboshi/workspace/bookshelf-api/csrc/get-stack.coffee