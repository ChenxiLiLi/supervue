<template>
  <div id="home">
<!--    侧边栏-->
    <div class="height100p" style="width: 18%;float: left">
      <el-row class="tac height100p" style="width: 100%">
        <el-col style="width: 100%" class="height100p">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo height100p"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="1">
              <span slot="title">员工管理</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>销售管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="toSellOrder">销售查询</el-menu-item>
                <el-menu-item index="2-2" @click="toSellRecord">销售历史</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>进货管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="toAddGoods">进货</el-menu-item>
                <el-menu-item index="3-2" @click="toGoodsDetails">进货历史</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="4">
              <span slot="title">供货商管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <span slot="title">库存管理</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div id="menu">
      <transition name="fade">
        <el-breadcrumb separator-class="el-icon-arrow-right" id="el-menu">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item of itemMenu" class="transitionMenu" :key="item.id">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
      </transition>
    </div>
    <div id="div2">
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
	export default {
		name: "Home",
    data(){
			return {
				itemMenu:[
					'活动管理',
          '活动列表',
          '活动详情'
        ],
				transitionShow:true
      }
    },
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
      toSellOrder(){
				this.$router.push('sellOrder')
        this.itemMenu = []
        this.itemMenu = this.itemMenu.concat(['销售管理','销售历史'])
        this.transitionShow = false
      },
			toSellRecord(){
				this.$router.push('sellRecord')
				this.itemMenu = []
				this.itemMenu = this.itemMenu.concat(['销售管理','销售查询'])
      },
			toAddGoods(){
				this.$router.push('addGoods')
      },
      toGoodsDetails(){
				this.$router.push('goodsDetails')
      }
		}
	}

</script>

<style scoped>
  #home {
    height: inherit;
    width: inherit;
  }
  #menu {
    float: left;
    position: relative;
    width: 82%;
    height: 10%;
    border-bottom: 1px solid #cccccc;
    transition: 2s;
  }
  #menu #el-menu {
    position: absolute;
    bottom: 10px;
    left: 20px;
  }
  #div2 {
    float: left;
    width: 82%;
    height: 90%
  }
  .transitionMenu {
    transition: 2s;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>

