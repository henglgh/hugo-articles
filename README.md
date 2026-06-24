# <p align="center">Hugo Articles Theme</p>

<p align="center">
专用于个人知识笔记主题，没有花里胡哨的功能，简约至上！
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Hugo-Theme-orange" alt="Hugo Theme" />
  <img src="https://img.shields.io/github/last-commit/henglgh/hugo-articles" alt="Last Commit" />
  <a href="https://github.com/henglgh/hugo-articles">
    <img src="https://img.shields.io/github/stars/henglgh/hugo-articles?style=social" alt="Stars" />
  </a>
  <a href="https://github.com/henglgh/hugo-articles/releases">
    <img src="https://img.shields.io/github/v/release/henglgh/hugo-articles?label=release" alt="Release" />
  </a>
</p>

<p align="center">
  <a href="https://henglgh.github.io/hugo-articles/">
    <img src="https://img.shields.io/badge/GitHub%20Pages-hugo--articles-blue?logo=github" alt="GitHub Pages" />
  </a>
</p>

## 特点
- 支持亮/暗主题
- 支持全局搜索（只允许搜索文章标题）
- 支持katex数学公式语法
- 支持侧边显示文章目录结构
- 适配PC、平板、手机等各种屏幕尺寸
- 不支持mermaid
- 不支持shortcodes


## 使用教程
clone自己的项目到本地并切换到项目的根目录，比如有一个blog项目：
```bash
cd blog
```
在blog项目中创建名为themes的目录
```bash
mkdir themes
```
将主题代码仓库clone到themes目录下
```bash
git submodule add https://github.com/henglgh/hugo-articles themes/articles
```
在`content/posts`目录（content目录下可以任意创建子目录，不一定是posts）下添加内容文件，文件内容模板如下：
```md
---
title: 测试文件
date: 2024-12-09T14:49:41+0800
description: "这是一个测试文件"
tags: [test]
---


# 1. 概述
欢迎使用articles主题！
```


最后一步，也是非常重要的一步：修改你的项目根目录下的config.toml文件（此处，是修改blog根目录下的config.toml文件），并添加一下内容：
```bash
theme="articles"
```
其中`articles`就是主题的目录名字（不是路径，只是目录的名字！），两者一定要相同。

最后执行`hugo server`运行，如果不出意外的话，应该能看到正常的渲染结果。

### 配置
```toml
baseURL = 'https://henglgh.github.io/blog'
languageCode = 'en-us'
timeZone = "Asia/Shanghai"
title = '只是笔记'

theme="articles"
copyright = "© 阿根"

# 忽略 themes 目录下的 content 目录
ignoreFiles = ["themes/.*/content/.*"]

[params]
  katex = true
  mode = "toggle"
  useCDN = false
  [[params.social]]
    name = "GitHub"
    icon = "github"
    url = "https://github.com/henglgh/blog"

[outputs]
  home = ["HTML", "JSON"]

[menus]
  [[menu.main]]
    #name = "Archive"
    name = "tag"
    url = "/tags"
    weight = 1

[markup]
  [markup.goldmark]
    [markup.goldmark.extensions]
      [markup.goldmark.extensions.passthrough]
        enable = true
  [markup.highlight]
    noClasses = false
    tabWidth = 2
  [markup.tableOfContents]
    startLevel = 1
    endLevel = 6

[pagination]
  disablePagination = true

[taxonomies]
  tag = 'tags'
```

### 配置说明
- `baseURL`：githubpage主页的url。一定要注意最后有没有多一个`/`，因为多一个或者少一个`/`，对于hugo解析路径可能会出错。
- `title`：网页的名字。
- `params`：自定义hugo参数。
  - `params.social`：配置社交平台，icon是从feather.js中直接获取的，目前只试了github平台，其他平台没有尝试。
- `menus`：配置菜单项
  - `name`：可以随便配置
  - `url`：一定是hugo生成的pulic目录下的目录名，`/`其中就是代表pulic。
- `markup`：配置markdown解析器，建议非必要不要修改了。
- `pagination`：配置分页，此处分页功能被禁用。

建议可以完全采用这个配置，根据需要修改`baseURL、title、params`，其他参数非常不建议修改！