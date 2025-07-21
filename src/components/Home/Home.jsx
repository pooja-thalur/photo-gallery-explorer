import { Link } from 'react-router-dom';
import './home-style.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className='home-title'>Welcome to the Photo Gallery Explorer</h1>
      <Link to="/gallery"><button className='home-button'>Go to the Gallery</button></Link>
    </div>
  );
}
export default Home;