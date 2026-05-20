/**
 * Util 模块测试
 * 使用 Node 内置测试运行器验证时间处理和格式检测等纯函数行为。
 */

const assert = require('node:assert/strict');
const Module = require('node:module');

/**
 * axios GET 调用记录
 * 用于验证 httpGet 是否按预期转发参数。
 * @type {Array<object>}
 */
const axiosGetCalls = [];

/**
 * axios POST 调用记录
 * 用于验证 httpPost 是否按预期转发参数。
 * @type {Array<object>}
 */
const axiosPostCalls = [];

/**
 * axios 模拟对象
 * 为 Util 模块提供最小可用的 get、post 和 defaults 接口。
 * @type {{defaults: {transformRequest: Function|null}, get: Function, post: Function}}
 */
const axiosMock = {
    defaults: {
        transformRequest: null
    },
    get(url, config){
        axiosGetCalls.push({
            url,
            config
        });
        return Promise.resolve({
            status: 200,
            data: {
                ok: true
            }
        });
    },
    post(url, data){
        axiosPostCalls.push({
            url,
            data
        });
        return Promise.resolve({
            status: 200,
            data: {
                ok: true
            }
        });
    }
};

/**
 * qs 模拟对象
 * 为 transformRequest 提供最小 stringify 能力。
 * @type {{stringify: Function}}
 */
const qsMock = {
    stringify(data){
        return Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
    }
};

/**
 * 原始模块加载函数
 * 供测试结束后恢复 require 行为。
 * @type {Function}
 */
const originalLoad = Module._load;

/**
 * 替换 Node 模块加载流程
 * 在加载 Util 模块前注入 axios 和 qs 的测试替身。
 * @param {string} request - require 请求的模块名
 * @param {NodeModule} parent - 父模块对象
 * @param {boolean} isMain - 是否主模块
 * @returns {*}
 */
Module._load = function(request, parent, isMain){
    if(request === 'axios'){
        return axiosMock;
    }
    if(request === 'qs'){
        return qsMock;
    }
    return originalLoad(request, parent, isMain);
};

/**
 * 载入待测模块
 * 在替身生效后再 require，确保不依赖本地 node_modules。
 * @type {object}
 */
const util = require('../js/Util');

/**
 * 恢复模块加载函数
 * 避免影响其它测试文件。
 */
Module._load = originalLoad;

/**
 * 重置 axios 调用记录
 * 保证每个测试用例之间互不污染。
 */
function resetAxiosCalls(){
    axiosGetCalls.length = 0;
    axiosPostCalls.length = 0;
}

/**
 * 运行单个测试用例
 * 负责统一打印结果并在失败时设置进程退出码。
 * @param {string} name - 测试名称
 * @param {Function} handler - 测试执行函数
 */
async function runTest(name, handler){
    try{
        await handler();
        console.log(`PASS ${name}`);
    }catch(error){
        console.error(`FAIL ${name}`);
        console.error(error);
        process.exitCode = 1;
    }
}

/**
 * 主测试执行函数
 * 串行执行全部 Util 模块测试，避免并发带来的干扰。
 */
async function main(){
    await runTest('parseToTime 应返回 mm:ss 格式字符串', () => {
        assert.equal(util.parseToTime(5), '00:05');
        assert.equal(util.parseToTime(65), '01:05');
        assert.equal(util.parseToTime(125), '02:05');
    });

    await runTest('parseToTime 在无效输入时应返回 00:00', () => {
        assert.equal(util.parseToTime('abc'), '00:00');
        assert.equal(util.parseToTime(undefined), '00:00');
    });

    await runTest('parseToS 应将时间字符串转换为秒数', () => {
        assert.equal(util.parseToS('01:05'), 65);
        assert.equal(util.parseToS('30'), 30);
    });

    await runTest('calcTime 应输出中文时间描述', () => {
        assert.equal(util.calcTime(45), '45秒');
        assert.equal(util.calcTime(125), '2分5秒');
        assert.equal(util.calcTime(3665), '1时1分5秒');
    });

    await runTest('calcTime 在空值输入时应返回占位符', () => {
        assert.equal(util.calcTime(0), '-');
        assert.equal(util.calcTime(null), '-');
    });

    await runTest('视频 MIME 类型识别函数应返回正确结果', () => {
        assert.equal(util.isHlsVideo('application/vnd.apple.mpegurl'), true);
        assert.equal(util.isHlsVideo('video/mp4'), false);
        assert.equal(util.isDefaultVideo('video/mp4'), true);
        assert.equal(util.isDefaultVideo('application/vnd.apple.mpegurl'), false);
    });

    await runTest('axios 默认 transformRequest 应将对象转换为查询字符串', () => {
        assert.equal(typeof axiosMock.defaults.transformRequest, 'function');
        assert.equal(axiosMock.defaults.transformRequest({foo: 'bar', count: 2}), 'foo=bar&count=2');
        assert.equal(axiosMock.defaults.transformRequest('plain-text'), 'plain-text');
    });

    await runTest('httpGet 应调用 axios.get 并触发成功回调', async () => {
        /**
         * GET 成功回调接收到的响应对象
         * @type {object|null}
         */
        let response = null;

        resetAxiosCalls();

        await new Promise((resolve, reject) => {
            util.httpGet('https://example.com/list', {page: 1}, (result) => {
                response = result;
                resolve();
            }, reject);
        });

        assert.equal(axiosGetCalls.length, 1);
        assert.equal(axiosGetCalls[0].url, 'https://example.com/list');
        assert.deepEqual(axiosGetCalls[0].config, {
            param: {
                page: 1
            }
        });
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, {
            ok: true
        });
    });

    await runTest('httpPost 应调用 axios.post 并触发成功回调', async () => {
        /**
         * POST 成功回调接收到的响应对象
         * @type {object|null}
         */
        let response = null;

        resetAxiosCalls();

        await new Promise((resolve, reject) => {
            util.httpPost('https://example.com/save', {name: 'xtplayer'}, (result) => {
                response = result;
                resolve();
            }, reject);
        });

        assert.equal(axiosPostCalls.length, 1);
        assert.equal(axiosPostCalls[0].url, 'https://example.com/save');
        assert.deepEqual(axiosPostCalls[0].data, {
            name: 'xtplayer'
        });
        assert.equal(response.status, 200);
        assert.deepEqual(response.data, {
            ok: true
        });
    });
}

/**
 * 执行主测试函数
 * 在最外层补充未捕获异常处理，保证退出状态准确。
 */
main().catch((error) => {
    console.error('FAIL Util 模块测试执行异常');
    console.error(error);
    process.exitCode = 1;
});
