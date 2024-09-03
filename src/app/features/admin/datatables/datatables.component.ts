import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DrawerComponent } from '../drawer/drawer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datatables',
  standalone: true,
  imports: [ DrawerComponent, CommonModule, FormsModule],
  templateUrl: './datatables.component.html',
  styleUrl: './datatables.component.scss'
})
export class DatatablesComponent {
  searchText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  itemsPerPageOptions: number[] = [5, 10, 15, 20];
  data = [
    { id: 1, name: 'Flowbite', releaseDate: '2021/25/09', npmDownloads: 269000, growth: '49%', status: 'Pending' },
    { id: 2, name: 'React', releaseDate: '2013/24/05', npmDownloads: 4500000, growth: '24%', status: 'Pending' },
    { id: 3, name: 'Angular', releaseDate: '2010/20/09', npmDownloads: 2800000, growth: '17%', status: 'Pending' },
    { id: 4, name: 'Vue', releaseDate: '2014/12/02', npmDownloads: 3600000, growth: '30%', status: 'Pending' },
    { id: 5, name: 'Svelte', releaseDate: '2016/26/11', npmDownloads: 1200000, growth: '57%', status: 'Pending' },
    { id: 6, name: 'Ember', releaseDate: '2011/08/12', npmDownloads: 500000, growth: '44%', status: 'Pending'},
    { id: 7, name: 'Backbone', releaseDate: '2010/13/10', npmDownloads: 300000, growth: '9%', status: 'Pending' },
    { id: 8, name: 'jQuery', releaseDate: '2006/28/01', npmDownloads: 6000000, growth: '5%', status: 'Pending' },
    { id: 9, name: 'Bootstrap', releaseDate: '2011/19/08', npmDownloads: 1800000, growth: '12%', status: 'Pending' },
    { id: 10, name: 'Foundation', releaseDate: '2011/23/09', npmDownloads: 700000, growth: '8%', status: 'Pending' },
    { id: 11, name: 'Bulma', releaseDate: '2016/24/10', npmDownloads: 500000, growth: '7%', status: 'Approved' },
    { id: 12, name: 'Next.js', releaseDate: '2016/25/10', npmDownloads: 2300000, growth: '45%', status: 'Approved' },
    { id: 13, name: 'Nuxt.js', releaseDate: '2016/16/10', npmDownloads: 900000, growth: '50%', status: 'Approved' },
    { id: 14, name: 'Meteor', releaseDate: '2012/17/01', npmDownloads: 1000000, growth: '10%', status: 'Approved' },
    { id: 15, name: 'Aurelia', releaseDate: '2015/08/07', npmDownloads: 200000, growth: '20%', status: 'Approved' },
    { id: 16, name: 'Inferno', releaseDate: '2016/27/09', npmDownloads: 100000, growth: '35%', status: 'Approved' },
    { id: 17, name: 'Preact', releaseDate: '2015/16/08', npmDownloads: 600000, growth: '28%', status: 'Approved' },
    { id: 18, name: 'Lit', releaseDate: '2018/28/05', npmDownloads: 400000, growth: '60%', status: 'Approved' },
    { id: 19, name: 'Alpine.js', releaseDate: '2019/02/11', npmDownloads: 300000, growth: '70%', status: 'Approved' },
    { id: 20, name: 'Stimulus', releaseDate: '2018/06/03', npmDownloads: 150000, growth: '25%', status: 'Approved' },
    { id: 21, name: 'Solid', releaseDate: '2021/05/07', npmDownloads: 250000, growth: '80%', status: 'Approved' },
  ];

  filteredData() {
    return this.data.filter(item =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.releaseDate.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.npmDownloads.toString().includes(this.searchText) ||
      item.growth.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  pagedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData().slice(start, end);
  }

  totalPages() {
    return Math.ceil(this.filteredData().length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  changeItemsPerPage() {
    this.currentPage = 1;
  }

  resetSearch() {
    this.searchText = '';
  }

  viewItem(item: any) {
    console.log('View item:', item);
    // Implement your view logic here
  }

  editItem(item: any) {
    console.log('Edit item:', item);
    // Implement your edit logic here
  }

  deleteItem(item: any) {
    console.log('Delete item:', item);
    // Implement your delete logic here
  }
}
