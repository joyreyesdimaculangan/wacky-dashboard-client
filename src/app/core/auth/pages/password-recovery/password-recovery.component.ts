import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [CommonModule],
  template: `<div 
    class="min-h-screen relative flex items-center justify-center bg-cover bg-center" 
    style="background-image: url('assets/images/Food House.jpg');"
  >
  <!-- Overlay with Green Opacity -->
  <div class="absolute inset-0 bg-green-200 opacity-50"></div>

  <!-- Password Recovery Card -->
  <div class="relative bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
      <!-- Logo -->
      <div class="absolute top-[-3.5rem] left-1/2 transform -translate-x-1/2">
        <img 
          src="assets/images/Wacky's Logo.png"
          alt="Logo" 
          class="h-28 w-28"
        />
      </div>

      <h2 class="text-4xl font-extrabold text-green-700 text-center mt-16 mb-8">
        Forgot Password
      </h2>

      <!-- Email Input -->
      <div class="mb-6">
          <label for="email" class="block text-green-900 font-semibold mb-2"
            >Email Address</label
          >
          <input 
            type="email" 
            id="email" 
            class="w-full p-4 border border-green-300 rounded-lg bg-white text-green-900 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent" 
            placeholder="Enter your email"
          />
      </div>

      <!-- Recovery Button -->
      <button class="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition duration-300">Send Recovery Link</button>

      <!-- Login Link -->
      <p class="text-center text-green-900 mt-8">Remember your password? <a href="#" class="text-green-700 hover:text-green-500 font-bold">Log In</a></p>
  </div>
</div>
`,
  styleUrl: './password-recovery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRecoveryComponent {

}
