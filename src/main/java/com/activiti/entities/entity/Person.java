package com.activiti.entities.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.MappedSuperclass;

/**
 * 人
 *
 * @Author: Dongming
 * @Date: 2021-05-25 09:20
 */
@Data
@MappedSuperclass
public class Person implements Persistence {

	@EmbeddedId
	ObjectIdentifier objectIdentifier;

	@Embedded
	PersistInfo persistInfo;

	@Column
	String name;

	@Column
	Integer sex;

	@Column
	Double age;

	public Person() {
		setObjectIdentifier(new ObjectIdentifier());
		setPersistInfo(new PersistInfo());
	}
}
