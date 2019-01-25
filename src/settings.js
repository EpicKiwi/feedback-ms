module.exports = {
    titleSize: 80,

    projects: {
        "feedback-ms": {
            token: process.env.GH_TOKEN,
            repository: "EpicKiwi/feedback-ms",
            labels: ["feedback","test"],
            prefix: "User feedback : "
        },
        "pimp-my-ent": {
            token: process.env.GH_TOKEN,
            repository: "EpicKiwi/pimp-my-ent",
            labels: ["feedback"],
            prefix: "Retour utilisateur : "
        }
    }
}