const 本地存储 = localStorage;
const 视窗 = window;
const 文档 = document;
const 如何做爱元素 = 文档.documentElement;
const 体元素 = 文档.body;
const 新建元素 = 名 => 文档.createElement(名);
const 新建图 = _=> new Image();
const 添加事件监控 = (元素,事件,回调) => 元素[`on${事件}`] = 回调;// 元素.addEventListener(事件,回调);
const 监听 = (元素,事件,回调,选项) => 元素.addEventListener(事件,回调,选项);
const 获取元素方位 = 元素 => 元素.getBoundingClientRect();
const 设置延时 = setTimeout;
const 数学 = Math;
const 统一资源定位 = URL;
const 点击 = 'click';
const 加载 = 'load';
const 等级 = 'level';
const 样式 = 'style';
const 唯一标识 = 'id';
const 源 = 'src';
const 目标 = 'href';
const 设置属性 = 'setAttribute';
const 获取属性 = 'getAttribute';
const 清除属性 = 'removeAttribute';
const 数据属性头 = 'data-'; 
const 呢 = 'ing';
const 运行中属性 = 数据属性头 + 'runn' + 呢;
const 加载中属性 = 数据属性头 + 加载 + 呢;
const 子元素 = 'children';
const 停止冒泡 = 'stopPropagation';
const 新建数据地址 = 'createObjectURL';
const 展示 = 'display';
const 块 = 'block';
const 网格 = 'grid';
const 肉 = 'innerHTML';
const 宽度 = 'width';
const 高度 = 'height';
const 左边 = 'left';
const 上边 = 'top';
const 零 = 0;
const 二 = 2;
const 千 = 1e3;
const 面 = '2d';
const 像素 = 'px';
const 空字 = '';
const 啊 = 'a';
const 靶子 = 'target';
const 真 = true;
const 无 = 'none';
const 最小 = 'min';
const 最大 = 'max';
const 四舍五入 = 'round';
const 绝对值 = 'abs';
const 是社交媒体 = /weibo|qq/i.test(navigator.userAgent);

const $ = (名,元素 = 文档) => 元素.querySelector(名);

const 背景色 = '#efb4b4';
const 本地存储等级们钥匙 = 'china-ex-real-levels-v1';
const 保存文件名 = `[中国地级制霸].png`;
const 三沙代码 = '460300';

const 宽 = 1134;
const 高 = 976;
const 比 = 二;
const 导出宽 = 3200;
const 导出高 = 2400;
const 最小间距 = 6;

const 地区 = $('#地区');
const 保存 = $('#保存');
const 输出 = $('#输出');
const 输出图片 = $('img',输出);
const 设置等级 = $('#设置等级');
const 地图控制 = $('#地图控制');
const 分数显示元素 = $('#分数显示');

const 画板 = 新建元素('canvas');
const 上下文 = 画板.getContext(面);

画板[宽度] = 导出宽;
画板[高度] = 导出高;

const 图形 = 体元素[子元素][零];
const 设置等级标题 = 设置等级[子元素][零];
const SVG命名空间 = 'http://www.w3.org/2000/svg';

const 设置等级样式 = 设置等级[样式];
const 输出样式 = 输出[样式];
const 原始视图框 = 图形[获取属性]('viewBox');
const 移动视图框 = '20 28 940 928';
const 视图框转数组 = 文本 => 文本.split(/\s+/).map(Number);
const 视图框转文本 = 视图框 => [
    视图框.左,
    视图框.上,
    视图框.宽,
    视图框.高
].map(值 => +值.toFixed(二)).join(' ');
const 新建视图框 = 文本 => {
    const 数据 = 视图框转数组(文本);
    return {
        左: 数据[零],
        上: 数据[1],
        宽: 数据[二],
        高: 数据[3]
    };
};
const 复制视图框 = 视图框 => ({
    左: 视图框.左,
    上: 视图框.上,
    宽: 视图框.宽,
    高: 视图框.高
});
const 原始视图框数据 = 新建视图框(原始视图框);
const 移动视图框数据 = 新建视图框(移动视图框);


