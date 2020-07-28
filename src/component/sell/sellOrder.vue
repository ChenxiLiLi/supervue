<template>
    <div id="sellOrder">
        <div id="search">
            <div id="searchBox">
                <el-input style="width: 25%;margin-right: 2%;margin-top: 30px" placeholder="搜索商品id"></el-input>
                <el-input style="width: 25%;margin-right: 2%" placeholder="搜索商品名"></el-input>
                <el-input style="width: 25%;margin-right: 2%" placeholder="搜索商品价格"></el-input>
                <el-button type="success" @click="searchMessage">搜索</el-button>
            </div>
        </div>
        <div id="table">

            <div id="tableChild">
                <el-table
                        :data="tableData"
                        border
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
                            prop="num"
                            label="数量"
                            align="center"
                            min-width="100">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            align="center"
                            min-width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">
                                <span class="iconfont icon-jian"></span>
                            </el-button>
                            <el-button type="text" size="small">
                                <span class="iconfont icon-jia1" style="font-size: 12px"></span>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block" id="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sellOrder",
        data() {
            return {
                tableData: [
                    {
                        gdsId: 1,
                        gdsName: '辣条',
                        price: '$10',
                        num: 0
                    },
                    {
                        gdsId: 1,
                        gdsName: '辣条',
                        price: '$10',
                        num: 0
                    },
                    {
                        gdsId: 1,
                        gdsName: '辣条',
                        price: '$10',
                        num: 0
                    }
                ],
                currentPage4: 4,
                data1: {
                    id: '',
                    sellItem: [
                        {}
                    ]
                }
            }
        },
        methods: {
            searchMessage() {

            },
            handleClick(row) {
                console.log(row);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
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
</style>
