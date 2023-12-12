// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    searchPath: 'superschool',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'SuperSchool',
      port: 5432
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'SuperSchool',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: '123456',
      database: 'SuperSchool',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
