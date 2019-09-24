# feedback-ms

> Microservice handling feedbacks through GitHub issues

## Usage

Usage of this micro-service is pretty straightfoward.
After definition of a project in `settings.js` you can send a feedback with a simple POSt request to the root

```http-request
POST /
{
	"project": "feedback-ms",
	"content": "text content of feedback"
}

---

{
	"ok": true,
	"title": "User feedback : text content of feedback",
	"content": "text content of feedback",
	"issueUrl": "https://github.com/EpicKiwi/feedback-ms/issues/8",
	"issueNumber": 8,
	"repositoryUrl": "https://github.com/EpicKiwi/feedback-ms",
	"repository": "EpicKiwi/feedback-ms",
	"date": "2019-09-24T10:44:36Z"
}
```

## Settings

Projects must be defined in `settings.js` in order to be able to send a feedback

```js
module.exports = {
    titleSize: 80,	// Maximum size of the title

    projects: {		// All projects available
        "feedback-ms": {	// id of the project
            token: process.env.GH_TOKEN,	// personal Gihub token required with write on repositories
            repository: "EpicKiwi/feedback-ms",	//Name of the repository on GitHub
            labels: ["feedback"],	// Labels to assign to the issue
            prefix: "User feedback : "	// Prefix to prepend to the first line of the feedback
        },
    }
}
```

## Installation

Install dependencies

```sh-session
npm i
```

Start server

```sh-session
npm run start
```

Service is now available on http://localhost:3000