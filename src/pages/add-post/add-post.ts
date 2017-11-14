import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item/item.module';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
  providers:[AngularFireAuth]
})
export class AddPostPage {
  item: Item = {
    postContent:'',
    id:'',
    timeAdded:'',
  email:''};
  constructor(private afAuth:AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams,private afs: AngularFirestore) {
  }

  addPost(){
    this.afAuth.authState.subscribe(data=>{ this.afs.collection('posts').add({'postContent':this.item.postContent,timeAdded:new Date,email:`${data.email}`});})
      this.navCtrl.setRoot('HomePage');
    }

        
       
  }