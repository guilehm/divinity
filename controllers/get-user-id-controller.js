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
        data.success = true
        res.end(JSON.stringify(data))
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

    request(options, (error, response, body) => {
        if (error) handleError(500, error)
        data = JSON.parse(body)
        if (!data.data) handleError(200, 'user not found')
        return handleSuccess(data.data)
    })
}
