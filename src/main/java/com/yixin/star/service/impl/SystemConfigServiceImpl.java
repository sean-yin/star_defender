package com.yixin.star.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.yixin.star.domain.SystemConfig;
import com.yixin.star.mapper.SystemConfigMapper;
import com.yixin.star.service.SystemConfigService;

@Service("systemConfigService")
public class SystemConfigServiceImpl implements SystemConfigService{

    @Autowired
    private SystemConfigMapper systemConfigMapper;

    @Override
    public List<SystemConfig> findAllSystem() {
        return systemConfigMapper.findAllSystemConfig();
    }

    @Override
    public int insert(SystemConfig systemConfig){
        return systemConfigMapper.insert(systemConfig);
    }

    @Override
    public int insertSelective(SystemConfig systemConfig){
        return systemConfigMapper.insertSelective(systemConfig);
    }

    @Override
    public int insertList(List<SystemConfig> systemConfigs){
        return systemConfigMapper.insertList(systemConfigs);
    }

    @Override
    public int update(SystemConfig systemConfig){
        return systemConfigMapper.update(systemConfig);
    }

    @Override
    public List<SystemConfig> findBySystem(String system) {
        return systemConfigMapper.findBySystem(system);
    }
}
