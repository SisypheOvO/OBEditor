<!--
    BBCode 预览头部组件
    包含：用户输入、用户信息显示、刷新按钮
-->
<template>
    <div class="flex items-center justify-between pl-5 pr-3 py-2 border-b border-[#3c3c3c] bg-[#22242a] rounded-sm">
        <h3 class="m-0 text-sm font-semibold text-[#cccccc]">实时预览</h3>

        <div class="flex items-center">
            <button class="bg-transparent border-0 text-[#cccccc] cursor-pointer p-1 rounded transition-all duration-200 text-base flex items-center justify-center hover:bg-[#3c3c3c] hover:rotate-180" @click="emit('refresh')" title="刷新预览">
                <span>🔄</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    refresh: []
}>()
</script>
