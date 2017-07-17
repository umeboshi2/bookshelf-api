// Generated by CoffeeScript 1.12.6
'use strict';
var HowhapList, asyncfun, awaitfun;

HowhapList = require('howhap-list');

asyncfun = require('asyncawait/async');

awaitfun = require('asyncawait/await');

module.exports = asyncfun(function(req, res, urlPieces, model, config) {
  var direction, fetchCollection, fetchParams, hasTimestamps, list, promise, total;
  promise = model;
  list = new HowhapList(null, {
    availableErrors: config.errors
  });
  hasTimestamps = null;
  if (model.hasTimestamps === false) {
    hasTimestamps = [];
  } else {
    hasTimestamps = model.hasTimestamps;
  }
  if (typeof hasTimestamps === 'boolean') {
    hasTimestamps = ['created_at', 'updated_at'];
  }
  if (hasTimestamps.indexOf(config.deletedAttribute) !== -1) {
    promise = promise.where(config.deletedAttribute, null);
  }
  fetchParams = {};
  if (req.query && Array.isArray(req.query.withRelated)) {
    fetchParams.withRelated = req.query.withRelated;
  }
  fetchCollection = void 0;
  if (urlPieces.length > 1) {
    fetchCollection = false;
    promise = promise.fetch(fetchParams);
  } else {
    fetchCollection = true;
    if (req.query) {
      if (req.query.columns) {
        fetchParams.columns = req.query.columns;
      }
      if (req.query.where) {
        if (Array.isArray(req.query.where)) {
          promise = promise.where.apply(promise, req.query.where);
        } else if (Object.prototype.toString.call(req.query.where) === '[object Object]') {
          promise = promise.where(req.query.where);
        }
      }
      total = awaitfun(promise.clone().count());
      if (req.query.sort || req.query.offset) {
        direction = req.query.direction || 'ASC';
        direction = direction.toLowerCase();
        promise = promise.query('orderBy', req.query.sort, direction);
      }
      if (req.query.offset) {
        promise = promise.query('offset', req.query.offset);
      }
      if (req.query.limit) {
        promise = promise.query('limit', req.query.limit);
      }
    }
    promise = promise.fetchAll(fetchParams);
  }
  return promise.then(function(results) {
    var data;
    if (!results) {
      list.add('RECORD_NOT_FOUND', {
        model: urlPieces[0],
        id: urlPieces[1]
      });
      res.status(config.errors.RECORD_NOT_FOUND.status).json(list.toObject());
    } else {
      if (fetchCollection) {
        data = {
          total: total,
          items: results.toJSON()
        };
      } else {
        data = results.toJSON();
      }
      res.json(data);
    }
  })["catch"](function(err) {
    list.add('RECORD_NOT_FOUND', {
      error: err.toString()
    });
    res.status(config.errors.UNKNOWN.status).json(list.toObject());
  }).then(function() {
    return Promise.resolve({
      urlPieces: urlPieces,
      model: model
    });
  });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjc3JjL2dldC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsSUFBQTs7QUFDQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGFBQVI7O0FBQ2IsUUFBQSxHQUFXLE9BQUEsQ0FBUSxrQkFBUjs7QUFDWCxRQUFBLEdBQVcsT0FBQSxDQUFRLGtCQUFSOztBQUVYLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBQUEsQ0FBUyxTQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsU0FBWCxFQUFzQixLQUF0QixFQUE2QixNQUE3QjtBQUN4QixNQUFBO0VBQUEsT0FBQSxHQUFVO0VBRVYsSUFBQSxHQUFPLElBQUksVUFBSixDQUFlLElBQWYsRUFBcUI7SUFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUF4QjtHQUFyQjtFQUNQLGFBQUEsR0FBZ0I7RUFDaEIsSUFBRyxLQUFLLENBQUMsYUFBTixLQUF1QixLQUExQjtJQUNFLGFBQUEsR0FBZ0IsR0FEbEI7R0FBQSxNQUFBO0lBR0UsYUFBQSxHQUFnQixLQUFLLENBQUMsY0FIeEI7O0VBSUEsSUFBRyxPQUFPLGFBQVAsS0FBd0IsU0FBM0I7SUFDRSxhQUFBLEdBQWdCLENBQ2QsWUFEYyxFQUVkLFlBRmMsRUFEbEI7O0VBS0EsSUFBRyxhQUFhLENBQUMsT0FBZCxDQUFzQixNQUFNLENBQUMsZ0JBQTdCLENBQUEsS0FBa0QsQ0FBQyxDQUF0RDtJQUNFLE9BQUEsR0FBVSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQU0sQ0FBQyxnQkFBckIsRUFBdUMsSUFBdkMsRUFEWjs7RUFFQSxXQUFBLEdBQWM7RUFDZCxJQUFHLEdBQUcsQ0FBQyxLQUFKLElBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQXhCLENBQWpCO0lBQ0UsV0FBVyxDQUFDLFdBQVosR0FBMEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUR0Qzs7RUFHQSxlQUFB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QUFBLENBQVA7S0FBN0I7SUFDQSxHQUFHLENBQUMsTUFBSixDQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWpDLENBQXdDLENBQUMsSUFBekMsQ0FBOEMsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUE5QztFQUZNLENBaEJSLENBb0JDLENBQUMsSUFwQkYsQ0FvQk8sU0FBQTtXQUNMLE9BQU8sQ0FBQyxPQUFSLENBQ0U7TUFBQSxTQUFBLEVBQVcsU0FBWDtNQUNBLEtBQUEsRUFBTyxLQURQO0tBREY7RUFESyxDQXBCUDtBQXZEd0IsQ0FBVCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuSG93aGFwTGlzdCA9IHJlcXVpcmUoJ2hvd2hhcC1saXN0JylcbmFzeW5jZnVuID0gcmVxdWlyZSAnYXN5bmNhd2FpdC9hc3luYydcbmF3YWl0ZnVuID0gcmVxdWlyZSAnYXN5bmNhd2FpdC9hd2FpdCdcblxubW9kdWxlLmV4cG9ydHMgPSBhc3luY2Z1biAocmVxLCByZXMsIHVybFBpZWNlcywgbW9kZWwsIGNvbmZpZykgLT5cbiAgcHJvbWlzZSA9IG1vZGVsXG4gIFxuICBsaXN0ID0gbmV3IEhvd2hhcExpc3QobnVsbCwgYXZhaWxhYmxlRXJyb3JzOiBjb25maWcuZXJyb3JzKVxuICBoYXNUaW1lc3RhbXBzID0gbnVsbFxuICBpZiBtb2RlbC5oYXNUaW1lc3RhbXBzID09IGZhbHNlXG4gICAgaGFzVGltZXN0YW1wcyA9IFtdXG4gIGVsc2VcbiAgICBoYXNUaW1lc3RhbXBzID0gbW9kZWwuaGFzVGltZXN0YW1wc1xuICBpZiB0eXBlb2YgaGFzVGltZXN0YW1wcyA9PSAnYm9vbGVhbidcbiAgICBoYXNUaW1lc3RhbXBzID0gW1xuICAgICAgJ2NyZWF0ZWRfYXQnXG4gICAgICAndXBkYXRlZF9hdCdcbiAgICBdXG4gIGlmIGhhc1RpbWVzdGFtcHMuaW5kZXhPZihjb25maWcuZGVsZXRlZEF0dHJpYnV0ZSkgIT0gLTFcbiAgICBwcm9taXNlID0gcHJvbWlzZS53aGVyZShjb25maWcuZGVsZXRlZEF0dHJpYnV0ZSwgbnVsbClcbiAgZmV0Y2hQYXJhbXMgPSB7fVxuICBpZiByZXEucXVlcnkgYW5kIEFycmF5LmlzQXJyYXkocmVxLnF1ZXJ5LndpdGhSZWxhdGVkKVxuICAgIGZldGNoUGFyYW1zLndpdGhSZWxhdGVkID0gcmVxLnF1ZXJ5LndpdGhSZWxhdGVkXG4gICMgRklYTUUgaXMgdGhlcmUgYSBiZXR0ZXIgd2F5IHRoYW4gYSBjb2xsZWN0aW9uL21vZGVsIGZsYWc/XG4gIGZldGNoQ29sbGVjdGlvbiA9IHVuZGVmaW5lZFxuICAjIEdldCBpbmRpdmlkdWFsIHJlY29yZFxuICBpZiB1cmxQaWVjZXMubGVuZ3RoID4gMVxuICAgIGZldGNoQ29sbGVjdGlvbiA9IGZhbHNlXG4gICAgcHJvbWlzZSA9IHByb21pc2UuZmV0Y2goZmV0Y2hQYXJhbXMpXG4gIGVsc2VcbiAgICBmZXRjaENvbGxlY3Rpb24gPSB0cnVlXG4gICAgaWYgcmVxLnF1ZXJ5XG4gICAgICAjIENvbHVtbnMgc3VwcG9ydFxuICAgICAgaWYgcmVxLnF1ZXJ5LmNvbHVtbnNcbiAgICAgICAgZmV0Y2hQYXJhbXMuY29sdW1ucyA9IHJlcS5xdWVyeS5jb2x1bW5zXG4gICAgICAjIFdoZXJlIGNsYXVzZSBzdXBwb3J0XG4gICAgICBpZiByZXEucXVlcnkud2hlcmVcbiAgICAgICAgaWYgQXJyYXkuaXNBcnJheShyZXEucXVlcnkud2hlcmUpXG4gICAgICAgICAgcHJvbWlzZSA9IHByb21pc2Uud2hlcmUuYXBwbHkocHJvbWlzZSwgcmVxLnF1ZXJ5LndoZXJlKVxuICAgICAgICBlbHNlIGlmIE9iamVjdDo6dG9TdHJpbmcuY2FsbChyZXEucXVlcnkud2hlcmUpID09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgICAgICAgcHJvbWlzZSA9IHByb21pc2Uud2hlcmUocmVxLnF1ZXJ5LndoZXJlKVxuICAgICAgIyB3ZSBuZWVkIHRvIGdldCBhIHRvdGFsIGNvdW50IGFuZCBpbmNsdWRlIHRoYXQgaW4gcmVzcG9uc2VcbiAgICAgICMgd2l0aCBjb2xsZWN0aW9uIFwie3RvdGFsOmNvdW50KCksIGl0ZW1zOltdfVwiXG4gICAgICAjIGJlZm9yZSBzZXR0aW5nIG9mZnNldCBhbmQgbGltaXRcbiAgICAgIHRvdGFsID0gYXdhaXRmdW4gcHJvbWlzZS5jbG9uZSgpLmNvdW50KClcbiAgICAgICMgT3JkZXIgYnkgc3VwcG9ydCAobmVlZGVkIGZvciBvZmZzZXQpXG4gICAgICBpZiByZXEucXVlcnkuc29ydCBvciByZXEucXVlcnkub2Zmc2V0XG4gICAgICAgIGRpcmVjdGlvbiA9IHJlcS5xdWVyeS5kaXJlY3Rpb24gb3IgJ0FTQydcbiAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uLnRvTG93ZXJDYXNlKClcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UucXVlcnkoJ29yZGVyQnknLCByZXEucXVlcnkuc29ydCwgZGlyZWN0aW9uKVxuICAgICAgIyBPZmZzZXQgc3VwcG9ydFxuICAgICAgaWYgcmVxLnF1ZXJ5Lm9mZnNldFxuICAgICAgICAjcHJvbWlzZSA9IHByb21pc2UucXVlcnkoKHFiKSAtPiBxYi5vZmZzZXQocmVxLnF1ZXJ5Lm9mZnNldCkpXG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnF1ZXJ5KCdvZmZzZXQnLCByZXEucXVlcnkub2Zmc2V0KVxuICAgICAgIyBMaW1pdCBzdXBwb3J0XG4gICAgICBpZiByZXEucXVlcnkubGltaXRcbiAgICAgICAgI3Byb21pc2UgPSBwcm9taXNlLnF1ZXJ5KChxYikgLT4gcWIubGltaXQocmVxLnF1ZXJ5LmxpbWl0KSlcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UucXVlcnkoJ2xpbWl0JywgcmVxLnF1ZXJ5LmxpbWl0KVxuICAgIHByb21pc2UgPSBwcm9taXNlLmZldGNoQWxsKGZldGNoUGFyYW1zKVxuICBwcm9taXNlLnRoZW4oKHJlc3VsdHMpIC0+XG4gICAgaWYgIXJlc3VsdHNcbiAgICAgIGxpc3QuYWRkICdSRUNPUkRfTk9UX0ZPVU5EJyxcbiAgICAgICAgbW9kZWw6IHVybFBpZWNlc1swXVxuICAgICAgICBpZDogdXJsUGllY2VzWzFdXG4gICAgICByZXMuc3RhdHVzKGNvbmZpZy5lcnJvcnMuUkVDT1JEX05PVF9GT1VORC5zdGF0dXMpLmpzb24gbGlzdC50b09iamVjdCgpXG4gICAgZWxzZVxuICAgICAgaWYgZmV0Y2hDb2xsZWN0aW9uXG4gICAgICAgIGRhdGEgPVxuICAgICAgICAgIHRvdGFsOiB0b3RhbFxuICAgICAgICAgIGl0ZW1zOiByZXN1bHRzLnRvSlNPTigpXG4gICAgICBlbHNlXG4gICAgICAgIGRhdGEgPSByZXN1bHRzLnRvSlNPTigpXG4gICAgICByZXMuanNvbiBkYXRhXG4gICAgICBcbiAgICByZXR1cm5cbiAgKS5jYXRjaCgoZXJyKSAtPlxuICAgIGxpc3QuYWRkICdSRUNPUkRfTk9UX0ZPVU5EJywgZXJyb3I6IGVyci50b1N0cmluZygpXG4gICAgcmVzLnN0YXR1cyhjb25maWcuZXJyb3JzLlVOS05PV04uc3RhdHVzKS5qc29uIGxpc3QudG9PYmplY3QoKVxuICAgIHJldHVyblxuICApLnRoZW4gLT5cbiAgICBQcm9taXNlLnJlc29sdmVcbiAgICAgIHVybFBpZWNlczogdXJsUGllY2VzXG4gICAgICBtb2RlbDogbW9kZWxcbiJdfQ==
//# sourceURL=/freespace/home/umeboshi/workspace/bookshelf-api/csrc/get.coffee