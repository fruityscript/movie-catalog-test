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
            movieSearchGenres: [],
            showHistoryDesktop: false,
            controlTypeDesktop: 'fixed',
            isPageLoading: false,
        }
    },
    mutations: {
        SET_LOADING(state: any, payload: boolean) {
            state.isPageLoading = payload
        },
        RENAME_MOVIE(state: any, payload: any) {
            const moviesListCopy = state.moviesList.results
            for (let i = 0; i < moviesListCopy.length; i++) {
                const element = moviesListCopy[i];
                if (element.id === payload.id) {
                    moviesListCopy[i].title = payload.title
                }
            }
            state.moviesList.results = moviesListCopy
        },
        SET_CONTROLS_TYPE_DESKTOP(state: any, payload: string) {
            state.controlTypeDesktop = payload
        },
        SET_SHOW_HISTORY_DESKTOP(state: any, payload: boolean) {
            state.showHistoryDesktop = payload
        },
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
        startLoading(context: any, payload: boolean) {
            context.commit('SET_LOADING', true)
        },
        renameMovie(context: any, payload: any) {
            context.commit('RENAME_MOVIE', payload)
        },
        setDesktopControlType(context: any, payload: string) {
            context.commit('SET_CONTROLS_TYPE_DESKTOP', payload)
        },
        setShowHistoryDesktop(context: any, payload: string) {
            context.commit('SET_SHOW_HISTORY_DESKTOP', payload)
        },
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
                    context.commit('REGISTER_ERROR', error.message)
                }).finally(() => {
                    context.commit('SET_LOADING', false)
                })
        },
        registerError(context: any, payload: string) {
            context.commit('REGISTER_ERROR', payload)
        },
        setErrorList(context: any, payload: Array<string>) {
            context.commit('UPDATE_ERRORS', payload)
        },
        getPopularMovies(
            context: any, payload: number
        ) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}movie/popular?api_key=${movieApiConfig.apiKey}&language=en-US&page=${payload}&include_adult=false`
                )
                .then((response) => {
                    context.commit('SET_MOVIES_LIST', response.data)
                })
                .catch((error) => {
                    context.commit('REGISTER_ERROR', error.message)
                }).finally(() => {
                    context.commit('SET_LOADING', false)
                })
        },
        getMoviesByGenre(
            context: any, payload: { genresList: Array<number> | null, page: number }
        ) {
            axios
                .get(
                    `${movieApiConfig.apiUrl}discover/movie?api_key=${movieApiConfig.apiKey}&language=en-US&with_genres=${payload.genresList?.join(',')}&page=${payload.page}`
                )
                .then((moviesResponse) => {
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    context.commit('REGISTER_ERROR', error.message)
                }).finally(() => {
                    context.commit('SET_LOADING', false)
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
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    context.commit('REGISTER_ERROR', error.message)
                }).finally(() => {
                    console.log('Enter finally')
                    context.commit('SET_LOADING', false)
                })
        },
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
                    context.commit('SET_MOVIES_LIST', moviesResponse.data)
                })
                .catch((error) => {
                    context.commit('REGISTER_ERROR', error.message)
                }).finally(() => {
                    console.log('Enter finally')
                    context.commit('SET_LOADING', false)
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
}) as Store<any>

export default store