const 全关闭 = _=>{
    设置等级样式[展示] = 空字;
};
const 数据 = {};
let 忽略点击 = false;
const 忽略下一次点击 = _=>{
    忽略点击 = 真;
    设置延时(_=>忽略点击 = false,300);
};
const 触屏查询 = 视窗.matchMedia('(pointer: coarse), (max-width: 800px)');
const 是触屏界面 = _=>触屏查询.matches;
const 是真实触摸事件 = 事件 => 事件.pointerType === 'touch' || 事件.pointerType === 'pen';
const 是可拖动指针 = 事件 => 是真实触摸事件(事件) || 事件.pointerType === 'mouse';
const 是触摸设备 = _=> navigator.maxTouchPoints > 零 || 视窗.TouchEvent && 触屏查询.matches;
let 基础视图框 = 复制视图框(原始视图框数据);
const 地图视图 = 复制视图框(基础视图框);
const 最小比例 = 1;
const 最大比例 = 80;
const 取数值范围 = (值,小,大)=>数学[最大](小,数学[最小](大,值));
const 获取地图比例 = _=>基础视图框.宽 / 地图视图.宽;
const 获取绘制区域 = _=>{
    const 方位 = 获取元素方位(图形);
    const 缩放 = 数学[最小](方位[宽度] / 地图视图.宽,方位[高度] / 地图视图.高);
    const 绘制宽 = 地图视图.宽 * 缩放;
    const 绘制高 = 地图视图.高 * 缩放;
    return {
        左: 方位[左边] + (方位[宽度] - 绘制宽) / 二,
        上: 方位[上边] + (方位[高度] - 绘制高) / 二,
        宽: 绘制宽,
        高: 绘制高
    };
};
const 获取绘制区域中心 = _=>{
    const 绘制区域 = 获取绘制区域();
    return {
        左: 绘制区域.左 + 绘制区域.宽 / 二,
        上: 绘制区域.上 + 绘制区域.高 / 二
    };
};
const 点在绘制区域内 = (左,上)=>{
    const 绘制区域 = 获取绘制区域();
    return 左 >= 绘制区域.左 && 左 <= 绘制区域.左 + 绘制区域.宽 && 上 >= 绘制区域.上 && 上 <= 绘制区域.上 + 绘制区域.高;
};
const 屏幕点转地图点 = (左,上)=>{
    const 绘制区域 = 获取绘制区域();
    return {
        左: 地图视图.左 + (左 - 绘制区域.左) / 绘制区域.宽 * 地图视图.宽,
        上: 地图视图.上 + (上 - 绘制区域.上) / 绘制区域.高 * 地图视图.高
    };
};
const 屏幕距离转地图距离 = (左,上)=>{
    const 绘制区域 = 获取绘制区域();
    return {
        左: 左 / 绘制区域.宽 * 地图视图.宽,
        上: 上 / 绘制区域.高 * 地图视图.高
    };
};
const 限制地图视图 = _=>{
    const 比例 = 取数值范围(获取地图比例(),最小比例,最大比例);
    地图视图.宽 = 基础视图框.宽 / 比例;
    地图视图.高 = 基础视图框.高 / 比例;
    const 最大左 = 基础视图框.左 + 基础视图框.宽 - 地图视图.宽;
    const 最大上 = 基础视图框.上 + 基础视图框.高 - 地图视图.高;
    地图视图.左 = 取数值范围(地图视图.左,基础视图框.左,最大左);
    地图视图.上 = 取数值范围(地图视图.上,基础视图框.上,最大上);
};
const 应用地图视图 = _=>{
    限制地图视图();
    图形[设置属性]('viewBox',视图框转文本(地图视图));
    if(获取地图比例() > 1.001){
        如何做爱元素[设置属性]('data-zoomed',真);
    }else{
        如何做爱元素[清除属性]('data-zoomed');
    }
};
const 缩放地图 = (新比例,中心左 = 体元素.offsetWidth / 二,中心上 = 体元素.offsetHeight / 二)=>{
    新比例 = 取数值范围(新比例,最小比例,最大比例);
    const 中心 = 屏幕点转地图点(中心左,中心上);
    const 中心横向比例 = (中心.左 - 地图视图.左) / 地图视图.宽;
    const 中心纵向比例 = (中心.上 - 地图视图.上) / 地图视图.高;
    地图视图.宽 = 基础视图框.宽 / 新比例;
    地图视图.高 = 基础视图框.高 / 新比例;
    地图视图.左 = 中心.左 - 地图视图.宽 * 中心横向比例;
    地图视图.上 = 中心.上 - 地图视图.高 * 中心纵向比例;
    应用地图视图();
};
const 复位地图 = _=>{
    Object.assign(地图视图,复制视图框(基础视图框));
    应用地图视图();
};
const 应用响应视图框 = _=>{
    const 目标视图框 = 是触屏界面() ? 移动视图框数据 : 原始视图框数据;
    if(基础视图框.左 === 目标视图框.左 && 基础视图框.上 === 目标视图框.上 && 基础视图框.宽 === 目标视图框.宽 && 基础视图框.高 === 目标视图框.高) return;
    基础视图框 = 复制视图框(目标视图框);
    复位地图();
};
const 设置活动地区 = 元素=>{
    if(数据.省元素 && 数据.省元素 !== 元素){
        数据.省元素[清除属性]('data-active');
    }
    数据.省元素 = 元素;
    元素[设置属性]('data-active',真);
};
const 显示等级面板 = 省元素方位=>{
    设置等级样式[展示] = 是触屏界面() ? 网格 : 块;
    if(是触屏界面()){
        设置等级样式[左边] = 空字;
        设置等级样式[上边] = 空字;
        return;
    }
    const 设置等级元素方位 = 获取元素方位(设置等级);

    let 左 = 数学[四舍五入](如何做爱元素.scrollLeft + 省元素方位[左边] + 省元素方位[宽度] / 二 - 设置等级元素方位[宽度] / 二);
    左 = 数学[最小](
        左,
        体元素.offsetWidth - 设置等级元素方位[宽度] - 最小间距
    );
    左 = 数学[最大](
        左,
        最小间距
    );

    let 上 = 数学[四舍五入](如何做爱元素.scrollTop + 省元素方位[上边] + 省元素方位[高度] / 二 - 设置等级元素方位[高度] / 二);
    上 = 数学[最小](
        上,
        体元素.offsetHeight - 设置等级元素方位[高度] - 最小间距
    );
    上 = 数学[最大](
        上,
        最小间距
    );

    设置等级样式[左边] = 左 + 像素;
    设置等级样式[上边] = 上 + 像素;
};
const 获取所有省元素们 = _=>[ ...地区.querySelectorAll('path[data-code]') ];
const 获取所有省等级们 = _=>获取所有省元素们().map(元素 => 元素[获取属性](等级) || 零);
const 获取省代码 = 元素 => 元素[获取属性]('data-code') || 元素[唯一标识];
const 获取省名称 = 元素 => 元素[获取属性]('data-name') || 元素[唯一标识];
const 按代码取省元素 = 代码 => 地区.querySelector(`path[data-code="${代码}"]`);
const 获取事件省元素 = 事件=>{
    const 元素 = 事件[靶子];
    if(元素[获取属性] && 元素[获取属性]('data-code')) return 元素;
};
const 格式化数字 = 值 => +值.toFixed(二);
const 读取等级们 = _=>{
    const 文本 = 本地存储.getItem(本地存储等级们钥匙) || '{}';
    try{
        return JSON.parse(文本) || {};
    }catch(错误){
        return {};
    }
};
const 保存等级们 = _=>{
    const 等级们 = {};
    获取所有省元素们().forEach(元素=>{
        const 等级值 = 元素[获取属性](等级) || 零;
        if(+等级值){
            等级们[获取省代码(元素)] = 等级值;
        }
    });
    本地存储.setItem(本地存储等级们钥匙,JSON.stringify(等级们));
};
const 获取等级们并生效 = _=>{
    const 等级们 = 读取等级们();
    获取所有省元素们().forEach(元素=>{
        元素[设置属性](等级,等级们[获取省代码(元素)] || 零)
    });
};
添加事件监控(地区, 点击, 事件=>{
    事件[停止冒泡]();
    if(忽略点击){
        忽略点击 = false;
        return;
    }

    const 省元素 = 获取事件省元素(事件);
    if(!省元素) return;
    const 省元素方位 = 获取元素方位(省元素);
    设置活动地区(省元素);

    设置等级标题[肉] = 获取省名称(省元素);
    显示等级面板(省元素方位);
});
添加事件监控(文档,点击,全关闭);
const 指针们 = new Map();
const 手势 = {};
let 已移动地图 = false;
let 最近轻点时间 = 零;
let 最近轻点左 = 零;
let 最近轻点上 = 零;
const 获取指针们 = _=>[ ...指针们.values() ];
const 两点距离 = (点A,点B)=>数学.hypot(点A.左 - 点B.左,点A.上 - 点B.上);
const 两点中心 = (点A,点B)=>({
    左: (点A.左 + 点B.左) / 二,
    上: (点A.上 + 点B.上) / 二
});
const 准备双指手势 = _=>{
    const 点们 = 获取指针们();
    if(点们.length < 二) return;
    手势.距离 = 两点距离(点们[零],点们[1]) || 1;
    手势.比例 = 获取地图比例();
};
const 准备单指手势 = _=>{
    const 点们 = 获取指针们();
    if(!点们.length) return;
    点们[零].开始左 = 点们[零].左;
    点们[零].开始上 = 点们[零].上;
    手势.左 = 地图视图.左;
    手势.上 = 地图视图.上;
};
const 处理轻点缩放 = 事件=>{
    if(!是触屏界面()) return;
    if(!点在绘制区域内(事件.clientX,事件.clientY)) return;
    const 当前时间 = Date.now();
    const 间隔 = 当前时间 - 最近轻点时间;
    const 距离 = 数学.hypot(事件.clientX - 最近轻点左,事件.clientY - 最近轻点上);
    if(间隔 < 280 && 距离 < 28){
        全关闭();
        缩放地图(获取地图比例() < 2.5 ? 3 : 1,事件.clientX,事件.clientY);
        最近轻点时间 = 零;
        忽略下一次点击();
        if(事件.cancelable) 事件.preventDefault();
        return;
    }
    最近轻点时间 = 当前时间;
    最近轻点左 = 事件.clientX;
    最近轻点上 = 事件.clientY;
};
监听(图形,'pointerdown',事件=>{
    if(!是可拖动指针(事件)) return;
    if(事件.button && 事件.button !== 零) return;
    指针们.set(事件.pointerId,{
        左: 事件.clientX,
        上: 事件.clientY,
        开始左: 事件.clientX,
        开始上: 事件.clientY
    });
    if(图形.setPointerCapture && 是真实触摸事件(事件)){
        try{
            图形.setPointerCapture(事件.pointerId);
        }catch(错误){}
    }
    if(指针们.size === 二){
        准备双指手势();
    }else{
        准备单指手势();
    }
},{passive:false});
监听(图形,'pointermove',事件=>{
    const 点 = 指针们.get(事件.pointerId);
    if(!点) return;
    点.左 = 事件.clientX;
    点.上 = 事件.clientY;
    if(指针们.size === 二){
        const 点们 = 获取指针们();
        const 中心 = 两点中心(点们[零],点们[1]);
        缩放地图(手势.比例 * 两点距离(点们[零],点们[1]) / 手势.距离,中心.左,中心.上);
        已移动地图 = 真;
        全关闭();
        忽略下一次点击();
        if(事件.cancelable) 事件.preventDefault();
        return;
    }
    if(指针们.size === 1){
        const 移动左 = 点.左 - 点.开始左;
        const 移动上 = 点.上 - 点.开始上;
        if(数学.hypot(移动左,移动上) > 4){
            已移动地图 = 真;
            if(获取地图比例() > 1){
                const 地图移动 = 屏幕距离转地图距离(移动左,移动上);
                全关闭();
                地图视图.左 = 手势.左 - 地图移动.左;
                地图视图.上 = 手势.上 - 地图移动.上;
                应用地图视图();
            }
            忽略下一次点击();
            if(事件.cancelable) 事件.preventDefault();
        }
    }
},{passive:false});
const 结束指针 = 事件=>{
    const 点 = 指针们.get(事件.pointerId);
    指针们.delete(事件.pointerId);
    if(图形.releasePointerCapture){
        try{
            图形.releasePointerCapture(事件.pointerId);
        }catch(错误){}
    }
    if(指针们.size === 1){
        准备单指手势();
    }
    if(!指针们.size && 点 && !已移动地图){
        处理轻点缩放(事件);
    }
};
监听(图形,'pointerup',结束指针,{passive:false});
监听(图形,'pointercancel',结束指针,{passive:false});
['gesturestart','gesturechange','gestureend'].forEach(事件名=>{
    监听(文档,事件名,事件=>{
        if(是触摸设备() && 事件.cancelable) 事件.preventDefault();
    },{passive:false});
});
监听(图形,'touchstart',事件=>{
    if(是触摸设备() && 事件.touches && 事件.touches.length > 1 && 事件.cancelable) 事件.preventDefault();
},{passive:false});
监听(图形,'touchmove',事件=>{
    if(是触摸设备() && 事件.cancelable) 事件.preventDefault();
},{passive:false});
监听(图形,'wheel',事件=>{
    if(事件.cancelable) 事件.preventDefault();
    全关闭();
    const 倍率 = Math.exp(-事件.deltaY * .0025);
    缩放地图(获取地图比例() * 倍率,事件.clientX,事件.clientY);
},{passive:false});
监听(图形,'dblclick',事件=>{
    if(事件.cancelable) 事件.preventDefault();
    全关闭();
    缩放地图(获取地图比例() < 3 ? 6 : 1,事件.clientX,事件.clientY);
});
监听(视窗,'resize',_=>{
    应用响应视图框();
    应用地图视图();
});
添加事件监控(地图控制,点击,事件=>{
    事件[停止冒泡]();
    const 动作 = 事件[靶子][获取属性] && 事件[靶子][获取属性]('data-map-action');
    if(!动作) return;
    const 中心 = 获取绘制区域中心();
    if(动作 === 'zoom-in') 缩放地图(获取地图比例() * 1.7,中心.左,中心.上);
    if(动作 === 'zoom-out') 缩放地图(获取地图比例() / 1.7,中心.左,中心.上);
    if(动作 === 'reset') 复位地图();
});
const 计分 = _=>{
    const 分 = 获取所有省等级们().reduce((全, 当前) => {
        return 全 + (+当前 || 零);
      }, 零);
    分数显示元素[肉] = `分数: ${分}`;
}
添加事件监控(设置等级,点击,事件=>{
    事件[停止冒泡]();
    const 等级值 = 事件[靶子][获取属性](数据属性头+等级);
    if(!等级值) return;
    数据.省元素[设置属性](等级,等级值);
    计分();
    全关闭();
    保存等级们();
})

