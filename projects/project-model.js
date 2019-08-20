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
        .select("tasks.*", "projects.name as project_name", "projects.description as project_description")
        .from("tasks")
        .innerJoin("projects", "projects.id", "=", "tasks.project_id")
        .where("tasks.project_id", "=", id);
}

function addProj(project) {
    return db("projects").insert(project);
}

async function addResource(project_id, resource) {
    const [ resource_id ] = await db("resources").insert(resource);
    console.log(project_id, resource_id)
    return db("project_resources").insert({
        project_id: project_id,
        resource_id: resource_id
    });
}

function addTask(task) {
    return db("tasks").insert(task);
}

module.exports = {
    find,
    findById,
    findProjResources,
    findProjTasks,
    addProj,
    addResource,
    addTask
};
