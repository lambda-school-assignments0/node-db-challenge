const db = require("../data/db-config.js");

function find() {
    return db("projects");
}

function findById(id) {
    return db("projects")
        .where({ id })
        .first();
}

function findProjResources(id) {
    return db
        .select("resources.name", "resources.description")
        .from("resources")
        .innerJoin(
            "project_resources",
            "project_resources.resource_id",
            "=",
            "resources.id"
        )
        .where("project_resources.project_id", "=", id);
}

function findProjTasks(id) {
    return db
        .select("tasks.*", "projects.name", "projects.description")
        .from("tasks")
        .innerJoin("projects", "projects.id", "=", "tasks.project_id")
        .where("tasks.project_id", "=", id);
}

function addProj(project) {
    return db("projects").insert(project);
}

module.exports = {
    find,
    findById,
    findProjResources,
    findProjTasks,
    addProj
};
