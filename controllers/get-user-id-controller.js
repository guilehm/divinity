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

    if (!token) return handleError(500, 'missing token')
    if (!username) return handleError(400, 'username is required')


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
        if (error) return handleError(500, error)
        data = JSON.parse(body)
        if (!data.data) return handleError(200, 'user not found')
        if (data.success === false) return handleError(200, 'user not found')
        return handleSuccess(data.data)
    })
}
