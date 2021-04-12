package com.activiti;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * springboot项目启动成功后执行一段代码
 * @Author: Dongming
 * @Date: 2021-02-22 11:43
 * @Email: job.dongming@foxmail.com
 * @Version: v1.0
 */
@Component
public class CommandLineRunnerImpl implements CommandLineRunner {
	@Autowired
	ServerStartConfig startConfig;

	@Override
	public void run(String... args) throws Exception {
		System.out.println("App running at:");
		System.out.println("- Local:   http://localhost:" + startConfig.getServerPort() + '/');
		System.out.println("- Network: " + startConfig.getUrl() + '/');
		System.out.println("Html run:npm run serve");
	}
}
