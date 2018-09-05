
let app;
(function () {
    $(function () {
        layui.use(["layer", "util"], function () {
            let util = layui.util;
            util.fixbar({});
            let jsonData = $.parseJSON(nav);
            app = new Vue({
                el: "#app"
                , data: {
                    jsonData: jsonData,
                    tmpJsonData: [],
                    keyword: "",
                    isShow: true,
                    panel: 'panel',
                    panelStyle: ['panel-primary', 'panel-success', 'panel-info', 'panel-warning', 'panel-danger'],
                }
                , methods: {
                    itemClick: function (href, e) {
                        let layer = layui.layer;
                        layer.open({
                            type: 2,
                            title: e.target.text + '函数说明',
                            anim: 0,
                            shadeClose: true,
                            resize: false,
                            area: ['800px', '700px'],
                            btn: ['确定'],
                            yes: function (index, layero) {
                                layer.close(index);
                            },
                            content: 'pages/excel/' + href
                        });
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
                        const tmpObj = [];
                        $.each(jsonData.topics, function (key, obj) {
                            if (obj.name.toLowerCase().indexOf(newKeyword) != -1) {
                                tmpObj.push(obj);
                            }
                        })
                        this.tmpJsonData = tmpObj;
                    }
                }
                , mounted: function () {
                    $("[data-toggle='tooltip']").tooltip();
                }
            })
        });
    })
})();