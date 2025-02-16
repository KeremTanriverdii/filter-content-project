
## Projeyi kullanmadan önce

Vscode terminalde git clone https://github.com/KeremTanriverdii/filter-content-project.git yazınız

projeyi açtıktan sonra kullanılan npm paketlerinin kullanımı için terminalde:

# Npm kullanıyorsanız
 npm install

# Yarn kullanıyorsanız
 yarn install

Bağımlılıkları yükledikten sonra 
# npm run dev
 veya
# yarn dev 

yazıp localde çalıştırabilirsiniz.

## Proje Hakkında
Json ile çekilen bilgileri inputla haber başlığına göre arama yaptırabiliyorsunuz 
ve checkboxla kategoriye göre filtreleyebiyorsunuz. İkiside aynı anda dinamik olarak çalışabilmektedir.

Bir navbar yerine bir sidebar kullanılmıştır ve md ekranda açıp kapatma özelliği kaldırılmıştır.
Responsive Design yapılmıştır.

Detay sayfası Next.js Dynamic Medatada sayesinde haber detay sayfasında sayfa title'ı dinamik olarak güncellenmektedir.
Detay sayfasında sidebar arama ve checkbox kullanışsız olduğundan usePathname() kullanılarak görünmez hale getirilmiştir.

Tasarım Tailwind Css ile yapılmıştır.
