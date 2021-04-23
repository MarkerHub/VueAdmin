package com.markerhub.security;

import cn.hutool.json.JSONUtil;
import com.markerhub.common.lang.Result;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_FORBIDDEN);

		ServletOutputStream outputStream = response.getOutputStream();

		Result result = Result.fail(accessDeniedException.getMessage());

		outputStream.write(JSONUtil.toJsonStr(result).getBytes("UTF-8"));

		outputStream.flush();
		outputStream.close();

	}
}
