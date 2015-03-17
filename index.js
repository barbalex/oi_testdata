/*
 * sets up:
 * - two project db's with test data for oi
 * - the message db that is required to pass messages between the server and the app
 *   via it's change stream
 * - the user db for z@z.ch
 *   it is needed primarily to sync the user's roles
 */

/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var _                 = require('underscore'),
    createSecurityDoc = require('./modules/createSecurityDoc'),
    nano              = require('nano')('http://barbalex:dLhdMg12@127.0.0.1:5984'),
    userName          = 'z__at__z__p__ch',
    userDbName        = 'user_' + userName,
    userDb,
    _usersDb,
    objects_o1o,
    objects_o10o,
    project_o1o,
    project_o10o,
    hierarchies_o10o,
    hierarchies_o1o,
    securityDoc,
    messageDbName;

objects_o1o = [
    {
        "_id": "o1o",
        "type": "object",
        "hId": "hh0",
        "parent": null,
        "projId": "o1o",
        "users": ["z@z.ch"],
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Projektname": "apflora.ch",
            "Bemerkungen": "Artförderprojekt der FNS Kt. Zürich",
            "testCheckbox": true,
            "testCheckboxGroup": ["value2", "value4"],
            "testCheckboxGroupWithValueListWithLabels": [100],
            "testOptions": "value2"
        }
    },
    {
        "_id": "o2o",
        "type": "object",
        "hId": "h11",
        "parent": "o1o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Art": 100,
            "Aktionsplan": 4
        }
    },
    {
        "_id": "o3o",
        "type": "object",
        "hId": "h21",
        "parent": "o2o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Name": "Niederhasli, Mettmenhaslisee",
            "Status": 3
        }
    },
    {
        "_id": "o4o",
        "type": "object",
        "hId": "h22",
        "parent": "o2o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Jahr": 2014,
            "Situation": "Im Jahr 2014 fanden 3 Anpflanzungen bzw. Populationsstärkungen (Zürich, Seeholzriet, reg. Torfstich Mitte; Zürich, Seeholzriet, Torfstich E Schwarzerle; Zürich, Hänsiried, Parz. 1790 N) in 2 Populationen statt."
        }
    },
    {
        "_id": "o5o",
        "type": "object",
        "hId": "h31",
        "parent": "o3o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Nr": 1,
            "Flurname": "Mettmenhaslisee"
        }
    },
    {
        "_id": "o55o",
        "type": "object",
        "hId": "h31",
        "parent": "o3o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Nr": 1,
            "Flurname": "irgendwo"
        }
    },
    {
        "_id": "o6o",
        "type": "object",
        "hId": "h32",
        "parent": "o3o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Jahr": 2009,
            "Entwicklung": 3
        }
    },
    {
        "_id": "o7o",
        "type": "object",
        "hId": "h41",
        "parent": "o5o",
        "projId": "o1o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Jahr": 2009,
            "Typ": 2
        }
    }
];

objects_o10o = [
    {
        "_id": "o10o",
        "type": "object",
        "hId": "hh0",
        "parent": null,
        "projId": "o10o",
        "users": ["z@z.ch"],
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Projektname": "AP FM Kt. Zürich",
            "Bemerkungen": "Aktionsplan Flachmoore des Kt. Zürich"
        }
    },
    {
        "_id": "o12o",
        "type": "object",
        "hId": "h111",
        "parent": "o10o",
        "projId": "o10o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Objektname": "Neeracherriet"
        }
    },
    {
        "_id": "o13o",
        "type": "object",
        "hId": "h121",
        "parent": "o12o",
        "projId": "o10o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Teilobjektname": "vorne links",
            "Geometrie": {
                "type": "Point",
                "coordinates": [902568, 5969980]
            },
            "Geometrie2": {
                "type": "Point",
                "coordinates": [902668, 5969990]
            }
        }
    },
    {
        "_id": "o14o",
        "type": "object",
        "hId": "h121",
        "parent": "o12o",
        "projId": "o10o",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Teilobjektname": "vorne rechts",
            "Geometrie": {
                "type": "LineString",
                "coordinates": [[902568, 5969980], [904380, 5969241]]
            }
        }
    }
];

