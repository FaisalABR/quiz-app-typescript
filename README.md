# Quiz App Dot

Quiz App Dot adalah proyek React yang diinisialisasi menggunakan Vite. Proyek ini dibuat bertujuan untuk salah satu alur rekruitmen magang yang dilakukan di Dot Indonesia. Dan saya melakukan refactor dari javascript ke typescript.

## Getting Started

Ikuti langkah-langkah berikut untuk menginisialisasi proyek:

1. **Clone Repository**

   Jika kamu belum meng-clone repository, gunakan perintah berikut:

   ```bash
   git clone https://github.com/FaisalABR/quiz-app-typescript.git
   cd quiz-app-typescript
   ```

2. **Install Dependencies**

   Install semua dependencies yang diperlukan dengan perintah berikut:

   ```bash
   npm install
   ```

3. **Setup Environment Variable Firebase**
   Atur enviroment variable firebase kamu pada file .env :

   ```bash
   VITE_API_KEY=your_api_key_firebase
   VITE_AUTH_DOMAIN=your_auth_domain_firebase
   VITE_PROJECT_ID=your_project_id_firebase
   VITE_STORAGE_BUCKET=your_storage_bucket_firebase
   VITE_MESSAGE_SENDER=174264995425
   VITE_APP_ID=your_app_id_firebase
   VITE_MEASUREMENT_ID=your_measurment_id_firebase
   VITE_API_URL=your_base_api
   ```

4. **Run Development Server**

   Untuk menjalankan server pengembangan, gunakan perintah berikut:

   ```bash
   npm run dev
   ```

5. **Run Jsonplaceholder Server**
   Untuk menjalankan server jsonplaceholder, gunakan perintah berikut:

   ```bash
   npx json-server db.json
   ```
