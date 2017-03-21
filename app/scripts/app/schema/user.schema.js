(function(){
  'use strict';

  var mongoose = require('mongoose'),
      schema = mongoose.Schema,

      userSchema = new Schema({
        userName: {type: String, required: true, unique: true},
        name: {
          first: {type: String, required: true},
          last: {type: String, required: true}
        }
      });

      module.exports = userSchema;

})();
