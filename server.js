(function(){
  'use strict';

  var express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      router = express.Router(),
      db = require('./app/scripts/app/schema/db.config.js'),
      schemaObj = require('./app/scripts/app/schema/object.schema.js'),
      mongoose = require('mongoose'),
      created_at_date;

      console.log(db.connectionString);
      mongoose.connect(db.connectionString, function(error){
        if(error)
          console.log(error);
      });

      var user = schemaObj.userSchema,
          url = schemaObj.urlSchema,
          log = schemaObj.logSchema;

      url.pre('save',function(next){
        console.log('triggereddddddddddddddd');
        this.created_at_date = new Date();
        console.log(url.created_at_date);
        console.log(this.created_at_date);
        next();
      });


      var User = mongoose.model('User', user),
          Url = mongoose.model('Url', url),
          Log = mongoose.model('Log', log);


      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({"extended": true}));

      // All the GET requests to the urlrepo DB
      router.get('/api/users', function(request, response){
        //console.log(User.find({}));
        var res = {};
        User.find({}, function(err, data){
          if(err){
            res = {"error": true, "message": err};
          } else {
            res = {"error": false, "message": data};
          }
          response.json(res);
        });
      });

      router.get('/api/:user', function(request,response){
        var res = {};
        User.findOne({'userName': request.params.user}, function(err,data){
          if(err){
            res = {"error": true, "message": err};
          } else {
            res = {"error": false, "message": data};
          }
          response.json(res);
        });
      });

      router.get('/api/:user/urls', function(request,response){
        var res = {};
        Url.find({'created_by': request.params.user}, function(err,data){
          if(err){
            res = {"error": true, "message": err};
          } else {
            res = {"error": false, "message": data};
          }
          response.json(res);
        });
      });

      router.get('/api/:user/:url', function(request,response){
        var res = {};
        Url.findOne({'urlHash': request.params.url}, function(err,data){
          if(err){
            res = {"error": true, "message": err};
          } else {
            res = {"error": false, "message": data};
          }
          response.json(res);
        });
      });

      router.get('/:url', function(request, response){
        console.log(request.params.url);
        var originalUrl = '',
            log = new Log({
              urlHash: request.params.url,
              visited_at: new Date(),
              clickBool: 1
            });
        Url.findOne({'urlHash': request.params.url}, function(err,data){
          if(err){
            console.log(err);
          } else {
            originalUrl = data.originalUrl;

            log.save(function(err,data){
              if(err){
                res = {"error": true, "message": "data couldnot be instered", "data": err};
              } else {
                res = {"error": false, "message": "data inserted", "data": data};
              }
              response.json(res);
            });

            response.redirect(301, originalUrl);
          }
        });
      });

      // All the POST requests to the urlrepo DB
      router.post('/api/users', function(request, response){
        console.log(request.body);
        var user = new User({
          userName: request.body.userName,
          name: {
            first: request.body.name.first,
            last :request.body.name.last
          }
        }), res = {};

        user.save(function(err,data){
          if(err){
            res = {"error": true, "message": "data couldnot be instered", "data": err};
          } else {
            res = {"error": false, "message": "data inserted", "data": data};
          }
          response.json(res);
        });
      });

      router.post('/api/:user/urls', function(request, response){
        console.log(request.body);
        var url = new Url({
          created_at: new Date(),
          created_by: request.body.created_by,
          urlHash: request.body.urlHash,
          originalUrl: request.body.originalUrl
        }), res = {};

        url.save(function(err,data){
          if(err){
            res = {"error": true, "message": "data couldnot be instered", "data": err};
          } else {
            res = {"error": false, "message": "data inserted", "data": data};
          }
          response.json(res);
        });
      });

      // All the PUT request to the urlrepo DB
      router.put('/api/:user', function(request, response){
        User.findOne({userName: request.params.user}, function(err, user){
          if(err){
            response.json({"error": true, "message": err});
          } else {
            console.log(user);
            if(request.body.userName) user.userName = request.body.userName;
            if(request.body.name.first) user.name.first = request.body.name.first;
            if(request.body.name.last) user.name.last = request.body.name.last;

            var res = {};
            user.save(function(err, data){
              if(err){
                res = {"error": true, "message": "data could not be instered", "data": err};
              } else {
                res = {"error": false, "message": "data inserted", "data": data};
              }
              response.json(res);
            });
          }
        });
      });

      // All the DELETE requests to the urlrepo DB
      router.delete('/api/:user/:url', function(request,response){

        User.remove({urlHash: request.params.url},function(err,user){
          if(err)
            response.json({"error": true, "message": err});

          response.json({"error": false, "message": "URL Deleted"});
        });
      });

      router.delete('/api/users', function(request,response){

        User.remove({userName: request.body.userName},function(err,user){
          if(err)
            response.json({"error": true, "message": err});

          response.json({"error": false, "message": "User Deleted"});
        });
      });

      app.use('/', router);

      app.listen(9000, function(){
        console.log('listening via server.js');
      });
})();
