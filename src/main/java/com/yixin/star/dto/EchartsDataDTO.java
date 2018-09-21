package com.yixin.star.dto;

import lombok.Data;

import java.util.List;

/**
 * Package : com.yixin.star.dto
 *
 * @author YixinCapital -- yinx
 *         2018/9/7 19:57
 */
@Data
public class EchartsDataDTO {
    /**
     * 图表标题
     */
    private String text;
    /**
     * x轴
     */
    private String[] x;
    /**
     * y轴1
     */
    private Double[] y1;
    /**
     * y轴2
     */
    private Double[] y2;
    /**
     * y轴3
     */
    private Double[] y3;
}
