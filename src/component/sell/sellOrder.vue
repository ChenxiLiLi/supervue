<template>
  <div id="sellOrder">
    <div id="search">
      <div id="searchBox">
        <el-input style="width: 25%;margin-right: 2%;margin-top: 30px"></el-input>
        <el-input style="width: 25%;margin-right: 2%"></el-input>
        <el-input style="width: 25%;margin-right: 2%"></el-input>
        <el-button type="success" @click="searchMessage">搜索</el-button>
      </div>
    </div>
    <div id="table">表格栏</div>
  </div>
</template>

<script>
	export default {
		name: "sellOrder",
    data(){
			return {

      }
    },
    methods:{
			searchMessage(){

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
</style>
