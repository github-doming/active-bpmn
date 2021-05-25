package com.activiti.entities.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * @Author: Dongming
 * @Date: 2021-05-25 09:31
 */
@Data
@Entity
public class Staff extends Person {

	@Column
	String job;

	public void toWork(){
		String format = "name : [%s],job : [%s]";
		System.out.println(String.format(format,name,job));
	}

	@Override
	public String toString() {
		return "Staff{" +
				"objectIdentifier=" + objectIdentifier +
				", persistInfo=" + persistInfo +
				", name='" + name + '\'' +
				", sex=" + sex +
				", age=" + age +
				",job='" + job + '\'' +
				'}';
	}
}
