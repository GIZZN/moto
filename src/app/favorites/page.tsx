'use client';

import React from 'react';
import styles from './page.module.css';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';

// Types
import type { FavoriteItem, CartItem } from './types';

export default function FavoritesPage() {
  const { items, removeFromFavorites, loading } = useFavorites();
  const { addToCart } = useCart();

  // Убираем проверку авторизации - теперь избранное доступно всем

  const handleAddToCart = async (item: FavoriteItem) => {
    const cartItem: CartItem = {
      id: parseInt(item.product_id),
      name: item.product_name,
      price: item.product_price,
      image: item.product_image
    };
    await addToCart(cartItem);
  };

  const handleRemoveFromFavorites = async (productId: string) => {
    await removeFromFavorites(productId);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка избранных товаров...</p>
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
          <Heart size={64} className={styles.emptyIcon} />
          <h2>Избранное пусто</h2>
          <p>Вы еще не добавили ни одного товара в избранное.<br />Перейдите в каталог и выберите понравившиеся мотоциклы.</p>
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
      
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroInfo}>
            <Heart className={styles.heroIcon} size={48} />
            <div>
              <h1 className={styles.heroTitle}>Избранное</h1>
              <p className={styles.heroSubtitle}>
                {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'} в избранном
              </p>
            </div>
          </div>
          
          <div className={styles.heroActions}>
            <Link href="/catalog" className={styles.catalogLink}>
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={styles.mainContent}>
        <div className={styles.productsGrid}>
          {items.map((item) => (
            <div key={item.id} className={styles.productCard}>
              <button 
                className={styles.favoriteBtn}
                onClick={() => handleRemoveFromFavorites(item.product_id)}
                title="Удалить из избранного"
              >
                <Heart size={20} fill="currentColor" />
              </button>
              
              <div className={styles.cardImage}>
                <Image 
                  src={item.product_image || '/images/products/placeholder1.jpg'} 
                  alt={item.product_name}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.productName}>{item.product_name}</h3>
                <p className={styles.productCategory}>Мотоциклы</p>
                
                <div className={styles.cardFooter}>
                  <div className={styles.productPrice}>
                    ₽{item.product_price.toLocaleString()}
                  </div>
                  <button 
                    className={styles.addToCartBtn}
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={18} />
                    В корзину
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