获取等级们并生效();
计分();
应用响应视图框();

设置延时(_=>如何做爱元素[清除属性](加载中属性),50);

const 从文档文本新建图形文件 = 文档文本=>{
    const 原始数据 = new Blob([文档文本], {type: 'image/svg+xml'});
    return 统一资源定位[新建数据地址](原始数据);
};
let 字体数据地址 = 空字;
const 数组转Base64 = 数组=>{
    let 二进制 = 空字;
    const 分段 = 8192;
    for(let 下标 = 零; 下标 < 数组.length; 下标 += 分段){
        二进制 += String.fromCharCode.apply(null,数组.subarray(下标,下标 + 分段));
    }
    return btoa(二进制);
};
const 读取字体数据地址 = async _=>{
    if(字体数据地址) return 字体数据地址;
    try{
        const 响应 = await fetch('字体.woff2');
        if(!响应.ok) return 空字;
        const 字体数据 = new Uint8Array(await 响应.arrayBuffer());
        字体数据地址 = `data:font/woff2;base64,${数组转Base64(字体数据)}`;
    }catch(错误){
        字体数据地址 = 空字;
    }
    return 字体数据地址;
};
const 下载文件 = (地址,文件名,元素 = 新建元素(啊))=>{
    if(!是社交媒体){
        元素.download = 文件名;
    }
    元素[目标] = 地址;
    元素[点击]();
};
const 地址变图像元素 = (地址,回调)=>{
    const 图 = 新建图();
    添加事件监控(图,加载,_=>设置延时(_=>回调(图),千 / 二));
    图[源] = 地址;
};
const 获取合并盒 = 元素们=>{
    return 元素们.reduce((盒,元素)=>{
        const 当前 = 元素.getBBox();
        if(!盒) return {
            左: 当前.x,
            上: 当前.y,
            右: 当前.x + 当前.width,
            下: 当前.y + 当前.height
        };
        return {
            左: 数学[最小](盒.左,当前.x),
            上: 数学[最小](盒.上,当前.y),
            右: 数学[最大](盒.右,当前.x + 当前.width),
            下: 数学[最大](盒.下,当前.y + 当前.height)
        };
    },null);
};
const 克隆SVG组 = (选择器,调整)=>{
    const 克隆 = $(选择器,图形).cloneNode(真);
    克隆.querySelectorAll('[data-active]').forEach(元素=>元素[清除属性]('data-active'));
    if(调整) 调整(克隆);
    return 克隆.outerHTML;
};
const 获取导出主地图元素们 = _=>[...地区.querySelectorAll('path[data-code]')]
    .filter(元素=>元素[获取属性]('data-code') !== 三沙代码);
