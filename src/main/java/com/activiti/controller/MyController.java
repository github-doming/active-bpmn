package com.activiti.controller;

import com.activiti.entities.extensiveService.MyServer;
import com.activiti.entities.extensiveService.vo.PageParam;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MyController {

    @Autowired
    private MyServer server;

    @RequestMapping(value = "/getAllPartinal")
    public Map<String,Object> getAllPartinal(@RequestBody JSONObject jsonObject){
        PageParam pageParam = jsonObject.toJavaObject(PageParam.class);
	    return server.getAllPartinal(pageParam);
    }

}
