package com.yixin.star.domain;


import lombok.Data;

import java.util.Date;

/**
 * Package : com.yixin.star.domain
 *
 * @author YixinCapital -- yinx
 *         2018/9/5 20:23
 */
@Data
public class ClueOrderMap {
    private Long id;
    private Date createTime;
    private String clueId;
    private String orderId;
}
