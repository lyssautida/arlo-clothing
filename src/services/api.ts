import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333'

})
//vantagem usar axios, retorna interceptor, se tolken falhar ele reinicia o tolken 