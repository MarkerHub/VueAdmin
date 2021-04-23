package com.markerhub.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class BaseEntity implements Serializable {

	@TableId(value = "id", type = IdType.AUTO)
	private Long id;

	private LocalDateTime created;
	private LocalDateTime updated;

	private Integer statu;
}
