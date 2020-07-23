<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 登录表单 -->
            <el-form label-width="0px" class="login_form" :rules="rules" :model="loginForm"
                     ref="loginFormRef">
                <!-- username -->
                <el-form-item prop="username">
                    <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                              placeholder="请输入用户名" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- password -->
                <el-form-item prop="password">
                    <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
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
                /*登录的绑定对象*/
                loginForm: {
                    username: '',
                    password: '',
                },
                checked: true,
                /*验证规则*/
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {},
        methods: {
            login() {

            },
            reset() {

            }
        }
    }
</script>

<style scoped>
    .login_container {
        background-color: dodgerblue;
        height: 100%;
    }
    .login_box {
        width: 550px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
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
</style>