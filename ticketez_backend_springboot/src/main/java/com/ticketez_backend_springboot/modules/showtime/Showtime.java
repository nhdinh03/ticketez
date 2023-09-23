package com.ticketez_backend_springboot.modules.showtime;

import java.util.Date;
import java.util.List;

import com.ticketez_backend_springboot.modules.booking.Booking;
import com.ticketez_backend_springboot.modules.cinema.Cinema;
import com.ticketez_backend_springboot.modules.movie.Movie;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "Showtimes")
@Data
public class Showtime {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String startTime;
	private Date endTime;
	private int status;

	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@ManyToOne
	@JoinColumn(name = "cinema_id")
	private Cinema cinema;

	@OneToMany(mappedBy = "showtime")
	private List<Booking> bookings;

}