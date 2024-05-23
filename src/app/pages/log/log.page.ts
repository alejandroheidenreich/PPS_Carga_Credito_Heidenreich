import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage implements OnInit {



  ngOnInit() {
  }


  public register: boolean = false;
  public selected: number = 0;
  public user!: User;
  public form: FormGroup = this.fb.group({
    email: [""],
    password: [""],
    password2: [""],
  });

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router, private toast: ToastController, private userService: UserService) { }

  onSubmit() {
    this.user =
    {
      id: '',
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      codes: [],
      credito: 0,
      role: 'user',
    }
    console.log(this.user);

    if (this.register) {
      this.registerUser();
    } else {
      this.loginUser();
    }
  }

  registerUser() {
    const password2 = this.form.controls['password2'].value
    if (this.user.password == password2) {
      this.auth.register(this.user)
        .then(async res => {
          this.userService.createUser(this.user);
          this.loginUser()
        })
        .catch(async error => {
          const t = await this.toast.create({
            position: 'bottom',
            message: error.message,
            duration: 2000
          });
          t.present();
        });
    }
  }

  loginUser() {
    this.auth.login(this.user)
      .then(res => {
        // if (res.user!.emailVerified) 
        this.router.navigate(['tabs/tab1']);
      }).catch(async error => {
        const t = await this.toast.create({
          position: "bottom",
          message: error.message,
          duration: 2000
        });
        t.present();
      });
  }

  changeMode() {
    setTimeout(() => {
      this.register = !this.register;
      this.form.controls['email'].setValue('');
      this.form.controls['password'].setValue('');
      this.form.controls['password2'].setValue('');
      this.selected = 0;
    }, 3000);
  }


  logAccount1() {
    this.register = false;
    this.form.controls['email'].setValue('account1@test.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 1;
  }

  logAccount2() {
    this.register = false;
    this.form.controls['email'].setValue('account2@test.com');
    this.form.controls['password'].setValue('123123');
    this.selected = 2;
  }
  logAccount3() {
    this.register = false;
    this.form.controls['email'].setValue('admin@admin.com');
    this.form.controls['password'].setValue('111111');
    this.selected = 3;
  }
}
