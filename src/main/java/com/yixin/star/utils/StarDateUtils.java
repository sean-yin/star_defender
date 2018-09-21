package com.yixin.star.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Package : com.yixin.star.utils
 *
 * @author YixinCapital -- yinx
 *         2018/9/4 11:05
 */
public class StarDateUtils {
    private static final Logger logger = LoggerFactory.getLogger(StarDateUtils.class);

    private StarDateUtils() {
    }

    public static Date strToDate(String dateString) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = null;

        try {
            date = sdf.parse(dateString);
        } catch (ParseException var4) {
            logger.error(var4.getMessage(), var4);
        }

        return date;
    }

    public static Date strToDate(String dateString , String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Date date = null;

        try {
            date = sdf.parse(dateString);
        } catch (ParseException var4) {
            logger.error(var4.getMessage(), var4);
        }

        return date;
    }

    public static String dateToStr(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String str = null;

        try {
            str = sdf.format(date);
        } catch (Exception var4) {
            logger.error(var4.getMessage(), var4);
        }

        return str;
    }

    public static String dateToStr(Date date, String format) {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        String str = null;

        try {
            str = sdf.format(date);
        } catch (Exception var5) {
            logger.error(var5.getMessage(), var5);
        }

        return str;
    }
    /**
     * 获取前或后几天
     *
     * @param today
     * @return
     * @author YixinCapital -- yinx
     */
    public static Date getNDay(Date today,int index) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.DATE, index);

        return cal.getTime();
    }

    /**
     * N小时前或后
     * @param today
     * @param hour
     * @return
     */
    public static Date getNHour(Date today,int hour) {

        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.HOUR, hour);
        return cal.getTime();
    }
}
