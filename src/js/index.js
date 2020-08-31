import $ from './lib/jquery.js'; //jquery
import './lib/jquery.lazyload.js'; //懒加载插件
$("img.lazy").lazyload({
    placeholder: "../images/timg.gif", //用图片提前占位
    effect: "fadeIn", // 载入使用何种效果
});
// console.log($);