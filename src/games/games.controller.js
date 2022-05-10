const service = require("./games.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//======== MAIN CONTROLLER FUNCTIONS FOR THIS ROUTER ========//
// List all games from API
async function list(req, res, next) {
    const response = await service.list();
    res.json({ data: response });
}

// List one game from API
async function read(req, res, next) {
    res.json({ data: res.locals.game });
}

// Create new game to API
async function create(req, res, next) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}



//======== MIDDLEWARE VALIDATION FUNCTIONS FOR THIS ROUTER ========//
// Verify that a game exists before reading it
async function gameExists(req, res, next) {
    const { game_id } = req.params;
    const foundGame = await service.read(game_id);
    if (foundGame) {
        res.locals.game = foundGame;
        return next();
    } else next({ status: 404, message: `Game with id ${game_id} does not exist.`});
}

// Verify that the game being created or updated has all required values and they are valid.
async function hasValidProperties(req, res, next) {
    let { rating, multiplayer } = req.body.data;
    if (multiplayer === "true") multiplayer = true;
    if (multiplayer === "false") multiplayer = false;
    const keys = [ 'game_title', 'game_release', 'game_image', 'rating', 'platform'];

    keys.forEach((key) => {
        if (!req.body.data[key]) next({ status: 400, message: `Body is missing a value: ${key}`});
    })

    if (typeof(rating) !== "number" || Number(rating) < 1 || Number(rating) > 5) next({ status: 400, message: `Rating must be a number between 1 and 5.`})
    else if (typeof(multiplayer) !== "boolean") next({ status: 400, message: `Multiplayer must be a boolean value.`})
    else next();
}

module.exports = {
    read: [
        asyncErrorBoundary(gameExists), 
        asyncErrorBoundary(read)
    ],
    list: [
        asyncErrorBoundary(list)
    ],
    create: [
        asyncErrorBoundary(hasValidProperties), 
        asyncErrorBoundary(create)
    ]
}