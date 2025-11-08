<template>
    <div data-auth-button-container class="relative">
        <!-- Button -->
        <button @click="handleAuthClick" class="relative w-10 h-10 rounded-md overflow-hidden border outline-0 border-[#3c3c3c] hover:outline hover:outline-[#ff66aa] transition-all hover:shadow-md hover:shadow-[#ff66aa]/20 hover:cursor-pointer flex items-center justify-center bg-[#2e3038]">
            <!-- Loading spinner -->
            <div v-if="!avatarLoaded" class="absolute inset-0 flex items-center justify-center bg-[#2e3038]">
                <div class="spinner"></div>
            </div>

            <img v-if="isAuthenticated && userData" :src="userData?.avatar_url" :alt="userData?.username" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" :class="avatarLoaded ? 'opacity-100' : 'opacity-0'" @load="onAvatarLoad" />
            <img v-else :src="guestAvatarUrl" alt="Guest" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" :class="avatarLoaded ? 'opacity-100' : 'opacity-0'" @load="onAvatarLoad" />
        </button>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-show="showDropdown && isAuthenticated" class="absolute right-0 mt-4 w-fit bg-[#22242a]/95 backdrop-blur-md outline outline-[hsla(var(--hsl-b5),0.9)] rounded-lg shadow-2xl shadow-black/60 overflow-hidden z-50">
                <transition name="fade-slow">
                    <div
                        v-if="userData?.cover?.custom_url && coverLoaded"
                        class="absolute inset-0"
                        :style="{
                            backgroundImage: `url(${userData.cover.custom_url})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                        }"
                    ></div>
                </transition>

                <div v-if="userData?.cover?.custom_url && !coverLoaded" class="absolute inset-0 bg-[#22242a] animate-pulse"></div>

                <!-- User Info Section -->
                <div class="relative px-5 py-4 bg-[hsla(var(--hsl-b5),0.7)]">
                    <div class="space-y-1">
                        <p class="text-base font-semibold text-[#cccccc] truncate">
                            {{ userData?.username }}
                        </p>
                        <p class="text-sm text-[#bcbcbc]">
                            {{ userData?.country?.name || "Unknown" }}
                        </p>
                        <div v-if="userData?.statistics_rulesets?.osu" class="pt-2 space-y-1.5">
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#aeaeae]">{{ t('oauthDropdown.globalRanking') }}</span>
                                <span class="font-medium text-[#ff66aa]"> #{{ formatNumber(getRuleset(userData)?.global_rank) }} </span>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#aeaeae]">{{ t('oauthDropdown.pp') }}</span>
                                <span class="font-medium text-[#ff66aa]"> {{ formatNumber(getRuleset(userData)?.pp) }} PP </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="relative h-px bg-linear-to-r from-transparent bg-[hsla(var(--hsl-b5),0.8)]"></div>

                <!-- Logout Button -->
                <div class="relative p-2 bg-[hsla(var(--hsl-b5),0.7)] flex flex-row gap-2">
                    <button @click="handleImportBBCode" class="flex-1 h-8 w-fit px-4 text-sm font-medium text-center whitespace-nowrap text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.8)] hover:text-black rounded-full transition-all duration-250 ease-out">{{ t('oauthDropdown.importProfile') }}</button>
                    <button @click="handleLogout" class="h-8 w-fit px-4 text-sm font-medium text-center whitespace-nowrap text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.3)] hover:text-[#b7bcc4] rounded-full transition-all duration-250 ease-out">{{ t('oauthDropdown.signOut') }}</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import type { User } from "@osynicite/osynic-osuapi"
import { useContentsStore } from "@/stores/contents"
import { useI18n } from "vue-i18n"

// Use auth store
const authStore = useAuthStore()
const { isAuthenticated, userData } = storeToRefs(authStore)
const contentsStore = useContentsStore()
const { t } = useI18n()

const avatarLoaded = ref(false)
const coverLoaded = ref(false)

const handleImportBBCode = () => {
    userBBCodeImport()
}

const userBBCodeImport = () => {
    if (!isAuthenticated.value || !userData.value) return
    if (!authStore.userData?.page) return
    const username = authStore.userData.username
    const bbcodeContent = authStore.userData.page.raw
    contentsStore.importFromOAuth(`${username} ${t("drawer.profile")}`, bbcodeContent)
}

const showDropdown = ref(false)
const guestAvatarUrl = computed(() => "/images/guest.png")

const preloadCoverImage = (url: string) => {
    coverLoaded.value = false
    const img = new Image()
    img.onload = () => {
        coverLoaded.value = true
    }
    img.onerror = () => {
        coverLoaded.value = true
    }
    img.src = url
}

watch(
    () => userData.value?.cover?.custom_url,
    (newUrl) => {
        if (newUrl) {
            preloadCoverImage(newUrl)
        }
    },
    { immediate: true }
)

watch(
    () => [isAuthenticated.value, userData.value?.avatar_url],
    () => {
        avatarLoaded.value = false
    },
    { immediate: true }
)

const onAvatarLoad = () => {
    avatarLoaded.value = true
}

const handleAuthClick = () => {
    if (isAuthenticated.value) {
        showDropdown.value = !showDropdown.value

        if (showDropdown.value) {
            nextTick(() => {
                document.addEventListener("click", handleClickOutside)
            })
        } else {
            document.removeEventListener("click", handleClickOutside)
        }
    } else {
        authStore.login()
    }
}

const handleLogout = () => {
    showDropdown.value = false
    document.removeEventListener("click", handleClickOutside)
    authStore.logout()
}

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-auth-button-container]")) {
        showDropdown.value = false
        document.removeEventListener("click", handleClickOutside)
    }
}

onMounted(() => {
    authStore.initializeAuth()
})

type RulesetKey = keyof NonNullable<User["statistics_rulesets"]>

const getRuleset = (ud: User | null) => {
    if (!ud || !ud.statistics_rulesets) return undefined
    const key = (ud.playmode as RulesetKey) || "osu"
    return ud.statistics_rulesets[key]
}

const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return "N/A"
    return num.toLocaleString()
}
</script>

<style scoped>
.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 102, 170, 0.2);
    border-top-color: #ff66aa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.fade-enter-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-slow-enter-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-slow-enter-from {
    opacity: 0;
}

.fade-slow-enter-to {
    opacity: 1;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
}
</style>
