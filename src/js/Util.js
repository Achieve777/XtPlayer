const axios = require('axios');
const qs = require('qs');
axios.defaults.transformRequest = function(data){
    if(typeof(data)!='object')return data;
    return qs.stringify(data);
}
exports.httpGet = function(url,data,success,error){
    axios.get(url,{param:data}).then(r=>{
        if(typeof(success)!='undefined')success(r);
    }).catch(e=>{
        if(typeof(error)!='undefined')error(e);
    });
}
exports.httpPost = function(url,data,success,error){
    axios.post(url,data).then(r=>{
        if(typeof(success)!='undefined')success(r);
    }).catch(e=>{
        if(typeof(error)!='undefined')error(e);
    });
}
const hlsTypes = ['application/vnd.apple.mpegurl'];
const defaultTypes = ['video/mp4','video/webm','video/ogg'];
exports.isHlsVideo = function(type){
    for(let i in hlsTypes){
        if(hlsTypes[i]==type)return true;
    }
    return false;
}
exports.isDefaultVideo = function(type){
    for(let i in defaultTypes){
        if(defaultTypes[i]==type)return true;
    }
    return false;
}
exports.isDefVideo = function(type){
    for(let i in hlsTypes){
        if(hlsTypes[i]==type)return true;
    }
    return false;
}
exports.parseToTime = function(time){
    if(isNaN(time))return "00:00";
    time = Math.floor(time);
    if(60>time){
        if(10>time){
            return `00:0${time}`;
        }else{
            return `00:${time}`;
        }
    }else{
        let m = Math.floor(time/60);
        let s = time-(m*60);
        if(10>s)s = "0"+s;
        if(10>m)m = "0"+m;
        return `${m}:${s}`;
    }
}
exports.parseToS = function(time){
    let timeArr = time.split(":");
    let m =0,s=0;   
    if(timeArr.length==2){
        m = parseInt(timeArr[0]);
        s = parseInt(timeArr[1]);
    }else{
        m = 0;
        s = parseInt(time);
    }
    return (m*60)+s;
}
exports.calcTime = (s) => {
    if (!s) {
        return '-'
    }
    const dateTime = 24 * 60 * 60
    const hourTime = 60 * 60
    const minuteTime = 60
    const d = Number(parseInt(s / 60 / 60 / 24 + '')) || 0 // 天
    if (d > 0) {
        s = s - d * dateTime
    }
    const h = Number(parseInt(s / 60 / 60 + '')) || 0 // 时
    if (h > 0) {
        s = s - h * hourTime
    }
    const m = Number(parseInt(s / 60 + '')) || 0 // 分
    if (m > 0) {
        s = s - m * minuteTime // 秒
    }
    let str = [
        { k: d, v: d ? `${d}天` : '' },
        { k: h, v: h ? `${h}时` : '' },
        { k: m, v: m ? `${m}分` : '' },
        { k: s, v: s ? `${s}秒` : '' },
    ].filter(item => item.v)

    str = str.map(item => item.v)
    
    return str.join('')
}