
# 安装部署

### 1. 下载Scriptable

下载安装 [Scriptable](https://apps.apple.com/cn/app/scriptable/id1405459188) 软件

[![Scriptable](https://docs.scriptable.app/img/app-store-badge.svg)](https://apps.apple.com/cn/app/scriptable/id1405459188)

### 2. 复制脚本

手动复制下面代码，返回桌面打开 `Scriptable` 点击右上角 `「+」`，粘贴代码，点击右下角三角形运行。

或者 `Safari` 浏览器打开此页面 [点击此处](scriptable:///add?scriptName=hello) 跳转添加脚本。

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(
    ['「小件件」领克出行2.0.js'].map(async (js) => {
        const REQ = new Request('https://gitee.com/wangningkai/scriptable-scripts/raw/master/lynkco/lynkco2.0.js');
        const RES = await REQ.load();
        FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
    })
);
FILE_MGR.remove(module.filename);
Safari.open(
    'scriptable:///open?scriptName=' + encodeURIComponent('「小件件」领克出行2.0')
);
```

### 3. 配置账号

点击 `「小件件」领克出行2.0`  选择配置组件 - 账号必填，密码必填，其他可不填 - 选择背景颜色

小组件配置支持自定义LOGO图片、自定义车型图片、自定义背景颜色，自定义图片需要自行上传图片到相关网站，获取地址再填写。

提供个图床方便上传图片：[点击此处](https://imgtu.com)

**注意:** 此处账号非领克App账号，请前往下载 `吉利G-NetLink` 软件注册，务必使用绑定车辆的领克APP手机号注册账号，再返回脚本执行配置操作。



### 4. 添加组件到桌面

返回桌面空白处长按，左上角 `「 + 」`添加小组件 搜 `Scriptable`，添加完在图标抖动编辑状态下，单击刚添加的组件。`Script` 选择你刚新建的 `「小件件」领克出行2.0`。完成。
如果没刷新 就再走一下 `「步骤3」`重新配置。
