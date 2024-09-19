import Database from "better-sqlite3";

const db = new Database("./database/database.db", { verbose: console.log });
db.pragma("journal_mode = WAL");

export const insertJob = (job) => {
  const { title, company, salary, location, schedule, timestamp, pinned } = job;
  const stmt = db.prepare(`
    INSERT INTO jobs (title, company, salary, location, schedule, timestamp, pinned)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    title,
    company,
    salary,
    location,
    schedule,
    timestamp,
    pinned,
  );

  return { id: info.lastInsertRowid };
};

export const getAllJobs = () => {
  const stmt = db.prepare("SELECT * FROM jobs ORDER BY id DESC");
  const jobs = stmt.all();
  return jobs;
};

export const setAsPinned = (id) => {
  const stmt = db.prepare(
    "UPDATE jobs SET pinned = CASE WHEN pinned = 1 THEN 0 ELSE 1 END WHERE id = ?",
  );
  const result = stmt.run(id);

  if (result.changes > 0) {
    return `Job with id ${id} had its pinned status toggled.`;
  } else {
    return `No job was updated. Either the job is already pinned or it doesn't exist`;
  }
};
