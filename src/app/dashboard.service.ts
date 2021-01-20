import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import * as bootstrap from "bootstrap";
import { PDF } from './PDF';

@Injectable({
  providedIn: 'root',
})

export class DashboardService {

  constructor(private db:AngularFireDatabase,private storage: AngularFireStorage) {}


  deletePDF(lang:string,pdfTitle:string,pdfLink:string,pdfCoverImage:string){
    console.log("deleting ",pdfTitle)
    this.db.list(`Donnees/PDFs/${lang}/${pdfTitle}`).remove();
    this.storage.storage.refFromURL(pdfLink).delete();
    console.log("pdf deleted")
    if (pdfCoverImage!=null) {
      this.storage.storage.refFromURL(pdfCoverImage).delete();
    }
  }
}
