package com.activiti.entities.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

/*
*  @Table是JPA的注解，name表名，schema数据库名
*  @Entity是hibernate注解，name是所有数据库中表来查找，功能是一样，可单独用也可以一起用。
*  这里可以把@Table注解或不注解都可以
* */
@Data
@Entity // (name="partinal_info")
@Table(name="partinal_info",schema = "activity_demo")
public class ParticipantInfo implements Serializable {

    @Id
    private String id;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "limit_code")
    private String limitCode;

    @Column(name = "belong_group")
    private String belongGroup;

    private String role;

    private String type;


}