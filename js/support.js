let app;
let app2;

app2 = new Vue({
    el: "#app2",
    data: {
        iframeSrc: "",
    }
});

(function () {
    $(function () {
        //数组去重
        function dedupe(array) {
            return Array.from(new Set(array));
        }//设置iframe高度函数

        layui.use(["layer", "util"], function () {
            let util = layui.util;
            util.fixbar({});
            let searchFunNameJsonData = $.parseJSON(nav);
            let searchDesJsonData = $.parseJSON(search_name_json);

            app = new Vue({
                el: "#app"
                , data: {
                    jsonData: searchFunNameJsonData,
                    tmpJsonData: [],
                    keyword: "",//搜索框的搜索关键字
                    isShow: true,
                    currentStyleName: '',//当前风格名称
                    style: [
                        {name: '风格1', value: 'index.html'},
                        {name: '风格2', value: 'index2.html'}
                    ],
                    currentSelected: 'index2.html',
                    iframeSrc: "",
                    renderIframeXiangxiFlagArr: {},
                    panel: 'panel',
                    panelStyle: ['panel-primary', 'panel-success', 'panel-info', 'panel-warning', 'panel-danger'],
                }
                , methods: {
                    itemClick: function (href, e) {
                        app2.iframeSrc = "";//赋空值，避免重复打开一个URL导致更新不及时问题
                        app2.iframeSrc = href;
                        console.log(href);
                        $("#myModal").modal({})
                    },
                    itemClick2: function (href, e) {
                        //由于 JavaScript 的限制，Vue 不能检测对象属性的添加、删除、更新，可使用Vue.set进行更新
                        Vue.set(app.renderIframeXiangxiFlagArr, href, true);
                        console.log(href);
                    },
                    // 生成随机样式
                    randomPanelClass: function () {
                        return this.panelStyle[Math.floor(Math.random() * this.panelStyle.length)];
                    },
                    selectChange: function (ele) {
                        let selected = ele.target.value;
                        this.currentStyleName=selected;
                        window.location.href = selected;
                    }
                }
                , watch: {
                    keyword: function (newKeyword, oldKeyword) {
                        if ($.trim(newKeyword) === "") {
                            this.isShow = true;
                        } else {
                            this.isShow = false;
                        }
                        //匹配函数名搜索
                        const tmpObj = [];
                        $.each(searchFunNameJsonData.topics, function (key, obj) {
                            if (obj.name.toLowerCase().indexOf(newKeyword) != -1) {
                                tmpObj.push(obj);
                            }
                        });

                        //匹配描述搜索
                        let searchDesObj = searchDesJsonData[newKeyword];
                        if (searchDesObj) {
                            $.each(searchDesObj, function (key, val) {
                                tmpObj.push(searchFunNameJsonData.topics[key]);
                            })
                        }
                        this.tmpJsonData = dedupe(tmpObj);
                    }
                }
                , mounted: function () {
                    this.currentSelected = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
                    console.log("===:" + this.currentSelected)
                    $("[data-toggle='tooltip']").tooltip();
                }
            })
        });
    })
})();