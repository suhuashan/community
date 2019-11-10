import axios from 'axios';
import qs from 'qs';

// axios默认参数配置
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 10000;
const ajax = (option) => {
    let ajaxUrl = option.url;

    let ajaxMethod = option.method ? option.method.toLowerCase() : "get";
    var ajaxData = null;
    if (ajaxMethod === "get") {
        ajaxData = {
            params: option.data || {}
        }
    } else {
        ajaxData = {
            data: qs.stringify(option.data || {})
        }
    }
    return new Promise(function (resolve, reject) {
        axios({
            url: ajaxUrl,
            type: 'json',
            method: ajaxMethod,
            headers: {
                "content-type": "application/x-www-form-urlencoded"
            },
            ...ajaxData
        }).then((res) => {
            if (res.status === 200) {
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