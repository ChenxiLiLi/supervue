<template>
    <div id="sellOrder">
        <div id="search">
            <div id="searchBox">
                <el-input v-model="searchItem.id" style="width: 25%;margin-right: 2%;margin-top: 30px"
                          placeholder="搜索商品id"></el-input>
                <el-input v-model="searchItem.goodsName" style="width: 25%;margin-right: 2%"
                          placeholder="搜索商品名"></el-input>
                <el-input v-model="searchItem.price" style="width: 25%;margin-right: 2%"
                          placeholder="搜索商品价格"></el-input>
                <el-button type="success" @click="searchMessage">搜索</el-button>
                <el-button type="success" @click="reset">重置</el-button>
            </div>
        </div>
        <div id="table">

            <div id="tableChild">
                <el-table
                        :data="tableData"
                        border
                        max-height="380"
                >
                    <el-table-column
                            fixed
                            prop="gdsId"
                            label="商品id"
                            align="center"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="gdsName"
                            label="商品名"
                            align="center"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="单价"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="存货量"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            prop="num"
                            label="购买数量"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            min-width="100">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">
                                <span class="iconfont icon-jian" @click="reduceGoods(scope.row)"></span>
                            </el-button>
                            <el-button type="text" size="small">
                                <span class="iconfont icon-jia1" style="font-size: 12px"
                                      @click="addGoods(scope.row)"></span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block" id="pagination">
                <el-pagination
                        style="float: left;margin-left: 10%"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="goodsTotal">
                </el-pagination>
                <el-button type="success" id="addOrder" @click="commitOrder">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sellOrder",
        data() {
            return {
                searchItem: {
                    id: null,
                    goodsName: null,
                    price: null
                },
                tableData: [],   //用于渲染商品  搜索结构
                tableData1: [],  //用于重置
                tableAllData: [],   //存储所有商品项  每当add之后，都会存放在这里
                currentPage4: 4,
                data1: {
                    id: '',
                    sellItem: [
                        {}
                    ]
                },
                page: 1,
                pageSize: 5,
                goodsTotal: 100,
                post: {
                    id: '123',
                    name: 'wsf'
                }
            }
        },
        methods: {
            searchMessage() {
                let id = this.searchItem.id
                this.tableData = this.tableData.filter(function (item) {
                    console.log(id)
                    console.log(item)
                    console.log(item.id)
                    if (item.gdsId == id)
                        return item
                })
                console.log(this.tableData)
            },
            reduceGoods(row) {
                console.log(row);
                if (row.num == 0) {
                    this.$message({
                        message: '数量不能为负数',
                        type: 'warning'
                    })
                } else {
                    row.num--
                }
            },
            addGoods(row) {
                if (row.num == row.amount) {
                    this.$message({
                        message: '数量不能超过最大存货量',
                        type: 'warning'
                    })
                } else {
                    row.num++
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getGoodsMsg()
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.page = val
                this.getGoodsMsg()
            },
            getGoodsMsg() {
                this.$http('/sell/goods/' + this.page + '/' + this.pageSize).then(resp => {
                    console.log(resp)
                    //初始化总条数  this.goodsTotal  未实现

                    for (let item of resp) {
                        item.num = 0
                    }
                    this.tableData = []
                    this.tableData = this.tableData.concat(resp)
                })
            },
            getAllGoodsMsg() {
                this.$http('/sell/goods/' + 1 + '/' + 10000).then(resp => {
                    console.log(resp)
                    //初始化总条数  this.goodsTotal  未实现

                    for (let item of resp) {
                        item.num = 0
                    }
                    this.tableAllData = []
                    this.tableAllData = this.tableData.concat(resp)
                })
            },
            commitOrder() {
                this.$http.post('/sell/addOrder/1', JSON.stringify({
                    sellItem: [
                        {
                            sellId: 1,
                            gdsId: 1,
                            price: '12',
                            amount: 123
                        }, {
                            sellId: 2,
                            gdsId: 2,
                            price: '12',
                            amount: 123
                        }
                    ]
                })).then(resp => {
                    console.log('success')
                })

            },
            reset() {
                this.tableData = this.tableData1
            }
        },
        mounted() {
            this.getGoodsMsg()
        }
    }
</script>

<style scoped>
    #sellOrder {
        height: 100%;
        width: 100%;
    }

    #sellOrder #search {
        width: 100%;
        height: 15%;
    }

    #sellOrder #search #searchBox {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        position: relative;
    }

    #sellOrder #table {
        width: 100%;
        height: 85%;
        text-align: center;
    }

    #pagination {
        margin-top: 20px;
    }

    #tableChild {
        width: 80%;
        margin: 0px auto;
    }

    #addOrder {
        float: left;
        margin-left: 10px
    }
</style>
