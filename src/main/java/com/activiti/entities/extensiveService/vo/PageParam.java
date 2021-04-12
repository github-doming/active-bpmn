package com.activiti.entities.extensiveService.vo;

import lombok.Data;

@Data
public class PageParam {

	private Integer pageNo;

	private Integer pageSize;

	private Integer total;

	private String beanName;

}
