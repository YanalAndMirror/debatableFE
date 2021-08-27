module.exports = {
  env: {
    BACKEND: "http://localhost:4000",
    //
  },
  async rewrites() {
    return [
      {
        source: "/create",
        destination: "/clubs/public/create",
      },
    ];
  },
};
