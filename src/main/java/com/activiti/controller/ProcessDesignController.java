package com.activiti.controller;

import com.activiti.model.ModelEditorJsonRestResource;
import com.activiti.model.ModelSaveRestResource;
import com.activiti.service.ProcessDesignService;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.activiti.engine.repository.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/workflow")
public class ProcessDesignController {

	@Autowired
	private ProcessDesignService processDesignService;
	@Autowired
	private ModelSaveRestResource modelSaveRestResource;
	@Autowired
	private ModelEditorJsonRestResource modelEditorJsonRestResource;

	/**
	 * 创建模型
	 */
	@RequestMapping(value = "/model/insert", method = RequestMethod.POST)
	@ResponseStatus(value = HttpStatus.OK)
	public void createModel(@RequestParam String key, @RequestParam String name, @RequestParam String category, @RequestParam String descp) throws UnsupportedEncodingException {
		processDesignService.createModel(key, name, category, descp);
	}

	@RequestMapping(value = "/model/list", method = RequestMethod.GET)
	public List<Model> listModel() {
		return processDesignService.listModel();
	}

	@RequestMapping(value = "/model/template", method = RequestMethod.GET)
	public JSONArray templateModel() {
		JSONArray template = new JSONArray();
		template.add("Analyze Change Request");
		template.add("Audit Change Notice");
		template.add("Audit - Conduct Audit");
		template.add("Audit - Manage Response");
		template.add("Audit - Summary Report");
		template.add("Complete Change Notice Task");
		template.add("Complete Training Task");
		template.add("CRB Review Change Request");
		template.add("Create Change Notice");
		template.add("default");
		template.add("Design Review- Review");
		template.add("Peer Review - Review");
		template.add("Quality Default Task Form Template");
		template.add("Review/Approve Problem Report");
		template.add("Review/Approve Promotion Request");
		template.add("Review/Approve Variance");
		template.add("Review Change Notice Task");

		return template;
	}

	@RequestMapping(value = "/model/local", method = RequestMethod.GET)
	public JSONObject localModel() {
		JSONObject local = new JSONObject();
		local.put("save", "保存");
		local.put("download", "下载");

		local.put("general", "常规");
		local.put("variable", "变量");
		local.put("globalVariable", "全局变量");
		local.put("roleSet", "角色设置");
		local.put("participant", "参与者");
		local.put("resourceLibrary", "资源库");
		local.put("taskListener", "转变");

		local.put("create", "创建");
		local.put("assignment", "重新指派");
		local.put("complete", "完成");

		local.put("name", "名称");
		local.put("enterName", "请输入名称");


		local.put("user", "用户");
		local.put("fullName", "全名");
		local.put("username", "用户名");
		local.put("find", "查找");
		local.put("workPrincipal", "工作负责人");
		local.put("type", "类型");
		local.put("group", "组");
		local.put("groupName", "组名称");
		local.put("required", "必需的");
		local.put("notNecessary", "非必须");
		local.put("any", "任何");
		local.put("all", "全部");
		local.put("number", "编号");
		local.put("enterNumber", "请输入编号");
		local.put("role", "角色");
		local.put("roleName", "角色名");


		local.put("selectRole", "请先选择角色");
		local.put("pool", "池");
		local.put("context", "上下文团队");
		local.put("system", "系统用户");
		local.put("resourcePool", "资源池");


		local.put("roleDefined", "已定义角色");
		local.put("view", "查看");
		local.put("add", "添加");
		local.put("remove", "移除");


		local.put("updated", "更新");
		local.put("variableName", "变量名称");
		local.put("displayName", "显示名称");
		local.put("variableType", "变量类型");
		local.put("visible", "可见");
		local.put("necessary", "必需");
		local.put("readOnly", "只读");
		local.put("reset", "可重置");
		local.put("defaultValue", "默认值");
		local.put("update", "更新");
		local.put("delete", "删除");
		local.put("ok", "确认");
		local.put("cancel", "取消");
		local.put("enterVariable", "请输入变量名称");
		local.put("defineDisplayName", "定义显示名称");
		local.put("selectVariableName", "请选择变量类型名称");
		local.put("otherClassName", "其它类名称");
		local.put("authority", "权限");
		local.put("initializedFrom", "初始化自");
		local.put("initializedFromGlobalVariable", "初始化来自的全局变量");
		local.put("defaultDisplay", "默认显示");
		local.put("zh_cn", "中文(简体)");
		local.put("en_us", "英文(美式)");


		local.put("value", "值");
		local.put("clazz", "类");
		local.put("enterClass", "请输入类");
		local.put("field", "字段");
		local.put("listener", "监听");
		local.put("selectListenerType", "请选择监听类型");
		local.put("enterListenerValue", "请输入监听值");
		local.put("taskFormTemplate", "模板名称");
		local.put("selectTemplate", "请选择模板");
		local.put("signingRequired", "需要签名");
		local.put("pleaseEnter", "请输入");
		local.put("workflowTemplate", "工作流模板");
		local.put("userTask", "用户任务");
		local.put("callActivity", "调用活动");
		local.put("startEvent", "开始事件");
		local.put("endEvent", "结束事件");

		local.put("singleVariableName", "变量名称不能重复");
		local.put("mismatchType", "变量默认值与变量指定的类型不匹配");
		local.put("description", "描述");
		local.put("enterDescription", "请输入工作流描述");


		Map<String, Object> language = new HashMap<>(15);

		language.put("Activate the hand tool", "激活抓手工具");
		language.put("Activate the lasso tool", "激活套索工具");
		language.put("Activate the create/remove space tool", "激活创建/删除空间工具");
		language.put("Activate the global connect tool", "激活全局连接工具");
		language.put("Create StartEvent", "创建开始事件");
		language.put("Create Intermediate/Boundary Event", "创建中间/边界事件");
		language.put("Create EndEvent", "创建结束事件");
		language.put("Create Gateway", "创建网关");
		language.put("Create Task", "创建任务");
		language.put("Create DataObjectReference", "创建数据对象引用");
		language.put("Create DataStoreReference", "创建数据存储引用");
		language.put("Create expanded SubProcess", "创建扩展子过程");
		language.put("Create Pool/Participant", "创建池/参与者");
		language.put("Create Group", "创建组");
		language.put("Create UserTask", "创建用户任务");
		language.put("Create CallActivity", "创建调用活动");

		local.put("language", language);

		return local;
	}


	/**
	 * 保存模型
	 */
	@RequestMapping(value = "/model/{modelId}/xml/save", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(value = HttpStatus.OK)
	public void saveModelXml(@PathVariable String modelId, @RequestBody MultiValueMap<String, String> values) {
		modelSaveRestResource.saveModelXml(modelId, values);
	}

	@ResponseBody
	@GetMapping(value = "/deleteModel")
	public void flowDelete(@RequestParam(name = "modelId") String modelId) {
		processDesignService.deleteModel(modelId);
	}

	/**
	 * 根据生成的ID获取模型流程编辑器
	 *
	 * @param modelId
	 * @return
	 */
	@RequestMapping(value = "/model/{modelId}/xml", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(value = HttpStatus.OK)
	public JSONObject getEditorXml(@PathVariable String modelId) {
		return modelEditorJsonRestResource.getEditorXml(modelId);
	}

	@GetMapping(value = "/model/deploy")
	public String deploy(@RequestParam(name = "modelId") String modelId) throws Exception {
		return processDesignService.deployModel(modelId);
	}

}
