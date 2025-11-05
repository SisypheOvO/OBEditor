import { useAuthStore } from "@/stores/auth"

/**
 * 用户信息 composable
 * 提供对用户好友信息的访问
 */
export const useUserInfo = () => {
    const authStore = useAuthStore()

    /**
     * 检查用户的好友关系
     * @param userId - 要检查的用户 ID
     * @returns 好友关系状态
     */
    const getFriendshipStatus = (userId: number): "mutual" | "friend" | "none" => {
        return authStore.getFriendshipStatus(userId)
    }

    /**
     * 手动刷新好友列表
     */
    const refreshFriendsList = async () => {
        await authStore.loadFriendsList()
    }

    return {
        // 用户数据
        userData: authStore.userData,
        friendsList: authStore.friendsList,
        isAuthenticated: authStore.isAuthenticated,
        client: authStore.client,

        // 方法
        getFriendshipStatus,
        refreshFriendsList,
    }
}
