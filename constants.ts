
import { Product } from './types';

// الشعار الرسمي المستخرج من الصورة المرفقة
export const APP_LOGO = 'https://i.ibb.co/V9X9y4F/hr-logo.png'; 

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'حقيبة كلاسيك ذهبية',
    price: 75000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_MaB7m-sdTUI5reKAwGFQr6b-OHHUCc7cICzGblSPz1L6lmXJ7Za8i8McvLoVM1dHaIVhSCrgsy4-b-xqzG8CQObNS_t3yBddVNGvQWm2hgbBPQyH_XzYiZ3dLN9kW-WMYZEyhUQzBFZGIbhgP6TPKQKAnPpTYJlGAYoz1_Ic-sZo1js9crIdwFsFD0g5EJ78DOFzlJWh0XbSZHzCpwR8r8e7GOQQdbSZ8rMMPeNXLU952pB2KcjhuOTrlATnLhkgFhYrpiDQLIJ3',
    category: 'يد',
    description: 'جلد طبيعي فاخر',
    sales: 158
  },
  {
    id: '2',
    name: 'حقيبة يد ملكية',
    price: 120000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK3jtMOTtF2FQQ3CNbHYoudOZ9LO71eIKygpVMucnv_CL7LiiAL2rN8ZMo-kR1NwN_FvufnpxEzaSWViN9uNp-XyRlXNfWtSgAGXDcg3qCLz8L8psvLkJpHSONBSNDxJseu7q-IkFjgiPrF9oX7hx0BhY-mbECObJCWaHuasKwBLIhdNT05ZRKus1jH3MMOqSb1OudZXqWGjhmASm8Q2AxtgQpVfpQOIAuarbFUkXlWuXTwfJtN6DL8lY18mRIlrMejIhDn_sPpjTr',
    category: 'يد',
    description: 'إصدار محدود',
    sales: 124
  },
  {
    id: '3',
    name: 'حقيبة سهرة فاخرة',
    price: 95000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-ntIU9DOP7xxXhw4HmsizW2F_6kp3rUhBxEWtwoWM_-xBnuWY2xxeLEUl8QPTe9laKJHA3vbBJahvEAiHfDPlcqdvgvdQoz3x8m0tnpPEKrROKGPDw3z9BCVt4yyRb6WDRuvKHQTs6IzO7rOi2nI1ujzR2irecyc8bRwPLMd_sLMHvMEdeZcUxnl2HrCd8NsuaKpnMzv5pjq9Xzv7DUaxfj--5bnZ0zQh4AZHf8g9i6t--P1FEkfbsfXokBaOu1qHVnCl3B9V4hE4',
    category: 'سهرة',
    description: 'جلد تمساح أصلي',
    sales: 98
  },
  {
    id: '4',
    name: 'حقيبة يومية أنيقة',
    price: 85000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5_Q22dw30NkLTj69h2hUGbgD6Nt1Y3C3SJGTHmbi9PkJkjiYvlQsBlRP3hkCzXFX2CMCxmpyQbrywa46xBOj1EX6Fweung6-ZQm57Nk2SLSiXq3WBhL1VUaP1D9RYARdqKO8xBM5zqquG4pafLfvSLp4NLJ-8T9rAhSEgoZhJC9tF88tG-k3Zg9zzvkdXJLHCuTppAsN0xRqXgXJqabvAAK5XgORHnpmgjSHMg1oCflO3OE8CnMpsPEyYj_Ly2wBP8N7S-oV8Iuri',
    category: 'يومي',
    description: 'متوفرة بعدة ألوان',
    sales: 210
  },
  {
    id: '5',
    name: 'حقيبة عمل احترافية',
    price: 110000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzGC6ObdLY1n_TD2C3oRlsBejGeF3l1riKUyUUlmpicpl-4qNJOMvy_UygtV8F1z-Rddf5HaSOaODyrRHzOHNgB1F1tFMC2fxwxpJwdHuKA_8aArSSJbhv622sAfPQQ0v7uAJXYnYIW6ihGG6Y_HNdBDPNr-rZ6cUpBvGCSFs6XOjG-ddFDXqydGoxRVluE8HWwKOrLzzJtaNTvjYV-ukWOcB8mtEL8S7c2u9QNlCj3Jq7OlaKWtrb2Lt1vxFhCzKlKUAfv1ypQ1M-',
    category: 'عمل',
    description: 'تصميم رسمي أنيق',
    sales: 45
  },
  {
    id: '6',
    name: 'حقيبة ظهر عصرية',
    price: 65000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAarG8YNQVbsAQZ7c94nTlEQV-X07xYnhneCLWyuKvbKROhsVTwNv7H_DXebzbbTija4BDm-r5-LjW8cAb7CylOpvPF7oDc3tJ7i7NaDaJZi6D4bLBzBScH6gE8cvSy2zyfMerJn5DLgTtvGAtnJkAQHmbGGenE2e-OwmLeAvjY5q8XA-Pi6Syx89tZ66SIw2JdfvVcB70fegGfIsM4XjexGhO2zoa7ODevizhV4BafU6tjkAtw_7D75LL1zomMzthW3nk2PADmHrP4',
    category: 'ظهر',
    description: 'خفيفة الوزن وعملية',
    sales: 89
  },
  {
    id: '7',
    name: 'محفظة ملكية صغيرة',
    price: 35000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3v3SYlEXdR-Pd3aruuRMLvfHFtYhOW4rfygk9YCvB1hILjVkeStVIIafC_1OYpZNPopXxjMD9ReimF0NvnoX43ZndNGY3T3uPOzxwQWFoBSNOdIjEN4COIq1Xj4FSHU4Wr__yYtSFuieOPCIWC-IMwfF-H0-ReZpHZ8rSeZtZ2UldV4bqmLKwU5qzN2GCOZ3lH2foKr54O3s-7jIvqktxGckO3yHrnCj1X4GuR2hUMGgwQriqk79H5hwEqsPwuBRUQRozF9f1qfOU',
    category: 'محافظ',
    description: 'جلد طبيعي ناعم',
    sales: 312
  },
  {
    id: '8',
    name: 'حقيبة كروس كاجوال',
    price: 55000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLEdsJAvSOcc7X1F2FFFtjzrFb_NvPI2lPUwkxCyRjdmWsI0n1n-5U4VulqphWr7FnzWI-XglRzuQ4uGjDbYqpYECXUJaQDlETQZihCq41VBLOT5MFMcv7A-Z4Lxu2hVTsVztl5dsLdMclEHztiWZTf2YMk3LUDqTRDyuw9R2RhILdYzuZsxp_vA8UgfRK0fXY9fgfgTtuuYsUyJCv-x0oHvwkwWo73FLtuemzvtxaoHNM1y64KBRPWWBC8TcCpMKfaC_HHrLvoaoS',
    category: 'يومي',
    description: 'مثالية للتنزه',
    sales: 176
  }
];

export const CATEGORIES = [
  { id: '1', name: 'يد', icon: 'shopping_bag' },
  { id: '2', name: 'عمل', icon: 'work' },
  { id: '3', name: 'ظهر', icon: 'backpack' },
  { id: '4', name: 'محافظ', icon: 'account_balance_wallet' },
  { id: '5', name: 'سهرة', icon: 'nightlife' }
];
