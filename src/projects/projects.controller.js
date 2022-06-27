const service = require("./projects.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//======== MAIN CONTROLLER FUNCTIONS FOR THIS ROUTER ========//
// List all projects from API
async function list(req, res, next) {
    const response = await service.list();
    res.json({ data: response });
}

// List one project from API
async function read(req, res, next) {
    res.json({ data: res.locals.project });
}

// Create new project to API
async function create(req, res, next) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}



//======== MIDDLEWARE VALIDATION FUNCTIONS FOR THIS ROUTER ========//
// Verify that a project exists before reading it
async function projectExists(req, res, next) {
    const { id } = req.params;
    const foundProject = await service.read(id);
    if (foundProject) {
        res.locals.project = foundProject;
        return next();
    } else next({ status: 404, message: `Project with id ${foundProject} does not exist.`});
}

// Verify that the project being created or updated has all required values and they are valid.
async function hasValidProperties(req, res, next) {
    const keys = ["title", "description", "date", "repo", "url", "thumbnail", "index-priority"];
    keys.forEach((key) => {
        if (!req.body.data[key]) next({ status: 400, message: `Body is missing a value: ${key}`});
        else if (key !== "index-priority" && typeof (req.body.data[key]) !== "string") next({ status: 400, message: `${key} must be a valid string.`})
    })

    let indexPriority = req.body.data["index-priority"];
    if (typeof(indexPriority) !== "number" || Number(indexPriority) < 1 || Number(indexPriority) > 5) next({ status: 400, message: `index-priority must be a number between 1 and 5.`})
    else next();
}

module.exports = {
    read: [
        asyncErrorBoundary(projectExists), 
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