import { View, Text, Image } from 'react-native';
import { useGlobalContext } from '@/lib/global-provider';
import { useTranslation } from 'react-i18next';

interface UserAvatarProps {
    size?: number;
    textSize?: string;
}

const UserAvatar = ({ size = 12, textSize = 'text-base' }: UserAvatarProps) => {
    const { user } = useGlobalContext();
    const { t } = useTranslation();
    return (
        <View className="flex flex-row items-center">
            <Image source={{ uri: user?.avatar }} className={`size-${size} rounded-full`} />
            <View className="ml-2">
                <Text className="text-xs font-rubik text-black-100">{t('privet')}</Text>
                <Text className={`${textSize} font-rubik-medium text-black-300`}>{user?.name}</Text>
            </View>
        </View>
    );
};

export default UserAvatar;