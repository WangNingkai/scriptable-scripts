
# 安装指南

**<span style="color:red">11月9日前安装的脚本，由于脚本时间出现问题，会出现更新异常问题，建议删除脚本重新拉取！！！</span>**


> 下面安装以 `「小件件」领克出行` 为例，其它汽车组件安装步骤相同

### 1.下载Scriptable

下载安装 [Scriptable](https://apps.apple.com/cn/app/scriptable/id1405459188) 软件

[![Scriptable](https://docs.scriptable.app/img/app-store-badge.svg)](https://apps.apple.com/cn/app/scriptable/id1405459188)


### 2.复制脚本

手动复制下面代码，返回桌面打开 `Scriptable` 点击右上角 `「+」`，粘贴代码，点击右下角三角形运行。

或者复制下面代码使用 `Safari` 浏览器打开此页面 [点击此处](scriptable:///add?scriptName=hello) 跳转添加脚本。

![I9pswE.md.png](https://s6.jpg.cm/2021/11/10/I9pswE.md.png)

---

#### 2.0版本  `「小件件」领克出行2.0` 

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

--- 

####  1.0版本 （默认带小地图）  `「小件件」领克出行` 

```js
const FILE_MGR = FileManager[module.filename.includes('Documents/iCloud~') ? 'iCloud' : 'local']();
await Promise.all(
    ['「小件件」领克出行.js'].map(async (js) => {
        const REQ = new Request('https://gitee.com/wangningkai/scriptable-scripts/raw/master/lynkco.js');
        const RES = await REQ.load();
        FILE_MGR.write(FILE_MGR.joinPath(FILE_MGR.documentsDirectory(), js), RES);
    })
);
FILE_MGR.remove(module.filename);
Safari.open(
    'scriptable:///open?scriptName=' + encodeURIComponent('「小件件」领克出行')
);
```

---

![版本展示图](https://s6.jpg.cm/2021/11/17/Ixok5E.png)


### 3.设置账号

点击 `「小件件」领克出行2.0` 、 `「小件件」领克出行` 或 `其他出行组件`  选择 `设置账号` 进行账号设置，账号、密码必填，选择 `设置组件` 进行组件自定义设置，部分数据可不填，默认读取车辆数据


![I9pmES.md.png](https://s6.jpg.cm/2021/11/10/I9pmES.png)


- 小组件设置支持`自定义车辆名称`、`自定义LOGO图片`、`自定义车辆图片`、`自定义背景颜色`

- 自定义图片需要自行上传图片到相关图床网站，获取图片地址再填写到在指定配置项内，透明背景图片显示效果更佳，可以在下方获取在线抠图工具。

- 自定义背景颜色可以选择菜单的颜色也可以自定义，三项分别是顶部颜色（如#FFFFFF），底部颜色与文字颜色。

- 自定义小组件设置栏中最后一项为 `高德地图API Key`，为正常使用显示车辆地址，**请勿随意改动**！！


为方便车友上传车辆、logo图片，提供一个在线抠图和图床地址：

**在线抠图地址：** [点击此处](https://www.remove.bg/zh) 

**图床地址：** [点击此处](https://imgtu.com)


**注意: 此处登录账号非领克App账号，请前往下载 [吉利G-NetLink](https://apps.apple.com/cn/app/scriptable/id1222208349) 软件注册，务必使用绑定车辆的领克APP手机号注册账号，再返回脚本执行设置操作。**



### 4.添加组件到桌面

- 返回桌面空白处长按，左上角 `「 + 」` 添加小组件 

- 搜 `Scriptable`，添加完 在`图标抖动编辑状态`下，单击刚添加的组件或 `长按图标` 选择 `编辑小组件`。

- `Script` 选择你刚新建的 `「小件件」领克出行2.0` 、 `「小件件」领克出行` 或其他出行组件 。完成。

如果没刷新 就再走一下 `「步骤3」`重新设置。

![I9p0xw.png](https://s6.jpg.cm/2021/11/10/I9p0xw.png)


![I9pCEi.png](https://s6.jpg.cm/2021/11/10/I9pCEi.png)


### 5.视频教程

[视频教程](https://player.bilibili.com/player.html?aid=764608433&bvid=BV1Zr4y1Q7yb&cid=454279296&page=1 ':include :type=iframe width=100% height=600px')

