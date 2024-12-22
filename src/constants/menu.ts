import type { MenuItem, Category } from '../types/menu';

export const categories: Category[] = [
  { 
    id: 'main', 
    name: 'Ana Yemekler', 
    order: 1,
    isActive: true
  },
  { 
    id: 'appetizer', 
    name: 'Başlangıçlar', 
    order: 2,
    isActive: true
  },
  { 
    id: 'drinks', 
    name: 'İçecekler', 
    order: 3,
    isActive: true
  },
  { 
    id: 'desserts', 
    name: 'Tatlılar', 
    order: 4,
    isActive: true
  },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    categoryId: 'main',
    name: 'Izgara Köfte',
    description: 'Özel baharatlarla hazırlanmış ızgara köfte, yanında pilav ve közlenmiş sebzeler',
    price: 120,
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTime: 20,
    order: 1,
    ingredients: [
      { id: 'meat', name: 'Köfte', isRemovable: false, isInStock: true },
      { id: 'rice', name: 'Pilav', isRemovable: true, isInStock: true },
      { id: 'tomato', name: 'Domates', isRemovable: true, isInStock: true },
      { id: 'pepper', name: 'Biber', isRemovable: true, isInStock: true },
      { id: 'onion', name: 'Soğan', isRemovable: true, isInStock: true },
    ],
    addons: [
      { id: 'cheddar', name: 'Cheddar Peyniri', price: 15, isAvailable: true },
      { id: 'onion-rings', name: 'Soğan Halkası', price: 25, isAvailable: true },
      { id: 'pickle', name: 'Turşu', price: 10, isAvailable: true },
      { id: 'jalapeno', name: 'Jalapeno', price: 12, isAvailable: true },
    ],
  },
  {
    id: '2',
    categoryId: 'main',
    name: 'Tavuk Şiş',
    description: 'Marine edilmiş tavuk göğsü, ızgara sebzeler ve özel baharatlar',
    price: 95,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTime: 25,
    order: 2,
    ingredients: [
      { id: 'chicken', name: 'Tavuk', isRemovable: false, isInStock: true },
      { id: 'rice', name: 'Pilav', isRemovable: true, isInStock: true },
      { id: 'grilled-veggies', name: 'Izgara Sebze', isRemovable: true, isInStock: true },
    ],
    addons: [
      { id: 'mushroom', name: 'Mantar Sote', price: 20, isAvailable: true },
      { id: 'cheese', name: 'Kaşar Peyniri', price: 15, isAvailable: true },
    ],
  },
  {
    id: '3',
    categoryId: 'appetizer',
    name: 'Mercimek Çorbası',
    description: 'Geleneksel tarif ile hazırlanan mercimek çorbası',
    price: 45,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTime: 10,
    order: 1,
    ingredients: [
      { id: 'lentil', name: 'Mercimek', isRemovable: false, isInStock: true },
      { id: 'crouton', name: 'Kruton', isRemovable: true, isInStock: true },
    ],
    addons: [
      { id: 'lemon', name: 'Limon', price: 2, isAvailable: true },
      { id: 'chili', name: 'Pul Biber', price: 0, isAvailable: true },
    ],
  },
  {
    id: '4',
    categoryId: 'drinks',
    name: 'Taze Sıkılmış Portakal Suyu',
    description: 'Günlük taze sıkılmış portakal suyu',
    price: 35,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTime: 5,
    order: 1,
    ingredients: [
      { id: 'orange', name: 'Portakal', isRemovable: false, isInStock: true },
    ],
    addons: [],
  },
  {
    id: '5',
    categoryId: 'desserts',
    name: 'Künefe',
    description: 'Antep fıstığı ile servis edilen geleneksel künefe',
    price: 75,
    image: 'https://images.unsplash.com/photo-1576677893504-5e76f683ad77?auto=format&fit=crop&w=600&q=80',
    isAvailable: true,
    preparationTime: 15,
    order: 1,
    ingredients: [
      { id: 'kunefe', name: 'Künefe', isRemovable: false, isInStock: true },
      { id: 'pistachio', name: 'Antep Fıstığı', isRemovable: true, isInStock: true },
    ],
    addons: [
      { id: 'ice-cream', name: 'Dondurma', price: 15, isAvailable: true },
      { id: 'kaymak', name: 'Kaymak', price: 10, isAvailable: true },
    ],
  },
];