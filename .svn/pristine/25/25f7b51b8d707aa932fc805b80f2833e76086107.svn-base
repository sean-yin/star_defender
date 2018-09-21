package com.yixin.star.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.yixin.star.domain.EctActiveLog;
import com.yixin.star.dto.EctActiveLogDTO;

/**
 * Package : com.yixin.star.mapper
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 18:48
 */
@Mapper
public interface EctActiveLogMapper {
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

    int selectByParams(EctActiveLogDTO ectActiveLogDTO);

    /**
     * 查询线索id和订单id不全的情况
     * @param ectActiveLogDTO
     * @return
     */
    List<EctActiveLog> selectActivessByClueOrOrder(EctActiveLogDTO ectActiveLogDTO);

    int upodateEctActiveLog(EctActiveLog ectActiveLog);
}
