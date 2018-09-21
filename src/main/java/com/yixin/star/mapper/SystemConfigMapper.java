package com.yixin.star.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import com.yixin.star.domain.SystemConfig;

/**
 * @date 2018-09-07
 * @author yinx
 */
@Mapper
public interface SystemConfigMapper {
    List<SystemConfig> findAllSystemConfig();

    int insert(@Param("systemConfig") SystemConfig systemConfig);

    int insertSelective(@Param("systemConfig") SystemConfig systemConfig);

    int insertList(@Param("systemConfigs") List<SystemConfig> systemConfigs);

    int update(@Param("systemConfig") SystemConfig systemConfig);

    List<SystemConfig> findBySystem(@Param("system")String system);



}
