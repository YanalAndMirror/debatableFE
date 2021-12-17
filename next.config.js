module.exports = {
    env: {
        BACKEND: "https://debatable-fe-4jwsr.ondigitalocean.app",
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
