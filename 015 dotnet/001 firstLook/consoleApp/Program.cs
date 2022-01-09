using System;

namespace consoleApp
{

    class Ogrenci
    {
        public int OgrNo { get; set; }
        
        public string Ad { get; set; }

        public string Sube { get; set; }
    }

    class Product{

        public string name { get; set; }

        public int price { get; set; }

        public string description { get; set; }
        
    }


    class Program
    {
        

        static void Main(string[] args)
        {
            /*

            Ogrenci ogr1 = new Ogrenci();
            ogr1.OgrNo = 100;
            ogr1.Ad = "Asım";
            ogr1.Sube = "12C";

            Console.WriteLine($"no: {ogr1.OgrNo} ad: {ogr1.Ad} Sube: {ogr1.Sube}");
            
            Ogrenci ogr2 = new Ogrenci(){
                OgrNo = 200,
                Ad="Feyza",
                Sube = "11A"

            };
            
            Console.WriteLine($"no: {ogr2.OgrNo} ad: {ogr2.Ad} Sube: {ogr2.Sube}");*/
            Console.Write("Dizinin boyutu ne olsun ? : ");

            int size = int.Parse(Console.ReadLine());
            
            Product [] products = new Product [size];

            
            for (int i = 0; i < size; i++)
            {
                products[i] = new Product();
                Console.WriteLine($"{i+1}. Urun ozellikleri");
                Console.Write("Urun ismi : ");
                products[i].name = Console.ReadLine();
                Console.Write("Urun fiyati  : ");
                products[i].price = int.Parse(Console.ReadLine());
                Console.Write("Urun aciklama : ");
                products[i].description = Console.ReadLine();
                
            }
            Console.WriteLine("\n\n");
            foreach (Product product in products)
            {
                Console.WriteLine($"Urun ismi : {product.name}\nUrun fiyati : {product.price}\nUrun aciklama : {product.description}\n\n");
            }
        }
    }
}
