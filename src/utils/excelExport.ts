import * as XLSX from 'xlsx';

interface SalesData {
  date: string;
  time: string;
  orderNumber: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  paymentMethod: string;
}

export const exportSalesReport = (data: SalesData[], dateRange: string) => {
  // Excel çalışma kitabı oluştur
  const wb = XLSX.utils.book_new();

  // Verileri Excel formatına dönüştür
  const ws = XLSX.utils.json_to_sheet(data);

  // Sütun genişliklerini ayarla
  const colWidths = [
    { wch: 10 }, // Tarih
    { wch: 8 },  // Saat
    { wch: 12 }, // Sipariş No
    { wch: 30 }, // Ürün
    { wch: 8 },  // Miktar
    { wch: 10 }, // Birim Fiyat
    { wch: 10 }, // Toplam
    { wch: 15 }, // Ödeme Yöntemi
  ];
  ws['!cols'] = colWidths;

  // Çalışma sayfasını çalışma kitabına ekle
  XLSX.utils.book_append_sheet(wb, ws, 'Satış Raporu');

  // Excel dosyasını indir
  XLSX.writeFile(wb, `satis-raporu-${dateRange}.xlsx`);
};

export const generateSalesData = (
  hourlyData: Array<{ hour: string; revenue: number; orders: number }>,
  dateRange: string
): SalesData[] => {
  // Örnek veri oluştur
  const currentDate = new Date().toLocaleDateString('tr-TR');
  
  return hourlyData.flatMap(hourData => {
    const orders = [];
    const averageOrderValue = hourData.revenue / hourData.orders;
    
    for (let i = 0; i < hourData.orders; i++) {
      orders.push({
        date: currentDate,
        time: hourData.hour,
        orderNumber: `ORD-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        product: 'Örnek Ürün ' + (i % 5 + 1),
        quantity: Math.floor(Math.random() * 3) + 1,
        unitPrice: Math.round(averageOrderValue / 2),
        total: Math.round(averageOrderValue),
        paymentMethod: Math.random() > 0.5 ? 'Kredi Kartı' : 'Nakit'
      });
    }
    
    return orders;
  });
};