import { Component } from '@angular/core';
import { NavController, IonicPage,ToastController } from 'ionic-angular';
import { Item } from '../../models/item/item.module';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[AngularFireAuth]
})

export class HomePage {
  item:Item={
    postContent:'',
    id:'',
    timeAdded:'',
  email:''}

    postsCol: AngularFirestoreCollection<Item>;
    posts: any;
  
    postDoc:AngularFirestoreDocument<Item>;
    post:Observable<Item>;

  constructor(private afAuth:AngularFireAuth,
    private toast:ToastController,
    public navCtrl: NavController,
    private afs: AngularFirestore,
   ) {
  
  }
ngOnInit() {
 
  this.afAuth.authState.subscribe(data=>{
    if (data && data.email && data.uid){
    this.toast.create({
      message:`Welcome to APP_NAME, ${data.email}`,
      duration:3000
    }).present();
  }
else{
  this.toast.create({
    message:`Could not find authentication details`,
    duration:3000
  }).present();
}
  })
  this.postsCol = this.afs.collection('posts', ref => {
    return ref.orderBy('timeAdded','desc')
  }
);
  this.posts = this.postsCol.snapshotChanges()
    .map(actions =>{
    return actions.map(a=> {
      const data=a.payload.doc.data() as Item;
      const id=a.payload.doc.id;
      return {id,data};
    })
  })
  
}
  navAddPostPage(){
    this.navCtrl.push('AddPostPage');  
  }
  getView(Item){
    this.navCtrl.push('ViewItemPage',{Item});
    //this.postDoc = this.afs.doc('posts/'+Item);
    //this.post = this.postDoc.valueChanges();
  }
}
