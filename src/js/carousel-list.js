import {
    h,
    inject,
    ref,
    onMounted,
    watch
} from 'vue'
export default {
    name: 'carousel-list',
    setup(props, context) {
        const effect = inject('effect')
        const elRef = ref(null)
        let translateX = 0
        let width
        const nextActive = inject('nextActive')
        const preActive = inject('preActive')
        const autoSlide = inject('autoSlide')
        const clearTimer = inject('clearTimer')
        const activeIndex = inject('activeIndex')

        const loop = inject('loop')
        const animateDuration = 0.3
        // 初始列表长度
        let initEleLength

        onMounted(() => {
            const el = elRef.value
            width = el.offsetWidth
            let children = [...el.children]
            initEleLength = children.length
            children.forEach((child, index) => {
                child.style.width = el.offsetWidth + 'px'
                child.setAttribute('slide-index', index)
            })
            if (effect === 'slide') {

                el.style.width = (children.length + 2) * el.offsetWidth + 'px'
                el.style.transition = `all ${animateDuration}s`
                translateX = getTranslateX()
                el.style.transform = `translate(${translateX}px,0)`
                if (loop && children.length) {
                    el.insertBefore(children[children.length - 1].cloneNode(true), children[0])
                    el.appendChild(children[0].cloneNode(true))
                }
            }

            function getTranslateX() {
                let number = loop ? -(activeIndex.value + 1) : -activeIndex.value
                return number * width
            }
            watch(activeIndex, (activeIndex, preIndex) => {
                function handle() {
                    el.style.transition = 'all 0s'
                    translateX = getTranslateX()
                    el.style.transform = `translate(${translateX}px,0)`
                    el.removeEventListener('transitionend', handle)

                    setTimeout(() => {
                        el.style.transition = `all ${animateDuration}s`
                    }, 0)
                }
                if (effect === 'slide') {
                    if (activeIndex === 0 && preIndex === children.length - 1) {
                        translateX = -(preIndex + 2) * width
                        el.addEventListener('transitionend', handle, false)
                    } else if (activeIndex === children.length - 1 && preIndex === 0) {
                        translateX = preIndex * width
                        el.addEventListener('transitionend', handle, false)
                    } else {
                        translateX = getTranslateX()
                    }
                }
                el.style.transform = `translate(${translateX}px,0)`
            })

        })
        let x, startX
        return () => h('div', {
            class: {
                'carousel-list': true,
                'fade': effect === 'fade',
                    'slide': effect === 'slide'
            },
            ref: elRef,
            onTouchstartPassive(e) {
                clearTimer()
                startX = e.touches[0].clientX
            },
            onTouchmovePassive(e) {
                if (effect !== 'slide') {
                    return
                }
                let moveX = e.touches[0].clientX
                x = moveX - startX
                elRef.value.style.transition = 'all 0s'
                elRef.value.style.transform = `translate(${ x + translateX}px,0)`
            },
            onTouchendPassive(e) {
                elRef.value.style.transition = `all ${animateDuration}s`
                if (Math.abs(x) < (width / 4)) {
                    elRef.value.style.transform = `translate(${translateX}px,0)`
                } else {
                    x > 0 ? preActive() : nextActive()
                    if (!loop) {
                        if (activeIndex.value === 0 || activeIndex.value === initEleLength - 1) {
                            elRef.value.style.transform = `translate(${translateX}px,0)`
                        }
                    }
                }
                autoSlide()
            }
        }, h(context.slots.default))
    }
}