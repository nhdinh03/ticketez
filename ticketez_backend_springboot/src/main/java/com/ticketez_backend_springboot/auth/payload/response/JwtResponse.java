package com.ticketez_backend_springboot.auth.payload.response;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

  private String id;
  private String phone;
  private String fullname;
  private String image;

  private String email;
  private String address;
  // private String password;
  private Date birthday;
  private String gender;

  private List<String> roles;
  private String token;
  private String type = "Bearer";

  public JwtResponse(String jwt, String id, String phone, String fullname, String email,
      String address, Date birthday, String gender, String image, String accessToken, String type, List<String> roles) {

    this.id = id;
    this.phone = phone;
    this.fullname = fullname;
    this.image = image;
    this.email = email;
    this.address = address;
    this.birthday = birthday;
    this.gender = gender;
    this.roles = roles;
    this.token = accessToken;
    this.type = type;
  }

}
