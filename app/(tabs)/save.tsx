import { View, Text, Image, ActivityIndicator, FlatList } from 'react-native'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { getSavedMovies } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import SavedMovieCard from '@/components/SavedMovieCard'

const Save = () => {
    const { data: savedMovies, loading, error, refetch } = useFetch(getSavedMovies);

    if (loading) {
        return (
            <View className="flex-1 bg-primary items-center justify-center">
                <ActivityIndicator size="large" color="#AB8BFF" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                data={savedMovies}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <SavedMovieCard
                        movie_id={item.movie_id}
                        title={item.title}
                        poster_url={item.poster_url}
                        vote_average={item.vote_average}
                        release_date={item.release_date}
                    />
                )}
                numColumns={3}
                contentContainerStyle={{ padding: 20, paddingTop: 100 }}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginBottom: 16,
                }}
                ListHeaderComponent={
                    <View className="mb-5">
                        <Text className="text-2xl font-bold text-white">Saved Movies</Text>
                        <Text className="text-light-200 mt-2">
                            {savedMovies?.length || 0} movies saved
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    !loading && (
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
                    )
                }
            />
        </View>
    )
}

export default Save