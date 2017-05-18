export const collection = {
   "data": {
      "entities": {
         "invoices": {
            "27339":{
               "id":27339,
               "uid":"2017_04_15_001",
               "organisation_id":5517,
               "organisation_uid":"ANSONManagement",
               "organisation_name":"ANSON Management Consulting",
               "service_name":"One job ad credit",
               "service_description":"Regular Job Ad Credits",
               "quantity":1,
               "download_url":"http:\/\/api.ethicaljobs.com.au\/organisation\/5517\/invoice\/27339",
               "amount":110,
               "total":121,
               "payment_method":"invoice",
               "created_at":1492233107000,
               "paid_at":null
            },
            "27338":{
               "id":27338,
               "uid":"2017_04_14_004",
               "organisation_id":4564,
               "organisation_uid":"TheSongRoom",
               "organisation_name":"The Song Room",
               "service_name":"One job ad credit",
               "service_description":"Regular Job Ad Credits",
               "quantity":1,
               "download_url":"http:\/\/api.ethicaljobs.com.au\/organisation\/4564\/invoice\/27338",
               "amount":110,
               "total":121,
               "payment_method":"invoice",
               "created_at":1492169140000,
               "paid_at":null
            },
            "27337":{
               "id":27337,
               "uid":"2017_04_14_003",
               "organisation_id":2974,
               "organisation_uid":"seebeyondborders",
               "organisation_name":"SeeBeyondBorders",
               "service_name":"Three job ad credits",
               "service_description":"Regular Job Ad Credits",
               "quantity":3,
               "download_url":"http:\/\/api.ethicaljobs.com.au\/organisation\/2974\/invoice\/27337",
               "amount":300,
               "total":330,
               "payment_method":"invoice",
               "created_at":1492137811000,
               "paid_at":null
            },
            "27336":{
               "id":27336,
               "uid":"2017_04_14_002",
               "organisation_id":164,
               "organisation_uid":"WAYSSJOBS",
               "organisation_name":"WAYSS Ltd",
               "service_name":"One job ad credit",
               "service_description":"Added Value Job Ad Credits",
               "quantity":1,
               "download_url":"http:\/\/api.ethicaljobs.com.au\/organisation\/164\/invoice\/27336",
               "amount":130,
               "total":143,
               "payment_method":"invoice",
               "created_at":1492122937000,
               "paid_at":null
            },
         },
      },
      "result":[
         27339,
         27338,
         27337,
         27336
      ]
   }
};

export const single = {
  "data": {
    "entities": {
      "invoices": {
        "27336": {
          "id":27336,
          "uid":"2017_04_14_002",
          "organisation_id":164,
          "organisation_uid":"WAYSSJOBS",
          "organisation_name":"WAYSS Ltd",
          "service_name":"One job ad credit",
          "service_description":"Added Value Job Ad Credits",
          "quantity":1,
          "download_url":"http:\/\/api.ethicaljobs.com.au\/organisation\/164\/invoice\/27336",
          "amount":130,
          "total":143,
          "payment_method":"invoice",
          "created_at":1492122937000,
          "paid_at":null
        },
      },
    },
    "result": 27336,
  }
};

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});