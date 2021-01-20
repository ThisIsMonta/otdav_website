import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})
export class UploaderComponent implements OnInit {

  @Input() file:File;
  @Input() path:string;
  @Input() form:any;
  task:AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private storage:AngularFireStorage,private db: AngularFireDatabase,) { }

  ngOnInit(): void {
    this.startUpload(this.path);
  }

  startUpload(path:String){
    const filepath = `${path}+${this.file.name}`
    const ref = this.storage.ref(filepath);

    this.task = this.storage.upload(filepath,this.file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(
        async()=>{
          this.downloadURL = await ref.getDownloadURL().toPromise();
          this.form.cover_image = this.downloadURL;
        }        
      )
    );
  }

}
