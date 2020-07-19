import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @ViewChild('text',{static:true}) text;
  fontSizeControl = new FormControl(16, Validators.min(1));
  name_p : string;
  detail : string;
  stock  : string;
  image  : string;
  category : string;

  constructor(
    private activeRoute : ActivatedRoute,
    private productService : ProductService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params =>{
        this.getProductById(params.id);
      }
    )
  }

  getProductById(id:any){
    this.productService.onGetProductById(id)
      .subscribe(res =>{
        this.image = res.image
        this.name_p = res.name_p;
        this.text.nativeElement.innerHTML = res.detail
        this.stock = res.stock;
        this.category = res.category;

      })

  }

}
