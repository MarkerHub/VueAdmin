package com.markerhub.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * <p>
 * 
 * </p>
 *
 * @author 我的公众号：MarkerHub
 * @since 2021-04-05
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class SysUser extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = "用户名不能为空")
    private String username;

    private String password;

    private String avatar;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    private String city;

    private LocalDateTime lastLogin;

    @TableField(exist = false)
    private List<SysRole> sysRoles = new ArrayList<>();

}
