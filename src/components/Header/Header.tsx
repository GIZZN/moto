'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { productsData } from '@/app/data/products';
import CachedAvatar from '@/components/CachedAvatar/CachedAvatar';
import { 
  Bike,
  Search,
  X,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  LogIn,
  Menu,
  Zap,
} from 'lucide-react';

const Header = () => {
  const { totalItems } = useCart();
  const { totalItems: favoritesCount } = useFavorites();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  // Состояние поиска
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof productsData>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Состояние мобильного меню
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('');
    setIsMobileMenuOpen(false);
  };

  // Функции для мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Поиск товаров
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = productsData.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(true);
  };

  // Обработка отправки формы поиска
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      setShowResults(false);
      setIsSearchFocused(false);
      router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Обработка клика на результат поиска
  const handleResultClick = (product: typeof productsData[0]) => {
    setSearchQuery('');
    setShowResults(false);
    setIsSearchFocused(false);
    router.push(`/catalog?search=${encodeURIComponent(product.name)}`);
  };

  // Закрытие результатов при клике вне поиска и мобильного меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <Zap size={14} />
            <span>Бесплатная доставка при заказе от 500 000 ₽</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          <button 
            className={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Открыть меню"
          >
            <Menu size={24} />
          </button>

          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <div className={styles.logoIconBox}>
                <Bike size={28} />
              </div>
              <div className={styles.logoText}>
                <span className={styles.logoMain}>MOTO</span>
                <span className={styles.logoSub}>SHOP</span>
              </div>
            </Link>
          </div>

          <nav className={styles.navigation}>
            <Link href="/catalog" className={styles.navLink}>
              <span>Каталог</span>
              <div className={styles.navLinkUnderline}></div>
            </Link>
            <Link href="/consultation" className={styles.navLink}>
              <span>Тест-драйв</span>
              <div className={styles.navLinkUnderline}></div>
            </Link>
          </nav>

          <div className={styles.searchWrapper} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Поиск мотоциклов..." 
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchQuery.length >= 2 && searchResults.length > 0) {
                    setShowResults(true);
                  }
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setIsSearchFocused(false);
                    setShowResults(false);
                  }, 150);
                }}
                className={styles.searchInput}
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className={styles.clearBtn}
                  onClick={() => {
                    setSearchQuery('');
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </form>

            {/* Результаты поиска */}
            {showResults && isSearchFocused && searchQuery.length >= 2 && (
              <div className={styles.searchDropdown}>
                {searchResults.length > 0 ? (
                  <>
                    <div className={styles.dropdownHeader}>
                      <span>Найдено: {searchResults.length}</span>
                    </div>
                    {searchResults.slice(0, 5).map((product) => (
                      <div 
                        key={product.id} 
                        className={styles.dropdownItem}
                        onClick={() => handleResultClick(product)}
                      >
                        <div className={styles.dropdownImage}>
                          <Image 
                            src={product.image} 
                            alt={product.name}
                            width={50}
                            height={50}
                            style={{ objectFit: 'contain' }}
                          />
                        </div>
                        <div className={styles.dropdownInfo}>
                          <div className={styles.dropdownName}>{product.name}</div>
                          <div className={styles.dropdownCategory}>{product.category}</div>
                        </div>
                        <div className={styles.dropdownPrice}>
                          {product.price.toLocaleString()} ₽
                        </div>
                      </div>
                    ))}
                    {searchResults.length > 5 && (
                      <div className={styles.dropdownFooter}>
                        <button onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}>
                          Показать все ({searchResults.length})
                        </button>
                      </div>
                    )}
                  </>
                ) : searchQuery.length >= 2 ? (
                  <div className={styles.dropdownEmpty}>
                    <Search size={32} />
                    <p>Ничего не найдено</p>
                    <span>Попробуйте другой запрос</span>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <div style={{ position: 'relative' }}>
              <Link href="/favorites" className={styles.actionBtn}>
                <Heart size={20} />
              </Link>
              {favoritesCount > 0 && <span className={styles.actionBadge}>{favoritesCount}</span>}
            </div>

            <div style={{ position: 'relative' }}>
              <Link href="/cart" className={styles.actionBtn}>
                <ShoppingCart size={20} />
              </Link>
              {totalItems > 0 && <span className={styles.actionBadge}>{totalItems}</span>}
            </div>

            {isAuthenticated ? (
              <div className={styles.userSection}>
                <Link href="/profile" className={styles.profileBtn}>
                  <div className={styles.profileAvatar}>
                    <CachedAvatar
                      src={user?.avatar}
                      alt="Аватар"
                      width={36}
                      height={36}
                      className={styles.avatarImg}
                      fallbackIcon={<User size={18} />}
                      priority
                    />
                  </div>
                  <span className={styles.profileName}>{user?.name}</span>
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link href="/auth/login" className={styles.loginBtn}>
                <LogIn size={18} />
                <span>ВОЙТИ</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay}>
          <div className={styles.mobileBackdrop} onClick={closeMobileMenu}></div>
          <div className={styles.mobilePanel}>
            <div className={styles.mobilePanelHeader}>
              <div className={styles.mobileLogo}>
                <Bike size={24} />
                <span>MOTOSHOP</span>
              </div>
              <button 
                className={styles.mobileCloseBtn}
                onClick={closeMobileMenu}
                aria-label="Закрыть"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.mobilePanelBody}>
              {/* Mobile Search */}
              <div className={styles.mobileSearchBox}>
                <form onSubmit={(e) => { handleSearchSubmit(e); closeMobileMenu(); }}>
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Поиск..." 
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </form>
              </div>

              {/* Mobile Navigation */}
              <nav className={styles.mobileNav}>
                <Link 
                  href="/catalog" 
                  className={styles.mobileNavItem}
                  onClick={closeMobileMenu}
                >
                  <Bike size={20} />
                  <span>Каталог</span>
                </Link>
                <Link 
                  href="/catalog?category=new" 
                  className={styles.mobileNavItem}
                  onClick={closeMobileMenu}
                >
                  <Zap size={20} />
                  <span>Новинки</span>
                </Link>
                <Link 
                  href="/consultation" 
                  className={styles.mobileNavItem}
                  onClick={closeMobileMenu}
                >
                  <User size={20} />
                  <span>Тест-драйв</span>
                </Link>
                <Link 
                  href="/favorites" 
                  className={styles.mobileNavItem}
                  onClick={closeMobileMenu}
                >
                  <Heart size={20} />
                  <span>Избранное</span>
                  {favoritesCount > 0 && <span className={styles.mobileItemBadge}>{favoritesCount}</span>}
                </Link>
                <Link 
                  href="/cart" 
                  className={styles.mobileNavItem}
                  onClick={closeMobileMenu}
                >
                  <ShoppingCart size={20} />
                  <span>Корзина</span>
                  {totalItems > 0 && <span className={styles.mobileItemBadge}>{totalItems}</span>}
                </Link>
              </nav>

              {/* Mobile User */}
              <div className={styles.mobileUserBox}>
                {isAuthenticated ? (
                  <>
                    <Link 
                      href="/profile" 
                      className={styles.mobileProfile}
                      onClick={closeMobileMenu}
                    >
                      <div className={styles.mobileProfileAvatar}>
                        <CachedAvatar
                          src={user?.avatar}
                          alt="Аватар"
                          width={44}
                          height={44}
                          className={styles.mobileAvatarImg}
                          fallbackIcon={<User size={22} />}
                        />
                      </div>
                      <div className={styles.mobileProfileInfo}>
                        <span className={styles.mobileProfileName}>{user?.name}</span>
                        <span className={styles.mobileProfileEmail}>{user?.email}</span>
                      </div>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className={styles.mobileLogoutBtn}
                    >
                      <LogOut size={18} />
                      <span>Выйти</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/auth/login" 
                    className={styles.mobileLoginBtn}
                    onClick={closeMobileMenu}
                  >
                    <LogIn size={18} />
                    <span>ВОЙТИ В АККАУНТ</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;