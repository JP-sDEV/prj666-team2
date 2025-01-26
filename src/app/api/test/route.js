'use server';

export async function GET() {
  try {
    return Response.json({ message: 'Hello World' }, { status: 200 });
  } catch (error) {
    // Create a new Response object for the error case
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
