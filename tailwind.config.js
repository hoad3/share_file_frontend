/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  mode: 'jit', // Sử dụng chế độ Just-in-Time Compilation (JIT) để tối ưu hóa và tăng tốc độ biên dịch
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Xóa bỏ CSS không sử dụng trong production
  theme: {
    extend: {},
  },
  plugins: [],
}

