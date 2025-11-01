export interface BBCodeTag {
    // 工具栏显示
    label: string // 工具栏按钮文字
    icon: string // 图标
    category?: "format" | "media" | "layout" | "special" | "osu"
    shortcut?: string // 键盘快捷键

    // BBCode 标签定义
    tag: string // 标签名称，如 "b" 或 "url=https://example.com"
    placeholder: string // 占位符内容
    hasClosingTag?: boolean // 是否有闭合标签，默认 true

    // Monaco Editor 配置
    documentation: string // 补全提示的详细说明
    detail: string // 补全提示的简短说明
    hoverInfo: string // 悬停时显示的信息
    sortOrder?: number // 补全列表中的排序优先级 (0-9, 越小越靠前)
}

/**
 * 从标签定义中提取纯标签名（不含参数）
 * 例如: "url=https://example.com" -> "url"
 */
export function getTagName(tag: string): string {
    return tag.split("=")[0]
}

export const bbcodeTags: BBCodeTag[] = [
    {
        label: "粗体",
        tag: "b",
        placeholder: "文本",
        icon: "B",
        shortcut: "Ctrl+B",
        category: "format",
        documentation: "**粗体** - 使文本加粗显示",
        detail: "BBCode 粗体标签",
        hoverInfo: "**粗体标签** - 使文本加粗显示\n\n用法: `[b]文本[/b]`",
        sortOrder: 0,
    },
    {
        label: "斜体",
        tag: "i",
        placeholder: "文本",
        icon: "I",
        shortcut: "Ctrl+I",
        category: "format",
        documentation: "**斜体** - 使文本斜体显示",
        detail: "BBCode 斜体标签",
        hoverInfo: "**斜体标签** - 使文本斜体显示\n\n用法: `[i]文本[/i]`",
        sortOrder: 0,
    },
    {
        label: "下划线",
        tag: "u",
        placeholder: "文本",
        icon: "U",
        shortcut: "Ctrl+U",
        category: "format",
        documentation: "**下划线** - 为文本添加下划线",
        detail: "BBCode 下划线标签",
        hoverInfo: "**下划线标签** - 为文本添加下划线\n\n用法: `[u]文本[/u]`",
        sortOrder: 0,
    },
    {
        label: "删除线",
        tag: "s",
        placeholder: "文本",
        icon: "S",
        category: "format",
        documentation: "**删除线** - 为文本添加删除线",
        detail: "BBCode 删除线标签",
        hoverInfo: "**删除线标签** - 为文本添加删除线\n\n用法: `[s]文本[/s]`",
        sortOrder: 0,
    },
    {
        label: "颜色",
        tag: "color=#ff0000",
        placeholder: "文本",
        icon: "🎨",
        category: "format",
        documentation: "**文字颜色** - 设置文字颜色\n\n示例: `[color=#ff0000]红色文字[/color]`",
        detail: "BBCode 颜色标签",
        hoverInfo: "**颜色标签** - 设置文字颜色\n\n用法: `[color=#ff0000]文本[/color]`",
        sortOrder: 3,
    },
    {
        label: "大小",
        tag: "size=100",
        placeholder: "文本",
        icon: "📏",
        category: "format",
        documentation: "**文字大小** - 设置文字大小（百分比）\n\n示例: `[size=150]大号文字[/size]`",
        detail: "BBCode 大小标签",
        hoverInfo: "**大小标签** - 设置文字大小\n\n用法: `[size=100]文本[/size]`\n\n提示：只支持50, 85, 100, 150。100 为正常大小，150 为 1.5 倍",
        sortOrder: 3,
    },

    // 媒体标签
    {
        label: "链接",
        tag: "url=https://example.com",
        placeholder: "链接文本",
        icon: "🔗",
        shortcut: "Ctrl+K",
        category: "media",
        documentation: "**超链接** - 创建可点击的链接\n\n示例: `[url=https://osu.ppy.sh]访问 osu![/url]`",
        detail: "BBCode 链接标签",
        hoverInfo: "**链接标签** - 创建超链接\n\n用法: `[url=地址]文本[/url]`",
        sortOrder: 1,
    },
    {
        label: "图片",
        tag: "img",
        placeholder: "https://example.com/image.jpg",
        icon: "🖼️",
        category: "media",
        documentation: "**图片** - 插入图片\n\n示例: `[img]https://example.com/logo.png[/img]`",
        detail: "BBCode 图片标签",
        hoverInfo: "**图片标签** - 插入图片\n\n用法: `[img]图片地址[/img]`",
        sortOrder: 1,
    },

    // 布局标签
    {
        label: "居中",
        tag: "centre",
        placeholder: "居中文本",
        icon: "⬌",
        category: "layout",
        documentation: "**居中对齐** - 使文本居中显示",
        detail: "BBCode 居中标签",
        hoverInfo: "**居中标签** - 文本居中对齐\n\n用法: `[centre]文本[/centre]`",
        sortOrder: 5,
    },

    // 特殊标签
    {
        label: "代码块",
        tag: "code",
        placeholder: "\n// 代码内容\n",
        icon: "</>",
        category: "special",
        documentation: "**代码块** - 显示格式化的代码\n\n用于展示编程代码",
        detail: "BBCode 代码块标签",
        hoverInfo: "**代码块标签** - 显示代码块\n\n用法: `[code]代码[/code]`",
        sortOrder: 2,
    },
    {
        label: "行内代码",
        tag: "c",
        placeholder: "代码内容",
        icon: "<>",
        category: "special",
        documentation: "**行内代码** - 显示行内代码\n\n用于展示编程代码",
        detail: "BBCode 行内代码标签",
        hoverInfo: "**行内代码标签** - 显示行内代码\n\n用法: `[c]代码[/c]`",
        sortOrder: 2,
    },
    {
        label: "引用",
        tag: "quote",
        placeholder: "引用内容",
        icon: "💬",
        category: "special",
        documentation: "**引用块** - 引用他人的话\n\n常用于回复或引述\n\n可选语法: `[quote=作者]内容[/quote]`",
        detail: "BBCode 引用标签",
        hoverInfo: "**引用标签** - 显示引用内容\n\n用法: `[quote]引用文本[/quote]`\n或: `[quote=作者]引用文本[/quote]`",
        sortOrder: 2,
    },
    {
        label: "列表",
        tag: "list",
        placeholder: "[*]项目1\n[*]项目2\n[*]项目3",
        icon: "📋",
        category: "special",
        documentation: "**列表** - 创建列表\n\n使用 `[*]` 表示列表项\n\n• `[list]` - 创建无序列表（项目符号）\n• `[list=TYPE]` - 创建有序列表（编号）",
        detail: "BBCode 列表标签",
        hoverInfo: "**列表标签** - 创建列表\n\n无序列表: `[list][*]项目1[*]项目2[/list]`\n\n有序列表(TYPE可以为任意值): `[list=TYPE][*]项目1[*]项目2[/list]`",
        sortOrder: 4,
    },
    {
        label: "隐藏",
        tag: "spoiler",
        placeholder: "隐藏内容",
        icon: "👁️",
        category: "special",
        documentation: "**隐藏内容** - 创建需要点击才能查看的内容\n\n常用于剧透警告",
        detail: "BBCode 隐藏标签",
        hoverInfo: "**隐藏标签** - 隐藏敏感内容\n\n用法: `[spoiler]隐藏的文本[/spoiler]`",
        sortOrder: 4,
    },

    // osu! 特有标签
    {
        label: "标题",
        tag: "heading",
        placeholder: "标题文本",
        icon: "H",
        category: "osu",
        documentation: "**标题** - osu! 论坛专用标题样式\n\n创建醒目的章节标题",
        detail: "osu! 标题标签",
        hoverInfo: "**标题标签** - osu! 论坛标题样式\n\n用法: `[heading]标题[/heading]`",
        sortOrder: 6,
    },
    {
        label: "提示框",
        tag: "notice",
        placeholder: "提示内容",
        icon: "⚠️",
        category: "osu",
        documentation: "**提示框** - osu! 论坛专用提示框\n\n显示重要提示或警告信息",
        detail: "osu! 提示框标签",
        hoverInfo: "**提示框标签** - osu! 论坛提示框\n\n用法: `[notice]提示内容[/notice]`",
        sortOrder: 6,
    },
    {
        label: "折叠框",
        tag: "box=展开查看",
        placeholder: "折叠的内容",
        icon: "📦",
        category: "osu",
        documentation: "**折叠框** - osu! 论坛专用折叠框\n\n创建可展开/收起的内容区域\n\n示例: `[box=点击展开]内容[/box]`",
        detail: "osu! 折叠框标签",
        hoverInfo: "**折叠框标签** - osu! 论坛折叠框\n\n用法: `[box=标题]内容[/box]`",
        sortOrder: 6,
    },
    {
        label: "用户",
        tag: "profile=123456",
        placeholder: "用户名",
        icon: "👤",
        category: "osu",
        documentation: "**用户链接** - osu! 论坛用户资料链接\n\n创建指向用户主页的链接\n\n示例: `[profile=2]peppy[/profile]`",
        detail: "osu! 用户标签",
        hoverInfo: "**用户标签** - osu! 用户资料链接\n\n用法: `[profile=用户ID]用户名[/profile]`",
        sortOrder: 6,
    },
    {
        label: "剧透框",
        tag: "spoilerbox",
        placeholder: "剧透内容",
        icon: "🔍",
        category: "special",
        documentation: "**剧透框** - osu! 论坛专用剧透框\n\n创建固定标题为 SPOILER 的折叠框\n\n示例: `[spoilerbox]剧透内容[/spoilerbox]`",
        detail: "osu! 剧透框标签",
        hoverInfo: "**剧透框标签** - osu! 论坛剧透框\n\n用法: `[spoilerbox]内容[/spoilerbox]`\n\n剧透框的标题固定为 SPOILER",
        sortOrder: 6,
    },
    {
        label: "邮箱",
        tag: "email=test@gmail.com",
        placeholder: "Sisy",
        icon: "✉",
        category: "media",
        documentation: "**邮箱** - osu! 邮箱链接\n\n创建触发浏览器mailto功能的邮箱链接\n\n示例: `[email=test@gmail.com]Your email name[/email]`",
        detail: "osu! 邮箱标签",
        hoverInfo: "**邮箱标签** - osu! 邮箱链接\n\n用法: `[email=邮箱地址]显示内容[/email]`",
        sortOrder: 6,
    },
    {
        label: "YouTube",
        tag: "youtube",
        placeholder: "",
        icon: "▷",
        category: "media",
        documentation: "**YouTube** - osu! youtube视频\n\n用于在网站上嵌入 YouTube 视频\n\n示例: `[youtube]Ef6zwIR44Ww[/youtube]`",
        detail: "osu! YouTube 标签",
        hoverInfo: "**YouTube 标签** - osu! youtube视频\n\n用法: `[youtube]视频ID[/youtube]`",
        sortOrder: 6,
    }
]