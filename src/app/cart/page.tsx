'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, LogIn, Minus, Plus, Trash2, CreditCard } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart, createOrder, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [hasPaymentMethods, setHasPaymentMethods] = useState(true);

  // Проверяем способы оплаты при авторизации
  useEffect(() => {
    const checkPaymentMethods = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch('/api/user/payment-methods');
          if (response.ok) {
            const data = await response.json();
            setHasPaymentMethods(data.paymentMethods.length > 0);
          }
        } catch (error) {
          console.error('Error checking payment methods:', error);
        }
      }
    };

    checkPaymentMethods();
  }, [isAuthenticated]);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    setIsOrdering(true);
    setOrderError('');

    try {
      const result = await createOrder();
      
      if (result.success) {
        router.push('/profile?tab=orders');
      } else {
        setOrderError(result.error || 'Ошибка при создании заказа');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setOrderError('Ошибка при создании заказа');
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка корзины...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.emptyState}>
          <ShoppingCart size={64} className={styles.emptyIcon} />
          <h2>Корзина пуста</h2>
          <p>Вы еще не добавили ни одного товара в корзину.<br />Перейдите в каталог и выберите понравившиеся мотоциклы.</p>
          <Link href="/catalog" className={styles.catalogBtn}>
            <ShoppingCart size={18} />
            Перейти в каталог
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressContent}>
          <div className={`${styles.step} ${styles.stepActive}`}>
            <div className={styles.stepIcon}>
              <ShoppingCart size={20} />
            </div>
            <span>Корзина</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>2</div>
            <span>Оформление</span>
          </div>
          <div className={styles.stepLine}></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>3</div>
            <span>Подтверждение</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          
          {/* Error Message */}
          {orderError && (
            <div className={styles.errorMessage}>
              {orderError}
            </div>
          )}
          
          {/* Products Section */}
          <div className={styles.productsSection}>
            <div className={styles.sectionHeader}>
              <h2>Ваш заказ</h2>
              <button 
                className={styles.clearBtn}
                onClick={clearCart}
                title="Очистить корзину"
              >
                <Trash2 size={16} />
                Очистить всё
              </button>
            </div>
            
            <div className={styles.productsList}>
              {items.map((item) => (
                <div key={item.product_id} className={styles.productItem}>
                  <div className={styles.productImage}>
                    <Image 
                      src={item.product_image || '/images/products/placeholder1.jpg'} 
                      alt={item.product_name}
                      width={120}
                      height={90}
                      className={styles.image}
                    />
                  </div>
                  
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{item.product_name}</h3>
                    <p className={styles.productCategory}>Премиум класс</p>
                    <div className={styles.productPrice}>₽{item.product_price.toLocaleString()}</div>
                  </div>
                  
                  <div className={styles.productControls}>
                    <div className={styles.quantityControl}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product_id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className={styles.productTotal}>
                      ₽{(item.product_price * item.quantity).toLocaleString()}
                    </div>
                    
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => removeFromCart(item.product_id)}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Sidebar */}
        <aside className={styles.checkoutSidebar}>
          <div className={styles.sidebarSticky}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Итого</h3>
              
              <div className={styles.summaryRow}>
                <span>Товары ({items.length})</span>
                <span>₽{totalPrice.toLocaleString()}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Доставка</span>
                <span className={styles.free}>Бесплатно</span>
              </div>
              
              <div className={styles.summaryDivider}></div>
              
              <div className={styles.summaryTotal}>
                <span>К оплате</span>
                <span className={styles.totalAmount}>₽{totalPrice.toLocaleString()}</span>
              </div>
              
              {isAuthenticated ? (
                hasPaymentMethods ? (
                  <button
                    className={styles.checkoutBtn}
                    onClick={handleCheckout}
                    disabled={isOrdering}
                  >
                    <CreditCard size={18} />
                    {isOrdering ? 'Оформление...' : 'Оформить заказ'}
                  </button>
                ) : (
                  <div className={styles.prompt}>
                    <p>Добавьте способ оплаты</p>
                    <Link href="/profile" className={styles.promptBtn}>
                      <CreditCard size={18} />
                      Перейти в профиль
                    </Link>
                  </div>
                )
              ) : (
                <div className={styles.prompt}>
                  <p>Войдите для оформления</p>
                  <Link href="/auth/login" className={styles.promptBtn}>
                    <LogIn size={18} />
                    Войти в аккаунт
                  </Link>
                </div>
              )}
              
              <div className={styles.secureInfo}>
                <CreditCard size={16} />
                <span>Безопасная оплата</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      
      <Footer />
    </div>
  );
} 