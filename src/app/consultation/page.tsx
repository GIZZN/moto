'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { productsData } from '@/app/data/products';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Bike, CheckCircle, Shield } from 'lucide-react';
import styles from './page.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  model: string;
  experience: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const experienceLevels = [
  { id: 'beginner', label: 'Новичок', description: 'Недавно получил права или минимальный опыт' },
  { id: 'intermediate', label: 'Средний уровень', description: 'Есть опыт управления мотоциклом' },
  { id: 'advanced', label: 'Опытный', description: 'Большой опыт езды на различных мотоциклах' },
  { id: 'professional', label: 'Профессионал', description: 'Профессиональный райдер или инструктор' }
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

export default function TestDrive() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    model: '',
    experience: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Пожалуйста, укажите номер телефона';
    } else if (!/^\+?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Некорректный формат номера телефона';
    }

    if (!formData.date) {
      newErrors.date = 'Выберите дату';
    }

    if (!formData.time) {
      newErrors.time = 'Выберите время';
    }

    if (!formData.model) {
      newErrors.model = 'Выберите модель мотоцикла';
    }

    if (!formData.experience) {
      newErrors.experience = 'Укажите ваш уровень опыта';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      model: '',
      experience: '',
      message: ''
    });
    setErrors({});
    setShowSuccess(false);
  };

  // Минимальная дата - сегодня
  const today = new Date().toISOString().split('T')[0];

  if (showSuccess) {
    const selectedProduct = productsData.find(p => p.id === parseInt(formData.model));
    
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <CheckCircle size={80} />
              </div>
              <h1 className={styles.successTitle}>Заявка успешно отправлена!</h1>
              <p className={styles.successText}>
                Спасибо за вашу заявку на тест-драйв. Наш менеджер свяжется с вами в ближайшее время для подтверждения брони.
              </p>

              <div className={styles.bookingDetails}>
                <h2>Детали бронирования</h2>
                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <User className={styles.detailIcon} size={20} />
                    <div>
                      <span className={styles.detailLabel}>Имя</span>
                      <span className={styles.detailValue}>{formData.name}</span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Mail className={styles.detailIcon} size={20} />
                    <div>
                      <span className={styles.detailLabel}>Email</span>
                      <span className={styles.detailValue}>{formData.email}</span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Phone className={styles.detailIcon} size={20} />
                    <div>
                      <span className={styles.detailLabel}>Телефон</span>
                      <span className={styles.detailValue}>{formData.phone}</span>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Calendar className={styles.detailIcon} size={20} />
                    <div>
                      <span className={styles.detailLabel}>Дата и время</span>
                      <span className={styles.detailValue}>
                        {new Date(formData.date).toLocaleDateString('ru-RU', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })} в {formData.time}
                      </span>
                    </div>
                  </div>

                  {selectedProduct && (
                    <div className={styles.detailItem}>
                      <Bike className={styles.detailIcon} size={20} />
                      <div>
                        <span className={styles.detailLabel}>Модель</span>
                        <span className={styles.detailValue}>{selectedProduct.name}</span>
                      </div>
                    </div>
                  )}

                  <div className={styles.detailItem}>
                    <Shield className={styles.detailIcon} size={20} />
                    <div>
                      <span className={styles.detailLabel}>Уровень опыта</span>
                      <span className={styles.detailValue}>
                        {experienceLevels.find(e => e.id === formData.experience)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.successActions}>
                <button className={styles.newBookingBtn} onClick={resetForm}>
                  Новая запись
                </button>
                <button 
                  className={styles.catalogBtn}
                  onClick={() => router.push('/catalog')}
                >
                  Смотреть каталог
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.formHeader}>
            <Bike className={styles.headerIcon} size={64} />
            <h1>Запись на тест-драйв</h1>
            <p>Забронируйте тест-драйв понравившегося мотоцикла и ощутите всю мощь на себе</p>
          </div>

          <form className={styles.bookingForm} onSubmit={handleSubmit}>
            {/* Личные данные */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Личные данные</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <User size={18} />
                    <span>Ваше имя *</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    placeholder="Иван Петров"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                  {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <Mail size={18} />
                    <span>Email *</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    <Phone size={18} />
                    <span>Телефон *</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                    placeholder="+7 (900) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>
            </div>

            {/* Дата и время */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Дата и время</h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="date" className={styles.label}>
                    <Calendar size={18} />
                    <span>Выберите дату *</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                    min={today}
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                  />
                  {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="time" className={styles.label}>
                    <Clock size={18} />
                    <span>Выберите время *</span>
                  </label>
                  <select
                    id="time"
                    className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                  >
                    <option value="">Выберите время</option>
                    {timeSlots.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.time && <span className={styles.errorText}>{errors.time}</span>}
                </div>
              </div>
            </div>

            {/* Выбор модели */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Выбор мотоцикла</h2>
              <div className={styles.formGroup}>
                <label htmlFor="model" className={styles.label}>
                  <Bike size={18} />
                  <span>Модель мотоцикла *</span>
                </label>
                <select
                  id="model"
                  className={`${styles.input} ${errors.model ? styles.inputError : ''}`}
                  value={formData.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                >
                  <option value="">Выберите модель</option>
                  {productsData.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.price.toLocaleString()} ₽
                    </option>
                  ))}
                </select>
                {errors.model && <span className={styles.errorText}>{errors.model}</span>}
              </div>
            </div>

            {/* Уровень опыта */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Уровень опыта</h2>
              <div className={styles.experienceGrid}>
                {experienceLevels.map(level => (
                  <button
                    key={level.id}
                    type="button"
                    className={`${styles.experienceCard} ${
                      formData.experience === level.id ? styles.experienceCardActive : ''
                    }`}
                    onClick={() => handleChange('experience', level.id)}
                  >
                    <div className={styles.experienceHeader}>
                      <span className={styles.experienceLabel}>{level.label}</span>
                      {formData.experience === level.id && (
                        <CheckCircle className={styles.experienceCheck} size={20} />
                      )}
                    </div>
                    <p className={styles.experienceDesc}>{level.description}</p>
                  </button>
                ))}
              </div>
              {errors.experience && <span className={styles.errorText}>{errors.experience}</span>}
            </div>

            {/* Дополнительное сообщение */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Дополнительная информация</h2>
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  <MessageSquare size={18} />
                  <span>Комментарий (необязательно)</span>
                </label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  rows={4}
                  placeholder="Укажите дополнительные пожелания или вопросы..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                />
              </div>
            </div>

            {/* Кнопка отправки */}
            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Отправка...
                  </>
                ) : (
                  <>
                    Забронировать тест-драйв
                    <CheckCircle size={20} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className={styles.infoBox}>
            <Shield className={styles.infoIcon} size={24} />
            <div className={styles.infoContent}>
              <h3>Что нужно знать о тест-драйве</h3>
              <ul className={styles.infoList}>
                <li>Обязательно наличие водительского удостоверения категории A</li>
                <li>Тест-драйв проводится в присутствии нашего специалиста</li>
                <li>Продолжительность тест-драйва - до 30 минут</li>
                <li>Все мотоциклы застрахованы</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
