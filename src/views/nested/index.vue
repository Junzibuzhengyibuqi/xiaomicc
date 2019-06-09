<template>
  <div>
    <template>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="订单号">
          <el-input v-model="formInline.order" placeholder="订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </template>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column align="center" prop="_id" label="id" width="220"></el-table-column>
      <el-table-column align="center" prop="receiver" label="用户名" width="90"></el-table-column>
      <el-table-column align="center" prop="no" label="订单号" width="155"></el-table-column>
      <el-table-column align="center" prop="createdAt" label="时间" width="220"></el-table-column>
      <el-table-column align="center" prop="address" label="地址" min-width="140"></el-table-column>
      <el-table-column align="center" prop="price" label="价格" width="100"></el-table-column>
      <el-table-column align="center" label="是否已支付" width="100">
        <template slot-scope="scope">{{scope.row.isPayed?'是':'否'}}</template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteInf(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fenye"
      background
      layout="prev, pager, next"
      :total="value"
      @current-change="haddleChange"
    ></el-pagination>
  </div>
</template>


<script>
import { getOrder, changeOrder, deleteOrder } from '../../api/order'

export default {
  created() {
    this.foo()
  },
  methods: {
    // 根据id修改订单支付信息
    change(row) {
      this.$prompt(
        '请输入需要修改支付状态      true(已支付)/false(未支付)',
        '修改订单支付状态',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }
      )
        .then(({ value }) => {
          if (value === 'true' || value === 'false') {
            changeOrder(row._id, value).then(res => {
              if (this.formInline.order.length > 0) {
                this.onSubmit()
              } else {
                this.foo()
              }
            })
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          } else {
            this.$message({
              type: 'info',
              message: '请输入有效值'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    //删除订单信息
    deleteInf(row) {
      this.$confirm('此操作将永久删除该项订单数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrder(row._id).then(res => {
            if (this.formInline.order.length > 0) {
              this.onSubmit()
            } else {
              this.foo()
            }
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取所有订单信息
    foo() {
      getOrder({ per: 10, page: this.currentPage }).then(res => {
        this.tableData = res.orders
        this.value = res.totalCount
      })
    },
    // 依据订单id号搜索订单信息
    onSubmit() {
      getOrder({ no: this.formInline.order }).then(res => {
        if (res.totalCount > 0) {
          this.tableData = res.orders
          this.value = res.totalCount
        } else {
          this.tableData = null
          this.value = 0
        }
      })
    },
    //分页功能
    haddleChange(total) {
      this.currentPage = total
      if (this.formInline.order.length === 0) {
        this.foo()
      } else {
        // this.currentPage = total
        getOrder({ no: this.formInline.order, page: this.currentPage }).then(
          res => {
            this.tableData = res.orders
          }
        )
      }
    }
  },
  data() {
    return {
      tableData: null,
      input: '',
      value: 0,
      currentPage: 1,
      formInline: {
        order: ''
      }
    }
  }
}
</script>
<style>
.demo-form-inline {
  margin: 20px 0 0 20px;
}
.fenye {
  text-align: center;
}
</style>
