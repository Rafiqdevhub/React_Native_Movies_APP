import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

interface ProfileOption {
    icon: any;
    title: string;
    subtitle: string;
    route: string;
}

const profileOptions: ProfileOption[] = [
    {
        icon: icons.save,
        title: "Watchlist",
        subtitle: "Movies you want to watch",
        route: "/watchlist",
    },
    {
        icon: icons.star,
        title: "Ratings",
        subtitle: "Rate and review movies",
        route: "/ratings",
    },
    {
        icon: icons.search,
        title: "Search History",
        subtitle: "Your recent searches",
        route: "/search-history",
    }
];

const Profile = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <ScrollView className="flex-1">
                <SafeAreaView className="px-5">
                    <View className="items-center mt-10">
                        <View className="size-24 rounded-full bg-dark-100 items-center justify-center border-2 border-accent">
                            <Image source={icons.person} className="size-12" tintColor="#fff" />
                        </View>

                        <Text className="text-white text-xl font-bold mt-4">Movie Explorer</Text>
                        <Text className="text-light-200 mt-1">Welcome to your profile</Text>
                    </View>

                    <View className="mt-10 space-y-4">
                        {profileOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                className="flex-row items-center bg-dark-100 p-4 rounded-xl"
                                onPress={() => router.push(option.route)}
                            >
                                <View className="size-12 bg-dark-200 rounded-full items-center justify-center">
                                    <Image
                                        source={option.icon}
                                        className="size-6"
                                        tintColor="#AB8BFF"
                                    />
                                </View>

                                <View className="ml-4 flex-1">
                                    <Text className="text-white font-semibold text-base">
                                        {option.title}
                                    </Text>
                                    <Text className="text-light-300 text-sm mt-0.5">
                                        {option.subtitle}
                                    </Text>
                                </View>

                                <Image
                                    source={icons.arrow}
                                    className="size-5"
                                    tintColor="#A8B5DB"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity className="mt-10 bg-dark-100 p-4 rounded-xl">
                        <View className="flex-row items-center">
                            <View className="size-12 bg-dark-200 rounded-full items-center justify-center">
                                <Image
                                    source={icons.logo}
                                    className="size-6"
                                    tintColor="#AB8BFF"
                                />
                            </View>

                            <View className="ml-4">
                                <Text className="text-white font-semibold text-base">
                                    About Movie App
                                </Text>
                                <Text className="text-light-300 text-sm mt-0.5">
                                    Version 1.0.0
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

export default Profile;