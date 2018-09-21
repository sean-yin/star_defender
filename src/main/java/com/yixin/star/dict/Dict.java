package com.yixin.star.dict;

import java.util.ArrayList;
import java.util.List;

/**
 * Package : com.yixin.star.dict
 *
 * @author YixinCapital -- yinx
 *         2018/9/11 16:35
 */
public enum Dict {
    TP50("tp50","TP50","tp"),
    TP90("tp90","TP90","tp"),
    FIVE_MINUTE("5minute","五分钟","count_unit"),
    TEN_MINUTE("10minute","十分钟","count_unit"),
    ONE_HOUR("1hour","一小时","count_unit"),
    ONE_DAY("1day","一天","count_unit"),
    REQUEST_SOURCE_TP("tp","统计TP性能","request_source"),
    REQUEST_SOURCE_VISITIS("visitis","访问次数","request_source"),
    REQUEST_SOURCE_OPERATE_LEN("operateLen","操作时长统计","request_source"),
    REQUEST_SOURCE_OVER_LIMIT("limitCount","超出阈值统计","request_source"),
    REQUEST_SOURCE_FAIL("failCount","访问失败统计","request_source");
    private String code;

    private String name;

    private String type;

    public static List<Dict> getDictsByType(String type){
        List<Dict> dicts = new ArrayList<Dict>();
        for (int i = 0; i < Dict.values().length; i++) {
            Dict dict = Dict.values()[i];
            if (dict.getType().equals(type)) {
                dicts.add(dict);
            }
        }

        return dicts;
    }
    public static String getDictsByTypeAndCode(String type,String code){
        String name = "";
        for (int i = 0; i < Dict.values().length; i++) {
            Dict dict = Dict.values()[i];
            if (dict.getType().equals(type) && dict.getCode().equals(code)) {
                name = dict.getName();
            }
        }

        return name;
    }

    private Dict() {
    }

    private Dict(String code, String name,String type) {
        this.name = name;
        this.code = code;
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
