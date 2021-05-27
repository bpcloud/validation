'use strict';

/**
* Copyright (c) 2019 Copyright bp All Rights Reserved.
* Author: lipengxiang
* Date: 2019-09-12 15:41
* Desc: 如果进行了代码压缩, 获取的类名参数名将是压缩后的名称.
*/


export default {
  getParameterName,
}


/**
* @desc: 获得参数名称列表.
*/
function getParameterName(fn:Function):string[] {
  try {
    if(typeof fn !== 'object' && typeof fn !== 'function' ) return;
    const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    const DEFAULT_PARAMS = /=[^,)]+/mg;
    const FAT_ARROWS = /=>.*$/mg;
    let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
    code = code
        .replace(COMMENTS, '')
        .replace(FAT_ARROWS, '')
        .replace(DEFAULT_PARAMS, '');
    let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
    return result === null ? [] :result;
  }
  catch (e) {
    return [];
  }
}
