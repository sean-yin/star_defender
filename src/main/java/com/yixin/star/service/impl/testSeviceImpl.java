package com.yixin.star.service.impl;
import com.yixin.star.ElasticClient;
import com.yixin.star.dto.ESLogParamsDTO;
import com.yixin.star.service.testService;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Package : com.yixin.star.service.impl
 *
 * @author YixinCapital -- yinx
 *         2018/9/10 19:47
 */
@Service("test")
public class testSeviceImpl implements testService {
    private static Logger logger = LoggerFactory.getLogger(testSeviceImpl.class);
    @Autowired
    private ElasticClient elasticClient;
    @Override
    public void testNginx() {
        ESLogParamsDTO esLogParamsDTO = new ESLogParamsDTO();
        esLogParamsDTO.setHttp_host("yidaitong-web.yixincapital.com");
        esLogParamsDTO.setRequest("getWebSources.do getChannelNoByUserName");
        esLogParamsDTO.setStatus_code("302");
        SearchResponse searchResponse = elasticClient.searchByMuiltiParams("nginx_ws-proxy-2017-11-26","logs",esLogParamsDTO,0,10);
        SearchHits hits = searchResponse.getHits();
        SearchHit[] searchHits = hits.getHits();
        logger.info("本次获取到日志条数--{}/日志总条数--{}",searchHits.length,hits.totalHits);
    }
}
