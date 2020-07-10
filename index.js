// 1、下载安装node环境  去官网下载  一直下一步进行安装 
// windows+r  打开之后输入 cmd  按回车
// 2、检查node是否安装成功    node -v 按回车
// 3、进入到mock文件夹内打开命令行   输入 node server.js  按回车

// 检查IP   命令  ipconfig  

/**
 * 事件流讲解1：
 *  事件流分为两种，是浏览器的默认行为
 *  1、事件捕获
 *      事件捕获是从外到内进行传播
 *  2、事件冒泡
 *      事件冒泡是从内到外进行传播
 */

//  今天的作业：
//     1、原生JS实现分页
//     2、记住新属性
//     3、复习JS的执行过程  百度 先有概念  详细


/**
         * 分页解析：
         *  1、每页5条数据，每页数据量必须《=5  ，也必须 》=1
         *  2、根据数据的多少进行分页  总数据 <= size * num，size：每页数据多少  num：就是页数
         *  3、上一页按钮功能  下一页按钮功能  页码本身的功能
         *  4、边界控制   如果到第一页的数据时，则不能再继续点击上一页按钮的功能 ，下一页同理
        */
/**
 * 分页的优点：
 *   减轻后台服务器压力，提高网页的加载性能(性能优化)
 *   then():数据请求成功的函数，拿到了数据
 *   catch():请求数据失败的函数，没有拿到数据
 * 
 *   url地址栏里面  ？后面的数据或者字符串等等都不参与页面跳转，不是真正的路径 url
 *   只是为了和后台进行数据交互进行分页等功能的区分而已
*/

/**
 * == 和 === 的区别   
 */

// 页数*每页数据 >= 总数据

// 页码功能实现
var pageSize = document.getElementsByClassName('page-size')[0];
var num = 1;
// 初始化第一页先获取到数据
sortData(num);
// 事件监听，要进行事件委托，让pageSize帮助其子元素完成点击事件
pageSize.addEventListener('click', e => {
    // 动态改变num的值，使我们点击页码是哪个就穿哪个的页码值
    num = e.target.innerText;
    sortData(num);
});
// 下一页功能
var nextBtn = document.getElementsByClassName('next')[0];
nextBtn.onclick = function () {
    var ls = pageSize.lastElementChild;
    if (num >= Number(ls.innerText)) {
        num = Number(ls.innerText);
        sortData(num);
    } else {
        num++;
        // console.log(num, '===')
        sortData(num);
    }
}
// 上一页功能
var prveBtn = document.getElementsByClassName('prve')[0];
prveBtn.onclick = function () {
    if (num <= 1) {
        num = 1;
        sortData(num);
    } else {
        num--;
        console.log(num, '===')
        sortData(num);
    }
}
// 获取后台数据并实现动态渲染到页面上
function sortData(page) {
    axios.get('http://localhost:3001/page?page='+ page)
        .then(res => {
            console.log(res)
            var list = res.data.glist;
            var totalNum = res.data.totleNum;
            var tbody = document.getElementsByTagName('tbody')[0];
            var pageSize = document.getElementsByClassName('page-size')[0];
            tbody.innerHTML = '';
            pageSize.innerHTML = '';
            // 分页按钮功能实现  页数应该等于循环的数据长度 
            var index = 0; //从1开始渲染                 
            for (var i = 0; i < Math.ceil(totalNum / 5); i++) {
                var span = document.createElement('span');
                index++;
                span.className = 'num';
                span.innerText = index;
                pageSize.appendChild(span)
            }
            // 内容区域实现
            for (var i = 0; i < list.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<tr>'
                    + '<td>' + list[i].id + '</td>'
                    + '<td>'
                    + '<img src="' + list[i].goodimg + '"/></td>'
                    + '<td>' + list[i].goodname + '</td>'
                    + '<td>' + '￥' + list[i].price + '</td>'
                    + '<td>' + list[i].info + '</td>'
                    + '</tr>';
                tbody.appendChild(tr);
            }
        })
        .catch(error => {
            console.log(error)
        })
}

