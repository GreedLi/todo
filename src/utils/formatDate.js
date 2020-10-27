/*
 * @Description: Description
 * @Author: Li Zhenxing
 * @Date: 2020-10-22 10:23:53
 * @LastEditors: Li Zhenxing
 * @LastEditTime: 2020-10-22 10:40:49
 */
'use strict'

const formatDate=function(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : "0"
                    + (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + " "
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}

const formatNotTime=function(date) {
    var datetime = date.getFullYear()
            + "-"// "年"
            + ((date.getMonth() + 1) < 10 ? "0"+ (date.getMonth() + 1) : (date.getMonth() + 1))
            + "-"// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate());
    return datetime;
}

const formatTime=function(date) {
    var datetime = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())
            + ":"
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ":"
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}

//把时间字符串转换为数字
const transDateNumber=function(dateString){
    if(dateString){
        const res=dateString.match(/\d+/g);
        if(res){
            return res.join('');
        }
    }
}


export {formatDate,formatNotTime,formatTime,transDateNumber}