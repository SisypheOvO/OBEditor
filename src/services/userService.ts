import { apiClient } from "@/utils/apiClient"
import type { UserInfo } from "@/types/user"

/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @returns 用户信息对象或 null
 */
export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
    try {
        const data = await apiClient.get<{ users: UserInfo[] }>(`https://osu.ppy.sh/users/lookup?ids%5B%5D=${userId}`)
        return data.users[0] || null
    } catch (error) {
        console.error("Failed to fetch user info:", error)
        return null
    }
}

/**
 * 生成国旗 URL
 * @param countryCode - 国家代码
 * @returns 国旗 SVG URL
 */
export const getFlagUrl = (countryCode: string): string => {
    const baseFileName = countryCode
        .split("")
        .map((c) => (c.charCodeAt(0) + 127397).toString(16))
        .join("-")

    return `https://osu.ppy.sh/assets/images/flags/${baseFileName}.svg`
}
