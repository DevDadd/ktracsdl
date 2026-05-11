'use strict';

const createRouter = require('@arangodb/foxx/router');
const { write } = require('node:fs');
const db = require('@arangodb').db;
const router = createRouter();

module.context.use(router);

router.post("/create-course", function (req, res) {
    db._executeTransaction({
        collections: {
            write: ["Courses", "includes"]
        },
        action: function () {
            const cursor = db.query("INSERT {title:'Hi Nigga', description: 'Black', difficulty: 'Beginner',} into Courses");
            db.query("INSERT {_from:'Session/ws_08', _to:'Exercises/ex_9', max_weight_use: 10, reps: 12, sets:3  } into includes");
        }
    });
    res.send({
        message: "SUCCESS"
    })
})