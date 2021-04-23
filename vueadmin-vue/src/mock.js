const Mock = require('mockjs')

const Random = Mock.Random

let Result = {
	code: 200,
	msg: '操作成功',
	data: null
}

Mock.mock('/captcha', 'get', () => {

	Result.data = {
		token: Random.string(32),
		captchaImg: Random.dataImage('120x40', 'p7n5w')
	}
	return Result
})

Mock.mock('/login', 'post', () => {

	// 无法在header中传入数jwt

	// Result.code = 400
	// Result.msg = "验证码错误"

	return Result
})
Mock.mock('/sys/userInfo', 'get', () => {

	Result.data = {
		id: "1",
		username: "test",
		avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg"
	}

	return Result
})

Mock.mock('/logout', 'post', () => {

	return Result
})

// 获取用户菜单以及权限接口
Mock.mock('/sys/menu/nav', 'get', () => {

	let nav = [
		{
			name: 'SysManga',
			title: '系统管理',
			icon: 'el-icon-s-operation',
			component: '',
			path: '',
			children: [
				{
					name: 'SysUser',
					title: '用户管理',
					icon: 'el-icon-s-custom',
					path: '/sys/users',
					component: 'sys/User',
					children: []
				},
				{
					name: 'SysRole',
					title: '角色管理',
					icon: 'el-icon-rank',
					path: '/sys/roles',
					component: 'sys/Role',
					children: []
				},
				{
					name: 'SysMenu',
					title: '菜单管理',
					icon: 'el-icon-menu',
					path: '/sys/menus',
					component: 'sys/Menu',
					children: []
				}
			]
		},
		{
			name: 'SysTools',
			title: '系统工具',
			icon: 'el-icon-s-tools',
			path: '',
			component: '',
			children: [
				{
					name: 'SysDict',
					title: '数字字典',
					icon: 'el-icon-s-order',
					path: '/sys/dicts',
					component: '',
					children: []
				},
			]
		}
	]

	let authoritys = ['sys:user:list', "sys:user:save", "sys:user:delete"]

	Result.data = {
		nav: nav,
		authoritys: authoritys
	}

	return Result
})

//////////////// 菜单管理 ////////////////

Mock.mock('/sys/menu/list', 'get', () => {
	let menus = [
		{
			"id": 1,
			"created": "2021-01-15T18:58:18",
			"updated": "2021-01-15T18:58:20",
			"statu": 1,
			"parentId": 0,
			"name": "系统管理",
			"path": "",
			"perms": "sys:manage",
			"component": "",
			"type": 0,
			"icon": "el-icon-s-operation",
			"ordernum": 1,
			"children": [
				{
					"id": 2,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "用户管理",
					"path": "/sys/users",
					"perms": "sys:user:list",
					"component": "sys/User",
					"type": 1,
					"icon": "el-icon-s-custom",
					"ordernum": 1,
					"children": [
						{
							"id": 9,
							"created": "2021-01-17T21:48:32",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "添加用户",
							"path": null,
							"perms": "sys:user:save",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 1,
							"children": []
						},
						{
							"id": 10,
							"created": "2021-01-17T21:49:03",
							"updated": "2021-01-17T21:53:04",
							"statu": 1,
							"parentId": 2,
							"name": "修改用户",
							"path": null,
							"perms": "sys:user:update",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 2,
							"children": []
						},
						{
							"id": 11,
							"created": "2021-01-17T21:49:21",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "删除用户",
							"path": null,
							"perms": "sys:user:delete",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 3,
							"children": []
						},
						{
							"id": 12,
							"created": "2021-01-17T21:49:58",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "分配角色",
							"path": null,
							"perms": "sys:user:role",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 4,
							"children": []
						},
						{
							"id": 13,
							"created": "2021-01-17T21:50:36",
							"updated": null,
							"statu": 1,
							"parentId": 2,
							"name": "重置密码",
							"path": null,
							"perms": "sys:user:repass",
							"component": null,
							"type": 2,
							"icon": null,
							"ordernum": 5,
							"children": []
						}
					]
				},
				{
					"id": 3,
					"created": "2021-01-15T19:03:45",
					"updated": "2021-01-15T19:03:48",
					"statu": 1,
					"parentId": 1,
					"name": "角色管理",
					"path": "/sys/roles",
					"perms": "sys:role:list",
					"component": "sys/Role",
					"type": 1,
					"icon": "el-icon-rank",
					"ordernum": 2,
					"children": []
				},

			]
		},
		{
			"id": 5,
			"created": "2021-01-15T19:06:11",
			"updated": null,
			"statu": 1,
			"parentId": 0,
			"name": "系统工具",
			"path": "",
			"perms": "sys:tools",
			"component": null,
			"type": 0,
			"icon": "el-icon-s-tools",
			"ordernum": 2,
			"children": [
				{
					"id": 6,
					"created": "2021-01-15T19:07:18",
					"updated": "2021-01-18T16:32:13",
					"statu": 1,
					"parentId": 5,
					"name": "数字字典",
					"path": "/sys/dicts",
					"perms": "sys:dict:list",
					"component": "sys/Dict",
					"type": 1,
					"icon": "el-icon-s-order",
					"ordernum": 1,
					"children": []
				}
			]
		}
	]

	Result.data = menus

	return Result
})

