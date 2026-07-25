export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'hot' | 'cold' | 'filter';
  type?: 'hot' | 'cold';
  isSignature?: boolean;
  isFeatured?: boolean;
}

export const menuItems: MenuItem[] = [
  // Hot
  { id: 'h1', name: 'قهوة اليوم', price: 9, category: 'hot' },
  { id: 'h2', name: 'اسبريسو', price: 10, category: 'hot' },
  { id: 'h3', name: 'امريكانو', price: 12, category: 'hot' },
  { id: 'h4', name: 'ميكاتو', price: 12, category: 'hot' },
  { id: 'h5', name: 'بلاك كوفي', price: 12, category: 'hot' },
  { id: 'h6', name: 'كورنادو', price: 14, category: 'hot' },
  { id: 'h7', name: 'فلات وايت', price: 16, category: 'hot' },
  { id: 'h8', name: 'كابتشينو', price: 16, category: 'hot' },
  { id: 'h9', name: 'لاتيه', price: 17, category: 'hot' },
  { id: 'h10', name: 'اسبانيش لاتيه', price: 17, category: 'hot' },
  { id: 'h11', name: 'بستاشيو لاتيه', price: 20, category: 'hot' },
  { id: 'h12', name: 'كراميل لاتيه', price: 20, category: 'hot' },
  { id: 'h13', name: 'ماتشا لاتيه', price: 20, category: 'hot' },

  // Cold
  { id: 'c1', name: 'موهيتو روز يري', price: 17, category: 'cold' },
  { id: 'c2', name: 'موهيتو يريز ليمون', price: 17, category: 'cold' },
  { id: 'c3', name: 'موهيتو بلو اوشن', price: 17, category: 'cold' },
  { id: 'c4', name: 'موهيتو مكس', price: 17, category: 'cold' },
  { id: 'c5', name: 'موهيتو باشن فروت', price: 18, category: 'cold' },
  { id: 'c6', name: 'كركديه', price: 18, category: 'cold' },
  { id: 'c7', name: 'ايس لاتيه', price: 18, category: 'cold' },
  { id: 'c8', name: 'ايس ستفتشر براون', price: 19, category: 'cold', isSignature: true },
  { id: 'c9', name: 'اسبانيش لاتيه بارد', price: 19, category: 'cold' },
  { id: 'c10', name: 'ايس كراميل', price: 20, category: 'cold' },
  { id: 'c11', name: 'بستاشيو لاتيه بارد', price: 20, category: 'cold' },
  { id: 'c12', name: 'اسبرسو خوذ', price: 20, category: 'cold' },
  { id: 'c13', name: 'ايس يري', price: 19, category: 'cold' },
  { id: 'c14', name: 'ماتشا', price: 20, category: 'cold' },
  { id: 'c15', name: 'افقاتو براون', price: 25, category: 'cold', isFeatured: true },

  // Filter
  { id: 'f1_h', name: 'أثيوبي هنيبلا', price: 17, category: 'filter', type: 'hot' },
  { id: 'f1_c', name: 'أثيوبي هنيبلا', price: 17, category: 'filter', type: 'cold' },
  { id: 'f2_h', name: 'أثيوبي اوراقا فاخر', price: 18, category: 'filter', type: 'hot' },
  { id: 'f2_c', name: 'أثيوبي اوراقا فاخر', price: 18, category: 'filter', type: 'cold' },
  { id: 'f3_h', name: 'أثيوبي شلشلي فاخر', price: 20, category: 'filter', type: 'hot' },
  { id: 'f3_c', name: 'أثيوبي شلشلي فاخر', price: 20, category: 'filter', type: 'cold' },
  { id: 'f4_h', name: 'كولومبي الندو فاخر', price: 17, category: 'filter', type: 'hot' },
  { id: 'f4_c', name: 'كولومبي الندو فاخر', price: 18, category: 'filter', type: 'cold' },
  { id: 'f5', name: 'بن يمني', price: 19, category: 'filter' },
];