const 获取等级颜色 = 元素=>({
    5:'#FF7E7E',
    4:'#FFB57E',
    3:'#FFE57E',
    2:'#A8FFBE',
    1:'#88AEFF'
})[元素 && 元素[获取属性](等级)] || '#FFF';
const 生成图例 = (左,上,宽度值,行高)=>{
    const 项们 = [
        ['#FF7E7E','居住 5'],
        ['#FFB57E','短居 4'],
        ['#FFE57E','游玩 3'],
        ['#A8FFBE','出差 2'],
        ['#88AEFF','路过 1'],
        ['#FFF','没去过']
    ];
    const 背景 = 项们.map((项,下标)=>`<path fill="${项[零]}" d="M${左} ${上 + 行高 * 下标}h${宽度值}v${行高}H${左}Z"/>`).join('');
    const 文字 = 项们.map((项,下标)=>`<text x="${左 + 宽度值 / 二}" y="${上 + 行高 * (下标 + .5)}" text-anchor="middle" dominant-baseline="middle" class="legend-text">${项[1]}</text>`).join('');
    return `${背景}<path class="legend-border" d="M${左} ${上}h${宽度值}v${行高 * 项们.length}H${左}Z"/>${文字}`;
};
const 生成导出SVG = async _=>{
    const 字体 = await 读取字体数据地址();
    const 字体规则 = 字体 ? `@font-face{font-family:'字体';src:url(${字体}) format('woff2');}` : '';
    const 背景 = 背景色;
    const 文字 = '#111';
    const 地图文字 = 文字;
    const 地图线 = 文字;
    const 省线 = 地图线;
    const 未去过 = '#FFF';
    const 三沙颜色 = 获取等级颜色($(`[data-code="${三沙代码}"]`,地区));
    const 地图盒 = 获取合并盒(获取导出主地图元素们());
    const 地图目标 = {左:100,上:98,宽:3000,高:2204};
    const 地图宽 = 地图盒.右 - 地图盒.左;
    const 地图高 = 地图盒.下 - 地图盒.上;
    const 地图比例 = 数学[最小](地图目标.宽 / 地图宽,地图目标.高 / 地图高);
    const 地图左 = 地图目标.左 + (地图目标.宽 - 地图宽 * 地图比例) / 二 - 地图盒.左 * 地图比例;
    const 地图上 = 地图目标.上 + (地图目标.高 - 地图高 * 地图比例) / 二 - 地图盒.上 * 地图比例;
    const 裁剪边距 = 3;
    const 裁剪左 = 地图盒.左 - 裁剪边距;
    const 裁剪上 = 地图盒.上 - 裁剪边距;
    const 裁剪宽 = 地图宽 + 裁剪边距 * 二;
    const 裁剪高 = 地图高 + 裁剪边距 * 二;
    const 地区副本 = 克隆SVG组('#地区',克隆=>{
        const 三沙 = 克隆.querySelector(`[data-code="${三沙代码}"]`);
        if(三沙) 三沙.remove();
    });
    const 地图组 = `<g transform="translate(${格式化数字(地图左)} ${格式化数字(地图上)}) scale(${格式化数字(地图比例)})"><g clip-path="url(#export-map-clip)">${地区副本}${克隆SVG组('#省界')}</g></g>`;
    const 当前分数 = (分数显示元素[肉] || '分数: 0').replace(/\s+/g,' ');
    return `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${导出宽} ${导出高}" width="${导出宽}" height="${导出高}">
<defs><clipPath id="export-map-clip"><rect x="${格式化数字(裁剪左)}" y="${格式化数字(裁剪上)}" width="${格式化数字(裁剪宽)}" height="${格式化数字(裁剪高)}"/></clipPath></defs>
<style>
${字体规则}
text{font-family:'字体',sans-serif;fill:${文字};}
#export-title{font-size:132px;}
#export-score{font-size:84px;}
#export-domain,#export-credit{font-size:56px;}
.legend-text{font-size:56px;fill:#111;}
#地区 path{fill:${未去过};fill-rule:evenodd;clip-rule:evenodd;stroke:${地图线};stroke-width:1.4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;}
#地区 path[level="5"]{fill:#FF7E7E;}
#地区 path[level="4"]{fill:#FFB57E;}
#地区 path[level="3"]{fill:#FFE57E;}
#地区 path[level="2"]{fill:#A8FFBE;}
#地区 path[level="1"]{fill:#88AEFF;}
#省界 path{fill:none;stroke:${省线};stroke-width:3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;}
#export-sansha{fill:${三沙颜色};stroke:${地图线};stroke-width:1.5;}
#export-sansha-label{font-size:40px;}
.legend-border{fill:none;stroke:${地图线};stroke-width:8;stroke-linejoin:round;}
</style>
<rect width="${导出宽}" height="${导出高}" fill="${背景}"/>
<text x="${导出宽 / 二}" y="220" text-anchor="middle" id="export-title">中国地级制霸</text>
${地图组}
<ellipse id="export-sansha" cx="1997" cy="2262" rx="37" ry="34"/>
<text x="2060" y="2283" id="export-sansha-label">三沙市</text>
<g id="export-legend">${生成图例(2692,1458,408,133.333)}</g>
<text x="150" y="2070" id="export-domain">lab.f1justin.com</text>
<text x="151" y="2150" id="export-credit">Credit:神奇海螺</text>
<text x="140" y="2250" id="export-score">${当前分数}</text>
</svg>`;
};
const 保存图像 = async _=>{
    如何做爱元素[设置属性](运行中属性,真);
    画板[宽度] = 导出宽;
    画板[高度] = 导出高;
    const 文档文本 = await 生成导出SVG();
    const 数据地址 = 从文档文本新建图形文件(文档文本);

    地址变图像元素(数据地址,图=>{
        上下文.fillStyle = 背景色;
        上下文.fillRect(
            零,零,
            导出宽,导出高
        );
        上下文.drawImage(
            图,
            零,零,
            导出宽,导出高
        );
        画板.toBlob(元素数据=>{
            const 地址 = 统一资源定位[新建数据地址](元素数据);
            输出图片[源] = 地址;
            输出样式[展示] = 空字;

            设置延时(_=>{
                下载文件(地址,保存文件名);
                如何做爱元素[清除属性](运行中属性);
            },50)
        });
    });
};

添加事件监控(保存,点击,保存图像);

添加事件监控($(啊,输出),点击,_=>{
    输出样式[展示] = 无
});
