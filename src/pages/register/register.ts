import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { User } from '../../models/item/user';
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {


  user:User={
    email:'',
    password:''
  }

  constructor(private toast:ToastController,
    private afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

 async register(user:User){
   try{
 const result= await  this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(
 
 )
  
 console.log(result);
    


   }
   catch (e){
     this.toast.create({
      message:`${e}`,
      duration:3000,
    }).present();

   }
  }

  navHome(){
    this.navCtrl.setRoot('HomePage');
  }
}
