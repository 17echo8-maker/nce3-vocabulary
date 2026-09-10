新概念英语3·单词学习 PWA（Lesson 42 原型）

当前功能：
1. 词表：中文释义一键隐藏/显示，点击发音
2. 背词：显示英文+音标，点击后显示释义；可标记“认识/模糊/不认识”
3. 默写：显示中文+词性，输入英文原型，自动判定对错
4. 错词：自动记录默写错误词和错误次数
5. 本地进度：学习状态保存在当前设备浏览器 localStorage
6. PWA：部署到 HTTPS 网站后，可在 iPhone/iPad“添加到主屏幕”
7. 离线：安装/首次加载后由 Service Worker 缓存基础文件

语音架构：
- 每个词支持可选 audio 字段（MP3/音频URL）
- 当前 Lesson 42 数据未填 audio，因此回退到浏览器 SpeechSynthesis
- 后续如果加入固定英音 MP3，只需在 lesson42.json 中给相应词填 audio，无需改页面功能

部署：
- 将整个文件夹上传到 GitHub Pages / Cloudflare Pages / Netlify 等静态托管
- 必须使用 HTTPS 才能完整启用 PWA/Service Worker
- iPhone/iPad 建议使用 Safari 打开部署后的网址，再“添加到主屏幕”

注意：
- 直接双击本地 index.html 无法正常 fetch lesson42.json，也无法注册 Service Worker；请部署后测试。