hierarchies_o10o = [
    {
        "_id": "hh0",
        "type": "hierarchy",
        "parent": null,
        "projId": "o10o",
        "name": "Projekte",
        "nameField": "Projektname",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Projektname",
                "inputType": "input",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            },
            {
                "label": "Bemerkungen",
                "inputType": "textarea",
                "valueList": [],
                "order": 1,
                "inputDataType": "",
                "standardValue": ""
            },
            {
                "label": "testCheckbox",
                "inputType": "input",
                "valueList": [],
                "order": 1,
                "inputDataType": "checkbox",
                "standardValue": ""
            },
            {
                "label": "testCheckboxGroup",
                "inputType": "input",
                "valueList": ["value1", "value2", "value3", "value4", "value5"],
                "order": 1,
                "inputDataType": "checkboxGroup",
                "standardValue": ""
            },
            {
                "label": "testCheckboxGroupWithValueListWithLabels",
                "inputType": "input",
                "valueList": [{"value": 100, "label": "Abies alba Mill. (Weiss-Tanne)"}, {"value": 150, "label": "Abutilon theophrasti Medik."}],
                "order": 1,
                "inputDataType": "checkboxGroup",
                "standardValue": ""
            },
            {
                "label": "testOptions",
                "inputType": "input",
                "valueList": ["value1", "value2", "value3"],
                "order": 1,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h111",
        "type": "hierarchy",
        "parent": "hh0",
        "projId": "o10o",
        "order": 1,
        "name": "Objekte",
        "nameField": "Objektname",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Objektname",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h121",
        "type": "hierarchy",
        "parent": "h111",
        "projId": "o10o",
        "order": 1,
        "name": "Teilobjekte",
        "nameField": "Teilobjektname",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Teilobjektname",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            },
            {
                "label": "Geometrie",
                "inputType": "geoJson",
                "valueList": ["Polygon"],
                "order": 2,
                "inputDataType": null,
                "standardValue": "Polygon"
            },
            {
                "label": "Geometrie2",
                "inputType": "geoJson",
                "valueList": ["Polygon"],
                "order": 3,
                "inputDataType": null,
                "standardValue": "Polygon"
            }
        ]
    }
];

hierarchies_o1o = [
    {
        "_id": "hh0",
        "type": "hierarchy",
        "parent": null,
        "projId": "o1o",
        "name": "Projekte",
        "nameField": "Projektname",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Projektname",
                "inputType": "input",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            },
            {
                "label": "Bemerkungen",
                "inputType": "textarea",
                "valueList": [],
                "order": 1,
                "inputDataType": "",
                "standardValue": ""
            },
            {
                "label": "testCheckbox",
                "inputType": "input",
                "valueList": [],
                "order": 1,
                "inputDataType": "checkbox",
                "standardValue": ""
            },
            {
                "label": "testCheckboxGroup",
                "inputType": "input",
                "valueList": ["value1", "value2", "value3", "value4", "value5"],
                "order": 1,
                "inputDataType": "checkboxGroup",
                "standardValue": ""
            },
            {
                "label": "testCheckboxGroupWithValueListWithLabels",
                "inputType": "input",
                "valueList": [{"value": 100, "label": "Abies alba Mill. (Weiss-Tanne)"}, {"value": 150, "label": "Abutilon theophrasti Medik."}],
                "order": 1,
                "inputDataType": "checkboxGroup",
                "standardValue": ""
            },
            {
                "label": "testOptions",
                "inputType": "input",
                "valueList": ["value1", "value2", "value3"],
                "order": 1,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h11",
        "type": "hierarchy",
        "parent": "hh0",
        "projId": "o1o",
        "order": 1,
        "name": "Programme",
        "nameField": "Art",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Art",
                "inputType": "select",
                "valueList": [{"value": 100, "label": "Abies alba Mill. (Weiss-Tanne)"}, {"value": 150, "label": "Abutilon theophrasti Medik."}],
                "order": 1,
                "inputDataType": "",
                "standardValue": ""
            },
            {
                "label": "Aktionsplan",
                "inputType": "input",
                "valueList": [{"value": null, "label": "(kein Eintrag)"}, {"value": 1, "label": "keiner"}, {"value": 4, "label": "erstellt"}],
                "order": 2,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h21",
        "type": "hierarchy",
        "parent": "h11",
        "projId": "o1o",
        "order": 1,
        "name": "Populationen",
        "nameField": "Name",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Name",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            },
            {
                "label": "Status",
                "inputType": "input",
                "valueList": [{"value": 1, "label": "ursprünglich, aktuell"}, {"value": 3, "label": "angesiedelt, aktuell"}],
                "order": 2,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h31",
        "type": "hierarchy",
        "parent": "h21",
        "projId": "o1o",
        "order": 1,
        "name": "Teilpopulationen",
        "nameField": "Flurname",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Nr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            },
            {
                "label": "Flurname",
                "inputType": "text",
                "valueList": [],
                "order": 2,
                "inputDataType": "text",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h41",
        "type": "hierarchy",
        "parent": "h31",
        "projId": "o1o",
        "order": 1,
        "name": "Massnahmen",
        "nameField": "Jahr",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Jahr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            },
            {
                "label": "Typ",
                "inputType": "input",
                "valueList": [{"value": 1, "label": "spezial"}, {"value": 2, "label": "Ansiedlung: Ansaat"}],
                "order": 1,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h42",
        "type": "hierarchy",
        "parent": "h31",
        "projId": "o1o",
        "order": 2,
        "name": "Feldkontrollen",
        "nameField": "Jahr",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Jahr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h43",
        "type": "hierarchy",
        "parent": "h31",
        "projId": "o1o",
        "order": 3,
        "name": "Teilpopulations-Berichte",
        "nameField": "Jahr",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Jahr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h32",
        "type": "hierarchy",
        "parent": "h21",
        "projId": "o1o",
        "order": 2,
        "name": "Populations-Berichte",
        "nameField": "Jahr",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Jahr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            },
            {
                "label": "Entwicklung",
                "inputType": "input",
                "valueList": [{"value": 1, "label": "zunehmend"}, {"value": 3, "label": "abnehmend"}],
                "order": 2,
                "inputDataType": "optionGroup",
                "standardValue": ""
            }
        ]
    },
    {
        "_id": "h22",
        "type": "hierarchy",
        "parent": "h11",
        "projId": "o1o",
        "order": 2,
        "name": "AP-Berichte",
        "nameField": "Jahr",
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Jahr",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "number",
                "standardValue": ""
            },
            {
                "label": "Situation",
                "inputType": "textarea",
                "valueList": [],
                "order": 2,
                "inputDataType": "text",
                "standardValue": ""
            }
        ]
    }
];

