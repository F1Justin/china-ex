const { readFileSync, writeFileSync, existsSync } = require('fs');
const { join } = require('path');

const 宽 = 1134;
const 高 = 976;

const 地图 = {
    x: 32,
    y: 138,
    width: 918,
    height: 730
};

const 直辖和港澳台 = new Set([
    110000,
    120000,
    310000,
    500000,
    710000,
    810000,
    820000
]);

const 读JSON = 文件 => JSON.parse(readFileSync(文件, 'utf8'));
const 数据目录 = 'data';
const 全国 = 读JSON(join(数据目录, '100000_full.json'));

const 是数字代码 = 代码 => Number.isFinite(Number(代码));
const 是地级代码 = 代码 => Number(代码) % 100 === 0;

const 区域们 = [];

全国.features.forEach(要素 => {
    const 代码 = Number(要素.properties.adcode);
    if (!是数字代码(要素.properties.adcode)) return;

    if (直辖和港澳台.has(代码)) {
        区域们.push({
            ...要素,
            properties: {
                ...要素.properties,
                parentName: 要素.properties.name,
                parentAdcode: 代码
            }
        });
        return;
    }

    const 文件 = join(数据目录, `${代码}_full.json`);
    if (!existsSync(文件)) {
        throw new Error(`缺少边界数据：${文件}`);
    }

    const 省 = 读JSON(文件);
    const 地级集 = new Set(省.features.filter(子要素 => 是地级代码(子要素.properties.adcode)).map(f => String(f.properties.adcode).substring(0, 4)));
    省.features
        .filter(子要素 => 是地级代码(子要素.properties.adcode) || !地级集.has(String(子要素.properties.adcode).substring(0, 4)))
        .forEach(子要素 => {
            区域们.push({
                ...子要素,
                properties: {
                    ...子要素.properties,
                    parentName: 要素.properties.name,
                    parentAdcode: 代码
                }
            });
        });
});

const 南海诸岛 = 全国.features.find(要素 => 要素.properties.adcode === '100000_JD');

const 转义 = 值 => String(值)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const 格式化 = 数值 => {
    const 文本 = 数值.toFixed(2);
    return 文本.replace(/\.?0+$/, '');
};

const 墨卡托 = 坐标 => {
    const 经度 = 坐标[0] * Math.PI / 180;
    const 纬度 = Math.max(-85, Math.min(85, 坐标[1])) * Math.PI / 180;
    return [
        经度,
        Math.log(Math.tan(Math.PI / 4 + 纬度 / 2))
    ];
};

const 遍历坐标 = (几何, 回调) => {
    if (!几何) return;
    if (几何.type === 'Polygon') {
        几何.coordinates.forEach(环 => 环.forEach(回调));
        return;
    }
    if (几何.type === 'MultiPolygon') {
        几何.coordinates.forEach(面 => 面.forEach(环 => 环.forEach(回调)));
        return;
    }
    if (几何.type === 'LineString') {
        几何.coordinates.forEach(回调);
        return;
    }
    if (几何.type === 'MultiLineString') {
        几何.coordinates.forEach(线 => 线.forEach(回调));
    }
};

const 投影坐标们 = [];
[...区域们, 南海诸岛].filter(Boolean).forEach(要素 => {
    遍历坐标(要素.geometry, 坐标 => 投影坐标们.push(墨卡托(坐标)));
});

const 边界 = 投影坐标们.reduce((结果, 坐标) => {
    return [
        Math.min(结果[0], 坐标[0]),
        Math.min(结果[1], 坐标[1]),
        Math.max(结果[2], 坐标[0]),
        Math.max(结果[3], 坐标[1])
    ];
}, [Infinity, Infinity, -Infinity, -Infinity]);

const 比例 = Math.min(
    地图.width / (边界[2] - 边界[0]),
    地图.height / (边界[3] - 边界[1])
);
const 偏移X = 地图.x + (地图.width - (边界[2] - 边界[0]) * 比例) / 2;
const 偏移Y = 地图.y + (地图.height - (边界[3] - 边界[1]) * 比例) / 2;

const 投影 = 坐标 => {
    const 点 = 墨卡托(坐标);
    return [
        偏移X + (点[0] - 边界[0]) * 比例,
        偏移Y + (边界[3] - 点[1]) * 比例
    ];
};

const 环转路径 = 环 => {
    if (!环.length) return '';
    return 环.map((坐标, 下标) => {
        const 点 = 投影(坐标);
        return `${下标 ? 'L' : 'M'}${格式化(点[0])} ${格式化(点[1])}`;
    }).join('') + 'Z';
};

