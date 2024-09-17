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
  const stmt = db.prepare("SELECT * FROM jobs");
  const jobs = stmt.all();
  return jobs;
};
