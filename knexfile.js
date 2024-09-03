require('dotenv').config(); 

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  staging: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST_STAGING,
      user: process.env.DB_USER_STAGING,
      password: process.env.DB_PASSWORD_STAGING,
      database: process.env.DB_NAME_STAGING
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};
