package com.activiti.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fasterxml.jackson.databind.util.BeanUtil;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import javax.persistence.MapsId;
import java.util.Collections;
import java.util.Map;

public class ObjectUtil {
    /**
     * 有空字符串就就true
     * @param obj
     * @param strs
     * @return true 校验不通过，false 通过
     */
    public static boolean validObjFieldNull(Object obj,String... strs){
        if (obj == null || ArrayUtils.isEmpty(strs)){
            return true;
        }
        JSONObject jsonObject = JSON.parseObject(JSON.toJSONString(obj));
        for (String str : strs) {
            String value = (jsonObject.get(str) == null) ? "" : jsonObject.get(str).toString();
            if (StringUtils.isEmpty(value))
                return true;
        }

        return false;
    }
}
