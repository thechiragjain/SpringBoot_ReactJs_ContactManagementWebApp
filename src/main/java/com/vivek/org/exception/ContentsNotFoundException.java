package com.vivek.org.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class ContentsNotFoundException extends RuntimeException{
	public ContentsNotFoundException() {}
	
	public ContentsNotFoundException(String message) {
		super(message);
	}
}