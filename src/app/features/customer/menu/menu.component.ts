import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  isDropdownOpen = false;
  selectedCategory: string | null = null;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false; 
  }

  public menu = [
    { name: "Delicious Dish 1", image: "assets/images/Afritada.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 2", image: "assets/images/Boiled Crabs.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 3", image: "assets/images/Chicken Caldereta.jpg", description: "A short description of the product"},
    { name: "Delicious Dish 4", image: "assets/images/Chicken Curry.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 5", image: "assets/images/Chicken Inasal.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 6", image: "assets/images/Ampalaya.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 7", image: "assets/images/Crablets.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 8", image: "assets/images/Crabs.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 9", image: "assets/images/Imbutido.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 10", image: "assets/images/Laing.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 11", image: "assets/images/Langka.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 12", image: "assets/images/Mixed Seafoods.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 13", image: "assets/images/Paksiw.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 14", image: "assets/images/Pansit.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 15", image: "assets/images/Pork Adobo.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 16", image: "assets/images/Pork Curry.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 17", image: "assets/images/Pork Tausi.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 18", image: "assets/images/Pusit.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 19", image: "assets/images/Shanghai.jpg", description: "A short description of the product"},
    { name: "Delicious Dish 20", image: "assets/images/Shrimp.jpg", description: "A short description of the product" },
    { name: "Delicious Dish 21", image: "assets/images/Spaghetti.jpg", description: "A short description of the product" },
  ];
}
