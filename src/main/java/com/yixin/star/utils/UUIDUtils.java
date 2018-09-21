package com.yixin.star.utils;

import java.util.UUID;

/**
 * Package : com.yixin.star.utils
 *
 * @author YixinCapital -- yinx
 *         2018/9/3 19:22
 */
public class UUIDUtils {
    private UUIDUtils () {

    }
    /**
     * 获取uuid
     * @return
     */
    public static String getUUID(){
        String uuid = UUID.randomUUID().toString();
        uuid = uuid.replace("-", "");
        return uuid;
    }
}
