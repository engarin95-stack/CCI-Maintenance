const sqlite3 = require("sqlite3").verbose();

const usersDb = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to Users Database.");

    usersDb.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        fullname TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    usersDb.run(`
      INSERT OR IGNORE INTO users
      (username, password, fullname, role)
      VALUES
      ('ahmed','1234','Ahmed','Technician'),
      ('basher','1234','Basher','Technician'),
      ('redar','1234','Redar','Technician'),
      ('admin','admin123','Administrator','Admin')
    `);
  }
});

module.exports = usersDb;