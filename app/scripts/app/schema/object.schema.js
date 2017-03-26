(function(){
  'use strict';

  var mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      schemaObj = {
        userSchema : new Schema({
                      userName: {type: String, required: true, unique: true},
                      name: {
                        first: {type: String, required: true},
                        last: {type: String, required: true}
                      }
                    }),
        logSchema: new Schema({
                    visited_at: Date,
                    urlHash: {type: String, required: true},
                    location: {type: String},
                    clickBool: {type: Boolean}
                  }),
        urlSchema:new Schema({
                    created_at: Date,
                    created_by: {type: String, required: true},
                    urlHash: {type: String, required: true, unique: true},
                    originalUrl: {type: String, required: true, unique: true}
                  })
      };

      module.exports = schemaObj;

})();