const 几何转路径 = 几何 => {
    if (!几何) return '';
    if (几何.type === 'Polygon') {
        return 几何.coordinates.map(环转路径).join('');
    }
    if (几何.type === 'MultiPolygon') {
        return 几何.coordinates
            .map(面 => 面.map(环转路径).join(''))
            .join('');
    }
    if (几何.type === 'LineString') {
        return 几何.coordinates.map((坐标, 下标) => {
            const 点 = 投影(坐标);
            return `${下标 ? 'L' : 'M'}${格式化(点[0])} ${格式化(点[1])}`;
        }).join('');
    }
    if (几何.type === 'MultiLineString') {
        return 几何.coordinates.map(线 => 线.map((坐标, 下标) => {
            const 点 = 投影(坐标);
            return `${下标 ? 'L' : 'M'}${格式化(点[0])} ${格式化(点[1])}`;
        }).join('')).join('');
    }
    return '';
};

const 区域路径 = 区域们.map(要素 => {
    const 属性 = 要素.properties;
    const 代码 = Number(属性.adcode);
    const 名称 = 属性.name;
    const 父级 = 属性.parentName || '';
    const 路径 = 几何转路径(要素.geometry);
    return `\t<path id="地区-${代码}" data-code="${代码}" data-name="${转义(名称)}" data-parent="${转义(父级)}" d="${路径}"><title>${转义(父级 ? `${父级} · ${名称}` : 名称)}</title></path>`;
}).join('\n');
const 省界路径 = 全国.features
    .filter(要素 => 是数字代码(要素.properties.adcode) && Number(要素.properties.adcode) < 710000)
    .map(要素 => `\t<path d="${几何转路径(要素.geometry)}"/>`)
    .join('\n');

const 南海路径 = 南海诸岛 ? `\t<path d="${几何转路径(南海诸岛.geometry)}"/>` : '';

const SVG = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${宽} ${高}" preserveAspectRatio="xMidYMid meet">
<style></style>
<style>
text{
    font-family:'字体',sans-serif;
    fill:#111;
    font-size:24px;
}
#标题{font-size:56px;}
#分数{font-size:42px;}
.fs18{font-size:18px;}
.fs20{font-size:20px;}
#等级 text{fill:#111;}
#等级 text:last-child{fill:#111;}
#等级 path[data-empty]{fill:#FFF;}
#地区 path{
    fill:#FFF;
    fill-rule:evenodd;
    clip-rule:evenodd;
    stroke:#111;
    stroke-width:.65;
    stroke-linecap:round;
    stroke-linejoin:round;
    cursor:pointer;
    pointer-events:auto;
    vector-effect:non-scaling-stroke;
}
#地区 path:hover{
    fill:#F7F7F7;
    stroke-width:1.3;
}
#地区 path[level="5"]{fill:#FF7E7E;}
#地区 path[level="4"]{fill:#FFB57E;}
#地区 path[level="3"]{fill:#FFE57E;}
#地区 path[level="2"]{fill:#A8FFBE;}
#地区 path[level="1"]{fill:#88AEFF;}
#省界 path{
    fill:none;
    stroke:#111;
    stroke-width:1.55;
    stroke-linecap:round;
    stroke-linejoin:round;
    pointer-events:none;
    vector-effect:non-scaling-stroke;
}
#南海诸岛 path{
    fill:none;
    stroke:#111;
    stroke-width:1.2;
    stroke-linecap:round;
    stroke-linejoin:round;
    pointer-events:none;
    vector-effect:non-scaling-stroke;
}
.边框{
    fill:none;
    stroke:#111;
    stroke-width:4;
    stroke-linecap:round;
    stroke-linejoin:round;
}
</style>
<text x="370" y="88" id="标题">中国地级制霸</text>
<g id="地区">
${区域路径}
</g>
<g id="省界">
${省界路径}
</g>
<g id="南海诸岛">
${南海路径}
</g>
<g id="等级">
    <path fill="#FF7E7E" d="M978 402h120v50H978Z"/>
    <path fill="#FFB57E" d="M978 452h120v50H978Z"/>
    <path fill="#FFE57E" d="M978 502h120v50H978Z"/>
    <path fill="#A8FFBE" d="M978 552h120v50H978Z"/>
    <path fill="#88AEFF" d="M978 602h120v50H978Z"/>
    <path data-empty="true" fill="#FFF" d="M978 652h120v50H978Z"/>
    <path class="边框" d="M978 400h120v304H978Z"/>
    <text x="995" y="436">居住５</text>
    <text x="995" y="487">短居４</text>
    <text x="995" y="537">游玩３</text>
    <text x="995" y="587">出差２</text>
    <text x="995" y="637">路过１</text>
    <text x="993" y="687">没去过</text>
</g>
</svg>`;

writeFileSync('china-ex.svg', SVG, 'utf8');
console.log(`生成 ${区域们.length} 个可点击区域`);
