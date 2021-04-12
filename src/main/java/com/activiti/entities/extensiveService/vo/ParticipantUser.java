package com.activiti.entities.extensiveService.vo;

import lombok.Data;

@Data
public class ParticipantUser {

    private String id;

    // 用户名
    private String userName;

    // 全名
    private String name;

    // 类型
    private String type;

    public ParticipantUser(String id, String userName, String name) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.type = "user";
    }
}
