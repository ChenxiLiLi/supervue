<template>
    <div id="sellOrder">
        <div id="search">
            <div id="searchBox">
                <el-input v-model="searchItem.id" style="width: 25%;margin-left: 25%;margin-right: 2%;margin-top: 30px"
                          placeholder="搜索商品id"></el-input>
                <el-button type="success" @click="searchMessage">搜索</el-button>
                <el-button type="success" @click="reset">重置</el-button>
            </div>
        </div>
        <div id="table">

            <div id="tableChild">
                <el-table
                        :data="tableData" stripe size="mini" highlight-current-row
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
                            label="购买数量"
                            align="center"
                            min-width="100">
                        <template slot-scope="scope">
                            <el-input type="input" style="width: 100px"
                                      @input="watchNum(scope.row)"
                                      v-model="scope.row.num"></el-input>
                        </template>
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
                this.tableData = this.tableAllData.filter(function (item) {
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
                if (row.num <= 0) {
                    this.$message({
                        message: '数量不能为负数',
                        type: 'warning'
                    })
                } else {
                    row.num--
                    this.tableAllData.forEach(function (item, index) {
                        if (item.gdsId == row.gdsId) {
                            item.num = row.num
                        }
                    })
                }
            },
            addGoods(row) {
                if (row.num >= row.amount) {
                    this.$message({
                        message: '数量不能超过最大存货量',
                        type: 'warning'
                    })
                } else {
                    row.num++
                    this.tableAllData.forEach(function (item, index) {
                        if (item.gdsId == row.gdsId)
                            item.num = row.num
                    })
                }
                console.log(this.tableAllData)
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val
                this.getGoodsMsg()
            },
            async handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                await this.getGoodsMsg(val, this.pageSize)
                console.log(this.tableAllData)
                this.tableData = this.tableAllData.filter((obj) => {
                    for (let item of this.tableData) {
                        if (obj.gdsId == item.gdsId) {
                            return obj
                        }
                    }
                })
            },
            async getGoodsMsg(currentPage = this.page, pageSize = this.pageSize) {
                await this.$http('/sell/goods/' + currentPage + '/' + pageSize).then(resp => {
                    console.log(resp)
                    for (let item of resp.data.data) {
                        item.num = 0
                    }
                    this.tableData = []
                    this.tableData = this.tableData.concat(resp.data.data)
                    this.goodsTotal = resp.data.recordsNum
                    this.pageSize = resp.data.pageSize
                })
            },
            getAllGoodsMsg() {
                this.$http('/sell/goods/1/1000').then(resp => {
                    console.log(resp)
                    for (let item of resp.data.data) {
                        item.num = 0
                    }
                    this.tableAllData = []
                    this.tableAllData = resp.data.data
                })
            },
            async commitOrder() {
                this.$http.defaults.headers.post['Content-Type'] = 'application/json';
                let sellItem = [
                    {
                        sellId: "null",
                        gdsId: 14,
                        price: 4,
                        amount: 2
                    }, {
                        sellId: "null",
                        gdsId: 15,
                        price: 4,
                        amount: 2
                    }
                ]
                sellItem = []
                this.tableAllData.forEach((item, index) => {
                    if (item.num != 0) {
                        sellItem = sellItem.concat({
                            sellId: "null",
                            gdsId: item.gdsId,
                            price: item.price,
                            amount: item.num
                        })
                        console.log(sellItem)
                    }
                })
                await this.$http.post('/sell/addOrder/1', JSON.stringify(sellItem)).then(resp => {
                    this.$message('添加成功')
                })
                await this.getGoodsMsg()
                await this.getAllGoodsMsg()
            },
            async reset() {
                this.searchItem = {
                    id: null,
                    goodsName: null,
                    price: null
                }
                await this.getGoodsMsg()
                console.log(this.tableAllData)
                this.tableData = this.tableAllData.filter((obj) => {
                    for (let item of this.tableData) {
                        if (obj.gdsId == item.gdsId) {
                            return obj
                        }
                    }
                })
            },
            watchNum(row){
                console.log('keyDowm')
                if (row.num >= row.amount){
                    row.num = row.amount
                }
                if (row.num < 0) {
                    row.num = 0
                }
            }
        },
        mounted() {
            this.getGoodsMsg()
            this.getAllGoodsMsg()
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
