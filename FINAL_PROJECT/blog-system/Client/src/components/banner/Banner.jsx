import './Banner.css'; // Import your component-specific styles
import bannerImage1 from '../../assets/images/banner_1.jpg';
import bannerImage2 from '../../assets/images/banner_2.jpg';
import bannerImage3 from '../../assets/images/banner_3.jpg';
import bannerImage4 from '../../assets/images/banner_4.jpg';
import { Link } from 'react-router-dom';
const bannerImages = [bannerImage1, bannerImage2, bannerImage3,bannerImage4];

const getRandomBannerImage = () => {
  const randomIndex = Math.floor(Math.random() * bannerImages.length);
  return bannerImages[randomIndex];
};
const Banner = () => {
const randomBannerImage = getRandomBannerImage();
  return (
    <div className="banner-container">
      <img
        src={randomBannerImage}
        alt="Welcome Banner"
        className="banner-image"
      />
      <div className="banner-content">
        <h1>Welcome to Our Blog</h1>
        <p>Explore amazing content and create your own blog now!</p>
        <Link className="create-blog-button" to="/posts/createPost">Create Blog</Link>
      </div>
    </div>
  );
};

export default Banner;
