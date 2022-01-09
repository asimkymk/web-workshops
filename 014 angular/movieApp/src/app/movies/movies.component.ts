import { NonNullAssert } from "@angular/compiler";
import { Component } from "@angular/core";
import { Movie } from "../movie";
import { Movies } from "../movie.datasource";
import { MovieService } from "../movie.service";


@Component({
  selector: 'movies', // <movies></movies>
  templateUrl: 'movies.component.html'

})
export class MoviesComponent {
  title = "Movie List";
  movies: any;
  selectedMovie: any;
  constructor(private movieService: MovieService) {

  }
  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }
  getMovies(): void {
    this.movieService.getMovies().subscribe(movies =>
      this.movies = movies
    );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getMovies();
  }
  add(name:string,imageUrl:string,description:string):void{
    this.movieService.add({
      name,
      imageUrl,
      description
    } as Movie).subscribe(
      movie=>
      {
        this.movies.push(movie);
      }
    )
  }
  delete(movie:any):void{
    const index = this.movies.indexOf(movie);
    this.movies = this.movies.splice(index,1);
    this.movieService.delete(movie).subscribe();
  }


}
