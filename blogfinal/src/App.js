import './App.css';
import DisplayPosts from "./components/DisplayPosts";
import CreatePost from "./components/CreatePost";

function App() {
    return (
        <div className="App">
            <CreatePost />
            <DisplayPosts />
        </div>
    );
}

export default App;
