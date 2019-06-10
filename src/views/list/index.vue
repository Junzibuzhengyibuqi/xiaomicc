<template>
  <div class="app-container">
    <el-tag
      style="margin-bottom:20px;width:100px;text-align:center;height:35px"
      v-if="!filg"
      @click="newzeng"
    >新增</el-tag>

    <!-- <input
      v-if="!filg"
      type="text"
      style="border:1px solid cornflowerblue;margin-left:10px;height:25px;
      font-size:12px"
      placeholder="请输入您需要搜索的内容..."
      @keydown.enter="seche"
      v-model="txt"
    >-->
    <el-input
      v-if="!filg"
      type="text"
      style="margin-left:20px;width:200px;position: relative;right:-68%"
      placeholder="请输入您需要搜索的内容..."
      @keydown.enter="seche"
      v-model="txt"
    ></el-input>
    <el-button
    v-if="!filg"
      type="primary"
      @click="seche"
      style="height:35px;width:70px ;position: relative;right:-68.5%;top:1px"
    >查询</el-button>
    <br>
    <div v-if="filg" class="ipt" style="width:100%">
      <h2 style="margin-right:200px;margin-bottom:30px">商品新增：</h2>
      <el-tag style="position: absolute; right:70px;top:45px" @click="fanhui">返回</el-tag>
      <p>商品名称：</p>
      <input type="text" v-model="params.name" placeholder="请输入商品名称...">
      <p>商品图片：</p>
      <el-upload
        class="avataruploader"
        action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" style="margin-left:200px">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p>商品详情：</p>
      <input type="text" v-model="params.descriptions" placeholder="请输入商品介绍...">
      <p>商品价格：</p>
      <input type="text" v-model="params.price" placeholder="请输入商品单价...">
      <p>商品库存：</p>
      <input type="text" v-model="params.quantity" placeholder="请输入商品剩余数量...">
      <button
        v-if="!filge"
        style="width:120px;
        height:30px;
        color: blue;
        margin-left:40%;
        margin-top:20px;
        border: 1px solid cornflowerblue"
        @click="setAdd"
      >增添</button>
      <button
        v-if="filge"
        style="width:120px;
        height:30px;
        color: blue;
        margin-left:40%;
        margin-top:20px;
        border: 1px solid cornflowerblue"
        @click="setChange"
      >修改</button>
    </div>
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

      <el-table-column class-name="status-col" label="商品单价" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="商品库存" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.quantity }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="130" align="center">
        <template slot-scope="scope">
          <el-tag style="float:left " @click="sete(scope.row._id)">修改</el-tag>
          <el-tag style="float:right;background:pink; color:red" @click="dele(scope.row._id)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>

    <div id="app" v-if="!filg">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="zshu"
        :current-page="pag"
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
import {
  getList,
  getdele,
  getadd,
  getId,
  getChange,
  getCx
} from '../../api/list'
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
    //获取完整的Url

    seturl(url) {
      return basUrl + url
    }
  },
  data() {
    return {
      id: '',
      imageUrl: '',
      list: null,
      txt: '',
      listLoading: true,
      pag: 1,
      zshu: 1,
      filg: false,
      filge: false,
      params: {
        descriptions: '',
        quantity: '',
        price: '',
        name: '',
        coverImg: ''
      }
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    fanhui() {
      this.filg = false
      this.filge = false
    },
    newzeng() {
      this.filg = !this.filg
      this.params = {}
      this.imageUrl = ''
    },
    //进行模糊搜索

    seche() {
      console.log(12)
      getCx(this.txt).then(response => {
        this.zshu = response.totalCount
        this.list = response.products
        this.listLoading = false
        // this.zshu = 0
        // var arr = []
        // arr.push(response)
        // ;(this.list = arr), (this.listLoading = false)
      })
    },

    //新增商品
    setAdd() {
      console.log(this.params.name)
      if (this.params.name && this.imageUrl) {
        this.filg = false
        this.filge = false
        getadd(this.params).then(res => {
          this.fetchData()
        })
      } else {
        this.$message.error('请按照要求输入完整的数据...')
      }
      // if (
      //   this.params.descriptions === '' ||
      //   this.params.quantity === '' ||
      //   this.params.price === '' ||
      //   this.params.name === '' ||
      //   this.imageUrl === '' ||
      //   this.coverImg === ''
      // ) {
      //   this.$message.error('请按照要求输入完整的数据...')
      // } else {
      //   this.filg = false
      //   this.filge = false
      //   getadd(this.params).then(res => {
      //     this.fetchData()
      //   })
      // }
    },
    //展示商品信息
    fetchData() {
      getList(this.pag).then(response => {
        this.zshu = response.totalCount
        ;(this.list = response.products), (this.listLoading = false)
      })
    },
    //分页展示商品列表
    handleCurrentChange(total) {
      this.pag = total
      this.fetchData()
    },
    //修改商品信息给予页面展示
    sete(v) {
      console.log(v)
      this.id = v
      getId(v).then(response => {
        this.params.descriptions = response.descriptions
        this.params.quantity = response.quantity
        this.params.price = response.price
        this.params.name = response.name
        this.params.coverImg = response.coverImg
        this.filg = true
        this.filge = true
        this.imageUrl = basUrl + response.coverImg
        //console.log(this.params.coverImg)
      })
    },
    //修改商品信息
    setChange() {
      if (
        this.params.descriptions === '' ||
        this.params.quantity === '' ||
        this.params.price === '' ||
        this.params.name === '' ||
        this.imageUrl === ''
      ) {
        this.$message.error('请按照要求输入完整的数据...')
      } else {
        this.filg = false
        this.filge = false
        getChange(this.params, this.id).then(res => {
          this.fetchData()
        })
      }
    },

    //删除商品信息
    dele(v) {
      this.$confirm('此操作将永久删除该项商品数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          getdele(v).then(res => {
            this.$message({
              message: '已删除',
              type: 'success'
            })
            this.fetchData()
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

    //商品图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.params.coverImg = res.info
      this
    }
  }
}
</script>

<style scoped>
.ipt input {
  display: block;
  margin: 0 0 20px 130px;
  width: 70%;
  height: 30px;
}
.ipt p {
  color: cornflowerblue;
  margin-left: 50px;
}
.avataruploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  margin-left: 120px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
