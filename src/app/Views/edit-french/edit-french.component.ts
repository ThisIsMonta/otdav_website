import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-french',
  templateUrl: './edit-french.component.html',
  styleUrls: ['./edit-french.component.css']
})
export class EditFrenchComponent implements OnInit {

  frenchFormEdit:FormGroup;
  images:any;
  content_fr:any;
  constructor(private router: Router,private db: AngularFireDatabase,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.db.list('Donnees/Interface').valueChanges().subscribe((ct)=>{
      console.log(ct);
      this.images = ct[0];
      this.content_fr = ct[2];
      console.log("images are ",this.images);
      this.frenchFormEdit = this.fb.group({
        organisation:[this.content_fr.organisation],
        notre_magazine:[this.content_fr.notre_magazine,[Validators.required]],
        a_propos:[this.content_fr.a_propos,[Validators.required]]
      });
    },(e)=>{
      console.log(e);
    });
  }

  updateView(){
    this.frenchFormEdit.markAllAsTouched();
    if(this.frenchFormEdit.invalid){
      console.log("invalid");
    }else{
      this.db.list('Donnees/Interface').set('Interface_FR',this.frenchFormEdit.value).then(() => {
        this.router.navigate(['/dashboard'])
      });      
    }
  }

  get notre_magazine(){
    return this.frenchFormEdit.get('notre_magazine');
  }

  get a_propos(){
    return this.frenchFormEdit.get('a_propos');
  }

}
