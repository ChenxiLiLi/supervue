<template>
    <div id="sellRecord">
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
                        max-height="380">
                    <el-table-column
                            fixed
                            prop="sellId"
                            label="销售id"
                            align="center"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="sfId"
                            label="员工id"
                            align="center"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="sellDate"
                            label="销售日期"
                            align="center"
                            min-width="150">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            min-width="100">
                        <template slot-scope="scope">
                            <el-button type="success" @click="LookRecord(scope.row)">
                                查看销售记录
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
        <!--        弹出框-->
        <el-dialog title="收货地址" :visible.sync="showVisible">
            <el-table :data="recordTable">
                <el-table-column property="sellId" label="销售id"></el-table-column>
                <el-table-column property="gdsId" label="商品id"></el-table-column>
                <el-table-column property="price" label="价格"></el-table-column>
                <el-table-column property="amount" label="amount"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "sellRecord",
        data() {
            return {
                searchItem: {
                    id: null,
                    goodsName: null,
                    price: null
                },
                tableData: [
                    {
                        sellId: '',
                        gdsId: '',
                        sellDate: ''
                    }
                ],   //用于渲染商品  搜索结构
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
                },
                showVisible: false,
                recordTable: [
                    {
                        sellId: '',
                        gdsID: '',
                        price: '',
                        amount: ''
                    }
                ]
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
            LookRecord(row) {
                console.log(row)
                this.showVisible = true
                this.$http.get('/sell/recordItem/' + row.sellId).then(resp => {
                    this.recordTable = []
                    this.recordTable = this.recordTable.concat(resp)
                    console.log(this.recordTable)
                })
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
                this.$http('/sell/record/' + this.page + '/' + this.pageSize).then(resp => {
                    console.log(resp)
                    //初始化总条数  this.goodsTotal  未实现
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
    #sellRecord {
        height: 100%;
        width: 100%;
    }

    #sellRecord #search {
        width: 100%;
        height: 15%;
    }

    #sellRecord #search #searchBox {
        width: 80%;
        height: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ccc;
        position: relative;
    }

    #sellRecord #table {
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
