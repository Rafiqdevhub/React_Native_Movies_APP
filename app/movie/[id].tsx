import {
    View,
    Text,
    Image,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { saveMovie, unsaveMovie, isMovieSaved, rateMovie, deleteRating } from "@/services/appwrite";
import useFetch from "@/services/useFetch";

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-100 font-bold text-sm mt-2">
            {value || "N/A"}
        </Text>
    </View>
);

const RatingStars = ({ rating, onRate }: { rating: number, onRate: (rating: number) => void }) => (
    <View className="flex-row mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
                key={star}
                onPress={() => onRate(star)}
                className="mr-2"
            >
                <Image
                    source={icons.star}
                    className="size-8"
                    tintColor={star <= rating ? "#AB8BFF" : "#A8B5DB"}
                />
            </TouchableOpacity>
        ))}
    </View>
);

const Details = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [isSaved, setIsSaved] = useState(false);
    const [rating, setRating] = useState(0);

    const { data: movie, loading } = useFetch(() =>
        fetchMovieDetails(id as string)
    );

    useEffect(() => {
        const checkSavedStatus = async () => {
            if (movie?.id) {
                const saved = await isMovieSaved(movie.id);
                setIsSaved(saved);
            }
        };
        checkSavedStatus();
    }, [movie?.id]);

    const handleSaveToggle = async () => {
        if (!movie) return;
        try {
            if (isSaved) {
                await unsaveMovie(movie.id);
            } else {
                await saveMovie(movie);
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error("Error toggling save:", error);
        }
    };

    const handleRate = async (value: number) => {
        if (!movie) return;
        try {
            if (value === rating) {
                await deleteRating(movie.id);
                setRating(0);
            } else {
                await rateMovie(movie, value);
                setRating(value);
            }
        } catch (error) {
            console.error("Error rating movie:", error);
        }
    };

    if (loading)
        return (
            <SafeAreaView className="bg-primary flex-1">
                <ActivityIndicator />
            </SafeAreaView>
        );

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image
                        source={{
                            uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                        }}
                        className="w-full h-[550px]"
                        resizeMode="stretch"
                    />

                    <View className="absolute bottom-5 right-5 flex-row gap-x-4">
                        <TouchableOpacity
                            className="rounded-full size-14 bg-accent flex items-center justify-center"
                            onPress={handleSaveToggle}
                        >
                            <Image
                                source={icons.save}
                                className="size-6"
                                tintColor={isSaved ? "#030014" : "#fff"}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className="rounded-full size-14 bg-white flex items-center justify-center">
                            <Image
                                source={icons.play}
                                className="w-6 h-7 ml-1"
                                resizeMode="stretch"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className="text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">
                            {movie?.release_date?.split("-")[0]} •
                        </Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />

                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>

                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>

                    <View className="w-full mt-4 bg-dark-100 p-4 rounded-xl">
                        <Text className="text-white font-semibold text-base">Rate this Movie</Text>
                        <RatingStars rating={rating} onRate={handleRate} />
                    </View>

                    <MovieInfo label="Overview" value={movie?.overview} />
                    <MovieInfo
                        label="Genres"
                        value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
                    />

                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo
                            label="Budget"
                            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
                        />
                        <MovieInfo
                            label="Revenue"
                            value={`$${Math.round(
                                (movie?.revenue ?? 0) / 1_000_000
                            )} million`}
                        />
                    </View>

                    <MovieInfo
                        label="Production Companies"
                        value={
                            movie?.production_companies?.map((c) => c.name).join(" • ") ||
                            "N/A"
                        }
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={router.back}
            >
                <Image
                    source={icons.arrow}
                    className="size-5 mr-1 mt-0.5 rotate-180"
                    tintColor="#fff"
                />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Details;