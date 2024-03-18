-- Create Products Table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_type VARCHAR(255),
    product_brand VARCHAR(255),
    product_name VARCHAR(255),
    product_image TEXT,
    is_essential BOOLEAN,
    sales_link TEXT,
    product_price DECIMAL(10, 2),
    description TEXT
);

-- Create Ingredients Table
CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(255),
    purpose TEXT
);

-- Create Product_Ingredients Junction Table
CREATE TABLE product_ingredients (
    productIngredient_id SERIAL PRIMARY KEY,
    product_id INTEGER,
    ingredient_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients (ingredient_id)
);

-- Create Treatments Table
CREATE TABLE treatments (
    treatment_id SERIAL PRIMARY KEY,
    treatment_type VARCHAR(255)
);

-- Create Product_Treatments Junction Table
CREATE TABLE product_treatments (
    productTreatments_id SERIAL PRIMARY KEY,
    product_id INTEGER,
    treatment_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products (product_id),
    FOREIGN KEY (treatment_id) REFERENCES treatments (treatment_id)
);
