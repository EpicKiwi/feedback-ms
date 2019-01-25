const {createError, send,json} = require("micro")
const axios = require("axios")
const ow = require("ow")
const {projects,titleSize} = require("./settings")

module.exports = withAllCORS(withErrorHandling(async function makeFeedback(req,res){
    let args = await getArgs(req)

    let title = extractTitle(args.content)
    let createdIssue = await createIssue(args.project,title,args.content);

    return send(res,201,{
        ok: true,
        title: createdIssue.title,
        content: createdIssue.body,
        issueUrl: createdIssue["html_url"],
        issueNumber: createdIssue.number,
        repositoryUrl: `https://github.com/${args.project.repository}`,
        repository: args.project.repository,
        date: createdIssue["created_at"]
    })
}))

async function createIssue(project,title,content){
    ow(project.repository,ow.string,'project.repository')
    ow(project.token,ow.string,'project.token')
    ow(project.prefix,ow.any(ow.string,ow.nullOrUndefined),'project.prefix')
    ow(project.labels,ow.any(ow.array.ofType(ow.string),ow.nullOrUndefined),'project.labels')
    ow(title,ow.string)
    ow(content,ow.string)

    let config = {
        method: "post",
        url: `https://api.github.com/repos/${project.repository}/issues`,
        data: {
            title,
            body: content
        },
        headers: {
            Authorization: `token ${project.token}`
        }
    }

    if(project.labels){
        config.data.labels = project.labels
    }

    if(project.prefix){
        config.data.title = `${project.prefix}${config.data.title}`
    }

    try {

        let response = await axios(config);
        return response.data

    } catch(e){
        if(e.response){
            throw new Error(`Request error : ${config.method.toUpperCase()} ${config.url} ${JSON.stringify(e.response.data,null,2)}`)
        }
        throw e
    }
}

function extractTitle(content){
    return content.split('\n')[0].substr(0,titleSize)
}

async function getArgs(req){

    let body = await json(req)

    let args = {
        projectId: body.project,
        content: body.content
    }

    if(!args.projectId){
        throw createError(400,"Undefined field 'project' required with project id to make feedback on");
    }

    if(!args.content){
        throw createError(400,"Undefined field 'content' required with content of feedback");
    }

    let project = projects[args.projectId]

    if(!project){
        throw createError(400,"Unknown project");
    }

    return {...args,project}
}

function withErrorHandling(fn) {
    return async (req, res) => {
        try {
            return await fn(req, res)
        } catch (err) {
            if(err.statusCode){
                send(res, err.statusCode, {error:err.message})
            } else {
                console.log(err.stack)
                send(res, 500, {error:"Internal server error"})
            }
        }
    }
}

function withAllCORS(fn) {
    return async (req,res) => {
        res.setHeader('Access-Control-Allow-Origin','*')
        if(req.method === "OPTIONS"){
            return send(res,404)
        }
        return await fn(req,res);
    }
}