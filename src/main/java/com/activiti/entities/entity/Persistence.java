package com.activiti.entities.entity;

/**
 * 持久化
 * @Author: Dongming
 * @Date: 2021-05-25 10:13
 * @Version: v1.0
 */
public interface Persistence {

	ObjectIdentifier getObjectIdentifier();
	void setObjectIdentifier(ObjectIdentifier oid);
	PersistInfo getPersistInfo();
	void setPersistInfo(PersistInfo persistInfo);
}
