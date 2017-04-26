import { ApiError } from 'ethical-jobs-sdk';

export const single = {
  "data": {
    "entities": {
      "organisations": {
        "4943": {
          "id": 4943,
          "owner_id": 5152,
          "uid": "EthicalJobs",
          "name": "EthicalJobs.com.au",
          "logo_url": "//s3-ap-southeast-2.amazonaws.com/ethical-jobs/media/1474427561_UJe6u_.jpeg",
          "paid_staff": 0,
          "volunteers": 0,
          "phone": "03 9419 7322",
          "address": "PO Box 2618",
          "suburb": "Fitzroy",
          "state": "VIC",
          "postcode": "3065",
          "country": "AU",
          "credit_balance": 779,
          "invoice_count": 6,
          "pending_job_count": 0,
          "approved_job_count": 0,
          "expired_job_count": 52,
          "created_at": 1251258512000,
          "updated_at": 1481595840000,
          "deleted_at": null
        }
      },
      "users": {
        "5151": {
          "id": 5151,
          "organisation_id": 4943,
          "first_name": "Andrew",
          "last_name": "McLagan",
          "bio": " ",
          "avatar": "https://s3-ap-southeast-2.amazonaws.com/ethical-jobs/statics/staff/am-Andrew.jpg",
          "email": "andrew@ethicaljobs.com.au",
          "username": "andrewmclagan",
          "phone": null,
          "role": "SUPER_ADMIN",
          "position": "Fullstack Developer",
          "last_login": 1482370113000
        }
      }
    },
    "result": [5151]
  },
  "meta": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUxNTEsImlzcyI6Imh0dHA6XC9cL2FwaS5ldGhpY2Fsam9icy5jb20uYXVcL2F1dGhcL2xvYWQiLCJpYXQiOjE0ODI0MDU4NzQsImV4cCI6MTQ4MzAxMDY3NCwibmJmIjoxNDgyNDA1ODc0LCJqdGkiOiI0OTRhZWIzYmQ2OWMzZGQ1MDI5MmMwYjEyYzNmYjc2MyIsInVpZCI6NTE1MSwib3JnYW5pc2F0aW9uX3VpZCI6IkV0aGljYWxKb2JzIiwicm9sZSI6IlNVUEVSX0FETUlOIn0.zYotydxAujeSByBGfTNDxcGyFjbaUvNrppMVcsRlteo"
  }
};

export const error = new ApiError('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});