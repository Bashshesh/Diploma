import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
    en: {
        translation: {
            // Profile
            profile: 'Profile',
            myBookings: 'My Bookings',
            payments: 'Payments',
            language: 'Language',
            logout: 'Logout',
            success: 'Success',
            loggedOut: 'Successfully logged out',
            error: 'Error',
            failedToLogout: 'Failed to log out',
            // Index
            privet: 'Hello',
            featured: 'Featured',
            niceDeals: 'Our Nice Deals',
            seeAll: 'See all',
            // PropertyDetails
            errorLoadingProperty: 'Error loading property: {{message}}',
            propertyNotFound: 'Property not found',
            propertyName: 'Property Name',
            apartment: 'Apartment',
            reviews: 'reviews',
            beds: 'Beds',
            bath: 'Bath',
            sqft: 'sqft',
            agent: 'Agent',
            unknownAgent: 'Unknown Agent',
            noEmail: 'No email available',
            overview: 'Overview',
            noDescription: 'No description available',
            facilities: 'Facilities',
            noFacilities: 'No facilities available',
            gallery: 'Gallery',
            noGallery: 'No gallery images available',
            location: 'Location',
            noLocation: 'Location not available',
            anonymous: 'Anonymous',
            noReviewText: 'No review text available',
            noDate: 'Date not available',
            noReviews: 'No reviews available',
            bookingNow: 'Booking Now',
            // Explore
            exploreProperties: 'Explore Properties',
            results: 'Results',
            // AdvancedFilters
            filter: 'Filter',
            reset: 'Reset',
            priceRange: 'Price Range',
            propertyType: 'Property Type',
            apartment: 'Apartment',
            condo: 'Condo',
            house: 'House',
            townhouse: 'TownHouse',
            studio: 'Studio',
            duplex: 'Duplex',
            other: 'Other',
            villa: 'Villa',
            homeDetails: 'Home Details',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            area: 'Area',
            setFilter: 'Set Filter',
            // Filters (Categories)
            all: 'All',
            popular: 'Popular',
            recommended: 'Recommended',
            newest: 'Newest',
            cheapest: 'Cheapest',
        },
    },
    ru: {
        translation: {
            // Profile
            profile: 'Профиль',
            myBookings: 'Мои бронирования',
            payments: 'Платежи',
            language: 'Язык',
            logout: 'Выйти',
            success: 'Успех',
            loggedOut: 'Успешно вышли',
            error: 'Ошибка',
            failedToLogout: 'Не удалось выйти',
            // Index
            privet: 'Привет',
            featured: 'Избранное',
            niceDeals: 'Наши лучшие предложения',
            seeAll: 'Смотреть все',
            // PropertyDetails
            errorLoadingProperty: 'Ошибка загрузки объекта: {{message}}',
            propertyNotFound: 'Объект не найден',
            propertyName: 'Название объекта',
            apartment: 'Квартира',
            reviews: 'отзывов',
            beds: 'Кроватей',
            bath: 'Ванных',
            sqft: 'кв. футов',
            agent: 'Агент',
            unknownAgent: 'Неизвестный агент',
            noEmail: 'Email отсутствует',
            overview: 'Обзор',
            noDescription: 'Описание отсутствует',
            facilities: 'Удобства',
            noFacilities: 'Удобства отсутствуют',
            gallery: 'Галерея',
            noGallery: 'Изображения в галерее отсутствуют',
            location: 'Местоположение',
            noLocation: 'Местоположение не указано',
            anonymous: 'Аноним',
            noReviewText: 'Текст отзыва отсутствует',
            noDate: 'Дата отсутствует',
            noReviews: 'Отзывы отсутствуют',
            bookingNow: 'Забронировать сейчас',
            // Explore
            Explore: 'Исследовать объекты',
            results: 'Результаты',
            // AdvancedFilters
            filter: 'Фильтр',
            reset: 'Сбросить',
            priceRange: 'Диапазон цен',
            propertyType: 'Тип недвижимости',
            apartment: 'Квартира',
            condo: 'Кондоминиум',
            house: 'Дом',
            townhouse: 'Таунхаус',
            studio: 'Студия',
            villa: 'Вилла',
            duplex: 'Дуплекс',
            other: 'Другое',
            homeDetails: 'Детали дома',
            bedrooms: 'Спальни',
            bathrooms: 'Ванные',
            area: 'Площадь',
            setFilter: 'Установить фильтр',
            // Filters (Categories)
            all: 'Все',
            popular: 'Популярное',
            recommended: 'Рекомендуемое',
            newest: 'Новое',
            cheapest: 'Дешевое',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: 'v3',
    });

const loadLanguage = async () => {
    try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    } catch (error) {
        console.error('Error loading language:', error);
    }
};

loadLanguage();

export default i18n;