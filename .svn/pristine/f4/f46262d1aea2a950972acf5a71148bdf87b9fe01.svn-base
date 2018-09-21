package com.yixin.star.controller;

import com.yixin.common.utils.InvokeResult;
import com.yixin.star.dict.Dict;
import com.yixin.star.domain.ActiveDict;
import com.yixin.star.dto.ActiveDictDTO;
import com.yixin.star.service.ActiveDictService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Package : com.yixin.star.controller
 *
 * @author YixinCapital -- yinx
 *         2018/9/6 19:20
 */
@RestController
@RequestMapping(value = "/activeDictController")
public class ActiveDictController {
    private static Logger logger = LoggerFactory.getLogger(ActiveDictController.class);
    @Autowired
    private ActiveDictService activeDictService;

    @PostMapping("/findActiveDict")
    public InvokeResult<List<ActiveDict>> findActiveDict(String system){
        InvokeResult<List<ActiveDict>> invokeResult = new InvokeResult<>();
        try {
            ActiveDict dict = new ActiveDict();
            dict.setSystem(system);
            List<ActiveDict> dicts = activeDictService.findNginxDictsByType(dict);
            invokeResult.setData(dicts);
        } catch (Exception e) {
            logger.error("根据字典类型=={}==查询字典项异常",system,e);
            invokeResult.failure("查询动作集合异常");
        }
        return invokeResult;
    }

    /**
     * 根据type查询枚举集合
     * @param type
     * @return
     */
    @PostMapping("/searchDictsByType")
    public InvokeResult<List<ActiveDict>> searchDictsByType(String type){
        InvokeResult<List<ActiveDict>> invokeResult = new InvokeResult<>();
        try {
            List<ActiveDict> dictList = activeDictService.findDictsByType(type);
            invokeResult.setData(dictList);
        }  catch (Exception e) {
            logger.error("根据type=={}==查询枚举异常",type,e);
            invokeResult.failure("系统异常");
        }
        return invokeResult;
    }
}
