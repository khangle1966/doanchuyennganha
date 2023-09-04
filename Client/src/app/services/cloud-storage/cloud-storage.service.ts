import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
  StorageError,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class CloudStorageService {
  constructor(
    private afApp: FirebaseApp,
    @Inject(TuiAlertService)
    private readonly alerts: TuiAlertService
  ) {}

  // 'file' comes from the Blob or File API
  async upLoadImage(
    file: File | Blob,
    courseId: string
  ): Promise<string | StorageError> {
    console.log(file);
    const uploadTask = uploadBytesResumable(
      ref(
        getStorage(this.afApp),
        `courses/${courseId}/images/${Date.now().toString()}`
      ),
      file
    );

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    return new Promise((res, rej) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              this.alerts
                .open('Upload is paused', { status: 'warning' })
                .subscribe();
              break;
            case 'running':
              console.log('Upload is running');
              this.alerts
                .open('Upload is running', { status: 'info' })
                .subscribe();
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
          this.alerts
            .open('Upload is running', { status: 'error' })
            .subscribe();
          res(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.alerts
              .open('Upload is success', { status: 'success' })
              .subscribe();
            res(downloadURL);
          });
        }
      );
    });
  }
}
