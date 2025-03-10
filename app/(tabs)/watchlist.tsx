import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { getSavedMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import SavedMovieCard from "@/components/SavedMovieCard";

const Watchlist = () => {
    const router = useRouter();
    const { data: savedMovies, loading, error } = useFetch(getSavedMovies);

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
                    <Text className="text-white text-xl font-bold ml-2">Watchlist</Text>
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
                        {savedMovies?.map((movie) => (
                            <SavedMovieCard
                                key={movie.$id}
                                movie_id={movie.movie_id}
                                title={movie.title}
                                poster_url={movie.poster_url}
                                vote_average={movie.vote_average}
                                release_date={movie.release_date}
                            />
                        ))}

                        {savedMovies?.length === 0 && (
                            <View className="flex-1 items-center justify-center mt-10">
                                <Image
                                    source={icons.save}
                                    className="size-16 opacity-50"
                                    tintColor="#A8B5DB"
                                />
                                <Text className="text-light-200 mt-4 text-center">
                                    No saved movies yet.{'\n'}Save some movies to see them here!
                                </Text>
                            </View>
                        )}
                    </ScrollView>
                )}
            </SafeAreaView>
        </View>
    );
};

export default Watchlist;