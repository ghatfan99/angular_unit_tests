import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { HomeService } from './home.service';

import { POST, UpdatedPost, USERS } from 'src/mocks/data';

describe('HomeService', () => {
  let httpTestingController: HttpTestingController;
  let service: HomeService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HomeService);
  });

  
  afterEach(() => {
    // expect no pending Http Call
    httpTestingController.verify
  })

  // le service a été bien crée
  it('Home Service should be created ....', () => {
    expect(service).toBeTruthy();
  });

  // la méthode est bien crée
  it('Le service doit avoir la méthode getUsers', () => {
    expect(service.getUsers).toBeTruthy();
  })

  // la méthode qui appelle getUsers et retourne une array de touts les utilisateurs 
  it('la méthode qui appelle getUsers et retourne une array de touts les utilisateurs', (done) => {    
    service.getUsers()
    .subscribe((res) => {
      // console.log(res);      
      expect(res).toEqual(USERS);
      done();
    });
    // !! Get a call on the pending request
    // const req = httpTestingController.expectOne(call => call.method === 'GET');
    const req = httpTestingController.expectOne({
      method: 'GET'
    });
    // !! Send this response to the pending request
    req.flush(USERS);
  });

  // la méthode qui appelle getPost by son id
  it('Cette méthode doit retourner un post par son id', () => {
    const id = 1;   
    // Act
    service.getPost(id).subscribe((data) => {
      // console.log(data);
      
      // Assert
      expect(data).toEqual(POST);
    });
    const req = httpTestingController.expectOne({
      method: 'GET'
    });
    req.flush(POST);
  });

  // la méthode appelle updatePost by son id
  it('Cette méthode doit mettre à jour un post par son id', (done) => {

    service.updatePost(1).subscribe((data) => {
      console.log(data);      
      expect(data).toEqual(UpdatedPost);
      done();
    });
    const resU = httpTestingController.expectOne({
      method: 'PUT'
    });

    resU.flush(UpdatedPost);
  });

});
