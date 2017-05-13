app.service('facebookService', function ($http) {

  //Facebook User is loggedIn and get user details
  this.facebookIsLogged = (callback) => {
    var options = {
      method: 'GET',
      url: '/isLoggedIn',
    };
    $http(options)
      .then(
      function success(result) {
        callback(result);
      },
      function error(err) {

      });

  };

  //Facebook Logout
  this.facebookLogout = (logoutCallback) => {
    var options = {
      method: 'GET',
      url: '/logout',
    };
    $http(options)
      .then(
      function success(result) {
        logoutCallback(result);
      },
      function error(err) {
        console.log(err);
      });
  };

  // Get user's full Details
  this.facebookGetUserDetails = (userDetails, callback) => {
    var options = {
      method: 'GET',
      url: '/facebook/getDetails',
      params: { token: userDetails },
    };
    $http(options)
      .then(
      function success(result) {
        callback(result);

      },
      function error(err) {

      });

  };

  //Get user's friends Details
  this.facebookGetFriendsDetails = (userToken, callback) => {
    var options = {
      method: 'GET',
      url: '/facebook/getFriendsDetails',
      params: { token: userToken },
    };
    $http(options)
      .then(
      function success(result) {
        callback(result);

      },
      function error(err) {
        console.log(err);
      });

  };


});