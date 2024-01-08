import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../core/model/Product";
import {ProductserviceService} from "../core/ProductService/productservice.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  isEditMode: boolean = false;
  formVisible: boolean = false;
  bookToUpdate: Product | null = null;
  formProduct!: FormGroup;
  searchText: string = '';


  constructor(private productService: ProductserviceService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.productService.getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
      });
  }

  deleteProduct(product: Product): void {
    const confirmation = confirm(`Voulez-vous vraiment supprimer le livre "${product.name}" ?`);

    if (confirmation) {
      // Appel au service pour supprimer le livre
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          // Met à jour la liste des livres filtrés en retirant le livre supprimé
          this.products = this.products.filter(b => b.id !== product.id);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du livre :', error);
        }
      });
    }
  }

  startEditing(product: Product): void {
    // Active le mode d'édition et affiche le formulaire de modification
    this.isEditMode = true;
    this.bookToUpdate = product;
    this.formVisible = true;

    // Charge les détails du livre dans le formulaire
    this.formProduct.patchValue({
      name: product.name,
      price: product.price,
      description: product.description,
    });
  }

  updateProduct(): void {
    if (this.bookToUpdate) {
      // Met à jour le livre en utilisant le service BookService
      const updatedProduct: Product = {
        id: this.bookToUpdate.id,
        name: this.formProduct.value.name,
        price: this.formProduct.value.price,
        description: this.formProduct.value.description
      };

      this.productService.updateProduct(updatedProduct).subscribe({
        next: (data: Product) => {
          // Met à jour la liste des livres filtrés avec le livre mis à jour
          const index = this.products.findIndex(b => b.id === data.id);
          if (index !== -1) {
            this.products[index] = data;
          }

          // Réinitialise le formulaire et désactive le mode d'édition
          this.formProduct.reset();
          this.isEditMode = false;
          this.formVisible = false;
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du livre :', error);
        }
      });
    }
  }
  buyProduct(product: Product): void {
    this.productService.addProductToCart(product).subscribe({
      next: () => {
        alert ("product added with success");;
      },
      error : () => {
        alert ("product already exist");
      }
    })
  }
  viewDetails(product: Product): void {
    this.router.navigate(['/details', product.id]);
  }
  get  name() {
    return this.formProduct.get(' name');
  }

  get price() {
    return this.formProduct.get('price');
  }

  search() {
    if (this.searchText === '') {
      this.products = this.products;
    } else {
      this.products= this.products.filter(
        (b) => b.price.toString()  === this.searchText
      );
    }
  }
}