Mock.mock(RegExp('/sys/menu/info/*'), 'get', () => {

	Result.data = {
		"id": 3,
		"statu": 1,
		"parentId": 1,
		"name": "角色管理",
		"path": "/sys/roles",
		"perms": "sys:role:list",
		"component": "sys/Role",
		"type": 1,
		"icon": "el-icon-rank",
		"orderNum": 2,
		"children": []
	}

	return Result
})


Mock.mock(RegExp('/sys/menu/*'), 'post', () => {

	return Result
})

//////////////// 角色管理 ////////////////

Mock.mock(RegExp('/sys/role/list*'), 'get', () => {

	Result.data = {
		"records": [
			{
				"id": 3,
				"created": "2021-01-04T10:09:14",
				"updated": "2021-01-30T08:19:52",
				"statu": 1,
				"name": "普通用户",
				"code": "normal",
				"remark": "只有基本查看功能",
				"menuIds": []
			},
			{
				"id": 6,
				"created": "2021-01-16T13:29:03",
				"updated": "2021-01-17T15:50:45",
				"statu": 1,
				"name": "超级管理员",
				"code": "admin",
				"remark": "系统默认最高权限，不可以编辑和任意修改",
				"menuIds": []
			}
		],
		"total": 2,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": null,
		"maxLimit": null,
		"searchCount": true,
		"pages": 1
	}

	return Result

})

Mock.mock(RegExp('/sys/role/info/*'), 'get', () => {

	Result.data = {
		"id": 6,
		"created": "2021-01-16T13:29:03",
		"updated": "2021-01-17T15:50:45",
		"statu": 1,
		"name": "超级管理员",
		"code": "admin",
		"remark": "系统默认最高权限，不可以编辑和任意修改",
		"menuIds": [3]
	}

	return Result
})

Mock.mock(RegExp('/sys/role/*'), 'post', () => {

	return Result
})

//////////////// 用户管理 ////////////////

Mock.mock(RegExp('/sys/user/list*'), 'get', () => {
	Result.data = {
		"records": [
			{
				"id": 1,
				"created": "2021-01-12T22:13:53",
				"updated": "2021-01-16T16:57:32",
				"statu": 1,
				"username": "admin",
				"password": "$2a$10$R7zegeWzOXPw871CmNuJ6upC0v8D373GuLuTw8jn6NET4BkPRZfgK",
				"avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
				"email": "123@qq.com",
				"city": "广州",
				"lastLogin": "2020-12-30T08:38:37",
				"roles": [
					{
						"id": 6,
						"created": "2021-01-16T13:29:03",
						"updated": "2021-01-17T15:50:45",
						"statu": 1,
						"name": "超级管理员",
						"code": "admin",
						"remark": "系统默认最高权限，不可以编辑和任意修改",
						"menuIds": []
					},
					{
						"id": 3,
						"created": "2021-01-04T10:09:14",
						"updated": "2021-01-30T08:19:52",
						"statu": 1,
						"name": "普通用户",
						"code": "normal",
						"remark": "只有基本查看功能",
						"menuIds": []
					}
				]
			},
			{
				"id": 2,
				"created": "2021-01-30T08:20:22",
				"updated": "2021-01-30T08:55:57",
				"statu": 1,
				"username": "test",
				"password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
				"avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
				"email": "test@qq.com",
				"city": null,
				"lastLogin": null,
				"roles": [
					{
						"id": 3,
						"created": "2021-01-04T10:09:14",
						"updated": "2021-01-30T08:19:52",
						"statu": 1,
						"name": "普通用户",
						"code": "normal",
						"remark": "只有基本查看功能",
						"menuIds": []
					}
				]
			}
		],
		"total": 2,
		"size": 10,
		"current": 1,
		"orders": [],
		"optimizeCountSql": true,
		"hitCount": false,
		"countId": null,
		"maxLimit": null,
		"searchCount": true,
		"pages": 1
	}

	return Result
})


Mock.mock(RegExp('/sys/user/*'), 'post', () => {
	return Result
})

Mock.mock(RegExp('/sys/user/info/*'), 'get', () => {

	Result.data = {
		"id": 2,
		"created": "2021-01-30T08:20:22",
		"updated": "2021-01-30T08:55:57",
		"statu": 1,
		"username": "test",
		"password": "$2a$10$0ilP4ZD1kLugYwLCs4pmb.ZT9cFqzOZTNaMiHxrBnVIQUGUwEvBIO",
		"avatar": "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg",
		"email": "test@qq.com",
		"city": null,
		"lastLogin": null,
		"roles": []
	}
	return Result
})