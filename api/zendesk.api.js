const rp = require('request-promise');
require('dotenv').config()
class Zendesk {
    constructor() {
        this.subdomain = process.env.ZENDESK_SUBDOMAIN;
        this.apiURL = `https://${this.subdomain}.zendesk.com/api/v2`;
        this.username = process.env.ZENDESK_USERNAME;
        this.password = process.env.ZENDESK_PASSWORD;
    }

    getTicketAudit(ticketID) {
        return this._get(`tickets/${ticketID}/audits`);
    }

    getTicket(ticketID) {
        return this._get(`tickets/${ticketID}.json`);
    }

    updateTicketTags(ticketID, tag) {
        return this._put(`tickets/${ticketID}/tags.json`,'',updateData);
    }

    _put(url,query,data) {
        const params = { method: 'PUT'};
        const body = {body: data}
        return this._request(url, params, query, body);
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

module.exports = Zendesk;