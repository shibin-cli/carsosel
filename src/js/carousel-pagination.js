import {
    h
} from 'vue'

export default {
    name: 'carousel-pagination',
    props: {
        len: {
            required: true
        },
        activeIndex: {
            required: true
        },
        setActive: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        function getChildren() {
            let children = []
            for (let i = 0; i < props.len.value; i++) {
                children.push(h('div', {
                    class: {
                        'carousel-pagination-item': true,
                        'carousel-pagination-item-active': i === props.activeIndex.value
                    },
                    onClick() {
                        props.setActive(i)
                    }
                }))
            }
            return children
        }

        return () => h('div', {
            class: 'carousel-pagination'
        }, getChildren())
    }
}