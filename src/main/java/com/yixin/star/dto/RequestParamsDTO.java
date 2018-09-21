package com.yixin.star.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.yixin.common.utils.serializer.JsonDateTimeSerializer;
import lombok.Data;

import java.util.Date;

/**
 * Package : com.yixin.star.dto
 *
 * @author YixinCapital -- yinx
 *         2018/9/7 20:01
 */
@Data
public class RequestParamsDTO {
    /**
     * 系统
     */
    private String system;
    /**
     * 动作id
     */
    private String activeId;
    /**
     * 统计单位
     */
    private String countUnit;
    /**
     * tp值
     */
    private String tp;
    /**
     * 阈值
     */
    private String resqlimit;
    /**
     * 统计日期
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date countDate;

    /**
     * Dict.type=request_source
     */
    private String source;
}
