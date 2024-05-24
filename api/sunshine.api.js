const rp = require('request-promise');
require('dotenv').config()

class Sunshine {
    constructor() {
        this.appID = process.env.SUNSHINE_APP_ID;
        this.apiURL = `https://api.smooch.io/v2/apps/${this.appID}`;
        this.username = process.env.SUNSHINE_USERNAME;
        this.password = process.env.SUNSHINE_PASSWORD;
    }

    async sendMessage(conversationID, messageText) {
        const payload = {
            "author": {
                "type": "business"
            },
            "content": {
                "type": "text",
                "text": messageText
            }
        }
        return this._post(`conversations/${conversationID}/messages`, '', payload);
    }
    

    _get(url, query) {
        const params = { method: 'GET', json: true  };
        return this._request(url, params, query);
    }

    _post(url,query,data) {
        const params = { method: 'POST'};
        const body = {body: data}
        return this._request(url, params, query, body);
    }

    _request(url, params, query, body) {     
        if (query && typeof query !== 'object') throw new Error('Wrong parameters type')

        const fullOptions = Object.assign(
            {},
            {
                url: `${this.apiURL}/${url}${query ? serialize(query) : ''}`,
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(this.username + ":" + this.password).toString('base64')
                },
                json: true
            },
            params,
            body,
        );
        return rp(fullOptions).then(data => data);
    }
}

module.exports = Sunshine;