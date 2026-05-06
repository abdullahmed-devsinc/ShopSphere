import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFilteredProducts } from "../Features/Products/productSlice";
import ProductGrid from "../Features/Products/ProductGrid";

export default function HomePage() {
    const products = useSelector(selectFilteredProducts);
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to ShopSphere</h1>
                    <p className="hero-subtitle">Discover our curated collection of premium products.</p>
                    <Link to="/products" className="btn btn-primary hero-btn">
                        Shop Now
                    </Link>
                </div>
            </section>

            <section className="featured-categories">
                <h2 className="section-title">Shop by Category</h2>
                <div className="category-grid">
                    <Link to="/products?category=electronics" className="category-card">
                        <div className="category-card-content">
                            <span className="material-symbols-outlined">devices</span>
                            <h3>Electronics</h3>
                        </div>
                    </Link>
                    <Link to="/products?category=clothing" className="category-card">
                        <div className="category-card-content">
                            <span className="material-symbols-outlined">checkroom</span>
                            <h3>Clothing</h3>
                        </div>
                    </Link>
                    <Link to="/products?category=home" className="category-card">
                        <div className="category-card-content">
                            <span className="material-symbols-outlined">home</span>
                            <h3>Home & Garden</h3>
                        </div>
                    </Link>
                </div>
            </section>

            <section className="featured-products">
                <div className="section-header">
                    <h2 className="section-title">Featured Products</h2>
                    <Link to="/products" className="view-all-link">View All</Link>
                </div>
                <ProductGrid products={featuredProducts} />
            </section>
        </div>
    );
}