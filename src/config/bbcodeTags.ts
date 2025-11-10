export interface BBCodeTag {
    // 工具栏显示
    label: string // 按钮文字
    icon: string // 图标
    category?: "format" | "media" | "layout" | "special" | "osu" // 分类所属
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
 * BBCode 标签配置（使用 i18n 键）
 */
export interface BBCodeTagConfig {
    // 工具栏显示
    i18nKey: string // i18n 翻译键，如 "bold", "italic"
    icon: string // 图标
    category?: "format" | "media" | "layout" | "special" | "osu" // 分类所属
    shortcut?: string // 键盘快捷键

    // BBCode 标签定义
    tag: string // 标签名称，如 "b" 或 "url=https://example.com"
    hasClosingTag?: boolean // 是否有闭合标签，默认 true
    sortOrder?: number // 补全列表中的排序优先级 (0-9, 越小越靠前)
}

/**
 * 从标签定义中提取纯标签名（不含参数）
 * 例如: "url=https://example.com" -> "url"
 */
export function getTagName(tag: string): string {
    return tag.split("=")[0]
}

/**
 * 将 BBCodeTagConfig 转换为 BBCodeTag（应用 i18n 翻译）
 * @param config BBCode 标签配置
 * @param t i18n 翻译函数
 * @returns 翻译后的 BBCodeTag
 */
export function translateBBCodeTag(config: BBCodeTagConfig, t: (key: string) => string): BBCodeTag {
    const i18nBase = `bbcode.${config.i18nKey}`

    return {
        label: t(`${i18nBase}.label`),
        icon: config.icon,
        category: config.category,
        shortcut: config.shortcut,
        tag: config.tag,
        placeholder: t(`${i18nBase}.placeholder`),
        hasClosingTag: config.hasClosingTag,
        documentation: t(`${i18nBase}.documentation`),
        detail: t(`${i18nBase}.detail`),
        hoverInfo: t(`${i18nBase}.hoverInfo`),
        sortOrder: config.sortOrder,
    }
}

/**
 * 获取所有翻译后的 BBCode 标签
 * @param t i18n 翻译函数
 * @returns 翻译后的 BBCode 标签数组
 */
export function getTranslatedBBCodeTags(t: (key: string) => string): BBCodeTag[] {
    return bbcodeTagsConfig.map((config) => translateBBCodeTag(config, t))
}

/**
 * BBCode 标签配置数组（使用 i18n 键）
 */
export const bbcodeTagsConfig: BBCodeTagConfig[] = [
    // 格式标签
    {
        i18nKey: "bold",
        tag: "b",
        icon: "fas fa-bold",
        shortcut: "Ctrl+B",
        category: "format",
        sortOrder: 0,
    },
    {
        i18nKey: "italic",
        tag: "i",
        icon: "fas fa-italic",
        shortcut: "Ctrl+I",
        category: "format",
        sortOrder: 0,
    },
    {
        i18nKey: "underline",
        tag: "u",
        icon: "fas fa-underline",
        shortcut: "Ctrl+U",
        category: "format",
        sortOrder: 0,
    },
    {
        i18nKey: "strikethrough",
        tag: "s",
        icon: "fas fa-strikethrough",
        category: "format",
        sortOrder: 0,
    },
    {
        i18nKey: "color",
        tag: "color=#ff0000",
        icon: "fas fa-palette",
        category: "format",
        sortOrder: 3,
    },
    {
        i18nKey: "size",
        tag: "size=100",
        icon: "fas fa-text-height",
        category: "format",
        sortOrder: 3,
    },

    // 媒体标签
    {
        i18nKey: "url",
        tag: "url=https://example.com",
        icon: "fas fa-link",
        shortcut: "Ctrl+K",
        category: "media",
        sortOrder: 1,
    },
    {
        i18nKey: "img",
        tag: "img",
        icon: "fas fa-image",
        category: "media",
        sortOrder: 1,
    },

    // 布局标签
    {
        i18nKey: "centre",
        tag: "centre",
        icon: "fas fa-align-center",
        category: "layout",
        sortOrder: 5,
    },

    // 特殊标签
    {
        i18nKey: "code",
        tag: "code",
        icon: "fas fa-code",
        category: "special",
        sortOrder: 2,
    },
    {
        i18nKey: "inlineCode",
        tag: "c",
        icon: "fas fa-terminal",
        category: "special",
        sortOrder: 2,
    },
    {
        i18nKey: "quote",
        tag: "quote",
        icon: "fas fa-quote-right",
        category: "special",
        sortOrder: 2,
    },
    {
        i18nKey: "list",
        tag: "list",
        icon: "fas fa-list",
        category: "special",
        sortOrder: 4,
    },
    {
        i18nKey: "spoiler",
        tag: "spoiler",
        icon: "fas fa-eye-slash",
        category: "special",
        sortOrder: 4,
    },

    // osu! 特有标签
    {
        i18nKey: "heading",
        tag: "heading",
        icon: "fas fa-heading",
        category: "osu",
        sortOrder: 6,
    },
    {
        i18nKey: "notice",
        tag: "notice",
        icon: "fas fa-exclamation-triangle",
        category: "osu",
        sortOrder: 6,
    },
    {
        i18nKey: "box",
        tag: "box=展开查看",
        icon: "fas fa-box",
        category: "osu",
        sortOrder: 6,
    },
    {
        i18nKey: "profile",
        tag: "profile=123456",
        icon: "fas fa-user",
        category: "osu",
        sortOrder: 6,
    },
    {
        i18nKey: "spoilerbox",
        tag: "spoilerbox",
        icon: "fas fa-search",
        category: "special",
        sortOrder: 6,
    },
    {
        i18nKey: "email",
        tag: "email=test@gmail.com",
        icon: "fas fa-envelope",
        category: "media",
        sortOrder: 6,
    },
    {
        i18nKey: "youtube",
        tag: "youtube",
        icon: "fab fa-youtube",
        category: "media",
        sortOrder: 6,
    },
    {
        i18nKey: "audio",
        tag: "audio",
        icon: "fas fa-music",
        category: "media",
        sortOrder: 6,
    },
    {
        i18nKey: "imagemap",
        tag: "imagemap",
        icon: "fas fa-map-marked-alt",
        category: "media",
        sortOrder: 6,
    },
]

/**
 * 旧版 bbcodeTags 数组（为了向后兼容，已弃用）
 * @deprecated 请使用 getTranslatedBBCodeTags(t) 获取翻译后的标签
 */
export const bbcodeTags: BBCodeTag[] = []
