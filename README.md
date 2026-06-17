![中国地级制霸生成器](cover.png)

# 中国地级制霸生成器

在线标记你去过的中国地级行政区，生成制霸地图。

**[china-ex.vercel.app](https://china-ex.vercel.app)**

## 功能

- 点击区域标记 **居住 / 短居 / 游玩 / 出差 / 路过** 五个等级
- 缩放、拖拽地图，精确点击小区域
- 标记数据保存在本地浏览器，下次打开自动恢复
- 一键导出 PNG 图片分享

## 改进

基于 [神奇海螺的中国制霸生成器](https://github.com/itorr/china-ex) 改造：

- 扩展至 **370 个可标记区域**（含省直辖县级行政单位）
- 换用 [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) 霞鹜文楷开源字体
- 移动端适配，选单不遮挡
- 修复鼠标点击不弹出选单的 bug

## 数据

边界数据来自 [DataV.GeoAtlas](https://datav.aliyun.com/portal/school/atlas/area_selector)，生成脚本为 `生成真实边界.js`。

## 开发

```bash
npm install
node 生成真实边界.js && node 转译.js
# 输出在 dist/
```

## License

MIT
