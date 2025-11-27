'use client';

import React, { useState, useMemo, useEffect } from 'react';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Star, Heart, ShoppingCart } from 'lucide-react';

// Data and types
import { productsData, categoryNames, getCategoryBySlug } from '@/app/data/products';
import type { PriceRange, SortOption } from './types';
import type { Product } from '@/app/types';

export default function Tovari() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, items } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const searchParams = useSearchParams();

  // Получаем поисковый запрос и категорию из URL
  useEffect(() => {
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    
    if (search) {
      setSearchQuery(search);
    }
    
    if (category) {
      const categoryName = getCategoryBySlug(category);
      if (categoryName && categoryNames.includes(categoryName)) {
        setSelectedCategory(categoryName);
      }
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Фильтр по поисковому запросу
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по категории
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Фильтр по цене
    if (priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= Number(priceRange.max));
    }

    switch (sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleToggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const sortOptions = [
    { value: 'popular', label: 'По популярности' },
    { value: 'priceAsc', label: 'По возрастанию цены' },
    { value: 'priceDesc', label: 'По убыванию цены' },
    { value: 'nameAsc', label: 'По названию А-Я' }
  ];

  return (
    <div className={styles.container}>
      {/* Header с заголовком и результатами */}
      <div className={styles.catalogHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.catalogTitle}>Каталог мотоциклов</h1>
          <div className={styles.resultsInfo}>
            {searchQuery && (
              <span className={styles.searchInfo}>
                Поиск: <strong>{searchQuery}</strong>
              </span>
            )}
            <span className={styles.resultsCount}>
              Найдено: {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : 'товаров'}
            </span>
          </div>
        </div>
      </div>

      {/* Основная структура: Sidebar + Content */}
      <div className={styles.mainLayout}>
        {/* Sidebar с фильтрами */}
        <aside className={styles.sidebar}>
          {/* Категории */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Категории</h3>
            <div className={styles.categoryList}>
              {categoryNames.map((category) => (
                <button 
                  key={category}
                  className={`${styles.categoryItem} ${selectedCategory === category ? styles.categoryActive : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span>{category}</span>
                  <span className={styles.categoryCount}>
                    ({productsData.filter(p => category === 'Все' || p.category === category).length})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Фильтр по цене */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Цена</h3>
            <div className={styles.priceInputs}>
              <input 
                type="number" 
                placeholder="От" 
                value={priceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                className={styles.priceInput}
              />
              <span className={styles.priceSeparator}>—</span>
              <input 
                type="number" 
                placeholder="До" 
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                className={styles.priceInput}
              />
            </div>
          </div>

          {/* Сортировка */}
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Сортировка</h3>
            <div className={styles.sortList}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.sortItem} ${sortBy === option.value ? styles.sortActive : ''}`}
                  onClick={() => setSortBy(option.value as SortOption)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Основной контент с продуктами */}
        <div className={styles.content}>
        {/* Сетка продуктов */}
        <div className={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const quantity = items.find(item => String(item.id) === String(product.id))?.quantity || 0;
              return (
                <div 
                  key={product.id} 
                  className={styles.productCard}
                >
                  <div className={styles.productImage}>
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={400}
                      height={300}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <div className={styles.productContent}>
                      <h3>{product.name}</h3>
                      <p className={styles.category}>{product.category}</p>
                      
                      <div className={styles.productRating}>
                        <div className={styles.ratingStars}>
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i}
                              size={16}
                              fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                        <span className={styles.ratingText}>
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                      
                      {quantity > 0 && (
                        <div className={styles.quantityIndicator}>
                          В корзине: {quantity}
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.productActions}>
                      <div className={styles.priceContainer}>
                        <p className={styles.price}>{product.price.toLocaleString()} ₽</p>
                      </div>
                      <div className={styles.buttonsContainer}>
                        <button 
                          className={styles.addToCart}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={18} />
                          {quantity > 0 ? 'Добавить ещё' : 'В корзину'}
                        </button>
                        <button 
                          className={`${styles.favoriteButton} ${isFavorite(product.id) ? styles.favoriteActive : ''}`}
                          onClick={() => handleToggleFavorite(product)}
                          title={isFavorite(product.id) ? 'Удалить из избранного' : 'Добавить в избранное'}
                        >
                          <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noProducts}>
              <ShoppingCart size={48} className={styles.noProductsIcon} />
              <h3>Мотоциклы не найдены</h3>
              <p>Попробуйте изменить параметры фильтров или поиска</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
} 