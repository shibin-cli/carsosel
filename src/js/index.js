import {
    ref,
    onMounted,
    onUnmounted,
    h,
    provide,
    watch
} from 'vue'
import CarouselList from './carousel-list.js'
import CarouselItem from './carousel-item.js'
import CarouselPagination from './carousel-pagination.js'

function debounce(fn, wait = 300) {
    var loading = false

    return function () {
        if (loading) {
            return
        }
        loading = true
        fn()
        setTimeout(() => {
            loading = false
        }, wait)
    }
}

function useChangeActiveIndex({
    activeIndex,
    container,
    props,
    listEl
}) {
    // 轮播长度
    let len = ref(0)

    function nextActive() {
        if (len.value - 1 > activeIndex.value) {
            activeIndex.value++
        } else if (props.loop) {
            activeIndex.value = 0
        }
    }

    function preActive() {
        if (activeIndex.value === 0) {
            if (props.loop) {
                activeIndex.value = len.value - 1
            }
        } else {
            activeIndex.value--
        }
    }

    function setActive(index) {
        activeIndex.value = index
    }
    let timer

    function autoSlide() {
        if (timer) {
            clearTimer()
        }
        if (!props.autoplay) {
            return
        }
        timer = setInterval(nextActive, props.time * 1000);
    }

    function clearTimer() {
        clearInterval(timer)
        timer = null
    }
    watch(() => props.autoplay, (autoplay) => {
        if (!autoplay) {
            clearTimer()
        } else {
            autoSlide()
        }
    })

    onMounted(() => {
        if (props.autoplay) {
            autoSlide()
        }
        container.value.addEventListener('mouseover', clearTimer)
        container.value.addEventListener('mouseout', autoSlide)
        // 获取轮播长度
        len.value = listEl.value.nextSibling.children.length
        if (props.effect === 'slide' && props.loop) {
            len.value = len.value - 2
        }
    })

    onUnmounted(() => {
        clearTimer()
    })
    provide('nextActive', nextActive)
    provide('preActive', preActive)
    provide('clearTimer', clearTimer)
    provide('autoSlide', autoSlide)
    return {
        nextActive,
        preActive,
        setActive,
        len
    }
}


const Carousel = {
    name: 'carousel',
    components: {
        CarouselPagination
    },
    props: {
        time: {
            type: Number,
            default: 5
        },
        effect: {
            type: String,
            default: 'slide'
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        loop: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {
        const activeIndex = ref(0)
        const container = ref(null)

        provide('activeIndex', activeIndex)
        provide('effect', props.effect)
        provide('loop', props.loop)
        const listEl = ref(null)

        const {
            nextActive,
            preActive,
            setActive,
            len
        } = useChangeActiveIndex({
            activeIndex,
            container,
            props,
            listEl
        })

        return () => h('div', {
            class: 'carousel-container',
            ref: container
        }, [
            h('div', {
                class: 'carousel-control carousel-control-pre',
                onClick: debounce(preActive, 300)
            }, '<'),
            h(context.slots.default, {
                activeIndex,
                ref: listEl
            }),
            h('div', {
                class: 'carousel-control carousel-control-next',
                onClick: debounce(nextActive, 300)
            }, '>'),
            context.slots.pagination ? h(CarouselPagination, {
                activeIndex,
                len,
                setActive
            }) : ''
        ])
    }
}
export {
    Carousel,
    CarouselList,
    CarouselItem,
    CarouselPagination
}