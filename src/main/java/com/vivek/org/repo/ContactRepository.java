package com.vivek.org.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vivek.org.entity.Contact;
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