nano.db.destroy('project_o1o', function (err, body) {
    // go on, if error 404 its o.k.
    //if (err) { console.log('err: ', err); }
    console.log('database project_o1o destroyed');
    nano.db.create('project_o1o', function (err, body) {
        if (err) { return console.log('err: ', err); }
        console.log('database project_o1o created');
        project_o1o = nano.use('project_o1o');
        _.each(hierarchies_o1o, function (hierarchie) {
            project_o1o.insert(hierarchie, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('hierarchies_o1o added');
            });
        });

        _.each(objects_o1o, function (object) {
            project_o1o.insert(object, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('objects_o1o added');
            });
        });

        // set up read permissions for the role
        // create security doc
        securityDoc = createSecurityDoc(null, 'project_o1o', 'barbalex');
        project_o1o.insert(securityDoc, '_security', function (err, body) {
            if (err) { return console.log('error setting _security in new user DB: ', err); }
            //console.log('answer from setting _security in new user DB: ', body);
        });
    });
});

nano.db.destroy('project_o10o', function (err, body) {
    // go on, if error 404 its o.k.
    //if (err) { console.log('err: ', err); }
    console.log('database project_o10o destroyed');
    nano.db.create('project_o10o', function (err, body) {
        if (err) { return console.log('err: ', err); }
        console.log('database project_o10o created');
        project_o10o = nano.use('project_o10o');
        _.each(hierarchies_o10o, function (hierarchie) {
            project_o10o.insert(hierarchie, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('hierarchies_o1o added');
            });
        });

        _.each(objects_o10o, function (object) {
            project_o10o.insert(object, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('objects_o1o added');
            });
        });

        // set up permissions for the role
        // create security doc
        securityDoc = createSecurityDoc(null, 'project_o10o', 'barbalex');
        project_o10o.insert(securityDoc, '_security', function (err, body) {
            if (err) { return console.log('error setting _security in new user DB: ', err); }
            //console.log('answer from setting _security in new user DB: ', body);
        });
    });
});

// dem user die Rollen geben
_usersDb = nano.use('_users');
_usersDb.get('org.couchdb.user:z@z.ch', function (err, userDoc) {
    if (userDoc.roles.indexOf('project_o1o') === -1) {
        userDoc.roles.push('project_o1o');
    }
    if (userDoc.roles.indexOf('project_o10o') === -1) {
        userDoc.roles.push('project_o10o');
    }
    _usersDb.insert(userDoc, function (err, body) {
        if (err) { console.log('error adding user roles: ', err); }
        console.log('user roles added: ', body);
    });
    // userDb schaffen
    nano.db.destroy(userDbName, function (err, body) {
        // ignore errors
        nano.db.create(userDbName, function (err) {
            if (err) { return console.log('error creating new user database ' + userDbName + ': ', err); }

            console.log('change: created new user db: ', userDbName);

            // set up read permissions for the user
            // create security doc
            securityDoc = createSecurityDoc(userName, null, 'barbalex');
            userDb = nano.use(userDbName);
            userDb.insert(securityDoc, '_security', function (err, body) {
                if (err) { return console.log('error setting _security in new user DB: ', err); }
                //console.log('answer from setting _security in new user DB: ', body);
            });

            // add the user as doc, without rev
            delete userDoc._rev;
            userDb.insert(userDoc, function (err, body) {
                if (err) { return console.log('error adding user doc to new user DB ' + userDbName + ': ', err); }
                //console.log('answer from adding user doc to new user DB: ', body);
            });
        });
    });
});

// message db schaffen
messageDbName = 'oiMessages';
nano.db.destroy(messageDbName, function (err, body) {
    // ignore errors
    nano.db.create(messageDbName, function (err) {
        if (err) { return console.log('error creating new message database ' + messageDbName + ': ', err); }

        console.log('change: created new message db: ', messageDbName);

        // set up read permissions for the user
        // create security doc
        securityDoc = createSecurityDoc(userName, null, 'barbalex');
        userDb = nano.use(messageDbName);
        userDb.insert(securityDoc, '_security', function (err, body) {
            if (err) { return console.log('error setting _security in new message DB: ', err); }
            //console.log('answer from setting _security in new user DB: ', body);
        });
    });
});