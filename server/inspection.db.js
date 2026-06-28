const sqlite3 = require("sqlite3").verbose();

const inspectionDb = new sqlite3.Database("./inspection.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to Inspection Database.");

    // Inspection Templates
    inspectionDb.run(`
      CREATE TABLE IF NOT EXISTS inspections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        title TEXT NOT NULL,

        frequency TEXT NOT NULL,

        assigned_to TEXT NOT NULL,

        created_by TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Checklist Items
    inspectionDb.run(`
      CREATE TABLE IF NOT EXISTS inspection_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        inspection_id INTEGER,

        item TEXT NOT NULL
      )
    `);

    // Inspection Results
    inspectionDb.run(`
      CREATE TABLE IF NOT EXISTS inspection_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        inspection_id INTEGER,

        technician TEXT,

        item TEXT,

        status TEXT,

        note TEXT,

        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

  }
});

module.exports = inspectionDb;