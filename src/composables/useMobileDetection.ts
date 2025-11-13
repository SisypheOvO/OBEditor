import { ref, onMounted, onUnmounted } from "vue"

export const useMobileDetection = (breakpoint = 768) => {
    const isMobile = ref(false)

    onMounted(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

        const update = (e: MediaQueryListEvent) => {
            isMobile.value = e.matches
        }

        isMobile.value = mediaQuery.matches
        mediaQuery.addEventListener("change", update)

        return () => mediaQuery.removeEventListener("change", update)
    })

    return { isMobile }
}
