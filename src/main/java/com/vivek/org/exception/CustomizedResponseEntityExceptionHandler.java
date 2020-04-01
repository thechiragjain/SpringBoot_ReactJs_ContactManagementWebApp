package com.vivek.org.exception;

import java.time.LocalDateTime;import javax.xml.soap.Detail;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomizedResponseEntityExceptionHandler 
extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<Object> handleAllException(Exception ex, WebRequest request) throws Exception {
		ExceptionResponse exceptionRes = new ExceptionResponse(LocalDateTime.now(),
				ex.getMessage(), request.getDescription(false));
		
		return new ResponseEntity(exceptionRes,HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public final ResponseEntity<Object> handelUserNotFoundException(UserNotFoundException ex,WebRequest request) throws Exception{
		ExceptionResponse exceptionRes = new ExceptionResponse(LocalDateTime.now(), 
				ex.getMessage(),request.getDescription(false));
		
		return new ResponseEntity(exceptionRes,HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ContentsNotFoundException.class)
	public final ResponseEntity<Object> handelNoContentException(ContentsNotFoundException ex, WebRequest request) throws Exception{
		ExceptionResponse exceptionRes = new ExceptionResponse(LocalDateTime.now(), 
				ex.getMessage(),request.getDescription(false));
		return new ResponseEntity(exceptionRes,HttpStatus.NO_CONTENT);
	}
	
	@ExceptionHandler(UserBlockedException.class)
	public final ResponseEntity<Object> handelUserBlockedException(UserBlockedException ex,WebRequest request) throws Exception{
		ExceptionResponse er = new ExceptionResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));
		
		return new ResponseEntity(er,HttpStatus.UNAUTHORIZED);
	}
	
}
