import Stars    from './Stars'
import Moon     from './Moon'
import Meteor   from './Meteor'

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
    moon = new Moon(ctx, width, height),
    stars = new Stars(ctx, width, height, 200),
    meteors = [],
    count = 0

canvas.width = width
canvas.height = height

//流星生成函数
const meteorGenerator = ()=> {
    //x位置偏移，以免经过月亮
    let x = Math.random() * width + 800
    meteors.push(new Meteor(ctx, x, height))

    //每隔随机时间，生成新流星
    setTimeout(()=> {
        meteorGenerator()
    }, Math.random() * 2000)
}

//每一帧动画生成函数
const frame = ()=> {
    //每隔10帧星星闪烁一次，节省计算资源
    count++
    count % 10 == 0 && stars.blink()

    moon.draw()
    stars.draw()

    meteors.forEach((meteor, index, arr)=> {
        //如果流星离开视野之内，销毁流星实例，回收内存
        if (meteor.flow()) {
            meteor.draw()
        } else {
            arr.splice(index, 1)
        }
    })
    requestAnimationFrame(frame)
}

meteorGenerator()
frame()