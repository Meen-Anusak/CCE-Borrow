import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { Products } from 'src/app/models/product-models';
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
    let product = new Products();
    product.p_Id = formProduct.value.p_Id;
    product.name_p = formProduct.value.name_p;
    product.stock = formProduct.value.stock;
    product.detail = formProduct.value.detail;
    product.image = this.fileImage;
    this.productService.onAddProduct(product,this.authen.getAccessToken())
      .subscribe(
        res =>{
          this.alert.ontify_Success(res.message,3000)
          formProduct.resetForm()
          this.imagePreview = ''
        },error =>{
          this.alert.ontify_Danger(error.error.error.message,3000)
        }
      )
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
