package com.yixin.star.service;

import com.yixin.star.domain.ClueOrderMap;
import com.yixin.star.dto.ClueOrderMapDTO;

import java.util.List;

/**
 * Package : com.yixin.star.service
 *
 * @author YixinCapital -- yinx
 *         2018/9/5 20:46
 */
public interface ClueOrderMapService {
    int insetClueOrderMap(ClueOrderMap clueOrderMap);
    List<ClueOrderMap> queryClueOrderMap(ClueOrderMapDTO clueOrderMapDTO);
}
