(function(){
  'use strict';

  var mongoose = require('mongoose'),
      schema = mongoose.Schema,

      logSchema = new Schema({
        visited_at: Date,
        urlHash: {type: String, required: true}
      }),

      Log = mongoose.model('Log', userSchema);

      module.exports = Log;

})();
