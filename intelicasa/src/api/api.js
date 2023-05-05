
class Api {
    static get baseUrl() {
        return 'http://localhost:8080/api'
    }

    static fetchApi(url, init = {}) {
        try {
            const response = fetch(url, init)
            const text = response.text()
            const json = JSON.parse(text)
            return json.result
        } catch (error) {
            console.error(error)
        }

    }

    static get(url) {
        Api.fetchApi(url);
    }

    static post(url, data) {
        Api.fetchApi(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)        
        })
    }

    static put(url, data) {
        Api.fetchApi(url, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data)        
        })
    }

    static delete(url) {
        Api.fetchApi(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
    }


}

return { Api }