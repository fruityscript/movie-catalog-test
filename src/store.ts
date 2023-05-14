import { Store, createStore } from 'vuex'
import axios from 'axios'
import movieApiConfig from './configs/movie-db-config'

const store = createStore({
    state() {
        return {
            historySize: 10,
            genresList: [],
            moviesList: {},
            errorList: [],
            currentError: null,
            historyItems: [],
            movieSearchName: '',
            movieSearchGenres: []
        }
    },
    mutations: {
        SET_SEARCH_STRING(state: any, payload: string) {
            state.movieSearchName = payload
        },
        SET_SEARCH_GENRES(state: any, payload: Array<number>) {
            state.movieSearchGenres = [...payload]
        },
        UPDATE_ERRORS(state: any, payload: Array<string>) {
            state.errorList = [...payload]
        },
        REGISTER_ERROR(state: any, payload: string) {
            const newErrors = [...state.errorList]
            newErrors.push(payload)
            state.errorList = newErrors
        },
        SET_GENRES_LIST(state: any, payload: Array<{ id: number, name: string }>) {
            state.genresList = payload
        },
        SET_MOVIES_LIST(state: any, payload: Array<Record<string, any>>) {
            state.moviesList = payload
        },
        ADD_HISTORY_ITEM(state: any, payload: Record<string, any>) {
            const historyCopy = [...state.historyItems, payload]
            if (historyCopy.length > state.historySize) {
                historyCopy.shift()
            }
            state.historyItems = historyCopy
        },
    },
    actions: {
        setSearchString(context: any, payload: string) {
            context.commit('SET_SEARCH_STRING', payload)
        },
        setSearchGenres(context: any, payload: Array<number>) {
            context.commit('SET_SEARCH_GENRES', [...payload])
        },
        getGenres(context: any, payload: any) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}genre/movie/list?api_key=${movieApiConfig.apiKey}&language=en-US`
                )
                .then((response) => {
                    context.commit('SET_GENRES_LIST', response.data.genres)
                })
                .catch((error) => {
                    console.log('Got error genres', error.message)
                    context.commit('REGISTER_ERROR', error.message)
                })
        },
        registerError(context: any, payload: string) {
            context.commit('REGISTER_ERROR', payload)
        },
        setErrorList(context: any, payload: Array<string>) {
            context.commit('UPDATE_ERRORS', payload)
        },
        //
        getPopularMovies(
            context: any, payload: number
        ) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}movie/popular?api_key=${movieApiConfig.apiKey}&language=en-US&page=${payload}`
                )
                .then((response) => {
                    context.commit('SET_MOVIES_LIST', response.data)
                })
                .catch((error) => {
                    console.log('Got error popular movies', error)
                    context.commit('REGISTER_ERROR', error.message)
                })
        },
        getMoviesByGenre(
            context: any, payload: { genresList: Array<number> | null, page: number }
        ) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}discover/movie?api_key=${movieApiConfig.apiKey}&language=en-US&with_genres=${payload.genresList?.join(',')}`
                )
                .then((moviesResponse) => {
                    console.log(moviesResponse.data)
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    context.commit('REGISTER_ERROR', error.message)
                    console.log('Got error movies by genres', error)
                })
        },
        getMoviesByName(
            context: any, payload: { searchString: string | null, page: number }
        ) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}search/movie?api_key=${movieApiConfig.apiKey}&language=en-US&page=${payload.page}&include_adult=false&query=${payload.searchString}`
                )
                .then((moviesResponse) => {
                    console.log(moviesResponse.data)
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    console.log('Got error movies by name', error)
                    context.commit('REGISTER_ERROR', error.message)
                })
        },
        //
        getMovies(
            context: any, payload: { searchString: string | null, genresList: Array<number> | null, page: number }
        ) {
            let requestLine = `${movieApiConfig.apiUrl}search/movie?api_key=${movieApiConfig.apiKey}&language=en-US&page=${payload.page}&include_adult=false`
            if (payload.genresList !== null) {
                requestLine += `&with_genres=[${payload.genresList.join(',')}]`
            }
            if (payload.searchString !== null) {
                requestLine += `&query=${payload.searchString}`
            }

            axios
                .get(
                    requestLine
                )
                .then((moviesResponse) => {
                    console.log(moviesResponse.data)
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    console.log('Got error movies', error)
                    context.commit('REGISTER_ERROR', error.message)
                })
        },
        setMovies(context: any, payload: Array<Record<string, any>>) {
            context.commit('SET_MOVIES_LIST', payload)
        },
        setGenres(context: any, payload: Array<{ id: number, name: string }>) {
            context.commit('SET_GENRES_LIST', payload)
        },
        addToHistory(context: any, payload: Record<string, any>) {
            context.commit('ADD_HISTORY_ITEM', payload)
        },
        updateHistorySize(context: any, payload: number) {
            context.commit('UPDATE_HISTORY_SIZE', payload)
        },
    },
}) as Store

export default store
