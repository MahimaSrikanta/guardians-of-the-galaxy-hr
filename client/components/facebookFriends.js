
app.controller('facebookFriendsCtrl', function(facebookService) {

  this.userDetails;
  this.friends;

  //Get Facebook user friends Details
  this.getFacebookFriendsDetails = (response) => {
    this.friends = (response.data);
  };
  //Get Facebook user details
  this.getUserDetails = (result) => {
    this.userDetails = result;
    //Get Facebook user FriendsList
    facebookService.facebookGetFriendsDetails(this.userDetails.data.user.token, this.getFacebookFriendsDetails);
  };
  facebookService.facebookIsLogged (this.getUserDetails);


});


