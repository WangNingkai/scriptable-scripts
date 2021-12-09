// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: code-branch;

// 组件基础类
class Base {
  constructor (arg="") {
    this.arg = arg
    this._actions = {}
    this.init()
  }

  init (widgetFamily = config.widgetFamily) {
    // 组件大小：small,medium,large
    this.widgetFamily = widgetFamily
    // 系统设置的key，这里分为三个类型：
    // 1. 全局
    // 2. 不同尺寸的小组件
    // 3. 不同尺寸+小组件自定义的参数
    this.SETTING_KEY = this.md5(Script.name())
    // 文件管理器
    // 提示：缓存数据不要用这个操作，这个是操作源码目录的，缓存建议存放在local temp目录中
    // @ts-ignore
    this.FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']()
    // 本地，用于存储图片等
    this.FILE_MGR_LOCAL = FileManager.local()
    this.BACKGROUND_KEY = this.FILE_MGR_LOCAL.joinPath(this.FILE_MGR_LOCAL.documentsDirectory(), `bg_${this.SETTING_KEY}.jpg`)

    // // 插件设置
    this.settings = this.getSettings()
  }

  /**
   * 注册点击操作菜单
   * @param {string} name 操作函数名
   * @param {func} func 点击后执行的函数
   */
  // @ts-ignore
  registerAction (name, func) {
    this._actions[name] = func.bind(this)
  }

  /**
   * 生成操作回调URL，点击后执行本脚本，并触发相应操作
   * @param {string} name 操作的名称
   * @param {string} data 传递的数据
   */
  actionUrl (name = '', data = '') {
    let u = URLScheme.forRunningScript()
    let q = `act=${encodeURIComponent(name)}&data=${encodeURIComponent(data)}&__arg=${encodeURIComponent(this.arg)}&__size=${this.widgetFamily}`
    let result = ''
    if (u.includes('run?')) {
      result = `${u}&${q}`
    } else {
      result = `${u}?${q}`
    }
    return result
  }

  /**
   * base64 编码字符串
   * @param {string} str 要编码的字符串
   */
  base64Encode (str) {
    const data = Data.fromString(str)
    return data.toBase64String()
  }

  /**
   * base64解码数据 返回字符串
   * @param {string} b64 base64编码的数据
   */
  base64Decode (b64) {
    const data = Data.fromBase64String(b64)
    return data.toRawString()
  }

