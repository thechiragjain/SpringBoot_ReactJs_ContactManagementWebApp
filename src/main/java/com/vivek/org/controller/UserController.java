package com.vivek.org.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vivek.org.entity.Contact;
import com.vivek.org.entity.User;
import com.vivek.org.exception.ContentsNotFoundException;
import com.vivek.org.exception.UserBlockedException;
import com.vivek.org.exception.UserNotFoundException;
import com.vivek.org.service.UserService;

@RestController
@CrossOrigin(origins="http://localhost:4200")
@RequestMapping("/api/")
public class UserController {
	@Autowired
	UserService userService;
	
	@PostMapping("/user")
	public ResponseEntity<User> save(@RequestBody User user) {
		if(userService.getUserByLoginName(user.getLoginName()).isPresent() == true) {
			throw new RuntimeException("User Name "+user.getLoginName()+" Already exist! Please try to register with new user name");
		}else {
			User savedUser = userService.saveOrUpdate(user);
			URI location = ServletUriComponentsBuilder
					.fromCurrentRequestUri()
					.path("/{id}")
					.buildAndExpand(savedUser.getId())
					.toUri();
			
			return ResponseEntity.created(location).build();

		}
	}
	
	@PutMapping("/user/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
		System.out.println(user.getId()+" --------- "+id);
		user.setId(id);
		User savedUser = userService.saveOrUpdate(user);
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequestUri()
				.buildAndExpand(savedUser.getId())
				.toUri();
		
		return ResponseEntity.created(location).build();
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers(){ 
		List<User> users = userService.getAllUsers();
		if(users.isEmpty() == true)
			throw new ContentsNotFoundException("User List does not found!");
		
		return users;
	}
	
//	@GetMapping("/user/{id}")
//	public Optional<User> getUser(@PathVariable("id") Long id) {
//		Optional<User> user = userService.getUserById(id);
//		System.out.println("==========="+user);
//		if(user.isPresent() == false) {
//			throw new UserNotFoundException("User Id "+id+" Does not exist");
//		}
//		return user;			
//	}
	
	@GetMapping("/user/{loginName}")
	public Optional<User> getUser(@PathVariable("loginName") String loginName) {
		System.out.println("==============> User Name : "+loginName);
		Optional<User> user = userService.getUserByLoginName(loginName);
		System.out.println("==========="+user);
		if(user.isPresent() == false) {
			throw new UserNotFoundException("User Name "+loginName+" Does not exist!");
		}else if(user.get().getLoginStatus() == 2) {
			throw new UserBlockedException("User "+ user.get().getName()+" has been blocked! Please contact to Admin");
		}else {
			return user;
		}
	}
	
	@GetMapping("/user/{id}/contacts")
	public List<Contact> retreiveUserContact(@PathVariable Long id){
		
		List<Contact> contacts = userService.fetchUserContacts(id);
		if(contacts.isEmpty() == true) {
			throw new ContentsNotFoundException("User "+id+" does not contain any Contacts!");
		}else
			return contacts;
	}
	
	@DeleteMapping("/user/{id}")
	public void deleteProject(@PathVariable("id") Long id) {
		Optional<User> user = userService.deleteUserById(id);
		if(user.isPresent() == false) {
			throw new UserNotFoundException("User Id "+id+" Does not exist");
		}
	}
}
