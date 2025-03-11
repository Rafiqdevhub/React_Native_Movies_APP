import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;

if (!DATABASE_ID || !COLLECTION_ID || !PROJECT_ID) {
    throw new Error('Appwrite configuration is missing. Please check your environment variables.');
}

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    if (!query || !movie) {
        throw new Error('Search query and movie data are required');
    }

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query),
        ]);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            return await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            return await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update search count';
        console.error("Error updating search count:", error);
        throw new Error(errorMessage);
    }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count"),
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
};

export const saveMovie = async (movie: MovieDetails) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("movie_id", movie.id),
            Query.equal("searchTerm", `saved_${movie.id}`),
        ]);

        if (result.documents.length === 0) {
            return await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: `saved_${movie.id}`,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                saved_at: new Date().toISOString(),
                count: 1,
            });
        }
        return result.documents[0];
    } catch (error) {
        console.error("Error saving movie:", error);
        throw error;
    }
};

export const unsaveMovie = async (movieId: number) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("movie_id", movieId),
            Query.equal("searchTerm", `saved_${movieId}`),
        ]);

        if (result.documents.length > 0) {
            await database.deleteDocument(DATABASE_ID, COLLECTION_ID, result.documents[0].$id);
        }
    } catch (error) {
        console.error("Error removing saved movie:", error);
        throw error;
    }
};

export const getSavedMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.startsWith("searchTerm", "saved_"),
            Query.orderDesc("saved_at"),
        ]);

        return result.documents;
    } catch (error) {
        console.error("Error fetching saved movies:", error);
        throw error;
    }
};

export const isMovieSaved = async (movieId: number) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("movie_id", movieId),
            Query.equal("searchTerm", `saved_${movieId}`),
        ]);

        return result.documents.length > 0;
    } catch (error) {
        console.error("Error checking saved movie:", error);
        throw error;
    }
};

export const getRatedMovies = async () => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.startsWith("searchTerm", "rated_"),
            Query.orderDesc("rated_at"),
        ]);

        return result.documents;
    } catch (error) {
        console.error("Error fetching rated movies:", error);
        throw error;
    }
};

export const rateMovie = async (movie: MovieDetails, rating: number) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("movie_id", movie.id),
            Query.equal("searchTerm", `rated_${movie.id}`),
        ]);

        if (result.documents.length === 0) {
            return await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: `rated_${movie.id}`,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                vote_average: movie.vote_average,
                release_date: movie.release_date,
                rating: rating,
                rated_at: new Date().toISOString(),
            });
        } else {
            return await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                result.documents[0].$id,
                {
                    rating: rating,
                    rated_at: new Date().toISOString(),
                }
            );
        }
    } catch (error) {
        console.error("Error rating movie:", error);
        throw error;
    }
};

export const deleteRating = async (movieId: number) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("movie_id", movieId),
            Query.equal("searchTerm", `rated_${movieId}`),
        ]);

        if (result.documents.length > 0) {
            await database.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                result.documents[0].$id
            );
        }
    } catch (error) {
        console.error("Error deleting rating:", error);
        throw error;
    }
};