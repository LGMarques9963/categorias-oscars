import axios from 'axios'

const http = axios.create({
    baseURL: "https://oscar-cc.azurewebsites.net/",
})


export default http