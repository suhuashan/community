import axios from 'axios';


// axios默认参数配置
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;

let pending = []; 
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for(let p in pending){
        if(pending[p].url === config.url) { 
            pending[p].clear();       
            pending.splice(p, 1); 
        }
    }
}

// window.addEventListener('hashchange',()=>{
//     for(let p in pending) {
//         pending[p].clear();       
//         pending.splice(p, 1); 
//     }
// })

axios.interceptors.request.use(config => {
    removePending(config);
    config.cancelToken = new cancelToken((c)=>{
        pending.push({ url: config.url, clear: c });  
    });
     return config;
})

axios.interceptors.response.use(res => {
    removePending(res.config);  
    return res;
})

const ajax = (option) => {
    let ajaxUrl = option.url;

    let ajaxMethod = option.method ? option.method.toLowerCase() : "get";
    var ajaxData = null;
    if (ajaxMethod === "get") {
        ajaxData = {params: option.data || {}};
    } else {
        ajaxData = {data: option.data || {}};
    }

    return new Promise(function (resolve, reject) {
        axios({
            url: ajaxUrl,
            type: 'json',
            method: ajaxMethod,
            headers: option.headers || {
                "content-type": "application/json"
            },
            ...ajaxData
        }).then((res) => {
            if ( res.status === 200 && res.data.code === 401 ) {
                window.location.href = window.location.origin + '/#/login';
            } else if ( res.status === 200 ) {
                resolve(res.data);
            } else {
                reject("fail: ", res);
            }
        }).catch((err) => {
            console.log("error: ", err);
            reject(err);
        });
    })
}

export default ajax;