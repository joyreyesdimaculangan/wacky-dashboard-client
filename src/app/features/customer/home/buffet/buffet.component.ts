import { Component } from '@angular/core';

@Component({
  selector: 'app-buffet',
  standalone: true,
  imports: [],
  templateUrl: './buffet.component.html',
  styleUrl: './buffet.component.scss'
})
export class BuffetComponent {
  public buffet = [
    { name: "Delicious Dish 1", image: "assets/images/Afritada.jpg" },
    { name: "Delicious Dish 2", image: "assets/images/Boiled Crabs.jpg" },
    { name: "Delicious Dish 3", image: "assets/images/Chicken Caldereta.jpg" },
    { name: "Delicious Dish 4", image: "assets/images/Chicken Curry.jpg" },
    { name: "Delicious Dish 5", image: "assets/images/Chicken Inasal.jpg" },
    { name: "Delicious Dish 6", image: "assets/images/Ampalaya.jpg" },
    { name: "Delicious Dish 7", image: "assets/images/Crablets.jpg" },
    { name: "Delicious Dish 8", image: "assets/images/Crabs.jpg" },
    { name: "Delicious Dish 9", image: "assets/images/Imbutido.jpg" },
    { name: "Delicious Dish 10", image: "assets/images/Laing.jpg" },
    { name: "Delicious Dish 11", image: "assets/images/Langka.jpg" },
    { name: "Delicious Dish 12", image: "assets/images/Mixed Seafoods.jpg" },
    { name: "Delicious Dish 13", image: "assets/images/Paksiw.jpg" },
    { name: "Delicious Dish 14", image: "assets/images/Pansit.jpg" },
    { name: "Delicious Dish 15", image: "assets/images/Pork Adobo.jpg" },
    { name: "Delicious Dish 16", image: "assets/images/Pork Curry.jpg" },
    { name: "Delicious Dish 17", image: "assets/images/Pork Tausi.jpg" },
    { name: "Delicious Dish 18", image: "assets/images/Pusit.jpg" },
    { name: "Delicious Dish 19", image: "assets/images/Shanghai.jpg" },
    { name: "Delicious Dish 20", image: "assets/images/Shrimp.jpg" },
    { name: "Delicious Dish 21", image: "assets/images/Spaghetti.jpg" },
  ];

}
