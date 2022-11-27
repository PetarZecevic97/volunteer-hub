import axios from 'axios'

const http = axios.create({
  baseURL: "http://localhost:4003",
  headers: {
     Accept: "application/json",
     "Content-Type": "application/json"
  }
})
export default http;