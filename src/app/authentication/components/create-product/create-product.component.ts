import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  imagePreview: string | ArrayBuffer;
  fileImage: File;

  constructor(
    private productService : ProductService,
    private alert : AlertService,
    private authen : AuthenService,
  ) { }

  ngOnInit(): void {
  }
  onSubmit(formProduct : NgForm){
    if(formProduct.invalid) return this.alert.ontify_Danger('กรุณากรอกข้อมูลให้ครบถ้วน',3000)
    console.log(formProduct.value);

  }

  onPreviewImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.fileImage = metaImage;
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    }
  }
  onDeleteImage() {
    this.imagePreview = '';
    this.fileImage = undefined;
  }

}
