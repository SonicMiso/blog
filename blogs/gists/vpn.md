# SS(SSR)

[TOC]

有关 SS/SSR 相关的东西，都会记录在这篇 Memo 中。

## 自定义规则 Pac/UserRule

### 语法

| 规则  |             说明             |             示例              |
| :---: | :--------------------------: | :---------------------------: |
|  `*`  |       通配符（可省略）       | *.baidu.com 全等于 .baidu.com |
|  `|`  |   匹配字符串开始（和结束）   |       \|www.lionad.art        |
|  `\`  |     正则开始（正则结束）     |      \\[\w+].baidu.com\\      |
| `@@`  | 规则过滤（满足则不使用代理） |          @@baidu.com          |
|  `!`  |             注释             |             !#//              |