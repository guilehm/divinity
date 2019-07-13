const request = require('request')

module.exports = async (req, res) => {
    const endpoint = 'https://fortnite-api.theapinetwork.com/users/id'
    let username = req.query.username
    let token = process.env.TOKEN

    let handleError = (status, message) => {
        res.status(status).end(JSON.stringify({
            success: false,
            message: message,
        }))
    }

    let handleSuccess = data => {
        res.end(data)
    }

    if (!token) handleError(500, 'missing token')
    if (!username) handleError(400, 'username is required')


    let options = {
        url: endpoint,
        headers: {
            Authorization: token
        },
        qs: {
            username: username,
        }
    }
    console.log(options.qs)

    request(options, (error, response, body) => {
        console.log(response)
        if (error) handleError(500, error)
        return handleSuccess(body)
    })
}
