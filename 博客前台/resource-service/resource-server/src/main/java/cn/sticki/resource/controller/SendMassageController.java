package cn.sticki.resource.controller;

import cn.sticki.common.result.RestResult;
import cn.sticki.resource.pojo.Mail;
import cn.sticki.resource.service.MailService;
import jakarta.annotation.Resource;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author 阿杆
 */
@Slf4j
@RestController
@RequestMapping("/send")
@Validated
public class SendMassageController {

	@Resource
	private MailService mailService;

	@PostMapping("/mail")
	public RestResult<Object> sendMail(@NotNull Mail mail) {
		try {
			mailService.sendMail(mail);
			return RestResult.ok(null, "发送成功");
		} catch (Exception e) {
			return RestResult.fail("发送失败");
		}
	}

}
