import * as fetch from 'node-fetch';

class WebUtil {
     static async _get(url, headers) {
        try {
            const response = await fetch(url, {
                headers: headers,
            })
                .then((r) => r.json())
                .then((res) => res);
            return response;
        } catch (e) {
            return e;
        }
    }

    static async _post(url, headers, body) {
        try {
            const response = await fetch(url, {
                method: 'post',
                body: JSON.stringify(body),
                headers: headers,
            })
                .then((r) => r.json())
                .then((res) => res);
            return response;
        } catch (e) {
            return e;
        }
    }
}
module.exports = WebUtil;