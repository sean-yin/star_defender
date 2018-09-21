package com.yixin.star.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.yixin.common.utils.serializer.JsonDateTimeSerializer;

import lombok.Data;

/**
 * Package : com.yixin.star.dto
 *
 * @author YixinCapital -- yinx
 *         2018/9/4 15:01
 */
@Data
public class EctActiveLogDTO {
    /**
     * 主键id
     */
    private Long id;
    /**
     * 订单id
     */
    private String orderId;
    /**
     * 线索id
     */
    private String clueId;
    /**
     * 行为id
     */
    private String activeId;
    /**
     * 触发动作时间
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date activeTime;
    /**
     * 小于
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date lteActiveTime;
    /**
     * 大于
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date gteActiveTime;
}
