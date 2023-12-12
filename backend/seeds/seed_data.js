exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('usergroup').del()
    .then(function () {
      // Inserts seed entries
      return knex('usergroup').insert([
        {"code": "ADMIN", "name": "Administrators"},
        {"code": "STUDENT", "name": "Student"},
        {"code": "TEACHER", "name": "Teacher"}
      ]);
    }),
  ]);
};
