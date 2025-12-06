---
title: markdown语法指南
date: 2024-12-09T14:45:55+0800
description: "本文详细介绍markdown语法的使用。"
tags: [markdown]
---

# 1. 前言

Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。

&nbsp;
# 2. 标题

Markdown支持6级标题，使用`#`符号表示，数量代表标题级别。

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
```

&nbsp;
# 3. 段落和换行

## 3.1. 段落

段落由一个或多个连续的文本行组成，段落之间用一个或多个空行分隔，无论使用多少的空行，渲染结果只有一行。

```markdown
这是第一个段落。

这是第二个段落。
```

这是第一个段落。

这是第二个段落。

如果非要增加多行，可以使用`&nbsp;`来增加。

```markdown
这是第一个段落。
&nbsp;
&nbsp;
这是第二个段落。
```

这是第一个段落。

&nbsp;
&nbsp;

这是第二个段落。

## 3.2. 换行

在一行的末尾添加两个或多个空格，然后按回车键，可以创建一个换行（`<br>`）。

```markdown
这是第一行[空格][空格]
这是第二行
```

这是第一行  
这是第二行

&nbsp;
# 4. 强调

## 4.1. 斜体

使用`*`或`_`包裹文本可以创建斜体。

```markdown
*这是斜体文本*
_这也是斜体文本_
```

*这是斜体文本*  
_这也是斜体文本_

## 4.2. 粗体

使用`**`或`__`包裹文本可以创建粗体。

```markdown
**这是粗体文本**
__这也是粗体文本__
```

**这是粗体文本**  
__这也是粗体文本__

## 4.3. 粗斜体 

使用`***`或`___`包裹文本可以创建粗斜体。

```markdown
***这是粗斜体文本***
___这也是粗斜体文本___
```

***这是粗斜体文本***  
___这也是粗斜体文本___

&nbsp;
# 5. 列表

## 5.1. 无序列表

使用`*`、`+`或`-`作为列表标记。

```markdown
* 列表项1
* 列表项2
  * 嵌套列表项2.1
  * 嵌套列表项2.2

+ 另一种无序列表1
+ 另一种无序列表2

- 第三种无序列表1
- 第三种无序列表2
```

* 列表项1
* 列表项2
  * 嵌套列表项2.1
  * 嵌套列表项2.2

+ 另一种无序列表1
+ 另一种无序列表2

- 第三种无序列表1
- 第三种无序列表2


## 5.2. 有序列表

使用数字加`.`作为列表标记。

```markdown
1. 第一项
2. 第二项
   1. 嵌套第一项
   2. 嵌套第二项
3. 第三项
```

1. 第一项
2. 第二项
   1. 嵌套第一项
   2. 嵌套第二项
3. 第三项


&nbsp;
# 6. 链接

## 6.1. 行内链接

```markdown
[链接文本](链接地址 "可选的标题")

