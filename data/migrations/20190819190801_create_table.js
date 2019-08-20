
exports.up = function(knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments();
            tbl.string("project_name", 128)
                .notNullable();
            tbl.string("project_description", 128)
                .notNullable();
        })
        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.string("task_description", 128)
                .notNullable();
            tbl.string("task_notes", 128)
        })
        .createTable("resources", tbl => {
            tbl.increments();
            tbl.string("resource_name", 128)
                .notNullable()
                .unique();
            tbl.string("resource_description", 128)
        })
        .createTable("project_resources", tbl => {
            tbl.integer("project_id")
                .unsigned()
                .notNullable()
                .references("projects.id");
            tbl.integer("resource_id")
                .unsigned()
                .notNullable()
                .references("resources.id");
            tbl.primary(["project_id", "resource_id"])
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("project_resources")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("projects");
};
