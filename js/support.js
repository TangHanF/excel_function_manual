let app;
let app2;


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
            app2 = new Vue({
                el: "#app2",
                data: {
                    iframeSrc: ""
                }
            });
            app = new Vue({
                el: "#app"
                , data: {
                    jsonData: searchFunNameJsonData
                    , tmpJsonData: []
                    , keyword: ""//搜索框的搜索关键字
                    , isShow: true
                    , currentStyleName: ''//当前风格名称
                    , pagestyle: [
                        {name: '详情折叠式', value: 'index.html'}
                        , {name: '详情弹窗式', value: 'index2.html'}
                        , {name: '详情分栏式', value: 'index3.html'}
                    ]
                    , currentSelected: 'index.html'
                    , iframeSrc: ""
                    , renderIframeXiangxiFlagArr: {}
                    , panel: 'panel'
                    , panelStyle: ['panel-primary', 'panel-success', 'panel-info', 'panel-warning', 'panel-danger']
                    , sectionsChildren: []
                }
                , methods: {
                    itemClick: function (href, e) {
                        app2.iframeSrc = "";//赋空值，避免重复打开一个URL导致更新不及时问题
                        app2.iframeSrc = href;
                        console.log(href);
                        $("#myModal").modal({})
                    }
                    , itemClick2: function (href, e) {
                        //由于 JavaScript 的限制，Vue 不能检测对象属性的添加、删除、更新，可使用Vue.set进行更新
                        Vue.set(app.renderIframeXiangxiFlagArr, href, true);
                        console.log(href);
                    }
                    // 生成随机样式
                    , randomPanelClass: function () {
                        return this.panelStyle[Math.floor(Math.random() * this.panelStyle.length)];
                    }
                    , selectChange: function (ele) {
                        let selected = ele.target.value;
                        app.currentStyleName = selected;
                        window.location.href = selected;
                    }
                    , getDes: function (data) {
                        return data.substr(data.indexOf(")") + 1);

                    }
                    , getFormat: function (data) {
                        return data.substr(0, data.indexOf(")") + 1);

                    }
                    , style3LinkClick: function (key) {
                        app.sectionsChildren = [];
                        // 获取当前点击的一级分类下的二级分类集合
                        let second = searchFunNameJsonData.sections[key].children;
                        $.each(second, function (index, childrenKey) {
                            // 获取childrenKey所对应的描述信息
                            let topics = searchFunNameJsonData.topics[childrenKey];
                            // 由于 JavaScript 的限制，Vue 不能检测以下变动的数组,可使用Vue.set进行更新
                            Vue.set(app.sectionsChildren, index, topics);
                        })
                    }
                    , style3SecondLinkClick: function (href) {
                        app.iframeSrc = 'pages/excel/' + href;
                    }
                },
                computed: {
                    //根据当前url计算当前风格样式
                    getCurrentStyle: function () {
                        let res = '';
                        let page = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
                        $.each(this.pagestyle, function (index, obj) {
                            if (obj.value && page && page.indexOf(obj.value) != -1) {
                                res = obj.name;
                                return;
                            }
                        });
                        return res;
                    }
                }
                , watch: {
                    // 对搜索框输入的内容进行实时搜索
                    keyword: function (newKeyword, oldKeyword) {
                        if ($.trim(newKeyword) === "") {
                            this.isShow = true;
                        } else {
                            this.isShow = false;
                        }
                        //匹配函数名搜索
                        let tmpObj = [];
                        let index = 0;
                        app.sectionsChildren=[];
                        $.each(searchFunNameJsonData.topics, function (key, obj) {
                            if (obj.name.toLowerCase().indexOf(newKeyword) != -1) {
                                tmpObj.push(obj);
                                Vue.set(app.sectionsChildren, index, obj);
                                index++;
                            }
                        });

                        //匹配描述搜索
                        let searchDesObj = searchDesJsonData[newKeyword];
                        if (searchDesObj) {
                            index = 0;
                            $.each(searchDesObj, function (key, val) {
                                // debugger
                                tmpObj.push(searchFunNameJsonData.topics[key]);
                                Vue.set(app.sectionsChildren, index, searchFunNameJsonData.topics[key]);
                                index++;
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
                , updated: function () {
                    $("[data-toggle='tooltip']").tooltip();
                }

            })
        });
    })
})();