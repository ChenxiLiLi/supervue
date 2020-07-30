<template>
    <div class="login_container">
        <div class="login_box">
			<div class="welcomeFont">
				<span style="font-size:26px">Logining to</span><br>
				<span style="font-size:26px; margin-left:40px;">Supermarket System</span>
			</div>
            <!-- 登录表单 -->
            <el-form v-loading="loading"
                     element-loading-text="正在登录..."
                     element-loading-spinner="el-icon-loading"
                     element-loading-background="rgba(0, 0, 0, 0.8)"
                     label-width="0px" class="login_form"  :rules="rules" :model="loginForm"
                     ref="loginFormRef">
                <!-- username -->
                <el-form-item prop="adminName">
                    <el-input size="normal" type="text" v-model="loginForm.adminName" auto-complete="off"
                              placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item prop="adminPassword">
                    <el-input size="normal" type="password" v-model="loginForm.adminPassword" auto-complete="off"
                              placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <el-form-item class="login_btn">
                    <el-button type="primary" plain class="login"  @click="login">登录</el-button>
                    <el-button type="info" plain style="padding: 12px 25px" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loading: false,
                /*登录的绑定对象*/
                loginForm: {
                    adminName: '',
                    adminPassword: '',
                },
                checked: true,
                /*验证规则*/
                rules: {
                    adminName: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    adminPassword: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        //将enter键与登录关联起来
        created() {
            let _self = this;
            document.onkeydown = function(e) {
                let key = window.event.keyCode;
                if (key === 13) {
                    _self.login();
                }
            }
        },
        methods: {
            login() {
                this.$refs.loginFormRef.validate(valid => {
                    if (valid) {
                        //验证规则通过
                        this.loading = true;
                        this.$http.post('/user/login', this.loginForm).then(resp => {
                            console.log(resp);
                            if (resp && resp.status === 200) {
                                //登录成功，保存用户名
                                let _data = resp.data
                                this.$store.commit('login', _data)
                                //页面跳转
                                this.$router.replace("/home");
                            } else {
                                //登录失败
                                this.loading = false;
                            }
                        })
                    } else {
                        //验证失败，不做处理
                        return false;
                    }
                });
            },
            reset() {
                this.$refs.loginFormRef.resetFields();
            }
        }
    }
</script>

<style scoped>
    .login_container {
        background-image: url("../assets/images/login.jpg");
        width:100%;
        height:100%;
        position:fixed;
        background-size:100% 100%;
    }
    .login_box {
        width: 400px;
        height: 400px;
        background-color: #fff;
        position: absolute;
        left: 60%;
        top: 25%;
        border: 10px solid rgba(100,200,200,1);
    }
    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .login_btn {
        display: flex;
        justify-content: center;
        padding: 7px 25px;
    }
    .login_box .login {
        margin-inline-end: 28px;
        margin-inline-start: 10px;
        padding: 12px 25px;
    }
	.welcomeFont{
		color: rgba(100,200,200,1);
		margin-top: 60px;
		margin-left: 60px;
	}
</style>