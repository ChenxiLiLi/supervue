<template>
    <div id="home">
        <!--   侧边栏-->
        <div class="height100p" style="width: 18%;float: left">
            <el-row class="tac height100p" style="width: 100%">
                <el-col style="width: 100%" class="height100p">
                    <el-menu
                            class="el-menu-vertical-demo height100p"
                            @open="handleOpen"
                            @close="handleClose" unique-opened
                            background-color="#545c64"
                            text-color="#fff" default-active="2">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="fa fa-user-circle-o" style="width: 25px"></i>
                                <span slot="title">员工管理</span>
                            </template>
                            <el-menu-item-group style="padding-left: 30px">
                                <el-menu-item index="1-1" @click="toBasicInfo">基本信息</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="fa fa-shopping-cart" style="width: 25px"></i>
                                <span>销售管理</span>
                            </template>
                            <el-menu-item-group style="padding-left: 30px">
                                <el-menu-item index="2-1" @click="toSellOrder">销售</el-menu-item>
                                <el-menu-item index="2-2" @click="toSellRecord">销售历史</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="fa fa-sign-in" style="width: 25px"></i>
                                <span>进货管理</span>
                            </template>
                            <el-menu-item-group style="padding-left: 30px">
                                <el-menu-item index="3-1" @click="toPurchaseOrder">进货</el-menu-item>
                                <el-menu-item index="3-2" @click="toPurchaseRecord">进货历史</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="fa fa-signal" style="width: 25px"></i>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group style="padding-left: 30px">
                                <el-menu-item index="4-1" @click="toGoodsDetails">商品库存</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="5">
                            <template slot="title">
                                <i class="fa fa-users" style="width: 25px"></i>
                                <span>供货商管理</span>
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div id="menu">
            <transition name="fade">
                <el-breadcrumb separator-class="el-icon-arrow-right" id="el-menu">
                    <el-breadcrumb-item>首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item of itemMenu" class="transitionMenu" :key="item.id">{{item}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </transition>
            <div id="systemuser">
                <span style="font-size: 18px">当前登录用户：{{username}}</span>
            </div>
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
        data() {
            return {
                itemMenu: [],
                transitionShow: true,
                username: ''
            }
        },
        created() {
            this.username = localStorage.getItem('user')
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toSellOrder() {
                this.$router.replace('/home/sellOrder')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['销售管理', '销售'])
                this.transitionShow = false
            },
            toSellRecord() {
                this.$router.replace('/home/sellRecord')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['销售管理', '销售记录'])
            },
            toPurchaseOrder() {
                this.$router.replace('/home/purchaseOrder')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['进货管理', '进货'])
            },
            toPurchaseRecord() {
                this.$router.replace('/home/purchaseRecord')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['进货管理', '进货历史'])
            },
            toGoodsDetails() {
                this.$router.replace('/home/goodsDetails')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['商品管理', '商品库存'])
            },
            toBasicInfo() {
                this.$router.replace('/home/staffsInfo')
                this.itemMenu = []
                this.itemMenu = this.itemMenu.concat(['员工管理', '基本信息'])
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
    #systemuser {
        margin-top: 30px;
        margin-left: 83%;
        color: red;
    }

</style>

