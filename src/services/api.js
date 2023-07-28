import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://10.0.2.2:5228/'
    baseURL: 'https://22a0-2804-14c-3b83-52aa-88d3-e92f-bc7d-2d89.ngrok-free.app/'
})

export { api };
