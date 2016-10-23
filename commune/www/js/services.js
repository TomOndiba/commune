// socket connection
var socket = io('https://localhost:8000');

socket.on('connect', function(){
  console.log("user is connected!");
});

angular.module('starter.services', [])

.service('LoginService', function($q){
  return {
    loginUser: function(name, pw){
      var deferred = $q.defer();
      var promise = deferred.promise;

      if(name == 'user' && pw == 'secret'){
        deferred.resolve('Welcome ' + name + '!');
      }else{
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn){
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn){
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('SignupService', function($q){
    return{
      createUser: function(fname, uname, pword, a, htown, lan, sta, ofw, christ, spirit){
        var deferred = $q.defer();
        var promise = deferred.promise;

        socket.on('connect', function(){
          var userdata = [{
            "fullname": fname,
            "username": uname,
            "password": pword,
            "age": a,
            "hometown": htown,
            "language": lan,
            "status": sta,
            "isOFW": ofw,
            "isChristian": christ,
            "isSpiritual": spirit
          }];
            socket.emit('create', userdata);
          });

          deferred.resolve('Welcome ' + fname + '!');

        // if(fname != null && uname == null && pword != null && a != null && htown != null || lan != null){
        //
        // }else{
        //     deferred.reject('Wrong Credentials.');
        // }

        promise.success = function(fn){
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn){
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }
    }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Mock data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
