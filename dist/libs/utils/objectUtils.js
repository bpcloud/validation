'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    getParameterName,
};
function getParameterName(fn) {
    try {
        if (typeof fn !== 'object' && typeof fn !== 'function')
            return;
        const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const DEFAULT_PARAMS = /=[^,)]+/mg;
        const FAT_ARROWS = /=>.*$/mg;
        let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
        code = code
            .replace(COMMENTS, '')
            .replace(FAT_ARROWS, '')
            .replace(DEFAULT_PARAMS, '');
        let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
        return result === null ? [] : result;
    }
    catch (e) {
        return [];
    }
}
//# sourceMappingURL=objectUtils.js.map