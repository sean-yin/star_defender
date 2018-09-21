package com.yixin.star.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.yixin.star.domain.ActiveDict;

/**
 * Package : com.example.star.mapper
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 18:48
 */
@Mapper
public interface ActiveDictMapper {
    List<ActiveDict> selectAllActive();

    List<ActiveDict> selectDictsByType(String activeType);

    List<ActiveDict> selectDictsByActive(ActiveDict activeDict);
}
