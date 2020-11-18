
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
       
        tbl.increments()
        tbl.string('firstName', 255).notNullable()
        tbl.string('lastName', 255).notNullable()
        tbl.string('address', 125).notNullable()
        tbl.string('email', 255).notNullable().unique()
        tbl.string('password', 255).notNullable()
        tbl.integer('zipcode', 255).notNullable()
        
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
