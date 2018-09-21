package com.yixin.star.service.impl;

import com.yixin.star.domain.ClueOrderMap;
import com.yixin.star.dto.ClueOrderMapDTO;
import com.yixin.star.mapper.ClueOrderMapMapper;
import com.yixin.star.service.ClueOrderMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Package : com.yixin.star.service.impl
 *
 * @author YixinCapital -- yinx
 *         2018/9/5 20:49
 */
@Service("clueOrderMapService")
public class ClueOrderMapServiceImpl implements ClueOrderMapService {
    @Autowired
    private ClueOrderMapMapper clueOrderMapMapper;

    @Override
    public int insetClueOrderMap(ClueOrderMap clueOrderMap) {
        return clueOrderMapMapper.addMap(clueOrderMap);
    }

    @Override
    public List<ClueOrderMap> queryClueOrderMap(ClueOrderMapDTO clueOrderMapDTO) {
        return clueOrderMapMapper.selectByParams(clueOrderMapDTO);
    }
}
