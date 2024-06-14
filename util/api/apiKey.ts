import { verifyKey } from "@unkey/api";

export const checkAPIKeyValidity = async (request: Request) => {
  const header = request.headers.get("Authorization");
  if (!header) {
    return new Response("No Auth header found", { status: 401 });
  }

  const token = header.replace("Bearer ", "");
  const { result, error } = await verifyKey(token);

  if (error) {
    return false;
  }
  if (!result.valid) {
    return false;
  }
  return true;
};
