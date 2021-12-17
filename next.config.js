module.exports = {
    env: {
        BACKEND: "https://debatable-be-kwqk3.ondigitalocean.app",
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
