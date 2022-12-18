import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HomeRoute from "./HomeRoute/HomeRoute";
import MainProvider from "./Context/Provider";

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<MainProvider>
					<HomeRoute />
				</MainProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
