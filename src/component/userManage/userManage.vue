<template>
  <div id="userManage">
    <div id="search">
      <div id="searchBox">
        搜索栏
      </div>
    </div>
    <div id="table">表格栏</div>
  </div>
</template>

<script>
	export default {
		name: "userManage"
	}
</script>

<style scoped>
  #userManage {
    height: 100%;
    width: 100%;
  }
  #userManage #search {
    width: 100%;
    height: 15%;
  }
  #userManage #search #searchBox {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  #userManage #table {
    width: 100%;
    height: 85%;
    text-align: center;
  }
</style>
