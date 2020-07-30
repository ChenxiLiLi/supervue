<template>
  <div id="sellRecord">
    <div id="search">

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
            style="float: left;margin-left: 15%"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="goodsTotal">
        </el-pagination>
      </div>
    </div>
    <!--        弹出框-->
    <el-dialog title="商品订单信息" :visible.sync="showVisible">
      <el-table :data="recordTable">
        <el-table-column property="sellId" label="销售单号"></el-table-column>
        <el-table-column property="gdsId" label="商品编号"></el-table-column>
        <el-table-column property="price" label="总价格"></el-table-column>
        <el-table-column property="amount" label="商品数量"></el-table-column>
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
			LookRecord(row) {
				console.log(row)
				this.showVisible = true
				this.$http.get('/sell/recordItem/' + row.sellId).then(resp => {
					console.log('this.recordTable')
					console.log(this.recordTable)
					this.recordTable = []
					this.recordTable = this.recordTable.concat(resp.data)
          console.log(this.recordTable)
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				console.log(this.page)
				let page = this.page
				this.getGoodsMsg(page,val)
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.getGoodsMsg(val,this.pageSize)
			},
			getGoodsMsg(currentPage = this.page,pageSize = this.pageSize) {
				this.$http('/sell/record/' + currentPage + '/' + pageSize).then(resp => {
					console.log(resp)
					this.tableData = []
					this.tableData = this.tableData.concat(resp.data.data)
          this.pageSize = resp.data.pageSize
          this.goodsTotal = resp.data.recordsNum
				})
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
    height: 10%;
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
