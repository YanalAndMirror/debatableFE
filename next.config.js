module.exports = {
  env: {
    BACKEND: "http://192.168.2.168:4000",
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
