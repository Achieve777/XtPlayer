// 导入待测函数
const Subtitle = require('./tPlayer/src/js/Subtitle');

describe('Subtitle 构造函数测试', () => {
  let xtPlayer;

  beforeEach(() => {
    // 创建一个模拟的 xtPlayer 对象
    xtPlayer = {
      el: {
        find: jest.fn().mockReturnValue({})
      }
    };
  });

  test('构造函数初始化', () => {
    const subtitle = new Subtitle(xtPlayer);

    // 验证属性赋值
    expect(subtitle.xtPlayer).toEqual(xtPlayer);
    expect(subtitle.el).toEqual(xtPlayer.el.find('.xt-player-subtitle'));

    // 验证 _loadSubtitle 方法被调用
    expect(subtitle._loadSubtitle).toHaveBeenCalledTimes(1);

    // 验证 _subTitleThread 方法被调用
    expect(subtitle._subTitleThread).toHaveBeenCalledTimes(1);
  });

  test('find 方法模拟返回 null', () => {
    xtPlayer.el.find.mockReturnValueOnce(null);

    const subtitle = new Subtitle(xtPlayer);

    // 验证 el 属性为 null
    expect(subtitle.el).toBeNull();
  });
});
