module.exports = {
    success: (...resp) => {
        return {
            status: resp[0],
            statuscode: resp[1],
            data: {
                type: resp[2],
                message: resp[3],
                payload: {
                    data: resp[4]
                }
            },
            error: {
                code: null,
                message: null
            }
        }
    },
    failure: (...resp) => {
        return {
            status: resp[0],
            statuscode: resp[1],
            data: {
                type: null,
                payload: null
            },
            error: {
                code: resp[2],
                message: resp[3]
            }
        }
    }
}