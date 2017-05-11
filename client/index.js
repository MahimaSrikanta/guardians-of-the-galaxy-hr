var app = angular.module('in-your-face', ['webcam', 'ngFileUpload', 'ezfb', 'ngRoute'])

.config(function($routeProvider, $locationProvider, ezfbProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: '/templates/landing.html',
      controller: 'landingCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/classmates', {
      templateUrl: '/templates/rankings.html',
      controller: 'classmatesCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/classmates/:student', {
      templateUrl: '/templates/student.html',
      controller: 'studentCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/photobooth', {
      templateUrl: '/templates/motionDetect.html',
      controller: 'motionDetectCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })
    .when('/celebrities', {
      templateUrl: 'templates/rankings.html',
      controller: 'celebritiesCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    })

    // Basic setup
    // https://github.com/pc035860/angular-easyfb#configuration
    ezfbProvider.setInitParams({
      appId: '1929333797297736'
    });
})
.controller('landingCtrl', function(ezfb, $window) {
  this.goToClassmates = () => {
    $window.location.href = '/#/classmates';
  };

  this.goToCelebrities = () => {
    $window.location.href = '/#/celebrities';
  };

  this.goToFriends = () => {
    $window.location.href = '/#/friends';
  };

  //Facebook Login
  this.login = () => {
    // Calling FB.login with required permissions specified
    // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
    ezfb.login((res) => {
      console.log(res);
      // no manual $scope.$apply, I got that handled
      if (res.authResponse) { this.takePicPage = false; }
    }, {scope: 'email,user_likes'});
  };
})
.controller('classmatesCtrl', function(ezfb) {
  this.persons = [];
  this.galleryName = 'hrsf-76';
  this.picCallback = service.picCallback.bind(this);
})
.controller('celebritiesCtrl', function(ezfb, service) {
  this.persons = [];
  this.galleryName = 'celebrity';
  this.picCallback = service.picCallback.bind(this);
})
.controller('studentCtrl', function($routeParams, service) {
  this.student = $routeParams.student;
  this.attributes = {}

  service.getStudent(this.student, result => {
    this.attributes = result.data.images[0].faces[0].attributes;
  });
});
