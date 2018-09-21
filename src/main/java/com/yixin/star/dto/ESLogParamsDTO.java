package com.yixin.star.dto;

import lombok.Data;
import org.elasticsearch.search.sort.SortOrder;

import java.util.Date;
import java.util.List;

/**
 * Package : com.yixin.star.dto
 *
 * @author YixinCapital -- yinx
 *         2018/9/7 21:03
 */
@Data
public class ESLogParamsDTO {
     //时间戳
     private String timestamp;
     //要小于的时间戳

     private Date lteTimestamp;
     //要大于的时间戳

     private Date gteTimestamp;
     //请求IP
     private String remote_IP;
     //本机时间
     private String time_local;
     //请求路径
     private String request;
     //动作集合
     private List<String> requestList;
     //最终响应状态码
     private String status_code;
     //
     private String size;
     private String referer;
     //请求域名
     private String http_host;
     //
     private String DeviceIdentifier;
     private String DeviceType;
     private String LoanUserID;
     //请求方法体
     private String reqs_body;
     private String ssl_protocol;
     private String ssl_cipher;
     //浏览器
     private String user_agent;
     private String x_forward_for;
     //转发主机ip:port
     private String upstream_addr;
     //各主机响应码
     private String upstream_statcode;
     //响应时长
     private String upstream_resptime;
     //返回方式
     private String upstream_conttype;
     //必须不包含的feild
     private String mustNot;
     //响应时长排序方式 SortOrder.DESC倒叙  // SortOrder.ASC正序
     private SortOrder respTimeSort;

     private String indexName;
     private String type;
     private int index;
     private String tp;
     private String source;
     //阈值
     private String resqlimit;
     //状态码集合，用于多状态码查询
     private List<Integer> statusCodeList;
}
