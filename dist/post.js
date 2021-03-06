// Generated by CoffeeScript 1.12.6
'use strict';
var HowhapList;

HowhapList = require('howhap-list');

module.exports = function(req, res, urlPieces, model, config) {
  var list;
  list = new HowhapList(null, {
    availableErrors: config.errors
  });
  model.set(req.body);
  return model.save().then(function(savedModel) {
    res.json(savedModel.toJSON());
  })["catch"](function(err) {
    list.add('UNKNOWN', {
      message: err.toString()
    });
    res.status(400).json(list.toObject());
  }).then(function() {
    return Promise.resolve({
      urlPieces: urlPieces,
      model: model
    });
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsic3JjL3Bvc3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBLElBQUE7O0FBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxhQUFSOztBQUViLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxTQUFYLEVBQXNCLEtBQXRCLEVBQTZCLE1BQTdCO0FBQ2YsTUFBQTtFQUFBLElBQUEsR0FBTyxJQUFJLFVBQUosQ0FBZSxJQUFmLEVBQXFCO0lBQUEsZUFBQSxFQUFpQixNQUFNLENBQUMsTUFBeEI7R0FBckI7RUFDUCxLQUFLLENBQUMsR0FBTixDQUFVLEdBQUcsQ0FBQyxJQUFkO1NBQ0EsS0FBSyxDQUFDLElBQU4sQ0FBQSxDQUFZLENBQUMsSUFBYixDQUFrQixTQUFDLFVBQUQ7SUFDaEIsR0FBRyxDQUFDLElBQUosQ0FBUyxVQUFVLENBQUMsTUFBWCxDQUFBLENBQVQ7RUFEZ0IsQ0FBbEIsQ0FHQyxFQUFDLEtBQUQsRUFIRCxDQUdRLFNBQUMsR0FBRDtJQUNOLElBQUksQ0FBQyxHQUFMLENBQVMsU0FBVCxFQUFvQjtNQUFBLE9BQUEsRUFBUyxHQUFHLENBQUMsUUFBSixDQUFBLENBQVQ7S0FBcEI7SUFDQSxHQUFHLENBQUMsTUFBSixDQUFXLEdBQVgsQ0FBZSxDQUFDLElBQWhCLENBQXFCLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBckI7RUFGTSxDQUhSLENBT0MsQ0FBQyxJQVBGLENBT08sU0FBQTtXQUNMLE9BQU8sQ0FBQyxPQUFSLENBQ0U7TUFBQSxTQUFBLEVBQVcsU0FBWDtNQUNBLEtBQUEsRUFBTyxLQURQO0tBREY7RUFESyxDQVBQO0FBSGUiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcbkhvd2hhcExpc3QgPSByZXF1aXJlKCdob3doYXAtbGlzdCcpXG5cbm1vZHVsZS5leHBvcnRzID0gKHJlcSwgcmVzLCB1cmxQaWVjZXMsIG1vZGVsLCBjb25maWcpIC0+XG4gIGxpc3QgPSBuZXcgSG93aGFwTGlzdChudWxsLCBhdmFpbGFibGVFcnJvcnM6IGNvbmZpZy5lcnJvcnMpXG4gIG1vZGVsLnNldCByZXEuYm9keVxuICBtb2RlbC5zYXZlKCkudGhlbigoc2F2ZWRNb2RlbCkgLT5cbiAgICByZXMuanNvbiBzYXZlZE1vZGVsLnRvSlNPTigpXG4gICAgcmV0dXJuXG4gICkuY2F0Y2goKGVycikgLT5cbiAgICBsaXN0LmFkZCAnVU5LTk9XTicsIG1lc3NhZ2U6IGVyci50b1N0cmluZygpXG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24gbGlzdC50b09iamVjdCgpXG4gICAgcmV0dXJuXG4gICkudGhlbiAtPlxuICAgIFByb21pc2UucmVzb2x2ZVxuICAgICAgdXJsUGllY2VzOiB1cmxQaWVjZXNcbiAgICAgIG1vZGVsOiBtb2RlbFxuIl19
//# sourceURL=/freespace/home/umeboshi/workspace/bookshelf-api/src/post.coffee