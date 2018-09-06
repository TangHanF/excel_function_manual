Vue.component("form-field", {
    props: ['value', 'elestyle', 'selected']

    , computed: {
        selected_model: function () {
            return this.selected;
        }
    }
    , template: `
    <form class="form-inline has-success">
                <div class="form-group">
                    <input 
                        v-bind:value="value"
                        v-on:input="$emit('input',$event.target.value)"  
                        type="text" 
                        class="form-control" 
                        id="exampleInputName2"
                        placeholder="请输入搜索内容..." 
                        data-toggle="tooltip" 
                        data-placement="bottom" 
                        title="输入要搜索的内容">
                </div>
                <button type="button" class="btn btn-primary" @click="$emit('clear-search')">清空
                </button>

                <label style="padding-left: 40px" for="selectStyle">风格类型选择</label>
                <select v-model="selected_model" id="selectStyle" @change="$emit('select-change',$event)" class="form-control">
                    <option v-for="(obj,index) in elestyle" :value="obj.value">{{obj.name}}</option>
                </select>
            </form>
    `
});


Vue.component("page-footer", {
    template: `
    <div class="jumbotron">
    <p>欢迎使用</p>
    <h1>Excel公式与函数帮助手册</h1>
    <p>欢迎各位Star、Fork进行完善。时间有限，没做细致优化，有意向者可以一起完善</p>
    <p>对外发布、提供服务请保留项目地址，谢谢合作！</p>
    <strong class="text-danger">移动端访问时如果弹窗之后无法显示全部，请关闭弹窗再次打开（后续优化，提高兼容性）</strong>

    <p class="text-danger">详情阅读：
        <a href="https://github.com/TangHanF/excel_function_manual/blob/master/README.md" target="_blank">Readme</a>
    </p>
    <hr>
    <blockquote>
        <p><strong>作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;者：</strong>GuoFu</p>
        <p><strong>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</strong>
            <a href="mailto:guofu_gh@163.com" data-toggle="tooltip" data-placement="right" title="有问题欢迎邮件联系">guofu_gh@163.com</a>
        </p>
        <p><strong>创建日期：</strong>2018年09月05日</p>
        <p><strong>GitHub地址：</strong><a href="https://github.com/TangHanF" target="_blank">https://github.com/TangHanF</a>
        </p>
        <p><strong>Gitee地址：</strong><a href="https://gitee.com/TangHanF"
                                       target="_blank">https://gitee.com/TangHanF</a></p>
    </blockquote>
    <hr>
    <h2>本项目可通过以下两个入口进行访问：</h2>
    <p>
        <strong>Gitee入口：</strong>
        <a href="https://tanghanf.gitee.io/excel_function_manual/" target="_blank" data-toggle="tooltip"
           data-placement="right" title="访问速度快">https://tanghanf.gitee.io/excel_function_manual/</a>
    </p>
    <p>
        <strong>Github入口：</strong>
        <a href="https://tanghanf.github.io/excel_function_manual/" target="_blank" data-toggle="tooltip"
           data-placement="right" title="访问速度稍慢">https://tanghanf.github.io/excel_function_manual/</a>
    </p>

    <p>
        <a class="btn btn-primary btn-lg" href="https://github.com/TangHanF/excel_function_manual" target="_blank"
           role="button">本项目GitHub地址</a>
        <a class="btn btn-primary btn-lg" href="https://gitee.com/TangHanF/excel_function_manual" target="_blank"
           role="button">本项目Gitee地址</a>
    </p>
</div>
    `
})


// 插槽
Vue.component('alert-box', {
    template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})

