package com.yixin.star.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.yixin.star.dict.Dict;
import com.yixin.star.domain.SystemConfig;
import com.yixin.star.service.SystemConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yixin.star.domain.ActiveDict;
import com.yixin.star.mapper.ActiveDictMapper;
import com.yixin.star.service.ActiveDictService;

/**
 * Package : com.yixin.star.service.impl
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 20:31
 */
@Service("activeDictService")
public class ActiveDictServiceImpl implements ActiveDictService {
    @Autowired
    private ActiveDictMapper activeDictMapper;
    @Autowired
    private SystemConfigService systemConfigService;
    /**
     * 获取所有动作
     *
     * @return
     */
    @Override
    public List<ActiveDict> findAll() {
        return activeDictMapper.selectAllActive();
    }

    /**
     * 根据类型查询字典集合
     * @param activeDict
     * @return
     */
    @Override
    public List<ActiveDict> selectDictsByActive(ActiveDict activeDict) {
        return activeDictMapper.selectDictsByActive(activeDict);
    }

    /**
     * 根据type查询Dict
     * @param type
     * @return
     */
    @Override
    public List<ActiveDict> findDictsByType(String type) {
        List<Dict> dictList = Dict.getDictsByType(type);
        List<ActiveDict> activeDictList = new ArrayList<>();
        dictList.stream().forEach(dict -> {
            ActiveDict activeDict = new ActiveDict();
            activeDict.setActiveId(dict.getCode());
            activeDict.setActiveName(dict.getName());
            activeDictList.add(activeDict);
        });
        return activeDictList;
    }

    @Override
    public List<ActiveDict> findNginxDictsByType(ActiveDict activeDict) {
        List<SystemConfig> systemConfigList = systemConfigService.findBySystem(activeDict.getSystem());
        activeDict.setActiveType(systemConfigList.get(0).getEsNginxLogType());
        return selectDictsByActive(activeDict);
    }
}
