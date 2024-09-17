import { getAllJobs } from "@/database/queries.mjs";

export async function GET() {
  const jobs = await getAllJobs();
  return Response.json(jobs, { status: 200 });
}