例如：[Google](https://www.google.com "Google搜索")
```

[Google](https://www.google.com "Google搜索")

## 6.2. 引用式链接

```markdown
[链接文本][引用标记]

[引用标记]: 链接地址 "可选的标题"

例如：
[GitHub][1]

[1]: https://github.com "GitHub代码托管"
```

[GitHub][1]

[1]: https://github.com "GitHub代码托管"

## 6.3. 自动链接

使用尖括号包裹URL或邮箱地址，可以自动创建链接。

```markdown
<https://www.example.com>
<example@example.com>
```

<https://www.example.com>  
<example@example.com>

&nbsp;
# 7. 图片

图片语法与链接类似，但前面多了一个`!`。

## 7.1. 行内图片

```markdown
![图片描述](图片地址 "可选的标题")

例如： ![home](https://raw.githubusercontent.com/henglgh/hugo-articles/main/images/home.png "hugo-articles-home")
```

例如： ![home](https://raw.githubusercontent.com/henglgh/hugo-articles/main/images/home.png "主页")

## 7.2. 引用式图片

```markdown
![图片描述][图片标记]

[图片标记]: 图片地址 "可选的标题"

例如：
![归档列表页][archive]

[archive]: https://raw.githubusercontent.com/henglgh/hugo-articles/main/images/archive.png "归档列表页"
```

![归档列表页][archive]

[archive]: https://raw.githubusercontent.com/henglgh/hugo-articles/main/images/archive.png "归档列表页"

&nbsp;
# 8. 代码

## 8.1. 行内代码

使用反引号（`）包裹代码片段。

```markdown
这是行内代码：`print("Hello, World!")`
```

这是行内代码：`print("Hello, World!")`

## 8.2. 代码块

使用三个反引号（```）包裹代码块，可以指定语言以启用语法高亮。

```markdown
    ```python
    print("Hello, World!")
    for i in range(5):
        print(i)
    ```

    ```javascript
    function hello() {
        console.log("Hello, World!");
    }
    hello();
    ```
```

```python
print("Hello, World!")
for i in range(5):
    print(i)
```

```javascript
function hello() {
    console.log("Hello, World!");
}
hello();
```

## 8.3. 缩进代码块

使用四个空格或一个制表符缩进的文本也会被视为代码块。

```markdown
    def hello():
        print("Hello, World!")
    hello()
```

    def hello():
        print("Hello, World!")
    hello()

&nbsp;
# 9. 引用

使用`>`符号可以创建引用块。

```markdown
> 这是一个引用块。
> 引用可以包含多行。
```

> 这是一个引用块。  
> 引用可以包含多行。

## 9.1. 嵌套引用

```markdown
> 一级引用
> > 二级引用
> > > 三级引用
```

> 一级引用
> > 二级引用
> > > 三级引用

## 9.2. 引用中包含其他元素

```markdown
> ## 引用中的标题
> 
> * 引用中的列表项1
> * 引用中的列表项2
> 
> 引用中的普通文本。
```

> ## 引用中的标题
> 
> * 引用中的列表项1
> * 引用中的列表项2
> 
> 引用中的普通文本。

&nbsp;
# 10. 表格

使用`|`和`-`创建表格，`:`用于指定对齐方式。

```markdown
| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :------: | -----: |
| 单元格 |  单元格  | 单元格 |
| 单元格 |  单元格  | 单元格 |
```

| 左对齐 | 居中对齐 | 右对齐 |
| :----- | :------: | -----: |
| 单元格 |  单元格  | 单元格 |
| 单元格 |  单元格  | 单元格 |

&nbsp;
# 11. 分隔线

使用三个或更多的`*`、`-`或`_`，可以创建分隔线。

```markdown
***
---
___
```

***
---
___

&nbsp;
# 12. 任务列表

使用`- [ ]`表示未完成任务，`- [x]`表示已完成任务。

```markdown
- [x] 已完成任务1
- [x] 已完成任务2
- [ ] 未完成任务3
- [ ] 未完成任务4
```

- [x] 已完成任务1
- [x] 已完成任务2
- [ ] 未完成任务3
- [ ] 未完成任务4

&nbsp;
# 13. 脚注

使用`[^标记]`添加脚注引用，然后在文档末尾定义脚注内容。

```markdown
这是一个带有脚注的句子。[^1]

[^1]: 这是脚注的内容。
```

这是一个带有脚注的句子。[^1]

[^1]: 这是脚注的内容。

&nbsp;
# 14. 数学公式

## 14.1. 行内公式

使用`$`包裹数学公式。

```markdown
行内公式示例：$E=mc^2$ 是爱因斯坦的质能方程。
```

行内公式示例：$E=mc^2$ 是爱因斯坦的质能方程。

## 14.2. 块级公式

使用`$$`包裹数学公式。

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

&nbsp;
# 15. 目录

使用`[TOC]`可以自动生成目录（具体支持取决于Markdown解析器）。

```markdown
[TOC]
```

&nbsp;
# 16. 转义字符

使用反斜杠（\）可以转义Markdown特殊字符。

```markdown
\* 这不是粗体文本 \*
\# 这不是标题
\\ 这是一个反斜杠
```

\* 这不是粗体文本 \*  
\# 这不是标题  
\\ 这是一个反斜杠  

&nbsp;
# 17. HTML标签

Markdown支持直接使用HTML标签。

```markdown
这是<u>下划线</u>文本。

<div style="color: red;">红色文本</div>
```

这是<u>下划线</u>文本。

<div style="color: red;">红色文本</div>

&nbsp;
# 18. 总结

以上是Markdown的常用语法，不同的Markdown解析器可能会支持一些扩展语法。通过熟练掌握这些基本语法，您可以轻松地编写格式丰富的文档。