  /**
   * md5 加密字符串
   * @param {string} d 要加密成md5的数据
   */
  md5 (d) {
    const M = (d) => { for (var _, m = '0123456789ABCDEF', f = '', r = 0; r < d.length; r++)(_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _)); return f }; const X = (d) => { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ }; const V = (d) => { for (var _ = '', m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255); return _ }; const Y = (d, _) => { (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _); for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16){ var h = m, t = f, g = r, e = i; (f = md5_ii((f = md5_ii((f = md5_ii((f = md5_ii((f = md5_hh((f = md5_hh((f = md5_hh((f = md5_hh((f = md5_gg((f = md5_gg((f = md5_gg((f = md5_gg((f = md5_ff((f = md5_ff((f = md5_ff((f = md5_ff(f, (r = md5_ff(r, (i = md5_ff(i, (m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936)), f, r, d[n + 1], 12, -389564586)), m, f, d[n + 2], 17, 606105819)), i, m, d[n + 3], 22, -1044525330)), (r = md5_ff(r, (i = md5_ff(i, (m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897)), f, r, d[n + 5], 12, 1200080426)), m, f, d[n + 6], 17, -1473231341)), i, m, d[n + 7], 22, -45705983)), (r = md5_ff(r, (i = md5_ff(i, (m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416)), f, r, d[n + 9], 12, -1958414417)), m, f, d[n + 10], 17, -42063)), i, m, d[n + 11], 22, -1990404162)), (r = md5_ff(r, (i = md5_ff(i, (m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682)), f, r, d[n + 13], 12, -40341101)), m, f, d[n + 14], 17, -1502002290)), i, m, d[n + 15], 22, 1236535329)), (r = md5_gg(r, (i = md5_gg(i, (m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510)), f, r, d[n + 6], 9, -1069501632)), m, f, d[n + 11], 14, 643717713)), i, m, d[n + 0], 20, -373897302)), (r = md5_gg(r, (i = md5_gg(i, (m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691)), f, r, d[n + 10], 9, 38016083)), m, f, d[n + 15], 14, -660478335)), i, m, d[n + 4], 20, -405537848)), (r = md5_gg(r, (i = md5_gg(i, (m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438)), f, r, d[n + 14], 9, -1019803690)), m, f, d[n + 3], 14, -187363961)), i, m, d[n + 8], 20, 1163531501)), (r = md5_gg(r, (i = md5_gg(i, (m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)), f, r, d[n + 2], 9, -51403784)), m, f, d[n + 7], 14, 1735328473)), i, m, d[n + 12], 20, -1926607734)), (r = md5_hh(r, (i = md5_hh(i, (m = md5_hh(m, f, r, i, d[n + 5], 4, -378558)), f, r, d[n + 8], 11, -2022574463)), m, f, d[n + 11], 16, 1839030562)), i, m, d[n + 14], 23, -35309556)), (r = md5_hh(r, (i = md5_hh(i, (m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)), f, r, d[n + 4], 11, 1272893353)), m, f, d[n + 7], 16, -155497632)), i, m, d[n + 10], 23, -1094730640)), (r = md5_hh(r, (i = md5_hh(i, (m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174)), f, r, d[n + 0], 11, -358537222)), m, f, d[n + 3], 16, -722521979)), i, m, d[n + 6], 23, 76029189)), (r = md5_hh(r, (i = md5_hh(i, (m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487)), f, r, d[n + 12], 11, -421815835)), m, f, d[n + 15], 16, 530742520)), i, m, d[n + 2], 23, -995338651)), (r = md5_ii(r, (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844)), f, r, d[n + 7], 10, 1126891415)), m, f, d[n + 14], 15, -1416354905)), i, m, d[n + 5], 21, -57434055)), (r = md5_ii(r, (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)), f, r, d[n + 3], 10, -1894986606)), m, f, d[n + 10], 15, -1051523)), i, m, d[n + 1], 21, -2054922799)), (r = md5_ii(r, (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)), f, r, d[n + 15], 10, -30611744)), m, f, d[n + 6], 15, -1560198380)), i, m, d[n + 13], 21, 1309151649)), (r = md5_ii(r, (i = md5_ii(i, (m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070)), f, r, d[n + 11], 10, -1120210379)), m, f, d[n + 2], 15, 718787259)), i, m, d[n + 9], 21, -343485551)), (m = safe_add(m, h)), (f = safe_add(f, t)), (r = safe_add(r, g)), (i = safe_add(i, e)) } return Array(m, f, r, i) }; const md5_cmn = (d, _, m, f, r, i) => { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) }; const md5_ff = (d, _, m, f, r, i, n) => { return md5_cmn((_ & m) | (~_ & f), d, _, r, i, n) }; const md5_gg = (d, _, m, f, r, i, n) => { return md5_cmn((_ & f) | (m & ~f), d, _, r, i, n) }; const md5_hh = (d, _, m, f, r, i, n) => { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) }; const md5_ii = (d, _, m, f, r, i, n) => { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) }; const safe_add = (d, _) => { var m = (65535 & d) + (65535 & _); return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m) }; const bit_rol = (d, _) => { return (d << _) | (d >>> (32 - _)) };
    let result = M(V(Y(X(d), 8 * d.length)));
    return result.toLowerCase()
  };

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
   * 判断对象是否为空
   * @param {*} mixedVar 
   * @returns 
   */
  empty (mixedVar) {
    let undef
    let key
    let i
    let len
    const emptyValues = [undef, null, false, 0, '', '0']
    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true
      }
    }
    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        if (mixedVar.hasOwnProperty(key)) {
          return false
        }
      }
      return true
    }
    return false
  }

  /**
   * 时间转换
   * @param {*} ts 
   * @param {*} formatter 
   * @returns 
   */
  dateFormat(ts,formatter = 'yyyy-MM-dd HH:mm') {
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
  async request({ method, url,  headers = {}, body = null, json = true }, callback = () => {}) {
    const request = new Request('');
    // @ts-ignore
    request.url = url;
    // @ts-ignore
    request.method = method;
    // @ts-ignore
    request.headers = {
      ...headers,
    };
    // @ts-ignore
    if (body) {
      request.body = body;
    }
    // @ts-ignore
    let data = await (json ? request.loadJSON() : request.loadString());
    // @ts-ignore
    callback(request.response, data);
    return data;
  }

  /**
   * 获取远程图片内容
   * @param {string} url 图片地址
   * @param {boolean} useCache 是否使用缓存（请求失败时获取本地缓存）
   */
  async getImageByUrl (url, useCache = true) {
    const cacheKey = this.md5(url)
    const cacheFile = FileManager.local().joinPath(FileManager.local().temporaryDirectory(), cacheKey)
    // 判断是否有缓存
    if (useCache && FileManager.local().fileExists(cacheFile)) {
      // @ts-ignore
      return Image.fromFile(cacheFile)
    }
    try {
      const req = new Request(url)
      // @ts-ignore
      const img = await req.loadImage()
      // 存储到缓存
      FileManager.local().writeImage(cacheFile, img)
      return img
    } catch (e) {
      // 没有缓存+失败情况下，返回自定义的绘制图片（红色背景）
      let ctx = new DrawContext()
      ctx.size = new Size(100, 100)
      ctx.setFillColor(Color.red())
      ctx.fillRect(new Rect(0, 0, 100, 100))
      return await ctx.getImage()
    }
  }

  /**
   * 弹出一个通知
   * @param {string} title 通知标题
   * @param {string} body 通知内容
   * @param {string} url 点击后打开的URL
   */
  async notify (title, body, url = null, opts = {}) {
    // @ts-ignore
    let n = new Notification()
    n = Object.assign(n, opts);
    // @ts-ignore
    n.title = title
    // @ts-ignore
    n.body = body
    // @ts-ignore
    if (url) n.openURL = url
    // @ts-ignore
    return await n.schedule()
  }

  
  /**
   * 获取当前插件的设置
   * @param {boolean} json 是否为json格式
   */
  getSettings(json=true){
    let res=json?{}:""
    let cache=""
    if (Keychain.contains(this.SETTING_KEY)) {
      cache= Keychain.get(this.SETTING_KEY)
    }
      if (json){
        try {
          res=JSON.parse(cache)
        } catch (e) {}
      }else{
        res=cache
      }
    
    return res
  }

  /**
   * 存储当前设置
   * @param {bool} notify 是否通知提示
   */
  saveSettings(notify=true){
    let res= (typeof this.settings==="object")?JSON.stringify(this.settings):String(this.settings)
    Keychain.set(this.SETTING_KEY, res)
    // @ts-ignore
    if (notify) this.notify("设置成功","桌面组件稍后将自动刷新")
  }

  
}
// @base.end
// 运行环境
// @running.start
const Running = async (Widget, default_args = "") => {
  let M = null
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else if (config.runsWithSiri) {
    act = args.shortcutParameter.act
    if (typeof act !== "undefined" && act) {
      M = new Widget()
      M.init()
      let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
      let _act = `action${_tmp}`
      if (M[_act] && typeof M[_act] === 'function') {
        const func = M[_act].bind(M)
        await func()
      }
    }
    Script.complete()
  } else {
    let { act, data, __arg, __size } = args.queryParameters
    M = new Widget(__arg || default_args || '')
    if (__size) M.init(__size)
    if (!act || !M['_actions']) {
      // 弹出选择菜单
      const actions = M['_actions']
      const _actions = [
        async () => {
          Safari.openInApp("https://scriptable.ningkai.wang", false)
        }
      ]
      const alert = new Alert()
      alert.title = M.name
      alert.message = M.desc
      alert.addAction("文档手册")
      for (let _ in actions) {
        alert.addAction(_)
        _actions.push(actions[_])
      }
      alert.addCancelAction("取消操作")
      const idx = await alert.presentSheet()
      if (_actions[idx]) {
        const func = _actions[idx]
        await func()
      }
      Script.complete()
      return
    }
    let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
    let _act = `action${_tmp}`
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M)
      await func(data)
    }
    Script.complete()
  }
}
// @running.end

