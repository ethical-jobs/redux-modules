export const success = {
  "data": {
    "entities": {
      "alerts": {
        "14": {
          "id": 14,
          "frequency": "daily",
          "keyword": "communications",
          "categories": 42,
          "locations": 11,
          "workTypes": null,
          "created_at": 1512435775000,
          "updated_at": 1512435775000
        },
        "18": {
          "id": 18,
          "frequency": "daily",
          "keyword": "counsellor",
          "categories": 38,
          "locations": 15,
          "workTypes": null,
          "created_at": 1512435775000,
          "updated_at": 1512435775000
        }
      },
      "subscriptions": {
        "34": {
          "id": 34,
          "alert_id": 14,
          "email": "schroeder.griffin@yahoo.com",
          "created_at": 1512435847000
        },
        "41": {
          "id": 41,
          "alert_id": 18,
          "email": "schroeder.griffin@yahoo.com",
          "created_at": 1512435847000
        }
      }
    },
    "result": [
      34,
      41
    ]
  }
}

export const single = {
  "data": {
    "entities": {
      "alerts": {
        "15": {
          "id": 15,
          "frequency": "daily",
          "keyword": null,
          "categories": 16,
          "locations": null,
          "workTypes": 3,
          "created_at": 1512435775000,
          "updated_at": 1512435775000
        }
      },
      "subscriptions": {
        "3": {
          "id": 3,
          "alert_id": 15,
          "email": "felix.muller@feest.com",
          "created_at": 1512435847000
        }
      }
    },
    "result": [
      3
    ]
  }
}

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});