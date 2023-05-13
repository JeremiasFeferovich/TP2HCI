
class Api {
    
    static get baseUrl() {
        return 'http://localhost:8080/api'
    }

    static _isConnected = false;
  
    static get isConnected() {
      return this._isConnected;
    }
    
    static set isConnected(value) {
      this._isConnected = value;
      const event = new CustomEvent('api-connection-changed', { detail: value });
      window.dispatchEvent(event);
    }

    static async fetchApi(url, init = {}) {
        try {
            const response = await fetch(url, init)
            const text = await response.text()
            const json = JSON.parse(text)
            Api.isConnected = true
            return json.result
        } catch (error) {
            Api.isConnected = false
        }
    }

    static async get(url) {
        return await Api.fetchApi(url);
    }

    static async post(url, data) {
        return await Api.fetchApi(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        })
    }

    static async put(url, data) {
        return await Api.fetchApi(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)
        })
    }

    static async delete(url) {
        return await Api.fetchApi(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
    }
}

export { Api }