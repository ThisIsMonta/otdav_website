import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { PDF } from '../PDF';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DashboardService } from '../dashboard.service';
import { Upload } from '../upload';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  //elements
  @ViewChild('close') close_button:ElementRef;

  //PDF VARIABLES

  files_to_upload:Array<Upload> = [];

  //END PDF VARIABLES

  //DATA FROM FIREBASE

  FRENCH_PDFS : Observable<any>;
  ARABIC_PDFS : Observable<any>;

  //END DATA FROM FIREBASE

  frIsChecked: boolean = false;
  arIsChecked: boolean = false;
  empty: any;
  progressInfo: number;
  UploadingNow: boolean = false;
  uploadSucceed : boolean = false;
  downloadURL: Observable<string>;
  submitted: boolean = false;
  image_selected_AR: boolean = false;
  image_selected_FR: boolean = false;
  PDF_ar: PDF;
  PDF_fr: PDF;
  coverFR: any;
  coverAR: any;
  ArImage: File;
  dataloaded: boolean = false;
  uploadStatus:number = 0;
  constructor(
    private ngZone: NgZone,
    private dService: DashboardService,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.FRENCH_PDFS = this.db.list('/Donnees/PDFs/french').valueChanges();
    this.ARABIC_PDFS = this.db.list('/Donnees/PDFs/arabic').valueChanges();
    setTimeout(()=>{
      this.dataloaded = true;
    },2000);
  }

  uploadData(f: NgForm) {
    this.submitted = true;
    if (f.invalid) {
      console.log("invalid");
    }else{
      if (this.arIsChecked) {
        this.PDF_ar = {
          cover_image: null,
          description: f.value['ar_description'],
          title: f.value['ar_title'],
          link: null,
        };
      }
      if (this.frIsChecked) {
        this.PDF_fr = {
          cover_image: null,
          description: f.value['fr_description'],
          title: f.value['fr_title'],
          link: null,
        };
      }
      if (this.PDF_fr != null || this.PDF_ar != null) {
        this.UploadToFirebase(f);
      }
    }
  }


  UploadToFirebase(form:NgForm){
    var totalSize = 0;
    for (let index = 0; index < this.files_to_upload.length; index++) {
      totalSize = this.files_to_upload[index].file.size;
    }  
    for(let i=0;i<this.files_to_upload.length;i++){
      this.Upload(this.files_to_upload[i].path,this.files_to_upload[i].file).subscribe((snapshot:UploadTaskSnapshot)=>{
        this.progressInfo = (snapshot.bytesTransferred/totalSize)*100;
      },()=>{
      },()=>{
        console.log(`upload ${i} done`);
        console.log(this.PDF_fr);
        console.log(this.PDF_ar);
      });
      form.resetForm();
    }
  }

  add_upload_data(path:string,files: FileList) {
    if (files != null || files.length!=0) {
      // if(!this.files_to_upload.find(x => x.name == files.item(0).name))
      this.files_to_upload.push(new Upload(path,files.item(0)));
      console.log(this.files_to_upload);
    }else{
      this.files_to_upload = []
    }
  }

  preview_FR(event,files:FileList) {
    if (event.target.files && event.target.files[0]) {
      this.image_selected_FR = true;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.coverFR = event.target.result;
        this.files_to_upload.push(new Upload('Covers/french',files.item(0)));
        console.log(this.files_to_upload);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.image_selected_FR = false;
    }
  }

  preview_AR(event,files:FileList) {
    if (event.target.files && event.target.files[0]) {
      this.image_selected_AR = true;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.coverAR = event.target.result;
        this.files_to_upload.push(new Upload('Covers/arabic',files.item(0)));
        console.log(this.files_to_upload);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.image_selected_AR = false;
    }
  }

  onSelectLanguage(form: NgForm) {
    if (form.value['fr_check']) {
      this.frIsChecked = true;
    } else {
      this.frIsChecked = false;
    }
    if (form.value['ar_check']) {
      this.arIsChecked = true;
    } else {
      this.arIsChecked = false;
    }
  }

  Upload(path: string, file: File) {
    this.UploadingNow = true;
    var myURL: any;
    return this.storage
      .upload(`${path}/${file.name}`, file)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.storage
            .ref(`${path}/${file.name}`)
            .getDownloadURL()
            .subscribe((url) => {
              if (url) {
                myURL = url;
                console.log(url);
              }
            },() => {
            },() => {
              if (path.includes("PDF")) {
                if (path.includes("french")) {
                  this.PDF_fr.link = myURL;
                } else {
                  this.PDF_ar.link = myURL;
                }
              } else {
                if (path.includes("french")) {
                  this.PDF_fr.cover_image = myURL;
                } else {
                  this.PDF_ar.cover_image = myURL;
                }
              }
              this.uploadStatus+=1;
              if(this.uploadStatus==this.files_to_upload.length){
                this.uploadSucceed = true;
                this.UploadingNow = false;
                if(this.PDF_fr!=null){
                  this.db.list("Donnees/PDFs/french").set(this.PDF_fr.title, this.PDF_fr);
                }
                if(this.PDF_ar!=null){
                  this.db.list("Donnees/PDFs/arabic").set(this.PDF_ar.title, this.PDF_ar);
                }
                this.close_button.nativeElement.click();
                this.files_to_upload = [];
                this.preview_AR = null
                this.preview_FR = null
              }
            });
        })
      );
  }

}
