# 简易轮播图
基于vue实现简易轮播图
``` html
<div id="app">
    <carousel :time="3" effect="fade" :autoplay="true" :loop="true">
      <carousel-list>
        <carousel-item v-for="(item,index) in list">
            <img :src="item.src" />
        </carousel-item>
      </carousel-list>
   </carousel>
</div>
```
```js
iimport {
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
                src: '//xxx.jpg'
            }, {
                id: '2',
                src: '//xxx.png'
            }, {
                id: '3',
                src: '//xxx.jpg'
            },
            {
                id: '4',
                src: '//xxx.jpg'
            }, {
                id: '5',
                src: '//xxx.jpg'
            }
        ])

        return {
            list
        }
    }
}).mount('#app')
```


|  参数   |   说明  |   类型   |  可选值 |  默认值 |
|  ----  |   ----  | :----:  | :---: |  :---:  |
|autoplay|是否自动切换|Boolean| true/false| true|
| time | 自动切换时间 | Number |  -  | 5 | 
| effect | 切换类型| String  | slide / fade | slide |
| loop | 循环 | Boolean | true / false | true
