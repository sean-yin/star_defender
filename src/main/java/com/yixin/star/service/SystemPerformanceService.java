package com.yixin.star.service;

import com.yixin.star.dto.EchartsDataDTO;
import com.yixin.star.dto.RequestParamsDTO;

/**
 * Package : com.yixin.star.service.impl
 *
 * @author YixinCapital -- yinx
 *         2018/9/7 19:27
 */
public interface SystemPerformanceService {
    EchartsDataDTO getTPCount(RequestParamsDTO requestParamsDTO);
}
