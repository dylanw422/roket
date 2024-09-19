import { setAsPinned } from "@/database/queries.mjs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const pinned = setAsPinned(id);

  return Response.json(pinned, { status: 200 });
}
