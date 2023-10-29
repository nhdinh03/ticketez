package com.ticketez_backend_springboot.modules.movie;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ticketez_backend_springboot.dto.MovieShowtimeDTO;
import com.ticketez_backend_springboot.dto.ResponseDTO;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplex;
import com.ticketez_backend_springboot.modules.cinemaComplex.CinemaComplexDao;
import com.ticketez_backend_springboot.modules.format.Format;
import com.ticketez_backend_springboot.modules.formatMovie.FormatMovie;
import com.ticketez_backend_springboot.modules.genre.Genre;
import com.ticketez_backend_springboot.modules.genreMovie.GenreMovie;
import com.ticketez_backend_springboot.modules.showtime.Showtime;
import com.ticketez_backend_springboot.modules.showtime.ShowtimeDAO;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/movie")
public class MovieAPI {
    @Autowired
    MovieDAO dao;
    @Autowired
    CinemaComplexDao cinemaComplexDao;

    @Autowired
    ShowtimeDAO showtimeDao;

    @GetMapping
    public ResponseEntity<?> findByPage(
            @RequestParam("page") Optional<Integer> pageNo,
            @RequestParam("limit") Optional<Integer> limit,
            @RequestParam("search") Optional<String> search) {
        try {
            if (pageNo.isPresent() && pageNo.get() == 0) {
                return new ResponseEntity<>("Tài nguyên không tồn tại", HttpStatus.BAD_REQUEST);
            }
            Sort sort = Sort.by(Sort.Order.desc("id"));
            Pageable pageable = PageRequest.of(pageNo.orElse(1) - 1, limit.orElse(10), sort);
            Page<Movie> page = dao.findAll(pageable);
            ResponseDTO<Movie> responeDTO = new ResponseDTO<>();
            responeDTO.setData(page.getContent());
            responeDTO.setTotalItems(page.getTotalElements());
            responeDTO.setTotalPages(page.getTotalPages());
            return ResponseEntity.ok(responeDTO);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/all")
    public ResponseEntity<List<Movie>> findAll() {
        List<Movie> movies = dao.findAllByOrderByIdDesc();
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> findById(@PathVariable("id") Long id) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(dao.findById(id).get());
    }

    @PostMapping
    public ResponseEntity<Movie> post(@RequestBody Movie movie) {
        dao.save(movie);
        return ResponseEntity.ok(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> put(@PathVariable("id") Long id, @RequestBody Movie movie) {
        if (!dao.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        dao.save(movie);
        return ResponseEntity.ok(movie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        try {
            if (!dao.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            dao.deleteById(id);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return new ResponseEntity<>("Không thể xoá, dữ liệu đã được sử dụng ở nơi khác", HttpStatus.CONFLICT);
        }
    }

    ////////////////////////////////
    @GetMapping("/get/movies-by-cinemaComplex/{cinemaComplexId}/{date}")
    public ResponseEntity<?> getDuLie(
            @PathVariable("cinemaComplexId") Long CinemaComplexId,
            @PathVariable("date") LocalDate date) {
        try {
            if (CinemaComplexId.equals("")) {
                return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
            }
            if (date == null || date.equals("")) {
                date = LocalDate.now();
            }
            CinemaComplex cinemaComplex = cinemaComplexDao.findById(CinemaComplexId).get();
            if (cinemaComplex != null) {
                List<Movie> movie = dao.getMoviesByCinemaComplex(cinemaComplex, date);
                return ResponseEntity.ok(movie);
            }
            return new ResponseEntity<>("Lỗi", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/get/movies-by-cinemaComplexTest")
    public ResponseEntity<?> gettest(
            @RequestParam("cinemaComplexId") Long cinemaComplexId,
            @RequestParam("date") Optional<LocalDate> date) {
        try {
            if (cinemaComplexId.equals("")) {
                return new ResponseEntity<>("Không tìm thấy phim cụm rạp", HttpStatus.NOT_FOUND);
            }

            CinemaComplex cinemaComplex = cinemaComplexDao.findById(cinemaComplexId).get();
            List<Movie> movies = dao.getMoviesByCinemaComplex(cinemaComplex, date.orElse(LocalDate.now()));
            
            if(movies.isEmpty()) {
               return ResponseEntity.ok(new ArrayList<>());
            }

            MovieShowtimeDTO movieShowtimeDTO = new MovieShowtimeDTO();

            List<MovieShowtimeDTO.MovieObjResp> listMovieObjResp = new ArrayList<>();

            for (Movie movie : movies) {

                MovieShowtimeDTO.MovieObjResp movieObjResp = movieShowtimeDTO.new MovieObjResp();

                List<MovieShowtimeDTO.MovieObjResp.FormatAndShowtimes> listFormatAndShowtimes = new ArrayList<>();

                List<Genre> genres = new ArrayList<>();
                for (GenreMovie genreMovie : movie.getGenresMovies()) {
                    genres.add(genreMovie.getGenre());
                }

                for (FormatMovie formatMovie : movie.getFormatsMovies()) {

                    MovieShowtimeDTO.MovieObjResp.FormatAndShowtimes formatAndShowtimes = movieObjResp.new FormatAndShowtimes();

                    formatAndShowtimes.setFormat(formatMovie.getFormat());

                    List<Showtime> showtime = showtimeDao.getShowtimesByCCXAndMovieAndFormatAndDate(cinemaComplex,
                            movie, formatMovie.getFormat(), date.orElse(LocalDate.now()));
                    formatAndShowtimes.setShowtimes(showtime);
                    listFormatAndShowtimes.add(formatAndShowtimes);

                }
                
                movieObjResp.setMovie(movie);
                movieObjResp.setGenres(genres);
                movieObjResp.setListFormatAndShowtimes(listFormatAndShowtimes);

                listMovieObjResp.add(movieObjResp);
                movieShowtimeDTO.setListMovieObjResp(listMovieObjResp);
            }

            return ResponseEntity.ok(movieShowtimeDTO);

        } catch (Exception e) {
            return new ResponseEntity<>("Lỗi kết nối server", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
