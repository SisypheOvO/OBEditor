<template>
    <div class="relative" ref="selectorRef">
        <button ref="buttonRef" :class="[buttonClass, isOpen ? 'bg-[#3c3c3c] text-white' : '']" title="字体大小" @click.stop="toggleMenu">
            <i class="fas fa-text-height"></i>
        </button>

        <Teleport to="body">
            <Transition name="dropdown">
                <div v-if="isOpen" class="fixed bg-[#252525] border border-[#404040] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.4)] z-9999 min-w-[100px] backdrop-blur-sm overflow-hidden" :style="dropdownStyle">
                    <button v-for="size in sizeOptions" :key="size" :class="['w-full px-4 py-2.5 text-[#cccccc] bg-[#353535] hover:bg-[#3a3a3a] active:bg-[#454545] transition-all duration-150 flex items-center justify-between group relative overflow-hidden', size === 100 ? 'border-l-2 pl-3.5 border-[#8b5cf6]' : '']" @click="handleSelect(size)">
                        <span class="text-sm font-medium group-hover:text-white transition-all flex items-center gap-2 group-hover:-translate-y-px">
                            {{ size }}
                        </span>
                        <span class="text-xs text-[#888888] group-hover:text-[#aaaaaa] transition-all font-mono group-hover:-translate-y-px">{{ size }}%</span>
                        <div class="absolute inset-0 bg-linear-to-r from-[#8b5cf6]/0 to-[#8b5cf6]/0 group-hover:from-[#8b5cf6]/5 group-hover:to-transparent transition-all duration-150"></div>
                    </button>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue"

defineProps<{
    buttonClass: string
}>()

const emit = defineEmits<{
    select: [size: number]
}>()

const isOpen = ref(false)
const selectorRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)
const dropdownPosition = ref({ top: 0, left: 0 })

const sizeOptions = [50, 85, 100, 150]

const dropdownStyle = computed(() => ({
    top: `${dropdownPosition.value.top + 6}px`,
    left: `${dropdownPosition.value.left}px`,
}))

const updateDropdownPosition = () => {
    if (!buttonRef.value) return

    const rect = buttonRef.value.getBoundingClientRect()
    dropdownPosition.value = {
        top: rect.bottom + 4, // 4px margin
        left: rect.left,
    }
}

const toggleMenu = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value) {
        updateDropdownPosition()
    }
}

const handleSelect = (size: number) => {
    emit("select", size)
    isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
    if (selectorRef.value && !selectorRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

const handleScroll = () => {
    if (isOpen.value) {
        isOpen.value = false
    }
}

const handleResize = () => {
    if (isOpen.value) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)
    window.addEventListener("scroll", handleScroll, true) // Use capture to catch all scroll events
    window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
    window.removeEventListener("scroll", handleScroll, true)
    window.removeEventListener("resize", handleResize)
})
</script>

<style scoped>
.dropdown-enter-active {
    transition:
        opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dropdown-leave-active {
    transition:
        opacity 0.15s ease-in,
        transform 0.15s ease-in;
}

.dropdown-enter-from {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
}

.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
}
</style>
