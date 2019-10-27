import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  user: User = new User();
  appAuthState: Observable<any>;
  errorMessage: string | null;


  constructor(private store: Store<AppState>) {
    this.appAuthState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.appAuthState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    console.log(this.user);

    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new LogIn(payload));

  }

}
