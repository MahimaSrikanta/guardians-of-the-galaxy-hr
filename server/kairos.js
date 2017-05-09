const request = require('request');
const api = require('../config/api.js');
const Promise = require('bluebird');
const database = require('../database');
const apiKey = process.env.kairosApiKey || api.kairos.app_key;
const appId = process.env.kairosAppId || api.kairos.app_id;
const kairosApiUrl = 'https://api.kairos.com';

const enroll = (person, galleryName, callback) => {
  const userName = person.userName;
  const filePath = person.filePath;

  request({
    method: 'POST',
    url: kairosApiUrl + '/enroll',
    headers: {
      'app_id': appId,
      'app_key': apiKey
    },
    body: `{"image": "${filePath}",  "subject_id": "${userName}",  "gallery_name": "${galleryName}"}`
  }, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body);
    }
  });
}

module.exports.enroll = enroll;

const removeGallery = (galleryName, callback) => {
  request({
    method: 'POST',
    url: kairosApiUrl + '/gallery/remove',
    headers: {
      'app_id': appId,
      'app_key': apiKey
    },
    body: `{"gallery_name": "${galleryName}"}`
  }, (err, res, body) => {
    if (err) {
      callback(err);
    } else {
      callback(err, body);
    }
  });
};

module.exports.removeGallery = removeGallery;

const recognize = (uploadImage, galleryName, callback) => {
  let body = {
    image: uploadImage,
    gallery_name: galleryName,
    threshold: 0.00001,
    max_num_results: 50
  };

  body = JSON.stringify(body);

  let options = {
    method: 'POST',
    url: kairosApiUrl + '/recognize',
    headers: {
      'app_id': appId,
      'app_key': apiKey
    },
    body: body
  };

  request(options, (error, results, body) => {
    if (error) {
      console.log(error);
    } else {
      if (JSON.parse(body).Errors) {
        console.log(JSON.parse(body).Errors);
      } else {
        let persons = JSON.parse(body).images[0].candidates;
        return Promise.map(persons,  (person) => {
          return database.photo.findAsync({userName: person.subject_id, galleryName: galleryName})
          .then((result) => {
            person.imageUrl = result[0].filePath;
            return person;
          });
        })
        .then((result) => {
          callback(result);
        })
        .catch((error) => {
          console.log('ERROR RECOGNIZING-----', error);
        });
      }
    }
  });
};

module.exports.recognize = recognize;

const analyze = () => {
  console.log ('kairos analyze');
  const options = {
    method: 'GET',
    url: api.kairos.api_url + '/v2/analytics/591119d02683c6244139',
    headers: {
      'app_id': api.kairos.app_id,
      'app_key': api.kairos.app_key
    }
  };
  request(options, (error, results, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log ('analyze results', results);
      console.log ('analyze body', body);
    }
  });
};

module.exports.analyze = analyze;
