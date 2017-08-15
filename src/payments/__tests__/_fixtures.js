export const success = {
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
          "paid_at":1492122937000,
        },
      },
    },
    "result": 27336,
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