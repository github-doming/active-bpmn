package com.activiti.entities.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 对象标识
 * @Author: Dongming
 * @Date: 2021-05-25 09:23
 */
@Data
@Embeddable
public class ObjectIdentifier implements Serializable {

	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(nullable = false)
	protected Long id;


	public ObjectIdentifier() {
	}
}
