
exports.up = function(knex) {
    return knex.schema
        .createTable("projects", tbl => {
            tbl.increments();
            tbl.string("name", 128)
                .notNullable();
            tbl.string("description", 128)
                .notNullable();
            tbl.boolean("completed")
                .defaultTo(false)
        })
        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.string("description", 128)
                .notNullable();
            tbl.string("notes", 128)
            tbl.boolean("completed")
                .defaultTo(false)
            tbl.integer("project_id", 128)
                .unsigned()
                .notNullable()
                .references("resources.id");
        })
        .createTable("resources", tbl => {
            tbl.increments();
            tbl.string("name", 128)
                .notNullable()
                .unique();
            tbl.string("description", 128)
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
