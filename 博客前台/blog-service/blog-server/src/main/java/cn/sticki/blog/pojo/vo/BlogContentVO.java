package cn.sticki.blog.pojo.vo;

import cn.sticki.blog.pojo.bo.BlogStatusBO;
import cn.sticki.blog.pojo.domain.BlogContentHtml;
import cn.sticki.user.dto.UserDTO;
import lombok.Data;

/**
 * @author 阿杆
 */
@Data
public class BlogContentVO {

	/**
	 * 博客基本信息,带用户状态
	 */
	BlogStatusBO info;

	/**
	 * 博客内容信息
	 */
	BlogContentHtml content;

	/**
	 * 作者信息
	 */
	UserDTO author;

}
