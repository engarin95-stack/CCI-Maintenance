const sqlite3 = require("sqlite3").verbose();

const tasksDb = new sqlite3.Database("./tasks.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to Tasks Database.");

    tasksDb.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        title TEXT NOT NULL,
        description TEXT,

        assignment_type TEXT NOT NULL,
        assigned_to TEXT NOT NULL,

        machine TEXT,

        priority TEXT NOT NULL,

        due_date TEXT,

        status TEXT DEFAULT 'Open',

        created_by TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        completed_by TEXT,
        completed_at DATETIME,

        completion_note TEXT
      )
    `);
  }
});

module.exports = tasksDb;