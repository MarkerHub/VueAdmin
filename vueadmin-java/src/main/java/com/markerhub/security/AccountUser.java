package com.markerhub.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

public class AccountUser implements UserDetails {

	private Long userId;

	private String password;

	private final String username;

	private final Collection<? extends GrantedAuthority> authorities;

	private final boolean accountNonExpired;

	private final boolean accountNonLocked;

	private final boolean credentialsNonExpired;

	private final boolean enabled;

	public AccountUser(Long userId, String username, String password, Collection<? extends GrantedAuthority> authorities) {
		this(userId, username, password, true, true, true, true, authorities);
	}


	public AccountUser(Long userId, String username, String password, boolean enabled, boolean accountNonExpired,
	            boolean credentialsNonExpired, boolean accountNonLocked,
	            Collection<? extends GrantedAuthority> authorities) {
		Assert.isTrue(username != null && !"".equals(username) && password != null,
				"Cannot pass null or empty values to constructor");
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.accountNonExpired = accountNonExpired;
		this.credentialsNonExpired = credentialsNonExpired;
		this.accountNonLocked = accountNonLocked;
		this.authorities = authorities;
	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}

	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	@Override
	public boolean isEnabled() {
		return this.enabled;
	}
}
