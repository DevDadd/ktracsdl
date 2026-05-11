const { write } = require("node:fs");
const db = require("./db");

// async function addUsers() {
//     const res = db.query("FOR u in Users FILTER u.email == 'test@gmail.com' REMOVE u in Users");
//     console.log("Thành công ")
// }

// addUsers();


async function deleteExercise() {
    const trx = await db.beginTransaction({
        write: ["Exercises", "includes", "contains", "needs"],
    });

    try {

        await trx.step(() => {
            return db.query(`
                FOR e IN Exercises
                    FILTER e._key == 'ex_0'
                    REMOVE e IN Exercises
            `);
        });

        await trx.step(() => {
            return db.query(`
                FOR edge IN includes
                    FILTER edge._to == 'Exercises/ex_0'
                        OR edge._from == 'Exercises/ex_0'
                    REMOVE edge IN includes
            `);
        });

        await trx.step(() => {
            return db.query(`
                FOR edge IN contains
                    FILTER edge._to == 'Exercises/ex_0'
                        OR edge._from == 'Exercises/ex_0'
                    REMOVE edge IN contains
            `);
        });

        await trx.step(() => {
            return db.query(`
                FOR edge IN needs
                    FILTER edge._to == 'Exercises/ex_0'
                        OR edge._from == 'Exercises/ex_0'
                    REMOVE edge IN needs
            `);
        });

        await trx.commit();
        console.log("SUCCESS");

    } catch (e) {
        await trx.abort();
        console.log("FAILED");
        console.log(e);
    }
}


deleteExercise();