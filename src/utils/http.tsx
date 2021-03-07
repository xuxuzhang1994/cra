import qs from "qs"

const baseUrl = process.env.REACT_APP_BASE_URL
console.log(process.env)

interface Config extends RequestInit {
    token?: string,
    data?: object
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig}: Config) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if(config.method.toLocaleUpperCase() === 'GET'){
        endpoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${baseUrl}/${endpoint}`, config).then(async response => {
        if(response.status != 200){
            console.log('xxxx')
            // TODO logout
            return Promise.reject('网络错误')
        }
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            return Promise.reject(data)
        }
    })
}

export const authHttp = async (endpoint: string, { data, headers, ...customConfig}: Config) => {
    const token = localStorage.getItem('token')
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if(config.method.toLocaleUpperCase() === 'GET'){
        endpoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${baseUrl}/${endpoint}`, config).then(async response => {
        if(response.status != 200){
            console.log('xxxx')
            // TODO logout
            return Promise.reject('网络错误')
        }
        const data = await response.json()
        if(response.ok){
            return data
        }else{
            return Promise.reject(data)
        }
    })
}