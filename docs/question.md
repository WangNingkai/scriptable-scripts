# 常见问题

**Q: 小组件车辆图片出现红色方块图片**

A: 重新设置等待刷新小组件，删除脚本重新添加小组件脚本。


**Q: 获取车辆信息失败，请检查授权**

A: 根据不同车型的登录需求，重新输入账号密码或密钥，确保账号正确。

**Q: 如何更换组件背景颜色**

A: 选择自定义背景颜色下面自定义，输入色值即可更换颜色。三项分别是顶部颜色（如#FFFFFF），底部颜色与文字颜色。

**Q: 账号下多辆车如何选择**

A: 在输入账号密码的下一步输入车架号绑定你要显示的车辆

**Q: 如何更新小组件**

收到新版本推送后打开 `Scriptable` 点击检查更新  - 开始下载。

**Q: 设置项出现空白**

A: 设置项空白，建议不要随便修改设置，等待稍后重试，出现相关设置后再修改。

**Q: 车辆状态或定位地图等不显示或异常问题**

检查是否自定义车辆设置中最后一项高德地图API_KEY是否调整，这里不建议修改。

默认提供的KEY有一定的使用限制，建议自行申请，防止失效！

**申请流程：**[https://lbs.amap.com/api/webservice/guide/create-project/get-key](https://lbs.amap.com/api/webservice/guide/create-project/get-key)

**Q: 快捷操作提示令牌失效**

A: 首先，点击检查更新，将脚本更新到最新版本，然后菜单选择刷新数据，重新设置账号登录即可。

**Q: 数据不更新不及时**

A: 目前车辆数据3-5分钟缓存一次，获取最新数据，菜单选择刷新数据或者更改数据刷新间隔即可。

**Q: 老版本无法自动更新**

A: 若有安装老版本无法自动更新的朋友，可重新复制代码，全部代码重新设置即可。建议重新安装一次。

**Q: 脚本莫名丢失**

A: 文件脚本默认存储在iCloud云盘上的，请先检查iCloud登录是否失效、 或者同步设备误删脚本文件，以上操作都会导致文件脚本丢失。

**Q: 关于组件刷新不及时、不准确问题**
A：

- 运行时间限制 

在iOS系统上，小组件是由iOS系统自动刷新的，桌面上的每个小组件的刷新次数都受iOS系统限制。iOS系统为了保护电池的使用寿命，所有的刷新都受到限制，所以小组件的内容会造成延迟，一旦添加到桌面上，它就不会改变，直到它下一次运行它才会有所变化，和我们想要的效果可能不一样。

- 交互操作限制
  
小组件一旦添加到桌面上，它就不会改变，限制了它的独立可操作性，所以无法有更多的交互操作。

- 尺寸限制 

在iOS14.x系统中小组件的尺寸是固定的，分小号，中号，大号三种样式，形状只能是圆角矩形，我们无法改变他的原始外观，只能在这三种样式内做修改。

**Q: 新建桌面组件，无法找到Scriptable APP**

在升级到ios14.5 及以上系统之后，手机长时间开机之会出现找不到应用无法添加组件的情况，针对苹果系统存在的这个问题，我们建议您可以采取以下方法：

方法1：重启手机后->再打开一次【Scriptable】->前往桌面再次尝试添加

方法2：打开手机设置->通用->还原->还原主屏幕布局->前往桌面再次尝试添加


