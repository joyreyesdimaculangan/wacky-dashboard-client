import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InquiryFormComponent } from "../inquiry-form/inquiry-form.component";
import { PackageDetailsComponent } from "./package-details/package-details.component";
import { PackagesCrmComponent } from '../../admin/admin-crm/packages-crm/packages-crm.component';
declare const Flowbite: any;


@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, InquiryFormComponent, PackageDetailsComponent, PackagesCrmComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  public packages = [
    { 
      name: "All-In 7th Birthday Party Package",
      image: "assets/images/Package 1_7th Birthday.jpg", 
      description: "Celebrate your child's 7th birthday with our All-In Party Package! Enjoy themed decorations, a delicious cake, interactive games, and a dedicated host. Includes unlimited buffet fiesta with 10 dishes and dessert for a very affordable price. Book now for an unforgettable celebration!", 
      inclusions: [
        "Customized Decorated Backdrop", 
        "Stage Style and Motif", 
        "Lights and Sounds + Spinner", 
        "Clown/Magician", 
        "Project Screen for AVP", 
        "Emcee/Host", 
        "Exclusive Venue for 3 hours use", "Customized 1 Layered Cake (6\"x4\")", "Eat and Drink All You Can", 
        "Unlimited Buffet Fiesta consists of 10 dishes and dessert"
      ],
      availableInclusions: [
        "More Customized Cake",
        "Additional Dishes and Dessert",
        "Additional 1hr for Venue"
      ]
    },
    { 
      name: "Standard Civil Wedding Package", 
      image: "assets/images/Package 2_Wedding.jpg", 
      description: "Celebrate your love with our all-inclusive Wedding Bliss Package, featuring a stunning venue, exquisite decor, and gourmet catering for up to 200 guests. Enjoy personalized wedding reception, elegant floral arrangements, and a hotel room for preparation of newlyweds. Let us turn your dream wedding into a beautiful reality!", 
      inclusions: [
        "Decorated Backdrop", 
        "Stage Style and Motif", 
        "Presidential Guest Table", 
        "Lights and Sounds + Spinner", 
        "Singer/Acoustic Live Brand", 
        "Projector Screen for AVP", 
        "Emcee/Host", 
        "Exclusive Venue for 3hrs use", 
        "Hotel Room for Preparation", 
        "1 Layered Cake (6\"x4\")", 
        "Eat and Drink All You Can", 
        "Unlimited Buffet Fiesta consists of 10 dishes"
      ],
      availableInclusions: [
        "Bridal Car",
        "More Customized Cake",
        "Additional Dishes and Dessert",
        "Additional 1hr for Venue"
      ]
    },
    { 
      name: "Simple Wedding Package", 
      image: "assets/images/Package 3_Simple Wedding.jpg", 
      description: "Celebrate your love with our Simple Wedding Package, designed for couples seeking a stress-free experience. This package features a cozy venue, essential decor, and catering for up to 150 guests. Book now to make your day memorable and beautiful.", 
      inclusions: [
        "Decorated Backdrop", 
        "Stage Style and Motif", 
        "Sounds System", 
        "Buffet Table", 
        "Free Restaurant Venue for 3hrs use", 
        "1 Layered Cake", 
        "Eat and Drink All You Can", 
        "Unlimited Buffet Fiesta consists of 10 dishes"
      ],
      availableInclusions: [
        "Lights and Sounds + Spinner", 
        "Singer/Acoustic Live Brand", 
        "Projector Screen for AVP", 
        "Emcee/Host", 
        "Bridal Car",
        "More Customized Cake",
        "Additional Dishes and Dessert",
        "Additional 1hr for Venue"
      ]
    },
    { 
      name: "All-In Christening & 1st Birthday Party Package", 
      image: "assets/images/Package 4_Christianing.jpg", 
      description: "Make your child's special day unforgettable with our All-In Christening & 1st Birthday Party Package! This all-inclusive offer features enchanting decorations, a delightful eat-all-you-can buffet, and a stunning cake to commemorate the occasion. Let our team handle every detail, so you can relax and enjoy the celebration with loved ones.", 
      inclusions: [
        "Decorated Backdrop", 
        "Stage Style and Motif", 
        "Lights and Sounds + Spinner", 
        "Singer or Clown Magician", 
        "Projector Screen for AVP", 
        "Emcee/Host", 
        "Exclusive Venue for 3hrs use", "Customized 1 Layered Cake (6\"x4\")", 
        "Eat and Drink All You Can", 
        "Unlimited Buffet Fiesta consists of 10 dishes"
      ],
      availableInclusions: [
        "More Customized Cake",
        "Additional Dishes and Dessert",
        "Additional 1hr for Venue"
      ]
    },
    { 
      name: "All-In Debut Package", 
      image: "assets/images/Package 5_Debut.jpg", 
      description: "Celebrate this momentous milestone with our All-In Debut Package! This comprehensive package includes elegant decorations, a delectable eat-all-you-can buffet, and a stunning birthday cake, all tailored to reflect your unique style. Enjoy a magical day filled with enchanting performances, unforgettable moments, and a dedicated team to ensure your celebration is seamless and memorable. Make your debut a night to remember!", 
      inclusions: [
        "Exclusive Venue for 4hrs of Use", "Lights and Sounds + DJ", 
        "Emcee/Host", 
        "Stage Style/Motif/Decor", 
        "2 Layered Cake", 
        "Acoustic Live Band", 
        "Projector for AVP", 
        "Hotel Room for the Debutante", 
        "Eat and Drink All-You-Can for up to 100 guests"
      ],
      availableInclusions: [
        "More Customized Cake",
        "Additional Dishes and Dessert",
        "Additional 1hr for Venue"
      ]
    },
    { 
      name: "For Small Celebrations", 
      image: "assets/images/Event 2.jpg", 
      description: "Perfect for intimate gatherings, our Small Celebration Package offers a cozy yet delightful experience. Enjoy a curated selection of delicious buffet, beverages, and charming decor that sets the mood for your special occasion. Whether it's a birthday, anniversary, or just a reason to celebrate, our attentive staff will ensure your event is memorable and stress-free. Celebrate life’s little moments with us!", 
      inclusions: [
        "Balloons", 
        "Customized Cake", 
        "Free Venue"
      ],
      availableInclusions: [
        "Emcee/Host",
        "Sound System",
        "Acoustic Live Band", 
        "Projector for AVP"
      ]
    }
  ];

  @ViewChild('packageModal') packageModal!: PackageDetailsComponent;
  isAddPackagesModalOpen: boolean = false;
  additionalPackages!: { image_url: string; name: string; description: string; };
  openPackageModal(offer: any) {
    this.packageModal.openModal(offer);
  }

  openAddPackages(packages: any) {
    this.isAddPackagesModalOpen = true;
  }

  closeAddPackages() {
    this.isAddPackagesModalOpen = false;
  }
}
