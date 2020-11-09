// 不使用数据拦截器
import axios from 'axios';
import Qs from 'qs';
import { Message} from 'element-ui';
axios.defaults.timeout = 5000;

// env_config
// dev  开发环境
// test  测试环境
// build  线上环境
var urlObj = {
    dev:'http://localhost:8081',
    test:'http://localhost:8081/',
    build:'https://www.17npw.net/api/'
}

axios.defaults.baseURL =urlObj[sceneParam]; //填写域名

var typearr= {
    'json':'application/json;charset=UTF-8',
    'form':'application/x-www-form-urlencoded'
};
//http request 拦截器  客户端给服务端 的数据 
axios.interceptors.request.use(
    config => {   
    
    config.headers.common = {
        'X-API-TOKEN': localStorage.getItem('token'),
        'version': '1.0',
        'Content-Type': config.data.form ? typearr['form'] : typearr['json'],
    }

    if (config.data.form) {
        //转化成formData格式
        // transformRequest只能用在 PUT, POST, PATCH 这几个请求方法
        config.transformRequest=[function (data) {          
            delete data.form;           
            var test2 = Qs.stringify(data);
            return test2;
        }]
    }

    return config;
    },
    error => {
    return Promise.reject(err);
    }
);

//响应拦截器即异常处理 -  -- 服务给客户端的数据进行处理
axios.interceptors.response.use(response => {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
    // return response
    }, err => {
    if (err && err.response) {
        err.errorObj = {};
        switch (err.response.status) {
            case 400:          
                err.errorObj.Message = '错误请求';
                break;
            case 401:         
                err.errorObj.Message = '未授权，请重新登录';
                break;
            case 403:        
                err.errorObj.Message = '拒绝访问';
                break;
            case 404:
                err.errorObj.Message = '请求错误,未找到该资源';
                break;
            case 405:
                err.errorObj.Message = '请求方法未允许';
                break;
            case 408:
                err.errorObj.Message = '请求超时';
                break;
            case 500:
                err.errorObj.Message = '服务器端出错';
                break;
            case 501:
                err.errorObj.Message = '请求方法未允许';
                break;
            case 502:
                err.errorObj.Message = '网络错误';
                break;
            case 503:
                err.errorObj.Message = '服务不可用';
                break;
            case 504:
                err.errorObj.Message = '网络超时';
                break;
            case 505:
                err.errorObj.Message = 'http版本不支持该请求';
                break;
            default:
        }

    } else {
        console.log('连接到服务器失败')
    }
    return Promise.reject(err)
})

export default {
    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then(response => {
                resolve(response.data)
            }, err => {
                Message({
                    message: err.errorObj.Message,
                    type: 'error',
                    duration: 3 * 1000
                })
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
}