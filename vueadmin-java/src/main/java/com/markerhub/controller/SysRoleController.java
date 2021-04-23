package com.markerhub.controller;


import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.markerhub.common.lang.Const;
import com.markerhub.common.lang.Result;
import com.markerhub.entity.SysRole;
import com.markerhub.entity.SysRoleMenu;
import com.markerhub.entity.SysUserRole;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *  前端控制器
 *  swagger2
 * </p>
 *
 * @author 我的公众号：MarkerHub
 * @since 2021-04-05
 */
@RestController
@RequestMapping("/sys/role")
public class SysRoleController extends BaseController {

	@PreAuthorize("hasAuthority('sys:role:list')")
	@GetMapping("/info/{id}")
	public Result info(@PathVariable("id") Long id) {

		SysRole sysRole = sysRoleService.getById(id);

		// 获取角色相关联的菜单id
		List<SysRoleMenu> roleMenus = sysRoleMenuService.list(new QueryWrapper<SysRoleMenu>().eq("role_id", id));
		List<Long> menuIds = roleMenus.stream().map(p -> p.getMenuId()).collect(Collectors.toList());

		sysRole.setMenuIds(menuIds);
		return Result.succ(sysRole);
	}

	@PreAuthorize("hasAuthority('sys:role:list')")
	@GetMapping("/list")
	public Result list(String name) {

		Page<SysRole> pageData = sysRoleService.page(getPage(),
				new QueryWrapper<SysRole>()
						.like(StrUtil.isNotBlank(name), "name", name)
		);

		return Result.succ(pageData);
	}

	@PostMapping("/save")
	@PreAuthorize("hasAuthority('sys:role:save')")
	public Result save(@Validated @RequestBody SysRole sysRole) {

		sysRole.setCreated(LocalDateTime.now());
		sysRole.setStatu(Const.STATUS_ON);

		sysRoleService.save(sysRole);
		return Result.succ(sysRole);
	}

	@PostMapping("/update")
	@PreAuthorize("hasAuthority('sys:role:update')")
	public Result update(@Validated @RequestBody SysRole sysRole) {

		sysRole.setUpdated(LocalDateTime.now());

		sysRoleService.updateById(sysRole);

		// 更新缓存
		sysUserService.clearUserAuthorityInfoByRoleId(sysRole.getId());

		return Result.succ(sysRole);
	}

	@PostMapping("/delete")
	@PreAuthorize("hasAuthority('sys:role:delete')")
	@Transactional
	public Result info(@RequestBody Long[] ids) {

		sysRoleService.removeByIds(Arrays.asList(ids));

		// 删除中间表
		sysUserRoleService.remove(new QueryWrapper<SysUserRole>().in("role_id", ids));
		sysRoleMenuService.remove(new QueryWrapper<SysRoleMenu>().in("role_id", ids));

		// 缓存同步删除
		Arrays.stream(ids).forEach(id -> {
			// 更新缓存
			sysUserService.clearUserAuthorityInfoByRoleId(id);
		});

		return Result.succ("");
	}

	@Transactional
	@PostMapping("/perm/{roleId}")
	@PreAuthorize("hasAuthority('sys:role:perm')")
	public Result info(@PathVariable("roleId") Long roleId, @RequestBody Long[] menuIds) {

		List<SysRoleMenu> sysRoleMenus = new ArrayList<>();

		Arrays.stream(menuIds).forEach(menuId -> {
			SysRoleMenu roleMenu = new SysRoleMenu();
			roleMenu.setMenuId(menuId);
			roleMenu.setRoleId(roleId);

			sysRoleMenus.add(roleMenu);
		});

		// 先删除原来的记录，再保存新的
		sysRoleMenuService.remove(new QueryWrapper<SysRoleMenu>().eq("role_id", roleId));
		sysRoleMenuService.saveBatch(sysRoleMenus);

		// 删除缓存
		sysUserService.clearUserAuthorityInfoByRoleId(roleId);

		return Result.succ(menuIds);
	}

}
