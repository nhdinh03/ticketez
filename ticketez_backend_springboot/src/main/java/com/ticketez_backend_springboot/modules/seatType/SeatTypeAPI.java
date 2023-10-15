package com.ticketez_backend_springboot.modules.seatType;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/api/seatType")
public class SeatTypeAPI {
    @Autowired
    SeatTypeDAO seatTypeDAO;

    @GetMapping("getAll")
    public ResponseEntity<List<SeatType>> findAll() {
        return ResponseEntity.ok(seatTypeDAO.findAllByOrderByIdDesc());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SeatType> findById(@PathVariable("id") Long id) {
        if (!seatTypeDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(seatTypeDAO.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<SeatType> post(@RequestBody SeatType seatType) {
        seatTypeDAO.save(seatType);
        return ResponseEntity.ok(seatType);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatType> put(@PathVariable("id") Long id, @RequestBody SeatType seatType) {
        if (!seatTypeDAO.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        seatTypeDAO.save(seatType);
        return ResponseEntity.ok(seatType);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            seatTypeDAO.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>("Không thể xóa diễn viên do tài liệu tham khảo hiện có", HttpStatus.CONFLICT);
        }

    }
}
