// Generated by CoffeeScript 1.12.6
'use strict';
var HowhapList, asyncfun, awaitfun;

HowhapList = require('howhap-list');

asyncfun = require('asyncawait/async');

awaitfun = require('asyncawait/await');

module.exports = asyncfun(function(req, res, urlPieces, model, config) {
  var direction, fetchCollection, fetchParams, hasTimestamps, list, orderExpression, promise, total, totalClone;
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
      if (req.query.distinct) {
        promise = promise.query('distinct', req.query.distinct);
      }
      totalClone = promise.clone();
      if (req.query.distinct) {
        totalClone = totalClone.query('groupBy', req.query.distinct);
      }
      total = awaitfun(totalClone.count());
      if (req.query.sort || req.query.offset) {
        direction = req.query.direction || 'ASC';
        direction = direction.toLowerCase();
        if (Array.isArray(req.query.sort)) {
          orderExpression = [];
          req.query.sort.forEach(function(col) {
            return orderExpression.push(col + " " + direction);
          });
          promise = promise.query('orderByRaw', orderExpression.join(', '));
        } else {
          promise = promise.query('orderBy', req.query.sort, direction);
        }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6Ii4uIiwic291cmNlcyI6WyJjc3JjL2dldC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUEsSUFBQTs7QUFDQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGFBQVI7O0FBQ2IsUUFBQSxHQUFXLE9BQUEsQ0FBUSxrQkFBUjs7QUFDWCxRQUFBLEdBQVcsT0FBQSxDQUFRLGtCQUFSOztBQUVYLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBQUEsQ0FBUyxTQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsU0FBWCxFQUFzQixLQUF0QixFQUE2QixNQUE3QjtBQUN4QixNQUFBO0VBQUEsT0FBQSxHQUFVO0VBRVYsSUFBQSxHQUFPLElBQUksVUFBSixDQUFlLElBQWYsRUFBcUI7SUFBQSxlQUFBLEVBQWlCLE1BQU0sQ0FBQyxNQUF4QjtHQUFyQjtFQUNQLGFBQUEsR0FBZ0I7RUFDaEIsSUFBRyxLQUFLLENBQUMsYUFBTixLQUF1QixLQUExQjtJQUNFLGFBQUEsR0FBZ0IsR0FEbEI7R0FBQSxNQUFBO0lBR0UsYUFBQSxHQUFnQixLQUFLLENBQUMsY0FIeEI7O0VBSUEsSUFBRyxPQUFPLGFBQVAsS0FBd0IsU0FBM0I7SUFDRSxhQUFBLEdBQWdCLENBQ2QsWUFEYyxFQUVkLFlBRmMsRUFEbEI7O0VBS0EsSUFBRyxhQUFhLENBQUMsT0FBZCxDQUFzQixNQUFNLENBQUMsZ0JBQTdCLENBQUEsS0FBa0QsQ0FBQyxDQUF0RDtJQUNFLE9BQUEsR0FBVSxPQUFPLENBQUMsS0FBUixDQUFjLE1BQU0sQ0FBQyxnQkFBckIsRUFBdUMsSUFBdkMsRUFEWjs7RUFFQSxXQUFBLEdBQWM7RUFDZCxJQUFHLEdBQUcsQ0FBQyxLQUFKLElBQWMsS0FBSyxDQUFDLE9BQU4sQ0FBYyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQXhCLENBQWpCO0lBQ0UsV0FBVyxDQUFDLFdBQVosR0FBMEIsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUR0Qzs7RUFHQSxlQUFB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LE9BQUo7TUFDRSxJQUFJLENBQUMsR0FBTCxDQUFTLGtCQUFULEVBQ0U7UUFBQSxLQUFBLEVBQU8sU0FBVSxDQUFBLENBQUEsQ0FBakI7UUFDQSxFQUFBLEVBQUksU0FBVSxDQUFBLENBQUEsQ0FEZDtPQURGO01BR0EsR0FBRyxDQUFDLE1BQUosQ0FBVyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQTFDLENBQWlELENBQUMsSUFBbEQsQ0FBdUQsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUF2RCxFQUpGO0tBQUEsTUFBQTtNQU1FLElBQUcsZUFBSDtRQUNFLElBQUEsR0FDRTtVQUFBLEtBQUEsRUFBTyxLQUFQO1VBQ0EsS0FBQSxFQUFPLE9BQU8sQ0FBQyxNQUFSLENBQUEsQ0FEUDtVQUZKO09BQUEsTUFBQTtRQUtFLElBQUEsR0FBTyxPQUFPLENBQUMsTUFBUixDQUFBLEVBTFQ7O01BTUEsR0FBRyxDQUFDLElBQUosQ0FBUyxJQUFULEVBWkY7O0VBRFcsQ0FBYixDQWVDLEVBQUMsS0FBRCxFQWZELENBZVEsU0FBQyxHQUFEO0lBQ04sSUFBSSxDQUFDLEdBQUwsQ0FBUyxrQkFBVCxFQUE2QjtNQUFBLEtBQUEsRUFBTyxHQUFHLENBQUMsUUFBSixDQUFBLENBQVA7S0FBN0I7SUFDQSxHQUFHLENBQUMsTUFBSixDQUFXLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWpDLENBQXdDLENBQUMsSUFBekMsQ0FBOEMsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUE5QztFQUZNLENBZlIsQ0FtQkMsQ0FBQyxJQW5CRixDQW1CTyxTQUFBO1dBQ0wsT0FBTyxDQUFDLE9BQVIsQ0FDRTtNQUFBLFNBQUEsRUFBVyxTQUFYO01BQ0EsS0FBQSxFQUFPLEtBRFA7S0FERjtFQURLLENBbkJQO0FBckV3QixDQUFUIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5Ib3doYXBMaXN0ID0gcmVxdWlyZSgnaG93aGFwLWxpc3QnKVxuYXN5bmNmdW4gPSByZXF1aXJlICdhc3luY2F3YWl0L2FzeW5jJ1xuYXdhaXRmdW4gPSByZXF1aXJlICdhc3luY2F3YWl0L2F3YWl0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFzeW5jZnVuIChyZXEsIHJlcywgdXJsUGllY2VzLCBtb2RlbCwgY29uZmlnKSAtPlxuICBwcm9taXNlID0gbW9kZWxcbiAgXG4gIGxpc3QgPSBuZXcgSG93aGFwTGlzdChudWxsLCBhdmFpbGFibGVFcnJvcnM6IGNvbmZpZy5lcnJvcnMpXG4gIGhhc1RpbWVzdGFtcHMgPSBudWxsXG4gIGlmIG1vZGVsLmhhc1RpbWVzdGFtcHMgPT0gZmFsc2VcbiAgICBoYXNUaW1lc3RhbXBzID0gW11cbiAgZWxzZVxuICAgIGhhc1RpbWVzdGFtcHMgPSBtb2RlbC5oYXNUaW1lc3RhbXBzXG4gIGlmIHR5cGVvZiBoYXNUaW1lc3RhbXBzID09ICdib29sZWFuJ1xuICAgIGhhc1RpbWVzdGFtcHMgPSBbXG4gICAgICAnY3JlYXRlZF9hdCdcbiAgICAgICd1cGRhdGVkX2F0J1xuICAgIF1cbiAgaWYgaGFzVGltZXN0YW1wcy5pbmRleE9mKGNvbmZpZy5kZWxldGVkQXR0cmlidXRlKSAhPSAtMVxuICAgIHByb21pc2UgPSBwcm9taXNlLndoZXJlKGNvbmZpZy5kZWxldGVkQXR0cmlidXRlLCBudWxsKVxuICBmZXRjaFBhcmFtcyA9IHt9XG4gIGlmIHJlcS5xdWVyeSBhbmQgQXJyYXkuaXNBcnJheShyZXEucXVlcnkud2l0aFJlbGF0ZWQpXG4gICAgZmV0Y2hQYXJhbXMud2l0aFJlbGF0ZWQgPSByZXEucXVlcnkud2l0aFJlbGF0ZWRcbiAgIyBGSVhNRSBpcyB0aGVyZSBhIGJldHRlciB3YXkgdGhhbiBhIGNvbGxlY3Rpb24vbW9kZWwgZmxhZz9cbiAgZmV0Y2hDb2xsZWN0aW9uID0gdW5kZWZpbmVkXG4gICMgR2V0IGluZGl2aWR1YWwgcmVjb3JkXG4gIGlmIHVybFBpZWNlcy5sZW5ndGggPiAxXG4gICAgZmV0Y2hDb2xsZWN0aW9uID0gZmFsc2VcbiAgICBwcm9taXNlID0gcHJvbWlzZS5mZXRjaChmZXRjaFBhcmFtcylcbiAgZWxzZVxuICAgIGZldGNoQ29sbGVjdGlvbiA9IHRydWVcbiAgICBpZiByZXEucXVlcnlcbiAgICAgICMgQ29sdW1ucyBzdXBwb3J0XG4gICAgICBpZiByZXEucXVlcnkuY29sdW1uc1xuICAgICAgICBmZXRjaFBhcmFtcy5jb2x1bW5zID0gcmVxLnF1ZXJ5LmNvbHVtbnNcbiAgICAgICMgV2hlcmUgY2xhdXNlIHN1cHBvcnRcbiAgICAgIGlmIHJlcS5xdWVyeS53aGVyZVxuICAgICAgICBpZiBBcnJheS5pc0FycmF5KHJlcS5xdWVyeS53aGVyZSlcbiAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS53aGVyZS5hcHBseShwcm9taXNlLCByZXEucXVlcnkud2hlcmUpXG4gICAgICAgIGVsc2UgaWYgT2JqZWN0Ojp0b1N0cmluZy5jYWxsKHJlcS5xdWVyeS53aGVyZSkgPT0gJ1tvYmplY3QgT2JqZWN0XSdcbiAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS53aGVyZShyZXEucXVlcnkud2hlcmUpXG4gICAgICAjIGRpc3RpbmN0IGNvbHVtbiBzdXBwb3J0XG4gICAgICBpZiByZXEucXVlcnkuZGlzdGluY3RcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UucXVlcnkoJ2Rpc3RpbmN0JywgcmVxLnF1ZXJ5LmRpc3RpbmN0KVxuICAgICAgIyB3ZSBuZWVkIHRvIGdldCBhIHRvdGFsIGNvdW50IGFuZCBpbmNsdWRlIHRoYXQgaW4gcmVzcG9uc2VcbiAgICAgICMgd2l0aCBjb2xsZWN0aW9uIFwie3RvdGFsOmNvdW50KCksIGl0ZW1zOltdfVwiXG4gICAgICAjIGJlZm9yZSBzZXR0aW5nIG9mZnNldCBhbmQgbGltaXRcbiAgICAgIHRvdGFsQ2xvbmUgPSBwcm9taXNlLmNsb25lKClcbiAgICAgICMgd2l0aCBwZyB3ZSBuZWVkIHRvIGFsc28gYWRkIGdyb3VwIGJ5XG4gICAgICBpZiByZXEucXVlcnkuZGlzdGluY3RcbiAgICAgICAgdG90YWxDbG9uZSA9IHRvdGFsQ2xvbmUucXVlcnkgJ2dyb3VwQnknLCByZXEucXVlcnkuZGlzdGluY3RcbiAgICAgIHRvdGFsID0gYXdhaXRmdW4gdG90YWxDbG9uZS5jb3VudCgpXG5cbiAgICAgICMgT3JkZXIgYnkgc3VwcG9ydCAobmVlZGVkIGZvciBvZmZzZXQpXG4gICAgICBpZiByZXEucXVlcnkuc29ydCBvciByZXEucXVlcnkub2Zmc2V0XG4gICAgICAgIGRpcmVjdGlvbiA9IHJlcS5xdWVyeS5kaXJlY3Rpb24gb3IgJ0FTQydcbiAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uLnRvTG93ZXJDYXNlKClcbiAgICAgICAgaWYgQXJyYXkuaXNBcnJheSByZXEucXVlcnkuc29ydFxuICAgICAgICAgIG9yZGVyRXhwcmVzc2lvbiA9IFtdXG4gICAgICAgICAgcmVxLnF1ZXJ5LnNvcnQuZm9yRWFjaCAoY29sKSAtPlxuICAgICAgICAgICAgb3JkZXJFeHByZXNzaW9uLnB1c2ggXCIje2NvbH0gI3tkaXJlY3Rpb259XCJcbiAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS5xdWVyeSgnb3JkZXJCeVJhdycsIG9yZGVyRXhwcmVzc2lvbi5qb2luKCcsICcpKVxuICAgICAgICBlbHNlXG4gICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UucXVlcnkoJ29yZGVyQnknLCByZXEucXVlcnkuc29ydCwgZGlyZWN0aW9uKVxuICAgICAgIyBPZmZzZXQgc3VwcG9ydFxuICAgICAgaWYgcmVxLnF1ZXJ5Lm9mZnNldFxuICAgICAgICAjcHJvbWlzZSA9IHByb21pc2UucXVlcnkoKHFiKSAtPiBxYi5vZmZzZXQocmVxLnF1ZXJ5Lm9mZnNldCkpXG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnF1ZXJ5KCdvZmZzZXQnLCByZXEucXVlcnkub2Zmc2V0KVxuICAgICAgIyBMaW1pdCBzdXBwb3J0XG4gICAgICBpZiByZXEucXVlcnkubGltaXRcbiAgICAgICAgI3Byb21pc2UgPSBwcm9taXNlLnF1ZXJ5KChxYikgLT4gcWIubGltaXQocmVxLnF1ZXJ5LmxpbWl0KSlcbiAgICAgICAgcHJvbWlzZSA9IHByb21pc2UucXVlcnkoJ2xpbWl0JywgcmVxLnF1ZXJ5LmxpbWl0KVxuICAgIHByb21pc2UgPSBwcm9taXNlLmZldGNoQWxsKGZldGNoUGFyYW1zKVxuICBwcm9taXNlLnRoZW4oKHJlc3VsdHMpIC0+XG4gICAgaWYgIXJlc3VsdHNcbiAgICAgIGxpc3QuYWRkICdSRUNPUkRfTk9UX0ZPVU5EJyxcbiAgICAgICAgbW9kZWw6IHVybFBpZWNlc1swXVxuICAgICAgICBpZDogdXJsUGllY2VzWzFdXG4gICAgICByZXMuc3RhdHVzKGNvbmZpZy5lcnJvcnMuUkVDT1JEX05PVF9GT1VORC5zdGF0dXMpLmpzb24gbGlzdC50b09iamVjdCgpXG4gICAgZWxzZVxuICAgICAgaWYgZmV0Y2hDb2xsZWN0aW9uXG4gICAgICAgIGRhdGEgPVxuICAgICAgICAgIHRvdGFsOiB0b3RhbFxuICAgICAgICAgIGl0ZW1zOiByZXN1bHRzLnRvSlNPTigpXG4gICAgICBlbHNlXG4gICAgICAgIGRhdGEgPSByZXN1bHRzLnRvSlNPTigpXG4gICAgICByZXMuanNvbiBkYXRhXG4gICAgcmV0dXJuXG4gICkuY2F0Y2goKGVycikgLT5cbiAgICBsaXN0LmFkZCAnUkVDT1JEX05PVF9GT1VORCcsIGVycm9yOiBlcnIudG9TdHJpbmcoKVxuICAgIHJlcy5zdGF0dXMoY29uZmlnLmVycm9ycy5VTktOT1dOLnN0YXR1cykuanNvbiBsaXN0LnRvT2JqZWN0KClcbiAgICByZXR1cm5cbiAgKS50aGVuIC0+XG4gICAgUHJvbWlzZS5yZXNvbHZlXG4gICAgICB1cmxQaWVjZXM6IHVybFBpZWNlc1xuICAgICAgbW9kZWw6IG1vZGVsXG4iXX0=
//# sourceURL=/freespace/home/umeboshi/workspace/bookshelf-api/csrc/get.coffee