/*<![CDATA[*/
document.documentElement.style.fontSize = document.documentElement.clientWidth * 0.1 + 'px';
// 百度地图API功能
var map,local;
var vue = new Vue({
    el: '.contact',
    data:{
        dialogVisible:false,
        loginUser:{'id':$('#loginUserId').attr("bid"),'name':$('#loginUserName').attr("bid"),'contextPath':"/"},
        contact:{
            name:'',
                tel:'',
                address:'',
                detail:'',
                city:[],
            cityId:""
        },
        local:'',
            localCity:'',
            cityResList:[],
            resultLength:'',
            selCity:{},
            addRules:{
                contact:[
                    {type:'required', required:true, message:'请输入 联系人', trigger:'blur'},
                    {max:10, message:'联系人 最多输入50个字符', trigger:'blur'}
                ],
                loginName:[
                    {required:true, message:'请输入 联系电话', trigger:'blur'},
                    {type: "string",required:true, message:'用户名不能输入联系电话', trigger:'blur',pattern: /^[u4E00-u9FA5]+$/ },
                    {min:1, max:20, message:'联系电话 最多输入20个字符', trigger:'blur'}
                ]
            },//编辑用户变量
        localCityFilterable:true
    },
methods:{
    map:function(){
        var cityName =this.localCity;
        if(!cityName){
            this.$message({
                message: '请选择城市！',
                type: 'warning'
            });
            return ;
        }
        this.dialogVisible = true;
    },
    initmap:function(){
        var _this=this;

        function creatMap(){
            setTimeout(function(){
                map = new BMap.Map("allmap");    // 创建Map实例
                map.centerAndZoom(_this.localCity);          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);
                var geoc=new BMap.Geocoder();
                map.addEventListener("click",function(e){
                    var pt = e.point;
                    map.clearOverlays();
                    var marker = new BMap.Marker(pt);  // 创建标注
                    map.addOverlay(marker);
                    geoc.getLocation(pt, function(rs){
                        var addComp=rs.addressComponents;
                        _this.selCity={
                            title: '',
                            adress: addComp.province+addComp.city+addComp.district+addComp.street,
                            pointLat: pt.lat,
                            pointLng:pt.lng
                        }
                    });
                })

                local = new BMap.LocalSearch(map, {
                    location:'_this.localCity',
                    renderOptions:{
                        map: map,
                        panel:'res'
                    }
                })

                local.setSearchCompleteCallback(function(res){
                    if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                        _this.resultLength = res.getCurrentNumPois();
                        _this.cityResList = [];
                        for (var i = 0; i < res.getCurrentNumPois(); i++) {
                            _this.cityResList.push({
                                title: res.getPoi(i).title,
                                adress: res.getPoi(i).address,
                                point: res.getPoi(i).point
                            });
                        }
                    }
                })
            },100)
        }

        if(this.localCity==''){
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                var address = r.address;
                _this.localCity=address.city;
                creatMap();
            });
        }else{
            creatMap();
        }

    },
    search:function(val){
        local.search(val);
    },
    handList:function(item){
        console.log(item);
        this.selCity=item;
        this.dialogVisible=false;

        this.selCity.pointLat=item.point.lat;
         this.selCity.pointLng=item.point.lng;

    },

    //-----------------------自己写的js----------------------------------

    cityIdChange:function (v) {
        // this.contact.cityId=v;
        // console.log(v.idAttr);
    },

    goToOrderFun:function () {

        //联系人验证
        var cname = this.contact.name;
        if(!cname){
            this.$message({
                message: '联系人不能为空！',
                type: 'warning'
            });
            return ;
        }

        //手机号验证
        var tel =this.contact.tel;
        if(!tel){
            this.$message({
                message: '联系电话不能为空！',
                type: 'warning'
            });
            return ;
        }

       var reg =/^1[34578]\d{9}$/;

        if (!reg.test(tel)) {
            this.$message.error('手机号不正确!');
            return false;
        }

        //城市地址
        var cityName = this.localCity;
        if(!cityName){
            this.$message({
                message: '城市不能为空！',
                type: 'warning'
            });
            return ;
        }

        //服务地址
        var address = this.selCity.adress;
        if(!address){
            this.$message({
                message: '服务地址不能为空！',
                type: 'warning'
            });
            return ;
        }

        //判断地图中选的城市地址跟城市列表中选的地址不一致的问题
        //目前考虑的有 ‘青岛黄岛’ 等特殊城市，故这么处理
        if(!cityName.substr(0,2)){
            console.log('cityName='+cityName,+'cityName.substr(0,2)='+cityName.substr(0,2));
        }else{
            if(address.indexOf('市') != -1){
                if(address.indexOf(cityName.substr(0,2)) == -1){
                    this.$message({
                        message: '所选的服务地址与城市不匹配！',
                        type: 'warning'
                    });
                    return  false;
                }
            }

        }

        //详细地址，门牌号
        var detail = this.contact.detail;
        if(!detail){
            this.$message({
                message: '详细地址不能为空！',
                type: 'warning'
            });
            return ;
        }


        //lng,lat
        var lng =this.selCity.pointLng;
        var lat = this.selCity.pointLat;
        if(!lng||!lat){
            this.$message({
                message: '经纬度没有获取到！',
                type: 'warning'
            });
            return ;
        }

        var cityId = "";
        for (var a in this.contact.city){
            if(this.contact.city[a].name==this.localCity){
                cityId=this.contact.city[a].id;
            }
        }

        this.$http.post( "saveAddress?address="+address+"&name="+cname+"&tel="+tel+
                "&cityName="+cityName+
                "&pointLng="+lng+
                "&pointLat="+lat+
                "&detail="+detail+
                "&cityId="+cityId
            ,
            {
            // address:this.selCity.adress,
            // name:this.contact.name,
            // tel:this.contact.tel,
            // cityName:this.localCity,
            // pointLng:this.selCity.pointLng,
            // pointLat:this.selCity.pointLat,
            // detail:this.contact.detail
        }).then(function(data){
            console.log(data.data);
            if(data.data.resCode==200){

                document.location.href='/placeOrder/orderPage'
            }else{
                this.$message({
                    message: data.data.msg,
                    type: 'warning'
                });
                return false;
            }
        },function(data){
            this.$message({
                message: data.data.msg,
                type: 'warning'
            });
            return false;
        });
    }
},
});

    //load
    vue.$http.post('../placeOrder/loadCity?_='+Math.random(), {}).then(function(response){
    var result=response.body;
    if(result.code==1){
        vue.contact.city=result.cityList;
    }else{
        vue.$alert("操作失败,参考信息:{code:"+result.code+",msg:"+result.msg+"}", '提示');
    }
    //vue.$alert(data, '提示');
}, function(response){
    vue.$alert("操作失败,参考信息:"+response,'警告');
});


/*]]>*/