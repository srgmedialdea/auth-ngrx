import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AppState, selectAuthState } from 'src/app/store/app.states';
import { Store } from '@ngrx/store';
import { SignUp } from 'src/app/store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

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
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    this.store.dispatch(new SignUp(payload));

  }


}
