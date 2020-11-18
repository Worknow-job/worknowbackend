// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/work.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
  }
}
};