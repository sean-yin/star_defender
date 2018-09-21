document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.1 + 'px';
var timer = null;
var n;
var vue = new Vue({
    el: '.helpguest',
    data: {
        loginUser: {'id': $('#loginUserId').attr("bid"), 'name': $('#loginUserName').attr("bid"), 'contextPath': "/"},
        workOrderNo:"",
        modalFalse:false,
        escapeFalse:false,
        timeFormShowOrHidden: false,
        selectAppointmentTimePage: [],
        act: false,
        dialogVisible: false,
        dialogVisible1: false,
        project: {
            workDate: "",
            workTime: "",
            bigServiceList: [],
            bigClassId: "",
            deviceList: [],
            deviceId: "",
            serviceClassList: [],
            serviceClassId: "",
            serviceItemList: [],
            serviceItemId: "",
            radio: '1',
            textarea: '',
            faultDesc:'',
            tarea: 0,
            leng: 100
        },
        cacheData: {},
        list: [
            // {
            // 	active:true,
            //    	text:'明天',
            //    	appoTime: '03-12'
            // }
        ],
        timeTable: {
            result: 200,
            arr: [
                // {
                // 	show:false,
                // 	startTime:'11',
                // 	optionalState:'1'
                // }
            ]
        }
    },
    methods: {
        handleClose:function(done) {

        },
        countNumFacus: function () {
            var _this = this
            timer = setInterval(function () {
                _this.project.tarea = _this.project.faultDesc.length;
                n = _this.project.leng - _this.project.tarea
                if (n == 0) {
                    clearInterval(timer);
                }
            }, 100);

        },
        countNumBlur: function () {
            clearInterval(timer);
        },
        check: function () {
            this.dialogVisible = true

            var serviceClassId = this.project.serviceClassId;
            var bigClassId = this.project.bigClassId;
            this.$http.post("againChoose?serviceClassId=" + serviceClassId + "&bigClassId=" + bigClassId,
                {}).then(function (data) {

                    if (data.data.code != 200) {
                        this.$alert(data.data.msg);
                        return;
                    } else {

                    this.list = data.data.getTimeListHead;

                    var yearDate = "" + this.list[0].year + "-" + this.list[0].date + "";

                    this.timeTable.arr = data.data.selectAppointmentTime[yearDate];

                    this.selectAppointmentTimePage = data.data.selectAppointmentTime;

                    }
            }, function (data) {
                this.$alert("操作失败,获取推荐时间异常", '提示');
                return;
            });


            if(this.list.length<=3){
                setTimeout(function(){
                    var list1  =document.getElementsByClassName('list1')
                    for(var i=0;i<list1.length;i++){
                        list1[i].style.width='33.33%'
                    }
                },0)
            }

        },
        closeFn: function (done) {
            this.dialogVisible = false
        },
        onClick: function (item) {
            for (var i = 0; i < this.list.length; i++) {
                this.list[i].active = false;
                this.list[i].show1 = false;
            }
            item.active = true;
            var yearDate = "" + item.year + "-" + item.date + "";
            this.project.workDate = yearDate;
            this.timeTable.arr = this.selectAppointmentTimePage[yearDate];
        },
        getindex: function (todo, index) {
            if (todo.optionalState != 1) {
                for (var i = 0; i < this.timeTable.arr.length; i++) {
                    this.timeTable.arr[i].show = false;
                }
                todo.show = true;
                this.dialogVisible = false

                this.project.workTime = todo.startTime + "~" + todo.endTime;

                //lock----------------------------
                var bigClassId = this.project.bigClassId;
                var serviceClassId = this.project.serviceClassId;
                var workDate = this.project.workDate;
                this.$http.post('lockEmp?_=' + Math.random() + "&bigClassId=" + bigClassId + "&workerDate=" + workDate + "&serviceClassId=" +
                    serviceClassId + "&startTime=" + todo.startTime + "&endTime=" + todo.endTime, {}).then(function (response) {
                    var result = response.body;
                    if (result.code == 200) {
                    } else {
                        this.$alert("操作失败,参考信息:{code:" + result.code + ",msg:" + result.msg + "}", '提示');
                    }
                }, function (response) {
                    this.$alert("操作失败,参考信息:" + response, '警告');
                });

            }

        },
        submit: function () {

            var deviceId = this.project.deviceId;
            var bigClassId = this.project.bigClassId;
            var serviceClassId = this.project.serviceClassId;
            var workDate = this.project.workDate;
            var bearTheCost = this.project.radio;
            var serviceItemId = this.project.serviceItemId;
            var faultDesc = this.project.faultDesc;
            var workTime = this.project.workTime;

            if(!workTime){
                this.$message({
                    message: '警告哦，推荐时间为空!',
                    type: 'warning'
                });
                return ;
            }

            var startTime = workTime.split("~")[0];
            var endTime = workTime.split("~")[1];

            if(!serviceItemId){
                this.$message({
                    message: '警告哦，请选择服务品类!',
                    type: 'warning'
                });
                return ;
            }

            this.$http.post('doOrder?_=' + Math.random() + "&deviceId=" + deviceId +
                "&bigClassId=" + bigClassId + "&workDate=" + workDate + "&bearTheCost=" +
                bearTheCost + "&serviceClassId=" + serviceClassId + "&serviceItemId=" +
                serviceItemId + "&startTime=" + startTime + "&endTime=" + endTime+"&faultDesc="+faultDesc, {}).then(function (response) {
                var result = response.body;
                if (result.code == 200) {
                    this.dialogVisible1 = true;
                    vue.workOrderNo = result.workOrderNo;
                } else {
                    this.$alert(result.msg,"温馨提示");
                }
            }, function (response) {
                this.$alert("操作失败,参考信息:" + response, '警告');
            });

        },

        //浅拷贝
        lightClone: function (obj) {
            var nObj;
            if (obj == null) {
                nObj = obj;
            } else {
                nObj = {};
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        nObj[k] = obj[k];
                    }
                }
            }
            return nObj;
        },

        //-----------------------------------------

        //服务大类值改变
        bigClassChange: function (val) {

            //清空
            this.project.deviceList.splice(0, this.project.deviceList.length);
            this.project.serviceClassList.splice(0, this.project.serviceClassList.length);
            this.project.serviceItemList.splice(0, this.project.serviceItemList.length);

            this.project.deviceId = "";
            this.project.serviceClassId = "";
            this.project.serviceItemId = "";
            if (val != null && val != "") {
                for (var i = 0; i < this.cacheData.deviceList.length; i++) {
                    var devObj = this.cacheData.deviceList[i];
                    if (val == devObj.parentId) {
                        console.log(val);
                        this.project.deviceList.push(this.lightClone(devObj));
                    }
                }
                //默认选中第一项
                if (this.project.serviceClassList.length == 1) {
                    this.project.serviceClassId = this.project.serviceClassList[0].id;
                }
                //默认选中第一项
                if (this.project.deviceList.length == 1) {
                    this.project.deviceId = this.project.deviceList[0].id;
                }
                //默认选中第一项
                if (this.project.serviceItemList.length ==1) {
                    this.project.serviceItemId = this.project.serviceItemList[0].id;
                }
            }else{
                this.timeFormShowOrHidden=false;
            }
        },

        //设备改变
        deviceChange: function (val) {
            //清空
            this.project.serviceClassList.splice(0, this.project.serviceClassList.length);
            this.project.serviceItemList.splice(0, this.project.serviceItemList.length);
            this.project.serviceClassId = "";
            this.project.serviceItemId = "";

            if (val != null && val != "") {
                var scList3 = this.cacheData.serviceClassList;
                for (var i = 0; i < scList3.length; i++) {
                    var devObj2 = this.cacheData.serviceClassList[i];
                    if (devObj2.parentId == val) {
                        this.project.serviceClassList.push(this.lightClone(scList3[i]));
                    }
                }
                //默认选中第一项
                if (this.project.serviceClassList.length ==1) {
                    this.project.serviceClassId = this.project.serviceClassList[0].id;
                }
                //默认选中第一项
                if (this.project.serviceItemList.length ==1) {
                    this.project.serviceItemId = this.project.serviceItemList[0].id;
                }
            }
        },

        //品类改变
        serviceClassChange: function (val) {
            //清空
            this.project.serviceItemList.splice(0, this.project.serviceItemList.length);
            this.project.serviceItemId = "";
            if (val != null && val != "") {
                var scList3 = this.cacheData.serviceItemList;
                for (var i = 0; i < scList3.length; i++) {
                    var devObj2 = this.cacheData.serviceItemList[i];
                    if (devObj2.parentId == val) {
                        this.project.serviceItemList.push(this.lightClone(scList3[i]));
                    }
                }
                //默认选中第一项
                if (this.project.serviceItemList.length ==1) {
                    this.project.serviceItemId = this.project.serviceItemList[0].id;
                }
            }
        },

        //服务项目改变
        serviceItemChange: function (val) {

            if (val != null && val != "") {
                var serviceClassId = this.project.serviceClassId;
                var bigClassId = this.project.bigClassId;

                this.$http.post("serviceItemChange?serviceClassId=" + serviceClassId + "&bigClassId=" + bigClassId,
                    {}).then(function (data) {
                    if (data.data.code != 200) {
                        this.$alert(data.data.msg);
                        return;
                    } else {
                        this.timeFormShowOrHidden = true;
                        this.project.workDate = data.data.recommendTime.data.workDate
                        this.project.workTime = data.data.recommendTime.data.workTime
                    }

                }, function (data) {
                    this.$alert("操作失败,获取推荐时间异常", '提示');
                    return;
                });
            }
        },

        initBigServiceList: function () {

            this.$http.post('selectServices?_=' + Math.random(), {}).then(function (response) {
                var result = response.body;
                if (result.code == 200) {
                    //缓存数据
                    this.cacheData.bigServiceList = result.bigServiceList;
                    this.cacheData.deviceList = result.deviceList;
                    this.cacheData.serviceClassList = result.serviceClassList;
                    this.cacheData.serviceItemList = result.serviceItemList;

                    for (var i = 0; i < this.cacheData.bigServiceList.length; i++) {
                        var obj = this.cacheData.bigServiceList[i];
                        this.project.bigServiceList.push(this.lightClone(obj));
                    }

                    //如果数组只有一个去掉请选择
                    if(result.bigServiceList.length==1){
                        this.project.bigClassId = this.project.bigServiceList[0].id;
                    }

                } else {
                    this.$alert("操作失败,参考信息:{code:" + result.code + ",msg:" + result.msg + "}", '提示');
                }
                //vue.$alert(data, '提示');
            }, function (response) {
                this.$alert("操作失败,参考信息:" + response, '警告');
            });

        }


    }

})

vue.initBigServiceList();