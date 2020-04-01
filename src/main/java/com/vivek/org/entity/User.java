package com.vivek.org.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;

@Entity
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="userId")
	private Long id;
    private String name;
    private String phone;
    private String email;
    @ColumnDefault("'N/A'")
    private String address;
    private String loginName;
    private String password;
    
    @OneToMany(cascade = CascadeType.ALL,mappedBy="user", fetch=FetchType.LAZY)
    private List<Contact> contact;
   
    // Role : 1:Admin , 2:User
    @ColumnDefault("2")
    private Integer role;
    
    //LoginStatus : 1:Active , 2:Deactive
    @ColumnDefault("1")
    private Integer loginStatus;

    public User() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	

	public Integer getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(Integer loginStatus) {
		this.loginStatus = loginStatus;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", phone=" + phone + ", email=" + email + ", address=" + address
				+ ", loginname=" + loginName + ", password=" + password + ", contact=" + contact + ", role=" + role
				+ ", loginStatus=" + loginStatus + "]";
	}

	public List<Contact> fetchUserContacts() {
		return contact;
	}
	
//	public void setContact(List<Contact> contact) {
//		this.contact = contact;
//	}

    
}
