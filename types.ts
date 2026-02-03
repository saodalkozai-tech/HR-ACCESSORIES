
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  isFeatured?: boolean;
  sales?: number;
  specs?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  color?: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'editor' | 'viewer';
  displayName: string;
}

export enum AppScreen {
  HOME = 'home',
  CART = 'cart',
  CHECKOUT = 'checkout',
  PRODUCT_DETAIL = 'product_detail',
  AI_CONSULTANT = 'ai_consultant',
  ADMIN_DASHBOARD = 'admin_dashboard',
  ADMIN_REPORTS = 'admin_reports',
  ADMIN_ADD_PRODUCT = 'admin_add_product',
  ADMIN_NOTIFICATIONS = 'admin_notifications',
  ADMIN_CONTENT_MGMT = 'admin_content_mgmt',
  ADMIN_ORDERS = 'admin_orders',
  ADMIN_USER_MGMT = 'admin_user_mgmt'
}
