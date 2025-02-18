async function GET() {
  try {
    return {
      status: 200,
      json: async () => ({ message: 'Hello World' }),
    };
  } catch (error) {
    return {
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    };
  }
}

module.exports = { GET };
