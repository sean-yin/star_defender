package com.yixin.star.controller;

import java.util.List;

import com.yixin.star.domain.SystemConfig;
import com.yixin.star.service.SystemConfigService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yixin.common.utils.InvokeResult;
import com.yixin.star.domain.ActiveDict;
import com.yixin.star.service.ActiveDictService;

/**
 * Package : com.yixin.star.controller
 *
 * @author YixinCapital -- yinx
 *         2018/9/6 19:20
 */
@RestController
@RequestMapping(value = "/systemController")
public class SystemController {
    private static Logger logger = LoggerFactory.getLogger(SystemController.class);
    @Autowired
    private SystemConfigService systemConfigService;

    @PostMapping("/findSystems")
    public InvokeResult<List<SystemConfig>> findAllSystem() {
        InvokeResult<List<SystemConfig>> invokeResult = new InvokeResult<>();
        try {
            List<SystemConfig> systems = systemConfigService.findAllSystem();
            invokeResult.setData(systems);
        } catch (Exception e) {
            logger.error("根据系统列表异常", e);
            invokeResult.failure("系统异常");
        }
        return invokeResult;
    }
}
