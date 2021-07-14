import {
    createApp,
    reactive,
    ref
} from 'vue'
import {
    Carousel,
    CarouselList,
    CarouselItem,
} from 'carousel'

createApp({
    components: {
        Carousel,
        CarouselList,
        CarouselItem,
    },
    setup() {
        const list = reactive([{
                id: '1',
                src: '//img.alicdn.com/imgextra/i1/6000000008079/O1CN01kotcXe29YEVObhi37_!!6000000008079-0-octopus.jpg'
            }, {
                id: '2',
                src: '//img.alicdn.com/imgextra/i3/6000000001226/O1CN01mTLirm1KvYGbpkCl2_!!6000000001226-2-octopus.png'
            }, {
                id: '3',
                src: '//aecpm.alicdn.com/simba/img/TB183NQapLM8KJjSZFBSutJHVXa.jpg'
            },
            {
                id: '4',
                src: '//aecpm.alicdn.com/simba/img/TB1JNHwKFXXXXafXVXXSutbFXXX.jpg'
            }, {
                id: '5',
                src: '//aecpm.alicdn.com/simba/img/TB1XotJXQfb_uJkSnhJSuvdDVXa.jpg'
            }
        ])

        return {
            list
        }
    }
}).mount('#app')