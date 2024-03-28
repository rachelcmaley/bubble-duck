import React, { useState, useEffect } from 'react';
import '../styles/components.css';
import { parseProductDetails } from '../utils/responseHelpers';
import { useSelector, useDispatch } from 'react-redux';
import { setScheduleResponse, setUpdatedRoutine } from '../redux/responsesSlice';
import { useNavigate } from 'react-router-dom';
import { FaWater, FaSun, FaMoon, FaStar, FaSplotch, FaPumpSoap, FaMagic } from 'react-icons/fa';
import { LoadingBar } from '../utils/loadingBar';


export const GetRecommendations = ({ setRecommendationsShown }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [addedProductTypes, setAddedProductTypes] = useState([]);
    const recommendations = useSelector(state => state.responses.recommendationsResponse);
    const photoUploadResponse = useSelector(state => state.responses.photoUploadResponse);
    const [addedProductKeys, setAddedProductKeys] = useState([]);

    useEffect(() => {
        if (photoUploadResponse && photoUploadResponse.choices) {
          const content = photoUploadResponse.choices[0].message.content;
          const products = parseProductDetails(content);
          setCurrentProducts(products);
        }
      }, [photoUploadResponse]);    

    useEffect(() => {
        // Whenever currentProducts changes, update the Redux store with the new routine
        dispatch(setUpdatedRoutine(currentProducts));
    }, [currentProducts, dispatch]);


    const addProductToCurrent = (product) => {
        const productKey = `${product.productType}_${product.brand}_${product.name}`;
    
        if (!addedProductTypes.includes(product.product_type)) {
            setAddedProductTypes(prevTypes => [...prevTypes, product.product_type]);
            setCurrentProducts(prevProducts => [
                ...prevProducts, 
                { 
                    ...product, 
                    productType: product.product_type, 
                    brand: product.product_brand,
                    name: product.product_name,
                    description: product.description,
                    price: product.product_price,
                    link: product.sales_link,
                    productKey: productKey,
                    isNewlyAdded: true,
                }
            ]);
            setAddedProductKeys(prevKeys => [...prevKeys, productKey]);
        }
    };
      
    const handleRemoveProduct = (productKeyToRemove) => {
        // Filter out the product to be removed
        const updatedProducts = currentProducts.filter(product => product.productKey !== productKeyToRemove);
        setCurrentProducts(updatedProducts);
      
        setAddedProductTypes(prevTypes => prevTypes.filter(productType => {
          const productToRemove = currentProducts.find(product => product.productKey === productKeyToRemove);
          return productToRemove ? productType !== productToRemove.productType : true;
        }));
      };


    const handleGetScheduleClick = async () => {
        setIsLoading(true); // Show loading gif
    
        try {
            const response = await fetch('http://localhost:5000/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentProducts }),
            });
    
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            dispatch(setScheduleResponse(data))
            navigate('/get-schedule');

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setIsLoading(false); // Hide loading gif
        }
        };

    const capitalizeProductType = (productType) => {
        return productType.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getProductTypeIcon = (productType) => {
        const icons = {
            cleanser: <FaPumpSoap style={{color: "#74C0FC",}} />,
            toner: <FaStar style={{color: "#ff80ea",}} />,
            moisturizer: <FaWater style={{color: "#63E6BE"}} />,
            sunscreen: <FaSun style={{color: "#FFD43B",}} />,
            serum: <FaSplotch style={{color: "#ff9500",}} />,
            retinoid: <FaMoon style={{color: "#b197fc",}} />,  
            exfoliant: <FaMagic style={{color: "fb5b5b",}} />
        }
        return icons[productType] || null; 
    };

    const getProductTypeOverview = (productType) => {
        const overviews = {
            cleanser: "Cleansers are essential for removing dirt, oil, and impurities from the skin's surface, preventing clogged pores and maintaining a clear and healthy complexion.",
            toner: "Toners help to balance the skin's pH after cleansing, remove any residual impurities, and prepare the skin for better absorption of subsequent skincare products like serums and moisturizers.",
            moisturizer: "Moisturizers are crucial for hydrating the skin, locking in moisture, and protecting the skin barrier, which helps to keep the skin soft, smooth, and resilient against environmental stressors.",
            sunscreen: "Sunscreens protect the skin from harmful UV rays, which can cause premature aging, sunburn, and increase the risk of skin cancer, making it a vital part of any daytime skincare routine.",
            serum: "Serums are concentrated formulations designed to target specific skincare concerns such as hydration, brightening, or anti-aging, with active ingredients that penetrate deeply into the skin for maximum efficacy.",
            exfoliant: "Exfoliants are important for removing dead skin cells, which helps improve skin texture, prevent acne, enhance product absorption, and stimulate cell renewal.",
            retinoid: "Retinoids are known for their ability to promote cell turnover, stimulate collagen production, and combat signs of aging such as fine lines, wrinkles, and uneven skin texture, making them a key anti-aging skincare product.",
        }
        return overviews[productType] || "Overview not available";
    }

    const RecommendationsList = ({ recommendations, onAddProduct }) => {
        const groupedByType = recommendations.reduce((acc, product) => {
            (acc[product.product_type] = acc[product.product_type] || []).push(product);
            return acc;
        }, {});
    
        return (
            Object.entries(groupedByType).map(([productType, products]) => (
                <div key={productType} className="productTypeContainer">
                    <div className="productTypeHeader">
                        {/* Display the icon corresponding to the product type */}
                        <span className='productTypeIcon'>{getProductTypeIcon(productType)}</span>
                        {/* Display the product type capitalized */}
                        <h2 className="productTypeHeading">{capitalizeProductType(productType)}</h2>
                    </div>
                    <p className='productTypeOverview'> {getProductTypeOverview(productType)} </p>
                    <div className="productsGrid">
                        {products.map(product => (
                            <div key={product.product_id} className="productBox">
                                <div className='productImageContainer'>
                                    <img src={product.product_image} alt={product.product_name} className="productImage" />
                                </div>
                                <div className="productInfo">
                                    <strong>{product.product_brand} {product.product_name}</strong>
                                    <p>{product.description}</p>
                                    <button className='salesLink' onClick={() => window.open(product.sales_link, '_blank')}> SHOP NOW | {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(product.product_price))}</button>
                                    <button 
                                        className={`addProductButton ${addedProductTypes.includes(product.product_type) ? "disabled" : ""}`}
                                        onClick={() => onAddProduct(product)}
                                        disabled={addedProductTypes.includes(product.product_type)}
                                    >
                                        {addedProductTypes.includes(product.product_type) && product.product_id === currentProducts[currentProducts.length - 1]?.product_id ? "ADDED!" : "ADD TO MY PRODUCTS"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        );
    };

    return (
        <div className='productsDisplayContainer'>
        {isLoading ? (
            <div className='loadingContainer'>
                <img src='bubbles-loading.gif' alt='Loading Bubbles Gif'/>
                <p>Building Custom Skincare Schedule...</p>
                <LoadingBar loading={isLoading} />
            </div>
        ) : (
            <>
                {/* Recommended Products on the Left */}
                {recommendations && (
                <div className='recommendationsContainer'>
                    <h3>Step 3: Pick Recommendations!</h3>
                    <div className='recInstructions'>Instructions: Browse your customized recommendations and select which ones you'd like to add to your routine!</div>
                    {Array.isArray(recommendations) && <RecommendationsList recommendations={recommendations} onAddProduct={addProductToCurrent}/>}
                </div>
                )}
                {/* Display current products on the right side */}
                <div className='recPageRightContainer'>
                <div className='currentProductsSection'>
                <h3>My Products:</h3>
                {currentProducts.map((product, index) => {
                        const productKey = `${product.productType}_${product.brand}_${product.name}`;
                        return (
                            <div key={index}  className={`currentProductContainer ${product.isNewlyAdded ? 'newlyAdded' : ''}`}>
                                <div className='currentProductType'>{capitalizeProductType(product.productType)}</div>
                                <div className='productBrandSubheader'>{product.brand} {product.name}</div>
                                <div className='productDescriptionButton'>
                                   <div className='currentProductDescription'>{product.description}</div>
                                    {product.isNewlyAdded && (
                                    <button onClick={() => handleRemoveProduct(product.productKey)} className="removeProductButton">
                                        REMOVE
                                    </button>
                                    )} 
                                </div>
                                
                            </div>
                        );
                    })}
                </div>
                    <button onClick={handleGetScheduleClick} className='selectPhotoButton'>Get Schedule</button>
                </div>
            </>
        )}
      </div>
    );
  }