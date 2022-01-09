import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Location } from '@angular/common';
@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {


  //localhost:4200/detail/:id

  @Input() movie: any;
  constructor(
    private movieService: MovieService,
    private route:ActivatedRoute,
    private location:Location
  ) {

  }

  ngOnInit(): void {
    this.getMovie();
  }
  getMovie():void{
    const id = this.route.snapshot.paramMap.get('id');
    if(typeof id ==='string'){
      this.movieService.getMovie(parseInt(id)).subscribe(movie=>this.movie=movie);
    }

  }
  save():void{
    this.movieService.update(this.movie).subscribe(
      ()=>{
          this.location.back();
      }
    )
  }

}
