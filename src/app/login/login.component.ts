import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './authentication/authentication.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DOCUMENT } from '@angular/common';

@Component({ 
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  get isDarkMode(): boolean {
    return this.currentTheme === 'theme-dark';
  }

  private currentTheme = 'theme-light';

  formGroup: FormGroup = new FormGroup({});
  loginDis = false;
  subscript = new Subject();
  errorMessage: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private readonly authService: AuthenticationService,
    private readonly router: Router,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
    ) { }

  ngOnInit() {
    this.createForm();
    this.currentTheme = localStorage.getItem('activeTheme') || 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
  }

  createForm(data?: any) {
    this.formGroup = this.formBuilder.group({
      username: [
        data ? data.userName : '',
        [Validators.required],
      ],
      password: [data ? data.password : '', Validators.required],
    });
  }

  onSubmit(post: any) {
    this.loginDis = true;
    if (post.username && post.password) {
      this.authService.login(post).pipe(takeUntil(this.subscript)).subscribe((response: any) => {
        this.loginDis = false;
        localStorage.setItem('token', response.data.token);
        this.router.navigateByUrl('/home/movies');
      }, (error: any) => {
        // this.router.navigateByUrl('/home/movies');
        this.loginDis = false;
        this.errorMessage = error.error.error.message;
        setTimeout(() => {
          this.errorMessage = ''
        }, 4000)
      });
    } else {
      this.loginDis = false;
    }
  }
  switchMode(isDarkMode: boolean) {
    this.currentTheme = isDarkMode ? 'theme-dark' : 'theme-light';
    this.renderer.setAttribute(this.document.body, 'class', this.currentTheme);
    localStorage.setItem('activeTheme', this.currentTheme);
  }
}
