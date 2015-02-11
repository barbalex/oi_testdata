/*jslint node: true, browser: true, nomen: true, todo: true */
'use strict';

var nano = require('nano')('http://barbalex:dLhdMg12@127.0.0.1:5984'),
    oiDb = nano.use('oi'),
    _    = require('underscore');

var objects = [
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Jahr": 2009,
            "Typ": 2
        }
    },
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
        "users": ["z@z.ch"],
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
        "users": ["z@z.ch"],
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "data": {
            "Teilobjektname": "vorne links"
        }
    }
];

var hierarchies = [
    {
        "_id": "hh0",
        "type": "hierarchy",
        "parent": null,
        "name": "Projekte",
        "nameField": "Projektname",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 1,
        "name": "Programme",
        "nameField": "Art",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 1,
        "name": "Populationen",
        "nameField": "Name",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 1,
        "name": "Teilpopulationen",
        "nameField": "Flurname",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 1,
        "name": "Massnahmen",
        "nameField": "Jahr",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 2,
        "name": "Feldkontrollen",
        "nameField": "Jahr",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 3,
        "name": "Teilpopulations-Berichte",
        "nameField": "Jahr",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 2,
        "name": "Populations-Berichte",
        "nameField": "Jahr",
        "users": ["z@z.ch"],
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
        "projIds": ["o1o"],
        "order": 2,
        "name": "AP-Berichte",
        "nameField": "Jahr",
        "users": ["z@z.ch"],
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
    },
    {
        "_id": "h111",
        "type": "hierarchy",
        "parent": "hh0",
        "projIds": ["o10o"],
        "order": 1,
        "name": "Objekte",
        "nameField": "Objektname",
        "users": ["z@z.ch"],
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
        "projIds": ["o10o"],
        "order": 1,
        "name": "Teilobjekte",
        "nameField": "Teilobjektname",
        "users": ["z@z.ch"],
        "lastEdited": {"date": "02.01.2015", "user": "z@z.ch", "database": null},
        "fields": [
            {
                "label": "Teilobjektname",
                "inputType": "text",
                "valueList": [],
                "order": 1,
                "inputDataType": "text",
                "standardValue": ""
            }
        ]
    }
];

nano.db.destroy('oi', function (err, body) {
    if (err) { return console.log('err: ', err); }
    console.log('oi destroyed');
    nano.db.create('oi', function (err, body) {
        if (err) { return console.log('err: ', err); }
        console.log('oi created');
        _.each(hierarchies, function (hierarchie) {
            oi.insert(hierarchie, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('body: ', body);
            });
        });

        _.each(objects, function (object) {
            oi.insert(object, function (err, body) {
                if (err) { console.log('err: ', err); }
                console.log('body: ', body);
            });
        });
    });
});