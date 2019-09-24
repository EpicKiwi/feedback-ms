module.exports = {
    titleSize: 80,

    projects: {
        "feedback-ms": {
            token: process.env.GH_TOKEN,
            repository: "EpicKiwi/feedback-ms",
            labels: ["feedback"],
            prefix: "User feedback : "
        },
        "pimp-my-ent": {
            token: process.env.GH_TOKEN,
            repository: "EpicKiwi/pimp-my-ent",
            labels: ["feedback"],
            prefix: "Retour utilisateur : "
        },
        "bde-cesi-lyon": {
            token: process.env.GH_TOKEN,
            repository: "EpicKiwi/commissions-bde-cesi-lyon",
            labels: ["feedback"],
            prefix: "Retour utilisateur : "
        }

    }
}