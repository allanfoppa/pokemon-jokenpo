import axios from "axios"

axios.defaults.headers.post["Content-Type"] = "application/json"

const webservice = axios.create({
    baseURL: 'http://localhost:3333/'
})

export default webservice