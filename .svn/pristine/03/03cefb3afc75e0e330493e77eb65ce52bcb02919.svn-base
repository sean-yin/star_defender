package com.yixin.star.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

import com.google.common.util.concurrent.ThreadFactoryBuilder;
import com.yixin.star.domain.ClueOrderMap;
import com.yixin.star.domain.SystemConfig;
import com.yixin.star.dto.ClueOrderMapDTO;
import com.yixin.star.service.ClueOrderMapService;
import com.yixin.star.service.SystemConfigService;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yixin.star.ElasticClient;
import com.yixin.star.domain.ActiveDict;
import com.yixin.star.domain.EctActiveLog;
import com.yixin.star.dto.EctActiveLogDTO;
import com.yixin.star.mapper.EctActiveLogMapper;
import com.yixin.star.service.ActiveDictService;
import com.yixin.star.service.EctActiveLogService;
import com.yixin.star.utils.StarDateUtils;

/**
 * Package : com.example.star.service
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 18:49
 */
@Service("ectActiveLogService")
public class EctActiveLogServieImpl implements EctActiveLogService {
    Logger logger = LoggerFactory.getLogger(EctActiveLogServieImpl.class);
    @Autowired
    private EctActiveLogMapper ectActiveLogMapper;
    @Autowired
    private ActiveDictService activeDictService;
    @Autowired
    private ClueOrderMapService clueOrderMapService;
    @Autowired
    private SystemConfigService systemConfigService;
    @Autowired
    private ElasticClient elasticClient;

    /**
     * 根据参数查询条数
     *
     * @param ectActiveLogDTO
     * @return
     */
    @Override
    public int searchByParams(EctActiveLogDTO ectActiveLogDTO) {
        return ectActiveLogMapper.selectByParams(ectActiveLogDTO);
    }

    /**
     * 单条插入
     *
     * @param ectActiveLog
     * @return
     */
    @Override
    public int addActive(EctActiveLog ectActiveLog) {
        return ectActiveLogMapper.addActive(ectActiveLog);
    }

    /**
     * 批量插入
     *
     * @param ectActiveLogs
     * @return
     */
    @Override
    public int batchAddActive(List<EctActiveLog> ectActiveLogs) {
        return ectActiveLogMapper.batchAddActive(ectActiveLogs);
    }

    /**
     * 查询线索id和订单id不全的情况
     *
     * @param ectActiveLogDTO
     * @return
     */
    @Override
    public List<EctActiveLog> selectActivessByClueOrOrder(EctActiveLogDTO ectActiveLogDTO) {
        return ectActiveLogMapper.selectActivessByClueOrOrder(ectActiveLogDTO);
    }

    @Override
    public int upodateEctActiveLog(EctActiveLog ectActiveLog) {
        return ectActiveLogMapper.upodateEctActiveLog(ectActiveLog);
    }

