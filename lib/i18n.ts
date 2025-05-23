import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
    en: {
        translation: {
            // Существующие переводы
            profile: 'Profile',
            myBookings: 'My Bookings',
            payments: 'Payments',
            language: 'Language',
            logout: 'Logout',
            success: 'Success',
            loggedOut: 'Successfully logged out',
            error: 'Error',
            failedToLogout: 'Failed to log out',
            privet: 'Hello',
            featured: 'Featured',
            niceDeals: 'Our Nice Deals',
            seeAll: 'See all',
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
            Explore: 'Explore Properties',
            results: 'Results',
            filter: 'Filter',
            reset: 'Reset',
            priceRange: 'Price Range',
            propertyType: 'Property Type',
            condo: 'Condo',
            home: 'Home',
            townhome: 'TownHome',
            studio: 'Studio',
            duplex: 'Duplex',
            other: 'Other',
            homeDetails: 'Home Details',
            bedrooms: 'Bedrooms',
            bathrooms: 'Bathrooms',
            area: 'Area',
            setFilter: 'Set Filter',
            all: 'All',
            popular: 'Popular',
            recommended: 'Recommended',
            newest: 'Newest',
            cheapest: 'Cheapest',
            card1: 'Card 1',
            card2: 'Card 2',
            card3: 'Card 3',
            card4: 'Card 4',
            location1: 'Location 1',
            location2: 'Location 2',
            location3: 'Location 3',
            location4: 'Location 4',
            featured1: 'Featured 1',
            featured2: 'Featured 2',
            house: 'House',
            villas: 'Villas',
            apartments: 'Apartments',
            townhomes: 'Townhomes',
            others: 'Others',
            security: 'Security',
            helpCenter: 'Help Center',
            inviteFriends: 'Invite Friends',
            "Laundry": "Laundry",
            "Parking": "Parking",
            "Sports Center": "Sports Center",
            "Cutlery": "Cutlery",
            "Gym": "Gym",
            "Swimming pool": "Swimming pool",
            "Wifi": "Wifi",
            "Pet-friendly": "Pet-friendly",
            home: 'Home',
            explore: 'Explore',
            notifications: 'Notifications',
            noNotifications: 'No notifications available',
            clear: 'Clear',
            textwithagent: 'Chat with Agent',
            chat: 'Chat',
            writeMessage: 'Write Message',
            send: 'Send',
            payment: "Payment",
            totalAmount: "Total Amount",
            loading: "Loading",
            cardDetails: "Card Details",
            cardHolderName: "Cardholder Name",
            enterCardHolderName: "Enter cardholder name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvv: "CVV",
            payNow: "Pay Now",
        },
    },
    ru: {
        translation: {
            profile: 'Профиль',
            myBookings: 'Мои бронирования',
            payments: 'Платежи',
            language: 'Язык',
            logout: 'Выйти',
            success: 'Успех',
            loggedOut: 'Успешно вышли',
            error: 'Ошибка',
            failedToLogout: 'Не удалось выйти',
            privet: 'Привет',
            featured: 'Избранное',
            niceDeals: 'Наши лучшие предложения',
            seeAll: 'Смотреть все',
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
            exploreProperties: 'Исследовать объекты',
            results: 'Результаты',
            filter: 'Фильтр',
            reset: 'Сбросить',
            priceRange: 'Диапазон цен',
            propertyType: 'Тип недвижимости',
            condo: 'Кондоминиум',
            home: 'Дом',
            townhome: 'Таунхаус',
            studio: 'Студия',
            duplex: 'Дуплекс',
            other: 'Другое',
            homeDetails: 'Детали дома',
            bedrooms: 'Спальни',
            bathrooms: 'Ванные',
            area: 'Площадь',
            setFilter: 'Установить фильтр',
            all: 'Все',
            popular: 'Популярное',
            recommended: 'Рекомендуемое',
            newest: 'Новое',
            cheapest: 'Дешевое',
            card1: 'Карта 1',
            card2: 'Карта 2',
            card3: 'Карта 3',
            card4: 'Карта 4',
            location1: 'Местоположение 1',
            location2: 'Местоположение 2',
            location3: 'Местоположение 3',
            location4: 'Местоположение 4',
            featured1: 'Избранное 1',
            featured2: 'Избранное 2',
            house: 'Дом',
            villas: 'Виллы',
            apartments: 'Квартиры',
            townhomes: 'Таунхаусы',
            others: 'Другое',
            notifications: 'Уведомления',
            security: 'Безопасность',
            helpCenter: 'Центр помощи',
            inviteFriends: 'Пригласить друзей',
            Explore: 'Исследовать',
            "Laundry": "Прачечная",
            "Parking": "Парковка",
            "Sports Center": "Спортивный центр",
            "Cutlery": "Столовые приборы",
            "Gym": "Тренажерный зал",
            "Swimming pool": "Бассейн",
            "Wifi": "Wi-Fi",
            "Pet-friendly": "Допускаются животные",
            notifications: 'Уведомления',
            noNotifications: 'Уведомления отсутствуют',
            clear: 'Очистить',
            home: 'Главная страница',
            explore: 'Поиск',
            textwithagent: 'Чат с Агентом',
            chat: 'Чат',
            writeMessage: 'Написать сообщение',
            send: 'Отправить',
            payment: "Оплата",
            totalAmount: "Итого",
            loading: "Загрузка",
            cardDetails: "Детали карты",
            cardHolderName: "Имя владельца карты",
            enterCardHolderName: "Введите имя владельца карты",
            cardNumber: "Номер карты",
            expiryDate: "Срок действия",
            cvv: "CVV",
            payNow: "Оплатить сейчас",
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