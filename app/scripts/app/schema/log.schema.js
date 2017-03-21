(function(){
  'use strict';

  var mongoose = require('mongoose'),
      schema = mongoose.Schema,

      logSchema = new Schema({
        visited_at: Date,
        urlHash: {type: String, required: true},
        location: {type: String},
        clickBool: {type: Boolean}
      });

      module.exports = logSchema;

})();
