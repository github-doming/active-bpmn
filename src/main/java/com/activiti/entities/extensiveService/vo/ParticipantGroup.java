package com.activiti.entities.extensiveService.vo;

import lombok.Data;

@Data
public class ParticipantGroup {

    private String id;

    // 组名
    private String name;

    // 类型
    private String type;


    public ParticipantGroup(String id, String name) {
        this.id = id;
        this.name = name;
        this.type = "group";
    }
}
