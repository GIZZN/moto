import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { 
  Bike,
  MapPin,
  Phone,
  Mail,
  Clock,
  Zap,
  Shield
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.container}>
          <div className={styles.newsletter}>
            <div className={styles.newsletterContent}>
              <Zap size={40} className={styles.newsletterIcon} />
              <div className={styles.newsletterText}>
                <h3>ПОДПИСЫВАЙСЯ НА НОВОСТИ</h3>
                <p>Получай эксклюзивные предложения и новинки первым!</p>
              </div>
            </div>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Твой email" />
              <button type="button">ПОДПИСАТЬСЯ</button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.brandColumn}>
              <div className={styles.brandLogo}>
                <div className={styles.logoCircle}>
                  <Bike size={36} />
                </div>
                <h3>MOTO<span>SHOP</span></h3>
              </div>
              <p className={styles.brandDescription}>
                Твой путь к свободе начинается здесь. Эксклюзивные мотоциклы премиум-класса от мировых производителей. Профессиональный сервис и поддержка 24/7.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="Вконтакте" className={styles.socialBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.707-1.033-1.033-1.49-1.172-1.744-1.172-.356 0-.458.102-.458.593v1.563c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 7.715c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.169-.407.441-.407h2.744c.373 0 .508.203.508.643v3.473c0 .373.169.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.254 1.217-2.615 4.32-2.615 4.32-.203.322-.271.458 0 .78.203.254.864.847 1.287 1.364.779.932 1.371 1.717 1.523 2.268.169.593-.085.898-.593.898z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Телеграм" className={styles.socialBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16l-1.61 7.594c-.121.567-.444.707-.902.439l-2.507-1.849-1.21 1.166c-.134.134-.246.246-.506.246l.18-2.562 4.663-4.208c.203-.18-.044-.281-.315-.101L9.739 13.16l-2.506-.784c-.544-.17-.555-.544.114-.806l9.795-3.775c.454-.17.852.101.426.806z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Инстаграм" className={styles.socialBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className={styles.socialBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className={styles.linksColumn}>
              <h4>КАТАЛОГ</h4>
              <ul>
                <li><Link href="/catalog?category=sport">Спортивные</Link></li>
                <li><Link href="/catalog?category=cruiser">Круизеры</Link></li>
                <li><Link href="/catalog?category=touring">Туристические</Link></li>
                <li><Link href="/catalog?category=adventure">Приключенческие</Link></li>
                <li><Link href="/catalog?category=naked">Нейкеды</Link></li>
                <li><Link href="/catalog?category=electric">Электробайки</Link></li>
              </ul>
            </div>
            
            <div className={styles.linksColumn}>
              <h4>СЕРВИС</h4>
              <ul>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Тест-драйв</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Техобслуживание</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Запчасти</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Кастомизация</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Trade-In</a></li>
                <li><a href="#" onClick={(e) => e.preventDefault()}>Кредит</a></li>
              </ul>
            </div>
            
            <div className={styles.contactColumn}>
              <h4>КОНТАКТЫ</h4>
              <div className={styles.contactList}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon} style={{background: 'linear-gradient(135deg, #F65C85, #FC9665)'}}>
                    <MapPin size={18} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Адрес</span>
                    <p>Москва, Ленинградский пр-т, 39с79</p>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon} style={{background: 'linear-gradient(135deg, #047C94, #3B5461)'}}>
                    <Phone size={18} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Телефон</span>
                    <p><a href="tel:+74951234567">+7 (495) 123-45-67</a></p>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon} style={{background: 'linear-gradient(135deg, #FC9665, #F65C85)'}}>
                    <Mail size={18} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Email</span>
                    <p><a href="mailto:info@motoshop.ru">info@motoshop.ru</a></p>
                  </div>
                </div>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon} style={{background: 'linear-gradient(135deg, #A65C54, #C28B84)'}}>
                    <Clock size={18} />
                  </div>
                  <div className={styles.contactInfo}>
                    <span className={styles.contactLabel}>Режим работы</span>
                    <p>Ежедневно 10:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div className={styles.copyright}>
              <Shield size={16} />
              <span>© 2025 MOTOSHOP. Все права защищены.</span>
            </div>
            <div className={styles.legalLinks}>
              <a href="#" onClick={(e) => e.preventDefault()}>Политика конфиденциальности</a>
              <span className={styles.divider}>•</span>
              <a href="#" onClick={(e) => e.preventDefault()}>Договор оферты</a>
              <span className={styles.divider}>•</span>
              <a href="#" onClick={(e) => e.preventDefault()}>Правила возврата</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 