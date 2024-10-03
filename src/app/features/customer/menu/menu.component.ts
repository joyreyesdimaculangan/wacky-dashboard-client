import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public menu = [
    { name: "Afritada", image: "assets/images/Afritada.jpg", description: "Stew made with meat, vegetables, and tomato sauce" },
    { name: "Boiled Crabs", image: "assets/images/Boiled Crabs.jpg", description: "Boiling crab in salted water" },
    { name: "Chicken Caldereta", image: "assets/images/Chicken Caldereta.jpg", description: "Stew made of chicken, potatoes, bell peppers, and green olives in a spicy tomato sauce" },
    { name: "Chicken Curry", image: "assets/images/Chicken Curry.jpg", description: "Curry cooked with potatoes and carrots in coconut milk with mild curry powder" },
    { name: "Chicken Inasal", image: "assets/images/Chicken Inasal.jpg", description: "Grilled chicken marinated in vinegar, kalamansi juice, and other spices" },
    { name: "Ampalaya", image: "assets/images/Ampalaya.jpg", description: "Vegetable stir-fry made of bittermelon, tomatoes, and eggs" },
    { name: "Crablets", image: "assets/images/Crablets.jpg", description: "Seasoned small crabs that were dredged in cornstarch and deep-fried until crispy" },
    { name: "Crabs", image: "assets/images/Crabs.jpg", description: "Steamed crab" },
    { name: "Imbutido", image: "assets/images/Imbutido.jpg", description: "Meatloaf made with ground pork and stuffed with hard-boiled eggs and sliced ham or various sausages" },
    { name: "Laing", image: "assets/images/Laing.jpg", description: "Taro leaves cooked in coconut milk" },
    { name: "Langka", image: "assets/images/Langka.jpg", description: "Stew made from unripe jackfruit in coconut milk and spices" },
    { name: "Mixed Seafoods", image: "assets/images/Mixed Seafoods.jpg", description: "Combination of different seafoods" },
    { name: "Paksiw", image: "assets/images/Paksiw.jpg", description: "Paksiw na Isda or Fish Cooked in Vinegar" },
    { name: "Pansit", image: "assets/images/Pansit.jpg", description: "Stir-fried noodles with meat and vegetables" },
    { name: "Pork Adobo", image: "assets/images/Pork Adobo.jpg", description: "Pork braised in vinegar, soy sauce, garlic, and peppercorns" },
    { name: "Pork Curry", image: "assets/images/Pork Curry.jpg", description: "Curry made with pork cooked in aromatic spices" },
    { name: "Pork Tausi", image: "assets/images/Pork Tausi.jpg", description: "Pork with salted black beans" },
    { name: "Pusit", image: "assets/images/Pusit.jpg", description: "Squid dish cooked using the popular Filipino adobo method" },
    { name: "Shanghai", image: "assets/images/Shanghai.jpg", description: "A mixture of giniling wrapped in a thin egg crêpe" },
    { name: "Shrimp", image: "assets/images/Shrimp.jpg", description: "Shrimp cooked in a sweet and savory sauce" },
    { name: "Spaghetti", image: "assets/images/Spaghetti.jpg", description: "Pasta served with tomato sauce" },
  ];
}
