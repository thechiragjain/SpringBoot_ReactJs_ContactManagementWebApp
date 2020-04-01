package com.vivek.org.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
import com.vivek.org.exception.ContactNotFoundException;
import com.vivek.org.service.ContactService;

@RestController
@RequestMapping("/api/")
public class ContactController {

	@Autowired
	ContactService contactService;
	
	@PostMapping("/user/{id}/contact")
	public ResponseEntity<Contact> save(@PathVariable Long id,@RequestBody Contact contact) {
		User user = new User();
		user.setId(id);
		contact.setUser(user);
		contact = contactService.saveOrUpdate(contact);
		URI location =ServletUriComponentsBuilder
				.fromCurrentRequestUri()
				.path("/{id}")
				.buildAndExpand(contact.getId())
				.toUri(); 
		return ResponseEntity.created(location).build();
	}
	
	@PutMapping("/user/{id}/contact/{cid}")
	public ResponseEntity<Contact> update(@PathVariable("id")Long id,
			@PathVariable("cid")Long cid,@RequestBody Contact contact) {
		User user=new User();
		user.setId(id);
		contact.setUser(user);
		contact.setId(cid);
		contact = contactService.saveOrUpdate(contact);
		
		URI location = ServletUriComponentsBuilder.fromCurrentRequestUri()
				.buildAndExpand()
				.toUri();
		return ResponseEntity.created(location).build();
	}
	
//	@GetMapping("/contacts")
//	public List<Contact> getAllContacts(){ 
//		return contactService.getAllContacts();
//	}
//	
//	@GetMapping("/contact/{id}")
//	public Optional<Contact> getContactById(@PathVariable("id") Long id) {
//		return contactService.getContactById(id);
//	}
	
	@GetMapping("/user/{id}/contact/{cid}")
	public Optional<Contact> getUserContact(@PathVariable("cid") Long contactId){
		Optional<Contact> contact = contactService.getContactById(contactId);
		if(contact.isPresent() == false)
			throw new ContactNotFoundException("Contact "+contactId+" does not exist!");
		
		return contact;
	}
	
	@DeleteMapping("/user/{id}/contact/{cid}")
	public void deleteContactById(@PathVariable("cid") Long cid) {
		 contactService.deleteContactById(cid);
	}
}





