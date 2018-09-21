//

            var prefix = "/order-core/check/pageDefine";
            
            var vm=new Vue({
                el:'#app',
                data:{ 
                    //主页面分类表单
                    form:{
                    	businessLine:'',
                    	secondClassify:'',
                    	taskId:'',
                    	id:''
                    },
                    businessLineList:[],
                    secondClassifyList:[],

                    taskInfoList:[],
                    inputTypeList:[],
                    specialCheckList:[],
					pageInfoList:[],
                    //主table
                    tableData:[],
                    //table展示loading效果
                    tableLoading:false,

                    //选中的字段分类
                    checkedCategories:[],
                    //字段分类全量
                    categories:[],

                    //关联校验定义对话框显示隐藏
                    dialogVisible:false,
                    //参照Dialog显示隐藏
                    referenceDialogVisible:false,

                    //参照dialog控件值
                    referenceForm:{
                        businessLine:'',
                        busiTypeChild:'',
                        pageName:'',
                        taskName:''
                    },

                    //关联校验方法
                    overlapCheckMethodList:[],

                },
                methods:{
                    //业务线变化,业务线二级分类跟随变化
                    businessLineChange:function(){
                        this.secondClassifyList=[];
                        this.form.secondClassify='';
                        this.$http.post('/order-core/api/orderBaseCheckController/getListByType',{
                            type:'buissniss_second'+','+this.form.businessLine
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.secondClassifyList = data.body.data.options;
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取页面定义信息失败!', type: 'failure', duration:2000 });
                            });

                    },

                    //获取页面定义List
                    getPageDefineColumnCategory:function(){
                        this.$http.post(prefix+'/getPageDefineColumnCategory').then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.categories = JSON.parse(data.body.data);
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取页面定义信息失败!', type: 'failure', duration:2000 });
                            });
                    },

                    //获取页面定义List
                    getPageInfoList:function(){
                        this.$http.post(prefix+'/getPageInfoList').then(
                                function(data){
                                	var b = JSON.stringify(data.body.hasErrors);
                                	if (b != null && b !='' && b=='false') {
	                                	this.pageInfoList = JSON.parse(data.body.data);
                                	}else{
                                        errorMessage = data.body.errorMessage;
                                		this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                	}
                                },
                                function(data){
                                    this.$message({ showClose: true, message:'获取页面定义信息失败!', type: 'failure', duration:2000 });
                                });
                    },

                    //获取特殊校验方法List
                    getMethodSpeCheckDefine:function(){
                        this.$http.post(prefix+'/getMethodSpeCheckDefineList').then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.specialCheckList = JSON.parse(data.body.data);
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取特殊校验方法List信息失败!', type: 'failure', duration:2000 });
                            });
                    },

                    //获取页面定义List
                    getInitComboList:function(){
                        this.$http.post('/order-core/api/orderBaseCheckController/getListByType',{
                            type:'buissniss_line'
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.businessLineList = data.body.data.options;
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取业务线定义信息失败!', type: 'failure', duration:2000 });
                            });

                        this.$http.post('/order-core/api/orderBaseCheckController/getListByType',{
                            type:'task_name'
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.taskInfoList = data.body.data.options;
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取任务定义信息失败!', type: 'failure', duration:2000 });
                            });

                        this.$http.post('/order-core/api/orderBaseCheckController/getListByType',{
                            type:'data_type'
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.inputTypeList = data.body.data.options;
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message:'获取数据类型定义信息失败!', type: 'failure', duration:2000 });
                            });
                    },

                    //根据检索条件下拉框的定义内容，抽取对应后台页面是否展示，如何校验的定义，并展示
                    showPageDefine:function(){

                        if(this.form.businessLine == null || this.form.businessLine == ''
                            || this.form.secondClassify == null || this.form.secondClassify == ''
                            || this.form.taskId == null || this.form.taskId == ''
                            || this.form.id == null || this.form.id == '')
                        {
                            return;
                        }
                        var loading = this.$loading({
                            lock: true,
                            text: '😀拼命加载中😍...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$http.post(prefix+'/showPageDefine',{
                            businessLine:this.form.businessLine,
                            secondClassify:this.form.secondClassify,
                            taskId:this.form.taskId,
                            id:this.form.id,
                            checkedCategories:JSON.stringify(this.checkedCategories)
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    var pageDefinePlusCheck =JSON.parse(data.body.data);
                                    this.tableData = pageDefinePlusCheck.pageConfineInfoAllDto;
                                    this.overlapCheckMethodList = pageDefinePlusCheck.methodOverlapCheckDefineDto;
                                    this.checkedCategories = pageDefinePlusCheck.categories;
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                }
                                loading.close();
                            },
                            function(data){
                                loading.close();
                                this.$message({ showClose: true, message: '获取页面定义信息失败！', type: 'failure', duration:2000 });
                            });

                    },

                    //检查页面配置定义，如果没有问题，把页面定义数据发送给后台保存
                    savePageDefine:function(){
                        if(this.form.businessLine == null || this.form.businessLine == ''
                            || this.form.secondClassify == null || this.form.secondClassify == ''
                            || this.form.taskId == null || this.form.taskId == ''
                            || this.form.id == null || this.form.id == '')
                        {
                            this.$message({message:'请先选择需要定义的页面',type:'error',duration:2000});
                            return;
                        }

                        var pageDefinePlusCheck = {pageConfineInfoAllDto:[],methodOverlapCheckDefineDto:[]};
                        pageDefinePlusCheck.pageConfineInfoAllDto = this.tableData;
                        pageDefinePlusCheck.methodOverlapCheckDefineDto = this.overlapCheckMethodList;
                        this.$http.post(prefix+'/savePageDefine', {
                            pageData:JSON.stringify(pageDefinePlusCheck)
                        }).then(
                            function(data){
                                var b = JSON.stringify(data.body.hasErrors);
                                if (b != null && b !='' && b=='false') {
                                    this.$message({ showClose: true, message: '保存数据成功！', type: 'success', duration:2000 });
                                }else{
                                    errorMessage = data.body.errorMessage;
                                    this.$message({ showClose: true, message: errorMessage, type: 'error',duration:0});
                                }
                            },
                            function(data){
                                this.$message({ showClose: true, message: '保存页面定义信息失败！', type: 'error',duration:0 });
                            });
                        },

                    //关联校验dialog打开，展示已经定义的关联校验定义
                    overlapCheckDialog:function(){
                        if(this.form.businessLine == null || this.form.businessLine == ''
                            || this.form.secondClassify == null || this.form.secondClassify == ''
                            || this.form.taskId == null || this.form.taskId == ''
                            || this.form.id == null || this.form.id == '')
                        {
                            this.$message({message:'请先选择需要定义的页面',type:'error',duration:2000});
                            return;
                        }
                        this.dialogVisible = true;
                    },

                    //参照dialog打开，选择参照的已经定义的页面
                    referenceAffective:function(){
                        if(this.referenceForm.businessLine == null || this.referenceForm.businessLine == ''
                            || this.referenceForm.busiTypeChild == null || this.referenceForm.busiTypeChild == ''
                            || this.referenceForm.pageName == null || this.referenceForm.pageName == ''
                            || this.referenceForm.taskName == null || this.referenceForm.taskName == '')
                        {
                            this.$message({message:'请先选择需要定义的页面',type:'error',duration:5000});
                            return;
                        }

                        this.$confirm('此操作将清除页面定义内容，用选定参照页面的定义替代, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {

                            var loading = this.$loading({
                                lock: true,
                                text: '😀拼命加载中😍...',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });

                            this.$http.post(prefix+'/referencePageDefine',{
                                businessLine:this.form.businessLine,
                                secondClassify:this.form.secondClassify,
                                taskId:this.form.taskId,
                                id:this.form.id,
                                refBusinessLine:this.referenceForm.businessLine,
                                refSecondClassify:this.referenceForm.busiTypeChild,
                                refTaskId:this.referenceForm.taskName,
                                refId:this.referenceForm.pageName,
                            }).then(
                                function(data){
                                    var b = JSON.stringify(data.body.hasErrors);
                                    if (b != null && b !='' && b=='false') {
                                        var pageDefinePlusCheck =JSON.parse(data.body.data);
                                        this.tableData = pageDefinePlusCheck.pageConfineInfoAllDto;
                                        this.overlapCheckMethodList = pageDefinePlusCheck.methodOverlapCheckDefineDto;
                                    }else{
                                        errorMessage = data.body.errorMessage;
                                        this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                                    }
                                    loading.close();
                                },
                                function(data){
                                    loading.close();
                                    this.$message({ showClose: true, message: '获取页面定义信息失败！', type: 'failure', duration:2000 });
                                });

                            this.referenceDialogVisible = false;


                        }).catch(() => {
                            this.$message({
                            type: 'info',
                            message: '取消'
                        });

                    });


                    },

                    //参照指定定义数据
                    referenceDialog:function(){
                        if(this.form.businessLine == null || this.form.businessLine == ''
                            || this.form.secondClassify == null || this.form.secondClassify == ''
                            || this.form.taskId == null || this.form.taskId == ''
                            || this.form.id == null || this.form.id == '')
                        {
                            this.$message({message:'请先选择修改设定的页面',type:'error',duration:5000});
                            return;
                        }
                        this.referenceDialogVisible = true;
                    },

                    //关闭关联校验dialog时自动触发
                    closeFn:function(){
	                	this.dialogVisible=false;
                    },

                    //关闭参照dialog时自动触发
                    closeRF:function(){
                        this.referenceForm.businessLine='';
                        this.referenceForm.busiTypeChild='';
                        this.referenceForm.taskName='';
                        this.referenceForm.pageName='';
                        this.referenceDialogVisible=false;
                    },
                },
                mounted:function(){
                    this.getPageInfoList();//后台获取页面定义list
                    this.getInitComboList();//后台获取业务线List，任务名List，数据类型List
                    this.getPageDefineColumnCategory();//后台获取页面元素定义中所有分类（去重）
                    this.getMethodSpeCheckDefine();  //后台获取特殊校验方法List
                }
            });
