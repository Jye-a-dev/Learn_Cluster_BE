function getPublicConfig() {
    return {
        appName: "LearnCluster",
        positioning: "LMS + Knowledge Graph + Study Matching Platform",
        googleClientId: process.env.GOOGLE_CLIENT_ID?.trim() ||
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() ||
            null,
    };
}
export const ConfigController = {
    getPublicConfig(_req, res) {
        return res.json(getPublicConfig());
    },
};
