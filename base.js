// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;

// 组件基础类
class Base {
  constructor(arg = '') {
    this.arg = arg;
    this._actions = {};
    this.init();
  }

  init(widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily;
    // 系统设置的key，这里分为三个类型：
    // 1. 全局
    // 2. 不同尺寸的小组件
    // 3. 不同尺寸+小组件自定义的参数
    this.SETTING_KEY = this.md5(Script.name());
    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local();
    //插件设置
    this.settings = this.getSettings();
  }

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  // @ts-ignore
  registerAction(name, func) {
    this._actions[name] = func.bind(this);
  }

  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl(name = '', data = '') {
    let u = URLScheme.forRunningScript();
    let q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(
      this.arg
    )}&__size=${this.widgetFamily}`;
    let result = '';
    if (u.includes('run?')) {
      result = `${u}&${q}`;
    } else {
      result = `${u}?${q}`;
    }
    return result;
  }

  /**
   * 判断系统外观模式
   * @return {Promise<boolean>}
   */
  async isUsingDarkAppearance() {
    return !Color.dynamic(Color.white(), Color.black()).red;
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode(str) {
    const data = Data.fromString(str);
    return data.toBase64String();
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode(b64) {
    const data = Data.fromBase64String(b64);
    return data.toRawString();
  }

  /**
   * md5 加密字符串
   * @param {string} d 要加密成md5的数据
   */
  md5(d) {
    const M = (d) => {
      for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++)
        (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
      return f;
    };
    const X = (d) => {
      for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
      for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
      return _;
    };
    const V = (d) => {
      for (var _ = '', m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
      return _;
    };
    const Y = (d, _) => {
      (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
      for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
        var h = m,
          t = f,
          g = r,
          e = i;
        (f = md5_ii(
          (f = md5_ii(
            (f = md5_ii(
              (f = md5_ii(
                (f = md5_hh(
                  (f = md5_hh(
                    (f = md5_hh(
                      (f = md5_hh(
                        (f = md5_gg(
                          (f = md5_gg(
                            (f = md5_gg(
                              (f = md5_gg(
                                (f = md5_ff(
                                  (f = md5_ff(
                                    (f = md5_ff(
                                      (f = md5_ff(
                                        f,
                                        (r = md5_ff(
                                          r,
                                          (i = md5_ff(
                                            i,
                                            (m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936)),
                                            f,
                                            r,
                                            d[n + 1],
                                            12,
                                            -389564586
                                          )),
                                          m,
                                          f,
                                          d[n + 2],
                                          17,
                                          606105819
                                        )),
                                        i,
                                        m,
                                        d[n + 3],
                                        22,
                                        -1044525330
                                      )),
                                      (r = md5_ff(
                                        r,
                                        (i = md5_ff(
                                          i,
                                          (m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897)),
                                          f,
                                          r,
                                          d[n + 5],
                                          12,
                                          1200080426
                                        )),
                                        m,
                                        f,
                                        d[n + 6],
                                        17,
                                        -1473231341
                                      )),
                                      i,
                                      m,
                                      d[n + 7],
                                      22,
                                      -45705983
                                    )),
                                    (r = md5_ff(
                                      r,
                                      (i = md5_ff(
                                        i,
                                        (m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416)),
                                        f,
                                        r,
                                        d[n + 9],
                                        12,
                                        -1958414417
                                      )),
                                      m,
                                      f,
                                      d[n + 10],
                                      17,
                                      -42063
                                    )),
                                    i,
                                    m,
                                    d[n + 11],
                                    22,
                                    -1990404162
                                  )),
                                  (r = md5_ff(
                                    r,
                                    (i = md5_ff(
                                      i,
                                      (m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682)),
                                      f,
                                      r,
                                      d[n + 13],
                                      12,
                                      -40341101
                                    )),
                                    m,
                                    f,
                                    d[n + 14],
                                    17,
                                    -1502002290
                                  )),
                                  i,
                                  m,
                                  d[n + 15],
                                  22,
                                  1236535329
                                )),
                                (r = md5_gg(
                                  r,
                                  (i = md5_gg(
                                    i,
                                    (m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510)),
                                    f,
                                    r,
                                    d[n + 6],
                                    9,
                                    -1069501632
                                  )),
                                  m,
                                  f,
                                  d[n + 11],
                                  14,
                                  643717713
                                )),
                                i,
                                m,
                                d[n + 0],
                                20,
                                -373897302
                              )),
                              (r = md5_gg(
                                r,
                                (i = md5_gg(
                                  i,
                                  (m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691)),
                                  f,
                                  r,
                                  d[n + 10],
                                  9,
                                  38016083
                                )),
                                m,
                                f,
                                d[n + 15],
                                14,
                                -660478335
                              )),
                              i,
                              m,
                              d[n + 4],
                              20,
                              -405537848
                            )),
                            (r = md5_gg(
                              r,
                              (i = md5_gg(
                                i,
                                (m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438)),
                                f,
                                r,
                                d[n + 14],
                                9,
                                -1019803690
                              )),
                              m,
                              f,
                              d[n + 3],
                              14,
                              -187363961
                            )),
                            i,
                            m,
                            d[n + 8],
                            20,
                            1163531501
                          )),
                          (r = md5_gg(
                            r,
                            (i = md5_gg(
                              i,
                              (m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)),
                              f,
                              r,
                              d[n + 2],
                              9,
                              -51403784
                            )),
                            m,
                            f,
                            d[n + 7],
                            14,
                            1735328473
                          )),
                          i,
                          m,
                          d[n + 12],
                          20,
                          -1926607734
                        )),
                        (r = md5_hh(
                          r,
                          (i = md5_hh(
                            i,
                            (m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)),
                            f,
                            r,
                            d[n + 8],
                            11,
                            -2022574463
                          )),
                          m,
                          f,
                          d[n + 11],
                          16,
                          1839030562
                        )),
                        i,
                        m,
                        d[n + 14],
                        23,
                        -35309556
                      )),
                      (r = md5_hh(
                        r,
                        (i = md5_hh(
                          i,
                          (m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)),
                          f,
                          r,
                          d[n + 4],
                          11,
                          1272893353
                        )),
                        m,
                        f,
                        d[n + 7],
                        16,
                        -155497632
                      )),
                      i,
                      m,
                      d[n + 10],
                      23,
                      -1094730640
                    )),
                    (r = md5_hh(
                      r,
                      (i = md5_hh(
                        i,
                        (m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)),
                        f,
                        r,
                        d[n + 0],
                        11,
                        -358537222
                      )),
                      m,
                      f,
                      d[n + 3],
                      16,
                      -722521979
                    )),
                    i,
                    m,
                    d[n + 6],
                    23,
                    76029189
                  )),
                  (r = md5_hh(
                    r,
                    (i = md5_hh(i, (m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)), f, r, d[n + 12], 11, -421815835)),
                    m,
                    f,
                    d[n + 15],
                    16,
                    530742520
                  )),
                  i,
                  m,
                  d[n + 2],
                  23,
                  -995338651
                )),
                (r = md5_ii(
                  r,
                  (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)), f, r, d[n + 7], 10, 1126891415)),
                  m,
                  f,
                  d[n + 14],
                  15,
                  -1416354905
                )),
                i,
                m,
                d[n + 5],
                21,
                -57434055
              )),
              (r = md5_ii(
                r,
                (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)), f, r, d[n + 3], 10, -1894986606)),
                m,
                f,
                d[n + 10],
                15,
                -1051523
              )),
              i,
              m,
              d[n + 1],
              21,
              -2054922799
            )),
            (r = md5_ii(
              r,
              (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)), f, r, d[n + 15], 10, -30611744)),
              m,
              f,
              d[n + 6],
              15,
              -1560198380
            )),
            i,
            m,
            d[n + 13],
            21,
            1309151649
          )),
          (r = md5_ii(
            r,
            (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)), f, r, d[n + 11], 10, -1120210379)),
            m,
            f,
            d[n + 2],
            15,
            718787259
          )),
          i,
          m,
          d[n + 9],
          21,
          -343485551
        )),
          (m = safe_add(m, h)),
          (f = safe_add(f, t)),
          (r = safe_add(r, g)),
          (i = safe_add(i, e));
      }
      return Array(m, f, r, i);
    };
    const md5_cmn = (d, _, m, f, r, i) => {
      return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m);
    };
    const md5_ff = (d, _, m, f, r, i, n) => {
      return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
    };
    const md5_gg = (d, _, m, f, r, i, n) => {
      return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
    };
    const md5_hh = (d, _, m, f, r, i, n) => {
      return md5_cmn(_ ^ m ^ f, d, _, r, i, n);
    };
    const md5_ii = (d, _, m, f, r, i, n) => {
      return md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
    };
    const safe_add = (d, _) => {
      var m = (65535 & d) + (65535 & _);
      return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
    };
    const bit_rol = (d, _) => {
      return (d << _) | (d >>> (32 - _));
    };
    let result = M(V(Y(X(d), 8 * d.length)));
    return result.toLowerCase();
  }

  /**
   * Alert 弹窗封装
   * @param message
   * @param options
   * @returns {Promise<number>}
   */
  async generateAlert(message, options) {
    const alert = new Alert();
    alert.message = message;
    for (const option of options) {
      alert.addAction(option);
    }
    return await alert.presentAlert();
  }

  /**
   * 缩放图片
   * @param {*} imageSize
   * @param {*} height
   * @returns
   */
  scaleImage(imageSize, height) {
    let scale = height / imageSize.height;
    return new Size(scale * imageSize.width, height);
  }

  /**
   * 将图像裁剪到指定的 rect 中
   * @param img
   * @param rect
   * @returns {Image}
   */
  cropImage(img, rect) {
    const draw = new DrawContext();
    draw.size = new Size(rect.width, rect.height);

    draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y));
    return draw.getImage();
  }

  /**
   * 给图片加一层半透明遮罩
   * @param {Image} img 要处理的图片
   * @param {string} color 遮罩背景颜色
   * @param {any} opacity 透明度
   */
  async shadowImage(img, color = '#000000', opacity = 0.7) {
    let ctx = new DrawContext();
    // 获取图片的尺寸
    ctx.size = img.size;

    ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']));
    ctx.setFillColor(new Color(color, opacity));
    ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']));

    return await ctx.getImage();
  }

  /**
   * 获取远程图片内容
   * @param {string} url 图片地址
   * @param {boolean} useCache 是否使用缓存（请求失败时获取本地缓存）
   */
  async getImageByUrl(url, useCache = true) {
    const cacheKey = this.md5(url);
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey);
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      // @ts-ignore
      return Image.fromFile(cacheFile);
    }
    try {
      const req = new Request(url);
      // @ts-ignore
      const img = await req.loadImage();
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img);
      return img;
    } catch (e) {
      // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      let ctx = new DrawContext();
      ctx.size = new Size(100, 100);
      ctx.setFillColor(Color.red());
      ctx.fillRect(new Rect(0, 0, 100, 100));
      return await ctx.getImage();
    }
  }

  /**
   * 判断对象是否为空
   * @param {*} mixedVar
   * @returns
   */
  empty(mixedVar) {
    let undef;
    let key;
    let i;
    let len;
    const emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }
    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  /**
   * 时间转换
   * @param {*} ts
   * @param {*} formatter
   * @returns
   */
  dateFormat(ts, formatter = 'yyyy-MM-dd HH:mm') {
    let date = new Date(ts);
    let dateFormatter = new DateFormatter();
    dateFormatter.dateFormat = formatter;
    let dateStr = dateFormatter.string(date);

    return dateStr;
  }

  /**
   * @description GET，返回String数据
   * @param {*} param0 request信息
   * @param {*} callback 回调返回response和JSON对象
   */
  async request({method, url, headers = {}, body = null, json = true}, callback = () => {}) {
    const request = new Request('');
    // @ts-ignore
    request.url = url;
    // @ts-ignore
    request.method = method;
    // @ts-ignore
    request.headers = {
      ...headers
    };
    // @ts-ignore
    if (body) {
      request.body = body;
    }
    request.timeoutInterval = 30;
    // @ts-ignore
    let data = await (json ? request.loadJSON() : request.loadString());
    // @ts-ignore
    callback(request.response, data);
    return data;
  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify(title, body, url = null, opts = {}) {
    // @ts-ignore
    let n = new Notification();
    n = Object.assign(n, opts);
    // @ts-ignore
    n.title = title;
    // @ts-ignore
    n.body = body;
    // @ts-ignore
    if (url) n.openURL = url;
    // @ts-ignore
    return await n.schedule();
  }

  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json = true) {
    let res = json ? {} : '';
    let cache = '';
    if (Keychain.contains(this.SETTING_KEY)) {
      cache = Keychain.get(this.SETTING_KEY);
    }
    if (json) {
      try {
        res = JSON.parse(cache);
      } catch (e) {}
    } else {
      res = cache;
    }

    return res;
  }

  /**
   * 存储当前设置
   * @param {*} notify 是否通知提示
   */
  saveSettings(notify = true) {
    let res = typeof this.settings === 'object' ? JSON.stringify(this.settings) : String(this.settings);
    Keychain.set(this.SETTING_KEY, res);
    // @ts-ignore
    if (notify) this.notify('设置成功', '桌面组件稍后将自动刷新');
  }

  /**
   * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
   * 即 百度 转 谷歌、高德
   * @param bd_lon
   * @param bd_lat
   * @returns {*[]}
   */
  bd09togcj02(bd_lon, bd_lat) {
    let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
    let x = bd_lon - 0.0065;
    let y = bd_lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let gg_lng = z * Math.cos(theta);
    let gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
  }

  /**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
   * 即谷歌、高德 转 百度
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  gcj02tobd09(lng, lat) {
    const x_PI = (3.14159265358979324 * 3000.0) / 180.0;
    let z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
    let theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
    let bd_lng = z * Math.cos(theta) + 0.0065;
    let bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  }

  /**
   * WGS84转GCj02/谷歌、高德
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  wgs84togcj02(lng, lat) {
    const PI = 3.1415926535897932384626;
    const a = 6378245.0;
    const ee = 0.00669342162296594323;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let dlat = this.transformlat(lng - 105.0, lat - 35.0);
      let dlng = this.transformlng(lng - 105.0, lat - 35.0);
      let radlat = (lat / 180.0) * PI;
      let magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      let sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      let mglat = lat + dlat;
      let mglng = lng + dlng;
      return [mglng, mglat];
    }
  }

  /**
   * GCJ02/谷歌、高德 转换为 WGS84 gcj02towgs84
   * @param lng
   * @param lat
   * @returns {*[]}
   */
  gcj02towgs84(lng, lat) {
    const PI = 3.1415926535897932384626;
    const a = 6378245.0;
    const ee = 0.00669342162296594323;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      let dlat = this.transformlat(lng - 105.0, lat - 35.0);
      let dlng = this.transformlng(lng - 105.0, lat - 35.0);
      let radlat = (lat / 180.0) * PI;
      let magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      let sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      let mglat = lat + dlat;
      let mglng = lng + dlng;
      return [lng * 2 - mglng, lat * 2 - mglat];
    }
  }

  transformlat(lng, lat) {
    const PI = 3.1415926535897932384626;
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
    return ret;
  }

  transformlng(lng, lat) {
    const PI = 3.1415926535897932384626;
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
    return ret;
  }

  /**
   * 判断是否在国内，不在国内则不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  out_of_china(lng, lat) {
    return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false;
  }

  async blurImage(img, style) {
    const blur = 150;
    const js = `
var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];function stackBlurCanvasRGB(id,top_x,top_y,width,height,radius){if(isNaN(radius)||radius<1)return;radius|=0;var canvas=document.getElementById(id);var context=canvas.getContext("2d");var imageData;try{try{imageData=context.getImageData(top_x,top_y,width,height)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");imageData=context.getImageData(top_x,top_y,width,height)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var pixels=imageData.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var div=radius+radius+1;var w4=width<<2;var widthMinus1=width-1;var heightMinus1=height-1;var radiusPlus1=radius+1;var sumFactor=radiusPlus1*(radiusPlus1+1)/2;var stackStart=new BlurStack();var stack=stackStart;for(i=1;i<div;i++){stack=stack.next=new BlurStack();if(i==radiusPlus1)var stackEnd=stack}stack.next=stackStart;var stackIn=null;var stackOut=null;yw=yi=0;var mul_sum=mul_table[radius];var shg_sum=shg_table[radius];for(y=0;y<height;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}for(i=1;i<radiusPlus1;i++){p=yi+((widthMinus1<i?widthMinus1:i)<<2);r_sum+=(stack.r=(pr=pixels[p]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[p+1]))*rbs;b_sum+=(stack.b=(pb=pixels[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next}stackIn=stackStart;stackOut=stackEnd;for(x=0;x<width;x++){pixels[yi]=(r_sum*mul_sum)>>shg_sum;pixels[yi+1]=(g_sum*mul_sum)>>shg_sum;pixels[yi+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(yw+((p=x+radius+1)<widthMinus1?p:widthMinus1))<<2;r_in_sum+=(stackIn.r=pixels[p]);g_in_sum+=(stackIn.g=pixels[p+1]);b_in_sum+=(stackIn.b=pixels[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=4}yw+=width}for(x=0;x<width;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=radiusPlus1*(pr=pixels[yi]);g_out_sum=radiusPlus1*(pg=pixels[yi+1]);b_out_sum=radiusPlus1*(pb=pixels[yi+2]);r_sum+=sumFactor*pr;g_sum+=sumFactor*pg;b_sum+=sumFactor*pb;stack=stackStart;for(i=0;i<radiusPlus1;i++){stack.r=pr;stack.g=pg;stack.b=pb;stack=stack.next}yp=width;for(i=1;i<=radius;i++){yi=(yp+x)<<2;r_sum+=(stack.r=(pr=pixels[yi]))*(rbs=radiusPlus1-i);g_sum+=(stack.g=(pg=pixels[yi+1]))*rbs;b_sum+=(stack.b=(pb=pixels[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;stack=stack.next;if(i<heightMinus1){yp+=width}}yi=x;stackIn=stackStart;stackOut=stackEnd;for(y=0;y<height;y++){p=yi<<2;pixels[p]=(r_sum*mul_sum)>>shg_sum;pixels[p+1]=(g_sum*mul_sum)>>shg_sum;pixels[p+2]=(b_sum*mul_sum)>>shg_sum;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=stackIn.r;g_out_sum-=stackIn.g;b_out_sum-=stackIn.b;p=(x+(((p=y+radiusPlus1)<heightMinus1?p:heightMinus1)*width))<<2;r_sum+=(r_in_sum+=(stackIn.r=pixels[p]));g_sum+=(g_in_sum+=(stackIn.g=pixels[p+1]));b_sum+=(b_in_sum+=(stackIn.b=pixels[p+2]));stackIn=stackIn.next;r_out_sum+=(pr=stackOut.r);g_out_sum+=(pg=stackOut.g);b_out_sum+=(pb=stackOut.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;stackOut=stackOut.next;yi+=width}}context.putImageData(imageData,top_x,top_y)}function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}
      // https://gist.github.com/mjackson/5311256

      function rgbToHsl(r, g, b){
          r /= 255, g /= 255, b /= 255;
          let max = Math.max(r, g, b), min = Math.min(r, g, b);
          let h, s, l = (max + min) / 2;

          if(max == min){
              h = s = 0; // achromatic
          }else{
              let d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch(max){
                  case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                  case g: h = (b - r) / d + 2; break;
                  case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
          }

          return [h, s, l];
      }

      function hslToRgb(h, s, l){
          let r, g, b;

          if(s == 0){
              r = g = b = l; // achromatic
          }else{
              var hue2rgb = function hue2rgb(p, q, t){
                  if(t < 0) t += 1;
                  if(t > 1) t -= 1;
                  if(t < 1/6) return p + (q - p) * 6 * t;
                  if(t < 1/2) return q;
                  if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                  return p;
              }

              let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              let p = 2 * l - q;
              r = hue2rgb(p, q, h + 1/3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1/3);
          }

          return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      }

      function lightBlur(hsl) {

        // Adjust the luminance.
        let lumCalc = 0.35 + (0.3 / hsl[2]);
        if (lumCalc < 1) { lumCalc = 1; }
        else if (lumCalc > 3.3) { lumCalc = 3.3; }
        const l = hsl[2] * lumCalc;

        // Adjust the saturation.
        const colorful = 2 * hsl[1] * l;
        const s = hsl[1] * colorful * 1.5;

        return [hsl[0],s,l];

      }

      function darkBlur(hsl) {

        // Adjust the saturation.
        const colorful = 2 * hsl[1] * hsl[2];
        const s = hsl[1] * (1 - hsl[2]) * 3;

        return [hsl[0],s,hsl[2]];

      }

      // Set up the canvas.
      const img = document.getElementById("blurImg");
      const canvas = document.getElementById("mainCanvas");

      const w = img.naturalWidth;
      const h = img.naturalHeight;

      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w;
      canvas.height = h;

      const context = canvas.getContext("2d");
      context.clearRect( 0, 0, w, h );
      context.drawImage( img, 0, 0 );

      // Get the image data from the context.
      let imageData = context.getImageData(0,0,w,h);
      let pix = imageData.data;

      let isDark = "${style}" == "dark";
      let imageFunc = isDark ? darkBlur : lightBlur;

      for (let i=0; i < pix.length; i+=4) {

        // Convert to HSL.
        let hsl = rgbToHsl(pix[i],pix[i+1],pix[i+2]);

        // Apply the image function.
        hsl = imageFunc(hsl);

        // Convert back to RGB.
        const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

        // Put the values back into the data.
        pix[i] = rgb[0];
        pix[i+1] = rgb[1];
        pix[i+2] = rgb[2];

      }

      // Draw over the old image.
      context.putImageData(imageData,0,0);

      // Blur the image.
      stackBlurCanvasRGB("mainCanvas", 0, 0, w, h, ${blur});

      // Perform the additional processing for dark images.
      if (isDark) {

        // Draw the hard light box over it.
        context.globalCompositeOperation = "hard-light";
        context.fillStyle = "rgba(55,55,55,0.2)";
        context.fillRect(0, 0, w, h);

        // Draw the soft light box over it.
        context.globalCompositeOperation = "soft-light";
        context.fillStyle = "rgba(55,55,55,1)";
        context.fillRect(0, 0, w, h);

        // Draw the regular box over it.
        context.globalCompositeOperation = "source-over";
        context.fillStyle = "rgba(55,55,55,0.4)";
        context.fillRect(0, 0, w, h);

      // Otherwise process light images.
      } else {
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(0, 0, w, h);
      }

      // Return a base64 representation.
      canvas.toDataURL();
      `;

    // Convert the images and create the HTML.
    let blurImgData = Data.fromPNG(img).toBase64String();
    let html = `
      <img id="blurImg" src="data:image/png;base64,${blurImgData}" />
      <canvas id="mainCanvas" />
      `;

    // Make the web view and get its return value.
    let view = new WebView();
    await view.loadHTML(html);
    let returnValue = await view.evaluateJavaScript(js);

    // Remove the data type from the string and convert to data.
    let imageDataString = returnValue.slice(22);
    let imageData = Data.fromBase64String(imageDataString);

    // Convert to image and crop before returning.
    let imageFromData = Image.fromData(imageData);
    // return cropImage(imageFromData)
    return imageFromData;
  }

  async reverseImage(img) {
    const js = `
        function getXY(obj, x, y) {
    const w = obj.width;
    const h = obj.height;
    const d = obj.data;
    const color = [];

    color[0] = d[(y * w + x) * 4];
    color[1] = d[(y * w + x) * 4 + 1];
    color[2] = d[(y * w + x) * 4 + 2];
    color[3] = d[(y * w + x) * 4 + 3];
    return color;
  }
  function setXY(obj, x, y, color) {
    const w = obj.width;
    const h = obj.height;
    const d = obj.data;
    d[(y * w + x) * 4] = color[0];
    d[(y * w + x) * 4 + 1] = color[1];
    d[(y * w + x) * 4 + 2] = color[2];
    d[(y * w + x) * 4 + 3] = color[3];
  }

  const img = document.getElementById('reverseImg');
  const canvas = document.getElementById('canvas');

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  canvas.style.width = iw + 'px';
  canvas.style.height = ih + 'px';
  canvas.width = iw;
  canvas.height = ih;
  const context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  const oImg = context.getImageData(0, 0, iw, ih);
  const w = oImg.width;
  const h = oImg.height;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let result = [];
      let cc = getXY(oImg, j, i);
      result[0] = 255 - cc[0];
      result[1] = 255 - cc[1];
      result[2] = 255 - cc[2];
      result[3] = 255;
      setXY(oImg, j, i, result);
    }
  }
  context.putImageData(oImg, 0, 0);

  canvas.toDataURL();
  `;
    // Convert the images and create the HTML.
    let imgData = Data.fromPNG(img).toBase64String();
    let html = `
      <img id="reverseImg" src="data:image/png;base64,${imgData}" />
      <canvas id="canvas" />
      `;

    // Make the web view and get its return value.
    let view = new WebView();
    await view.loadHTML(html);
    let returnValue = await view.evaluateJavaScript(js);

    // Remove the data type from the string and convert to data.
    let imageDataString = returnValue.slice(22);
    let imageData = Data.fromBase64String(imageDataString);

    // Convert to image and crop before returning.
    let imageFromData = Image.fromData(imageData);
    // return cropImage(imageFromData)
    return imageFromData;
  }
}
// @base.end
// 运行环境
// @running.start
const Running = async (Widget, default_args = '') => {
  let M = null;
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '');
    const W = await M.render();
    try {
      if (M.settings?.UserConfig?.refresh_interval) {
        W.refreshAfterDate = new Date(
          +new Date() + 1000 * 60 * parseInt(M.settings?.UserConfig?.refresh_interval || 5)
        );
      }
    } catch (e) {
      console.log(e);
    }
    Script.setWidget(W);
    Script.complete();
  } else if (config.runsWithSiri) {
    let act = args.shortcutParameter.act;
    let output = args.shortcutParameter.output || false;
    if (typeof act !== 'undefined' && act) {
      M = new Widget();
      M.init();
      let _tmp = act
        .split('-')
        .map((_) => _[0].toUpperCase() + _.substr(1))
        .join('');
      let _act = `action${_tmp}`;
      if (M[_act] && typeof M[_act] === 'function') {
        const func = M[_act].bind(M);
        const data = await func();
        if (output) {
          Script.setShortcutOutput(data);
        }
      }
    }
  } else {
    let {act, data, __arg, __size} = args.queryParameters;
    M = new Widget(__arg || default_args || '');
    if (__size) M.init(__size);
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions'];
      const _actions = [
        async () => {
          Safari.openInApp('https://scriptable.ningkai.wang', false);
        }
      ];
      const alert = new Alert();
      alert.title = M.name;
      alert.message = M.desc;
      alert.addAction('文档手册');
      for (let _ in actions) {
        alert.addAction(_);
        _actions.push(actions[_]);
      }
      alert.addCancelAction('取消操作');
      const idx = await alert.presentSheet();
      if (_actions[idx]) {
        const func = _actions[idx];
        await func();
      }
      Script.complete();
      return;
    }
    let _tmp = act
      .split('-')
      .map((_) => _[0].toUpperCase() + _.substr(1))
      .join('');
    let _act = `action${_tmp}`;
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M);
      await func(data);
    }
  }
  Script.complete();
};
// @running.end

// 测试环境
const Testing = async (Widget, default_args = '') => {
  let M = null;
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '');
    const W = await M.render();
    Script.setWidget(W);
    Script.complete();
  } else if (config.runsWithSiri) {
    let act = args.shortcutParameter.act;
    if (typeof act !== 'undefined' && act) {
      M = new Widget();
      M.init();
      let _tmp = act
        .split('-')
        .map((_) => _[0].toUpperCase() + _.substr(1))
        .join('');
      let _act = `action${_tmp}`;
      if (M[_act] && typeof M[_act] === 'function') {
        const func = M[_act].bind(M);
        await func();
      }
    }

    Script.complete();
  } else {
    let {act, data, __arg, __size} = args.queryParameters;
    M = new Widget(__arg || default_args || '');
    if (__size) M.init(__size);
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions'];
      const _actions = [
        // 远程开发
        async () => {
          // 1. 获取服务器ip
          const a = new Alert();
          a.title = '服务器 IP';
          a.message = '请输入远程开发服务器（电脑）IP地址';
          let xjj_debug_server = '192.168.1.3';
          if (Keychain.contains('xjj_debug_server')) {
            xjj_debug_server = Keychain.get('xjj_debug_server');
          }
          a.addTextField('server-ip', xjj_debug_server);
          a.addAction('连接');
          a.addCancelAction('取消');
          const id = await a.presentAlert();
          if (id === -1) return;
          const ip = a.textFieldValue(0);
          // 保存到本地
          Keychain.set('xjj_debug_server', ip);
          const server_api = `http://${ip}:5566`;
          // 2. 发送当前文件到远程服务器
          // @ts-ignore
          const SELF_FILE = module.filename.replace('「小件件」开发环境', Script.name());
          const req = new Request(`${server_api}/sync`);
          // @ts-ignore
          req.method = 'POST';
          // @ts-ignore
          req.addFileToMultipart(SELF_FILE, 'Widget', Script.name());
          try {
            // @ts-ignore
            const res = await req.loadString();
            if (res !== 'ok') {
              return M.notify('连接失败', res);
            }
          } catch (e) {
            return M.notify('连接错误', e.message);
          }
          M.notify('连接成功', '编辑文件后保存即可进行下一步预览操作');
          // 重写console.log方法，把数据传递到nodejs
          const rconsole_log = async (data, t = 'log') => {
            const _req = new Request(`${server_api}/console`);
            // @ts-ignore
            _req.method = 'POST';
            // @ts-ignore
            _req.headers = {
              'Content-Type': 'application/json'
            };
            // @ts-ignore
            _req.body = JSON.stringify({
              t,
              data
            });
            // @ts-ignore
            return await _req.loadString();
          };
          const lconsole_log = console.log.bind(console);
          const lconsole_warn = console.warn.bind(console);
          const lconsole_error = console.error.bind(console);
          console.log = (d) => {
            lconsole_log(d);
            rconsole_log(d, 'log');
          };
          console.warn = (d) => {
            lconsole_warn(d);
            rconsole_log(d, 'warn');
          };
          console.error = (d) => {
            lconsole_error(d);
            rconsole_log(d, 'error');
          };
          // 3. 同步
          while (1) {
            let _res = '';
            try {
              const _req = new Request(`${server_api}/sync?name=${encodeURIComponent(Script.name())}`);
              // @ts-ignore
              _res = await _req.loadString();
            } catch (e) {
              M.notify('停止调试', '与开发服务器的连接已终止');
              break;
            }
            if (_res === 'stop') {
              console.log('[!] 停止同步');
              break;
            } else if (_res === 'no') {
              // console.log("[-] 没有更新内容")
            } else if (_res.length > 0) {
              M.notify('同步成功', '新文件已同步，大小：' + _res.length);
              // 重新加载组件
              // 1. 读取当前源码
              const _code = _res.split('// @组件代码开始')[1].split('// @组件代码结束')[0];
              // 2. 解析 widget class
              let NewWidget = null;
              try {
                const _func = new Function(`const _Debugger = Base => {\n${_code}\nreturn Widget\n}\nreturn _Debugger`);
                NewWidget = _func()(Base);
              } catch (e) {
                M.notify('解析失败', e.message);
              }
              if (!NewWidget) continue;
              // 3. 重新执行 widget class
              // @ts-ignore
              delete M;
              M = new NewWidget(__arg || default_args || '');
              if (__size) M.init(__size);
              // 写入文件
              FileManager.local().writeString(SELF_FILE, _res);
              // 执行预览
              let i = await _actions[1](true);
              if (i === 4 + Object.keys(actions).length) break;
            }
          }
        },
        // 预览组件
        async (debug = false) => {
          let a = new Alert();
          a.title = '预览组件';
          a.message = '测试桌面组件在各种尺寸下的显示效果';
          a.addAction('小尺寸 Small');
          a.addAction('中尺寸 Medium');
          a.addAction('大尺寸 Large');
          a.addAction('全部 All');
          a.addCancelAction('取消操作');
          const funcs = [];
          if (debug) {
            for (let _ in actions) {
              a.addAction(_);
              funcs.push(actions[_].bind(M));
            }
            a.addDestructiveAction('停止调试');
          }
          let i = await a.presentSheet();
          if (i === -1) return;
          let w;
          switch (i) {
            case 0:
              M.widgetFamily = 'small';
              w = await M.render();
              await w.presentSmall();
              break;
            case 1:
              M.widgetFamily = 'medium';
              w = await M.render();
              await w.presentMedium();
              break;
            case 2:
              M.widgetFamily = 'large';
              w = await M.render();
              await w.presentLarge();
              break;
            case 3:
              M.widgetFamily = 'small';
              w = await M.render();
              await w.presentSmall();
              M.widgetFamily = 'medium';
              w = await M.render();
              await w.presentMedium();
              M.widgetFamily = 'large';
              w = await M.render();
              await w.presentLarge();
              break;
            default:
              const func = funcs[i - 4];
              if (func) await func();
              break;
          }

          return i;
        },
        // 复制源码
        async () => {
          // @ts-ignore
          const SELF_FILE = module.filename.replace('「小件件」开发环境', Script.name());
          const source = FileManager.local().readString(SELF_FILE);
          Pasteboard.copyString(source);
          await M.notify('复制成功', '当前脚本的源代码已复制到剪贴板！');
        }
      ];
      const alert = new Alert();
      alert.title = M.name;
      alert.message = M.desc;
      alert.addAction('远程开发');
      alert.addAction('预览组件');
      alert.addAction('复制源码');
      for (let _ in actions) {
        alert.addAction(_);
        _actions.push(actions[_]);
      }
      alert.addCancelAction('取消操作');
      const idx = await alert.presentSheet();
      if (_actions[idx]) {
        const func = _actions[idx];
        await func();
      }
      Script.complete();
      return;
    }
    let _tmp = act
      .split('-')
      .map((_) => _[0].toUpperCase() + _.substr(1))
      .join('');
    let _act = `action${_tmp}`;
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M);
      await func(data);
    }
    Script.complete();
  }
};

module.exports = {
  Base,
  Testing,
  Running
};
