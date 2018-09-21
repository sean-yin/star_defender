package com.yixin.star.domain;

import java.util.Date;

import lombok.Data;

/**
 * 动作日志对象
 * Package : com.example.star.domain
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 17:58
 */
@Data
public class EctActiveLog {
    /**
     * 主键id
     */
    private Long id;
    /**
     * 订单id
     */
    private String orderId;
    /**
     * 線索id
     */
    private String clueId;
    /**
     * 行为id
     */
    private String activeId;
    /**
     * 触发动作时间
     */
    private Date activeTime;
}
