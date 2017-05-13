angular.module('in-your-face')
  .controller('navBarCtrl', function ($location, $cookies, facebookService) {
    this.displayUser = false;



    this.logoutCallback = (response) => {
      if (response.data.user === null) {
        $location.path('/');
      }
    };
    this.logout = () => {
      facebookService.facebookLogout(this.logoutCallback);
    };

    this.getfriendsDetails = (response) => {
      this.userFullDetails = response;
      console.log(response.data.email);
    };

    this.getUserDetails = (result) => {
      if (result.data.auth) {
        this.userDetails = result.data.user;
        this.displayUser = true;
        //get user profile picture
        facebookService.facebookGetUserDetails(this.userDetails.token, this.getfriendsDetails);
      }
    };
    facebookService.facebookIsLogged(this.getUserDetails);

  })
  .directive('navBar', function () {
    return {
      scope: {
      },
      restrict: 'E',
      controllerAs: 'ctrl',
      bindToController: true,
      controller: 'navBarCtrl',
      templateUrl: './templates/navBar.html'
    };
  });
