app.service('service', function($http, Upload) {
  //send base64 encoded image to server
  this.uploadFile = function (file, galleryName, callback) {
    Upload.upload({
      url: 'upload/url/' + galleryName,
      data: {file: file}
    }).then(function (resp) {
      console.log('Success ', typeof(resp));
      callback(resp);
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  this.getStudent = function(student, callback) {
    console.log ('get student service');
    var options = {
      method: 'GET',
      url: '/classmates/' + student,
    };

    $http(options)
    .then(
      function success(result) {
        callback (result);
      },
      function error(err) {
        console.log (err);
      }
    );
  };

  this.picCallback = function(response) {
    console.log ('this', this);
    console.log('FROM PIC CALLBACK', response.data);
    this.persons = response.data.map(person => {
      var confidence = (person.confidence * 100).toFixed(1);
      return {
        name: person.subject_id,
        imageUrl: person.imageUrl,
        confidence: confidence
      };
    });
  };

});