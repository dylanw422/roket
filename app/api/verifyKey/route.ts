import { neon } from "@neondatabase/serverless";
import { machineIdSync } from "node-machine-id";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const reqBody = await req.json();
  const sql = neon(process.env.DATABASE_URL!);
  const cookieStore = cookies();

  const savedKey = cookieStore.get("product_key")?.value;

  let key;
  if (savedKey) {
    key = savedKey;
  } else {
    key = reqBody.key;
  }

  const verify =
    await sql`SELECT * FROM product_keys WHERE product_key = ${key}`;

  if (verify.length > 1) {
    return Response.json(
      { error: "Duplicate keys found. Please contact support" },
      { status: 200 },
    );
  }

  if (verify.length === 0) {
    return Response.json(
      { error: "No key found. Please purchase a key from https://roket.work/" },
      { status: 200 },
    );
  }

  if (verify[0].used === false) {
    const deviceId = machineIdSync();
    const currentTimestamp = new Date();
    await sql(
      "UPDATE product_keys SET used = true, deviceid = $1, last_signin = $2 WHERE product_key = $3",
      [deviceId, currentTimestamp, key],
    );

    cookieStore.set("product_key", key, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    });

    return Response.json(
      { success: true, message: `New key verified for device ${deviceId}` },
      { status: 200 },
    );
  }

  if (verify[0].used === true) {
    const deviceId = machineIdSync();
    if (deviceId === verify[0].deviceid) {
      cookieStore.set("product_key", key, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      });
      const currentTimestamp = new Date();
      await sql(
        "UPDATE product_keys SET last_signin = $1 WHERE deviceid = $2",
        [currentTimestamp, deviceId],
      );
      return Response.json(
        { success: true, message: `Key reverified.` },
        { status: 200 },
      );
    }
  }

  return Response.json(verify, { status: 200 });
}
