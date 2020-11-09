<template>
<div class="lgin">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
            <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</div>  
</template>
<script>
    export default {
        data() {
            // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //     return callback(new Error('用户不能为空'));
            //     }
            //     // setTimeout(() => {
            //     // if (!Number.isInteger(value)) {
            //     //     callback(new Error('请输入数字值'));
            //     // } else {
            //     //     if (value < 18) {
            //     //     callback(new Error('必须年满18岁'));
            //     //     } else {
            //     //     callback();
            //     //     }
            //     // }
            //     // }, 1000);
            // };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    username: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]                
                }
            };
        },
        methods: {
            submitForm(formName) {               
                this.$refs[formName].validate((valid) => {                 
                if (valid) {
                    alert('submit!');
                    this.submitLogin();
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitLogin(){
                var {pass,username} = this.ruleForm
                this.$axios({
                    method:'post',
                    url:'http://localhost:8081/api/login',
                    data:{
                        name:username,
                        password:pass
                    }
                }).then((res)=>{                   
                    if(res.data.statusCode==200) {
                        alert(res.data.data);
                        localStorage.setItem('token',res.data.token); //用户访问页面的钥匙
                        
                        this.$router.push({
                            path:'/home'
                        });
                    } else {
                        alert(res.data.data);
                    }
                
                });
                
            }
        }
    }
</script>