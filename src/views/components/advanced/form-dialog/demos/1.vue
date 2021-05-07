<template>
  <mu-button type="primary" text="打开对话框表单" @click="visible = true"></mu-button>
  <mu-form-dialog v-model="visible" title="添加活动" icon="plus" :action="action" :model="model" :rules="rules" reset-on-closed @closed="handleOpen">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="model.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker v-model="model.date1" type="date" placeholder="选择日期" style="width: 100%"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker v-model="model.date2" placeholder="选择时间" style="width: 100%"></el-time-picker>
      </el-col>
    </el-form-item>
    <template #footer>
      <mu-button type="primary" text="朕是自定义按钮"></mu-button>
    </template>
  </mu-form-dialog>
</template>
<script>
import { reactive, ref } from 'vue'
export default {
  setup() {
    const visible = ref(false)
    const model = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
    })
    const rules = {
      name: [{ required: true, message: '请输入名称' }],
    }

    const action = () => {
      return new Promise(resolve => {
        setTimeout(resolve, 2000)
      })
    }

    const handleOpen = () => {
      console.log('handleOpen')
    }

    return { visible, model, rules, action, handleOpen }
  },
}
</script>
