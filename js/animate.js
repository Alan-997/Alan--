function animate(obj,targer,callback){
    // 当我使用按钮点击执行运动函数的时候，如果多次点击按钮会出现动画累积的现象
    // 所以在动画执行前需要将之前的动画清除
    clearInterval(obj.timer); // 防止动画累积
    
    obj.timer = setInterval(function(){
        // 增加缓冲算法 (obj的目标位置 - obj当前位置) / 10
        // 就会得到一个先快后慢的运动轨迹
        // step步长需要写在setInterval里面，因为每一次都会有新的obj.offsetLeft;
        // 测试发现step并没有到达目标位置
        // let step = (targer - obj.offsetLeft) / 10;
        // (targer - obj.offsetLeft) / 10 在执行中会出现小数的情况
        // 需要给step每一次计算取整
        // Math.ceil()取大值（ceil意思是装在天花板上）  、 Math.floor()取小值（floor意思是在地板上）
        let  step = (targer - obj.offsetLeft) / 10;
        // 当目标位置大于当前的实际位置时我们应该取大值
        // 当目标位置小于当前的实际位置时我们应该取小值
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // 判断当前位置与target，如果当前位置与target相等，
        // 那么就清除动画，并return不再执行后面的
        if(obj.offsetLeft == targer){
            clearInterval(obj.timer);
            // 回调函数，在运动完成后调用
            if(callback){
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step +'px';
    },15)
}