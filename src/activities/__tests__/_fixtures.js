export const success = {
  "data": {
    "entities": {
      "activity": {
        "15": {
          "id": 15,
          "description": "credits:deduct",
          "properties": {
            "reason": "This is a super long reason as to why credits are being changed. I'm purposely being very verbose with my reasoning so that I might be able to break the validation on the form and hopefully test it's resilience. ",
            "amount": "10"
          },
          "causer_id": 6761,
          "causer_type": "App\\Models\\User",
          "subject_id": 7754,
          "subject_type": "App\\Models\\Organisation",
          "created_at": {
            "date": "2018-04-09 17:19:58.000000",
            "timezone_type": 3,
            "timezone": "Australia/Melbourne"
          }
        }
      }
    },
    "result": [
      15
    ]
  }
}

export const single = {
  "data": {
    "entities": {
      "activity": {
        "15": {
          "id": 15,
          "description": "credits:deduct",
          "properties": {
            "reason": "This is a super long reason as to why credits are being changed. I'm purposely being very verbose with my reasoning so that I might be able to break the validation on the form and hopefully test it's resilience. ",
            "amount": "10"
          },
          "causer_id": 6761,
          "causer_type": "App\\Models\\User",
          "subject_id": 7754,
          "subject_type": "App\\Models\\Organisation",
          "created_at": {
            "date": "2018-04-09 17:19:58.000000",
            "timezone_type": 3,
            "timezone": "Australia/Melbourne"
          }
        }
      }
    },
    "result": [
      15
    ]
  }
}

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});