import axios from './axios_clients'

export const train = (params)=>axios.post('/train', params)
export const predict = (params)=>axios.post('/predict', params)