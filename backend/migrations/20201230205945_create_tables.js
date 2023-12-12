
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTableIfNotExists('usergroup', function (table) {
      table.bigIncrements('usergroupid');
      table.string('code', 20).notNullable().unique();
      table.string('name', 20).notNullable();
      table.text('description');
    }),
    knex.schema.createTableIfNotExists('user', function (table) {
      table.bigIncrements('userid');
      table.string('username', 50).unique().notNullable();
      table.string('password').notNullable();
      table.string('fullname', 50).notNullable();
      table.string('phonenumber', 12);
      table.string('email', 50);
      table.string('refresh_token').notNullable();
      table.bigInteger('usergroupid').notNullable().references('usergroupid').inTable('usergroup').onUpdate('CASCADE').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('category', function (table) {
      table.bigIncrements('categoryid');
      table.string('name').notNullable();
      table.string('code', 20).notNullable().unique();
      table.bigInteger('parentid').references('categoryid').inTable('category').onUpdate('CASCADE').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('course', function (table) {
      table.bigIncrements('courseid');
      table.string('title').notNullable();
      table.string('imagePath');
      table.string('description');
      table.string('detailDescription');
      table.bigInteger('views').notNullable().default(0);
      table.timestamp('createddate').notNullable();
      table.timestamp('updateddate');
      table.decimal('price', 1000, 2).notNullable();
      table.bigInteger('categoryid').references('categoryid').inTable('category').onUpdate('CASCADE').onDelete('CASCADE');
      table.bigInteger('teacherid').notNullable().references('userid').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('student_course', function (table) {
      table.bigIncrements('studentcourseid');
      table.bigInteger('studentid').notNullable().references('userid').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
      table.bigInteger('courseid').notNullable().references('courseid').inTable('course').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamp('createddate').notNullable();
    }),
    knex.schema.createTableIfNotExists('review', function (table) {
      table.bigIncrements('reviewid');
      table.string('comment').notNullable();
      table.integer('rating').notNullable();
      table.bigInteger('courseid').notNullable().references('courseid').inTable('course').onUpdate('CASCADE').onDelete('CASCADE');
      table.bigInteger('userid').notNullable().references('userid').inTable('user').onUpdate('CASCADE').onDelete('CASCADE');
      table.timestamp('createddate').notNullable();
      table.timestamp('updateddate');
    }),
    knex.schema.createTableIfNotExists('promotion', function (table) {
      table.bigIncrements('promotionid');
      table.string('name').notNullable();
      table.string('code', 20).notNullable();
      table.decimal('value', 1000, 2).notNullable();
      table.timestamp('createddate').notNullable();
    }),
    knex.schema.createTableIfNotExists('coursepromotion', function (table) {
      table.bigIncrements('coursepromotionid');
      table.bigInteger('courseid').notNullable().references('courseid').inTable('course').onUpdate('CASCADE').onDelete('CASCADE');
      table.bigInteger('promotionid').notNullable().references('promotionid').inTable('promotion').onUpdate('CASCADE').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('coursevideo', function (table) {
      table.bigIncrements('coursevideoid');
      table.string('videopath').notNullable();
      table.integer('orderno').notNullable();
      table.bigInteger('courseid').notNullable().references('courseid').inTable('course').onUpdate('CASCADE').onDelete('CASCADE');
      table.unique('courseid', 'orderno');
    }),
  ])
};

exports.down = function (knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('coursevideo'),
    knex.schema.dropTableIfExists('coursepromotion'),
    knex.schema.dropTableIfExists('promotion'),
    knex.schema.dropTableIfExists('review'),
    knex.schema.dropTableIfExists('student_course'),
    knex.schema.dropTableIfExists('course'),
    knex.schema.dropTableIfExists('category'),
    knex.schema.dropTableIfExists('user'),
    knex.schema.dropTableIfExists('usergroup'),
  ]);
};
