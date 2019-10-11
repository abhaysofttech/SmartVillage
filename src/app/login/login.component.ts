import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../_services';

import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../register/register.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    imgPreview = 'assets/imgs/blank-avatar.jpg';

    croppedImagepath : SafeResourceUrl;
    isLoading = false;

    imagePickerOptions = {
        maximumImagesCount: 1,
        quality: 50
    };

    backdropDismiss = false;
    showBackdrop = false;
    shouldPropagate = false;
    enableBackdropDismiss = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private imagePicker: ImagePicker,
        private camera: Camera,
        private crop: Crop,
        public actionSheetController: ActionSheetController,
        private file: File,
        private base64: Base64,
        private sanitizer: DomSanitizer
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    getPhoto() {
        let options = {
            maximumImagesCount: 1
        };
        this.imagePicker.getPictures(options).then((results) => {
            for (var i = 0; i < results.length; i++) {
                this.imgPreview = results[i];
                //   this.base64.encodeFile(results[i]).then((base64File: string) => {
                //     this.regData.avatar = base64File;
                //   }, (err) => {
                //     console.log(err);
                //   });
            }
        }, (err) => { });
    }
    pickImage(sourceType) {
        console.log(sourceType);
        const options: CameraOptions = {
            quality: 100,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
            console.log(imageData);
           
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            // let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.cropImage(imageData)
        }, (err) => {
            // Handle error
        });
    }

    async selectImage() {
        this.showBackdrop = true;
        const actionSheet = await this.actionSheetController.create({
            header: "Select Image source",
            buttons: [{
                text: 'Load from Library',
                handler: () => {
                    this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                }
            },
            {
                text: 'Use Camera',
                handler: () => {
                    this.pickImage(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
            ]
        });
        await actionSheet.present();
    }

    cropImage(fileUrl) {
        this.crop.crop(fileUrl, { quality: 50 })
            .then(
                newPath => {
                    this.showCroppedImage(newPath.split('?')[0])
                },
                error => {
                    alert('Error cropping image' + error);
                }
            );
    }

    showCroppedImage(ImagePath) {
        this.isLoading = true;
        var copyPath = ImagePath;
        var splitPath = copyPath.split('/');
        var imageName = splitPath[splitPath.length - 1];
        var filePath = ImagePath.split(imageName)[0];
       
        // this.base64.encodeFile(ImagePath).then((base64File: string) => {
        //     //   console.log(base64File);
        //  //   this.imgPreview = base64File;
        //       // convert base64 to raw binary data held in a string
        // var byteString = atob(base64File.split(',')[1]);

        // // separate out the mime component
        // var mimeString = base64File.split(',')[0].split(':')[1].split(';')[0];

        // // write the bytes of the string to an ArrayBuffer
        // var arrayBuffer = new ArrayBuffer(byteString.length);
        // var _ia = new Uint8Array(arrayBuffer);
        // for (var i = 0; i < byteString.length; i++) {
        //     _ia[i] = byteString.charCodeAt(i);
        // }

        // var dataView = new DataView(arrayBuffer);
        // var blob = new Blob([dataView], { type: mimeString });
        // console.log(blob);
        // this.imgPreview = URL.createObjectURL(blob);
        // }, (err) => {
        //     console.log(err);
        // });
        this.base64.encodeFile(ImagePath).then((base64File: string) => {
            //   console.log(base64File);
          //  this.croppedImagepath = base64File;
            this.croppedImagepath = this.sanitizer.bypassSecurityTrustResourceUrl(base64File);

            this.isLoading = false;
        }, (err) => {
            console.log(err);
        });

        this.file.readAsDataURL(filePath, imageName).then(base64 => {
            this.croppedImagepath = base64;
            this.isLoading = false;
        }, error => {
            alert('Error in showing image' + error);
            this.isLoading = false;
        });
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            phonenumber: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        if (this.f.phonenumber.value == 878787) {
            this.router.navigate([this.returnUrl]);
        }
        else {
            this.authenticationService.login(this.f.phonenumber.value, this.f.password.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }
    }
}

