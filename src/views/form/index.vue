<template>
  <div class="app-container">
    <el-tag style="margin-bottom:20px;width:100px;text-align:center" @click="filg = !filg">新增</el-tag>
    <br>
    <el-tag v-if="filg" style="margin-bottom:30px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleFormPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleFormPheckPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleFormAge"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-tag>
    <el-table
      v-if="!filg"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">{{ scope.$index +1 }}</template>
      </el-table-column>
      <el-table-column label="商品名称" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>

      <el-table-column label="商品图片" width="110" align="center">
        <template slot-scope="scope">
          <img style="max-height:50px" :src="scope.row.coverImg | seturl" alt>
        </template>
      </el-table-column>
      <el-table-column label="商品详情" align="center">
        <template slot-scope="scope">{{ scope.row.descriptions }}</template>
      </el-table-column>

      <el-table-column class-name="status-col" label="单价" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="库存" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-tag style="float:left ">修改</el-tag>
          <el-tag style="float:right;background:pink; color:red" @click="dele(scope.row._id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div id="app" v-if="!filg">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="zshu"
        @current-change="handleCurrentChange"
        style="display:flex;justify-content: center;margin-top:20px"
        ref="pagination"
      ></el-pagination>
    </div>
  </div>
</template>
<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.9.1/lib/index.js"></script>
<script>
import { getList, setdele, getdele } from '../../api/list'
import { basUrl } from '../../utils/conglfg'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    seturl(url) {
      return basUrl + url
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      pag: 1,
      zshu: 1,
      filg: false,
      ruleFormPass: '',
      ruleFormPheckPass: '',
      ruleFormAge: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange() {
      console.log(this.$refs.pagination.internalCurrentPage)
      this.pag = this.$refs.pagination.internalCurrentPage
      this.fetchData()
    },

    fetchData() {
      getList(this.pag).then(response => {
        this.zshu = response.totalCount
        ;(this.list = response.products), (this.listLoading = false)
      })
    },
    dele(v) {
      console.log(this.list.length)
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i]._id == v) {
          this.list.splice(i, 1)
        }
      }
      this.fetchData()
    }
  }
}
</script>

