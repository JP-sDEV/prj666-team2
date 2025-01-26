'use server';

export async function GET() {
  try {
    return Response.json({ message: 'Hello World' }, { status: 200 });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
