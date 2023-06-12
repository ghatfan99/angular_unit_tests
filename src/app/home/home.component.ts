import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Post } from 'src/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: any;

  public constructor(private homeS: HomeService) {}

  public ngOnInit(): void {
    this.homeS.getUsers()
    .subscribe({    
      next: (results: any) => console.log(results),
      error: (error) => console.log('Error in get users')
    }
    );
    // console.log(this.userService.user);

    this.homeS.getPost(1)
    .subscribe({
      next: (value: Post) => {
        return console.log(value);        
      }, 
      error: (error) => console.log('error in get get Post details')
      
    });

    // test pour la mise à jour
    this.homeS.updatePost(1)
    .subscribe({
      next: (value: Post) => {
        console.log(value);        
      }, 
      error: (error) => console.log('error in get get Post details')      
    });
  }
}
