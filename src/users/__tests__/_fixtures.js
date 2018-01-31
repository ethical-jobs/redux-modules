export const collection = {
   "data": {
      "entities": {
         "users": {
            "5151":{
               "id":5151,
               "full_name":"Andrew McLagan",
               "email":"andrew@ethicaljobs.com.au"
            },
            "27264":{
               "id":27264,
               "full_name":"Sebastian Someone",
               "email":"sebastian@ethicaljobs.com.au"
            },
            "2827":{
               "id":2827,
               "full_name":"Mike Cebon",
               "email":"michael@ethicaljobs.com.au"
            },
         },
      },
      "result":[
         5151,
         27264,
         2827
      ]
   }
};

export const single = {
  "data": {
    "entities": {
      "users": {
        "5151":{
           "id":5151,
           "full_name":"Andrew McLagan",
           "email":"andrew@ethicaljobs.com.au"
        },
      },
    },
    "result": 5151,
  }
};

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});