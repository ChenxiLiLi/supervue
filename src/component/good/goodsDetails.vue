<template>
    <div id="goodsDetails">
       
		<el-button type="success" style="margin-top:30px;margin-left:970px" 
				@click="exportReport">导出报表</el-button>
        
        <div id="table" style="margin-top:25px;width:95%;margin-left:25px">
            <div id="tableChild">
                <el-table :data="tableData" stripe size="mini" highlight-current-row
                          border
                          max-height="410">
                    <el-table-column
                            fixed
                            prop="gdsId"
                            label="商品编号"
                            align="center"
                            min-width="80">
                    </el-table-column>
                    <el-table-column
                            prop="gdsName"
                            label="商品名称"
                            align="center"
                            min-width="120">
                    </el-table-column>
                    <el-table-column
                            prop="brand"
                            label="商品品牌"
                            align="center"
                            min-width="100">
                    </el-table-column> 
                    <el-table-column
                            prop="model"
                            label="商品型号"
                            align="center"
                            min-width="150">
                    </el-table-column>
					<el-table-column
                            prop="category"
                            label="商品种类"
                            align="center"
                            min-width="100">
                    </el-table-column>
					<el-table-column
                            prop="amount"
                            label="库存"
                            align="center"
                            min-width="100">
                    </el-table-column> 
					<el-table-column
                            prop="unit"
                            label="单位"
                            align="center"
                            min-width="100">
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页组件 -->
            <div class="pagination">
				<span style="color:red;margin-top:20px">标注：此处展示的是库存不足的商品(<50)。</span>
                <el-pagination style="text-align: right; margin-top: 20px" background
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
        name: "goodsDetails",
		data() {
            return {
                total: null,
                tableData: null,
				pageNo: 1,
				size: 5,
            }
        },
		methods: {
            //根据页码获取资料
            getPage(currentPage) {
				this.pageNo = currentPage;
                this.$http.get('/goods/'+this.pageNo+'/'+this.size).then(resp => {
					console.log(resp)
					if (resp) {
						this.tableData = resp.data.data;
						//获取数据总条数
						this.total = resp.data.recordsNum;
					} else {
						this.$message.error("资料获取失败")
					}
				})
			},
			exportReport(){
				alert("导出报表")
			}
        },
        created() {
            this.$http.get('/goods/'+this.pageNo+'/'+this.size).then(resp => {
                console.log(resp)
                if (resp) {
                    this.tableData = resp.data.data;
                    //获取数据总条数
                    this.total = resp.data.recordsNum;
                } else {
                    this.$message.error("资料获取失败")
                }
            })
		}
    }
</script>

<style scoped>
	.pagination {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
    }
</style>