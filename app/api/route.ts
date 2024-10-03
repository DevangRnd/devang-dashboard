export const GET = async () => {
  return Response.json({ message: "Hello" });
};
export const POST = async (request: Request) => {
  const res = await request.json();
  return Response.json(res);
};
