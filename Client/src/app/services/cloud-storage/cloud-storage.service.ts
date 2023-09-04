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
          this.alerts
            .open('Upload is ' + progress + '% done', { status: 'info' })
            .subscribe();
          switch (snapshot.state) {
            case 'paused':
              this.alerts
                .open('Uploading paused', { status: 'warning' })
                .subscribe();
              break;
            case 'running':
              // this.alerts.open('Uploading ...', { status: 'info' }).subscribe();
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          // console.log(error);
          this.alerts.open('Upload failed: ', { status: 'error' }).subscribe();
          res(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.alerts
              .open('Upload success', { status: 'success' })
              .subscribe();
            res(downloadURL);
          });
        }
      );
    });
  }
}
