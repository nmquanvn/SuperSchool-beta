const path = require('path');

const knex = require('knex')({
  client: 'pg',
  searchPath: 'superschool',
  connection: {
    host: 'ec2-107-23-191-123.compute-1.amazonaws.com',
    user: 'wugnkgddbhxpda',
    password: 'd39ab45b9583e403b1ba2b57bdccab5340fef202167f113183f9c91708237432',
    database: 'd292tnhhqe64v7',
    port: 5432,
    ssl: true
  },
  pool: {
    min: 0,
    max: 50
  }
});

module.exports = knex;