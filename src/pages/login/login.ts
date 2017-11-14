import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/item/user';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AngularFireAuth]

})
export class LoginPage {

  user:User={
    email:'',
    password:''
  }

  constructor(private afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

 async login(user:User){
   try{
 const result=this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
 if(result){
  this.navCtrl.setRoot('HomePage');
  }
    
   }
 catch (e){
console.error(e);
 }
 }


 register(){
   this.navCtrl.push('RegisterPage');
 }

}
