(function(){
  'use strict';

  var mongoose = require('mongoose'),
      schema = mongoose.Schema,

      userSchema = new Schema({
        name: {
          first: {type: String, required: true},
          last: {type: String, required: true}
        },
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        urls: [{
          created_at: Date,
          urlHash: {type: String},
          originalUrl: {type: String}
        }]
      }),

      User = mongoose.model('User', userSchema);

      module.exports = User;

})();
