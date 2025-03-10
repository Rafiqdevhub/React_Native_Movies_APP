import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { getRatedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";

const Ratings = () => {
    const router = useRouter();
    const { data: ratedMovies, loading, error } = useFetch(getRatedMovies);

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
                    <Text className="text-white text-xl font-bold ml-2">My Ratings</Text>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#AB8BFF" className="mt-10" />
                ) : error ? (
                    <Text className="text-red-500 mt-10 text-center">{error.message}</Text>
                ) : (
                    <ScrollView
                        className="flex-1 px-5 mt-5"
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 16,
                            paddingBottom: 100
                        }}
                    >
                        {ratedMovies?.map((movie) => (
                            <View key={movie.$id} className="w-[30%]">
                                <MovieCard {...movie} />
                                <View className="flex-row items-center justify-center bg-dark-100 rounded-lg mt-2 p-2">
                                    <Image source={icons.star} className="size-4 mr-1" />
                                    <Text className="text-white font-bold">{movie.rating}/5</Text>
                                </View>
                            </View>
                        ))}

                        {ratedMovies?.length === 0 && (
                            <View className="flex-1 items-center justify-center mt-10">
                                <Image
                                    source={icons.star}
                                    className="size-16 opacity-50"
                                    tintColor="#A8B5DB"
                                />
                                <Text className="text-light-200 mt-4 text-center">
                                    No rated movies yet.{'\n'}Rate some movies to see them here!
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};

export default Ratings;