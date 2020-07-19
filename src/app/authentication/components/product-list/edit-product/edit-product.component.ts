import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenService } from 'src/app/services/authen.service';
import { NgForm } from '@angular/forms';
import { Products } from 'src/app/models/product-models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  imagePreview: string | ArrayBuffer;
  fileImage: File;
  ID:any

  @ViewChild('formProduct',{static:true}) formProduct : NgForm

  constructor(
    private productService : ProductService,
    private alert : AlertService,
    private authen : AuthenService,
    private activeRoute : ActivatedRoute,
    private localtion : Location,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params =>{
        this.ID = params.id;
        this.onGetProductById(params.id);
      }
    )
  }


  onSubmit(formProduct : NgForm){
    if(formProduct.invalid) return this.alert.ontify_Danger('กรุณากรอกข้อมูลให้ครบถ้วน',3000)
    let product = new Products();
    if(this.fileImage === undefined){
      product.p_Id = formProduct.value.p_Id;
      product.name_p = formProduct.value.name_p;
      product.stock = formProduct.value.stock;
      product.detail = formProduct.value.detail;
      product.category = formProduct.value.category;
    }else{
    product.p_Id = formProduct.value.p_Id;
    product.name_p = formProduct.value.name_p;
    product.stock = formProduct.value.stock;
    product.detail = formProduct.value.detail;
    product.category = formProduct.value.category;
    product.image = this.fileImage;
    }
    this.productService.onUpdateProduct(this.ID,product,this.authen.getAccessToken())
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

  onGetProductById(id){
    this.productService.onGetProductById(id)
      .subscribe( res =>{
        let {name_p,stock,detail,p_Id,category} = res
        this.imagePreview = res.image
        this.formProduct.controls['name_p'].setValue(name_p);
        this.formProduct.controls['stock'].setValue(stock);
        this.formProduct.controls['detail'].setValue(detail);
        this.formProduct.controls['p_Id'].setValue(p_Id)
        this.formProduct.controls['category'].setValue(category);
      },error =>{
        this.alert.ontify_Danger(error.error.error.message,3000)
      })
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

  onBack(){
    this.localtion.back()
  }

}

