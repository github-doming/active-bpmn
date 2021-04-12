package com.activiti.entities.service;

import com.activiti.entities.entity.ParticipantInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

// @Repository
public interface ParticipantInfoDao extends JpaRepository<ParticipantInfo, Integer>, JpaSpecificationExecutor<ParticipantInfo> {

}
