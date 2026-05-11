const { Database } = require("arangojs");

const db = new Database({
    url: "http://localhost:8529",
    databaseName: "fitness_app",
    auth: { username: "root", password: "123456" }
});

module.exports = db;