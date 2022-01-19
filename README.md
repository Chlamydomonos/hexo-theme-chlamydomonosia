# hexo-theme-chlamydomonosia
一个以Bulma为基础的Hexo主题

## 安装方式

首先安装依赖：
```
npm install hexo-renderer-sass
npm uninstall hexo-renderer-marked
npm install hexo-renderer-kramed
npm install hexo-renderer-mathjax
```

接下来，把`node-modules/kramed/lib/rules/inline.js`中的`escape: ******`（`******`代表任何一串东西）改为:
```
escape: /^\\([\\`*{}\[\]()#$+\-.!_>])/
```

接下来，把本仓库clone到博客的主题目录下，就可以开始使用。