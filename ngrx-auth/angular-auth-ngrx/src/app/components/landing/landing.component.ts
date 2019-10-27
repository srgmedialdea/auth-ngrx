import { Component, OnInit } from "@angular/core";
import { AppState, selectAuthState } from "src/app/store/app.states";
import { Store } from "@ngrx/store";
import { LogOut } from "src/app/store/actions/auth.actions";
import { Observable } from "rxjs";
import { User } from "src/app/models/user";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.css"]
})
export class LandingComponent implements OnInit {
  appAuthState: Observable<any>;
  isAuthenticated: false;
  user: User = null;
  errorMessage: string = null;

  constructor(private store: Store<AppState>) {
    this.appAuthState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.appAuthState.subscribe(state => {
    this.isAuthenticated = state.isAuthenticated;
    this.user = state.user;
    this.errorMessage = state.errorMessage;
    });
  }

  logOut(): void {
    this.store.dispatch(new LogOut());
  }
}
