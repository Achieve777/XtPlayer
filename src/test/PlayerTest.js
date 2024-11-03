// 导入待测函数
const XtPlayer = require('./tPlayer/src/js/XtPlayer');

describe('XtPlayer 构造函数测试', () => {
  let player;

  beforeEach(() => {
    // 创建一个模拟的 DOM 元素
    const element = document.createElement('div');
    // 模拟选项
    const options = {
      // 可以添加其他相关选项进行测试
    };

    player = new XtPlayer(element, options);
  });

  test('构造函数初始化属性', () => {
    expect(player.info.author).toEqual('幻音い');
    expect(player.info.website).toEqual('https://www.acgxt.com');
    expect(player.info.version).toEqual('1.2.1');
    expect(player.info.project).toEqual('https://xtplayer.acgxt.com');
    expect(player.el).toBeDefined();
    expect(player._build).toBeDefined();
    expect(player._video).toBeDefined();
    expect(player._options).toEqual(options);
    expect(player._isInit).toEqual(false);
  });

  test('初始化时设置加载状态', () => {
    expect(player.setLoading).toHaveBeenCalledTimes(1);
    expect(player.setLoading).toHaveBeenCalledWith(true);
  });

  test('初始化视频相关操作', () => {
    expect(player._initVideo).toHaveBeenCalledTimes(1);
    expect(player._initEvent).toHaveBeenCalledTimes(1);
    expect(player._initKey).toHaveBeenCalledTimes(1);
  });

  test('初始化完成后设置加载状态', () => {
    expect(player.setLoading).toHaveBeenCalledTimes(2);
    expect(player.setLoading).toHaveBeenCalledWith(false);
  });

  test('初始化完成后设置初始化状态', () => {
    expect(player._isInit).toEqual(true);
  });
});
