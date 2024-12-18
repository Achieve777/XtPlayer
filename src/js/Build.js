class Build{

    constructor(XtPlayer){
        this.XtPlayer = XtPlayer
        this._createPlayer();
    }

    /**
     * 初始化播放器
     * @param {Object} options - 播放器配置选项
     * @param {string} options.url - 视频源地址
     * @param {string} options.type - 视频类型
     * @param {string} options.quality - 视频质量
     * @param {boolean} options.loop - 是否循环播放
     * @param {boolean} options.autoplay - 是否自动播放
     * @param {boolean} options.preload - 是否预先加载
     * /
    init(options){
        this._createPlayer();
    }

    /**
     * 播放视频
     */
    play(){
        this._video.play();
    }

    /**
     * 创建一个新的玩家对象
     * @param {string} name - 玩家的名称
     * @param {string} role - 玩家的角色
     * @returns {Object} - 包含玩家信息的对象
     */
    _createPlayer(){
        let playerCode = `<div class="xt-player-loading">
        <svg x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50" xml:space="preserve">
            <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
             transform="rotate(338.83 25 25)">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s"
                 repeatCount="indefinite"></animateTransform>
            </path>
        </svg>
    </div>
    <div class="xt-player-status">
        <i class="xt-icon-play" xt-title="播放"></i>
    </div>
    <video src="#" class="xt-player-video"></video>
    <div class="xt-player-danmaku">
        <canvas class="xt-player-danmu"></canvas>
    </div>
    <div class="xt-player-action">
        <div class="xt-player-toast"></div>
        <div class="top">
            <div class="progress-time">00:00:00</div>
            <div class="xt-player-progress">
                <div class="progress-item"></div>
                <div class="progress-cache-list"></div>
            </div>
        </div>
        <div class="bottom">
            <div class="xt-text-show"></div>
            <div class="xt-player-btn">
                <i class="xt-icon-play" xt-title="播放"></i>
                <i class="xt-icon-pause" xt-title="暂停"></i>
            </div>
            <div class="xt-player-current">
                <input type="text" placeholder="00:00" value="00:00" class="set-current-time">
                <div class="player-current-time">
                    <em class="xt-player-current-time">00:00</em> 
                    <span>/</span>
                    <em class="xt-player-count-time">00:00</em>
                </div>
            </div>
            <div class="xt-player-danmu">
                <div class="xt-player-damuku-warp">
                    <input type="text" class="inputDanmu" placeholder="不来一发弹幕嘛~" />
                </div>
            </div>
            <div class="xt-player-send-danmu">
                <i class="xt-icon-send sendDanmu" xt-title="发送弹幕"></i>
            </div>
            <div class="xt-player-quality">
                <span>自动</span>
                <ul class="xt-player-quality-list"></ul>
            </div>
            <div class="xt-player-volume">
                <div class="xt-player-volume-controller">
                    <div class="xt-player-volume-progress">
                        <div class="xt-player-volume-progress-item">
                            <div class="xt-player-volume-progress-item-btn"></div>
                        </div>
                    </div>
                </div>
                <i class="xt-icon-volume3 xt-icon-volume" xt-title="音量"></i>
            </div>
            <div class="xt-player-setting">
                <i class="xt-icon-setting" xt-title="设置"></i>
                <div class="xt-player-setting-controller">
                    <ul>
                        <li>
                            <em>洗脑循环</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="loop">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <em>自动播放</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="autoplay">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <em>预先加载</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="preload">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <em>弹幕开关</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="danmu">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <em>防挡字幕</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="presubtitle">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <em>字幕开关</em>
                            <div class="xt-player-setting-right">
                                <div class="xt-player-btn-toggle active" data-type="subtitle">
                                    <div class="xt-player-btn-toggle-item"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="xt-player-window-screen">
                <i class="xt-icon-window-full" xt-title="窗口全屏"></i>
            </div>
            <div class="xt-player-screen">
                <i class="xt-icon-screen-max" xt-title="全屏"></i>
            </div>
        </div>
    </div>
    <div class="xt-player-subtitle">
        <div class="xt-player-subtitle-text"></div>
    </div>
    <div class="xt-right">
        <ul>
            <li><a href="${this.XtPlayer.info.project}" target="_blank">XtPlayer v${this.XtPlayer.info.version}</a></li>
            <li><a href="${this.XtPlayer.info.website}" target="_blank">关于作者</a></li>
            <li class="run_picture_in_picture"><a href="javascript:;">画中画</a></li>
            <li class="double_speed">
                <em title="0.5倍速" data-speed="0.5">0.5</em>
                <em title="1.0倍速" data-speed="1.0">正常</em>
                <em title="1.5倍速" data-speed="1.5">1.5</em>
                <em title="2.0倍速" data-speed="2.0">2.0</em>
            </li>
        </ul>
    </div>`;
        this.XtPlayer.el.addClass("xt-player");
        this.XtPlayer.el.html(playerCode);
    }


}

module.exports = Build;