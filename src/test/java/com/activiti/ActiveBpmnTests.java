package com.activiti;

import com.activiti.entities.entity.Persistence;
import com.activiti.entities.entity.Staff;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ActiveBpmnApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ActiveBpmnTests {

	@PersistenceContext
	EntityManager entityManager;


	@Autowired
	private PlatformTransactionManager transactionManager;

	@Test public void test(){

		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		//构造查询
		CriteriaQuery<Staff> querySpec = criteriaBuilder.createQuery(Staff.class);

		//查询表
		Root<Staff> staffRoot = querySpec.from(Staff.class);


		//比较信息
		Path<Long> oidPath = staffRoot.get("objectIdentifier").get("id");

		//比较条件
		Predicate where =criteriaBuilder.equal(oidPath, 1024);

		List<Staff> result = entityManager.createQuery(querySpec.where(where)).getResultList();
		result.forEach(System.out::println);
	}

	@Test
	public void contextLoads() {
		for (int i = 1; i < 10; i++) {

			Staff staff = new Staff();
			staff.getObjectIdentifier().setId(1024L + i);
			staff.setName("Zhang san");
			staff.setJob("工人");
			staff.toWork();
			save(staff);
		}
	}

	<P extends Persistence> P save(P object) {
		DefaultTransactionDefinition definition = new DefaultTransactionDefinition();
		definition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus transactionStatus = transactionManager.getTransaction(definition);

		if (!object.getPersistInfo().isPersisted()) {
			entityManager.detach(object);
			entityManager.persist(object);
		} else {
			object = entityManager.merge(object);
		}
		transactionManager.commit(transactionStatus);
		return object;
	}

}
