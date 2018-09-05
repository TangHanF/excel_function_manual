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
        function dedupe(array){
            return Array.from(new Set(array));
        }

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
                    keyword: "",
                    isShow: true,
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
                    // 生成随机样式
                    randomPanelClass: function () {
                        return this.panelStyle[Math.floor(Math.random() * this.panelStyle.length)];
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
                    $("[data-toggle='tooltip']").tooltip();
                }
            })
        });
    })
})();