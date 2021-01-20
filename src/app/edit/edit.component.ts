import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { fadeIn } from '../animations';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PDF } from '../PDF';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  animations:[fadeIn]
})


export class EditComponent implements OnInit {
  
  editModalvisible:boolean = false;

  @Input('pdf') pdf: PDF;
  @Input('lang') lang: string;
  updatingNow:boolean;
  imageUploaded: boolean = false
  pdfUploaded: boolean;
  editedPDF: PDF;
  image: any;
  pdfFile: any;
  imagePreview: any;
  updateInfo:number;
  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage) { }

  ngOnInit(): void {
    console.log(this.pdf);
    if(this.pdf.link.length==0){
      this.pdfUploaded = false;
    }
  }

  updateData(f: NgForm) {
    this.editedPDF = {
      cover_image: this.pdf.cover_image?this.pdf.cover_image:null,
      title: f.value['title'],
      description: f.value['description'],
      link:this.pdf.link?this.pdf.link:null
    }

  }


  addImage(event, file: FileList) {
    if (event.target.files && event.target.files[0]) {
      this.imageUploaded = true;
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
        this.image = file.item(0)
        console.log(this.image);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.imageUploaded = false;
    }
  }

  addPDF(file: FileList) {
    console.log("pdf added");
    this.pdfUploaded = true;
    this.pdfFile = file.item(0);
    console.log(this.pdfFile);
  }

  deletePDF() {
    console.log("deletingPDF");
    this.pdf.link = null
    this.pdfUploaded = false;
  }
  removeCurrentImage(){
    this.image = null;
    this.imageUploaded = false;
  }

  // Upload(path: string, file: File) {
  //   this.updatingNow = true;
  //   var myURL: any;
  //   return this.storage
  //     .upload(`${path}/${file.name}`, file)
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.storage
  //           .ref(`${path}/${file.name}`)
  //           .getDownloadURL()
  //           .subscribe((url) => {
  //             if (url) {
  //               myURL = url;
  //               console.log(url);
  //             }
  //           },() => {
  //           },() => {
  //             if (path.includes("PDF")) {
  //               if (path.includes("french")) {
  //                 this.PDF_fr.link = myURL;
  //               } else {
  //                 this.PDF_ar.link = myURL;
  //               }
  //             } else {
  //               if (path.includes("french")) {
  //                 this.PDF_fr.cover_image = myURL;
  //               } else {
  //                 this.PDF_ar.cover_image = myURL;
  //               }
  //             }
  //             this.uploadStatus+=1;
  //             if(this.uploadStatus==this.files_to_upload.length){
  //               this.uploadSucceed = true;
  //               this.UploadingNow = false;
  //               if(this.PDF_fr!=null){
  //                 this.db.list("Donnees/PDFs/french").set(this.PDF_fr.title, this.PDF_fr);
  //               }
  //               if(this.PDF_ar!=null){
  //                 this.db.list("Donnees/PDFs/arabic").set(this.PDF_ar.title, this.PDF_ar);
  //               }
  //               this.close_button.nativeElement.click();
  //               this.files_to_upload = [];
  //               this.preview_AR = null
  //               this.preview_FR = null
  //             }
  //           });
  //       })
  //     );
  // }
}
