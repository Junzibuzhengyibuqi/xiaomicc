<template>
  <div>
    <div>
      <el-row style="float:right; padding-right:30px">
        <div style="height:80px;width:500px">
          <el-input
            v-model="inputS"
            placeholder="请输入要查找的用户id"
            style="float:left;width:300px;padding-right:10px"
          ></el-input>
          <el-button type="success" @click="searchGoods(inputS)" style="float:left">查找</el-button>
          <el-button type="primary" @click="addEquipment" style="float:left">新增</el-button>
        </div>
        <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="姓名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" v-if="show">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <!-- <el-input v-model="form.avatar" type="file"></el-input> -->
              <el-upload
                class="avatar-uploader"
                action="http://api.cat-shop.penkuoer.com/api/v1/common/file_upload"
                :show-file-list="true"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageUrl"
                  :src="'https://api.cat-shop.penkuoer.com'+imageUrl"
                  class="avatar"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialog_Visible">确 定</el-button>
          </span>
        </el-dialog>
      </el-row>
      <div style="padding-top:100px">
        <el-table :data="people">
          <el-table-column align="center" label="序号" width="50">
            <template slot-scope="scope">
              <label>{{scope.$index+1}}</label>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="userName" label="姓名" width="100"></el-table-column>
          <el-table-column align="center" prop="_id" label="id" width="150"></el-table-column>
          <el-table-column align="center" prop="nickName" label="昵称" width="150"></el-table-column>
          <el-table-column align="center" label="头像" width="150">
            <template slot-scope="scope">
              <img
                :src="'http://api.cat-shop.penkuoer.com'+people[scope.$index].avatar"
                alt="用户头像"
                style="width:50px;height:50px"
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="createdAt" label="创建日期" width="200"></el-table-column>
          <el-table-column align="center" prop="updatedAt" label="更新日期" width="200"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button type="warning" @click="editHandle(scope.row)">编辑</el-button>
              <el-button type="danger" @click="delHandle(scope.row)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="allcount"
        style="text-align:center"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { async } from 'q'
export default {
  name: 'user_m',
  data() {
    return {
      show: true,
      inputS: '',
      dialogFormVisible: false,
      titleMap: {
        addEquipment: '新增',
        editHandle: '编辑'
      },
      dialogStatus: '',
      people: [],
      token: '',
      currentPage: 1,
      allcount: 0,
      selID: '',
      form: {
        username: '',
        password: '',
        nickName: ''
      },
      imageUrl: ''
    }
  },
  methods: {
    // 搜索指定用户信息
    searchGoods(value) {
      axios
        .get('http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + value, {
          headers: {
            authorization: `Bearer ${this.token}`
          }
        })
        .then(res => {
          console.log(res)
          // this.form.username = res.data.userName
          // this.form.password = res.data.password
          // this.form.nickName = res.data.nickName
          this.form = res.data
          this.allcount = res.data.totalCount
        })
    },
    //////
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.info
      // console.log(res)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    editHandle(item) {
      console.log(item)
      this.dialogFormVisible = true
      this.dialogStatus = 'editHandle'
      this.show = false
      this.form.username = item.userName
      this.form.nickName = item.nickName
      this.imageUrl = item.avatar
      this.selID = item._id
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadData()
    },
    delHandle(item) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios
            .delete(
              'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + item._id,
              {
                headers: {
                  authorization: `Bearer ${this.token}`
                }
              }
            )
            .then(res => {
              if (res.status == 200) {
                alert('此用户删除成功')
                window.location.reload()
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    async loadData() {
      try {
        const result = await axios.get(
          'http://api.cat-shop.penkuoer.com/api/v1/admin/users',
          {
            headers: {
              authorization: `Bearer ${this.token}`
            },
            params: {
              page: this.currentPage
            }
          }
        )
        this.people = result.data.users
        this.allcount = result.data.totalCount
        // console.log(this.people)
      } catch (err) {
        console.log(err)
      }
    },
    addEquipment() {
      this.dialogFormVisible = true
      this.dialogStatus = 'addEquipment'
    },
    dialog_Visible() {
      if (this.show) {
        if (this.form.username && this.form.password && this.form.nickName) {
          axios
            .post(
              'http://api.cat-shop.penkuoer.com/api/v1/admin/users',
              {
                userName: this.form.username,
                password: this.form.password,
                nickName: this.form.nickName,
                avatar: this.imageUrl
              },
              {
                headers: {
                  authorization: `Bearer ${this.token}`
                }
              }
            )
            .then(res => {
              if (res.status == 200) {
                alert('此用户添加成功')
                window.location.reload()
              }
            })
        } else {
          this.$message({
            type: 'info',
            message: '请输入完整的信息'
          })
        }
      } else {
        axios
          .put(
            'http://api.cat-shop.penkuoer.com/api/v1/admin/users/' + this.selID,
            {
              userName: this.form.username,
              nickName: this.form.nickName,
              avatar: this.imageUrl
            },
            {
              headers: {
                authorization: `Bearer ${this.token}`
              }
            }
          )
          .then(res => {
            this.loadData()
            this.form.username = ''
            this.form.nickName = ''
            this.imageUrl = ''
            this.show = true
            this.dialogFormVisible = false
          })
      }
    }
  },
  created() {
    function getCookie(cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length)
      }
      return ''
    }
    this.token = getCookie('vue_admin_template_token')
    this.loadData()
  }
}
</script>
<style>
.avatar-uploader .el-upload {
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
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


