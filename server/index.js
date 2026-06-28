const express = require("express");
const cors = require("cors");

const db = require("./database");
const usersDb = require("./users.db.js");
const tasksDb = require("./tasks.db.js");
const inspectionDb = require("./inspection.db.js");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CCI Maintenance API Running");
});
// =======================
// GET MY TASKS
// =======================

app.get("/tasks/my/:username", (req, res) => {

  const username = req.params.username;

  tasksDb.all(
    `
    SELECT *
    FROM tasks
    WHERE assigned_to = ?
       OR assigned_to = 'All Technicians'
    ORDER BY created_at DESC
    `,
    [username],
    (err, rows) => {

      if (err) {
  console.error("Create user error:", err);

  return res.status(500).json({
    message: err.message,
  });
}

      res.json(rows);

    }
  );

});
// =======================
// LOGIN
// =======================

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  usersDb.get(
    `SELECT id, username, fullname, role
     FROM users
     WHERE username=? AND password=?`,
    [username, password],
    (err, row) => {
      if (err) return res.status(500).json(err);

      if (!row) {
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }

      res.json({
        success: true,
        user: row,
      });
    }
  );
});

// =======================
// REPORTS
// =======================

app.post("/reports", (req, res) => {
  const { technician, shift, report } = req.body;

  db.run(
    `INSERT INTO reports (technician,shift,report)
     VALUES (?,?,?)`,
    [technician, shift, report],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        id: this.lastID,
      });
    }
  );
});

app.get("/reports", (req, res) => {
  db.all(
    `SELECT * FROM reports
     ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

// =========================
// DELETE REPORT
// =========================

app.delete("/reports/:id", (req, res) => {

  db.run(
    `DELETE FROM reports WHERE id = ?`,
    [req.params.id],
    function (err) {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
      });

    }
  );

});

// =======================
// TASKS
// =======================

// Create Task

app.post("/tasks", (req, res) => {

  const {
    title,
    description,
    assignment_type,
    assigned_to,
    machine,
    priority,
    due_date,
    created_by,
  } = req.body;

  tasksDb.run(
    `INSERT INTO tasks
    (
      title,
      description,
      assignment_type,
      assigned_to,
      machine,
      priority,
      due_date,
      created_by
    )
    VALUES (?,?,?,?,?,?,?,?)`,
    [
      title,
      description,
      assignment_type,
      assigned_to,
      machine,
      priority,
      due_date,
      created_by,
    ],
    function (err) {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
        id: this.lastID,
      });

    }
  );

});

// Get Tasks

app.get("/tasks", (req, res) => {

  tasksDb.all(
    `SELECT * FROM tasks
     ORDER BY created_at DESC`,
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json(err);

      res.json(rows);

    }
  );

});

// =======================
// GET MY TASKS
// =======================

app.get("/tasks/my/:username", (req, res) => {

  const username = req.params.username;

  tasksDb.all(
    `SELECT *
     FROM tasks
     WHERE assigned_to = ?
        OR assigned_to = 'All Technicians'
     ORDER BY created_at DESC`,
    [username],
    (err, rows) => {

      if (err)
        return res.status(500).json(err);

      res.json(rows);

    }
  );

});

// Complete Task

app.put("/tasks/:id", (req, res) => {

  const id = req.params.id;

  const {
    completed_by,
    completion_note,
  } = req.body;

  tasksDb.run(
    `UPDATE tasks
     SET
      status='Completed',
      completed_by=?,
      completion_note=?,
      completed_at=CURRENT_TIMESTAMP
     WHERE id=?`,
    [
      completed_by,
      completion_note,
      id,
    ],
    function (err) {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
      });

    }
  );

});

// Delete Task

app.delete("/tasks/:id", (req, res) => {

  tasksDb.run(
    `DELETE FROM tasks WHERE id=?`,
    [req.params.id],
    function (err) {

      if (err)
        return res.status(500).json(err);

      res.json({
        success: true,
      });

    }
  );

});
// =======================
// GET ALL INSPECTIONS
// =======================

app.get("/inspections", (req, res) => {

  inspectionDb.all(
    `SELECT * FROM inspections
     ORDER BY created_at DESC`,
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json(err);

      res.json(rows);

    }
  );

});

// =======================
// CREATE INSPECTION
// =======================

app.post("/inspections", (req, res) => {

  const {
    title,
    frequency,
    assigned_to,
    created_by
  } = req.body;

  inspectionDb.run(
    `INSERT INTO inspections
    (
      title,
      frequency,
      assigned_to,
      created_by
    )
    VALUES (?,?,?,?)`,
    [
      title,
      frequency,
      assigned_to,
      created_by
    ],
    function(err){

      if(err)
        return res.status(500).json(err);

      res.json({
        success:true,
        id:this.lastID
      });

    }
  );

});
// =======================
// DASHBOARD
// =======================

app.get("/dashboard", (req, res) => {

  const dashboard = {
    openTasks: 0,
    completedTasks: 0,
    reportsToday: 0,
    inspections: 0,
  };

  tasksDb.get(
    `SELECT COUNT(*) AS total
     FROM tasks
     WHERE status='Open'`,
    [],
    (err, row) => {

      if (err) return res.status(500).json(err);

      dashboard.openTasks = row.total;

      tasksDb.get(
        `SELECT COUNT(*) AS total
         FROM tasks
         WHERE status='Completed'`,
        [],
        (err2, row2) => {

          if (err2) return res.status(500).json(err2);

          dashboard.completedTasks = row2.total;

          db.get(
            `SELECT COUNT(*) AS total
             FROM reports
             WHERE DATE(created_at)=DATE('now')`,
            [],
            (err3, row3) => {

              if (err3) return res.status(500).json(err3);

              dashboard.reportsToday = row3.total;

              inspectionDb.get(
                `SELECT COUNT(*) AS total
                 FROM inspections`,
                [],
                (err4, row4) => {

                  if (err4) return res.status(500).json(err4);

                  dashboard.inspections = row4.total;

                  res.json(dashboard);

                }
              );

            }
          );

        }
      );

    }
  );

});
// =======================
// USERS
// =======================

// Get All Users

app.get("/users", (req, res) => {

  usersDb.all(
    `
    SELECT
      id,
      username,
      fullname,
      role,
      created_at
    FROM users
    ORDER BY fullname
    `,
    [],
    (err, rows) => {

      if (err)
        return res.status(500).json(err);

      res.json(rows);

    }
  );

});
// Create User

app.post("/users", (req, res) => {

  const {
    username,
    password,
    fullname,
    role
  } = req.body;

  usersDb.run(
    `
    INSERT INTO users
    (
      username,
      password,
      fullname,
      role
    )
    VALUES (?,?,?,?)
    `,
    [
      username,
      password,
      fullname,
      role
    ],
    function(err){

      if(err)
        return res.status(500).json(err);

      res.json({
        success:true,
        id:this.lastID
      });

    }
  );

});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});