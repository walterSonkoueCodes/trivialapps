import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        // Ajouter les reducers ici
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;