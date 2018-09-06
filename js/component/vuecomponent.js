Vue.component("form-field", {
    props: ['value', 'elestyle', 'selected']

    ,computed:{
        selected_model:function () {
            return this.selected;
        }
    }
    ,template: `
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

// 插槽
Vue.component('alert-box', {
    template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})

