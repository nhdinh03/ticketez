package com.ticketez_backend_springboot.modules.serviceBooking;

import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.service.Service;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Services_Booking")
@Data
public class ServiceBooking {
	@EmbeddedId
	ServiceBookingPK serviceBookingPK;

	@ManyToOne
	@JoinColumn(name = "booking_id", insertable = false, updatable = false)
	private Booking booking;

	@ManyToOne
	@JoinColumn(name = "service_id", insertable = false, updatable = false)
	private Service service;

}