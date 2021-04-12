package com.activiti.entities.extensiveService.vo;

import lombok.Data;

@Data
public class ParticipantRole {

    private String id;

    // 角色名称
    private String name;

    // 角色代码
    private String roleCode;

    // 类型
    private String type;


    public ParticipantRole(String id, String name, String roleCode, String type) {
        this.id = id;
        this.name = name;
        this.roleCode = roleCode;
        this.type = "role";
    }
}
