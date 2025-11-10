/**
 * 获取翻译后的默认内容
 * @param t i18n 翻译函数
 * @returns 翻译后的默认内容
 */
export function getDefaultContent(t: (key: string) => string): string {
    return t("defaultContent")
}
