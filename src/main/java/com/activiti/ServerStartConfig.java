package com.activiti;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 服务启动会加载的配置
 *
 * @Author: Dongming
 * @Date: 2021-02-22 11:16
 * @Email: job.dongming@foxmail.com
 * @Version: v1.0
 */
@Component
@Configuration
public class ServerStartConfig  {
	@Value("${server.port}")
	private int serverPort;

	public int getServerPort() {
		return serverPort;
	}

	public String getUrl() throws UnknownHostException {
		InetAddress address = InetAddress.getLocalHost();
		return "http://" + address.getHostAddress() + ":" + this.serverPort;
	}

}
