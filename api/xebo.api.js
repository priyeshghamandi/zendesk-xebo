const rp = require('request-promise');
require('dotenv').config()

class Xebo {
    constructor() {
        this.apiKey = process.env.XEBO_API_KEY;
        this.server = process.env.XEBO_SERVER;
        this.apiURL = `https://${this.server}.survey2connect.com/v2/api`;
    }

        
    async getSurveyURL(collectorID,collectortoken, emailAddress, metadata) {
        const contacts = [{
            email: emailAddress,
            ...metadata
        }]

        const payload = {
            collectortoken,
            contacts
        }        

        return this._post(`collectors/${collectorID}/campaigns/external`, '', payload);
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
                url: `${this.apiURL}/${url}`,
                headers: {
                    'Content-Type' : 'application/json',
                    'x-api-key': this.apiKey
                },
                json: true
            },
            params,
            body,
        );
        return rp(fullOptions).then(data => data);
    }
}
module.exports = Xebo;