package com.yixin.star.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.yixin.common.utils.serializer.JsonDateTimeSerializer;
import lombok.Data;

import java.util.Date;

/**
 * Package : com.yixin.star.domain
 *
 * @author YixinCapital -- yinx
 *         2018/9/5 20:23
 */
@Data
public class ClueOrderMapDTO {
    private Long id;
    private String clueId;
    private String orderId;
    /**
     * 查询范围最大时间
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date lteCreateTime;
    /**
     * 查询范围最小时间
     */
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date gteCreateTime;
    @JsonSerialize(using = JsonDateTimeSerializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    private Date createTime;
}
