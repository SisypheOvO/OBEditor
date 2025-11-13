import { apiClient } from "@/utils/apiClient"
import type { User } from "@osynicite/osynic-osuapi"

/**
 * 获取用户信息
 * @param userId - 用户 ID
 * @param client - 已认证的 API 客户端
 * @returns 用户信息对象或 null
 */
export const getUserInfo = async (userId: string): Promise<User | null> => {
    try {
        const data = await apiClient.get<{ users: User[] }>(`https://osu.ppy.sh/users/lookup?ids%5B%5D=${userId}`)
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
