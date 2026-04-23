import AppRouter from './common/routes/app-router.tsx';
import { store } from './common/store';
import { Provider } from 'react-redux';

function App() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
}

export default App;
