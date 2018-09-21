//
var vm=new Vue({
    el:'#app',
    data:{
        //主页面分类表单
        form:{
            system:'',
            activeId:'',
            countUnit:'',
            tp:'',
            countDate:''
        },
        systemList:[],
        activeDictList:[],
        countUnitList:[],
        TPList:[],
        mycharts:'',
        TPText:'',
        option:{
            title : {
                text: '性能数据（秒）'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['']
            },
            toolbox: {
                show : true,
                    feature : {
                    dataView : {show: true, readOnly: true},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'',
                    type:'bar',
                    data:[0, 0, 0 , 0, 0, 0],
                    markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name: '平均值'}
                        ]
                    }
                }
            ]
        },
        rules: {
            system: [
                { required: true, message: '请选择系统', trigger: 'change' }
            ],
            countUnit: [
                { required: true, message: '请选择统计单位', trigger: 'change' }
            ],
            tp: [
                { required: true, message: '请选择TP性能值', trigger: 'change' }
            ],
            countDate: [
                { required: true, message: '请选择统计开始日时', trigger: 'blur' }
            ],
        },
    },

    methods:{
        getAllSystem:function(){
            this.$http.post('/star-web/systemController/findSystems',{

            }).then(
                function(data){
                    var b = data.body.hasErrors;
                    if (!b) {
                        this.systemList = data.body.data;
                    }else{
                        errorMessage = data.body.errorMessage;
                        this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                    }
                },
                function(data){
                    this.$message({ showClose: true, message: '系统异常！', type: 'failure', duration:2000 });
                });

        },
        //根据系统选择动作
        getActionDictBySystem:function(){
            var loading = this.$loading({
                lock: true,
                text: '😀拼命加载中😍...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post('/star-web/activeDictController/findActiveDict',{
                system:this.form.system,
            }).then(
                function(data){
                    var b = data.body.hasErrors;
                    if (!b) {
                        this.activeDictList = data.body.data;
                    }else{
                        errorMessage = data.body.errorMessage;
                        this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                    }
                    loading.close();
                },
                function(data){
                    loading.close();
                    this.$message({ showClose: true, message: '获取动作集合失败！', type: 'failure', duration:2000 });
                });

        },
        getCountUnit:function(){
            this.$http.post('/star-web/activeDictController/searchDictsByType',{
                type:'count_unit',
            }).then(
                function(data){
                    console.log(data);
                    var b = data.body.hasErrors;
                    if (!b) {
                        this.countUnitList = data.body.data;
                    }else{
                        errorMessage = data.body.errorMessage;
                        this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                    }
                },
                function(data){
                    this.$message({ showClose: true, message: '获取动作集合失败！', type: 'failure', duration:2000 });
                });

        },
        changeCountDate:function () {
            if (this.form.countUnit == '1day') {
                if (this.form.countDate != '') {
                    this.form.countDate=this.form.countDate.substring(0,11) + '00:00:00';
                } else {
                    var date = new Date();
                    this.form.countDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00';
                }
            }
        },
        getTPList:function(){

            this.$http.post('/star-web/activeDictController/searchDictsByType',{
                type:'tp',
            }).then(
                function(data){
                    var b = data.body.hasErrors;
                    if (!b) {
                        this.TPList = data.body.data;
                    }else{
                        errorMessage = data.body.errorMessage;
                        this.$message({ showClose: true, message: errorMessage, type: 'failure', duration:2000 });
                    }
                },
                function(data){
                    this.$message({ showClose: true, message: '获取动作集合失败！', type: 'failure', duration:2000 });
                });

        },
        searchTP:function(formName){
            var flag = false;
            this.$refs[formName].validate(
                function (valid){
                if (valid) {
                    flag = true;
                } else {
                    return false;
                }
            });
            if (flag) {
                var loading = this.$loading({
                    lock: true,
                    text: '拼命加载中😍...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                Vue.http.options.emulateJSON = false;
                Vue.http.options.headers = {'Content-Type': 'application/json;charset=UTF-8'};
                this.$http.post('/star-web/systemController/getTPCount', {
                    system: this.form.system,
                    activeId: this.form.activeId,
                    countUnit: this.form.countUnit,
                    tp: this.form.tp,
                    countDate: this.form.countDate,
                    source:'tp'
                }).then(
                    function (data) {
                        var b = data.body.hasErrors;
                        if (!b) {
                            var chartdto = data.body.data;
                            var title = this.option.title;
                            title['text'] = chartdto.text + '性能数据（秒）';
                            this.option.title = title;
                            var legenddata = this.option.legend;
                            var legendArray = [];
                            legendArray.push(chartdto.text);
                            legenddata['data'] = legendArray;
                            this.option.legend = legenddata;
                            var xAxis = this.option.xAxis[0];
                            xAxis['data'] = chartdto.x;
                            var xAxisArray = [];
                            xAxisArray.push(xAxis);
                            this.option.xAxis = xAxisArray;
                            var series = this.option.series[0];
                            series['data'] = chartdto.y1;
                            series['name'] = chartdto.text;
                            var seriesArray = [];
                            seriesArray.push(series);
                            this.option.series = seriesArray;
                            this.initEcharts();
                        } else {
                            errorMessage = data.body.errorMessage;
                            this.$message({showClose: true, message: errorMessage, type: 'failure', duration: 2000});
                        }
                        loading.close();
                    },
                    function (data) {
                        loading.close();
                        this.$message({showClose: true, message: '系统异常！', type: 'failure', duration: 2000});
                    });
            }
        },
        initEcharts:function(){
            this.mycharts = echarts.init(document.getElementById('performanceChart'),'macarons');
            // 使用刚指定的配置项和数据显示图表。
            this.mycharts.setOption(this.option);
        },
    },
    mounted:function(){
        this.initEcharts();
        this.getAllSystem();
        this.getCountUnit();
        this.getTPList();
    }
});

