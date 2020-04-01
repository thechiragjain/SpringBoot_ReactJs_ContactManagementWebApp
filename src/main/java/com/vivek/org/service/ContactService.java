package com.vivek.org.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vivek.org.entity.Contact;
import com.vivek.org.entity.User;
import com.vivek.org.exception.ContactNotFoundException;
import com.vivek.org.repo.ContactRepository;
import com.vivek.org.repo.UserRepository;

@Service
public class ContactService {

	@Autowired
    private ContactRepository contactRepo;
    
    public Contact saveOrUpdate(Contact c) {
    	return contactRepo.save(c);
    }


    public List<Contact> getAllContacts() {
        return contactRepo.findAll();
    }
    
	public Optional<Contact> getContactById(Long id) {
		return contactRepo.findById(id);
	}

	public void deleteContactById(Long id) {
		Optional<Contact> contact = contactRepo.findById(id);
		if(contact.isPresent() == false)
			throw new ContactNotFoundException("Contact "+id+ " does not exist");
		else
			contactRepo.deleteById(id);
	}
}
