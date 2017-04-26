import { ApiError } from 'ethical-jobs-sdk';

export const collection = {
   "data":{
      "entities":{
         "categories":{
            "1":{
               "term_id":1,
               "name":"Uncategorized",
               "slug":"uncategorized",
               "term_group":0,
               "term_taxonomy_id":1,
               "taxonomy":"category",
               "description":"",
               "parent":0,
               "count":1,
               "filter":"raw"
            }
         },
         "posts":{
            "1":{
               "id":1,
               "date":"2017-02-17T09:04:51",
               "modified":"2017-02-17T09:04:51",
               "slug":"hello-world",
               "status":"publish",
               "type":"post",
               "title":"Hello world!",
               "content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n",
               "author":1,
               "featured_media":false,
               "sticky":false,
               "meta":[

               ],
               "categories":[
                  1
               ],
               "tags":[

               ]
            },
            "2":{
               "id":2,
               "date":"2017-02-17T09:04:51",
               "modified":"2017-02-17T09:04:51",
               "slug":"hello-world-2",
               "status":"publish",
               "type":"post",
               "title":"Hello world! 2",
               "content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n",
               "author":1,
               "featured_media":false,
               "sticky":false,
               "meta":[

               ],
               "categories":[
                  1
               ],
               "tags":[

               ]
            },
            "3":{
               "id":3,
               "date":"2017-02-17T09:04:51",
               "modified":"2017-02-17T09:04:51",
               "slug":"hello-world-3",
               "status":"publish",
               "type":"post",
               "title":"Hello world! 3",
               "content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n",
               "author":1,
               "featured_media":false,
               "sticky":false,
               "meta":[

               ],
               "categories":[
                  1
               ],
               "tags":[

               ]
            }
         }
      },
      "result":[
         1, 2, 3
      ]
   }
};

export const single = {
   "data":{
      "entities":{
         "categories":{
            "1":{
               "term_id":1,
               "name":"Uncategorized",
               "slug":"uncategorized",
               "term_group":0,
               "term_taxonomy_id":1,
               "taxonomy":"category",
               "description":"",
               "parent":0,
               "count":1,
               "filter":"raw"
            }
         },
         "posts":{
            "1":{
               "id":1,
               "date":"2017-02-17T09:04:51",
               "modified":"2017-02-17T09:04:51",
               "slug":"hello-world",
               "status":"publish",
               "type":"post",
               "title":"Hello world!",
               "content":"<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!<\/p>\n",
               "author":1,
               "featured_media":false,
               "sticky":false,
               "meta":[

               ],
               "categories":[
                  1
               ],
               "tags":[

               ]
            }
         }
      },
      "result":[
         1
      ]
   }
};

export const error = new ApiError('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});