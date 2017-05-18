export const collection = {
  "data": {
    "entities": {
      "jobs": {
        "57556": {
          "id": 57556,
          "organisation_id": 3299,
          "status": "PENDING",
          "title": "Senior Project Officer",
          "organisation_name": "Melbourne City Mission",
          "organisation_uid": "melbcitymission",
          "location": "Melbourne",
          "featured": false,
          "views": 0,
          "clicks": 0,
          "expired": false,
          "expiration": 1483509600000,
          "created_at": 1481508536000,
          "updated_at": 1481509764000
        },
        "57554": {
          "id": 57554,
          "organisation_id": 3299,
          "status": "PENDING",
          "title": "Foyer Plus Case Worker",
          "organisation_name": "Melbourne City Mission",
          "organisation_uid": "melbcitymission",
          "location": "Melbourne",
          "featured": false,
          "views": 0,
          "clicks": 0,
          "expired": false,
          "expiration": 1482386400000,
          "created_at": 1481505807000,
          "updated_at": 1481505993000
        },
        "57553": {
          "id": 57553,
          "organisation_id": 4178,
          "status": "PENDING",
          "title": "Chief Executive Officer",
          "organisation_name": "Being",
          "organisation_uid": "NSWCAG",
          "location": "Sydney",
          "featured": false,
          "views": 0,
          "clicks": 0,
          "expired": true,
          "expiration": 1484546400000,
          "created_at": 1481503967000,
          "updated_at": 1481504682000
        },
      }
    },
    "result": [
      57556,
      57554,
      57553,
    ]
  }
};

export const single = {
  "data": {
    "entities": {
      "jobs": {
        "57556": {
          "id": 57556,
          "organisation_id": 1654,
          "status": "PENDING",
          "title": "Senior Project Officer",
          "organisation_name": "Speech Pathology Australia",
          "organisation_uid": "SpeechPath",
          "location": "Melbourne",
          "featured": false,
          "views": 0,
          "clicks": 0,
          "expired": false,
          "expiration": 1483509600000,
          "created_at": 1481508536000,
          "updated_at": 1481509764000
        },
      },
    },
    "result": 57556,
  }
};

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});