// 测试环境
const Testing = async (Widget, default_args = "") => {
  let M = null
  // 判断hash是否和当前设备匹配
  if (config.runsInWidget) {
    M = new Widget(args.widgetParameter || '')
    const W = await M.render()
    Script.setWidget(W)
    Script.complete()
  } else if (config.runsWithSiri) {
    act = args.shortcutParameter.act
    if (typeof act !== "undefined" && act) {
      M = new Widget()
      M.init()
      let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
      let _act = `action${_tmp}`
      if (M[_act] && typeof M[_act] === 'function') {
        const func = M[_act].bind(M)
        await func()
      }
    }
    
    Script.complete()
  } else {
    let { act, data, __arg, __size } = args.queryParameters
    M = new Widget(__arg || default_args || '')
    if (__size) M.init(__size)
    if (!act || !M['_actions']) {
        // 弹出选择菜单
        const actions = M['_actions']
        const _actions = [
          // 远程开发
          async () => {
            // 1. 获取服务器ip
            const a = new Alert()
            a.title = "服务器 IP"
            a.message = "请输入远程开发服务器（电脑）IP地址"
            let xjj_debug_server = "192.168.1.3"
            if (Keychain.contains("xjj_debug_server")) {
              xjj_debug_server = Keychain.get("xjj_debug_server")
            }
            a.addTextField("server-ip", xjj_debug_server)
            a.addAction("连接")
            a.addCancelAction("取消")
            const id = await a.presentAlert()
            if (id === -1) return
            const ip = a.textFieldValue(0)
            // 保存到本地
            Keychain.set("xjj_debug_server", ip)
            const server_api = `http://${ip}:5566`
            // 2. 发送当前文件到远程服务器
            // @ts-ignore
            const SELF_FILE = module.filename.replace('「小件件」开发环境', Script.name())
            const req = new Request(`${server_api}/sync`)
            // @ts-ignore
            req.method = "POST"
            // @ts-ignore
            req.addFileToMultipart(SELF_FILE, "Widget", Script.name())
            try {
              // @ts-ignore
              const res = await req.loadString()
              if (res !== "ok") {
                return M.notify("连接失败", res)
              }
            } catch (e) {
              return M.notify("连接错误", e.message)
            }
            M.notify("连接成功", "编辑文件后保存即可进行下一步预览操作")
            // 重写console.log方法，把数据传递到nodejs
            const rconsole_log = async (data, t = 'log') => {
              const _req = new Request(`${server_api}/console`)
              // @ts-ignore
              _req.method = "POST"
              // @ts-ignore
              _req.headers = {
                'Content-Type': 'application/json'
              }
              // @ts-ignore
              _req.body = JSON.stringify({
                t,
                data
              })
              // @ts-ignore
              return await _req.loadString()
            }
            const lconsole_log = console.log.bind(console)
            const lconsole_warn = console.warn.bind(console)
            const lconsole_error = console.error.bind(console)
            console.log = d => {
              lconsole_log(d)
              rconsole_log(d, 'log')
            }
            console.warn = d => {
              lconsole_warn(d)
              rconsole_log(d, 'warn')
            }
            console.error = d => {
              lconsole_error(d)
              rconsole_log(d, 'error')
            }
            // 3. 同步
            while (1) {
              let _res = ""
              try {
                const _req = new Request(`${server_api}/sync?name=${encodeURIComponent(Script.name())}`)
                // @ts-ignore
                _res = await _req.loadString()
              } catch (e) {
                M.notify("停止调试", "与开发服务器的连接已终止")
                break
              }
              if (_res === "stop") {
                console.log("[!] 停止同步")
                break
              } else if (_res === "no") {
                // console.log("[-] 没有更新内容")
              } else if (_res.length > 0) {
                M.notify("同步成功", "新文件已同步，大小：" + _res.length)
                // 重新加载组件
                // 1. 读取当前源码
                const _code = _res.split('// @组件代码开始')[1].split('// @组件代码结束')[0]
                // 2. 解析 widget class
                let NewWidget = null
                try {
                  const _func = new Function(`const _Debugger = Base => {\n${_code}\nreturn Widget\n}\nreturn _Debugger`)
                  NewWidget = _func()(Base)
                } catch (e) {
                  M.notify("解析失败", e.message)
                }
                if (!NewWidget) continue;
                // 3. 重新执行 widget class
                // @ts-ignore
                delete M;
                M = new NewWidget(__arg || default_args || '')
                if (__size) M.init(__size)
                // 写入文件
                FileManager.local().writeString(SELF_FILE, _res)
                // 执行预览
                let i = await _actions[1](true)
                if (i === (4+Object.keys(actions).length)) break
              }
            }
          },
          // 预览组件
          async (debug = false) => {
            let a = new Alert()
            a.title = "预览组件"
            a.message = "测试桌面组件在各种尺寸下的显示效果"
            a.addAction("小尺寸 Small")
            a.addAction("中尺寸 Medium")
            a.addAction("大尺寸 Large")
            a.addAction("全部 All")
            a.addCancelAction("取消操作")
            const funcs = []
            if (debug) {
              for (let _ in actions) {
                a.addAction(_)
                funcs.push(actions[_].bind(M))
              }
              a.addDestructiveAction("停止调试")
            }
            let i = await a.presentSheet()
            if (i === -1) return
            let w
            switch (i) {
              case 0:
                M.widgetFamily = 'small'
                w = await M.render()
                await w.presentSmall()
                break;
              case 1:
                M.widgetFamily = 'medium'
                w = await M.render()
                await w.presentMedium()
                break
              case 2:
                M.widgetFamily = 'large'
                w = await M.render()
                await w.presentLarge()
                break
              case 3:
                M.widgetFamily = 'small'
                w = await M.render()
                await w.presentSmall()
                M.widgetFamily = 'medium'
                w = await M.render()
                await w.presentMedium()
                M.widgetFamily = 'large'
                w = await M.render()
                await w.presentLarge()
                break
              default:
                const func = funcs[i - 4];
                if (func) await func();
                break;
            }

            return i
          },
          // 复制源码
          async () => {
            // @ts-ignore
            const SELF_FILE = module.filename.replace('「小件件」开发环境', Script.name())
            const source = FileManager.local().readString(SELF_FILE)
            Pasteboard.copyString(source)
            await M.notify("复制成功", "当前脚本的源代码已复制到剪贴板！")
          },
          async () => {
            Safari.openInApp("https://www.kancloud.cn/im3x/scriptable/content", false)
          },
          async () => {
            Safari.openInApp("https://support.qq.com/products/287371", false)
          }
        ]
        const alert = new Alert()
        alert.title = M.name
        alert.message = M.desc
        alert.addAction("远程开发")
        alert.addAction("预览组件")
        alert.addAction("复制源码")
        alert.addAction("开发文档")
        alert.addAction("反馈交流")
        for (let _ in actions) {
          alert.addAction(_)
          _actions.push(actions[_])
        }
        alert.addCancelAction("取消操作")
        const idx = await alert.presentSheet()
        if (_actions[idx]) {
          const func = _actions[idx]
          await func()
        }
        Script.complete()
        return
    }
    let _tmp = act.split('-').map(_ => _[0].toUpperCase() + _.substr(1)).join('')
    let _act = `action${_tmp}`
    if (M[_act] && typeof M[_act] === 'function') {
      const func = M[_act].bind(M)
      await func(data)
    }
    Script.complete()
  }
}

module.exports = {
  Base,
  Testing,
  Running,
}