package com.yixin.star.service;

import java.util.List;

import com.yixin.star.domain.EctActiveLog;
import com.yixin.star.dto.EctActiveLogDTO;

/**
 * Package : com.example.star.service
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 18:49
 */

public interface EctActiveLogService {
    /**
     * 根据参数查询条数
     * @param ectActiveLogDTO
     * @return
     */
    int searchByParams(EctActiveLogDTO ectActiveLogDTO);
    /**
     * 单条插入
     * @param ectActiveLog
     * @return
     */
    int addActive(EctActiveLog ectActiveLog);

    /**
     * 批量插入
     * @param ectActiveLogs
     * @return
     */
    int batchAddActive(List<EctActiveLog> ectActiveLogs);

    /**
     * 查询所有动作并插入表
     * @return
     */
    int searchAndCreateActiveLog();

    /**
     * 查询线索id和订单id不全的情况
     * @param ectActiveLogDTO
     * @return
     */
    List<EctActiveLog> selectActivessByClueOrOrder(EctActiveLogDTO ectActiveLogDTO);

    int upodateEctActiveLog(EctActiveLog ectActiveLog);
}
