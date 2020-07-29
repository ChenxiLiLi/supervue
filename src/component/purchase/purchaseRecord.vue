<template>
    <div id="purchaseRecord">
        <div id="search">
            <div id="searchBox">
                <el-input v-model="name" style="width: 25%;margin-right: 2%;margin-top: 30px"
                          placeholder="输入商品名称" ref="keyWord"></el-input>
                <el-button type="success" style="padding: 10px 30px;" @click="searchPurchaseRecord">搜索</el-button>
            </div>
        </div>
        <div id="table">
            <div id="tableChild">
                <el-table :data="tableData" stripe size="mini" highlight-current-row
                          border
                          max-height="410">
                    <el-table-column
                            fixed
                            prop="purchaseId"
                            label="记录编号"
                            align="center"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="goods"
                            label="商品名称"
                            align="center"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="进货单价"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="进货数量"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="进货日期"
                            align="center"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="supplier"
                            label="供应商"
                            align="center"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            prop="staffId"
                            label="进货人员编号"
                            align="center"
                            min-width="100">
                    </el-table-column>
					<el-table-column fixed="right" width="100"
                                 label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success"
                                   @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                    </template>
                </el-table-column>
                </el-table>
            </div>
            <!-- 分页组件 -->
            <div class="pagination">
                <el-pagination style="text-align: center; margin-top: 20px" background
                               layout="total, prev, pager, next, jumper"
                               @current-change="getPage"
                               :page-size="size"
                               :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "purchaseRecord",
        data() {
            return {
                total: null,
                name: '',
                tableData: null,
				pageNo: 1,
				size: 5,
            }
        },
        methods: {
			handleEdit(index, row, name) {
                alert("请求编辑进货记录")
            },
            //根据页码获取资料
            getPage(currentPage) {
                this.$http.get('/purchase/allPurRecord',{
                    params: {
                        pageNo: currentPage,
                        size: 5,
                        name: this.name
                    }
                }).then(resp => {
                    if (resp) {
                        //获取数据成功
                        this.tableData = resp.data;
                        this.total = resp.recordsNum;
                    } else {
                        this.$message.error("资料获取失败")
                    }
                })
            },
            searchPurchaseRecord() {
                this.$http.get('/purchase/allPurRecord',{
                    params: {
                        pageNo: 1,
                        size: 5,
                        name: this.name
                    }
                }).then(resp => {
                    if (resp) {
                        //获取数据成功
                        this.tableData = resp.data;
                        this.total = resp.recordsNum;
                    } else {
                        this.$message.error("资料获取失败")
                    }
                })
            }
        },
        created() {
            let _self = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                if (key === 13) {
                    _self.searchPurchaseRecord;
                }
            }
            this.$http.get('/purchase/allPurRecord',{
                    params: {
                        pageNo: 1,
                        size: 5,
                        name: this.name
                    }
                }).then(resp => {
                console.log(resp)
                if (resp) {
                    this.tableData = resp.data;
                    //获取数据总条数
                    this.total = resp.recordsNum;
                } else {
                    this.$message.error("资料获取失败")
                }
            })
        }
    }
</script>

<style scoped>
    #purchaseRecord {
        height: 100%;
        width: 100%;
    }

    #purchaseRecord #search {
        width: 100%;
        height: 15%;
    }

    #purchaseRecord #search #searchBox {
        width: 85%;
        height: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        text-align: center;
    }

    #purchaseRecord #table {
        width: 95%;
        height: 85%;
        text-align: center;
        margin-left: 25px;
    }
</style>
