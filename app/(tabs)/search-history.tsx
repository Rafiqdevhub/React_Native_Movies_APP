import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";

const SearchHistory = () => {
    const router = useRouter();
    const { data: trendingMovies, loading, error } = useFetch(getTrendingMovies);

    const handleSearchPress = (searchTerm: string) => {
        router.push({
            pathname: "search",
            params: { initialQuery: searchTerm }
        });
    };

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <SafeAreaView className="flex-1">
                <View className="px-5 flex-row items-center mt-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="size-10 items-center justify-center"
                    >
                        <Image
                            source={icons.arrow}
                            className="size-6 rotate-180"
                            tintColor="#fff"
                        />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold ml-2">Search History</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#AB8BFF" className="mt-10" />
                ) : error ? (
                    <Text className="text-red-500 mt-10 text-center">{error.message}</Text>
                ) : (
                    <ScrollView
                        className="flex-1 px-5 mt-5"
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                    >
                        {trendingMovies?.filter(movie => !movie.searchTerm.startsWith('saved_')).map((item) => (
                            <TouchableOpacity
                                key={item.$id}
                                className="flex-row items-center bg-dark-100 p-4 rounded-xl mb-4"
                                onPress={() => handleSearchPress(item.searchTerm)}
                            >
                                <View className="size-12 bg-dark-200 rounded-full items-center justify-center">
                                    <Image
                                        source={icons.search}
                                        className="size-6"
                                        tintColor="#AB8BFF"
                                    />
                                </View>

                                <View className="ml-4 flex-1">
                                    <Text className="text-white font-semibold text-base">
                                        {item.searchTerm}
                                    </Text>
                                    <Text className="text-light-300 text-sm mt-0.5">
                                        Searched {item.count} {item.count === 1 ? 'time' : 'times'}
                                    </Text>
                                </View>

                                <Image
                                    source={icons.arrow}
                                    className="size-5"
                                    tintColor="#A8B5DB"
                                />
                            </TouchableOpacity>
                        ))}

                        {trendingMovies?.filter(movie => !movie.searchTerm.startsWith('saved_')).length === 0 && (
                            <View className="flex-1 items-center justify-center mt-10">
                                <Image
                                    source={icons.search}
                                    className="size-16 opacity-50"
                                    tintColor="#A8B5DB"
                                />
                                <Text className="text-light-200 mt-4 text-center">
                                    No search history yet.{'\n'}Search for movies to see your history!
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};

export default SearchHistory;