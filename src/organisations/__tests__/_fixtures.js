export const collection = {
    "data": {
        "entities": {
            "organisations": {
                "1": {
                    "id": 1,
                    "uid": "BaysideCC",
                    "name": "Bayside City Council ",
                    "phone": "9599 4748  ",
                    "credit_balance": 0,
                    "created_at": 1472097958000,
                    "updated_at": 1472099645000,
                    "owner": {
                        "username": "BaysideCC",
                        "email": "scoote@bayside.vic.gov.au"
                    }
                },
                "2": {
                    "id": 2,
                    "uid": "Field",
                    "name": "Field",
                    "phone": "1300 360 185     ",
                    "credit_balance": 0,
                    "created_at": 1472089958000,
                    "updated_at": 1472098680000,
                    "owner": {
                        "username": "Field",
                        "email": "Felicity.Gaylard@ethicalJobs.com.au"
                    }
                },
                "3": {
                    "id": 3,
                    "uid": "GreaterGeraldton",
                    "name": "City of Greater Geraldton",
                    "phone": "(08) 9956 6934 ",
                    "credit_balance": 0,
                    "created_at": 1472089733000,
                    "updated_at": 1472096777000,
                    "owner": {
                        "username": "GreaterGeraldton",
                        "email": "JessicaR@cgg.wa.gov.au"
                    }
                },
                "4": {
                    "id": 4,
                    "uid": "KarralikaBS",
                    "name": "Karralika Programs",
                    "phone": "0396914700",
                    "credit_balance": 0,
                    "created_at": 1472080864000,
                    "updated_at": 1472080867000,
                    "owner": {
                        "username": "KarralikaBS",
                        "email": "creative@bigsplashworldwide.com"
                    }
                },
                "5": {
                    "id": 5,
                    "uid": "twsjobs",
                    "name": "Total Workforce Services",
                    "phone": "1300 731 148",
                    "credit_balance": 0,
                    "created_at": 1472042329000,
                    "updated_at": 1472042336000,
                    "owner": {
                        "username": "twsjobs",
                        "email": "jobs@totalworkforceservices.com.au"
                    }
                }
            }
        },
        "result": [
            1,
            2,
            3,
            4,
            5
        ]
    }
};


export const single = {
    "data": {
        "entities": {
            "organisations": {
                "5": {
                    "id": 5,
                    "uid": "twsjobs",
                    "name": "Total Workforce Services",
                    "phone": "1300 731 148",
                    "credit_balance": 0,
                    "created_at": 1472042329000,
                    "updated_at": 1472042336000,
                    "owner": {
                        "username": "twsjobs",
                        "email": "jobs@totalworkforceservices.com.au"
                    }
                }
            }
        },
        "result": 5,
    }
};

export const error = new Error('There was some kind of error', {
  message: 'There was some kind of error',
  statusCode: 500,
});