
exports.up = function(knex) {
    return knex.schema.createTable('Job-posting', tbl => {
       
        tbl.increments()
        tbl.string('jobTitle', 255).notNullable()
        tbl.string('description', 255).notNullable()
        tbl.string('pay', 125).notNullable()  
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Job-posting');
};