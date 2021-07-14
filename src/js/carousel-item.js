import {
    h,
    inject,
    ref,
    onMounted,
    watch
} from 'vue'
export default {
    name: 'carousel-item',
    setup(props, context) {
        const activeIndex = inject('activeIndex')
        const index = ref(0)
        const refEl = ref(null)

        onMounted(() => {
            // 待父组件渲染完毕
            setTimeout(() => {
                index.value = Number(refEl.value.getAttribute('slide-index'))
            }, 0)
        })

        return () => h('div', {
            class: {
                'carousel-item': true,
                'carousel-item-active': index.value === activeIndex.value
            },
            ref: refEl
        }, h(context.slots.default))
    }
}