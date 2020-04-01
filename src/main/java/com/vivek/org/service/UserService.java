package com.vivek.org.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vivek.org.entity.Contact;
import com.vivek.org.entity.User;
import com.vivek.org.exception.UserNotFoundException;
import com.vivek.org.repo.ContactRepository;
import com.vivek.org.repo.UserRepository;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepo;
    
    public User saveOrUpdate(User u) {
    	
    	return userRepo.save(u);
    }


    public List<User> getAllUsers() {
        List<User> users = userRepo.findAll();
        List<User> newUser = new ArrayList<User>();
        System.out.println("===== 1  > User list : "+users);
        for (User user : users) {
			if(user.getRole() == 2) {
				System.out.println("===== 2 > User  : "+user);
				newUser.add(user);
			}
		}
        users.clear();
        System.out.println("===== 5 > User  : "+users);

        return newUser;
    }
    
	public Optional<User> getUserById(Long id) {
		return userRepo.findById(id);
	}
	
	public Optional<User> getUserByLoginName(String loginName) {
		return userRepo.findByLoginName(loginName);
	}

	public Optional<User> deleteUserById(Long id) {
		Optional<User> user = getUserById(id);
		if(user.isPresent() == true) {
			userRepo.deleteById(id);
			return user;
		}
		else
			return user;
	}
//	@Autowired
//    private ContactRepository contactRepo;

	public List<Contact> fetchUserContacts(Long id) {
		try {
			User user = userRepo.findById(id).get();
			return user.fetchUserContacts();
		}catch(NoSuchElementException ex) {
			System.out.println("user===========123============>");
			throw new UserNotFoundException(" User "+ id +" Not exist!");
		}	
	}
}
