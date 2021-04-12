package com.activiti.entities.extensiveService;

import com.activiti.entities.entity.ParticipantInfo;
import com.activiti.entities.extensiveService.vo.PageParam;
import com.activiti.entities.extensiveService.vo.ParticipantGroup;
import com.activiti.entities.extensiveService.vo.ParticipantRole;
import com.activiti.entities.extensiveService.vo.ParticipantUser;
import com.activiti.entities.service.ParticipantInfoDao;
import com.activiti.utils.ObjectUtil;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.*;
import javax.xml.crypto.Data;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MyServer {

	@Autowired
	private ParticipantInfoDao dao;

	public Map<String, Object> getAllPartinal(PageParam pageParam) {
		List<ParticipantInfo> allPartinal;
		int total;
		if (!ObjectUtil.validObjFieldNull(pageParam, "pageNo", "pageSize")) {
			Sort sort = Sort.by(Sort.Direction.ASC, "id"); //升序
			Pageable pageable = PageRequest.of(pageParam.getPageNo() - 1,pageParam.getPageSize(), sort);
			Page<ParticipantInfo> page = dao.findAll(pageable);
			allPartinal = page.getContent();
			total = (int) page.getTotalElements();
		} else {
			allPartinal = dao.findAll();
			total = allPartinal.size();
		}

		List<ParticipantUser> participantUsers = allPartinal.stream().map(result -> new ParticipantUser(result.getId(), result.getUserName(), result.getFullName())).collect(Collectors.toList());
		List<ParticipantGroup> participantGroups = allPartinal.stream().map(result -> new ParticipantGroup(result.getId(), result.getBelongGroup())).collect(Collectors.toList());
		List<ParticipantRole> participantRoles = allPartinal.stream().map(result -> new ParticipantRole(result.getId(), result.getFullName(), result.getRole(), result.getType())).collect(Collectors.toList());
		HashMap<String, Object> result = new HashMap<>(3);

		result.put("assigns", participantUsers);
		result.put("groups", participantGroups);
		result.put("roles", participantRoles);

		return result;
	}
}
