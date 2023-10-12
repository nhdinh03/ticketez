package com.ticketez_backend_springboot.modules.account;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketez_backend_springboot.dto.AccountDTO;

public interface AccountDAO extends JpaRepository<Account, String> {
    // WHERE a.role = 0 ORDER BY a.active DESC
    @Query("SELECT new com.ticketez_backend_springboot.dto.AccountDTO( a.phone, a.fullname, a.email, a.birthday, a.gender, a.image, a.role, a.active, a.verified) FROM Account a " 
    +"WHERE a.role = false AND a.active = :active AND a.fullname like CONCAT('%', :search, '%') ORDER BY a.active DESC")
    Page<AccountDTO> getAllRoleUserAndActive(Pageable pageable, @Param("active") Boolean active, @Param("search") String search);

}
