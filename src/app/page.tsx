'use client';

import React from 'react';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import Image from 'next/image';
import Link from 'next/link';
import {ShoppingCart, Heart, Zap, Gauge, Wind, Trophy, Users, Headphones, Package} from 'lucide-react';

// Types
import type { Product } from './types';
import { productsData, categoriesData } from './data/products';

// Вспомогательные функции для стилей
const getCategoryBackground = (index: number): string => {
  if (index === 0) return 'linear-gradient(135deg, #F65C85 0%, #FC9665 100%)';
  if (index === 1) return 'linear-gradient(135deg, #047C94 0%, #3B5461 100%)';
  if (index === 2) return 'linear-gradient(135deg, #A65C54 0%, #C28B84 100%)';
  return 'linear-gradient(135deg, #FC9665 0%, #F65C85 100%)';
};

const getProductBorderColor = (index: number): string => {
  if (index % 3 === 0) return '4px solid #F65C85';
  if (index % 3 === 1) return '4px solid #047C94';
  return '4px solid #FC9665';
};

export default function Home() {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  const featuredProducts = productsData.slice(0, 6);
  const mainCategories = categoriesData.slice(0, 4);

  return (
    <div className={styles.page}>
      <Header />
      
      {/* Hero Section - Полностью новая разметка */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroWrapper}>
          <div className={styles.heroLeft}>
            <div className={styles.heroBadge}>
              <Zap size={16} />
              <span>НОВАЯ КОЛЛЕКЦИЯ 2025</span>
            </div>
            <h1 className={styles.heroMainTitle}>
              ПОЧУВСТВУЙ
              {''}
              <span className={styles.heroHighlight}>СВОБОДУ</span>
              {''}
              НА ДВУХ КОЛЕСАХ
            </h1>
            <p className={styles.heroText}>
              Эксклюзивные мотоциклы премиум-класса от мировых производителей. 
              Мощность, скорость, адреналин - всё это ждет тебя!
            </p>
            <div className={styles.heroButtons}>
              <Link href="/catalog" className={styles.btnPrimary}>
                <span>СМОТРЕТЬ КАТАЛОГ</span>
                <Wind size={20} />
              </Link>
              <Link href="/consultation" className={styles.btnSecondary}>
                ТЕСТ-ДРАЙВ
              </Link>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>350+</span>
                <span className={styles.heroStatLabel}>моделей</span>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>50+</span>
                <span className={styles.heroStatLabel}>брендов</span>
              </div>
              <div className={styles.heroStatDivider}></div>
              <div className={styles.heroStatItem}>
                <span className={styles.heroStatValue}>10K+</span>
                <span className={styles.heroStatLabel}>довольных клиентов</span>
              </div>
            </div>
          </div>
          <div className={styles.heroRight}>
            <div className={styles.heroImageBox}>
              <Image 
                src="/images/logo.png" 
                alt="Мотоцикл"
                width={500} 
                height={500}
                className={styles.heroImage}
              />
              <div className={styles.heroDecor1}></div>
              <div className={styles.heroDecor2}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Совершенно новый подход */}
      <section className={styles.categories}>
        <div className={styles.categoriesWrapper}>
          <div className={styles.categoriesTop}>
            <span className={styles.categoriesLabel}>ВЫБЕРИ СВОЙ СТИЛЬ</span>
            <h2 className={styles.categoriesTitle}>КАТЕГОРИИ МОТОЦИКЛОВ</h2>
          </div>
          <div className={styles.categoriesLayout}>
            {mainCategories.map((category, index) => (
              <Link
                href={`/catalog?category=${category.slug}`}
                key={category.id} 
                className={styles.categoryBox}
                style={{
                  background: getCategoryBackground(index)
                }}
              >
                <div className={styles.categoryIconBox}>
                  {category.icon}
                </div>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <div className={styles.categoryArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Карточный дизайн с перекосами */}
      <section className={styles.products}>
        <div className={styles.productsContainer}>
          <div className={styles.productsHeader}>
            <div className={styles.productsHeaderLeft}>
              <span className={styles.productsLabel}>ХИТ ПРОДАЖ</span>
              <h2 className={styles.productsTitle}>ПОПУЛЯРНЫЕ МОДЕЛИ</h2>
            </div>
            <Link href="/catalog" className={styles.productsLink}>
              Смотреть все →
            </Link>
          </div>
          <div className={styles.productsLayout}>
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={styles.productBox}
                style={{
                  borderTop: getProductBorderColor(index)
                }}
              >
                <button 
                  className={`${styles.favoriteIcon} ${isFavorite(product.id) ? styles.favoriteIconActive : ''}`}
                  onClick={() => handleToggleFavorite(product)}
                >
                  <Heart size={22} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                </button>
                <div className={styles.productImageBox}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={280}
                    height={200}
                    className={styles.productImg}
                  />
                  <div className={styles.productBadge}>{product.category}</div>
                </div>
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPriceBox}>
                    <span className={styles.productAmount}>{product.price.toLocaleString()} ₽</span>
                    <div className={styles.productRatingBox}>
                      <Zap size={14} fill="#FC9665" color="#FC9665" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <button 
                    className={styles.productBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} />
                    ДОБАВИТЬ В КОРЗИНУ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Горизонтальные карточки */}
      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <div className={styles.featureIconCircle} style={{background: '#F65C85'}}>
              <Trophy size={28} color="#fff" />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Гарантия качества</h3>
              <p className={styles.featureDesc}>Официальная гарантия 3 года на все модели</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconCircle} style={{background: '#047C94'}}>
              <Package size={28} color="#fff" />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Быстрая доставка</h3>
              <p className={styles.featureDesc}>Доставим ваш мотоцикл за 24 часа</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconCircle} style={{background: '#FC9665'}}>
              <Users size={28} color="#fff" />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Профессионалы</h3>
              <p className={styles.featureDesc}>Команда экспертов с опытом 15+ лет</p>
            </div>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIconCircle} style={{background: '#A65C54'}}>
              <Headphones size={28} color="#fff" />
            </div>
            <div className={styles.featureContent}>
              <h3 className={styles.featureTitle}>Поддержка 24/7</h3>
              <p className={styles.featureDesc}>Всегда на связи для консультаций</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner - Яркий акцент */}
      <section className={styles.promoBanner}>
        <div className={styles.promoContent}>
          <div className={styles.promoLeft}>
            <Gauge size={60} color="#FC9665" />
          </div>
          <div className={styles.promoCenter}>
            <h2 className={styles.promoTitle}>ГОТОВ К ПРИКЛЮЧЕНИЯМ?</h2>
            <p className={styles.promoText}>
              Забронируй тест-драйв любого мотоцикла прямо сейчас и получи скидку 10%
            </p>
          </div>
          <div className={styles.promoRight}>
            <Link href="/consultation" className={styles.promoBtn}>
              ЗАБРОНИРОВАТЬ
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
