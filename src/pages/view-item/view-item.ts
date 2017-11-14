import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController  } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../models/item/item.module';


@IonicPage()
@Component({
  selector: 'page-view-item',
  templateUrl: 'view-item.html',
})
export class ViewItemPage {
  item:Item={
    postContent:'',
    id:'',
    timeAdded:'',
  email:''}

    postDoc:AngularFirestoreDocument<Item>;
    post:Observable<Item>;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,private afs: AngularFirestore,public toastCtrl: ToastController) {
    this.item=this.navParams.get('Item')
   
  }

  ngOnInit() {
    
    this.postDoc = this.afs.doc('posts/'+this.item);
    this.post = this.postDoc.valueChanges();
  }
  deletePost(){
   this.afs.doc('posts/'+this.item).delete().then(function(){
   
  
   }).catch(function(error){
    console.error("unable to delete",error);
    });
   this.post = this.postDoc.valueChanges();
   this.presentToast();
   this.navCtrl.setRoot('HomePage');
  
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Post Succesfully Deleted',
      duration: 3000
    });
    toast.present();
  }
}
