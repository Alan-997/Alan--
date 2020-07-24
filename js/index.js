window.addEventListener('load',function(){
    // 演员上场
    let focus = document.querySelector('.focus');
    let focusUl = focus.querySelector('ul');
    // 演员：左右箭头
    let arrowL = document.querySelector('.arrow_l');
    let arrowR = document.querySelector('.arrow_r');
    // 演员：小圆点
    let circle = document.querySelector('.circle');
    // 自动播放的间隔时间；
    let autoTime = 2500;
    // 自动轮播，就是自动点击右按钮,当鼠标经过的时候停止播放，鼠标离开继续
    // function(){arrowR.click()}就是调用右按钮的点击事件
    let timer = setInterval(function(){arrowR.click()},autoTime);
    // 鼠标经过focus，左右箭头显示
    focus.addEventListener('mouseover',function(){
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        // 鼠标经过清除定时器
        clearTimeout(timer);
    })
    // 鼠标离开focus，左右箭头隐藏
    focus.addEventListener('mouseout',function(){
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        // 鼠标离开继续自动轮播
        timer = setInterval(function(){arrowR.click()},autoTime);
    })
    // 图片li的长度
    let listLength = focusUl.children.length;
    // 根据图片的数量创建对应数量的小圆点
    for(let i =0 ; i < listLength ; i++){
        // 给每一个图片li添加index属性
        focusUl.children[i].setAttribute('index',i);
        // 得到自定义属性值
        let index = focusUl.children[i].getAttribute('index');
          
        // 创建元素
        let li = document.createElement('li');
        // 添加元素
        circle.appendChild(li);
        // 给当前的li加上current
        circle.children[0].className = 'current';
        // 给circle添加点击事件
        circle.children[i].addEventListener('click',function(){
            // 让所有li清除current类 排他思想
            for(let i = 0 ; i < circle.children.length ; i++){
                circle.children[i].className = '';
            }
            // 给当前的li加上current
            this.className = 'current';
            // 点击小圆点，显示对应的图片
            animate(focusUl,-index * focus.offsetWidth);
            
            // 让所有的信号量同步改变
            // 图片的信号量与
            num = index;
            circle_index = index; 
        })
    }
    // 克隆节点
    // 把第一个图片克隆到ul的最后
    let first = focusUl.children[0].cloneNode(true);
    // console.log(first);
    focusUl.appendChild(first);
    // 图片的声明一个信号量
    let num = 0;
    // 再次声明一个小圆点的信号量
    let circle_index = 0;
    // 右按钮点击事件
    // 为了防止点击事件过快，我们给点击事件设置节流阀
    // 节流阀工作原理
    // 1.当第一次点击按钮时，节流阀为打开状态
    // 2.一旦点击，就立刻关闭节流阀
    // 3.当点击一次的运动完成过后，再打开节流阀，这样就不会出现点击过快，图片观察不清晰
    let flag = true;
    arrowR.addEventListener('click',function(){
        // 判断如果节流阀为true再执行
        if(flag){
            // 立刻关闭节流阀
            flag = false;
            if(num == listLength){
                focusUl.style.left = 0;
                num = 0;
            }
            num++;
            animate(focusUl,-num * focus.offsetWidth,function(){
                // 当运动完成后打开节流阀
                flag = true;
            });
            // 让每一次点击小圆点跟着对应的图片移动
            // 每一次点击右按钮让小圆点信号量++；
            circle_index++;
            // 判断，因为小圆点个数与图片个数不一致
            if(circle_index ==circle.children.length){
                circle_index = 0;
            }
            circleChange();
        }
    })
    
    // 左按钮点击事件
    arrowL.addEventListener('click',function(){
        if(flag){
            flag = false;
            if(num == 0 ){
                num = listLength;
                focusUl.style.left = -num * focus.offsetWidth + 'px' ;
            }
            num--;
            animate(focusUl,-num * focus.offsetWidth,function(){
                flag = true;
            });
            // 让每一次点击小圆点跟着对应的图片移动
            // 每一次点击右按钮让小圆点信号量++；
            circle_index--;
            // 判断，因为小圆点个数与图片个数不一致
            if(circle_index < 0){
                circle_index = circle.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange(){
        // 然后再做排他
        for(let i = 0 ; i < circle.children.length ; i++){
            circle.children[i].className = '';
        }
        circle.children[circle_index].className = 'current';
    }
})