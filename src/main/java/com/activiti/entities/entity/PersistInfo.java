package com.activiti.entities.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * @Author: Dongming
 * @Date: 2021-05-25 09:25
 */
@Data
@Embeddable
public class PersistInfo implements Serializable {

	@Column(updatable = true, nullable = false)
	Timestamp createStamp;

	@Column(updatable = true, nullable = true)
	Timestamp modifyStamp;

	@Column(updatable = true, nullable = true)
	Timestamp updateStamp;

	@Column
	int updateCount;

	@Column
	long markForDelete;

	@Column
	boolean isDeleted = false;

	@Column
	boolean isPersisted = false;

	@Column
	boolean verified;

	public PersistInfo() {
		this.isDeleted = false;
		this.verified = false;
		this.markForDelete = 0;
		this.isPersisted = false;
		this.updateCount = 0;
		this.createStamp = new Timestamp(System.currentTimeMillis());
	}
}
