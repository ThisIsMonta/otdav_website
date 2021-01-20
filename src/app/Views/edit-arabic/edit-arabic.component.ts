import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-arabic',
  templateUrl: './edit-arabic.component.html',
  styleUrls: ['./edit-arabic.component.css']
})
export class EditArabicComponent implements OnInit {

  arabicFormEdit:FormGroup;
  images:any;
  content_ar:any;
  constructor(private router: Router,private db: AngularFireDatabase,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.db.list('Donnees/Interface').valueChanges().subscribe((ct)=>{
      console.log(ct);
      this.images = ct[0];
      this.content_ar = ct[1];
      console.log("images are ",this.images);
      this.arabicFormEdit = this.fb.group({
        organisation:[this.content_ar.organisation],
        notre_magazine:[this.content_ar.notre_magazine,[Validators.required]],
        a_propos:[this.content_ar.a_propos,[Validators.required]]
      });
    },(e)=>{
      console.log(e);
    });
  }

  updateView(){
    this.arabicFormEdit.markAllAsTouched();
    if(this.arabicFormEdit.invalid){
      console.log("invalid");
    }else{
      this.db.list('Donnees/Interface').set('Interface_AR',this.arabicFormEdit.value).then(() => {
        this.router.navigate(['/dashboard'])
      });      
    }
  }

  get notre_magazine(){
    return this.arabicFormEdit.get('notre_magazine');
  }

  get a_propos(){
    return this.arabicFormEdit.get('a_propos');
  }

}
