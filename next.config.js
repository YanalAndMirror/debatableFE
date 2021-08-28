module.exports = {
  env: {
    BACKEND: "https://debatable-be-eydhl.ondigitalocean.app",
  },
  //
  async rewrites() {
    return [
      {
        source: "/create",
        destination: "/clubs/public/create",
      },
    ];
  },
};
