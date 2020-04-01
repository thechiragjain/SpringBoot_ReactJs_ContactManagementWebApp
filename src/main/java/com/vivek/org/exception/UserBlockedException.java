package com.vivek.org.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserBlockedException extends RuntimeException{
	public UserBlockedException() {}
	
	public UserBlockedException(String msg) {
		super(msg);
	}
}
