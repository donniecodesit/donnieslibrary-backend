const { PORT = 5000 } = process.env;
const app = require("./app");
const knex = require("./db/connection");

knex.migrate
    .latest()
    .then((migrations) => {
        console.log("migrations: ", migrations);
        app.listen(PORT, onReady);
    })
    .catch((error) => {
        console.error(error);
        knex.destroy();
    })

function onReady() {
    console.log(`Ready! Listening on port ${PORT}`);
}