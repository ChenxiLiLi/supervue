<template>
    <div>
        <!-- 卡片区域 -->
        <el-card class="box-card" shadow="hover">
            <!-- 搜索栏 -->
            <el-row :gutter="15" style="margin-bottom: 10px">
                <el-col :span="10">
                    <el-input v-model="staffName" placeholder="请输入员工名搜索员工" prefix-icon="el-icon-search">
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" plain icon="el-icon-search"
                               style="padding: 10px 20px; margin-top: 2px" @click="searchStaff">
                        搜索
                    </el-button>
                </el-col>
            </el-row>
            <!-- 信息展示表格 -->
            <el-table :data="staffData" border stripe size="mini" highlight-current-row>
                <!-- 员工对象的属性列 -->
                <el-table-column prop="name" fixed align="left"
                                 label="姓名" width="90">
                </el-table-column>
                <el-table-column prop="gender" label="性别"
                                 align="left" width="85">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证"
                                 align="left" width="150">
                </el-table-column>
                <el-table-column prop="phone" label="电话号码"
                                 align="left" width="130">
                </el-table-column>
                <el-table-column prop="email" label="电子邮箱"
                                 align="left" width="180">
                </el-table-column>
                <el-table-column prop="address" label="联系地址"
                                 align="left" width="250">
                </el-table-column>
                <el-table-column prop="workState" label="任职状态"
                                 align="left" width="85">
                </el-table-column>
                <!-- 功能列 -->
                <el-table-column fixed="right" width="180"
                                 label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini"
                                   @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <div class="pagination">
                <el-button type="danger" size="small">批量删除</el-button>
                <el-pagination style="text-align: right" background
                               layout="total, prev, pager, next, jumper"
                               @current-change="getPage"
                               :page-size="7"
                               :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "userManage",
        data(){
            return {
                keyWord: '',
                staffData: [],
                total: null,
                staffName: null
            }
        },
        //初始化第一页员工数据
        created() {
            let _self = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                if (key === 13) {
                    _self.searchStaff();
                }
            }
            this.$http.get('/staff/basicInfo',{
                    //使用params,会以bserURL/staff/basicInfo?page=1&size=7调用后台接口
                    params: {
                        page: 1,
                        size: 8,
                        search: ''
                    }
                }
            ).then(resp => {
                console.log(resp)
                if (resp) {
                    //获取员工数据
                    this.staffData = resp.data;
                    //获取数据总条数
                    this.total = resp.recordsNum;
                } else {
                    this.$message.error("资料获取失败")
                }
            })
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            //根据页码获取员工资料
            getPage(currentPage) {
                this.$http.get('/staff/basicInfo',{
                    params: {
                        page: currentPage,
                        size: 7,
                        search: this.staffName
                    }
                }).then(resp => {
                    if (resp) {
                        //获取数据成功
                        this.staffData = resp.data;
                        this.total = resp.recordsNum;
                    } else {
                        this.$message.error("资料获取失败")
                    }
                })
            },
            //根据搜索关键词获取员工资料
            searchStaff() {
                this.$http.get('/staff/basicInfo',{
                    params: {
                        page: 1,
                        size: 7,
                        search: this.staffName
                    }
                }).then(resp => {
                    if (resp) {
                        //获取数据成功
                        this.empsData = resp.data;
                        this.total = resp.recordsNum;
                    } else {
                        this.$message.error("资料获取失败")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .el-table {
        font-size: 12px;
        width: 100%;
        margin-bottom: 10px;
    }
    .pagination {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
    }
</style>
