const service = require("./comments.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const blacklistedWords = require("./blacklistedWords.js");

//======== MAIN CONTROLLER FUNCTIONS FOR THIS ROUTER ========//
// List all comments from API
async function list(req, res, next) {
    const response = await service.list();
    res.json({ data: response });
}

// List one comment from API
async function read(req, res, next) {
    res.json({ data: res.locals.comment });
}

// Create new comment to API
async function create(req, res, next) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}



//======== MIDDLEWARE VALIDATION FUNCTIONS FOR THIS ROUTER ========//
// Verify that a comment exists before reading it
async function commentExists(req, res, next) {
    const { comment_id } = req.params;
    const foundComment = await service.read(comment_id);
    if (foundComment) {
        res.locals.comment = foundComment;
        return next();
    } else next({ status: 404, message: `Comment with id ${comment_id} does not exist.`});
}

// Verify that the comment being created or updated has all required values and they are valid.
async function hasValidProperties(req, res, next) {
    let { firstName, lastName, pronouns, comment } = req.body.data;
    const keys = [ 'firstName', 'lastName', 'pronouns', 'comment' ];

    keys.forEach((key) => {
        if (!req.body.data[key]) next({ status: 400, message: `Body is missing a value: ${key}`});
    })

    if (typeof(pronouns) !== "number" || Number(pronouns) < 1 || Number(pronouns) > 3) next({ status: 400, message: `Pronouns must be an option between 1 and 3.`})
    else next();
}

async function passesBlacklist(req, res, next) {
    let { comment } = req.body.data;
    const blacklistRegex = new RegExp('\\b' + blacklistedWords.join('\\b|\\b') + '\\b', 'g');
    const badWords = comment.toLowerCase().match(blacklistRegex);
    if (badWords) next({ status: 400, message: `Apologies, but your message has language that cannot be commented.`});
    else next();
}

module.exports = {
    read: [
        asyncErrorBoundary(commentExists), 
        asyncErrorBoundary(read)
    ],
    list: [
        asyncErrorBoundary(list)
    ],
    create: [
        asyncErrorBoundary(hasValidProperties), 
        asyncErrorBoundary(passesBlacklist),
        asyncErrorBoundary(create)
    ]
}