<template>
    <div>
		<el-card class="box-card" shadow="hover">
			<div style="margin: 20px;"></div>
			<el-form :label-position="labelPosition" :rules="rules" label-width="100px" :model="purchaseOrder" ref="purchaseOrderRef">
				<el-form-item label="商品编号" prop="goodsId">
					<el-input v-model="purchaseOrder.goodsId"
										@input="getGoodsName(purchaseOrder.goodsId)"
										placeholder="填写商品的数字编号"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" prop="goodsName">
					<el-input v-model="purchaseOrder.goodsName"
										:disabled="true"
										placeholder="请填写商品的完整名称"></el-input>
				</el-form-item>
				<el-form-item label="供应商编号" prop="supplierId">
					<el-input v-model="purchaseOrder.supplierId"
										@input="getProductName()"
										placeholder="填写供应商的数字编号"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称" prop="supplierName">
					<el-input v-model="purchaseOrder.supplierName"
										:disabled="true"
										placeholder="供应商名称"></el-input>
				</el-form-item>
				<el-form-item label="进货单价/元" prop="price">
					<el-input v-model="purchaseOrder.price" placeholder="请填写进货单价" style="width:218px;">
					</el-input>
				</el-form-item>
				<el-form-item label="进货数量/个" prop="amount">
					<el-input-number v-model="purchaseOrder.amount" controls-position="right" :min="10" :max="100">
					</el-input-number>
				</el-form-item>

				<el-row :gutter="15" style="margin-bottom: 10px">
					<el-col :span="10">
						<el-form-item label="员工编号" prop="staffId">
							<el-input v-model="purchaseOrder.staffId" placeholder="请填写员工编号" style="width:179px;">
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-button type="success"
									@click="submitPurchaseOrder('purchaseOrderRef')">
							提交进货表
						</el-button>
						<el-button type="danger" @click="reset">
							重置输入
						</el-button>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
    </div>
</template>

<script>
    export default {
        name: "purchaseOrder",
		data() {
			//自定义校验规则
			let checkId = (rule, value, callback) => {
				if (value === "" || value == null) {
					callback(new Error('编号不能为空'));
				}
				//Number为正整数
				setTimeout(() => {
					if (!isNaN(value) && value > 0) {
						callback();
					} else {
						callback(new Error('请输入数字值'));
					}
				}, 1000);
			};
			let checkPrice = (rule, value, callback) => {
				if (!value) {
					callback(new Error('单价不能为空'));
				}
				setTimeout(() => {
					if (!isNaN(value) && value > 0) {
						callback();
					} else {
						callback(new Error('请输入数字值'));
					}
				}, 1000);
			};
			let checkInput = (rule, value, callback) => {
				if (!value) {
					callback(new Error('输入不能为空'));
				}
			};
			return {
				labelPosition: 'right',
				//进货表单对象
				purchaseOrder: {
					goodsId: null,
					goodsName: '',
					supplierId: '',
					supplierName: '',
					price: '',
					amount: '20',
					staffId: ''
				},
				suppNameList: [],
				suppIdList: [],
				//定义规则
				rules: {
					goodsId: [{ validator: checkId, trigger: 'blur' }],
					goodsName: [{ validator: checkInput, trigger: 'blur' }],
					price: [{ validator: checkPrice, trigger: 'blur' }],
					staffId: [{ validator: checkId, trigger: 'blur' }],
				}
			};
		},
		methods: {
			//提交进货表单
			submitPurchaseOrder() {
				this.$http.post('/purchase/addPurchase', this.purchaseOrder).then(resp => {
					console.log(resp)
					if (resp) {
						this.$notify.info({
							title: '操作结果',
							message: resp.toString()
						});
					} else {
						this.$notify.info({
							title: '操作结果',
							message: '进货失败'
						});
					}
				})
			},
			getGoodsName(id){
				this.$http('/goods/search/'+id).then(resp => {
					if (resp.data != null)
						this.purchaseOrder.goodsName = resp.data.gdsName;
					else
						this.purchaseOrder.goodsName = '商品不存在'
				})
			},
			getProductName(){
				console.log(this.purchaseOrder)
				 let id = this.purchaseOrder.supplierId
				this.$http('/supplier/search/'+id).then(resp => {
					if (resp != undefined)
						this.purchaseOrder.supplierName = resp.data.spName;
					else
						this.purchaseOrder.supplierName = '供应商不存在'
				})
			},
			reset() {
                location.reload();
            }
		},
		created() {
		}
	}
</script>

<style scoped>
	.el-card {
		margin-top: 30px;
		width: 75%;
		height: 480px;
		margin-left: 90px;
	}
	.el-form-item {
		font-weight: 600;
		width: 70%;
	}
	.el-button {
		margin-left: 20px;
	}
</style>
