Vue.component('topcom', {
	data:function(){
		return {
			dis:true
		}	
	},
	props: ['loginUser'],
	template:'<div class="maintop"><div class="title"><div class="ecej"><img src="../../img/ecej.png" alt="" /><span>·</span><span>商家管理平台</span></div><div class="ecej1"><img src="../../img/logo1.png" alt="" class="show1" /><span>商家管理平台</span></div><div class="information"><span>{{loginUser.name}}</span><span v-on:click="logout" class="infor">退出</span></div><div class="icon"><div @click="show" v-if="dis" ><img src="../../img/icon.png" alt="" class="icon1" /></div><div v-else @click="show" ><img src="../../img/close.png" alt="" class="close" /></div></div><ul class="cover features" v-if="!dis" @click="close"><li class="first-li"><a href="/order/manage"><i class="manage"></i><span>订单管理</span></a></li><li class="sec-li"><a href="/placeOrder/placeOrderPage"><i class="help"></i><span>我要下单</span></a></li><li class="sec-li"><span>{{loginUser.name}}</span><span class="infor" v-on:click="logout">退出</span></li></ul></div><el-row><el-col :xs="0" :sm="5" :lg="4" class="features1"><ul class="features feature"><li class="first-li"><a href="/order/manage"><i class="manage"></i><span>订单管理</span></a></li><li class="sec-li active"><a href="/placeOrder/placeOrderPage"><i class="help"></i><span>我要下单</span></a></li></ul></el-col><el-col :xs="24" :sm="19" :lg="20"><slot></slot></el-col></el-row></div>',
	methods:{
		show: function() {
			this.dis = !this.dis
		},
		close:function(){
			this.dis = false
		},
		logout:function(){
			//(this.loginUser.contextPath=='/'?'':this.loginUser.contextPath)+'/site/logout?_='+Math.random()
			this.$http.post('/site/logout?_='+Math.random(), {}).then(function(response){
                var data=response.body;
                if(data.code==1){
                	//(this.loginUser.contextPath=='/'?'':this.loginUser.contextPath)+'/site/login'
                	document.location.href='/site/login';
                }else{
                	this.$message({"message":"退出失败,参考信息:"+data.code,type:'error'});
                }
                //_vue.$alert(data, '提示');
            }, function(response){
            	this.$alert("退出失败,参考信息:"+response,'警告');
            });
		}
	}
})