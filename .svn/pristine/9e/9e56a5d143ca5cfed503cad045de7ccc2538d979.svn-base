package com.yixin.star.controller;

import com.yixin.common.utils.InvokeResult;
import com.yixin.star.dto.EchartsDataDTO;
import com.yixin.star.dto.RequestParamsDTO;
import com.yixin.star.service.SystemConfigService;
import com.yixin.star.service.SystemPerformanceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Package : com.yixin.star.controller
 *
 * @author YixinCapital -- yinx
 *         2018/9/7 20:16
 */
@Controller
@RequestMapping("/systemController")
public class SystemPerformanceController {
    private static Logger logger = LoggerFactory.getLogger(SystemPerformanceController.class);
    @Autowired
    private SystemPerformanceService systemPerformanceService;

    /**
     * TP性能统计
     * @return
     */
    @PostMapping("/getTPCount")
    @ResponseBody
    public InvokeResult<EchartsDataDTO> getTPCount(@RequestBody RequestParamsDTO requestParamsDTO){
        InvokeResult<EchartsDataDTO> invokeResult= new InvokeResult<>();
        try {
            EchartsDataDTO echartsDataDTO = systemPerformanceService.getTPCount(requestParamsDTO);
            invokeResult.setData(echartsDataDTO);
        } catch (Exception e) {
            logger.error("查询异常",e);
            invokeResult.failure("系统异常");
        }
        return invokeResult;
    }

    /**
     * 动作操作次数统计
     * @return
     */
    @PostMapping("/getActiveNumCount")
    public EchartsDataDTO getActiveNumCount(){
        return null;
    }

    /**
     * 操作时长统计
     * @return
     */
    @PostMapping("/getOperateDateLengthCount")
    public EchartsDataDTO getOperateDateLengthCount(){
        return null;
    }

    /**
     * 超出阈值统计
     * @return
     */
    @PostMapping("/getOverTopCount")
    public EchartsDataDTO getOverTopCount(){
        return null;
    }

    /**
     * 访问失败次数统计
     * @return
     */
    @PostMapping("/getRequestFailCount")
    public EchartsDataDTO getRequestFailCount(){
        return null;
    }
}