    /**
     * 查询所有动作并插入表
     *
     * @return
     */
    @Override
    public int searchAndCreateActiveLog() {
        StringBuilder indexName = new StringBuilder();
        StringBuilder system = new StringBuilder("ect");
        List<SystemConfig> systemConfigList = systemConfigService.findBySystem("ect");

        if (CollectionUtils.isNotEmpty(systemConfigList)) {
            /**
             * ps : yidaitong_logs-2018-09-05
             */
            indexName.append(systemConfigList.get(0).getEsSystemLogPrefix()).
                    append(StarDateUtils.dateToStr(StarDateUtils.getNDay(new Date(),-1),"yyyy-MM-dd"));
        }
        ActiveDict dict = new ActiveDict();
        dict.setSystem(system.toString());
        dict.setActiveType(systemConfigList.get(0).getEsSystemLogType());
        List<ActiveDict> activeDictList = activeDictService.selectDictsByActive(dict);
        List<String> actives = new ArrayList<>();
        activeDictList.stream().forEach(active -> {
            actives.add(active.getActiveId());
        });
        boolean searchFlag = true;
        //查询初始值
        int from = 0;
        //每次查询条数
        int size = 100;
        while (searchFlag) {
            SearchResponse response = elasticClient.searchMessageByParams(indexName.toString(),systemConfigList.get(0).getEsSystemLogType(),actives,from,size);
            SearchHits hits = response.getHits();
            SearchHit[] searchHits = hits.getHits();
            logger.info("本次获取到日志条数--{}/日志总条数--{}",searchHits.length,hits.totalHits);
            if (searchHits.length==0) {
                searchFlag = false;
            }
            for (SearchHit searchHit:searchHits) {
                Map<String,Object> map = searchHit.getSourceAsMap();
                String message = map.get("message").toString();
                logger.info("获取日志======={}",message);
                if (message.indexOf("orderID")==0&&message.indexOf("-clueId")>0) {
                    String orderId = StringUtils.substringBetween(message,":","-");
                    String clueId = message.substring(message.indexOf("-")+8,message.indexOf("_"));
                    if (StringUtils.isNotBlank(orderId)||StringUtils.isNotBlank(clueId)) {
                        if (StringUtils.isNotBlank(orderId)&&StringUtils.isNotBlank(clueId)) {
                            ClueOrderMapDTO clueOrderMapDTO = new ClueOrderMapDTO();
                            clueOrderMapDTO.setClueId(clueId);
                            List<ClueOrderMap> clueOrderMap1 = clueOrderMapService.queryClueOrderMap(clueOrderMapDTO);
                            if (CollectionUtils.isEmpty(clueOrderMap1)) {
                                logger.info("开始插入map表");
                                ClueOrderMap clueOrderMap = new ClueOrderMap();
                                clueOrderMap.setClueId(clueId);
                                clueOrderMap.setOrderId(orderId);
                                clueOrderMap.setCreateTime(new Date());
                                clueOrderMapService.insetClueOrderMap(clueOrderMap);
                            }
                        } else {
                            logger.info("存在一个 开始赋值");
                            ClueOrderMapDTO clueOrderMapDTO = new ClueOrderMapDTO();
                            clueOrderMapDTO.setClueId(clueId);
                            clueOrderMapDTO.setOrderId(orderId);
                            List<ClueOrderMap> clueOrderMap1 = clueOrderMapService.queryClueOrderMap(clueOrderMapDTO);
                            if (CollectionUtils.isNotEmpty(clueOrderMap1)) {
                                orderId = clueOrderMap1.get(0).getOrderId();
                                clueId = clueOrderMap1.get(0).getClueId();
                            }
                        }
                        String dateStr = StringUtils.substringBetween(message,"_",".");
                        String action = StringUtils.substringBetween(message,"<",">");
                        Date activeDate = StarDateUtils.strToDate(dateStr);
                        EctActiveLog activeLog = new EctActiveLog();
                        activeLog.setOrderId(orderId);
                        activeLog.setClueId(clueId);
                        activeLog.setActiveId(action);
                        activeLog.setActiveTime(activeDate);
                        int insertId = addActive(activeLog);
                    } else {
                        logger.error("动作日志---{}---没有传入订单号",message);
                    }
                } else {
                    logger.error("orderID所在位置=={}==动作日志没有记录订单号--{}",message.indexOf("orderID"),message);
                }
            }
            from = from+size;
        }
        syncClueOrder();
        logger.info("查询完成");
        return 0;
    }

    public void syncClueOrder() {
        logger.info("异步更新操作开始");
        ThreadFactory namedThreadFactory = new ThreadFactoryBuilder().setNameFormat("sync-clue-order-map-pool-%d").build();
        ExecutorService singleThreadPool = new ThreadPoolExecutor(1, 1, 0L,
                TimeUnit.MILLISECONDS, new LinkedBlockingQueue<Runnable>(1024),
                namedThreadFactory, new ThreadPoolExecutor.AbortPolicy());
        singleThreadPool.execute(() -> {
            try {
                String datestr = StarDateUtils.dateToStr(new Date(),"yyyy-MM-dd 00:00:00");
                Date curdate = StarDateUtils.strToDate(datestr);
                ClueOrderMapDTO clueOrderMapDTO = new ClueOrderMapDTO();
                clueOrderMapDTO.setGteCreateTime(curdate);
                List<ClueOrderMap> clueOrderMaps = clueOrderMapService.queryClueOrderMap(clueOrderMapDTO);
                if (CollectionUtils.isNotEmpty(clueOrderMaps)) {
                    clueOrderMaps.stream().forEach(clueOrderMap -> {
                        EctActiveLogDTO ectActiveLogDTO = new EctActiveLogDTO();
                        ectActiveLogDTO.setClueId(clueOrderMap.getClueId());
                        ectActiveLogDTO.setOrderId(clueOrderMap.getOrderId());
                        List<EctActiveLog> ectActiveLogList = selectActivessByClueOrOrder(ectActiveLogDTO);
                        if (CollectionUtils.isNotEmpty(ectActiveLogList)) {
                            ectActiveLogList.stream().forEach(ectActiveLog -> {
                                ectActiveLog.setClueId(clueOrderMap.getClueId());
                                ectActiveLog.setOrderId(clueOrderMap.getOrderId());
                                upodateEctActiveLog(ectActiveLog);
                            });
                        }
                    });
                }
            } catch (Exception e) {
                logger.error("异步更新动作日志订单异常---", e);
            }
        });
        singleThreadPool.shutdown();
    }
}
