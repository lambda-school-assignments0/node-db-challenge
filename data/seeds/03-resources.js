exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("resources")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("resources").insert([
                {
                    id: 1,
                    name: "Lambda Student",
                    description: "a soon to be hired developer"
                },
                {
                    id: 2,
                    name: "MacBook Pro #1",
                    description: "an overly expensive laptop computer"
                }
            ]);
        });
};
