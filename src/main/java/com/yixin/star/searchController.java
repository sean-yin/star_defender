package com.yixin.star;

import java.io.BufferedReader;
import java.io.FileReader;

import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHits;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSON;
import com.yixin.star.dto.EctActiveLogDTO;
import com.yixin.star.service.EctActiveLogService;
import com.yixin.star.service.testService;
/**
 * 页面展示内容，校验定义
 * Created by chuc on 2018/7/13.
 */
@RestController
@RequestMapping("/starController")
public class searchController {

	@Autowired
	private ElasticClient etc;
	@Autowired
	private EctActiveLogService ectActiveLogService;
	@Autowired
	private testService testService;
	private final Logger logger = LoggerFactory.getLogger(this.getClass());

	/**
	 * 获取页面定义list
	 * @return pageDefineDto 页面定义dto list
	 * @author YixinCapital -- zhangrq
	 *	       2018/7/18 15:21
	 */
	@ResponseBody
	@PostMapping("/testES/{index}/{minute}/{type}")
	//@RequiresPermissions("activiti:vocation:add")
	public String testESSplit(@PathVariable("index") String index, @PathVariable("minute") int minute, @PathVariable("type") String type){
		logger.info("testES获取前端请求【"+"】");

		SearchResponse searchResponse = etc.searchByTimeSplit(index,minute,10,type);

		SearchHits hits = searchResponse.getHits();
		long total = hits.getTotalHits();

		//int total = etc.addOneRecord();
		logger.info("testES查询数据完成，成功返回【"+total+"】");
		return JSON.toJSONString(searchResponse);
	}
	@ResponseBody
	@PostMapping("/testAll")
	//@RequiresPermissions("activiti:vocation:add")
	public void testAll(){
		logger.info("testES获取前端请求【"+"】");
		ectActiveLogService.searchAndCreateActiveLog();
		logger.info("testES查询数据完成");
	}
	/**
	 * 获取页面定义list
	 * @return pageDefineDto 页面定义dto list
	 * @author YixinCapital -- zhangrq
	 *	       2018/7/18 15:21
	 */
	@PostMapping("/insertES")
	//@RequiresPermissions("activiti:vocation:add")
	public void insertES(){
		logger.info("insertES获取前端请求【"+"】");

		String fileName="D:/tmp/yidaitong.log";
		String line="";
		try	{
			BufferedReader in=new BufferedReader(new FileReader(fileName));
			line=in.readLine();
			while (line!=null){
				logger.info("insertES插入数据【"+line+"】");

				IndexResponse response = etc.addOneRecord("yidaitong_logs-2018-08-31","ect_log",line);

				logger.info("插入数据成功【"+response+"】");

				line=in.readLine();
			}
			in.close();
		} catch (Exception e){
			logger.error("insertES操作失败，异常返回【{}】",e);
		}

		logger.info("insertES插入数据完成，成功返回【"+"】");
	}
	@ResponseBody
	@PostMapping("/findActionNum")
	public int findActionNum(@RequestBody EctActiveLogDTO ectActiveLogDTO){
		return ectActiveLogService.searchByParams(ectActiveLogDTO);
	}
	@ResponseBody
	@PostMapping("/findNginx")
	public void findNginx(){
		logger.info("进来了");
		testService.testNginx();
	}
}
