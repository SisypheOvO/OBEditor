export interface UserInfo {
    id: number
    username: string
    avatar_url: string
    cover?: {
        custom_url?: string
        url?: string
    }
    country_code: string
    country?: {
        name: string
    }
    team?: {
        id: number
        name: string
        flag_url: string
    }
    is_supporter: boolean
    is_online: boolean
    groups?: Array<{
        id: number
        identifier: string
        name: string
        short_name: string
        colour: string
    }>
}
