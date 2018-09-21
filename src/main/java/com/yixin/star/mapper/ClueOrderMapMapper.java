package com.yixin.star.mapper;

import java.util.List;

import com.yixin.star.domain.ClueOrderMap;
import com.yixin.star.dto.ClueOrderMapDTO;
import org.apache.ibatis.annotations.Mapper;

import com.yixin.star.domain.ActiveDict;

/**
 * Package : com.example.star.mapper
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 18:48
 */
@Mapper
public interface ClueOrderMapMapper {
    int addMap(ClueOrderMap clueOrderMap);
    List<ClueOrderMap> selectByParams(ClueOrderMapDTO clueOrderMapDTO);
}
